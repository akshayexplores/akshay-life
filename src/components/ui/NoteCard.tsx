"use client"

import Link from "next/link"
import type { NoteMeta } from "@/lib/mdx"
import GradedImage, { GradedPlaceholder } from "@/components/ui/GradedImage"

const NOTE_GRADIENTS = [
  "linear-gradient(135deg, #12100E 0%, #1E1810 55%, #0E0C08 100%)",
  "linear-gradient(155deg, #0E1016 0%, #141A26 55%, #0A0C12 100%)",
  "linear-gradient(135deg, #100E16 0%, #1A1424 55%, #0C0A12 100%)",
  "linear-gradient(150deg, #0E120E 0%, #161E14 55%, #0A0E0A 100%)",
]

export default function NoteCard({ note, featured = false, index = 0, hrefPrefix = "/notes" }: { note: NoteMeta; featured?: boolean; index?: number; hrefPrefix?: string }) {
  const date = note.date
    ? new Date(note.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : ""

  const gradient = NOTE_GRADIENTS[index % NOTE_GRADIENTS.length]
  const imageH   = featured ? 260 : 160

  return (
    <Link href={`${hrefPrefix}/${note.slug}`} data-cursor-hover className="note-card block">
      {/* Cover */}
      <div style={{ position: "relative", height: imageH, overflow: "hidden", flexShrink: 0 }}>
        {(note as NoteMeta & { cover?: string }).cover ? (
          <GradedImage
            src={(note as NoteMeta & { cover?: string }).cover!}
            alt={note.title}
            fill
            sizes={featured ? "80vw" : "33vw"}
          />
        ) : (
          <GradedPlaceholder gradient={gradient} style={{ position: "absolute", inset: 0 }} />
        )}
        {/* Category label over image */}
        <div style={{ position: "absolute", top: 16, left: 20, zIndex: 2 }}>
          <span className="text-label" style={{ fontSize: "10px", background: "rgba(10,9,8,0.7)", padding: "4px 10px", borderRadius: "999px" }}>
            {note.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: featured ? "32px 36px 36px" : "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          className="font-display"
          style={{
            fontSize: featured ? "clamp(1.4rem, 2.5vw, 2rem)" : "1.1rem",
            fontWeight: featured ? 700 : 600,
            color: "var(--text-primary)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            fontVariationSettings: '"opsz" 36',
          }}
        >
          {note.title}
        </h3>

        <p
          className="font-body"
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            marginTop: "10px",
            maxWidth: featured ? "58ch" : "38ch",
            flex: 1,
          }}
        >
          {note.excerpt.length > (featured ? 220 : 110)
            ? note.excerpt.slice(0, featured ? 220 : 110).trimEnd() + "…"
            : note.excerpt}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>{date}</span>
          <span className="font-mono" style={{ fontSize: "14px", color: "var(--accent)", transition: "transform 0.3s var(--ease-out)", display: "inline-block" }} >→</span>
        </div>
      </div>
    </Link>
  )
}
