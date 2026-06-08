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
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">
        <Link href="/" data-cursor-hover className="font-mono" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          ← back
        </Link>
        <h1 className="mt-8 font-display" style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 400, color: "var(--text-primary)", lineHeight: 1.05 }}>
          Projects
        </h1>
        <p className="mt-4 font-body" style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "520px" }}>
          Products, systems, automations, and campaigns — built across a dozen companies, mostly without a single line of production code.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
