import Image from "next/image";
import Link from "next/link";
import { BUSINESS, NAV, SITE_NAME } from "@/lib/site";
import { Mail, Phone, Pin } from "./icons";

const LEGAL = [
  { href: "/documents/tasc-disclaimer.pdf", label: "Disclaimer" },
  { href: "/documents/tasc-terms-and-conditions.pdf", label: "Terms and Conditions" },
  { href: "/documents/tasc-copyright.pdf", label: "Copyright" },
];

export default function Footer() {
  const { address } = BUSINESS;

  return (
    <footer className="texture relative isolate overflow-hidden bg-ink text-white/60">
      <div
        aria-hidden="true"
        className="h-1 bg-gradient-to-r from-red via-lion to-red"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 sm:py-20">
        <div className="md:col-span-5">
          <Image
            src="/images/logo.png"
            alt={SITE_NAME}
            width={712}
            height={192}
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed">
            TASC services the North West Queensland region from our office in
            Mount Isa, with an out-of-area lodgement service that anyone in
            Australia can take advantage of.
          </p>
          <Image
            src="/images/tax-practitioners-board.png"
            alt="Registered with the Tax Practitioners Board"
            width={120}
            height={140}
            className="mt-8 h-24 w-auto"
          />
        </div>

        <div className="md:col-span-4">
          <h2 className="font-ui text-[11px] font-bold tracking-[0.28em] text-lion uppercase">
            Mount Isa Office
          </h2>
          <address className="mt-6 space-y-4 text-[15px] not-italic">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:text-white"
            >
              <Pin className="mt-1 shrink-0 text-lion" />
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
              className="flex items-center gap-3 font-semibold text-white hover:text-lion"
            >
              <Phone className="shrink-0 text-lion" />
              {BUSINESS.phone}
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex items-center gap-3 hover:text-white"
            >
              <Mail className="shrink-0 text-lion" />
              {BUSINESS.email}
            </a>
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className="font-ui text-[11px] font-bold tracking-[0.28em] text-lion uppercase">
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
                    className="h-px w-3 bg-lion/50 transition-all"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-8 text-[13px] leading-relaxed">
          <p className="font-ui text-[11px] font-bold tracking-[0.16em] text-white/80 uppercase">
            {BUSINESS.legalName} t/a {SITE_NAME}
          </p>
          <p className="mt-2">ABN {BUSINESS.abn}</p>
          <p>{BUSINESS.authorisedRep}</p>

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
            <p className="text-silver/55">
              &copy; {new Date().getFullYear()} {SITE_NAME}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
