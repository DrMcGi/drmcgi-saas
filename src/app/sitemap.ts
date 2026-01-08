import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
