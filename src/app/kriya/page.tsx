import type { Metadata } from "next"
import Link from "next/link"
import { movement } from "@/data/movements"

export const metadata: Metadata = {
  title: "Kriyā",
  description: "The build log. What is actually being shipped right now.",
}

/*
 * PEN-BACK NOTE (field manual §04, "the scar is the credential"):
 * These entries describe what is underway. They deliberately exclude revenue
 * targets, client concentration, receivables and hiring plans — private
 * operating detail, not publication material.
 *
 * [HUMAN_REQUIRED] — a build log earns its keep when it says what is breaking,
 * not only what is being built. One honest line per entry has to come from him.
 *
 * UPDATE THE DATE whenever this page changes. A stale build log is worse than
 * no build log.
 */
const LAST_UPDATED = "29 July 2026"

const entries = [
  {
    label: "OrgIntel",
    title: "Organisational memory as a living system",
    body: "Companies lose their memory as they scale — every rep who leaves takes the context with them. Pivoted from product-first to service-first, because the sequence has to be proven on real engagements before it becomes software.",
  },
  {
    label: "Vajra",
    title: "Taking an AI workspace to market",
    body: "Grew out of the internal automation at FastrBuild — the N8N workflows that took roughly 30% of the repeatable work off the team. The work now is go-to-market: who it is for, what it replaces, what someone would actually pay for.",
  },
  {
    label: "FastrBuild",
    title: "Building the agency into a system",
    body: "Relationship-led marketing, CRM pipeline design and automated outbound — run as a repeatable engine rather than a set of engagements that depend on me being in the room.",
  },
  {
    label: "Acsia · LiLA",
    title: "Product vision, GTM and investor readiness",
    body: "Consulting with Acsia Technologies on LiLA, their agentic AI platform for automotive software. Financial modelling, the investor narrative, and the sales engine behind it. Consultant, not an employee. No equity.",
  },
  {
    label: "akshay.life",
    title: "Publishing the archive",
    body: "The pieces here are distilled from a private vault and sync automatically. The next pass is bringing across the twelve essays still stranded on the old site.",
  },
]

export default function KriyaPage() {
  const k = movement("kriya")

  return (
    <main className="sheet" style={{ paddingTop: 116 }}>
      <section style={{ paddingBottom: 34, borderBottom: "1px solid var(--rule)" }}>
        <span className="lbl">Build log</span>
        <h1 className="t-h2" style={{ marginTop: 14 }}>
          {k.heading}
        </h1>
        <div className="font-dev" style={{ fontSize: 22, color: "var(--pravala)", marginTop: 12 }}>
          {k.devanagari}
        </div>
        <p className="meta" style={{ marginTop: 4 }}>
          Kriyā · action &nbsp;·&nbsp; last updated {LAST_UPDATED}
        </p>
      </section>

      <div className="entry" style={{ borderTop: "none", borderBottom: "1px solid var(--rule)" }}>
        <div className="rail">
          <span className="no">—</span>
          Currently
          <span className="mnote">
            Sequence that isn&rsquo;t built is philosophy. Service first, product later, but always
            product eventually.
          </span>
        </div>
        <div className="col">
          {entries.map((e, i) => (
            <article
              key={e.label}
              style={{
                padding: "22px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)",
              }}
            >
              <span className="meta" style={{ color: "var(--pravala-deep)" }}>
                {e.label}
              </span>
              <h2 className="t-h3" style={{ marginTop: 6 }}>
                {e.title}
              </h2>
              <p style={{ marginTop: 8, fontSize: 15.5, lineHeight: 1.68 }}>{e.body}</p>
            </article>
          ))}

          <p className="meta-sent" style={{ marginTop: 24, maxWidth: "60ch" }}>
            The tools behind all of it are listed{" "}
            <Link href="/tools" className="link">
              here
            </Link>
            . If this page hasn&rsquo;t moved in three months, assume it is stale and{" "}
            <a href="mailto:akshay@fastrbuild.com" className="link">
              email me
            </a>{" "}
            instead.
          </p>
        </div>
      </div>
    </main>
  )
}
