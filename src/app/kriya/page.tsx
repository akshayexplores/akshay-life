import type { Metadata } from "next"
import Link from "next/link"
import { movement } from "@/data/movements"
import { getBuildLog } from "@/lib/sources"
import { getAllInsights } from "@/lib/mdx"

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
 * The entries and the date now come from content/kriya.json when the vault
 * carries it; scripts/check-drift.py shouts if the date goes stale.
 */

export default function KriyaPage() {
  const k = movement("kriya")
  const { updated: LAST_UPDATED, entries } = getBuildLog()
  const writing = getAllInsights().filter((i) => i.movement === "kriya")

  return (
    <main className="sheet">
      <section style={{ paddingBottom: "var(--s6)", borderBottom: "1px solid var(--rule)" }}>
        <span className="lbl">Build log</span>
        <h1 className="t-h2" style={{ marginTop: "var(--s4)" }}>
          {k.heading}
        </h1>
        <div className="font-dev" style={{ fontSize: 22, color: "var(--pravala)", marginTop: "var(--s3)" }}>
          {k.devanagari}
        </div>
        <p className="meta" style={{ marginTop: "var(--s1)" }}>
          Kriyā · action &nbsp;·&nbsp; last updated {LAST_UPDATED}
        </p>
      </section>

      <div className="entry" style={{ borderTop: "none" }}>
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
                padding: "var(--s5) 0",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)",
              }}
            >
              <span className="meta" style={{ color: "var(--pravala-deep)" }}>
                {e.label}
              </span>
              <h2 className="t-h3" style={{ marginTop: "var(--s2)" }}>
                {e.title}
              </h2>
              <p style={{ marginTop: "var(--s2)", fontSize: 15.5, lineHeight: 1.68 }}>{e.body}</p>
            </article>
          ))}

          <p className="meta-sent" style={{ marginTop: "var(--s5)", maxWidth: "60ch" }}>
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

      {/* ══ Writing filed under this movement ══ */}
      <div className="entry" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="rail">
          <span className="no">—</span>
          Written under Kriyā
          <span className="mnote">
            The movement is a content category as well as a section. These are the pieces filed
            here.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">{writing.length} pieces on shipping</h2>
          <ol className="idx" style={{ marginTop: "var(--s5)" }}>
            {writing.map((i) => (
              <li key={i.slug}>
                <Link href={`/darshana/${i.slug}`}>
                  <span>
                    <span style={{ fontSize: 16, lineHeight: 1.5, display: "block", color: "var(--masi)" }}>
                      {i.title}
                    </span>
                    <span className="meta" style={{ display: "block", marginTop: 4 }}>{i.subject}</span>
                  </span>
                  <span className="meta tail">{i.readingMinutes} min</span>
                </Link>
              </li>
            ))}
          </ol>
          {writing.length === 0 && <p style={{ marginTop: "var(--s4)" }}>Nothing filed here yet.</p>}
        </div>
      </div>
    </main>
  )
}
