# tascentre — TASC Mount Isa

Next.js site for **TASC Mount Isa** — Tax, Accounting & Super — a tax and
accounting practice in Mount Isa, QLD, at `tascentre.com.au`.

Two things produced what is here, and it matters which is which:

- **Content** was recovered from the Wayback Machine and the still-live Duda
  CDN after the previous site went offline between late Nov 2025 and Aug 2026.
  The archive sits beside this project at `../tascentre-archive`.
- **Identity** comes from the client's own brand guidelines, edition 2026, a
  copy of which is committed at `docs/TASC_Mount_Isa_Brand_Guidelines.docx`.
  Section numbers quoted throughout the code refer to that file.

Where the two disagree, the brand guidelines win — they are current and
client-approved, the archive is neither.

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
| `/` | Framed lockup hero, facts rail, practice intro, three-row service ledger, remote-lodgement steps, why-TASC, framed CTA |
| `/about-us` | Story, mission, vision, management |
| `/taxation-and-accounting` | Three anchored sections: taxation & accounting, remote lodgement, GST/IAS/ABN/PAYG/FTC/FBT |
| `/tax-resources` | Fact sheets, ATO calculators, checklists, forms, useful links |
| `/keep-informed` | Newsletter signup (name/phone/email only) |
| `/contact-us` | Enquiry form, address, phone, email, postal, opening hours |
| `/api/contact` | POST endpoint shared by both forms |

`app/sitemap.ts`, `app/robots.ts` and JSON-LD (`AccountingService`) in
`app/layout.tsx` are all driven from `lib/site.ts` — edit business details in
one place.

## Brand

The full system is in `docs/TASC_Mount_Isa_Brand_Guidelines.docx`. What the
code implements:

**Logo** — three supplied lockups live in `public/brand/`:
`lockup-horizontal.png` (header, mobile drawer), `lockup-stacked.png`
(preloader, footer, JSON-LD `logo`), `emblem.png` (favicon, apple icon, and
the watermark in `components/EmblemMark.tsx`). Each is a navy chip with
transparent rounded corners, and the chip is **exactly** `#0C1B33` — the same
as `--color-navy` — so a lockup dropped on a navy surface has no visible
edge. If the navy is ever retuned, these assets stop blending; retune the
token and the artwork together, or not at all. The guide forbids recolouring,
stretching, rotating, cropping the emblem or rebuilding the mark, so the
assets are used as supplied and only ever scaled or faded.

**Colour** (§02) — Primary Navy `#0C1B33`, Midnight `#050B1A`, Antique Gold
`#D7A245`, Champagne Gold `#FBCD68`, Bronze Gold `#9B501D`, Platinum
`#EDEDED`. The palette is declared once in `app/globals.css` and mirrored in
`lib/site.ts` as `BRAND` so the build-time OG image draws from the same
numbers.

**The site is dark by default, and that is the guide's instruction, not a
preference.** §02 opens "Navy dominates as the ground", and §01 requires the
reversed mark to "always sit on the brand navy or an equivalently dark
ground". So navy is the *page*: `body` is navy, headings are white, body copy
is a cool light grey, sections step between navy and midnight, and paper
appears only as a deliberate inset where dense reading earns it.

That also retires the contrast problem a light layout has. Gold is 2.28:1 on
white and champagne 1.51:1, so on paper every gold element has to fall back to
bronze. On navy, gold is 6.48:1, champagne 10.38:1 and platinum 14.55:1 — the
brand's own colours work as drawn, everywhere. Bronze now survives only for
the rare paper inset, via `.eyebrow-ink` and `.link-arrow-ink`.

Measured on navy: body `#C3CCDA` 9.8:1, muted `#94A1B5` 5.7:1. A contrast
sweep over all six pages (787 text elements, each measured against its real
composited background) reports zero failures against WCAG AA.

**Type** (§03) — Cinzel SemiBold for display, Montserrat for body, UI and the
tagline, with Georgia and Arial as the office fallbacks the guide prescribes.
Cinzel is inscriptional and has no true lowercase — its minuscules render as
small capitals — so `h1`/`h2` are set in caps with positive tracking, which is
the face working as designed and matches the wordmark. `h3`/`h4` stay in
Montserrat: a sentence-length sub-heading in small caps stops being readable,
and §03 scopes Cinzel to "Display / Headings" anyway.

**Motifs**, defined as utilities in `app/globals.css`:

- `.diamond-rule` — a gold hairline broken by a small lozenge, lifted straight
  off the lockup where it separates the emblem from the wordmark. Rendered via
  `components/DiamondRule.tsx`; it replaced the previous identity's
  `.ledger-rule`.
