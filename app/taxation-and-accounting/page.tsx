import DiamondRule from "@/components/DiamondRule";
import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { ArrowRight, Download } from "@/components/icons";

export const metadata: Metadata = {
  title: "Taxation & Accounting",
  description:
    "Registered tax agent and public accountant in Mount Isa: tax returns and financial statements for individuals, partnerships, companies, trusts and SMSFs, plus GST, IAS, ABN, PAYG, FTC and FBT.",
  alternates: { canonical: "/taxation-and-accounting" },
};

const SECTIONS = [
  { id: "taxation-and-accounting", n: "01", label: "Taxation and Accounting" },
  { id: "remote-lodgement", n: "02", label: "Remote or Out of Area Lodgement" },
  { id: "gst-ias-abn", n: "03", label: "GST, IAS, ABN, PAYG, FTC, FBT" },
];

const ENTITIES = [
  "Individuals / Sole Traders",
  "Partnerships",
  "Companies",
  "Discretionary / Family Trusts",
  "Deceased Estates",
  "Bookkeeping",
  "Self-Managed Superannuation Funds",
];

const COMPLIANCE = [
  "ABN and TFN application",
  "GST registration, cancellation or variation",
  "PAYG withholding tax and employee PAYG payment summaries",
  "Instalment activity statements (IAS)",
  "Fuel tax credits",
  "Business name registration",
  "Fringe benefits tax",
];

const DOCS = [
  {
    label: "Engagement letter & Tax Agent Authority",
    note: "Sign and return before we can begin your return",
    href: "/documents/tasc-engagement-letter-tax-agent-authority.pdf",
  },
  {
    label: "Client Rights",
    note: "Please read alongside the engagement letter",
    href: "/documents/tasc-clients-rights.pdf",
  },
  {
    label: "Tax return questionnaire",
    note: "Non-complicated tax affairs",
    href: "/documents/tasc-tax-return-questionnaire.pdf",
  },
];

function TickList({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 border-b border-line pb-3">
          <span aria-hidden="true" className="mt-0.5 font-bold text-gold">
            ✓
          </span>
          <span className="text-[15px]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({
  n,
  id,
  children,
}: {
  n: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-5">
      <span className="tnum font-display text-2xl text-gold/70">{n}</span>
      <h2 id={`${id}-heading`} className="text-3xl">
        {children}
      </h2>
    </div>
  );
}

function Cta() {
  return (
    <p className="mt-8">
      <Link href="/contact-us" className="link-arrow">
        Talk to our taxation experts
        <ArrowRight />
      </Link>
    </p>
  );
}

export default function TaxationPage() {
  return (
    <>
      <PageBanner
        path="/taxation-and-accounting"
        eyebrow="Taxation & Accounting"
        title="Tax & accounting in Mount Isa"
        intro="Our aim is to lift the tax and accounting burden for you. We'll take care of your tax, accounting and financial concerns so you can enjoy a better work-life balance."
      />

      <div className="mx-auto max-w-7xl gap-16 px-5 py-14 sm:py-18 lg:grid lg:grid-cols-12">
        {/* In-page nav */}
        <aside className="mb-14 lg:col-span-3 lg:mb-0">
          <nav aria-label="On this page" className="lg:sticky lg:top-36">
            <p className="eyebrow">
              On this page
            </p>
            <ul className="mt-5 space-y-1 border-l border-line">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l-2 border-transparent py-2 pl-5 text-[15px] text-muted hover:border-gold hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="lg:col-span-9">
          <section
            id="taxation-and-accounting"
            aria-labelledby="taxation-and-accounting-heading"
            className="scroll-mt-40"
          >
            <SectionHeading n="01" id="taxation-and-accounting">
              Taxation and Accounting
            </SectionHeading>
            <p className="mt-7 text-[17px]">
              As a registered tax agent and public accountant, we possess the
              knowledge and expertise to prepare tax returns and financial
              statements to the required standards for:
            </p>
            <TickList items={ENTITIES} />
            <p className="mt-7 text-[17px]">
              To ensure our clients receive faster tax refunds we lodge all tax
              returns electronically, and we have a strict quality checking
              process in place before lodgement to reduce the risk of
              unnecessary audits or delays in processing your tax returns.
            </p>
            <Cta />
          </section>

          <DiamondRule className="my-16" width="full" />

          <section
            id="remote-lodgement"
            aria-labelledby="remote-lodgement-heading"
            className="scroll-mt-40"
          >
            <SectionHeading n="02" id="remote-lodgement">
              Remote or Out of Area Lodgement Service
            </SectionHeading>
            <div className="prose-tasc mt-7 text-[17px]">
              <p>
                TASC makes it easy for clients living in remote areas to send us
                your paperwork and communicate your needs by using our
                hassle-free mail-in service.
              </p>
              <p>
                For initial enquiries, simply give us a call, or email or mail
                us at the address closest to you.
              </p>
            </div>

            <h3 className="eyebrow mt-10">
              What to send us
            </h3>
            <ul className="mt-5 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {DOCS.map((d) => (
                <li key={d.href}>
                  <a
                    href={d.href}
                    className="group flex h-full flex-col bg-navy-2 p-6 hover:bg-navy-3"
                  >
                    <span className="flex items-center gap-2 font-ui text-[10px] font-semibold tracking-[0.16em] text-gold uppercase">
                      <Download className="h-4 w-4" />
                      PDF
                    </span>
                    <span className="mt-4 font-display text-[17px] leading-snug tracking-[0.02em] uppercase group-hover:text-champagne">
                      {d.label}
                    </span>
                    <span className="mt-2 text-sm text-muted">{d.note}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Cta />
          </section>

          <DiamondRule className="my-16" width="full" />

          <section
            id="gst-ias-abn"
            aria-labelledby="gst-ias-abn-heading"
            className="scroll-mt-40"
          >
            <SectionHeading n="03" id="gst-ias-abn">
              GST, IAS, ABN, PAYG, FTC, FBT
            </SectionHeading>
            <p className="mt-7 text-[17px]">
              Our staff are experienced and qualified to handle any issues
              related to:
            </p>
            <TickList items={COMPLIANCE} />
            <Cta />
          </section>
        </div>
      </div>
    </>
  );
}
