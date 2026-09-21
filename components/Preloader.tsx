"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/site";

/**
 * Branded first-paint screen showing the stacked lockup.
 *
 * Two safeguards matter here. The overlay is server-rendered, so if
 * hydration never happened it would cover the site permanently — the CSS
 * keyframe in globals.css therefore fades it out and sets visibility:hidden
 * on its own, with JS only able to make it leave *sooner*. And it only runs
 * on the first paint of a tab, so client-side route changes are never
 * delayed by it.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Already shown once in this tab — drop it immediately.
    const seen = sessionStorage.getItem("tasc-preloaded");
    if (seen) {
      setGone(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const finish = () => {
      sessionStorage.setItem("tasc-preloaded", "1");
      setGone(true);
      document.documentElement.style.overflow = "";
    };

    // Leave as soon as the page is ready, but never linger past the CSS
    // animation — whichever comes first.
    const cap = setTimeout(finish, 1900);
    const onLoad = () => setTimeout(finish, 550);

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader fixed inset-0 z-100 flex flex-col items-center justify-center bg-navy"
    >
      <Image
        src="/brand/lockup-stacked.png"
        alt={SITE_NAME}
        width={1429}
        height={1011}
        priority
        className="preloader-crest mark-fade h-28 w-auto sm:h-40"
      />
      <span className="mt-9 block h-px w-44 overflow-hidden bg-white/12">
        <span className="preloader-bar block h-full w-full origin-left bg-gradient-to-r from-bronze via-champagne to-bronze" />
      </span>
    </div>
  );
}
