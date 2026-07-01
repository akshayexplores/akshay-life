import Link from "next/link"
import Footer from "@/components/Footer"
import ProjectCard from "@/components/ui/ProjectCard"
import { projects } from "@/data/projects"

export const metadata = {
  title: "Projects — Akshay Sajeev",
  description: "Things I've built — products, systems, automations, and campaigns across a dozen companies.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[680px] px-6 pb-24 pt-32 md:px-0 md:pt-40">
        <Link href="/" className="font-mono" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}>
          ← back
        </Link>
        <h1 className="mt-8 font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.1 }}>
          Projects
        </h1>
        <p className="mt-4 font-body" style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Products, systems, automations, and campaigns — built across a dozen companies, mostly without a single line of production code.
        </p>

        <div className="mt-16 flex flex-col">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="group border-b py-6" style={{ borderColor: "var(--border)", textDecoration: "none" }}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-body" style={{ fontSize: "1.0625rem", color: "var(--text-primary)" }}>
                  {p.title}
                </span>
                <span className="font-mono flex-shrink-0" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {p.year}
                </span>
              </div>
              <span className="block font-body mt-1" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                {p.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
