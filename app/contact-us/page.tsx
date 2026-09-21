import DiamondRule from "@/components/DiamondRule";
import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageBanner from "@/components/PageBanner";
import { BUSINESS, pageMeta } from "@/lib/site";
import { ArrowRight, Clock, Mail, Phone, Pin, Post } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description:
    "Contact TASC Mount Isa in Mount Isa, QLD. Phone 07 4743 6342, email tasc@arnfin.net.au, or send an enquiry through the form.",
  path: "/contact-us",
});

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
          <DiamondRule className="mt-8" />
          <div className="mt-10">
            <EnquiryForm />
          </div>
        </section>

        {/* ------------------------------------------------------------ Info */}
        <aside className="lg:col-span-5">
          <div className="gilt relative overflow-hidden bg-navy p-9 text-white/70">
            <p className="eyebrow eyebrow-light">Mount Isa QLD</p>

            <address className="mt-7 space-y-5 text-[15px] not-italic">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3.5 hover:text-white"
              >
                <Pin className="mt-1 shrink-0 text-gold" />
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
                className="flex items-center gap-3.5 font-display text-xl text-white hover:text-gold"
              >
                <Phone className="shrink-0 text-gold" />
                <span className="tnum">{BUSINESS.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-3.5 hover:text-white"
              >
                <Mail className="shrink-0 text-gold" />
                {BUSINESS.email}
              </a>
              {/* Mail goes to the Gold Coast, not the Mount Isa shopfront —
                  brand guidelines §05. Worth stating plainly so nothing is
                  posted to the shop. */}
              <p className="flex gap-3.5 text-[15px] text-platinum/55">
                <Post className="mt-1 shrink-0 text-gold" />
                <span>
                  Postal
                  <br />
                  {BUSINESS.postal}
                </span>
              </p>
            </address>

            <p className="mt-8">
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-gold"
              >
                View on map
                <ArrowRight />
              </a>
            </p>
          </div>

          <div className="panel mt-8 p-9">
            <p className="eyebrow">
              <Clock className="text-gold" />
              Opening hours
            </p>
            <dl className="mt-6">
              {BUSINESS.hours.map((h) => (
                <div
                  key={h.days}
                  className="flex justify-between gap-4 border-b border-line py-3 text-[15px]"
                >
                  <dt>{h.days}</dt>
                  <dd className="text-right font-semibold text-white">
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
