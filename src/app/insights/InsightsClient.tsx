"use client"

import { useState, useMemo } from "react"
import NoteCard from "@/components/ui/NoteCard"
import type { InsightMeta } from "@/lib/mdx"

export default function InsightsClient({
  insights,
  subjects,
}: {
  insights: InsightMeta[]
  subjects: string[]
}) {
  const [activeSubject, setActiveSubject] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let result = insights
    if (activeSubject !== "All") {
      result = result.filter((i) => i.category === activeSubject)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.excerpt.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [insights, activeSubject, search])

  return (
    <>
      {/* Search */}
      <div className="mt-10">
        <input
          type="text"
          placeholder="Search insights..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border bg-transparent px-4 py-3 font-body outline-none transition-colors focus:border-[var(--accent)]"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-primary)",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Subject filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <FilterPill
          label="All"
          active={activeSubject === "All"}
          onClick={() => setActiveSubject("All")}
        />
        {subjects.map((s) => (
          <FilterPill
            key={s}
            label={s}
            active={activeSubject === s}
            onClick={() => setActiveSubject(s)}
          />
        ))}
      </div>

      {/* Results count */}
      <p
        className="mt-4 font-mono"
        style={{ fontSize: "13px", color: "var(--text-muted)" }}
      >
        {filtered.length} insight{filtered.length !== 1 ? "s" : ""}
        {activeSubject !== "All" ? ` in ${activeSubject}` : ""}
        {search.trim() ? ` matching "${search}"` : ""}
      </p>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i) => (
          <NoteCard
            key={i.slug}
            note={{
              slug: i.slug,
              title: i.title,
              category: i.category,
              date: i.date,
              excerpt: i.excerpt,
            }}
            hrefPrefix="/insights"
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          className="mt-16 text-center font-body"
          style={{ color: "var(--text-muted)", fontSize: "16px" }}
        >
          No insights match your filters. Try a different search or subject.
        </p>
      )}
    </>
  )
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      data-cursor-hover
      className="rounded-full px-4 py-1.5 font-mono transition-colors"
      style={{
        fontSize: "13px",
        letterSpacing: "0.02em",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--bg-primary)" : "var(--text-muted)",
        border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
      }}
    >
      {label}
    </button>
  )
}
