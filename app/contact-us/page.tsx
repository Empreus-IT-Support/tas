import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageBanner from "@/components/PageBanner";
import { BUSINESS } from "@/lib/site";
import { ArrowRight, Clock, Mail, Phone, Pin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Tax, Accounting and Super Centre in Mount Isa — 26 East Street, Turanga Shopping Centre. Phone 07 4743 6342 or send an enquiry.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  const { address } = BUSINESS;

  return (
    <>
      <PageBanner
        path="/contact-us"
        eyebrow="Contact Us"
        title="Let's get your return moving"
        intro="For prompt attention to your taxation and accounting, use the enquiry form or the details below."
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-14 sm:py-18 lg:grid-cols-12">
        {/* ------------------------------------------------------------ Form */}
        <section className="lg:col-span-7">
          <p className="eyebrow">Send us a message</p>
          <h2 className="mt-5">We&rsquo;ll be in touch</h2>
          <div className="ledger-rule mt-8 max-w-[9rem]" />
          <div className="mt-10">
            <EnquiryForm />
          </div>
        </section>

        {/* ------------------------------------------------------------ Info */}
        <aside className="lg:col-span-5">
          <div className="notch relative overflow-hidden bg-ink p-9 text-white/70">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-red via-lion to-red"
            />
            <p className="eyebrow eyebrow-light">Mount Isa QLD</p>

            <address className="mt-7 space-y-5 text-[15px] not-italic">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3.5 hover:text-white"
              >
                <Pin className="mt-1 shrink-0 text-lion" />
                <span>
                  {address.line1}
                  <br />
                  {address.line2}
                  <br />
                  {address.suburb} {address.state} {address.postcode}
                </span>
              </a>
              <a
                href={`tel:${BUSINESS.phoneHref}`}
                className="flex items-center gap-3.5 font-display text-xl text-white hover:text-lion"
              >
                <Phone className="shrink-0 text-lion" />
                <span className="tnum">{BUSINESS.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-3.5 hover:text-white"
              >
                <Mail className="shrink-0 text-lion" />
                {BUSINESS.email}
              </a>
            </address>

            <p className="mt-8">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-lion"
              >
                View on map
                <ArrowRight />
              </a>
            </p>
          </div>

          <div className="mt-8 border border-line p-9">
            <p className="flex items-center gap-3 font-ui text-[11px] font-bold tracking-[0.24em] text-muted uppercase">
              <Clock className="text-lion-deep" />
              Opening hours
            </p>
            <dl className="mt-6">
              {BUSINESS.hours.map((h) => (
                <div
                  key={h.days}
                  className="flex justify-between gap-4 border-b border-line py-3 text-[15px]"
                >
                  <dt>{h.days}</dt>
                  <dd className="text-right font-semibold text-ink">
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">{BUSINESS.hoursNote}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
