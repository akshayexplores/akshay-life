import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "An entrepreneur who brings clarity into ambiguity. What I do, what I don't, and the chase across domains.",
}

/*
 * PEN-BACK NOTE (see AGENTS.md / the site brief, §8):
 * Every line of prose on this page is Akshay's own copy, lifted from his
 * positioning doc. Nothing here was authored by an assistant.
 *
 * [HUMAN_REQUIRED] — "The chase" section currently states the pattern but
 * carries no scar. It wants one specific story: the domain he jumped into,
 * what it cost him, and what he saw on the other side. That has to be written
 * by him.
 */

export default function AboutPage() {
  return (
    <main className="relative z-[2] mx-auto max-w-[1180px] px-6 pt-32 md:px-10 md:pt-40">
      <p className="t-label">About</p>

      <h1 className="t-display mt-5" style={{ maxWidth: "18ch" }}>
        Clarity into ambiguity
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,1fr)_320px] md:gap-20">
        {/* ── Main column ─────────────────────── */}
        <div>
          <p className="font-body" style={{ fontSize: "1.25rem", lineHeight: 1.65, color: "var(--text)", maxWidth: "58ch" }}>
            I am an entrepreneur who brings clarity into ambiguity.
          </p>

          <p className="mt-6 font-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)", maxWidth: "62ch" }}>
            I find joy in touching messy problems and turning them into simple, scalable solutions
            and systems.
          </p>

          <h2 className="t-label mt-16">The chase</h2>
          <p className="mt-4 font-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)", maxWidth: "62ch" }}>
            I have spent years bouncing between sales, marketing, product, no-code, content, and AI.
            Not because I am a generalist. Because I was chasing the same thing in different
            environments: clarity, fundamentals, and optimization that compounds over time.
          </p>
          <p className="mt-4 font-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)", maxWidth: "62ch" }}>
            I do not pretend the breadth was a strategy from day one. It was a chase that turned
            into a pattern.
          </p>

          <h2 className="t-label mt-16">What I do</h2>
          <p className="mt-4 font-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text)", maxWidth: "62ch" }}>
            I enter ambiguous spaces, find the signal, and build the system that scales it.
          </p>

          <h2 className="t-label mt-16">The bet</h2>
          <p className="mt-4 font-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)", maxWidth: "62ch" }}>
            AI made building and broadcasting cheap. The scarce layer is human: trust, judgment,
            proof. These can be engineered — but only by someone who has actually shipped, broken
            things, and watched the fix work.
          </p>

          <h2 className="t-label mt-16">What this site is</h2>
          <p className="mt-4 font-body" style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)", maxWidth: "62ch" }}>
            A body of thought attached to an operator. Not a portfolio. Not a resume. The{" "}
            <Link href="/projects" className="link-u" style={{ color: "var(--accent)" }}>projects</Link>{" "}
            are evidence the worldview is real, not the headline.
          </p>
        </div>

        {/* ── Side column: roles, stated plainly ── */}
        <aside>
          <h2 className="t-label">Where I work</h2>

          <div className="mt-5 flex flex-col gap-px" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ background: "var(--surface)", padding: "1.25rem" }}>
              <p className="font-mono" style={{ fontSize: "0.875rem", color: "var(--text)" }}>FastrBuild Intelligence</p>
              <p className="t-meta mt-1">Founder &amp; CEO</p>
              <p className="mt-3 font-body" style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-dim)" }}>
                Bootstrapped B2B growth agency. Relationship-led marketing, CRM pipeline design,
                automation.
              </p>
            </div>

            <div style={{ background: "var(--surface)", padding: "1.25rem" }}>
              <p className="font-mono" style={{ fontSize: "0.875rem", color: "var(--text)" }}>Acsia Technologies · LiLA</p>
              <p className="t-meta mt-1">Strategic consultant</p>
              <p className="mt-3 font-body" style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-dim)" }}>
                Product vision, GTM motion, and investor readiness for an agentic AI platform built
                for automotive software.
              </p>
              <p className="t-meta mt-3" style={{ color: "var(--text-faint)" }}>Consultant, not an employee. No equity held.</p>
            </div>

            <div style={{ background: "var(--surface)", padding: "1.25rem" }}>
              <p className="font-mono" style={{ fontSize: "0.875rem", color: "var(--text)" }}>GRAC Sentinel</p>
              <p className="t-meta mt-1">Advisor</p>
              <p className="mt-3 font-body" style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-dim)" }}>
                GTM, sales enablement, and positioning for real-time compliance operations.
              </p>
              <p className="t-meta mt-3" style={{ color: "var(--text-faint)" }}>Advisory role. No equity held.</p>
            </div>
          </div>

          <h2 className="t-label mt-12">Reach me</h2>
          <div className="mt-4 flex flex-col gap-2">
            <a href="mailto:akshay@fastrbuild.com" className="t-meta link-u">akshay@fastrbuild.com</a>
            <a href="https://x.com/AkshayExplores" target="_blank" rel="noopener noreferrer" className="t-meta link-u">@AkshayExplores</a>
            <a href="https://github.com/akshayexplores" target="_blank" rel="noopener noreferrer" className="t-meta link-u">github.com/akshayexplores</a>
          </div>
        </aside>
      </div>
    </main>
  )
}
