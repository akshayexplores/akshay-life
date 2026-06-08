"use client"

import Link from "next/link"
import { useState } from "react"
import type { NoteMeta } from "@/lib/mdx"

export default function NoteCard({ note, featured = false }: { note: NoteMeta; featured?: boolean }) {
  const [hover, setHover] = useState(false)
  const date = note.date
    ? new Date(note.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : ""

  return (
    <Link
      href={`/notes/${note.slug}`}
      data-cursor-hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex h-full flex-col justify-between"
      style={{
        background: hover ? "var(--bg-card)" : "var(--bg-secondary)",
        border: `1px solid ${hover ? "var(--border-hover)" : "var(--border)"}`,
        padding: featured ? "48px" : "28px",
        borderRadius: "2px",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div>
        <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--accent)" }}>
          {note.category}
        </span>
        <h3
          className="font-display"
          style={{ fontSize: featured ? "40px" : "24px", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.15, marginTop: "16px" }}
        >
          {note.title}
        </h3>
        <p
          className="mt-4 font-body"
          style={{ fontSize: featured ? "16px" : "14px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: featured ? "60ch" : "40ch" }}
        >
          {note.excerpt.length > (featured ? 240 : 120)
            ? note.excerpt.slice(0, featured ? 240 : 120).trimEnd() + "…"
            : note.excerpt}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="font-mono" style={{ fontSize: "12px", color: "var(--text-muted)" }}>{date}</span>
        <span
          className="font-mono"
          style={{ fontSize: "16px", color: hover ? "var(--accent)" : "var(--text-muted)", transform: hover ? "translateX(5px)" : "none", transition: "transform 0.3s, color 0.3s", opacity: hover ? 1 : 0.6 }}
        >
          →
        </span>
      </div>
    </Link>
  )
}
