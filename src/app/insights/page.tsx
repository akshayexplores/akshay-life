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
      <div className="mx-auto max-w-[680px] px-6 pb-24 pt-32 md:px-0 md:pt-40">
        <Link
          href="/"
          className="font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
        >
          ← back
        </Link>
        <h1
          className="mt-8 font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Insights
        </h1>
        <p
          className="mt-4 font-body"
          style={{
            fontSize: "1.125rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          27 field notes on marketing, sales, building, leverage, and the messy reality of doing the work.
        </p>

        <InsightsClient insights={insights} subjects={subjects} />
      </div>
      <Footer />
    </main>
  )
}
