# tascentre — Tax, Accounting and Super Centre

Next.js rebuild of `tascentre.com.au` for Tax, Accounting and Super Centre (TASC),
a registered tax agent and public accountant in Mount Isa, QLD.

The previous site was built on Duda and went offline between late Nov 2025 and
Aug 2026 — the domain now serves a registrar parking page and its HTTPS is
broken at the TLS handshake. Every word, document and brand asset here was
recovered from the Wayback Machine and the still-live Duda CDN. The archive
lives beside this project at `../tascentre-archive` (see its `README.md`).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · TypeScript ·
Resend for form delivery.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

A dev-server entry is registered in `../alrta/.claude/launch.json` as
`tascentre` on port 3000.

## Routes

| Route | Notes |
|---|---|
| `/` | Hero, practice intro, remote-lodgement callout, four service cards |
| `/about-us` | Story, mission, vision, management |
| `/taxation-and-accounting` | Three anchored sections: taxation & accounting, remote lodgement, GST/IAS/ABN/PAYG/FTC/FBT |
| `/tax-resources` | Fact sheets, ATO calculators, checklists, forms, useful links |
| `/keep-informed` | Newsletter signup (name/phone/email only) |
| `/contact-us` | Enquiry form, address, phone, email, opening hours |
| `/api/contact` | POST endpoint shared by both forms |

`app/sitemap.ts`, `app/robots.ts` and JSON-LD (`AccountingService`) in
`app/layout.tsx` are all driven from `lib/site.ts` — edit business details in
one place.

## Forms

Both forms post to `/api/contact`. The endpoint validates, rate-limits
(5/min/IP, in-memory), carries a honeypot field, and sends plain-text mail via
Resend. Without `RESEND_API_KEY` it returns a 503 whose message tells the
visitor to phone or email instead — so the site degrades gracefully rather than
failing silently. Copy `.env.example` to `.env.local` to configure.

## Before go-live

- [ ] **Confirm the business is still trading and wants this.** The domain is
      parked and the practice had contracted to tax/accounting only before it
      went dark — verify with the client before publishing anything.
- [ ] **Verify every business detail in `lib/site.ts`** against the client:
      address, phone, email, hours, ABN, and especially the authorised
      representative line. The archive shows this changed from InterPrac
      (AFSL 246638) to Mawson Wealth (AFSL 552819) — confirm which is current.
- [x] ~~Link-check the ATO URLs.~~ Done 2026-08-12: the ATO had replaced its
      whole IA and 7 links 404'd. All re-pointed at the current site and
      verified 200 end-to-end. Worth re-running periodically.
- [ ] **Commission real photography.** The design is deliberately photo-free —
      the five inherited stock banners in `public/images/` are dated and
      blue-tinted, and `banner-2.jpg` is a US IRS Form 1040 sitting on an
      Australian tax practice. They are kept only as archive material. Photos
      of the Mount Isa office, the team and the shopfront would lift the hero
      and the About page considerably.
- [ ] **Re-check the client documents.** The PDFs and spreadsheets in
      `public/documents/` date to 2018–2020 and cite superseded thresholds.
      Get current versions from the client.
- [ ] Set `RESEND_API_KEY` in the deployment environment and verify the sending
      domain in Resend.
- [ ] Add a real favicon — `app/icon.svg` is a placeholder built from the brand
      colours, not the TASC crest.
- [ ] **Confirm the map coordinates** in the JSON-LD in `app/layout.tsx`. They
      are Mount Isa town centre, not a surveyed position for the shopfront.
- [ ] **Point the domain at Vercel.** `tascentre.com.au` currently resolves to
      a registrar parking page at 103.42.108.46 and its HTTPS is broken at the
      TLS handshake. Until the DNS is changed, `robots.ts` deliberately keeps
      the `*.vercel.app` deploy out of search results.

## SEO

- Per-page `alternates.canonical`; `metadataBase` from `SITE_URL`.
- `app/opengraph-image.tsx` generates a 1200×630 PNG at build time from the
  brand palette — no remote fonts or images, so it renders identically
  anywhere. Note it fails under the Turbopack **dev** server
  (`Input buffer contains unsupported image format`) but builds fine; check it
  via `npm run build` rather than `npm run dev`. Satori also rejects
  `radial-gradient` here, hence the flat crest stripe.
- `AccountingService` JSON-LD in the layout with address, hours, geo,
  `areaServed`, `knowsAbout` and `sameAs`; `BreadcrumbList` on every inner
  page via `PageBanner`'s `path` prop.
- `sitemap.ts`, `robots.ts`, `viewport.themeColor`, `lang="en-AU"`.

## Hardening

- CSP locks everything to same-origin: no third-party scripts, fonts, frames
  or images are loaded at all. `script-src` keeps `'unsafe-inline'`
  deliberately — nonce-based CSP needs middleware that stamps a per-request
  nonce, which would force every route out of static generation. That is a
  real cost for a fully static site with no third-party or user-generated
  script.
- Also set: HSTS (preload), `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`,
  `Cross-Origin-Resource-Policy`, `X-Permitted-Cross-Domain-Policies`,
  `Origin-Agent-Cluster`. `/api/*` is `no-store` + `noindex`.
- `/api/contact` rejects cross-origin posts (403), non-JSON content types
  (415), bodies over 16KB (413, checked against both `content-length` and
  what actually arrived) and non-object JSON (400), on top of the existing
  honeypot and 5/min/IP rate limit.

## Design

The identity is built out from the crest recovered in the archive — a black
shield, red outline and gold lion rampant — rather than from stock imagery.

- **Palette — sampled from `public/images/logo.png`, not chosen.** Counting
  opaque pixels on a canvas gives shield `#030202` (9,701px), wordmark
  `#d9dedf` (6,681px), outline `#e00101` (2,875px), lion `#b8c72c` (1,739px).
  Note the lion is **yellow-green, not gold**, and the silver wordmark is the
  mark's second-largest colour — together they make the scheme read cool
  rather than warm. `--color-lion-deep #67711a` is the same hue darkened for
  light backgrounds, where `#b8c72c` manages only 1.87:1 against white.
  Measured ratios: lion on ink 11.09:1, lion-deep on white 5.31:1, red on
  white 5.03:1, silver on ink 15.26:1, muted on white 4.77:1.
- **Type** — Arvo (slab serif) for display, Montserrat for small uppercase UI
  labels, Open Sans for body. All three were already in the original site's
  font stack; Arvo's slab weight is what ties the headings to the crest.
- **Recurring motifs**, defined as utilities in `app/globals.css`: `.eyebrow`
  (small caps with a lion-coloured tick), `.ledger-rule` (the double hairline of a ruled
  accounts book), `.notch` (clips a panel's top corners like the shield),
  `.texture` (a halftone dot grid generated from the lion colour).
- **Dark mastheads** on every inner page — type, a lion radial wash, the
  halftone texture and the crest as a watermark, closed with a red/lion rule.
- Services are numbered editorial rows, not a grid of identical cards; the two
  long pages carry a sticky in-page nav; the header condenses on scroll.

The old site's every page carried unedited Duda placeholder carousels
("Slide title / Write your caption here / Button"). That was live on the real
site; it has deliberately not been reproduced.
