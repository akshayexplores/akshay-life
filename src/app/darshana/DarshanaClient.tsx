"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { InsightMeta } from "@/lib/mdx"
import { movements } from "@/data/movements"

export default function DarshanaClient({
  insights,
  heroSlug = null,
  initialMovement = "all",
  initialSubject = "all",
}: {
  insights: InsightMeta[]
  /** Slug of today's featured piece, chosen on the server. */
  heroSlug?: string | null
  initialMovement?: string
  initialSubject?: string
}) {
  const valid = movements.some((m) => m.id === initialMovement) ? initialMovement : "all"
  const [mv, setMv] = useState<string>(valid)
  const subjects = useMemo(
    () => Array.from(new Set(insights.map((i) => i.subject))).sort(),
    [insights]
  )
  const [subject, setSubject] = useState<string>(
    subjects.includes(initialSubject) ? initialSubject : "all"
  )

  const matching = useMemo(
    () =>
      insights.filter(
        (i) => (mv === "all" || i.movement === mv) && (subject === "all" || i.subject === subject)
      ),
    [insights, mv, subject]
  )

  // The featured piece is a property of the default view. Once someone filters,
  // they are browsing with intent and a "today's pick" on top is just noise —
  // so the hero disappears and the piece rejoins the list in its normal place.
  const filtering = mv !== "all" || subject !== "all"
  const hero = useMemo(
    () => (filtering || !heroSlug ? null : insights.find((i) => i.slug === heroSlug) ?? null),
    [filtering, heroSlug, insights]
  )

  // Shown once, never twice: pulled out of the list only while it is the hero.
  const listed = useMemo(
    () => (hero ? matching.filter((i) => i.slug !== hero.slug) : matching),
    [matching, hero]
  )

  return (
    <>
      {hero && (
        <section className="hero" aria-labelledby="hero-title">
          <span className="lbl hero-flag">Featured insight · today</span>
          <div className="hero-body">
            <div>
              <h2 id="hero-title" className="hero-title">
                {hero.title}
              </h2>
              <Link className="hero-cta" href={`/darshana/${hero.slug}`}>
                Read insight
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div>
              {hero.excerpt && <p className="hero-excerpt">{hero.excerpt}</p>}
              <p className="meta hero-meta">
                {hero.subject} · {hero.readingMinutes} min
              </p>
            </div>
          </div>
        </section>
      )}

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

      {/* Counts the whole matching set, hero included — the archive has not
          shrunk just because one piece is being shown above. */}
      <p className="meta" style={{ marginTop: 8 }}>
        {matching.length} {matching.length === 1 ? "piece" : "pieces"}
        {hero && <span className="hero-note"> · one featured above</span>}
      </p>

      <ol className="idx" style={{ marginTop: 12, borderTop: "1px solid var(--rule)" }}>
        {listed.map((i) => (
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

      {matching.length === 0 && (
        <p style={{ marginTop: 30 }}>Nothing matches that combination yet.</p>
      )}
    </>
  )
}
