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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,20}$/;

const FALLBACK = `Please call ${BUSINESS.phone} or email ${BUSINESS.email}.`;

// Simple in-memory rate limit. Per-instance only — enough to blunt casual
// abuse; a serverless deployment gets one bucket per warm instance.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof body.company_website === "string" && body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const clean = (k: string) =>
    typeof body[k] === "string" ? (body[k] as string).trim() : "";

  const name = clean("name");
  const email = clean("email");
  const phone = clean("phone");
  const message = clean("message");
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
