"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BUSINESS, NAV, SITE_NAME } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on navigation
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Contact strip */}
      <div className="bg-ink text-white/80 text-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
          <Link
            href="/contact-us"
            className="font-heading text-xs font-bold tracking-[0.2em] uppercase hover:text-brand-gold"
          >
            Contact Us
          </Link>
          <p className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Mount Isa QLD: </span>
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="font-semibold text-white hover:text-brand-gold"
            >
              {BUSINESS.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-ink-soft shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
          <Link href="/" aria-label={`${SITE_NAME} home`} className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={SITE_NAME}
              width={356}
              height={96}
              priority
              className="h-11 w-auto sm:h-14"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-active={active}
                      aria-current={active ? "page" : undefined}
                      className={`nav-link font-heading text-[13px] font-semibold tracking-wide uppercase ${
                        active ? "text-brand-gold" : "text-white hover:text-brand-gold"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden rounded p-2 text-white hover:text-brand-gold"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="26"
              height="26"
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
            className="lg:hidden border-t border-white/10 bg-ink-soft"
          >
            <ul className="mx-auto max-w-6xl px-4 py-2">
              {NAV.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block border-b border-white/10 py-3 font-heading text-sm font-semibold tracking-wide uppercase ${
                        active ? "text-brand-gold" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
