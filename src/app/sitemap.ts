import type { MetadataRoute } from "next"
import { getAllInsights } from "@/lib/mdx"

const SITE = "https://akshay.life"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/insights", "/tools", "/now"].map((r) => ({
    url: `${SITE}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }))

  const insightRoutes = getAllInsights().map((i) => ({
    url: `${SITE}/insights/${i.slug}`,
    lastModified: i.date ? new Date(i.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...insightRoutes]
}
