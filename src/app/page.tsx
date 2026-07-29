import Link from "next/link"
import { getAllInsights, getSubjectWeights } from "@/lib/mdx"
import { movements } from "@/data/movements"
import { buildTerritories } from "@/lib/brain"
import Reveal from "@/components/Reveal"
import BrainMap from "@/components/BrainMap"

export default function Home() {
  const insights = getAllInsights()
  const latest = insights.slice(0, 5)
  // Solved at build time from the files on disk, so the map cannot drift
  // from what has actually been written.
  const territories = buildTerritories(getSubjectWeights())

  return (
    <main className="sheet" style={{ paddingTop: 96 }}>
      {/* ══ Cover ══ */}
      <section
        className="cover-grid"
        style={{ padding: "48px 0 56px", borderBottom: "1px solid var(--rule)" }}
      >
        <div>
          <h1 className="t-cover">Krama</h1>
          <p
            style={{
              fontSize: "clamp(20px,2.6vw,30px)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              color: "var(--masi-soft)",
              marginTop: 2,
            }}
          >
            of Akshay
          </p>

          <div className="font-dev" style={{ fontSize: 26, color: "var(--pravala)", marginTop: 14 }}>
            क्रम
          </div>

          <p className="meta" style={{ marginTop: 24, lineHeight: 2.1 }}>
            Bharat{" "}
            <span
              style={{
                fontFamily: "var(--font-newsreader), Georgia, serif",
                fontStyle: "italic",
                textTransform: "none",
                letterSpacing: "0.01em",
                fontSize: 15,
              }}
            >
              India
            </span>
            <br />
            Ordered progress — sequence, step, the correct order of things
          </p>
        </div>

        <div className="cover-plate">
          <BrainMap territories={territories} totalPieces={insights.length} />
        </div>
      </section>

      {/* ══ The one Nīla moment ══ */}
      <section style={{ padding: "44px 0 0" }}>
        <div className="on-nila">
          <span className="lbl">The throughline</span>
          <p
            style={{
              fontSize: "clamp(24px,3.4vw,34px)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: "12px 0",
              color: "#E6E0D2",
            }}
          >
            I look for the pattern behind the mess.
          </p>
          <p style={{ fontSize: 15.5 }}>
            Then I build the thing that holds it. GTM systems, sales intelligence, and the
            occasional product — for founders sitting on problems too messy to name.
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#E9906D",
              marginTop: 20,
            }}
          >
            Darśana · Krama · Kriyā
          </p>
        </div>
      </section>

      {/* ══ 01 · The three movements ══ */}
      <div className="entry" style={{ borderTop: "none", paddingTop: 46 }}>
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
