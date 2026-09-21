"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "phone" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

/**
 * Validation mirrors app/api/contact/route.ts deliberately.
 *
 * The server is the authority — these rules exist so a visitor is told what is
 * wrong beside the field that is wrong, instead of learning it one problem at
 * a time from a round trip. If you change a rule here, change it there too;
 * the reverse is not true, because the server must reject things the client
 * never sends.
 */
const EMAIL_RE = /^[^\s@<>,"';]+@[^\s@<>,"';]+\.[^\s@<>,"';]+$/;
const PHONE_RE = /^[0-9+()\-\s]{6,20}$/;

const LIMITS: Record<FieldName, number> = {
  name: 80,
  email: 120,
  phone: 20,
  message: 2000,
};

const LABELS: Record<FieldName, string> = {
  name: "Your name",
  phone: "Your number",
  email: "Your email address",
  message: "Your message",
};

function validate(values: Record<FieldName, string>, withMessage: boolean) {
  const errors: FieldErrors = {};
  const fields: FieldName[] = withMessage
    ? ["name", "phone", "email", "message"]
    : ["name", "phone", "email"];

  for (const f of fields) {
    const v = values[f].trim();
    if (!v) {
      errors[f] = `${LABELS[f]} is required.`;
    } else if (v.length > LIMITS[f]) {
      errors[f] = `${LABELS[f]} is too long (maximum ${LIMITS[f]} characters).`;
    }
  }

  if (!errors.email && values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!errors.phone && values.phone.trim() && !PHONE_RE.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number — digits, spaces and + ( ) - only.";
  }

  return errors;
}

export default function EnquiryForm({
  withMessage = true,
  submitLabel = "Send Message",
}: {
  withMessage?: boolean;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLParagraphElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  // The form is replaced by the confirmation, so without this the focus ring
  // lands on <body> and a keyboard or screen-reader user is left with no idea
  // the submission worked. `role="status"` announces it; this puts them there.
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
    if (status === "error" && !Object.keys(fieldErrors).length) {
      errorRef.current?.focus();
    }
  }, [status, fieldErrors]);

  /** Re-validate a field once it has already been marked invalid. */
  function revalidate(name: FieldName) {
    if (!fieldErrors[name]) return;
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const next = validate(values, withMessage);
    setFieldErrors((prev) => ({ ...prev, [name]: next[name] }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values: Record<FieldName, string> = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const errors = validate(values, withMessage);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setStatus("error");
      setError("");
      // Send focus to the first problem in DOM order, not in object order.
      const order: FieldName[] = ["name", "phone", "email", "message"];
      const first = order.find((f) => errors[f]);
      if (first) form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setFieldErrors({});

    const payload: Record<string, string> = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      // Always sent, even empty: the endpoint treats a *missing* honeypot key
      // as a bot that never parsed the form.
      company_website: String(data.get("company_website") ?? ""),
    };
    if (withMessage) payload.message = values.message;

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  // Inputs sit on the navy ground like everything else: a lifted navy fill
  // with a gold hairline, going gold on focus. `color-scheme: dark` is what
  // makes the browser render the caret, selection and autofill for a dark
  // field — without it Chrome paints an autofilled input near-white.
  const fieldClass = (invalid: boolean) =>
    `w-full border bg-navy-2 px-4 py-3.5 text-white outline-none [color-scheme:dark] placeholder:text-muted focus:border-gold ${
      invalid ? "border-champagne" : "border-line hover:border-rule"
    }`;
  const labelClass =
    "mb-2 block font-ui text-[11px] font-semibold tracking-[0.18em] text-gold uppercase";

  if (status === "sent") {
    return (
      <p
        ref={sentRef}
        tabIndex={-1}
        role="status"
        className="gilt bg-gold/10 p-7 text-white"
      >
        Thank you for contacting TASC Mount Isa. We will be in touch soon.
      </p>
    );
  }

  /** Label, control and its error message, wired together for assistive tech. */
  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    maxLength: LIMITS[name],
    "aria-invalid": fieldErrors[name] ? (true as const) : undefined,
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
    onBlur: () => revalidate(name),
    onChange: () => revalidate(name),
    className: fieldClass(Boolean(fieldErrors[name])),
  });

  function FieldError({ name }: { name: FieldName }) {
    if (!fieldErrors[name]) return null;
    return (
      <p id={`${name}-error`} className="mt-2 text-sm text-champagne">
        {fieldErrors[name]}
      </p>
    );
  }

  return (
    // `noValidate` turns off the browser's own bubbles so the messages above
    // can be styled, announced and positioned beside their field. It is only
    // defensible because this component validates properly itself.
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-sm text-muted">All fields are required.</p>

      <div>
        <label htmlFor="name" className={labelClass}>
          {LABELS.name}
        </label>
        <input type="text" autoComplete="name" {...fieldProps("name")} />
        <FieldError name="name" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            {LABELS.phone}
          </label>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            {...fieldProps("phone")}
          />
          <FieldError name="phone" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {LABELS.email}
          </label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            {...fieldProps("email")}
          />
          <FieldError name="email" />
        </div>
      </div>

      {withMessage && (
        <div>
          <label htmlFor="message" className={labelClass}>
            {LABELS.message}
          </label>
          <textarea rows={6} {...fieldProps("message")} />
          <FieldError name="message" />
        </div>
      )}

      {/* Whole-form failures only — a field-level problem is reported beside
          the field, and repeating it here would announce everything twice. */}
      {status === "error" && error && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-champagne bg-champagne/10 px-4 py-3 text-sm font-semibold text-champagne"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
        {status !== "sending" && <ArrowRight />}
      </button>

      {/* Announced without stealing focus, so the disabled button is not a
          silent dead end for a screen-reader user. */}
      <span aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message." : ""}
      </span>
    </form>
  );
}
