import Link from "next/link"
import { getAllInsights } from "@/lib/mdx"
import { projects } from "@/data/projects"
import { tools } from "@/data/tools"
import { pillars, pillarName } from "@/data/pillars"
import Krama from "@/components/Krama"
import Reveal from "@/components/Reveal"

export default function Home() {
  const insights = getAllInsights()
  const latest = insights.slice(0, 3)

  // Every number on this page is counted from the repo at build time.
  // Nothing here is typed in by hand.
  const stats = [
    { value: String(insights.length), label: "Insights published" },
    { value: String(projects.length), label: "Projects, outcomes included" },
    { value: String(pillars.length), label: "Content pillars" },
    { value: String(tools.length), label: "Tools in the stack" },
  ]

  return (
    <main className="relative z-[2] mx-auto max-w-[1180px] px-6 md:px-10">
      {/* ── Hero ──────────────────────────────── */}
      <section className="pt-32 md:pt-44">
        <p className="t-label">क्रम · Krama · Progress in sequence</p>

        <Krama
          text="Akshay Sajeev"
          as="h1"
          className="t-hero mt-6"
        />

        <p
          className="mt-8 font-body"
          style={{ maxWidth: "44ch", fontSize: "1.25rem", lineHeight: 1.6, color: "var(--text)" }}
        >
          I enter ambiguous spaces, find the signal, and build the system that scales it.
        </p>

        <p
          className="mt-5 font-body"
          style={{ maxWidth: "58ch", fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)" }}
        >
          AI made building and broadcasting cheap. The scarce layer is human — trust, judgment,
          proof. Those can be engineered, but only by someone who has shipped, broken things,
          and watched the fix work.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link href="/insights" className="t-meta link-u" style={{ color: "var(--accent)" }}>
            Read the insights →
          </Link>
          <Link href="/projects" className="t-meta link-u">
            See what shipped and what did not →
          </Link>
        </div>
      </section>

      {/* ── Stats bento ───────────────────────── */}
      <section className="mt-24 md:mt-32">
        <div className="grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden" }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div style={{ background: "var(--surface)", padding: "1.75rem 1.5rem", height: "100%" }}>
                <p className="font-mono" style={{ fontSize: "2rem", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--text)" }}>
                  {s.value}
                </p>
                <p className="t-meta" style={{ marginTop: "0.75rem", lineHeight: 1.5 }}>
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Pillars ───────────────────────────── */}
      <section className="mt-24 md:mt-32">
        <div className="flex items-baseline justify-between">
          <h2 className="t-label">What gets written here</h2>
          <Link href="/insights" className="t-meta link-u">All insights →</Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-px md:grid-cols-3" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden" }}>
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <Link
                href={`/insights?pillar=${p.id}`}
                className="block"
                style={{ background: "var(--surface)", padding: "1.75rem 1.5rem", height: "100%" }}
              >
                <h3 className="t-heading" style={{ color: "var(--text)" }}>{p.name}</h3>
                <p className="mt-3 font-body" style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-dim)" }}>
                  {p.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Latest insights ─────────────────────── */}
      <section className="mt-24 md:mt-32">
        <h2 className="t-label">Latest</h2>

        <ul className="mt-7" style={{ borderTop: "1px solid var(--border)" }}>
          {latest.map((i, idx) => (
            <Reveal as="li" key={i.slug} delay={idx * 60}>
              <Link
                href={`/insights/${i.slug}`}
                className="group block py-6"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                  <span className="t-meta" style={{ minWidth: "9.5rem", color: "var(--accent-dim)" }}>
                    {pillarName(i.pillar)}
                  </span>
                  <div className="flex-1">
                    <h3 className="t-heading" style={{ color: "var(--text)" }}>{i.title}</h3>
                    {i.excerpt && (
                      <p className="mt-2 font-body" style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--text-dim)", maxWidth: "70ch" }}>
                        {i.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="t-meta" style={{ whiteSpace: "nowrap" }}>{i.readingMinutes} min</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Now strip ─────────────────────────── */}
      <section className="mt-24 md:mt-32">
        <Link href="/now" className="bento block p-7 md:p-9">
          <p className="t-label">Currently</p>
          <p className="mt-4 font-body" style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--text)", maxWidth: "60ch" }}>
            Vajra GTM, FastrBuild, and consulting work with Acsia on LiLA.
          </p>
          <p className="t-meta mt-4" style={{ color: "var(--accent)" }}>Read the /now page →</p>
        </Link>
      </section>
    </main>
  )
}
