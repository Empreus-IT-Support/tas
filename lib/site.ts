/**
 * Canonical origin for metadata, sitemap, robots and JSON-LD.
 *
 * Order matters. An explicit NEXT_PUBLIC_SITE_URL always wins. Failing that
 * we take whatever domain Vercel is actually serving, so a deploy never
 * claims to live at tascentre.com.au while that domain is still parked —
 * canonicals pointing at a dead host are worse than no canonicals.
 *
 * Only ever read from server components (layout, robots, sitemap,
 * PageBanner); VERCEL_* are not exposed to the client bundle.
 */
const VERCEL_HOST =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (VERCEL_HOST ? `https://${VERCEL_HOST}` : "https://www.tascentre.com.au");

/**
 * True once the site is served from its real domain. Until then the deploy
 * is a preview of a business that has not confirmed it wants to be online,
 * so it should stay out of search results.
 */
export const IS_CANONICAL_HOST = !/\.vercel\.app$/.test(SITE_URL);

/**
 * Stable identifiers for the structured-data graph.
 *
 * Fragment URIs, not page URLs: the entity is the practice, which is not the
 * same thing as the home page. Every node that refers to the practice or the
 * site uses these, so the layout's graph and each inner page's BreadcrumbList
 * describe one entity rather than several unlinked ones.
 */
export const PRACTICE_ID = `${SITE_URL}/#practice`;
export const SITE_ID = `${SITE_URL}/#website`;

/**
 * Practice name and tagline are fixed by the brand guidelines
 * (docs/TASC_Mount_Isa_Brand_Guidelines.docx, §05 Practice details and
 * §04 Voice). The tagline is never abbreviated to "TAS".
 */
export const SITE_NAME = "TASC Mount Isa";

export const SITE_SHORT_NAME = "TASC";

export const TAGLINE = "Tax, Accounting & Super";

export const SITE_DESCRIPTION =
  "Tax, accounting and superannuation for Mount Isa and North West Queensland. Individual and business returns, business structures, GST and BAS, plus a remote lodgement service for clients anywhere in Australia.";

/**
 * Business details.
 *
 * `phone`, `email`, `abn`, `postal` and `website` are the approved values
 * from the brand guidelines, §05 — these supersede everything recovered from
 * the archived Duda site and must not be edited without the client.
 *
 * Everything marked UNCONFIRMED below came from the Wayback capture of the
 * old site (2025-11-24) under the previous operator, and has NOT been
 * reconfirmed against the current practice. See README, "Before go-live".
 */
export const BUSINESS = {
  /**
   * UNCONFIRMED. The brand guidelines give the ABN but no legal entity name,
   * and this ABN is not the one the archived site carried (Thunder Tax Pty
   * Ltd, 99 123 853 681). Until the client confirms the entity, the footer
   * shows the practice name against the ABN rather than inventing a "t/a".
   */
  legalName: null,
  tradingAs: SITE_NAME,
  /** Brand guidelines §05. */
  abn: "87 061 179 440",
  /**
   * Brand guidelines §05 list this as "[to be confirmed]". Nothing renders
   * until it holds a number — a tax practice must not display a registration
   * it has not supplied.
   */
  tpbNumber: null,
  /**
   * The Tax Practitioners Board "Registered" badge, `public/images/
   * tax-practitioners-board.png`, inherited from the archived site.
   *
   * Off until the client confirms it, for two reasons. The artwork has a
   * registration baked into it — "Tax (financial) adviser 25326396" — issued
   * to the practice under its previous ABN, which is not the ABN in §05. And
   * the TPB wound that registration category up: tax (financial) advisers
   * moved to ASIC's Financial Advisers Register and the TPB stopped
   * registering them, so the badge is out of date regardless of who holds it.
   *
   * Flip to true only with a current badge supplied by the client, and
   * replace the artwork at the same time.
   */
  showTpbBadge: false,
  /** Brand guidelines §05. */
  phone: "07 4743 6342",
  phoneHref: "+61747436342",
  /** Brand guidelines §05. */
  email: "tasc@arnfin.net.au",
  /** Brand guidelines §05. */
  website: "www.tascentre.com.au",
  /** Brand guidelines §05 — mail goes to the Gold Coast, not Mount Isa. */
  postal: "PO Box 929, Southport BC QLD 4215",
  /** UNCONFIRMED — archived site, 2025-11-24 capture. */
  address: {
    line1: "Shop 2, Turanga Shopping Centre",
    line2: "26 East Street",
    suburb: "Mount Isa",
    state: "QLD",
    postcode: "4825",
  },
  mapsUrl:
    "https://maps.google.com/maps?q=26+EAST+STREET,+TURANGA+SHOPPING+CENTRE,+MOUNT+ISA+QLD+4825",
  /** UNCONFIRMED — archived site. */
  hours: [
    { days: "Monday – Friday", time: "8.30am – 5.30pm" },
    { days: "Saturday", time: "Closed" },
    { days: "Sunday & public holidays", time: "Closed" },
  ],
  hoursNote:
    "Extended office hours July to September. Please call for an appointment at other times — bookings essential.",
} as const;

/**
 * `label` is the full page name — used in the footer, breadcrumbs and
 * sitemap. `short` is what the top nav renders: the full names are too long
 * to sit on one line in a horizontal bar and wrap into a ragged menu.
 */
export const NAV = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/about-us", label: "About Us", short: "About" },
  {
    href: "/taxation-and-accounting",
    label: "Taxation & Accounting",
    short: "Services",
  },
  { href: "/tax-resources", label: "Tax Resources", short: "Resources" },
  { href: "/keep-informed", label: "Keep Informed", short: "Updates" },
  { href: "/contact-us", label: "Contact Us", short: "Contact" },
] as const;

/**
 * Brand palette, mirrored from app/globals.css so server-rendered graphics
 * (the OG image) draw from the same values as the stylesheet.
 * Brand guidelines §02.
 */
export const BRAND = {
  navy: "#0C1B33",
  midnight: "#050B1A",
  gold: "#D7A245",
  champagne: "#FBCD68",
  bronze: "#9B501D",
  platinum: "#EDEDED",
} as const;

/**
 * Per-page metadata.
 *
 * Every inner page must call this rather than writing `title` /`description` /
 * `alternates` by hand. Next inherits `openGraph` from the nearest ancestor
 * that declares one, and the root layout declares a complete object for the
 * home page — so a page that sets only a title silently ships the *home
 * page's* og:title, og:description and, worst of all, `og:url` pointing at
 * `/`. Sharing any inner page then produced a card for the home page. This
 * helper exists so that cannot happen again.
 *
 * `images` MUST be set explicitly. `app/opengraph-image.tsx` is a file
 * convention that applies to routes which declare no `openGraph` of their
 * own — the moment a route declares one, it *replaces* the inherited object
 * and the image goes with it. Verified: adding `openGraph` here without
 * `images` dropped `og:image` from every inner page while leaving the home
 * page's intact, which is the kind of regression nothing surfaces until a
 * link is already shared.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${TAGLINE}, Mount Isa`,
} as const;

export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path with a leading slash, e.g. "/about-us". */
  path: string;
}) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website" as const,
      locale: "en_AU",
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
