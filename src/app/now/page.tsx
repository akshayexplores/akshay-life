import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Now",
  description: "What I am actually focused on right now.",
}

/*
 * PEN-BACK NOTE (see the site brief, §8):
 * The four entries below are factual descriptions of current engagements —
 * scaffolding, not claims. Deliberately excluded: revenue targets, client
 * concentration, receivables, and hiring plans. Those are private operating
 * detail, not publication material.
 *
 * [HUMAN_REQUIRED] — a /now page earns its keep when it says what is hard
 * right now, not just what is underway. One honest line per entry about the
 * thing that is not working has to come from Akshay.
 *
 * UPDATE THIS DATE whenever the page changes. A stale /now page is worse
 * than no /now page.
 */
const LAST_UPDATED = "28 July 2026"

const entries = [
  {
    label: "Vajra",
    title: "Taking an AI workspace to market",
    body:
      "Vajra grew out of the internal automation at FastrBuild — the N8N workflows that took roughly 30% of the repeatable work off the team. The work now is GTM: who it is for, what it replaces, and what someone would actually pay for.",
  },
  {
    label: "FastrBuild",
    title: "Building the agency into a system",
    body:
      "Relationship-led marketing, CRM pipeline design, and automated outbound — run as a repeatable engine rather than a set of engagements that depend on me being in the room.",
  },
  {
    label: "Acsia · LiLA",
    title: "Product vision, GTM, and investor readiness",
    body:
      "Consulting with Acsia Technologies on LiLA, their agentic AI platform for automotive software. Financial modelling, the investor narrative, and the sales engine behind it. Consultant, not an employee. No equity.",
  },
  {
    label: "akshay.life",
    title: "Publishing the archive",
    body:
      "The insights here are distilled from working notes and sync automatically from a private vault. The next pass is turning subject-based writeups into the five pillars properly — starting with the ones that carry an actual scar.",
  },
]

export default function NowPage() {
  return (
    <main className="relative z-[2] mx-auto max-w-[820px] px-6 pt-32 md:pt-40">
      <p className="t-label">Now</p>
      <h1 className="t-display mt-5" style={{ maxWidth: "20ch" }}>
        What has my attention
      </h1>
      <p className="t-meta mt-5">Last updated {LAST_UPDATED}</p>

      <div className="mt-14 flex flex-col">
        {entries.map((e, i) => (
          <article
            key={e.label}
            className="py-8"
            style={{
              borderTop: "1px solid var(--border)",
              borderBottom: i === entries.length - 1 ? "1px solid var(--border)" : undefined,
            }}
          >
            <p className="t-meta" style={{ color: "var(--accent-dim)" }}>{e.label}</p>
            <h2 className="t-heading mt-2" style={{ color: "var(--text)" }}>{e.title}</h2>
            <p
              className="mt-3 font-body"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)", maxWidth: "66ch" }}
            >
              {e.body}
            </p>
          </article>
        ))}
      </div>

      <p className="t-meta mt-10" style={{ maxWidth: "62ch", lineHeight: 1.7 }}>
        This is a{" "}
        <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="link-u">
          now page
        </a>
        . If it has not moved in three months, assume it is stale and{" "}
        <Link href="/about" className="link-u">email me</Link> instead.
      </p>
    </main>
  )
}
