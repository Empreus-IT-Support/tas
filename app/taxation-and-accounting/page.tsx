import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Taxation & Accounting",
  description:
    "Registered tax agent and public accountant in Mount Isa: tax returns and financial statements for individuals, partnerships, companies, trusts and SMSFs, plus GST, IAS, ABN, PAYG, FTC and FBT.",
};

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

function CallToAction() {
  return (
    <p className="mt-6">
      <Link
        href="/contact-us"
        className="font-heading text-sm font-bold tracking-wide text-brand-red uppercase hover:text-brand-red-dark"
      >
        Contact us and talk to our taxation experts →
      </Link>
    </p>
  );
}

export default function TaxationPage() {
  return (
    <>
      <PageBanner
        title="Tax & Accounting in Mount Isa"
        intro="At Tax, Accounting and Super Centre, our aim is to lift the tax and accounting burden for you. We'll take care of your tax, accounting and financial concerns so you can enjoy a better work-life balance."
        image="/images/banner-2.jpg"
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <section id="taxation-and-accounting" className="scroll-mt-32">
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Taxation and Accounting
          </h2>
          <div className="prose-tasc mt-7">
            <p>
              As a registered tax agent and public accountant, we possess the
              knowledge and expertise to prepare tax returns and financial
              statements to the required standards for:
            </p>
          </div>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {ENTITIES.map((e) => (
              <li key={e} className="flex gap-2.5">
                <span aria-hidden="true" className="text-brand-red">
                  ▸
                </span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
          <div className="prose-tasc mt-6">
            <p>
              To ensure our clients receive faster tax refunds we lodge all tax
              returns electronically, and we have a strict quality checking
              process in place before lodgement to reduce the risk of
              unnecessary audits or delays in processing your tax returns.
            </p>
          </div>
          <CallToAction />
        </section>

        <hr className="my-14 border-fog" />

        <section id="remote-lodgement" className="scroll-mt-32">
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Remote or Out of Area Lodgement Service
          </h2>
          <div className="prose-tasc mt-7">
            <p>
              Tax, Accounting and Super Centre (TASC) makes it easy for clients
              living in remote areas to send us your paperwork and communicate
              your needs by using our hassle-free mail-in service.
            </p>
            <p>
              For initial enquiries, simply give us a call, or email or mail us
              at the address closest to you.
            </p>
          </div>
          <ol className="mt-6 space-y-5">
            <li className="rounded border border-fog bg-mist p-6">
              <p>
                Please download, sign and email a copy of the engagement
                authority agreement that we require to be signed before we can
                begin your tax return, and review the client rights document.
              </p>
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-heading text-sm font-bold">
                <a
                  href="/documents/tasc-engagement-letter-tax-agent-authority.pdf"
                  className="text-brand-red hover:text-brand-red-dark"
                >
                  Engagement letter &amp; Tax Agent Authority (PDF)
                </a>
                <a
                  href="/documents/tasc-clients-rights.pdf"
                  className="text-brand-red hover:text-brand-red-dark"
                >
                  Client Rights (PDF)
                </a>
              </p>
            </li>
            <li className="rounded border border-fog bg-mist p-6">
              <p>
                Also please fill in the applicable questionnaire with the
                information to assist us in preparing your tax return.
              </p>
              <p className="mt-4 font-heading text-sm font-bold">
                <a
                  href="/documents/tasc-tax-return-questionnaire.pdf"
                  className="text-brand-red hover:text-brand-red-dark"
                >
                  Tax return questionnaire — non-complicated tax affairs (PDF)
                </a>
              </p>
            </li>
          </ol>
          <CallToAction />
        </section>

        <hr className="my-14 border-fog" />

        <section id="gst-ias-abn" className="scroll-mt-32">
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            GST, IAS, ABN, PAYG, FTC, FBT
          </h2>
          <div className="prose-tasc mt-7">
            <p>
              Our staff are experienced and qualified to handle any issues
              related to:
            </p>
          </div>
          <ul className="mt-5 space-y-2">
            {COMPLIANCE.map((c) => (
              <li key={c} className="flex gap-2.5">
                <span aria-hidden="true" className="text-brand-red">
                  ▸
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <CallToAction />
        </section>
      </div>
    </>
  );
}
