export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tascentre.com.au";

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

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/taxation-and-accounting", label: "Taxation & Accounting" },
  { href: "/tax-resources", label: "Tax Resources" },
  { href: "/keep-informed", label: "Keep Informed" },
  { href: "/contact-us", label: "Contact Us" },
] as const;
