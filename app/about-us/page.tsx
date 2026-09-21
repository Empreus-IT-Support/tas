import DiamondRule from "@/components/DiamondRule";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import PageFrame from "@/components/PageFrame";
import EmblemMark from "@/components/EmblemMark";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "TASC Mount Isa began as Steve Williams and Co. Read our story, our mission and vision, and meet our management.",
  path: "/about-us",
});

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
      <section className="relative isolate overflow-hidden">
        <EmblemMark className="-top-24 -left-28 h-[28rem]" opacity={0.035} />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Our story</p>
              <h2 className="mt-5">From Steve Williams and Co. to TASC</h2>
              <DiamondRule className="mt-8" />
            </div>
            <div className="prose-tasc text-[17px] lg:col-span-7">
              <p>
                The practice began in Mount Isa as Steve Williams and Co., which
                then became known as the Tax, Accounting and Super Centre. That
                shortens to TASC, a play on the word &lsquo;task&rsquo;, and it
                is how the town has known us ever since — today as TASC Mount
                Isa. We enjoy and respect what we do and keep it fun, friendly
                and real.
              </p>
              <p>
                Our success has come from our local knowledge, identifying and
                understanding the individual needs of our clients and providing
                them with prompt service. We have always worked outside the
                spectrum of the typical accounting practice by recognising and
                prioritising our clients&rsquo; needs.
              </p>
              <p>
                At TASC we do not see our clients as numbers — we see people
                with a dream and a vision to be financially secure, and our
                focus is to help our clients achieve their dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Mission/Vision */}
      <section className="texture relative isolate overflow-hidden border-y border-line bg-midnight py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(215,162,69,0.13),transparent_65%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
          <article className="gilt relative bg-navy p-10 sm:p-12">
            <p className="eyebrow">Our Mission</p>
            <p className="mt-7 text-[17px] leading-relaxed">
              Our mission is to build a successful company by providing a
              quality affordable service available to everyday people. We will
              never compromise our ethics in the pursuit of profit and, as such,
              expect to build a company founded on the best moral conduct for
              the benefit of not only the clients but also the community in
              which we operate.
            </p>
          </article>
          <article className="gilt relative bg-navy p-10 sm:p-12">
            <p className="eyebrow">Our Vision</p>
            <p className="mt-7 text-[17px] leading-relaxed">
              TASC Mount Isa is a reputable, forward-thinking, successful firm.
              We offer a full suite of taxation and accounting services. If you
              are looking for friendly, professional advice for your individual
              or business needs, contact our office to speak with qualified
              professionals in their respective fields.
            </p>
          </article>
        </div>
      </section>

      {/* -------------------------------------------------------- Management */}
      <section className="relative isolate overflow-hidden bg-navy py-16 text-center sm:py-24">
        <PageFrame />
        <div className="relative mx-auto max-w-7xl px-5">
          <p className="eyebrow eyebrow-center">Our Management</p>
          <h2 className="mt-5">Who you&rsquo;ll be dealing with</h2>
          <DiamondRule className="mx-auto mt-7 w-32" width="full" />

          <div className="mt-14 flex justify-center">
            <article className="gilt relative w-full max-w-md bg-navy-2 p-10 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center border border-gold/40 font-display text-2xl text-gold">
                IJ
              </span>
              <h3 className="mt-7 text-2xl">Iain Jeffery</h3>
              <p className="mt-2 text-sm text-muted">MFP, BSc, Adv Dip FS</p>
              <p className="mt-5 font-ui text-[11px] font-semibold tracking-[0.24em] text-gold uppercase">
                Director
              </p>
            </article>
          </div>

          <div className="mt-14">
            <Link href="/contact-us" className="link-arrow">
              Talk to our team
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
