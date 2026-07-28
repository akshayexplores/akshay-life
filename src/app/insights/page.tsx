import type { Metadata } from "next"
import { getAllInsights } from "@/lib/mdx"
import InsightsClient from "./InsightsClient"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes on ambiguity, systems, AI, compounding, and the failures worth naming.",
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>
}) {
  const { pillar } = await searchParams
  const insights = getAllInsights()

  return (
    <main className="relative z-[2] mx-auto max-w-[1180px] px-6 pt-32 md:px-10 md:pt-40">
      <p className="t-label">Insights</p>
      <h1 className="t-display mt-5" style={{ maxWidth: "20ch" }}>
        The archive
      </h1>
      <p
        className="mt-6 font-body"
        style={{ maxWidth: "62ch", fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)" }}
      >
        {insights.length} pieces, written first-person, distilled from working notes. Filter by
        pillar or by subject.
      </p>

      <InsightsClient insights={insights} initialPillar={pillar ?? "all"} />
    </main>
  )
}
