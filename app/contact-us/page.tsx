import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageBanner from "@/components/PageBanner";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Tax, Accounting and Super Centre in Mount Isa — 26 East Street, Turanga Shopping Centre. Phone 07 4743 6342 or send an enquiry.",
};

export default function ContactPage() {
  const { address } = BUSINESS;

  return (
    <>
      <PageBanner
        title="Contact Us"
        intro="For prompt attention to your taxation and accounting, please contact us using the enquiry form or the details below."
        image="/images/banner-1.jpg"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Send us a message
          </h2>
          <div className="mt-7">
            <EnquiryForm />
          </div>
        </section>

        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Contact Info
          </h2>

          <div className="mt-7 rounded border border-fog bg-mist p-8">
            <h3 className="font-heading text-base tracking-wide uppercase">
              Mount Isa QLD
            </h3>
            <address className="mt-4 not-italic leading-relaxed">
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.suburb} {address.state} {address.postcode}
              <br />
              <br />
              <a
                href={`tel:${BUSINESS.phoneHref}`}
                className="font-heading font-bold text-brand-red hover:text-brand-red-dark"
              >
                {BUSINESS.phone}
              </a>
              <br />
              <a
                href={`mailto:${BUSINESS.email}`}
                className="underline decoration-fog underline-offset-4 hover:text-brand-red"
              >
                {BUSINESS.email}
              </a>
            </address>
            <p className="mt-6">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm font-bold tracking-wide text-brand-red uppercase hover:text-brand-red-dark"
              >
                View on map →
              </a>
            </p>
          </div>

          <div className="mt-8 rounded border border-fog p-8">
            <h3 className="font-heading text-base tracking-wide uppercase">
              Opening Hours
            </h3>
            <dl className="mt-4 space-y-2">
              {BUSINESS.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt>{h.days}</dt>
                  <dd className="text-right font-semibold text-ink">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm">{BUSINESS.hoursNote}</p>
          </div>
        </section>
      </div>
    </>
  );
}