- `.gilt` — the double gold border of the guidelines cover, as a panel frame.
  Replaced `.notch`, which clipped panel corners into the retired shield.
- `components/PageFrame.tsx` — the same frame at section scale, opening the
  home hero, closing it on the CTA, and framing every inner-page masthead.
  It is a real element, not a class: `.texture` and `.vignette` already claim
  the section's `::before` and `::after`, and a second class reaching for the
  same pseudo-element silently loses. That is exactly what happened when this
  was first written as a `.gilt-page` class, and why the frame did not render.
- `.gilt-text` — a gradient gold fill for display type, giving it the same
  sheen as the metallic wordmark.
- `.ledger-row` — the services list: gold hairlines, a gold wash on hover and
  the rule sweeping in beneath. It replaced a hover effect that swept white
  paper in from the left, which needed a light background to sweep to.
- `.panel` — a lifted navy surface with a gold hairline. The workhorse
  container now that there is no light background to sit things on.
- `.vignette` — edge darkening, so a large navy field reads as a lit surface
  rather than a fill. Pure darkening, with no lift in the middle: see below.
- `.texture` — a very faint gold grid. The system is engraved rather than
  printed, so the grain is ruled, not halftone.
- `.eyebrow`, `.ruled` and `.tnum` carried over, retinted. `.ledger-rule` is
  gone — the diamond rule replaced every use of it.

**One trap worth knowing about, because it bit three times.** The supplied
lockups are flat `#0C1B33` chips with transparent rounded corners. On plain
navy they are invisible, which is the point — but *any* wash, vignette or
gradient behind one lifts the surrounding navy and the chip's rectangle
appears. It is fixed in three layers, and all three matter: `.vignette` never
lightens the middle, the hero's decorative washes sit in the corners and are
hidden below `sm` (at phone widths they otherwise span the viewport), and
`.mark-fade` dissolves the chip's own edges. The fade percentages are measured
from the artwork rather than guessed — content sits 5.9% from the left, 5.7%
from the right, 15.2% from the top and 19.3% from the bottom, so fading the
outer 5% horizontally and 12% vertically never touches the mark. Note the
`.texture` grid also reveals the chip, by stopping where the image covers it,
which is why the hero and preloader carry no texture.

Everything from the previous identity — black shield, red outline, yellow-green
lion, Arvo, Open Sans, halftone dots, notched corners — is gone. The old
`public/images/logo.png` is kept only as archive material.

## Forms

Both forms post to `/api/contact`. The endpoint validates, rate-limits
(5/min/IP, in-memory), carries a honeypot field, and sends plain-text mail via
Resend. Without `RESEND_API_KEY` it returns a 503 whose message tells the
visitor to phone or email instead — so the site degrades gracefully rather than
failing silently. Copy `.env.example` to `.env.local` to configure.

## Before go-live

The brand guidelines settled several questions the previous checklist raised,
and opened two new ones. What is **confirmed** by §05 and needs no further
checking: practice name, tagline, phone `07 4743 6342`, email
`tasc@arnfin.net.au`, website `www.tascentre.com.au`, postal address
`PO Box 929 Southport BC QLD 4215`, and `ABN 87 061 179 440`.

What still needs the client:

- [ ] **Who is the legal entity?** §05 gives an ABN but no company name, and
      `87 061 179 440` is *not* the ABN the archived site carried (Thunder Tax
      Pty Ltd, `99 123 853 681`). The footer therefore shows the practice name
      against the ABN rather than inventing a "t/a" line, and `metadata`
      declares no `publisher`. Get the registered entity name.
- [ ] **Registered Tax Agent number.** §05 lists it as "[to be confirmed]".
      `BUSINESS.tpbNumber` is `null` and the footer line does not render until
      it holds a value — a tax practice must not display a registration it has
      not supplied.
- [!] **The Tax Practitioners Board badge is switched off.**
      `BUSINESS.showTpbBadge` is `false`, so it does not render. (It is wired
      into the footer only — the redesign dropped the home-page credentials
      panel that also carried it.) Two reasons. The inherited artwork has a
      registration baked into it — "Tax (financial) adviser 25326396" — issued
      under the *previous* ABN, not the one in §05. And the TPB wound that
      category up: tax (financial) advisers moved to ASIC's Financial Advisers
      Register and the TPB stopped registering them, so the badge is stale
      whoever holds it. Get a current badge from the client, replace
      `public/images/tax-practitioners-board.png`, then flip the flag.
