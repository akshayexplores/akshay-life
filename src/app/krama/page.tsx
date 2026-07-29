import type { Metadata } from "next"
import Link from "next/link"
import { outcomeLabel, type Outcome } from "@/data/projects"
import { getProjects } from "@/lib/sources"
import { getAllInsights } from "@/lib/mdx"
import { movement } from "@/data/movements"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Krama",
  description:
    "The method and the work. Projects with the outcomes attached — including the ones that shut down.",
}

const outcomeColor: Record<Outcome, string> = {
  "shipped": "var(--masi-soft)",
  "shut-down": "var(--pravala-deep)",
  "precursor": "var(--arka)",
  "live": "var(--pravala)",
  "in-progress": "#98897A",
}

export default function KramaPage() {
  const k = movement("krama")
  const { rows: projects } = getProjects()
  const writing = getAllInsights().filter((i) => i.movement === "krama")

  return (
    <main className="sheet">
      <section style={{ paddingBottom: "var(--s6)", borderBottom: "1px solid var(--rule)" }}>
        <span className="lbl">Method &amp; work</span>
        <h1 className="t-h2" style={{ marginTop: "var(--s4)" }}>
          {k.heading}
        </h1>
        <div className="font-dev" style={{ fontSize: 22, color: "var(--pravala)", marginTop: "var(--s3)" }}>
          {k.devanagari}
        </div>
        <p className="meta" style={{ marginTop: "var(--s1)" }}>
          Krama · order
        </p>
      </section>

      {/* ── 01 the method ── */}
      <div className="entry" style={{ borderTop: "none" }}>
        <div className="rail">
          <span className="no">01</span>
          The method
          <span className="mnote">
            Consultant, founder, marketer, product builder — those are containers. The act
            underneath has never changed.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">The same act, four domains</h2>
          <p className="t-first" style={{ marginTop: "var(--s4)" }}>
            I go beneath the surface of a messy system, find the pattern that explains it, and build
            the structure that makes the pattern usable by other people.
          </p>
          <p style={{ marginTop: "var(--s4)" }}>
            True of the outbound engine that failed for reasons the dashboards couldn&rsquo;t
            explain. True of the Coda work ecosystem shipped without a line of production code. True
            of the GRC positioning. True of OrgIntel.
          </p>
          <div className="pull">
            The first domain you do this in is always the slowest, because you&rsquo;re building the
            machine, not just the skill.
            <span className="src">Self-mastery · the vault</span>
          </div>
          <p>
            <strong>Don&rsquo;t mistake the surface for the substance.</strong> The number behind
            the number is the reason. The CRM record behind the CRM record is the context.
          </p>
        </div>
      </div>

      {/* ── 02 the work ── */}
      <div className="entry">
        <div className="rail">
          <span className="no">02</span>
          The work
          <span className="mnote">
            Outcome attached to each. Where something failed, it says so. No metric here that was
            not measured.
          </span>
        </div>
        <div className="col" style={{ maxWidth: "none" }}>
          <h2 className="t-h2">Lead with the scar</h2>

          <ol className="idx" style={{ marginTop: "var(--s5)", borderTop: "1px solid var(--rule)" }}>
            {projects.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={(i % 4) * 40}>
                  <div className="row">
                    <div style={{ maxWidth: "68ch" }}>
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="t-h3">{p.title}</h3>
                        <span className="meta">{p.org}</span>
                      </div>
                      <p style={{ marginTop: "var(--s2)", fontSize: 15.5, lineHeight: 1.65 }}>{p.summary}</p>
                      <p style={{ marginTop: "var(--s2)", fontSize: 15.5, lineHeight: 1.65, color: "var(--masi)" }}>
                        {p.outcome}
                      </p>
                      {p.relationship && (
                        <p className="meta-sent" style={{ marginTop: "var(--s2)" }}>
                          {p.relationship}
                        </p>
                      )}
                      <p
                        className="font-mono"
                        style={{
                          marginTop: "var(--s3)",
                          fontSize: 10.5,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: outcomeColor[p.outcomeKind],
                        }}
                      >
                        {outcomeLabel[p.outcomeKind]}
                        <span style={{ color: "#98897A" }}> · {p.stack.join(" · ")}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <p className="meta-sent" style={{ marginTop: "var(--s5)", maxWidth: "62ch" }}>
            On relationships: I consult for Acsia (on LiLA) and advise GRAC. I hold no equity in
            either company, and none in LiLA.
          </p>
        </div>
      </div>

      {/* ══ 03 · Writing filed under this movement ══ */}
      <div className="entry" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="rail">
          <span className="no">03</span>
          Written under Krama
          <span className="mnote">
            The movement is a content category as well as a section. These are the pieces filed
            here.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">{writing.length} pieces on sequence</h2>
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
