import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tax, Accounting and Super Centre began in Mount Isa as Steve Williams and Co. Read our story, our mission and vision, and meet our management.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        intro="We enjoy and respect what we do, and we keep it fun, friendly and real."
        image="/images/banner-3.jpg"
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <div className="prose-tasc">
          <p>
            Tax, Accounting and Super Centre began in Mount Isa as Steve Williams
            and Co., which then became known as Tax, Accounting and Super Centre.
            This shortens to TASC, a play on the word &lsquo;task&rsquo;. We
            enjoy and respect what we do and keep it fun, friendly and real.
          </p>
          <p>
            Our success has come from our local knowledge, identifying and
            understanding the individual needs of our clients and providing them
            with prompt service. We have always worked outside the spectrum of
            the typical accounting practice by recognising and prioritising our
            clients&rsquo; needs. At TASC we do not see our clients as numbers —
            we see people with a dream and a vision to be financially secure, and
            our focus is to help our clients achieve their dreams.
          </p>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <article className="rounded border border-fog bg-white p-8">
            <h2 className="rule font-heading text-xl tracking-wide uppercase">
              Our Mission
            </h2>
            <p className="mt-7">
              Our mission is to build a successful company by providing a quality
              affordable service available to everyday people. We will never
              compromise our ethics in the pursuit of profit and, as such, expect
              to build a company founded on the best moral conduct for the
              benefit of not only the clients but also the community in which we
              operate.
            </p>
          </article>

          <article className="rounded border border-fog bg-white p-8">
            <h2 className="rule font-heading text-xl tracking-wide uppercase">
              Our Vision
            </h2>
            <p className="mt-7">
              Tax, Accounting and Super Centre is a reputable, forward-thinking,
              successful firm. We offer a full suite of taxation and accounting
              services. If you are looking for friendly, professional advice for
              your individual or business needs, contact our office to speak with
              qualified professionals in their respective fields.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <h2 className="rule rule-center text-center font-heading text-xl tracking-wide uppercase">
          Our Management
        </h2>
        <div className="mt-12 flex justify-center">
          <article className="w-full max-w-sm rounded border border-fog p-8 text-center">
            <h3 className="font-heading text-lg">Iain Jeffery</h3>
            <p className="mt-1 text-sm text-body">MFP, BSc, Adv Dip FS</p>
            <p className="mt-3 font-heading text-xs font-bold tracking-[0.2em] text-brand-red uppercase">
              Director
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
