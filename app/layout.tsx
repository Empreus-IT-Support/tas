import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Preloader from "@/components/Preloader";
import {
  BRAND,
  BUSINESS,
  PRACTICE_ID,
  SITE_DESCRIPTION,
  SITE_ID,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
  TAGLINE,
} from "@/lib/site";

// Brand guidelines §03. Cinzel is the display face — it echoes the wordmark,
// which is set in the same inscriptional style. SemiBold (600) is the weight
// the guide specifies; 700 is loaded for the few places type sits small on a
// dark ground and needs the extra body.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});

// Montserrat carries body copy, UI and the tagline — one family doing all
// three, differentiated by weight and tracking.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Tax & Accounting in Mount Isa | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  // No `publisher`: the brand guidelines give an ABN but no legal entity
  // name, and naming the wrong company is worse than naming none.
  formatDetection: { telephone: true, address: true, email: true },
  keywords: [
    "tax agent Mount Isa",
    "accountant Mount Isa",
    "tax return Mount Isa",
    "BAS agent",
    "SMSF",
    "business structures",
    "remote tax lodgement",
    "North West Queensland",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: SITE_NAME,
    title: `Tax & Accounting in Mount Isa | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `Tax & Accounting in Mount Isa | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: BRAND.navy,
  // The site is navy throughout, so the browser should render its own
  // furniture — scrollbars, form controls, autofill — to match.
  colorScheme: "dark",
};

/**
 * A `@graph` rather than a bare node, so the practice, the website and the
 * breadcrumbs on every inner page all describe one entity instead of three
 * unrelated ones. `PRACTICE_ID` and `SITE_ID` are exported through lib/site
 * and referenced from PageBanner's BreadcrumbList.
 */
const practice = {
  "@type": "AccountingService",
  "@id": PRACTICE_ID,
  name: SITE_NAME,
  alternateName: [SITE_SHORT_NAME, "Tax, Accounting and Super Centre"],
  slogan: TAGLINE,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/lockup-stacked.png`,
  image: `${SITE_URL}/brand/lockup-stacked.png`,
  description: SITE_DESCRIPTION,
  telephone: `+61${BUSINESS.phoneHref.replace(/^\+61/, "")}`,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.line2}`,
    addressLocality: BUSINESS.address.suburb,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.postcode,
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:30",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "AUD",
  // East Street, Mount Isa, from OpenStreetMap (Nominatim) — the previous
  // value was town-centre and about 1km west of the street. Nominatim has no
  // entry for Turanga Shopping Centre, so this is the street rather than the
  // shopfront; confirm the exact position before go-live (see README).
  geo: {
    "@type": "GeoCoordinates",
    latitude: -20.7264,
    longitude: 139.5024,
  },
  sameAs: [
    "https://www.localsearch.com.au/profile/tax-accounting-and-super-centre/mount-isa-qld/LyOC",
  ],
  areaServed: [
    { "@type": "City", name: "Mount Isa" },
    { "@type": "AdministrativeArea", name: "North West Queensland" },
    { "@type": "Country", name: "Australia" },
  ],
  knowsAbout: [
    "Income tax returns",
    "Business activity statements",
    "Self-managed superannuation funds",
    "Business structures",
    "Fringe benefits tax",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tax and Accounting Services",
    itemListElement: [
      "Taxation and Accounting",
      "Remote or Out of Area Lodgement Service",
      "GST, IAS, ABN, PAYG, FTC, FBT",
      "Business Structure Advice and Formation",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-AU",
  publisher: { "@id": PRACTICE_ID },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [practice, website],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${cinzel.variable} ${montserrat.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:m-2 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <Preloader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
