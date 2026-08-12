import type { Metadata, Viewport } from "next";
import { Arvo, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Preloader from "@/components/Preloader";
import { BUSINESS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Arvo, Montserrat and Open Sans were all loaded by the original TASC site —
// Arvo's slab serif carries the heraldic weight of the crest.
const arvo = Arvo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arvo",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Tax & Accounting in Mount Isa | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: BUSINESS.legalName,
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
  themeColor: "#030202",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: SITE_NAME,
  alternateName: "TASC",
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${arvo.variable} ${montserrat.variable} ${openSans.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-60 focus:m-2 focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
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
