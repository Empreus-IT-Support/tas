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
  (VERCEL_HOST ? `https://${VERCEL_HOST}` : "https://tascentre.com.au");

/**
 * True once the site is served from its real domain. Until then the deploy
 * is a preview of a business that has not confirmed it wants to be online,
 * so it should stay out of search results.
 */
export const IS_CANONICAL_HOST = !/\.vercel\.app$/.test(SITE_URL);

export const SITE_NAME = "Tax, Accounting and Super Centre";

export const SITE_SHORT_NAME = "TASC";

export const SITE_DESCRIPTION =
  "Registered tax agents and public accountants in Mount Isa. Individual and business tax returns, business structures, GST and BAS, plus a remote lodgement service for clients anywhere in Australia.";

// Sourced from the archived site (Wayback capture 2025-11-24). See
// ../tascentre-archive/README.md — verify with the client before going live.
export const BUSINESS = {
  legalName: "Thunder Tax Pty Ltd",
  tradingAs: SITE_NAME,
  abn: "99 123 853 681",
  authorisedRep:
    "Corporate Authorised Representative No. 1276821 of Mawson Wealth Pty Ltd (AFSL 552819)",
  phone: "07 4743 6342",
  phoneHref: "+61747436342",
  email: "reception@tascentre.com.au",
  address: {
    line1: "Shop 2, Turanga Shopping Centre",
    line2: "26 East Street",
    suburb: "Mount Isa",
    state: "QLD",
    postcode: "4825",
  },
  mapsUrl:
    "https://maps.google.com/maps?q=26+EAST+STREET,+TURANGA+SHOPPING+CENTRE,+MOUNT+ISA+QLD+4825",
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
