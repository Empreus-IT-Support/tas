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
- [ ] **Link-check the ATO URLs in `app/tax-resources/page.tsx`.** They are
      carried over verbatim from the old site; the ATO has restructured since,
      so some will redirect and some may 404.
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

## Design

The identity is built out from the crest recovered in the archive — a black
shield, red outline and gold lion rampant — rather than from stock imagery.

- **Palette** — `--color-ink #0e1012`, `--color-red #d81b17`,
  `--color-gold #ffd82d`, `--color-paper #fbfaf8`. On light backgrounds gold
  drops to `--color-gold-deep #b8860b` so small text stays legible; bright gold
  is reserved for dark surfaces.
- **Type** — Arvo (slab serif) for display, Montserrat for small uppercase UI
  labels, Open Sans for body. All three were already in the original site's
  font stack; Arvo's slab weight is what ties the headings to the crest.
- **Recurring motifs**, defined as utilities in `app/globals.css`: `.eyebrow`
  (small caps with a gold tick), `.ledger-rule` (the double hairline of a ruled
  accounts book), `.notch` (clips a panel's top corners like the shield),
  `.texture` (the archived halftone pattern at 7% overlay).
- **Dark mastheads** on every inner page — type, a gold radial wash, the
  halftone texture and the crest as a watermark, closed with a red/gold rule.
- Services are numbered editorial rows, not a grid of identical cards; the two
  long pages carry a sticky in-page nav; the header condenses on scroll.

The old site's every page carried unedited Duda placeholder carousels
("Slide title / Write your caption here / Button"). That was live on the real
site; it has deliberately not been reproduced.
