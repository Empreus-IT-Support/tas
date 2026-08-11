import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/site";
import { ArrowRight, Phone } from "@/components/icons";

const SERVICES = [
  {
    n: "01",
    title: "Taxation and Accounting",
    blurb: "Handy tax tools and personalised advice you can trust.",
    detail:
      "Returns and financial statements for individuals, partnerships, companies, trusts, deceased estates and SMSFs — all lodged electronically, all quality-checked first.",
    href: "/taxation-and-accounting#taxation-and-accounting",
  },
  {
    n: "02",
    title: "Remote Lodgement",
    blurb: "Hassle-free service for those living in remote areas.",
    detail:
      "Out of area? Send your paperwork in and we handle the rest. Download the engagement letter and questionnaire, and we can start straight away.",
    href: "/taxation-and-accounting#remote-lodgement",
  },
  {
    n: "03",
    title: "GST, IAS, ABN, PAYG, FTC, FBT",
    blurb: "Tax compliance made simple.",
    detail:
      "ABN and TFN applications, GST registration and variation, activity statements, fuel tax credits, business names and fringe benefits tax.",
    href: "/taxation-and-accounting#gst-ias-abn",
  },
];

const CREDENTIALS = [
  { value: "Public", label: "Accountant and registered tax agent" },
  { value: "Electronic", label: "Lodgement, for faster refunds" },
  { value: "Quality-checked", label: "Before anything is lodged" },
];

const FACTS = [
  { value: "Mount Isa", label: "North West Queensland" },
  { value: "Australia-wide", label: "Out-of-area lodgement" },
  { value: "Jul – Sep", label: "Extended office hours" },
];

const STEPS = [
  {
    n: "1",
    title: "Get in touch",
    body: "Call, email or send us a message. We'll tell you exactly what we need.",
  },
  {
    n: "2",
    title: "Sign and send",
    body: "Download the engagement letter and Tax Agent Authority, sign it, and email it back with your questionnaire.",
  },
  {
    n: "3",
    title: "We lodge",
    body: "We prepare and quality-check your return, then lodge electronically so your refund comes through faster.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="texture relative isolate overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-56 h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(255,216,45,0.16),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-64 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(216,27,23,0.22),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow eyebrow-light">
                Tax &amp; financial advice in Mount Isa
              </p>
              <h1 className="mt-6 text-white">
                Maximise your returns
                <br />
                by letting us{" "}
                <span className="relative whitespace-nowrap text-gold">
                  minimise your tax
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-white/70">
                At TASC you get qualified staff, precise and up-to-date advice,
                and a friendly service that keeps the effort on our side of the
                desk — not yours.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact-us" className="btn btn-primary">
                  Book an appointment
                  <ArrowRight />
                </Link>
                <a
                  href={`tel:${BUSINESS.phoneHref}`}
                  className="btn btn-ghost"
                >
                  <Phone />
                  {BUSINESS.phone}
                </a>
              </div>
            </div>

            {/* Credentials panel */}
            <div className="lg:col-span-5">
              <div className="notch relative mx-auto max-w-sm border border-white/10 bg-white/[0.04] p-9 backdrop-blur-sm">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-red via-gold to-red"
                />
                <div className="flex items-center gap-5">
                  <Image
                    src="/images/tax-practitioners-board.png"
                    alt="Registered with the Tax Practitioners Board"
                    width={120}
                    height={140}
                    className="h-20 w-auto"
                  />
                  <p className="font-display text-lg leading-snug text-white">
                    Registered with the Tax&nbsp;Practitioners Board
                  </p>
                </div>

                <div className="ledger-rule my-7 border-white/15" />

                <dl className="space-y-5">
                  {CREDENTIALS.map((c) => (
                    <div key={c.label} className="flex items-baseline gap-4">
                      <dt className="font-display text-base whitespace-nowrap text-gold">
                        {c.value}
                      </dt>
                      <dd className="text-sm text-white/55">{c.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Facts rail */}
        <div className="relative border-t border-white/10">
          <ul className="mx-auto grid max-w-6xl divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {FACTS.map((f) => (
              <li key={f.label} className="py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-2xl text-gold">{f.value}</p>
                <p className="mt-1.5 font-ui text-[10px] font-bold tracking-[0.22em] text-white/45 uppercase">
                  {f.label}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="h-1 bg-gradient-to-r from-red via-gold to-red"
        />
      </section>

      {/* ------------------------------------------------------------- Intro */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-5">
              A friendly, professional local practice
            </h2>
            <div className="ledger-rule mt-8 max-w-[9rem]" />
          </div>
          <div className="prose-tasc text-[17px] lg:col-span-7">
            <p>
              At TASC we work for our clients, and as our valued client you will
              have access to qualified staff with the precise and most
              up-to-date information to suit your needs.
            </p>
            <p>
              Our aim is to provide our clients with a friendly professional
              service to maximise your financial growth and minimise your tax at
              a reasonable cost, with minimal effort on your part.
            </p>
            <p>
              TASC offers a broad range of fully integrated accounting and tax
              services. Please browse through our website for more information,
              or contact TASC to speak to our friendly staff.
            </p>
            <p className="mt-8">
              <Link href="/about-us" className="link-arrow">
                More about TASC
                <ArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Services */}
      <section className="border-y border-line bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5">How we can help</h2>
          </div>

          <ul className="mt-14 border-t border-line">
            {SERVICES.map((s) => (
              <li key={s.n}>
                <Link
                  href={s.href}
                  className="group relative grid gap-5 border-b border-line py-9 md:grid-cols-12 md:items-center md:gap-8"
                >
                  {/* gold rule sweeps in along the bottom on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="font-display text-3xl text-line transition-colors group-hover:text-gold md:col-span-1">
                    {s.n}
                  </span>
                  <h3 className="transition-transform duration-300 group-hover:text-red md:col-span-4 md:group-hover:translate-x-1">
                    {s.title}
                  </h3>
                  <p className="text-[15px] md:col-span-5">{s.detail}</p>
                  <span className="link-arrow md:col-span-2 md:justify-end">
                    Learn more
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------- Remote lodgement */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Out of area?</p>
          <h2 className="mt-5">Remote lodgement, in three steps</h2>
          <p className="mt-6 text-[17px]">
            TASC makes it easy for clients living in remote areas to send us
            your paperwork and communicate your needs, using our hassle-free
            mail-in service.
          </p>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="bg-white p-9">
              <span className="flex h-11 w-11 items-center justify-center bg-ink font-display text-lg text-gold">
                {step.n}
              </span>
              <h3 className="mt-6">{step.title}</h3>
              <p className="mt-3 text-[15px]">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10">
          <Link
            href="/taxation-and-accounting#remote-lodgement"
            className="link-arrow"
          >
            See what to send us
            <ArrowRight />
          </Link>
        </p>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="texture relative isolate overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,216,45,0.13),transparent_65%)]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow eyebrow-light">Bookings essential</p>
            <h2 className="mt-5 text-white">Ready to lodge?</h2>
            <p className="mt-4 max-w-xl text-white/70">
              Extended office hours run July to September. Call us or send a
              message and we&rsquo;ll find you a time.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-4">
            <Link href="/contact-us" className="btn btn-gold">
              Get in touch
              <ArrowRight />
            </Link>
            <a href={`tel:${BUSINESS.phoneHref}`} className="btn btn-ghost">
              <Phone />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
