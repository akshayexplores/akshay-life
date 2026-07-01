import Link from "next/link"
import { getAllInsights } from "@/lib/mdx"
import { projects } from "@/data/projects"

export default function Home() {
  const insights = getAllInsights()

  return (
    <main className="mx-auto max-w-[680px] px-6 pt-40 md:px-0 md:pt-48" style={{ color: "var(--text-primary)" }}>
      
      {/* Name */}
      <h1 className="font-body" style={{ fontSize: "1.125rem", fontWeight: 500, color: "var(--text-primary)" }}>
        Akshay Sajeev
      </h1>

      {/* Bio */}
      <p className="mt-8 font-body" style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
        <span className="font-display" style={{ fontStyle: "italic", color: "var(--text-primary)" }}>
          Generalist by design.
        </span>{" "}
        Entrepreneur by behavior. I turn ambiguous startup problems into simple, scalable systems. Building in public, learning in public, failing in public.
      </p>
      <p className="mt-4 font-body" style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
        Founder at{" "}
        <a href="https://fastrbuild.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)" }}>
          fastrBuild Intelligence
        </a>
        . Previously: Vercel design system, college community app, no-code ecosystem, two investment rounds, an acquisition, and a bankruptcy.
      </p>

      {/* Three-column grid */}
      <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
        
        {/* Building */}
        <div>
          <h2 className="text-label mb-6">Building</h2>
          <div className="flex flex-col gap-4">
            <span className="font-body" style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              Turning ambiguous problems into systems.
            </span>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-label mb-6">Projects</h2>
          <div className="flex flex-col gap-4">
            {projects.slice(0, 3).map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} style={{ textDecoration: "none" }}>
                <span className="font-body" style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                  {p.title}
                </span>
                <span className="block font-body" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                  {p.description}
                </span>
              </Link>
            ))}
            <Link href="/projects" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              All projects →
            </Link>
          </div>
        </div>

        {/* Writing */}
        <div>
          <h2 className="text-label mb-6">Writing</h2>
          <div className="flex flex-col gap-4">
            {insights.slice(0, 3).map((i) => (
              <Link key={i.slug} href={`/insights/${i.slug}`} style={{ textDecoration: "none" }}>
                <span className="font-body" style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                  {i.title}
                </span>
                <span className="block font-body" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                  {i.category}
                </span>
              </Link>
            ))}
            <Link href="/insights" style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              All insights →
            </Link>
          </div>
        </div>
      </div>

      {/* Now */}
      <div className="mt-20">
        <h2 className="text-label mb-6">Now</h2>
        <p className="font-body" style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
          Building fastrBuild Intelligence. Writing 27 field notes on marketing, sales, and systems. Learning AI agents and automation. Obsessing over fundamentals and compounding leverage.
        </p>
      </div>

      {/* Connect */}
      <div className="mt-20">
        <h2 className="text-label mb-6">Connect</h2>
        <p className="font-body" style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
          Reach me at{" "}
          <a href="mailto:akshay@fastrbuild.com" style={{ color: "var(--text-primary)" }}>
            akshay@fastrbuild.com
          </a>
          {" "}or{" "}
          <a href="https://x.com/AkshayExplores" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)" }}>
            @AkshayExplores
          </a>
          .
        </p>
      </div>

      {/* Footer */}
      <div className="mt-20 pb-20">
        <p className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} Akshay Sajeev
        </p>
      </div>
    </main>
  )
}
