import EmblemMark from "@/components/EmblemMark";
import PageFrame from "@/components/PageFrame";
import DiamondRule from "@/components/DiamondRule";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

/**
 * Masthead at the top of every inner page.
 *
 * Built from type, the gold frame of the guidelines cover, a gold wash and
 * the emblem as a watermark — never photography. The old site's stock banners
 * are dated and blue-tinted, and one of them is a US IRS Form 1040 (see
 * README, "Before go-live").
 */
export default function PageBanner({
  eyebrow,
  title,
  intro,
  path,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Page path, e.g. "/about-us" — emits BreadcrumbList structured data. */
  path?: string;
}) {
  const breadcrumbLd = path && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: eyebrow,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return (
    <section className="texture vignette relative isolate overflow-hidden border-b border-line bg-navy">
      <PageFrame />
      {breadcrumbLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 -right-40 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(215,162,69,0.16),transparent_62%)]"
      />
      <EmblemMark className="-right-16 -bottom-28 h-[26rem]" opacity={0.07} />

      <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2.5 font-ui text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gold/40">
              /
            </li>
            <li className="text-gold">{eyebrow}</li>
          </ol>
        </nav>

        {/* No eyebrow here — the breadcrumb above already ends on this exact
            label, and printing it twice read as a mistake. */}
        <h1 className="max-w-[20ch]">{title}</h1>
        <DiamondRule className="mt-8 w-40" width="full" />
        {intro && <p className="mt-7 max-w-2xl text-[17px]">{intro}</p>}
      </div>
    </section>
  );
}
