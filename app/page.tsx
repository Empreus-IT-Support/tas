import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/site";

const SERVICES = [
  {
    title: "Taxation and Accounting",
    blurb: "Handy tax tools and personalised advice you can trust.",
    href: "/taxation-and-accounting#taxation-and-accounting",
  },
  {
    title: "Remote Lodgement",
    blurb: "Hassle-free service for those living in remote areas.",
    href: "/taxation-and-accounting#remote-lodgement",
  },
  {
    title: "GST, IAS, ABN, PAYG, FTC, FBT",
    blurb: "Tax compliance made simple.",
    href: "/taxation-and-accounting#gst-ias-abn",
  },
  {
    title: "Contact Us",
    blurb: "Call or email your local office today!",
    href: "/contact-us",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate bg-ink">
        <Image
          src="/images/banner-2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="font-heading text-xs font-bold tracking-[0.25em] text-brand-gold uppercase">
            Tax &amp; Financial Advice in Mount Isa
          </p>
          <h1 className="mt-4 max-w-3xl text-white">
            Maximise your returns by letting us minimise your tax
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact-us"
              className="rounded bg-brand-red px-8 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase hover:bg-brand-red-dark"
            >
              Book an appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="rounded border border-white/40 px-8 py-3.5 font-heading text-sm font-bold tracking-wide text-white uppercase hover:border-brand-gold hover:text-brand-gold"
            >
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose-tasc">
            <h2 className="rule">A friendly, professional local practice</h2>
            <div className="mt-8">
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
            </div>
          </div>

          <aside className="rounded border border-fog bg-mist p-8">
            <h3 className="font-heading text-lg">
              Remote or out of area lodgement
            </h3>
            <p className="mt-3 text-sm">
              Living outside Mount Isa? Send us your paperwork and we will take
              care of the rest — our out-of-area lodgement service is open to
              anyone in Australia.
            </p>
            <Link
              href="/taxation-and-accounting#remote-lodgement"
              className="mt-6 inline-block font-heading text-sm font-bold tracking-wide text-brand-red uppercase hover:text-brand-red-dark"
            >
              Learn more →
            </Link>
          </aside>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="rule rule-center text-center">How we can help</h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <Link
                  href={s.href}
                  className="flex h-full flex-col rounded border border-fog bg-white p-7 hover:border-brand-red hover:shadow-lg"
                >
                  <h3 className="font-heading text-base tracking-wide uppercase">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm">{s.blurb}</p>
                  <span className="mt-5 font-heading text-xs font-bold tracking-wide text-brand-red uppercase">
                    Learn more →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-white">Ready to lodge?</h2>
            <p className="mt-2 text-white/70">
              Bookings are essential — extended hours run July to September.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="shrink-0 rounded bg-brand-gold px-8 py-3.5 font-heading text-sm font-bold tracking-wide text-ink uppercase hover:bg-white"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
