"use client"

import Link from "next/link"
import AnimatedText from "@/components/ui/AnimatedText"
import NoteCard from "@/components/ui/NoteCard"
import type { NoteMeta } from "@/lib/mdx"

export default function Notes({ notes }: { notes: NoteMeta[] }) {
  const featured = notes[0]
  const rest = notes.slice(1, 4)

  return (
    <section id="notes" className="py-32 md:py-48" style={{ background: "var(--bg-secondary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <AnimatedText as="h2" text="89 notes. Here are some that stuck." className="font-display notes-h2" />
        <style jsx>{`
          :global(.notes-h2) { font-size: clamp(36px, 6.5vw, 72px); font-weight: 400; color: var(--text-primary); line-height: 1.08; max-width: 16ch; }
        `}</style>

        {featured && (
          <div className="mt-20">
            <NoteCard note={featured} featured />
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((n) => (
              <NoteCard key={n.slug} note={n} />
            ))}
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/notes"
            data-cursor-hover
            className="font-display inline-flex items-center gap-3"
            style={{ fontSize: "36px", color: "var(--text-primary)" }}
          >
            See all 89 notes <span style={{ color: "var(--accent)" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
