import type { Metadata } from "next"
import { projects, outcomeLabel, type Outcome } from "@/data/projects"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Eleven projects with the outcomes attached — including the ones that shut down.",
}

const outcomeColor: Record<Outcome, string> = {
  "shipped": "var(--text-dim)",
  "shut-down": "#C0553B",
  "precursor": "var(--accent-dim)",
  "live": "var(--accent)",
  "in-progress": "var(--text-faint)",
}

export default function ProjectsPage() {
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
        {projects.length} projects. Where something failed, it says so. Where something was a
        precursor rather than a product, it says that too. No metric appears here that was not
        measured.
      </p>

      <ul className="mt-14" style={{ borderTop: "1px solid var(--border)" }}>
        {projects.map((p, i) => (
          <Reveal as="li" key={p.id} delay={(i % 4) * 50}>
            <article className="py-8" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex flex-col gap-5 md:flex-row md:gap-10">
                <div style={{ minWidth: "11rem" }}>
                  <p className="t-meta" style={{ color: "var(--text-dim)" }}>{p.org}</p>
                  <p
                    className="t-meta mt-1"
                    style={{ color: outcomeColor[p.outcomeKind], letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    {outcomeLabel[p.outcomeKind]}
                  </p>
                </div>

                <div className="flex-1">
                  <h2 className="t-heading" style={{ color: "var(--text)" }}>{p.title}</h2>

                  <p
                    className="mt-3 font-body"
                    style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-dim)", maxWidth: "68ch" }}
                  >
                    {p.summary}
                  </p>

                  <p
                    className="mt-3 font-body"
                    style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text)", maxWidth: "68ch" }}
                  >
                    {p.outcome}
                  </p>

                  {p.relationship && (
                    <p className="t-meta mt-3" style={{ color: "var(--text-faint)" }}>
                      {p.relationship}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="chip" style={{ cursor: "default" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <p className="t-meta mt-10" style={{ maxWidth: "62ch", lineHeight: 1.7 }}>
        Note on relationships: I consult for Acsia (on LiLA) and advise GRAC. I hold no equity in
        either company, and none in LiLA.
      </p>
    </main>
  )
}
