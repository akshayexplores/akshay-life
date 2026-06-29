"use client"

import Link from "next/link"
import AnimatedText from "@/components/ui/AnimatedText"
import NoteCard from "@/components/ui/NoteCard"
import type { InsightMeta } from "@/lib/mdx"

export default function Insights({ insights }: { insights: InsightMeta[] }) {
  const featured = insights[0]
  const rest = insights.slice(1, 4)

  return (
    <section id="insights" className="py-32 md:py-48" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <span className="text-label">Insights</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <AnimatedText
          as="h2"
          text={`${insights.length} insights. Here are some that stuck.`}
          className="font-display text-display"
          style={{ color: "var(--text-primary)", maxWidth: "16ch" }}
        />

        {featured && (
          <div className="mt-16">
            <NoteCard note={featured} featured index={0} hrefPrefix="/insights" />
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {rest.map((n, i) => (
              <NoteCard key={n.slug} note={n} index={i + 1} hrefPrefix="/insights" />
            ))}
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/insights"
            data-cursor-hover
            className="font-display inline-flex items-center gap-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", fontVariationSettings: '"opsz" 36' }}
          >
            See all {insights.length} insights{" "}
            <span style={{ color: "var(--accent)", display: "inline-block", transition: "transform 0.3s var(--ease-out)" }} className="see-all-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
