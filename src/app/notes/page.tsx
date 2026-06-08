import Link from "next/link"
import Footer from "@/components/Footer"
import NoteCard from "@/components/ui/NoteCard"
import { getAllNotes } from "@/lib/mdx"

export const metadata = {
  title: "Notes — Akshay Sajeev",
  description: "Field notes on building, leverage, sales, and the messy reality of entrepreneurship.",
}

export default function NotesPage() {
  const notes = getAllNotes()
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">
        <Link href="/" data-cursor-hover className="font-mono" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          ← back
        </Link>
        <h1 className="mt-8 font-display" style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05 }}>
          Notes
        </h1>
        <p className="mt-4 font-body" style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "520px" }}>
          A running record of what I&apos;m learning in public — on building, leverage, and the parts of the work nobody puts on a slide.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((n) => (
            <NoteCard key={n.slug} note={n} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
