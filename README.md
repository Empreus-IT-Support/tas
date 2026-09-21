# tascentre — TASC Mount Isa

Next.js site for **TASC Mount Isa** — Tax, Accounting & Super — a tax and
accounting practice in Mount Isa, QLD, at `tascentre.com.au`.

Two things produced what is here, and it matters which is which:

- **Content** was recovered from the Wayback Machine and the still-live Duda
  CDN after the previous site went offline between late Nov 2025 and Aug 2026.
  [!] That archive folder (`../tascentre-archive`) is **no longer on disk** —
  checked 2026-09-21, it is not beside this project and not in Web Archives or
  Client Docs. Git history is now the only copy of anything taken from it. If
  a question about provenance comes up, the recovery route is this repo, not a
  folder on someone's Desktop.
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
The old `public/images/logo.png` was removed along with the inherited stock
banners — see below.

## Forms

Both forms post to `/api/contact` — the enquiry form on `/contact-us`, and the
same component without the message field on `/keep-informed`. The endpoint
validates, rate-limits (5/min/IP), carries a honeypot, and sends plain-text
mail via Resend. Without `RESEND_API_KEY` it returns a 503 telling the visitor
to phone or email instead, and the form keeps what they typed rather than
clearing it. Copy `.env.example` to `.env.local` to configure.

`EnquiryForm` validates on the client too, mirroring the server's rules. That
is not belt-and-braces for its own sake: the form carries `noValidate` so the
browser's own bubbles don't fight the design, and before this the only
validation was server-side — so a typo in an email address cost a round trip
and came back as one banner at the bottom of the form, naming one problem at a
time. Now each field reports its own problem beside itself, wired up with
`aria-invalid` and `aria-describedby`, errors clear as you correct them, and
submitting an empty form moves focus to the first field that needs attention.

Focus is managed at both ends. On success the form is replaced by the
confirmation, which would otherwise drop focus to `<body>` and leave a keyboard
or screen-reader user with no idea it worked; focus moves to the confirmation
instead. A whole-form failure moves focus to the alert. Field-level problems do
not, because focus is already on the field being corrected.

The server remains the authority — it must reject things the client never
sends. If you change a rule in one place, change it in the other.

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
      Photos of the Mount Isa office, the shopfront and the team would lift the
      mastheads and the About page considerably.
- [x] ~~Remove the inherited stock imagery.~~ Done 2026-09-21. The five banners,
      the old crest `logo.png` and `pattern.jpg` were unreferenced by any
      component after the redesign but still shipping in `public/` — about
      380KB served to nobody, including `banner-2.jpg`, a **US IRS Form 1040**
      publicly fetchable from an Australian tax practice at
      `/images/banner-2.jpg`. Recover any of them with
      `git show 731fd8a:public/images/<name>`.
- [ ] **Re-check the client documents.** The PDFs and spreadsheets in
      `public/documents/` date to 2018–2020 and cite superseded thresholds.
- [ ] Set `RESEND_API_KEY` in the deployment environment and verify the sending
      domain in Resend. Note the practice email is `@arnfin.net.au`, so the
      domain to verify may not be `tascentre.com.au`.
- [ ] **Point the domain at Vercel.** `tascentre.com.au` resolves to a
      registrar parking page and its HTTPS is broken at the TLS handshake.
      Until the DNS changes, `robots.ts` deliberately keeps the `*.vercel.app`
      deploy out of search results.
- [x] ~~Link-check the external URLs.~~ Re-run 2026-09-21 over all 14, checking
      the **final** URL rather than the status code. Nothing 404'd, but six had
      started redirecting and one was actively wrong: "Employee or Contractor"
      pointed at a URL the ATO had recycled onto a page about employer super,
      so it returned 200 while sending people somewhere unrelated. Re-pointed,
      and moved to the useful-links list since the replacement is guidance, not
      a calculator. `sage.com` returns 403 to scripted requests but loads
      normally in a browser — bot protection, not a dead link, so leave it.
      **Re-run case-sensitively**: several of these differ from their targets
      only by capitalisation, and a case-insensitive check reports no change.

## SEO

