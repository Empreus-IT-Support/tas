import DiamondRule from "@/components/DiamondRule";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import EnquiryForm from "@/components/EnquiryForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = pageMeta({
  title: "Keep Informed",
  description:
    "Sign up for tax tips, tax-related information and promotions from TASC Mount Isa.",
  path: "/keep-informed",
});

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
        path="/keep-informed"
        eyebrow="Keep Informed"
        title="A step ahead of the game"
        intro="Enter your details to receive regular information updates from TASC Mount Isa."
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-14 sm:py-18 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <p className="eyebrow">What you&rsquo;ll receive</p>
          <h2 className="mt-5">Worth opening</h2>
          <DiamondRule className="mt-8" />

          <ul className="mt-10 space-y-px overflow-hidden border border-line bg-line">
            {PROMISES.map((p, i) => (
              <li key={p.title} className="flex gap-6 bg-navy-2 p-7">
                <span className="tnum font-display text-2xl text-gold/70">
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
          <div className="gilt relative bg-navy-2 p-9 lg:sticky lg:top-32">
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
