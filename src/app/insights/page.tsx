import Link from "next/link"
import Footer from "@/components/Footer"
import InsightsClient from "./InsightsClient"
import { getAllInsights } from "@/lib/mdx"

export const metadata = {
  title: "Insights — Akshay Sajeev",
  description: "27 field notes on marketing, sales, building, leverage, and the messy reality of doing the work.",
}

export default function InsightsPage() {
  const insights = getAllInsights()
  const subjects = Array.from(new Set(insights.map((i) => i.category))).sort()

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">
        <Link
          href="/"
          data-cursor-hover
          className="font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          ← back
        </Link>
        <h1
          className="mt-8 font-display"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.05,
          }}
        >
          Insights
        </h1>
        <p
          className="mt-4 font-body"
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "560px",
          }}
        >
          27 field notes on marketing, sales, building, leverage, and the messy reality of doing the work. Filter by subject or search below.
        </p>

        <InsightsClient insights={insights} subjects={subjects} />
      </div>
      <Footer />
    </main>
  )
}