**Every page's metadata comes from `pageMeta()` in `lib/site.ts`. Use it —
do not hand-write `title`/`description`/`alternates` on a route.** The reason
is a trap that had already caught this project: Next inherits `openGraph` from
the nearest ancestor that declares one, and the root layout declares a complete
object for the home page. So a page that set only a title shipped the *home
page's* `og:title`, `og:description` and `og:url` — meaning every inner page
shared on Facebook, LinkedIn or WhatsApp produced a card for the home page and
pointed back at `/`. Fixed, and verified per page in the rendered HTML.

The same trap has a second half. Declaring `openGraph` on a route *replaces*
the inherited object, and the file-convention `app/opengraph-image.tsx` goes
with it — adding `openGraph` without `images` silently dropped `og:image` from
every inner page while leaving the home page's intact. `pageMeta()` therefore
sets `images` explicitly. Neither half of this shows up until a link is already
out in the world, so check the rendered tags after touching metadata:

```bash
curl -s http://localhost:3000/about-us | grep -oE '<meta property="og:[^>]*>'
```

- **`app/not-found.tsx`** — branded 404 that returns a real 404 and, crucially,
  clears the inherited canonical. Next's default 404 carries no metadata, so it
  inherited the root's canonical pointing at `/`, inviting a crawler to treat
  every dead URL as a duplicate of the home page.
- **`sitemap.ts` uses a real `lastModified`**, not `new Date()`. Stamping build
  time on every URL claims the whole site changed on every deploy, including
  deploys that only bumped a dependency, and crawlers learn to discount a
  sitemap that does that. Bump `CONTENT_LAST_MODIFIED` when page copy changes.
- **JSON-LD is a `@graph`**, not a loose node: an `AccountingService` with a
  stable `@id`, a `WebSite` that names it as `publisher`, and a
  `BreadcrumbList` on every inner page that ties back via `isPartOf`. One
  entity described once, rather than three unlinked fragments.
- `app/opengraph-image.tsx` generates a 1200×630 PNG at build time from the
  brand palette — no remote fonts or images, so it renders identically
  anywhere. Note it fails under the Turbopack **dev** server
  (`Input buffer contains unsupported image format`) but builds fine; check it
  via `npm run build` rather than `npm run dev`. Satori also rejects
  `radial-gradient` and most border tricks, so the guidelines' gold frame is
  drawn as four plain divs.
- `robots.ts`, `viewport.themeColor`, `lang="en-AU"`.

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
- **Rate limiting is two-layer, and you should know exactly what it is worth.**
  A per-IP limit alone was worthless: `x-forwarded-for` is attacker-supplied,
  and rotating it let 8 of 8 requests through in testing. Client IP is now
  taken from `x-vercel-forwarded-for` (set at Vercel's edge, overwrites what
  the client sends), then `x-real-ip`, then the *rightmost* XFF entry. Behind
  no proxy at all — local dev — per-IP remains spoofable, which is inherent.
  There is also a ceiling of 30 sends per 10 minutes across all callers.
- [!] **Both counters live in module memory, which on Vercel means per
  serverless instance, not per site.** Under load the platform runs more
  instances and the effective ceiling multiplies by however many are warm; a
  cold start resets one to zero. So this bounds casual abuse and accidental
  double-submits, and it is **not** a defence against a determined flood.
  Making it one needs shared state — Vercel KV, Upstash or equivalent — keyed
  the same way. The limits are sized low deliberately so that even several
  instances stay within a sane mailbox volume. 429s carry `Retry-After: 60`.
- **The honeypot catches two shapes of bot.** Filled in means it completed
  every field it found. *Absent entirely* means it posted a hand-rolled
  payload without ever parsing the form — the real client always sends the
  key, empty or not. Both get a pretend success, so neither learns which
  signal caught it.
- **The Resend call is time-boxed at 8s.** The SDK carries no timeout of its
  own, so a hung upstream would hold the function open until the platform
  killed it while the visitor watched a spinner. It races rather than aborts,
  so the request may still complete and the mail may still arrive — hence the
  504 says we could not *confirm* it was sent, not that it failed.
- **Failures log their shape, not their payload.** A Resend error can echo
  back what was submitted, and that is the visitor's name, phone and message
  going into a log aggregator for no operational benefit.
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
