"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { InsightMeta } from "@/lib/mdx"
import { movements } from "@/data/movements"

export default function DarshanaClient({
  insights,
  initialMovement = "all",
}: {
  insights: InsightMeta[]
  initialMovement?: string
}) {
  const valid = movements.some((m) => m.id === initialMovement) ? initialMovement : "all"
  const [mv, setMv] = useState<string>(valid)
  const [subject, setSubject] = useState<string>("all")

  const subjects = useMemo(
    () => Array.from(new Set(insights.map((i) => i.subject))).sort(),
    [insights]
  )

  const shown = useMemo(
    () =>
      insights.filter(
        (i) => (mv === "all" || i.movement === mv) && (subject === "all" || i.subject === subject)
      ),
    [insights, mv, subject]
  )

  return (
    <>
      <div className="entry" style={{ borderTop: "none", paddingTop: 30, paddingBottom: 22 }}>
        <div className="rail">
          <span className="no">—</span>
          Filters
          <span className="mnote">
            Movement is the editorial cut. Subject is how the piece was filed in the vault.
          </span>
        </div>
        <div className="col" style={{ maxWidth: "none" }}>
          <span className="lbl">Movement</span>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="chip" data-active={mv === "all" ? "1" : undefined} onClick={() => setMv("all")}>
              All
            </button>
            {movements.map((m) => (
              <button
                key={m.id}
                className="chip"
                data-active={mv === m.id ? "1" : undefined}
                onClick={() => setMv(m.id)}
              >
                {m.roman}
              </button>
            ))}
          </div>

          <span className="lbl" style={{ marginTop: 24 }}>
            Subject
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="chip"
              data-active={subject === "all" ? "1" : undefined}
              onClick={() => setSubject("all")}
            >
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
      </div>

      <p className="meta" style={{ marginTop: 8 }}>
        {shown.length} {shown.length === 1 ? "piece" : "pieces"}
      </p>

      <ol className="idx" style={{ marginTop: 12, borderTop: "1px solid var(--rule)" }}>
        {shown.map((i) => (
          <li key={i.slug}>
            <Link href={`/darshana/${i.slug}`}>
              <span>
                <span style={{ fontSize: 17, lineHeight: 1.45, display: "block", color: "var(--masi)" }}>
                  {i.title}
                </span>
                {i.excerpt && (
                  <span
                    style={{
                      display: "block",
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--masi-soft)",
                      marginTop: 5,
                      maxWidth: "68ch",
                    }}
                  >
                    {i.excerpt}
                  </span>
                )}
                <span className="meta" style={{ display: "block", marginTop: 7 }}>
                  {i.subject}
                </span>
              </span>
              <span className="meta tail">{i.readingMinutes} min</span>
            </Link>
          </li>
        ))}
      </ol>

      {shown.length === 0 && (
        <p style={{ marginTop: 30 }}>Nothing matches that combination yet.</p>
      )}
    </>
  )
}
