import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://akshay.life/sitemap.xml",
    host: "https://akshay.life",
  }
}
