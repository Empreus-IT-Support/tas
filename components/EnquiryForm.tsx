"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function EnquiryForm({
  withMessage = true,
  submitLabel = "Send Message",
}: {
  withMessage?: boolean;
  submitLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company_website: String(data.get("company_website") ?? ""),
    };
    if (withMessage) payload.message = String(data.get("message") ?? "");

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
  const field =
    "w-full border border-line bg-navy-2 px-4 py-3.5 text-white outline-none [color-scheme:dark] placeholder:text-muted hover:border-rule focus:border-gold";
  const label =
    "mb-2 block font-ui text-[11px] font-semibold tracking-[0.18em] text-gold uppercase";

  if (status === "sent") {
    return (
      <p
        role="status"
        className="gilt bg-gold/10 p-7 text-white"
      >
        Thank you for contacting TASC Mount Isa. We will be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
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

      <div>
        <label htmlFor="name" className={label}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          className={field}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Your number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            autoComplete="tel"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Your email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      {withMessage && (
        <div>
          <label htmlFor="message" className={label}>
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            maxLength={2000}
            className={field}
          />
        </div>
      )}

      {status === "error" && (
        <p
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
    </form>
  );
}
