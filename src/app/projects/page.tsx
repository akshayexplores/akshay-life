import type { Metadata } from "next"
import Link from "next/link"
import { getAllProjects } from "@/lib/mdx"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects with the outcomes attached — including the ones that shut down.",
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="relative z-[2] mx-auto max-w-[1180px] px-6 pt-32 md:px-10 md:pt-40">
      <p className="t-label">Projects</p>
      <h1 className="t-display mt-5" style={{ maxWidth: "22ch" }}>
        Proof, not adjectives
      </h1>
      <p
        className="mt-6 font-body"
        style={{ maxWidth: "62ch", fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)" }}
      >
        {projects.length} projects, written up in full. Where something failed, it says so.
        Where something was a precursor rather than a product, it says that too. No metric
        appears here that was not measured.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 50}>
            <Link
              href={`/projects/${p.slug}`}
              className="bento group flex h-full flex-col p-6 md:p-7"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {p.client && (
                  <span className="t-meta" style={{ color: "var(--text-dim)" }}>{p.client}</span>
                )}
                {p.year && (
                  <>
                    <span className="t-meta">·</span>
                    <span className="t-meta">{p.year}</span>
                  </>
                )}
                <span className="t-meta">·</span>
                <span className="t-meta">{p.readingMinutes} min</span>
              </div>

              <h2 className="t-heading mt-3" style={{ color: "var(--text)" }}>
                {p.title}
              </h2>

              {p.excerpt && (
                <p
                  className="mt-3 font-body"
                  style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-dim)" }}
                >
                  {p.excerpt}
                </p>
              )}

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-2">
                  {p.skills.slice(0, 3).map((s) => (
                    <span key={s} className="chip" style={{ cursor: "inherit" }}>{s}</span>
                  ))}
                </div>
                <p className="t-meta mt-4 link-u" style={{ color: "var(--accent-dim)" }}>
                  Read the write-up →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <p className="t-meta mt-12" style={{ maxWidth: "62ch", lineHeight: 1.7 }}>
        Note on relationships: I consult for Acsia (on LiLA) and advise GRAC. I hold no equity in
        either company, and none in LiLA.
      </p>
    </main>
  )
}
