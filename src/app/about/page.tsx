import Link from "next/link"
import Footer from "@/components/Footer"
import { getAllInsights } from "@/lib/mdx"
import { projects } from "@/data/projects"
import { tools } from "@/data/tools"

export const metadata = {
  title: "About — Akshay Sajeev",
  description:
    "Generalist by design. Entrepreneur by behavior. Turning ambiguous startup problems into simple, scalable systems.",
}

export default function AboutPage() {
  const insightCount = getAllInsights().length
  const projectCount = projects.length
  const toolCount = tools.length
  const clientCount = 12 // Hardcoded — no data source for this

  const stats = [
    { label: "Insights", value: insightCount },
    { label: "Projects", value: projectCount },
    { label: "Clients", value: clientCount },
    { label: "Tools", value: toolCount },
  ]

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[720px] px-6 pb-32 pt-40">
        <Link
          href="/"
          data-cursor-hover
          className="font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          ← back
        </Link>

        <h1
          className="mt-8 font-display"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.05,
          }}
        >
          About
        </h1>

        <p
          className="mt-6 font-body"
          style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          Generalist by design. Entrepreneur by behavior. I turn ambiguous startup problems into simple, scalable systems — and I do it in public.
        </p>

        <p
          className="mt-4 font-body"
          style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          I’ve spent years moving across sales, marketing, product, no-code, content, and AI. Always chasing the same thing: clarity, fundamentals, and leverage that compounds.
        </p>

        <p
          className="mt-4 font-body"
          style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          I learn and build in public, and I’m candid about failures: cold outbound that failed for reasons dashboards couldn’t explain; a hyperlocal college app to 100 paying users in month one, then shut down because the unit economics didn’t work; a no-code collective ecosystem to a working MVP without a line of production code; two investment raises, an acquisition, and a bankruptcy.
        </p>

        <p
          className="mt-4 font-body"
          style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7 }}
        >
          I’m not interested in hype. I care about fundamentals, systems that compound, and the hard truth of what actually works.
        </p>

        {/* Stat strip */}
        <div
          className="mt-12 grid grid-cols-2 gap-4 border-y py-8 md:grid-cols-4"
          style={{ borderColor: "var(--border)" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display"
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 400,
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 font-mono uppercase"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16">
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
            }}
          >
            Contact
          </p>
          <p
            className="mt-4 font-body"
            style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            akshay@fastrbuild.com
          </p>
          <div className="mt-6 flex gap-6">
            <a
              href="https://x.com/AkshayExplores"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-mono transition-colors hover:text-[var(--accent)]"
              style={{ fontSize: "14px", color: "var(--text-secondary)" }}
            >
              X / Twitter
            </a>
            <a
              href="https://github.com/akshayexplores"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="font-mono transition-colors hover:text-[var(--accent)]"
              style={{ fontSize: "14px", color: "var(--text-secondary)" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
