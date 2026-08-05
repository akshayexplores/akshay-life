import { getAllInsights } from "@/lib/mdx"
import { movement } from "@/data/movements"

const SITE = "https://akshay.life"

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}

export const dynamic = "force-static"

export async function GET() {
  const items = getAllInsights()
  const latest = items[0]?.date ? new Date(items[0].date) : new Date()

  const body = items
    .map((i) => {
      const url = `${SITE}/darshana/${i.slug}`
      const pub = i.date ? new Date(i.date).toUTCString() : new Date().toUTCString()
      return `    <item>
      <title>${esc(i.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <category>${esc(movement(i.movement).roman)}</category>
      <category>${esc(i.subject)}</category>
      <description>${esc(i.excerpt || i.title)}</description>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Krama — Akshay Sajeev</title>
    <link>${SITE}</link>
    <description>I look for the pattern behind the mess. Then I build the thing that holds it.</description>
    <language>en</language>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${body}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
