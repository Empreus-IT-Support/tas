import Image from "next/image";
import Link from "next/link";
import { BUSINESS, NAV, SITE_NAME, TAGLINE } from "@/lib/site";
import { Mail, Phone, Pin, Post } from "./icons";

const LEGAL = [
  { href: "/documents/tasc-disclaimer.pdf", label: "Disclaimer" },
  { href: "/documents/tasc-terms-and-conditions.pdf", label: "Terms and Conditions" },
  { href: "/documents/tasc-copyright.pdf", label: "Copyright" },
];

export default function Footer() {
  const { address } = BUSINESS;

  return (
    <footer className="texture relative isolate overflow-hidden bg-midnight text-muted">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-bronze via-champagne to-bronze"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 sm:py-20">
        <div className="md:col-span-5">
          <Image
            src="/brand/lockup-stacked.png"
            alt={SITE_NAME}
            width={1429}
            height={1011}
            className="mark-fade h-28 w-auto"
          />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed">
            {SITE_NAME} services the North West Queensland region from our
            office in Mount Isa, with an out-of-area lodgement service that
            anyone in Australia can take advantage of.
          </p>
          {/* Gated: see BUSINESS.showTpbBadge. */}
          {BUSINESS.showTpbBadge && (
            <Image
              src="/images/tax-practitioners-board.png"
              alt="Registered with the Tax Practitioners Board"
              width={120}
              height={140}
              className="mt-8 h-24 w-auto"
            />
          )}
        </div>

        <div className="md:col-span-4">
          <h2 className="font-ui text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
            Mount Isa Office
          </h2>
          <address className="mt-6 space-y-4 text-[15px] not-italic">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:text-white"
            >
              <Pin className="mt-1 shrink-0 text-gold" />
              <span>
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.suburb} {address.state} {address.postcode}
              </span>
            </a>
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="flex items-center gap-3 font-semibold text-white hover:text-gold"
            >
              <Phone className="shrink-0 text-gold" />
              <span className="tnum">{BUSINESS.phone}</span>
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <Mail className="shrink-0 text-gold" />
              {BUSINESS.email}
            </a>
            {/* Mail goes to the Gold Coast, not the shopfront — §05. */}
            <p className="flex gap-3 pt-1 text-[14px] text-platinum/50">
              <Post className="mt-1 shrink-0 text-gold" />
              {BUSINESS.postal}
            </p>
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-ui text-[11px] font-semibold tracking-[0.28em] text-gold uppercase">
            Explore
          </h2>
          <ul className="mt-6 space-y-3 text-[15px]">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-3 bg-gold/50 transition-all"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-8 text-[13px] leading-relaxed">
          <p className="font-ui text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">
            {SITE_NAME} — {TAGLINE}
          </p>
          <p className="mt-2">
            <span className="tnum">ABN {BUSINESS.abn}</span>
          </p>
          {/* Renders only once the client supplies the number. The brand
              guidelines list it as "[to be confirmed]", and a tax practice
              must not display a registration it has not given us. The old
              site's corporate authorised representative line is deliberately
              gone: it belonged to a different ABN. See README. */}
          {BUSINESS.tpbNumber && (
            <p>
              <span className="tnum">
                Registered Tax Agent No. {BUSINESS.tpbNumber}
              </span>
            </p>
          )}

          <div className="mt-7 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-platinum/55">
              &copy; {new Date().getFullYear()} {SITE_NAME}
            </p>
          </div>

          <p className="mt-6 flex items-center gap-2.5 border-t border-white/10 pt-6 font-ui text-[10px] font-semibold tracking-[0.22em] text-platinum/50 uppercase">
            <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
            Managed by Empreus IT Support
          </p>
        </div>
      </div>
    </footer>
  );
}
