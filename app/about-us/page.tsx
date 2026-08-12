import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tax, Accounting and Super Centre began in Mount Isa as Steve Williams and Co. Read our story, our mission and vision, and meet our management.",
  alternates: { canonical: "/about-us" },
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        path="/about-us"
        eyebrow="About Us"
        title="We keep it fun, friendly and real"
        intro="We enjoy and respect what we do. Our success has come from local knowledge, prompt service, and never treating clients as numbers."
      />

      {/* ------------------------------------------------------------- Story */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Our story</p>
            <h2 className="mt-5">From Steve Williams and Co. to TASC</h2>
            <div className="ledger-rule mt-8 max-w-[9rem]" />
          </div>
          <div className="prose-tasc text-[17px] lg:col-span-7">
            <p>
              Tax, Accounting and Super Centre began in Mount Isa as Steve
              Williams and Co., which then became known as Tax, Accounting and
              Super Centre. This shortens to TASC, a play on the word
              &lsquo;task&rsquo;. We enjoy and respect what we do and keep it
              fun, friendly and real.
            </p>
            <p>
              Our success has come from our local knowledge, identifying and
              understanding the individual needs of our clients and providing
              them with prompt service. We have always worked outside the
              spectrum of the typical accounting practice by recognising and
              prioritising our clients&rsquo; needs.
            </p>
            <p>
              At TASC we do not see our clients as numbers — we see people with a
              dream and a vision to be financially secure, and our focus is to
              help our clients achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Mission/Vision */}
      <section className="texture relative isolate overflow-hidden bg-ink py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(184,199,44,0.11),transparent_65%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-px overflow-hidden border border-white/10 bg-white/10 px-0 md:mx-auto md:grid-cols-2">
          <article className="bg-ink p-10 sm:p-12">
            <p className="eyebrow eyebrow-light">Our Mission</p>
            <p className="mt-7 text-[17px] leading-relaxed text-white/75">
              Our mission is to build a successful company by providing a
              quality affordable service available to everyday people. We will
              never compromise our ethics in the pursuit of profit and, as such,
              expect to build a company founded on the best moral conduct for
              the benefit of not only the clients but also the community in
              which we operate.
            </p>
          </article>
          <article className="bg-ink p-10 sm:p-12">
            <p className="eyebrow eyebrow-light">Our Vision</p>
            <p className="mt-7 text-[17px] leading-relaxed text-white/75">
              Tax, Accounting and Super Centre is a reputable, forward-thinking,
              successful firm. We offer a full suite of taxation and accounting
              services. If you are looking for friendly, professional advice for
              your individual or business needs, contact our office to speak
              with qualified professionals in their respective fields.
            </p>
          </article>
        </div>
      </section>

      {/* -------------------------------------------------------- Management */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <div className="text-center">
          <p className="eyebrow eyebrow-center">Our Management</p>
          <h2 className="mt-5">Who you&rsquo;ll be dealing with</h2>
        </div>

        <div className="mt-14 flex justify-center">
          <article className="notch relative w-full max-w-md border border-line bg-paper p-10 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-red via-lion to-red"
            />
            <span className="mx-auto flex h-16 w-16 items-center justify-center bg-ink font-display text-2xl text-lion">
              IJ
            </span>
            <h3 className="mt-7 text-2xl">Iain Jeffery</h3>
            <p className="mt-2 text-sm text-muted">MFP, BSc, Adv Dip FS</p>
            <p className="mt-5 font-ui text-[11px] font-bold tracking-[0.24em] text-red uppercase">
              Director
            </p>
          </article>
        </div>

        <div className="mt-16 text-center">
          <Link href="/contact-us" className="link-arrow">
            Talk to our team
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
