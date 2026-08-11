"use client";

import { useState } from "react";

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

  const field =
    "w-full rounded border border-fog bg-white px-4 py-3 text-ink outline-none focus:border-brand-red";
  const label = "mb-1.5 block font-heading text-sm font-semibold text-ink";

  if (status === "sent") {
    return (
      <p
        role="status"
        className="rounded border border-brand-gold bg-brand-gold/10 p-6 text-ink"
      >
        Thank you for contacting Tax, Accounting and Super Centre. We will be in
        touch soon.
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
        <p role="alert" className="text-sm font-semibold text-brand-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-brand-red px-8 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase hover:bg-brand-red-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