- [!] **The old AFSL line has been removed, deliberately.** The archived site
      carried "Corporate Authorised Representative No. 1276821 of Mawson
      Wealth Pty Ltd (AFSL 552819)". That authorisation belonged to the
      previous ABN, the guidelines do not mention financial advice at all, and
      §04 scopes the practice to tax, accounting and super. Publishing an
      authorisation the current entity may not hold is a regulatory
      misstatement. If they do give financial advice, get the current
      authorised-representative wording and put it back.
- [ ] **Confirm the Mount Isa address and hours.** §05 supplies only the
      Southport PO box. The street address (Shop 2, Turanga Shopping Centre,
      26 East Street) and the opening hours come from the 2025 archive and are
      marked UNCONFIRMED in `lib/site.ts`. They drive the `LocalBusiness`
      structured data and the whole local-SEO case, so they matter more than
      most fields. Both the footer and the contact page now also show the PO
      box, so nothing gets posted to a shopfront that may have moved.
- [ ] **Confirm the management listing.** `/about-us` names Iain Jeffery as
      Director, from the archive. Unverified under the current operator.
- [~] **Map coordinates** are East Street from OpenStreetMap — the street, not
      the shopfront, because Nominatim has no entry for Turanga Shopping
      Centre. Re-check once the address is confirmed.
- [ ] **Commission real photography.** The design is deliberately photo-free.
      The five inherited banners in `public/images/` are dated and blue-tinted,
      and `banner-2.jpg` is a US IRS Form 1040 sitting on an Australian tax
      practice. They are kept only as archive material, and they clash with the
      navy-and-gold system besides.
- [ ] **Re-check the client documents.** The PDFs and spreadsheets in
      `public/documents/` date to 2018–2020 and cite superseded thresholds.
- [ ] Set `RESEND_API_KEY` in the deployment environment and verify the sending
      domain in Resend. Note the practice email is `@arnfin.net.au`, so the
      domain to verify may not be `tascentre.com.au`.
- [ ] **Point the domain at Vercel.** `tascentre.com.au` resolves to a
      registrar parking page and its HTTPS is broken at the TLS handshake.
      Until the DNS changes, `robots.ts` deliberately keeps the `*.vercel.app`
      deploy out of search results.
- [x] ~~Link-check the ATO URLs.~~ Done 2026-08-12: the ATO had replaced its
      whole IA and 7 links 404'd. All re-pointed and verified 200 end-to-end.
      Worth re-running periodically.

## SEO

- Per-page `alternates.canonical`; `metadataBase` from `SITE_URL`.
- `app/opengraph-image.tsx` generates a 1200×630 PNG at build time from the
  brand palette — no remote fonts or images, so it renders identically
  anywhere. Note it fails under the Turbopack **dev** server
  (`Input buffer contains unsupported image format`) but builds fine; check it
  via `npm run build` rather than `npm run dev`. Satori also rejects
  `radial-gradient` and most border tricks, so the guidelines' gold frame is
  drawn as four plain divs.
- `AccountingService` JSON-LD in the layout with address, hours, geo,
  `areaServed`, `knowsAbout`, `slogan` and `sameAs`; `BreadcrumbList` on every
  inner page via `PageBanner`'s `path` prop.
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
  what actually arrived) and non-object JSON (400), on top of the honeypot.
- **Rate limiting is two-layer, and the global layer is the one that matters.**
  A per-IP limit alone was worthless: `x-forwarded-for` is attacker-supplied,
  and rotating it let 8 of 8 requests through in testing. Client IP is now
  taken from `x-vercel-forwarded-for` (set at Vercel's edge, overwrites what
  the client sends), then `x-real-ip`, then the *rightmost* XFF entry. Behind
  no proxy at all — local dev — per-IP remains spoofable, which is inherent.
  So there is also a hard ceiling of 30 sends per 10 minutes across all
  callers, which bounds mailbox flooding and Resend quota burn regardless of
  claimed address. Verified: 30 through, then 429.
- The IP bucket map prunes expired entries and hard-clears past 5,000 keys —
  previously it grew without bound, one entry per distinct address, forever.
- Control characters are stripped from `name`, `email` and `phone` before they
  reach the mail API, since `name` is interpolated into the subject line and a
  CR/LF there is a header-injection primitive on any transport that renders
  raw SMTP. The message body keeps its newlines. The email pattern now also
  rejects angle brackets, commas, quotes and semicolons so a value cannot be
  read as an address list.

## Note on the archive

The old site's every page carried unedited Duda placeholder carousels
("Slide title / Write your caption here / Button"). That was live on the real
site; it has deliberately not been reproduced.
