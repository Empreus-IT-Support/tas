import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Keep Informed",
  description:
    "Sign up for tax tips, tax-related information and promotions from Tax, Accounting and Super Centre in Mount Isa.",
};

export default function KeepInformedPage() {
  return (
    <>
      <PageBanner
        title="Keep Informed"
        intro="Enter your details below to receive regular information updates from Tax, Accounting and Super Centre."
        image="/images/banner-5.jpg"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2">
        <section className="prose-tasc">
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            What you&rsquo;ll receive
          </h2>
          <div className="mt-7">
            <p>
              We&rsquo;ll keep you a step ahead of the game whenever we can by
              providing emails containing tax tips as well as tax-related
              information and promotions that could benefit you.
            </p>
            <p>
              By signing up to receive our email newsletters, you agree to
              receive announcements and special offers. However, no information
              gathered from subscribers, including email addresses, is ever
              shared with or sold to any third party.
            </p>
            <p>
              Unsubscribe instructions are included at the bottom of each issue.
              Some newsletter issues include advertising, clearly identified as
              such.
            </p>
          </div>
        </section>

        <section>
          <h2 className="rule font-heading text-xl tracking-wide uppercase">
            Info Request
          </h2>
          <div className="mt-7">
            <EnquiryForm withMessage={false} submitLabel="Submit" />
          </div>
        </section>
      </div>
    </>
  );
}
