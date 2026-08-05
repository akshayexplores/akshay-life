import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },

  /**
   * The site moved from a pillar taxonomy to the three movements
   * (Darśana · Krama · Kriyā). These keep every previously-published
   * URL alive rather than letting it 404.
   */
  async redirects() {
    return [
      { source: "/insights", destination: "/darshana", permanent: true },
      { source: "/insights/:slug", destination: "/darshana/:slug", permanent: true },
      { source: "/notes", destination: "/darshana", permanent: true },
      { source: "/notes/:slug", destination: "/darshana/:slug", permanent: true },
      { source: "/projects", destination: "/krama", permanent: true },
      { source: "/projects/:id", destination: "/krama", permanent: true },
      { source: "/now", destination: "/kriya", permanent: true },
    ]
  },
}

export default nextConfig
