import Link from "next/link"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"
import { projects } from "@/data/projects"
import { getProjectDoc, renderMarkdown } from "@/lib/mdx"

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return { title: "Project — Akshay Sajeev" }
  return { title: `${project.title} — Akshay Sajeev`, description: project.description }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()
  const doc = getProjectDoc(id)

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <article className="mx-auto max-w-[680px] px-6 pb-32 pt-32 md:px-0 md:pt-40">
        <Link href="/projects" className="font-mono" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}>
          ← all projects
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
          {project.tags.map((t) => (
            <span key={t} className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>{t}</span>
          ))}
        </div>

        <h1 className="mt-5 font-display" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400, lineHeight: 1.2, color: "var(--text-primary)" }}>
          {project.title}
        </h1>
        <p className="mt-4 font-mono" style={{ fontSize: "13px", color: "var(--accent)" }}>
          {project.client} · {project.year}
        </p>

        {doc ? (
          <div className="prose-note mt-14" dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.content) }} />
        ) : (
          <p className="prose-note mt-14">{project.description}</p>
        )}

        <div className="mt-16 border-t pt-10" style={{ borderColor: "var(--border)" }}>
          <Link href="/projects" className="font-display inline-flex items-center gap-3" style={{ fontSize: "1.25rem", color: "var(--text-primary)", textDecoration: "none" }}>
            <span style={{ color: "var(--accent)" }}>←</span> More projects
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  )
}
