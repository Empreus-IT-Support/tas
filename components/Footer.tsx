import Image from "next/image";
import Link from "next/link";
import { BUSINESS, NAV, SITE_NAME } from "@/lib/site";

const LEGAL = [
  { href: "/documents/tasc-disclaimer.pdf", label: "Disclaimer" },
  { href: "/documents/tasc-terms-and-conditions.pdf", label: "Terms and Conditions" },
  { href: "/documents/tasc-copyright.pdf", label: "Copyright" },
];

export default function Footer() {
  const { address } = BUSINESS;

  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <h2 className="font-heading text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
            Mount Isa QLD
          </h2>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.suburb} {address.state} {address.postcode}
            </a>
            <br />
            <br />
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="font-semibold text-white hover:text-brand-gold"
            >
              {BUSINESS.phone}
            </a>
            <br />
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
              {BUSINESS.email}
            </a>
          </address>
        </div>

        <div>
          <h2 className="font-heading text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-xs font-bold tracking-[0.2em] text-brand-gold uppercase">
            About TASC
          </h2>
          <p className="mt-4 text-sm leading-relaxed">
            {SITE_NAME} (TASC) services the North West Queensland region from our
            office in Mount Isa, with an out-of-area lodgement service that anyone
            can take advantage of.
          </p>
          <Image
            src="/images/tax-practitioners-board.png"
            alt="Registered with the Tax Practitioners Board"
            width={120}
            height={140}
            className="mt-6 h-24 w-auto"
          />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed">
          <p className="font-heading font-bold tracking-wide text-white uppercase">
            {BUSINESS.legalName.toUpperCase()} T/A {SITE_NAME.toUpperCase()}
          </p>
          <p className="mt-2">ABN: {BUSINESS.abn}</p>
          <p>{BUSINESS.authorisedRep}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
