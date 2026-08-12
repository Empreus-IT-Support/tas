import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Keep Informed",
  description:
    "Sign up for tax tips, tax-related information and promotions from Tax, Accounting and Super Centre in Mount Isa.",
};

const PROMISES = [
  {
    title: "Tax tips, ahead of time",
    body: "We'll keep you a step ahead of the game whenever we can, with emails containing tax tips as well as tax-related information and promotions that could benefit you.",
  },
  {
    title: "Never shared, never sold",
    body: "No information gathered from subscribers, including email addresses, is ever shared with or sold to any third party.",
  },
  {
    title: "Leave whenever you like",
    body: "Unsubscribe instructions are included at the bottom of each issue. Some issues include advertising, clearly identified as such.",
  },
];

export default function KeepInformedPage() {
  return (
    <>
      <PageBanner
        eyebrow="Keep Informed"
        title="A step ahead of the game"
        intro="Enter your details to receive regular information updates from Tax, Accounting and Super Centre."
      />

      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-14 sm:py-18 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <p className="eyebrow">What you&rsquo;ll receive</p>
          <h2 className="mt-5">Worth opening</h2>
          <div className="ledger-rule mt-8 max-w-[9rem]" />

          <ul className="mt-10 space-y-px overflow-hidden border border-line bg-line">
            {PROMISES.map((p, i) => (
              <li key={p.title} className="flex gap-6 bg-white p-7">
                <span className="font-display text-2xl text-line">
                  0{i + 1}
                </span>
                <div>
                  <h3>{p.title}</h3>
                  <p className="mt-2.5 text-[15px]">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="lg:col-span-5">
          <div className="notch relative border border-line bg-paper p-9">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-red via-lion to-red"
            />
            <p className="eyebrow">Info request</p>
            <h2 className="mt-4 text-2xl">Sign up</h2>
            <p className="mt-3 text-sm text-muted">
              By signing up you agree to receive announcements and special
              offers.
            </p>
            <div className="mt-8">
              <EnquiryForm withMessage={false} submitLabel="Submit" />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
