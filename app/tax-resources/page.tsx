import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { Download, ExternalLink } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tax Resources",
  description:
    "Fact sheets, ATO calculators, checklists and downloadable forms from Tax, Accounting and Super Centre in Mount Isa.",
  alternates: { canonical: "/tax-resources" },
};

// NOTE: ATO deep links are carried over from the archived site. The ATO has
// restructured its site since; run a link check before go-live.
const DEDUCTIONS = [
  { label: "Vehicle expenses", href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/transport-and-travel-expenses/car-expenses/" },
  { label: "Transport and travel expenses", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Deductions-you-can-claim/Transport-and-travel-expenses/" },
  { label: "Union fees and subscriptions to associations", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Deductions-you-can-claim/Other-work-related-deductions/Union-fees,-subscriptions-to-associations-and-bargaining-agents-fees/" },
  { label: "Income protection insurance", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Deductions-you-can-claim/Other-deductions/Income-protection-insurance/" },
];

const DEDUCTIONS_PLAIN = [
  "Personal superannuation contributions",
  "Gifts and donations",
  "Home office expenses",
  "Self-education expenses",
  "Tools, equipment and other assets",
  "Seminars, conferences and education workshops",
];

const RECORDS = [
  { label: "What records to keep", href: "https://www.ato.gov.au/individuals/income-and-deductions/records-you-need-to-keep/" },
  { label: "Lost or destroyed records", href: "https://www.ato.gov.au/Forms/Reasonable-estimate-for-documents-destroyed-by-disaster/" },
  { label: "How long you need to keep your records", href: "https://www.ato.gov.au/Business/Record-keeping-for-business/Index---Record-keeping-for-business/" },
];

const OFFSETS = [
  { label: "Health insurance", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Offsets-and-rebates/Private-health-insurance-rebate-and-offset/" },
  { label: "Medical expenses", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Offsets-and-rebates/Medical-expenses-tax-offset/" },
  { label: "Seniors and pensioners tax offset", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Offsets-and-rebates/Seniors-and-pensioners-tax-offset/" },
  { label: "Superannuation", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Offsets-and-rebates/Super-related-tax-offsets/" },
  { label: "Low income earners", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Offsets-and-rebates/Low-and-middle-income-earner-tax-offsets/" },
  { label: "Zones and overseas forces", href: "https://www.ato.gov.au/Individuals/Income-and-deductions/Offsets-and-rebates/Zone-and-overseas-forces-tax-offsets/" },
];

const CALCULATORS = [
  { label: "Simple Tax Calculator", href: "https://www.ato.gov.au/Calculators-and-tools/Simple-tax-calculator/" },
  { label: "Tax Withheld Calculator", href: "https://www.ato.gov.au/Calculators-and-tools/Tax-withheld-calculator/" },
  { label: "Employee Super Guarantee", href: "https://www.ato.gov.au/Calculators-and-tools/Super-guarantee-contributions/" },
  { label: "Employee or Contractor", href: "https://www.ato.gov.au/calculators-and-tools/employee-or-contractor/" },
];

const CHECKLISTS = [
  { label: "Individual Tax Return (ITR) Checklist", href: "/documents/tasc-individual-tax-return-checklist.xlsx", type: "XLSX" },
  { label: "Motor vehicle claim log book", href: "/documents/tasc-motor-vehicle-log-book.xlsx", type: "XLSX" },
  { label: "TASC summary of vehicle expenses", href: "/documents/tasc-summary-of-vehicle-expenses.xlsx", type: "XLSX" },
  { label: "Rental Property Checklist", href: "/documents/tasc-rental-property-checklist.pdf", type: "PDF" },
];

const FORMS = [
  { label: "Engagement letter (non business) & Tax Agent Authority", href: "/documents/tasc-engagement-letter-tax-agent-authority.pdf", type: "PDF" },
  { label: "TASC Client Rights", href: "/documents/tasc-clients-rights.pdf", type: "PDF" },
  { label: "Tax return questionnaire (non-complicated tax affairs)", href: "/documents/tasc-tax-return-questionnaire.pdf", type: "PDF" },
];

const USEFUL = [
  { label: "Australian Taxation Office", href: "https://www.ato.gov.au/" },
  { label: "Fair Work Ombudsman", href: "https://www.fairwork.gov.au/" },
  { label: "ASIC", href: "https://asic.gov.au/" },
  { label: "business.gov.au", href: "https://www.business.gov.au/" },
  { label: "Business Queensland", href: "https://www.business.qld.gov.au/" },
  { label: "Sage HandiSoft", href: "https://www.sage.com/en-au/" },
];

const SECTIONS = [
  { id: "fact-sheets", label: "Fact Sheets" },
  { id: "calculators", label: "Calculators" },
  { id: "checklists", label: "Checklists" },
  { id: "forms", label: "Forms & Questionnaires" },
  { id: "useful-links", label: "Useful Links" },
];

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.label} className="border-b border-line">
          <a
            href={i.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 py-3.5 text-[15px] hover:text-red"
          >
            <span>{i.label}</span>
            <ExternalLink className="shrink-0 text-line group-hover:text-red" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function PlainList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 grid gap-x-10 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="border-b border-line py-3.5 text-[15px]">
          {i}
        </li>
      ))}
    </ul>
  );
}

function DownloadGrid({
  items,
}: {
  items: { label: string; href: string; type: string }[];
}) {
  return (
    <ul className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            className="group flex h-full items-start gap-4 bg-white p-6 hover:bg-paper"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-ink font-ui text-[10px] font-bold text-lion">
              {i.type}
            </span>
            <span className="flex-1">
              <span className="block font-display text-[16px] leading-snug text-ink group-hover:text-red">
                {i.label}
              </span>
              <span className="mt-2 flex items-center gap-1.5 font-ui text-[10px] font-bold tracking-[0.16em] text-muted uppercase">
                <Download className="h-3.5 w-3.5" />
                Download
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-heading`} className="text-3xl">
      {children}
    </h2>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageBanner
        path="/tax-resources"
        eyebrow="Tax Resources"
        title="Taxation & accounting support in Mount Isa"
        intro="Fact sheets, calculators, checklists and the forms you need before we start your return."
      />

      <div className="mx-auto max-w-6xl gap-16 px-5 py-14 sm:py-18 lg:grid lg:grid-cols-12">
        <aside className="mb-14 lg:col-span-3 lg:mb-0">
          <nav aria-label="On this page" className="lg:sticky lg:top-36">
            <p className="font-ui text-[11px] font-bold tracking-[0.24em] text-muted uppercase">
              On this page
            </p>
            <ul className="mt-5 space-y-1 border-l border-line">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l-2 border-transparent py-2 pl-5 text-[15px] hover:border-lion hover:text-ink"
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
            id="fact-sheets"
            aria-labelledby="fact-sheets-heading"
            className="scroll-mt-40"
          >
            <p className="eyebrow">From the ATO</p>
            <div className="mt-5">
              <Heading id="fact-sheets">Fact Sheets</Heading>
            </div>

            <h3 className="mt-10 font-ui text-[11px] font-bold tracking-[0.24em] text-muted uppercase">
              Deductions you can claim
            </h3>
            <LinkList items={DEDUCTIONS} />
            <PlainList items={DEDUCTIONS_PLAIN} />

            <h3 className="mt-12 font-ui text-[11px] font-bold tracking-[0.24em] text-muted uppercase">
              Records you need to keep
            </h3>
            <LinkList items={RECORDS} />

            <h3 className="mt-12 font-ui text-[11px] font-bold tracking-[0.24em] text-muted uppercase">
              Offsets you can claim
            </h3>
            <LinkList items={OFFSETS} />
          </section>

          <div className="ledger-rule my-16" />

          <section
            id="calculators"
            aria-labelledby="calculators-heading"
            className="scroll-mt-40"
          >
            <Heading id="calculators">Calculators</Heading>
            <LinkList items={CALCULATORS} />
          </section>

          <div className="ledger-rule my-16" />

          <section
            id="checklists"
            aria-labelledby="checklists-heading"
            className="scroll-mt-40"
          >
            <Heading id="checklists">Checklists</Heading>
            <DownloadGrid items={CHECKLISTS} />
          </section>

          <div className="ledger-rule my-16" />

          <section
            id="forms"
            aria-labelledby="forms-heading"
            className="scroll-mt-40"
          >
            <Heading id="forms">Forms &amp; Questionnaires</Heading>
            <DownloadGrid items={FORMS} />
          </section>

          <div className="ledger-rule my-16" />

          <section
            id="useful-links"
            aria-labelledby="useful-links-heading"
            className="scroll-mt-40"
          >
            <Heading id="useful-links">Useful Links</Heading>
            <LinkList items={USEFUL} />
          </section>
        </div>
      </div>
    </>
  );
}
