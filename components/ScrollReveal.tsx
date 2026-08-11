"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive fade-up reveal for sections as they scroll into view.
// Fails open: content is only hidden after we know the document is visible
// and IntersectionObserver is available; otherwise sections stay visible.
// Respects prefers-reduced-motion; re-initialises on every route change.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | null = null;

    const init = () => {
      const targets = document.querySelectorAll<HTMLElement>("main section");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      targets.forEach((el) => {
        if (!el.classList.contains("reveal-in")) {
          el.classList.add("reveal-init");
          observer?.observe(el);
        }
      });
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVisible);
        init();
      }
    };

    // IntersectionObserver doesn't deliver entries while the document is
    // hidden (background tab, prerender) — defer so content is never
    // stuck invisible.
    if (document.visibilityState === "visible") {
      init();
    } else {
      document.addEventListener("visibilitychange", onVisible);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
