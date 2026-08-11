import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Tax Resources",
  description:
    "Fact sheets, ATO calculators, checklists and downloadable forms from Tax, Accounting and Super Centre in Mount Isa.",
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
  { label: "TASC engagement letter (non business) & Tax Agent Authority", href: "/documents/tasc-engagement-letter-tax-agent-authority.pdf", type: "PDF" },
  { label: "TASC Client Rights", href: "/documents/tasc-clients-rights.pdf", type: "PDF" },
  { label: "TASC tax return questionnaire (non-complicated tax affairs)", href: "/documents/tasc-tax-return-questionnaire.pdf", type: "PDF" },
];

const USEFUL = [
  { label: "Australian Taxation Office", href: "https://www.ato.gov.au/" },
  { label: "Fair Work Ombudsman", href: "https://www.fairwork.gov.au/" },
  { label: "ASIC", href: "https://asic.gov.au/" },
  { label: "business.gov.au", href: "https://www.business.gov.au/" },
  { label: "Business Queensland", href: "https://www.business.qld.gov.au/" },
  { label: "Sage HandiSoft", href: "https://www.sage.com/en-au/" },
];

function ExternalList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((i) => (
        <li key={i.label} className="flex gap-2.5">
          <span aria-hidden="true" className="text-brand-red">
            ▸
          </span>
          <a
            href={i.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-fog underline-offset-4 hover:text-brand-red hover:decoration-brand-red"
          >
            {i.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function DownloadList({
  items,
}: {
  items: { label: string; href: string; type: string }[];
}) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            className="flex h-full items-start gap-3 rounded border border-fog bg-white p-5 hover:border-brand-red hover:shadow"
          >
            <span className="mt-0.5 rounded bg-brand-red px-2 py-1 font-heading text-[10px] font-bold tracking-wide text-white">
              {i.type}
            </span>
            <span className="flex-1">{i.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <PageBanner
        title="Taxation & Accounting Support in Mount Isa"
        intro="Fact sheets, calculators, checklists and the forms you need before we start your return."
        image="/images/banner-4.jpg"
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Fact Sheets
          </h2>
          <h3 className="mt-8 font-heading text-base">Deductions you can claim</h3>
          <ExternalList items={DEDUCTIONS} />
          <ul className="mt-2 space-y-2">
            {DEDUCTIONS_PLAIN.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span aria-hidden="true" className="text-brand-red">
                  ▸
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-heading text-base">
            Records you need to keep
          </h3>
          <ExternalList items={RECORDS} />

          <h3 className="mt-10 font-heading text-base">Offsets you can claim</h3>
          <ExternalList items={OFFSETS} />
        </section>

        <hr className="my-14 border-fog" />

        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Calculators
          </h2>
          <ExternalList items={CALCULATORS} />
        </section>

        <hr className="my-14 border-fog" />

        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Checklists
          </h2>
          <DownloadList items={CHECKLISTS} />
        </section>

        <hr className="my-14 border-fog" />

        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Forms &amp; Questionnaires
          </h2>
          <DownloadList items={FORMS} />
        </section>

        <hr className="my-14 border-fog" />

        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Useful Links
          </h2>
          <ExternalList items={USEFUL} />
        </section>
      </div>
    </>
  );
}
