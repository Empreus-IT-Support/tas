import type { MetadataRoute } from "next";
import { IS_CANONICAL_HOST, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Keep *.vercel.app deploys out of the index: TASC has not confirmed it
  // wants to be online, and a staging copy competing with the real domain
  // later is a duplicate-content problem. Attaching the real domain (or
  // setting NEXT_PUBLIC_SITE_URL) flips this back to allow automatically.
  if (!IS_CANONICAL_HOST) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
