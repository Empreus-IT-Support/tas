"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BUSINESS, NAV, SITE_NAME } from "@/lib/site";
import { Mail, Phone } from "./icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Tighten the bar once the page has moved, so the masthead reads as one
  // piece at the top and as a slim utility bar thereafter.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip */}
      <div className="hidden bg-ink text-white/60 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-2.5 text-[13px]">
          <p className="font-ui text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
            Registered Tax Agent &amp; Public Accountant
          </p>
          <div className="flex items-center gap-7">
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="text-gold" />
              <span className="font-semibold text-white">{BUSINESS.phone}</span>
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="text-gold" />
              {BUSINESS.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`border-b border-white/5 bg-ink-2/95 backdrop-blur transition-all ${
          scrolled ? "py-1.5 shadow-2xl" : "py-3"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5">
          <Link href="/" aria-label={`${SITE_NAME} home`} className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={SITE_NAME}
              width={712}
              height={192}
              priority
              className={`w-auto transition-all ${
                scrolled ? "h-9 sm:h-10" : "h-11 sm:h-14"
              }`}
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={isActive(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`nav-link font-ui text-[12px] font-bold tracking-[0.14em] uppercase ${
                      isActive(item.href)
                        ? "text-gold"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/contact-us" className="btn btn-primary hidden xl:inline-flex">
            Book an appointment
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="p-2 text-white hover:text-gold lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="mt-3 border-t border-white/10 lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block border-b border-white/10 py-3.5 font-ui text-sm font-bold tracking-[0.12em] uppercase ${
                      isActive(item.href) ? "text-gold" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mx-auto max-w-6xl px-5 py-5">
              <a
                href={`tel:${BUSINESS.phoneHref}`}
                className="btn btn-gold w-full justify-center"
              >
                Call {BUSINESS.phone}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
