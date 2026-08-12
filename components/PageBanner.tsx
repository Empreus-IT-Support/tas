import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

/**
 * Dark masthead used at the top of every inner page. Built from type, the
 * halftone brand texture and the crest as a watermark rather than the old
 * site's stock photography — see README, "Before go-live".
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
    <section className="texture relative isolate overflow-hidden bg-ink">
      {breadcrumbLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      )}
      {/* Gold wash bleeding in from the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 -right-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(184,199,44,0.14),transparent_65%)]"
      />
      {/* Crest watermark */}
      <Image
        src="/images/logo.png"
        alt=""
        width={712}
        height={192}
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-[-3rem] w-[28rem] max-w-none opacity-[0.06] select-none sm:opacity-[0.08]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-9 pb-10 sm:pt-11 sm:pb-12">
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex items-center gap-2 font-ui text-[10px] font-semibold tracking-[0.18em] text-silver/55 uppercase">
            <li>
              <Link href="/" className="hover:text-lion">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-silver/70">{eyebrow}</li>
          </ol>
        </nav>

        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-[24ch] text-white">{title}</h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-silver/70">{intro}</p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="h-1 bg-gradient-to-r from-red via-lion to-red"
      />
    </section>
  );
}
