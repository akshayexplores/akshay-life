import type { Metadata } from "next"
import { getAllInsights } from "@/lib/mdx"
import { movement } from "@/data/movements"
import { dailyPick } from "@/lib/daily-pick"
import DarshanaClient from "./DarshanaClient"
import "./hero.css"

export const metadata: Metadata = {
  title: "Darśana",
  description:
    "Seeing what the dashboard cannot explain. Field notes on diagnosis, positioning and the why underneath.",
}

/**
 * Rendered per request, so the featured pick reflects the visitor's day rather
 * than the day of the last deploy. Reading `searchParams` below already forces
 * this, but it is declared explicitly so the behaviour does not quietly break
 * if the filters ever stop coming through the URL.
 */
export const dynamic = "force-dynamic"

export default async function DarshanaPage({
  searchParams,
}: {
  searchParams: Promise<{ m?: string; s?: string }>
}) {
  const { m, s } = await searchParams
  const insights = getAllInsights()
  const d = movement("darshana")

  // Today's featured piece. Computed on the server so it lands in the initial
  // HTML — no flash, no layout shift, and it still works with JS disabled.
  const heroSlug = dailyPick(insights)?.slug ?? null

  return (
    <main className="sheet" style={{ paddingTop: 116 }}>
      <section style={{ paddingBottom: 34, borderBottom: "1px solid var(--rule)" }}>
        <span className="lbl">The archive</span>
        <h1 className="t-h2" style={{ marginTop: 14 }}>
          Here&rsquo;s what I&rsquo;ve gathered
        </h1>
        <div className="font-dev" style={{ fontSize: 22, color: "var(--pravala)", marginTop: 12 }}>
          {d.devanagari}
        </div>
        <p className="meta" style={{ marginTop: 4 }}>
          Darśana · seeing
        </p>
        <p className="t-first" style={{ marginTop: 18, maxWidth: "62ch" }}>
          {insights.length} pieces, distilled from a working vault. Filter by movement or by the
          subject they were filed under.
        </p>
      </section>

      <DarshanaClient
        insights={insights}
        heroSlug={heroSlug}
        initialMovement={m ?? "all"}
        initialSubject={s ?? "all"}
      />
    </main>
  )
}
