import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BUSINESS } from "@/lib/site";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? BUSINESS.email;
// Resend requires a verified sender domain; onboarding@resend.dev works out of
// the box until tascentre.com.au is verified in Resend.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "TASC Website <onboarding@resend.dev>";

const FIELD_LIMITS: Record<string, number> = {
  name: 80,
  email: 120,
  phone: 20,
  message: 2000,
};

// Angle brackets, commas and quotes are excluded so a value can never be read
// as an address list or a display-name construct once it reaches the mail API.
const EMAIL_RE = /^[^\s@<>,"';]+@[^\s@<>,"';]+\.[^\s@<>,"';]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,20}$/;

const FALLBACK = `Please call ${BUSINESS.phone} or email ${BUSINESS.email}.`;

/**
 * Strip anything that could act as a control character once the value is
 * interpolated into a mail header. `name` ends up in the subject line, so a
 * CR/LF there is a header-injection primitive if the transport ever renders
 * it as raw SMTP rather than JSON.
 */
// Built via RegExp so the source stays plain ASCII — writing the class as
// literal control bytes turns this file binary.
const CONTROL_CHARS = new RegExp("[\u0000-\u001F\u007F-\u009F]", "g");
const sanitise = (s: string) => s.replace(CONTROL_CHARS, " ").trim();

/** Same, but newlines survive — used for the message body only. */
const CONTROL_EXCEPT_NEWLINE = new RegExp(
  "[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F-\u009F]",
  "g"
);
const LF = String.fromCharCode(10);
const sanitiseMultiline = (s: string) =>
  s
    .split(new RegExp(String.fromCharCode(13) + LF + "|" + String.fromCharCode(13) + "|" + LF))
    .join(LF)
    .replace(CONTROL_EXCEPT_NEWLINE, " ")
    .trim();

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

// A global ceiling as well as a per-IP one. Per-IP alone is worthless against
// an attacker who can vary their apparent address, and the thing actually
// worth protecting is the mailbox and the Resend quota — both of which are
// consumed regardless of which IP a request claims to come from.
const GLOBAL_WINDOW_MS = 600_000;
const GLOBAL_MAX_PER_WINDOW = 30;
let globalCount = 0;
let globalStart = 0;

const hits = new Map<string, { count: number; start: number }>();
const MAX_TRACKED_IPS = 5_000;

/** Drop expired buckets so the map cannot grow without bound. */
function prune(now: number) {
  for (const [key, entry] of hits) {
    if (now - entry.start > WINDOW_MS) hits.delete(key);
  }
  // Last resort if a flood outpaces expiry within a single window.
  if (hits.size > MAX_TRACKED_IPS) hits.clear();
}

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 256) prune(now);

  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function globallyRateLimited() {
  const now = Date.now();
  if (now - globalStart > GLOBAL_WINDOW_MS) {
    globalStart = now;
    globalCount = 1;
    return false;
  }
  globalCount += 1;
  return globalCount > GLOBAL_MAX_PER_WINDOW;
}

/**
 * Best-effort client address.
 *
 * `x-forwarded-for` is attacker-controlled: anyone can send one, and taking
 * its first entry let a single client rotate through unlimited fake
 * addresses and defeat the per-IP limit entirely. Vercel sets
 * `x-vercel-forwarded-for` at its edge and overwrites anything the client
 * supplied, so prefer it; otherwise take the *rightmost* XFF entry, which is
 * the one appended by the nearest trusted proxy rather than the one the
 * client invented.
 */
function clientIp(req: NextRequest) {
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]!.trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1]!;
  }
  return "unknown";
}

// Reject anything larger than a legitimate enquiry before parsing it.
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Same-origin check. The browser always sends Origin on a cross-origin POST,
 * so a mismatch means the request did not come from our own form. Requests
 * with no Origin at all (curl, server-to-server) are allowed through to the
 * validation below rather than blocked outright.
 */
function crossOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(req: NextRequest) {
  if (crossOrigin(req)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 415 }
    );
  }

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  if (rateLimited(clientIp(req)) || globallyRateLimited()) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    // content-length can lie or be absent; check what actually arrived.
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }
    const parsed = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof body.company_website === "string" && body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const field = (k: string) =>
    typeof body[k] === "string" ? (body[k] as string) : "";

  // Header-bound fields are flattened; the message keeps its line breaks
  // because it goes in the mail *body*, where newlines are meaningful.
  const clean = (k: string) => sanitise(field(k));

  const name = clean("name");
  const email = clean("email");
  const phone = clean("phone");
  const message = sanitiseMultiline(field("message"));
  // The Keep Informed form omits the message field entirely.
  const hasMessageField = "message" in body;

  const required: [string, string][] = [
    ["Your name", name],
    ["Your email address", email],
    ["Your number", phone],
  ];
  if (hasMessageField) required.push(["Your message", message]);

  for (const [label, value] of required) {
    if (!value) {
      return NextResponse.json(
        { error: `${label} is required.` },
        { status: 400 }
      );
    }
  }
  for (const [key, limit] of Object.entries(FIELD_LIMITS)) {
    if (clean(key).length > limit) {
      return NextResponse.json(
        { error: "One of the fields is too long." },
        { status: 400 }
      );
    }
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: `Our enquiry form isn't available right now. ${FALLBACK}` },
      { status: 503 }
    );
  }

  const kind = hasMessageField ? "enquiry" : "newsletter signup";
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
  ];
  if (hasMessageField) lines.push("", "Message:", message);
  lines.push("", `— Sent from the website ${kind} form`);

  try {
    const resend = new Resend(apiKey);
    // Plain-text email: no HTML rendering, nothing to inject.
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Website ${kind} from ${name}`,
      text: lines.join("\n"),
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `We couldn't send your message. ${FALLBACK}` },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: `We couldn't send your message. ${FALLBACK}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
