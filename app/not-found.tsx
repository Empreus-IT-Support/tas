import type { Metadata } from "next";
import Link from "next/link";
import DiamondRule from "@/components/DiamondRule";
import PageFrame from "@/components/PageFrame";
import { ArrowRight, Phone } from "@/components/icons";
import { BUSINESS, NAV } from "@/lib/site";

/**
 * A 404 must never be indexed, and must never be canonicalised to another
 * page — Next's default 404 carries no metadata at all, so it inherited the
 * root layout's canonical pointing at `/`, which invites a crawler to treat
 * every dead URL as a duplicate of the home page.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for isn't here.",
  // Next already emits `noindex` for a not-found route; the point of this
  // object is `alternates: {}`, which clears the inherited canonical.
  alternates: {},
};

export default function NotFound() {
  return (
    <section className="vignette relative isolate flex min-h-[min(80svh,42rem)] flex-col items-center justify-center overflow-hidden bg-navy px-5 py-20 text-center">
      <PageFrame />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-72 hidden h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(215,162,69,0.13),transparent_62%)] sm:block"
      />

      <div className="relative mx-auto max-w-xl">
        <p className="eyebrow eyebrow-center">Error 404</p>
        <h1 className="mt-6">
          <span className="gilt-text">Page not found</span>
        </h1>
        <DiamondRule className="mx-auto mt-8 w-40" width="full" />
        <p className="mt-8">
          The page you were looking for isn&rsquo;t here — it may have moved, or
          the link may be out of date. Try one of these instead, or give us a
          call and we&rsquo;ll point you to the right place.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3">
          {NAV.filter((item) => item.href !== "/").map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-arrow">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
            <ArrowRight />
          </Link>
          <a href={`tel:${BUSINESS.phoneHref}`} className="btn btn-ghost">
            <Phone />
            <span className="tnum">{BUSINESS.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
