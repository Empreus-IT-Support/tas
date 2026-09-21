import type { MetadataRoute } from "next";
import { NAV, SITE_URL } from "@/lib/site";

/**
 * `lastModified` is a real date, not `new Date()`.
 *
 * Stamping the build time on every URL tells crawlers the whole site changed
 * on every deploy, including deploys that only touched a dependency. Search
 * engines learn to discount a sitemap that does that, which costs exactly the
 * signal the field exists to give. CONTENT_LAST_MODIFIED is the date the page
 * copy last actually changed — the rebrand rewrote every page, so they share
 * one date until they diverge. Bump it when you change a page's content.
 */
const CONTENT_LAST_MODIFIED = "2026-09-21";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_LAST_MODIFIED);

  return NAV.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: item.href === "/" ? "monthly" : "yearly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
