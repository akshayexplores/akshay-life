import Link from "next/link"
import { getAllInsights, getSubjectWeights } from "@/lib/mdx"
import { movements } from "@/data/movements"
import { buildTerritories } from "@/lib/brain"
import Reveal from "@/components/Reveal"
import BrainMap from "@/components/BrainMap"
import PatternDots from "@/components/PatternDots"

const HUE: Record<string, string> = {
  darshana: "192,86,47",
  krama: "192,138,46",
  kriya: "31,42,68",
}

export default function Home() {
  const insights = getAllInsights()
  const latest = insights.slice(0, 5)
  // Solved at build time from the files on disk, so the map cannot drift
  // from what has actually been written.
  const territories = buildTerritories(getSubjectWeights())

  // Quantified per movement — three rows, no accumulation counters.
  const byMovement = movements
    .map((m) => {
      const own = territories.filter((t) => t.movement === m.id)
      return {
        ...m,
        share: own.reduce((s, t) => s + t.share, 0),
        pieces: own.reduce((s, t) => s + t.pieces, 0),
        domains: own.length,
      }
    })
    .filter((m) => m.pieces > 0)

  return (
    <main className="sheet" style={{ paddingTop: 92 }}>
      {/* ══ Cover ══ */}
      <section className="cover">
        <h1 className="t-cover">
          <span className="font-dev cover-dev">क्रम</span>
          Krama
        </h1>
        <p className="cover-sub">of Akshay</p>

        <p className="cover-note">
          This is an open notebook, kept in public to jumpstart future builders.
        </p>

        <p className="cover-place meta">
          <span style={{ color: "var(--pravala)" }}>◉</span> Bharat{" "}
          <span className="cover-place-en">India</span>
          <span className="cover-dot">·</span>
          <Link href="/kriya" className="link" style={{ color: "var(--pravala-deep)" }}>
            Constantly building →
          </Link>
        </p>

        <hr className="dashed-rule" />
      </section>

      {/* ══ The statement — the one Nīla moment ══ */}
      <section className="statement-wrap">
        <div className="statement on-nila">
          <PatternDots />
          <h2 className="statement-h">I look for patterns</h2>
          <p className="statement-p">
            Patterns tell the hidden stories inside any complexity. I translate those stories into
            systems that scale.
          </p>
          <p className="statement-mv">Darśana · Krama · Kriyā</p>
        </div>
      </section>

      {/* ══ Quantifying my capacity ══ */}
      <div className="entry cap-entry" style={{ paddingTop: 44, paddingBottom: 40 }}>
        <div className="cap-side">
          <h2 className="t-h2">
            Quantifying
            <br />
            my capacity
          </h2>
          <p className="meta-sent" style={{ marginTop: 14, maxWidth: "34ch" }}>
            Every domain I write in, sized by how much of it there actually is.
          </p>

          <ol className="cap-rows">
            {byMovement.map((m) => (
              <li key={m.id}>
                <Link href={`/${m.id}`}>
                  <span className="sw" style={{ background: `rgb(${HUE[m.id]})` }} />
                  <span className="nm">
                    {m.roman}
                    <span className="dv font-dev">{m.devanagari}</span>
                  </span>
                  <span className="val">{Math.round(m.share * 100)}%</span>
                  <span className="sub">
                    {m.pieces} {m.pieces === 1 ? "piece" : "pieces"} · {m.domains} domains
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className="cap-plate">
          <BrainMap territories={territories} totalPieces={insights.length} />
        </div>
      </div>

      {/* ══ 01 · The three movements ══ */}
      <div className="entry">
        <div className="rail">
          <span className="no">01</span>
          Three movements
          <span className="mnote">
            Not pillars. Movements — they run in sequence, and krama means sequence. Site sections,
            service stages and content categories at once.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">Darśana → Krama → Kriyā</h2>
          <p className="t-first" style={{ marginTop: 14, marginBottom: 8 }}>
            Each term has an exact professional counterpart. Neither half is decoration.
          </p>

          {movements.map((m) => (
            <Link key={m.id} href={`/${m.id}`} className="mv" style={{ cursor: "pointer" }}>
              <div className="glyphbox">
                <span className="skt">{m.devanagari}</span>
              </div>
              <div>
                <div className="rom">
                  {m.roman} · {m.gloss}
                </div>
                <h3 className="t-h3">{m.heading}</h3>
                <p>{m.body}</p>
                <div className="maps">maps to → {m.mapsTo}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ 02 · Latest ══ */}
      <div className="entry">
        <div className="rail">
          <span className="no">02</span>
          Latest
          <span className="mnote">
            Written first person, from experience. Distilled from a working vault, not composed for
            an audience.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">Recently written</h2>
          <Reveal>
            <ol className="idx" style={{ marginTop: 20 }}>
              {latest.map((i) => (
                <li key={i.slug}>
                  <Link href={`/darshana/${i.slug}`}>
                    <span style={{ fontSize: 16, lineHeight: 1.5 }}>{i.title}</span>
                    <span className="meta tail">{i.readingMinutes} min</span>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
          <p style={{ marginTop: 20 }}>
            <Link href="/darshana" className="link meta-sent">
              The whole archive →
            </Link>
          </p>
        </div>
      </div>

      {/* ══ 03 · One statement ══ */}
      <div className="entry" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="rail">
          <span className="no">03</span>
          Working on
          <span className="mnote">One statement per page. The rest is paper, ink and hairlines.</span>
        </div>
        <div className="col">
          <div className="on-pravala">
            <span className="lbl">OrgIntel</span>
            <p
              style={{
                fontSize: "clamp(22px,3vw,30px)",
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                color: "#FFF6EE",
                marginTop: 10,
              }}
            >
              Every rep who leaves takes the context with them.
            </p>
          </div>
          <p className="meta-sent" style={{ marginTop: 18 }}>
            Companies lose their memory as they scale. I&rsquo;m building the fix.{" "}
            <Link href="/kriya" className="link">
              What that looks like today →
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
