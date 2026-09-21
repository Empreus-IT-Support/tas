import Image from "next/image";
import Link from "next/link";
import { BUSINESS, TAGLINE } from "@/lib/site";
import { ArrowRight, Phone } from "@/components/icons";
import DiamondRule from "@/components/DiamondRule";
import EmblemMark from "@/components/EmblemMark";
import PageFrame from "@/components/PageFrame";

const SERVICES = [
  {
    n: "01",
    title: "Taxation and Accounting",
    detail:
      "Returns and financial statements for individuals, partnerships, companies, trusts, deceased estates and SMSFs — all lodged electronically, all quality-checked first.",
    href: "/taxation-and-accounting#taxation-and-accounting",
  },
  {
    n: "02",
    title: "Remote Lodgement",
    detail:
      "Out of area? Send your paperwork in and we handle the rest. Download the engagement letter and questionnaire, and we can start straight away.",
    href: "/taxation-and-accounting#remote-lodgement",
  },
  {
    n: "03",
    title: "GST, IAS, ABN, PAYG, FTC, FBT",
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

const REASONS = [
  {
    title: "Local, not remote",
    body: "We have worked in Mount Isa long enough to know the industries, the employers and the deductions that actually apply here.",
  },
  {
    title: "Open to anyone",
    body: "The out-of-area lodgement service means distance is not a barrier — send your paperwork in from anywhere in Australia.",
  },
  {
    title: "Checked before lodged",
    body: "A strict quality check runs before anything goes to the ATO, reducing the risk of audits and processing delays.",
  },
  {
    title: "Plain answers",
    body: "Direct access to qualified staff who will explain the position in language you can act on, not jargon.",
  },
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
      {/* ---------------------------------------------------------------- Hero
          The stacked lockup is the hero. The guidelines' cover puts the mark
          centred inside a gold double frame on navy, and there is no reason to
          invent a different first impression when the client has already drawn
          one. `PageFrame` is that frame at viewport scale. */}
      <section className="vignette relative isolate flex min-h-[min(88svh,46rem)] flex-col items-center justify-center overflow-hidden bg-navy px-5 py-20 text-center sm:py-24">
        <PageFrame />
        {/* Two side washes rather than one behind the mark. The lockup is a
            flat #0C1B33 chip, so anything that lifts the navy directly behind
            it makes its rectangle visible — the centre stays plain navy. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-72 hidden h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(215,162,69,0.14),transparent_62%)] sm:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-72 -bottom-52 hidden h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(155,80,29,0.26),transparent_64%)] sm:block"
        />

        <div className="relative">
          <Image
            src="/brand/lockup-stacked.png"
            alt=""
            aria-hidden="true"
            width={1429}
            height={1011}
            priority
            className="mark-fade mx-auto h-28 w-auto sm:h-40 lg:h-48"
          />

          <h1 className="mt-10 text-white">
            Maximise your returns.
            <br />
            <span className="gilt-text">Minimise your tax.</span>
          </h1>

          <DiamondRule className="mx-auto mt-9 w-40" width="full" />

          <p className="mx-auto mt-9 max-w-xl text-balance">
            Qualified staff, precise and up-to-date advice, and a friendly
            service that keeps the effort on our side of the desk — not yours.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us" className="btn btn-primary">
              Book an appointment
              <ArrowRight />
            </Link>
            <a href={`tel:${BUSINESS.phoneHref}`} className="btn btn-ghost">
              <Phone />
              <span className="tnum">{BUSINESS.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Facts rail
          Sections are divided by hairlines and grounds that step between navy
          and midnight, rather than by flipping to white. */}
      <section className="border-y border-line bg-midnight">
        <ul className="mx-auto grid max-w-7xl divide-y divide-line px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {FACTS.map((f) => (
            <li
              key={f.label}
              className="py-6 text-center sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="font-display text-xl text-gold">{f.value}</p>
              <p className="mt-1.5 font-ui text-[10px] font-semibold tracking-[0.22em] text-muted uppercase">
                {f.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------- Intro */}
      <section className="relative isolate overflow-hidden">
        <EmblemMark className="-top-20 -left-24 h-[26rem]" opacity={0.035} />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-5">A friendly, professional local practice</h2>
              <DiamondRule className="mt-8" />

              {/* Pull quote — from the practice's own About copy. Montserrat,
                  not Cinzel: Cinzel's minuscules are small capitals, and a
                  sentence-length quote set in them stops being readable. */}
              <figure className="panel mt-10 p-8">
                <blockquote className="text-lg leading-relaxed text-white">
                  &ldquo;At TASC we do not see our clients as numbers — we see
                  people with a dream and a vision to be financially
                  secure.&rdquo;
                </blockquote>
                <figcaption className="mt-5 font-ui text-[10px] font-semibold tracking-[0.24em] text-gold uppercase">
                  {TAGLINE}
                </figcaption>
              </figure>
            </div>

            <div className="prose-tasc text-[17px] lg:col-span-7">
              <p>
                At TASC we work for our clients, and as our valued client you
                will have access to qualified staff with the precise and most
                up-to-date information to suit your needs.
              </p>
              <p>
                Our aim is to provide our clients with a friendly professional
                service to maximise your financial growth and minimise your tax
                at a reasonable cost, with minimal effort on your part.
              </p>
              <p>
                TASC offers a broad range of fully integrated accounting and tax
                services. Please browse through our website for more
                information, or contact TASC to speak to our friendly staff.
              </p>

              {/* Credentials, moved out of the old hero panel. */}
              <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
                {CREDENTIALS.map((c) => (
                  <div key={c.label} className="bg-navy p-6">
                    <dt className="font-display text-[15px] text-gold">
                      {c.value}
                    </dt>
                    <dd className="mt-2 text-sm text-muted">{c.label}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-10">
                <Link href="/about-us" className="link-arrow">
                  More about TASC
                  <ArrowRight />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Services
          A gold-ruled ledger. `.ledger-row` carries the hairline, the gold
          wash on hover and the rule sweeping in beneath. */}
      <section className="border-t border-line bg-midnight py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-5">How we can help</h2>
          </div>

          <ul className="mt-14 border-t border-line">
            {SERVICES.map((s) => (
              <li key={s.n} className="ledger-row">
                <Link
                  href={s.href}
                  className="group relative grid gap-5 px-2 py-10 md:grid-cols-12 md:items-center md:gap-8"
                >
                  <span className="tnum font-display text-4xl leading-none text-gold/60 transition-colors duration-300 group-hover:text-gold md:col-span-1">
                    {s.n}
                  </span>
                  <h3 className="font-display text-[1.375rem] tracking-[0.02em] uppercase transition-transform duration-300 group-hover:text-champagne md:col-span-4 md:group-hover:translate-x-1">
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
      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Out of area?</p>
          <h2 className="mt-5">Remote lodgement, in three steps</h2>
          <p className="mt-6 text-[17px]">
            TASC makes it easy for clients living in remote areas to send us
            your paperwork and communicate your needs, using our hassle-free
            mail-in service.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="gilt relative bg-navy-2 p-9">
              <span className="font-display text-4xl leading-none text-gold">
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

      {/* --------------------------------------------------------- Why TASC */}
      <section className="texture ruled relative isolate overflow-hidden border-y border-line bg-midnight py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-56 -left-40 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(215,162,69,0.12),transparent_65%)]"
        />
        <EmblemMark className="-right-16 -bottom-24 h-[34rem]" opacity={0.05} />

        <div className="relative mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="eyebrow">Why TASC</p>
            <h2 className="mt-5">Local knowledge, without the local limits</h2>
          </div>

          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <li key={r.title} className="border-t border-rule/60 pt-6">
                <span className="tnum font-ui text-[10px] font-semibold tracking-[0.24em] text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-4">{r.title}</h3>
                <p className="mt-3 text-[15px] text-muted">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA
          Closes the page the way the hero opened it — centred inside the
          guidelines' frame. */}
      <section className="relative isolate overflow-hidden bg-navy px-5 py-20 text-center sm:py-24">
        <PageFrame />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-72 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,162,69,0.13),transparent_62%)]"
        />
        <div className="relative mx-auto max-w-2xl">
          <p className="eyebrow eyebrow-center">Bookings essential</p>
          <h2 className="mt-5">Ready to lodge?</h2>
          <DiamondRule className="mx-auto mt-7 w-32" width="full" />
          <p className="mt-7">
            Extended office hours run July to September. Call us or send a
            message and we&rsquo;ll find you a time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us" className="btn btn-primary">
              Get in touch
              <ArrowRight />
            </Link>
            <a href={`tel:${BUSINESS.phoneHref}`} className="btn btn-ghost">
              <Phone />
              <span className="tnum">{BUSINESS.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
