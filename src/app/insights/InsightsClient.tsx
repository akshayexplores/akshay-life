"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { InsightMeta } from "@/lib/mdx"
import { pillars, pillarName } from "@/data/pillars"

export default function InsightsClient({
  insights,
  initialPillar = "all",
}: {
  insights: InsightMeta[]
  initialPillar?: string
}) {
  const validPillar = pillars.some((p) => p.id === initialPillar) ? initialPillar : "all"
  const [pillar, setPillar] = useState<string>(validPillar)
  const [subject, setSubject] = useState<string>("all")

  const subjects = useMemo(() => {
    const set = new Set(insights.map((i) => i.subject))
    return Array.from(set).sort()
  }, [insights])

  const shown = useMemo(
    () =>
      insights.filter(
        (i) => (pillar === "all" || i.pillar === pillar) && (subject === "all" || i.subject === subject)
      ),
    [insights, pillar, subject]
  )

  return (
    <>
      <div className="mt-12">
        <p className="t-label">Pillar</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="chip" data-active={pillar === "all" ? "1" : undefined} onClick={() => setPillar("all")}>
            All
          </button>
          {pillars.map((p) => (
            <button
              key={p.id}
              className="chip"
              data-active={pillar === p.id ? "1" : undefined}
              onClick={() => setPillar(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="t-label">Subject</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="chip" data-active={subject === "all" ? "1" : undefined} onClick={() => setSubject("all")}>
            All
          </button>
          {subjects.map((s) => (
            <button
              key={s}
              className="chip"
              data-active={subject === s ? "1" : undefined}
              onClick={() => setSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className="t-meta mt-8">
        {shown.length} {shown.length === 1 ? "piece" : "pieces"}
      </p>

      <ul className="mt-4" style={{ borderTop: "1px solid var(--border)" }}>
        {shown.map((i) => (
          <li key={i.slug}>
            <Link href={`/insights/${i.slug}`} className="block py-6" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                <span className="t-meta" style={{ minWidth: "9.5rem", color: "var(--accent-dim)" }}>
                  {pillarName(i.pillar)}
                </span>
                <div className="flex-1">
                  <h2 className="t-heading" style={{ color: "var(--text)" }}>{i.title}</h2>
                  {i.excerpt && (
                    <p
                      className="mt-2 font-body"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--text-dim)", maxWidth: "70ch" }}
                    >
                      {i.excerpt}
                    </p>
                  )}
                  <p className="t-meta mt-2">{i.subject}</p>
                </div>
                <span className="t-meta" style={{ whiteSpace: "nowrap" }}>{i.readingMinutes} min</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="mt-10 font-body" style={{ color: "var(--text-dim)" }}>
          Nothing matches that combination yet.
        </p>
      )}
    </>
  )
}
