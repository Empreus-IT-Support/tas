import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How TASC handles personal information collected through this website.",
  path: "/privacy-policy",
});

const LAST_UPDATED = "30 September 2026";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        TASC (Taxation and Accounting Services Centre, Mount Isa) operates
        under Arnold &amp; Finlay. This policy explains how we handle personal
        information collected through this website, in line with the
        Australian Privacy Principles in the Privacy Act 1988 (Cth).
      </p>
    ),
  },
  {
    heading: "What this website collects",
    body: (
      <p>
        The only personal information this website collects is what you choose
        to send us through its forms: your name, email address, phone number
        and message, or your details when you ask to be kept informed. Our
        hosting provider also keeps short-lived technical logs (such as IP
        addresses) for security and to keep the site running reliably.
      </p>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <p>
        We use your enquiry details for one purpose: to respond to you. Form
        submissions are delivered to our practice email and are not stored in
        a database on this website. We do not use your details for marketing
        lists, and we never sell personal information.
      </p>
    ),
  },
  {
    heading: "Information you give us as a client",
    body: (
      <p>
        If you engage us, the financial and tax information you provide for
        that work (such as tax file numbers and financial records) is
        collected directly through our practice, not through this website,
        and is handled under our engagement terms, our professional
        obligations, and the Taxation Administration Act&rsquo;s
        confidentiality rules.
      </p>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <p>
        This website does not set advertising cookies or run third-party
        trackers. We use our hosting platform&rsquo;s privacy-friendly
        analytics, which counts page visits in aggregate without cookies and
        without identifying or tracking individual visitors across sites.
      </p>
    ),
  },
  {
    heading: "Who else sees it",
    body: (
      <p>
        Website enquiries pass through the service providers that run this
        site: our hosting platform and our transactional email provider,
        which delivers the message to us over an encrypted connection. These
        providers process the data only to provide those services. Beyond
        that, we disclose personal information only where the law requires it.
      </p>
    ),
  },
  {
    heading: "Access, correction and complaints",
    body: (
      <p>
        You can ask us at any time what personal information we hold about
        you, ask us to correct it, or ask us to delete it by emailing{" "}
        <a href="mailto:tasc@arnfin.net.au" className="font-semibold underline underline-offset-2">
          tasc@arnfin.net.au
        </a>{" "}
        or calling 07 4743 6342. If you are not satisfied with our response,
        you can complain to the Office of the Australian Information
        Commissioner (oaic.gov.au).
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        path="/privacy-policy"
        eyebrow="Your information"
        title="Privacy Policy"
        intro={`How we handle the details you send us through this website. Last updated ${LAST_UPDATED}.`}
      />
      <section className="relative mx-auto max-w-3xl px-5 py-16 sm:py-24">
        {sections.map((s, i) => (
          <div key={s.heading} className={i === 0 ? "" : "mt-12"}>
            <h2>{s.heading}</h2>
            <div className="mt-4 leading-relaxed opacity-80">{s.body}</div>
          </div>
        ))}
      </section>
    </>
  );
}
