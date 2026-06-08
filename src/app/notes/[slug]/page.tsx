import Link from "next/link"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"
import { getAllNotes, getNote, renderMarkdown } from "@/lib/mdx"

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return { title: "Note — Akshay Sajeev" }
  return { title: `${note.meta.title} — Akshay Sajeev`, description: note.meta.excerpt }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  const date = note.meta.date
    ? new Date(note.meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : ""

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <article className="mx-auto max-w-[720px] px-6 pb-32 pt-40">
        <Link href="/notes" data-cursor-hover className="font-mono" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          ← all notes
        </Link>
        <p className="mt-10 font-mono uppercase" style={{ fontSize: "12px", letterSpacing: "0.15em", color: "var(--accent)" }}>
          {note.meta.category}
        </p>
        <h1 className="mt-5 font-display" style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 400, lineHeight: 1.1, color: "var(--text-primary)" }}>
          {note.meta.title}
        </h1>
        <p className="mt-5 font-mono" style={{ fontSize: "13px", color: "var(--text-muted)" }}>{date}</p>
        <div className="prose-note mt-14" dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }} />
      </article>
      <Footer />
    </main>
  )
}
