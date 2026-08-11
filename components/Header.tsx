"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BUSINESS, NAV, SITE_NAME } from "@/lib/site";
import { ArrowRight, Mail, Phone } from "./icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Once the page moves, the utility strip collapses away. The main bar keeps
  // a fixed height so the logo never resizes underneath the pointer.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll behind the mobile drawer, and close it on Escape
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* --- Utility strip: collapses on scroll ---------------------------- */}
      <div
        className={`hidden overflow-hidden bg-black transition-[height] duration-300 lg:block ${
          scrolled ? "h-0" : "h-9"
        }`}
      >
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-6 px-5">
          <p className="font-ui text-[10px] font-bold tracking-[0.26em] text-gold uppercase">
            Registered Tax Agent &amp; Public Accountant
          </p>
          <div className="flex items-center gap-6 text-[13px] text-white/55">
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span className="font-semibold text-white/85">
                {BUSINESS.phone}
              </span>
            </a>
            <span aria-hidden="true" className="h-3 w-px bg-white/15" />
            <a
              href={`mailto:${BUSINESS.email}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="h-4 w-4 text-gold" />
              {BUSINESS.email}
            </a>
          </div>
        </div>
      </div>

      {/* --- Main bar ----------------------------------------------------- */}
      <div
        className={`relative bg-ink/95 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]" : ""
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-6xl items-center gap-6 px-5">
          <Link
            href="/"
            aria-label={`${SITE_NAME} home`}
            className="shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt={SITE_NAME}
              width={721}
              height={200}
              priority
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-active={isActive(item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    title={item.label}
                    className={`nav-link block font-ui text-[11px] font-bold tracking-[0.16em] whitespace-nowrap uppercase ${
                      isActive(item.href)
                        ? "text-gold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/contact-us"
            className="ml-auto hidden shrink-0 items-center gap-2 bg-red px-5 py-3 font-ui text-[11px] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase hover:bg-red-dark lg:ml-6 lg:inline-flex"
          >
            Book appointment
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="ml-auto p-2 text-white hover:text-gold lg:hidden"
          >
            <span className="sr-only">Open menu</span>
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
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>

        <div
          aria-hidden="true"
          className="h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        />
      </div>

      {/* --- Mobile drawer ------------------------------------------------ */}
      <div id="mobile-nav" className="lg:hidden">
        {open && (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="drawer-scrim absolute inset-0 bg-black/70"
            >
              <span className="sr-only">Close menu</span>
            </button>

            <div className="drawer-panel texture absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-ink">
              <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={721}
                  height={200}
                  aria-hidden="true"
                  className="h-9 w-auto"
                />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setOpen(false)}
                  className="p-2 text-white hover:text-gold"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile" className="relative flex-1 px-6 py-4">
                <ul>
                  {NAV.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                      >
                        <span className="font-ui text-[10px] font-bold tracking-widest text-white/25">
                          0{i + 1}
                        </span>
                        <span
                          className={`font-display text-xl group-hover:text-gold ${
                            isActive(item.href) ? "text-gold" : "text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="relative space-y-3 border-t border-white/10 px-6 py-6">
                <a
                  href={`tel:${BUSINESS.phoneHref}`}
                  className="btn btn-gold w-full justify-center"
                >
                  <Phone className="h-4 w-4" />
                  {BUSINESS.phone}
                </a>
                <Link
                  href="/contact-us"
                  className="btn btn-ghost w-full justify-center"
                >
                  Book appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
