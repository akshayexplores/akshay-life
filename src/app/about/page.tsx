import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "I look for the pattern behind the mess. Then I build the thing that holds it.",
}

/*
 * PEN-BACK NOTE (field manual §04, Voice):
 * Every line of prose on this page is Akshay's own — from his positioning doc,
 * from the field manual, or ported verbatim from the previous akshay.life.
 * Nothing here was authored by an assistant.
 *
 * [HUMAN_REQUIRED] — the track record below names four scars in one line each.
 * At least one deserves its own piece: the named breakage, the decision, the
 * aftermath. That has to come from him.
 */

const trackRecord = [
  "I’ve run cold outbound and watched it fail for reasons dashboards couldn’t explain.",
  "I’ve built a hyperlocal college-only community app that hit 100 paying users in the first month — and then shut it down because the unit economics didn’t make sense.",
  "I’ve led the build of a full collective-based work ecosystem on Coda, shipping a working MVP without writing a single production line of code.",
  "I’ve worked with teams where we’ve pitched to investors, raised investment twice, been through thick and thin — watched one acquisition go through, and lived through a bankruptcy.",
]

const roles = [
  {
    org: "FastrBuild Intelligence",
    role: "Founder & CEO",
    body: "Bootstrapped B2B growth agency. Relationship-led marketing, CRM pipeline design, automation.",
    note: "",
  },
  {
    org: "Acsia Technologies · LiLA",
    role: "Strategic consultant",
    body: "Product vision, GTM motion and investor readiness for an agentic AI platform built for automotive software.",
    note: "Consultant, not an employee. No equity held.",
  },
  {
    org: "GRAC Sentinel",
    role: "Advisor",
    body: "GTM, sales enablement and positioning for real-time compliance operations.",
    note: "Advisory role. No equity held.",
  },
]

export default function AboutPage() {
  return (
    <main className="sheet" style={{ paddingTop: 116 }}>
      <section style={{ paddingBottom: 34, borderBottom: "1px solid var(--rule)" }}>
        <span className="lbl">About</span>
        <h1 className="t-h2" style={{ marginTop: 14, maxWidth: "20ch" }}>
          I look for the pattern behind the mess
        </h1>
      </section>

      {/* 01 · the throughline */}
      <div className="entry" style={{ borderTop: "none" }}>
        <div className="rail">
          <span className="no">01</span>
          The throughline
          <span className="mnote">
            Every long piece I write ends by compressing itself into one paragraph. This is that
            paragraph, for the whole working life.
          </span>
        </div>
        <div className="col">
          <p className="t-first">
            Consultant, founder, marketer, product builder — those are containers. The act
            underneath has never changed.
          </p>
          <p style={{ marginTop: 14 }}>
            <strong>
              I go beneath the surface of a messy system, find the pattern that explains it, and
              build the structure that makes the pattern usable by other people.
            </strong>
          </p>
          <p style={{ marginTop: 14 }}>
            I&rsquo;ve spent years moving between sales, marketing, product, no-code, content and
            AI. Not because I&rsquo;m a generalist — because I was chasing the same thing in
            different environments: clarity, fundamentals, and optimisation that compounds. I
            don&rsquo;t pretend the breadth was a strategy from day one. It was a chase that turned
            into a pattern.
          </p>

          <div className="pull">
            The event behind the event is knowledge. The object behind the object is infinity. The
            person behind the person is love.
            <span className="src">Māyā &amp; Brahman · the vault</span>
          </div>
          <p>
            The professional translation is exact. The number behind the number is the reason. The
            CRM record behind the CRM record is the context.{" "}
            <strong>Don&rsquo;t mistake the surface for the substance.</strong>
          </p>
        </div>
      </div>

      {/* 02 · the scars */}
      <div className="entry">
        <div className="rail">
          <span className="no">02</span>
          The credential
          <span className="mnote">
            The scar is the credential. Twenty-two with this much wreckage behind it is the point,
            not the liability.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">What I&rsquo;ve built and broken</h2>
          <ol className="idx" style={{ marginTop: 20, borderTop: "1px solid var(--rule)" }}>
            {trackRecord.map((line) => (
              <li key={line}>
                <div className="row">
                  <span style={{ fontSize: 16.5, lineHeight: 1.6, color: "var(--masi-soft)" }}>{line}</span>
                </div>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 18, color: "var(--masi)" }}>
            The constant has been learning and evolving in public, and getting more honest each time
            about what actually creates an advantage.
          </p>
        </div>
      </div>

      {/* 03 · where I work */}
      <div className="entry">
        <div className="rail">
          <span className="no">03</span>
          Where I work
          <span className="mnote">
            Stated plainly, including what I don&rsquo;t hold. Ambiguity about equity helps nobody.
          </span>
        </div>
        <div className="col">
          <h2 className="t-h2">Three seats, one act</h2>
          {roles.map((r, i) => (
            <div
              key={r.org}
              style={{ padding: "20px 0", borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="t-h3">{r.org}</h3>
                <span className="meta">{r.role}</span>
              </div>
              <p style={{ marginTop: 7, fontSize: 15.5, lineHeight: 1.65 }}>{r.body}</p>
              {r.note && (
                <p className="meta-sent" style={{ marginTop: 6 }}>
                  {r.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 04 · the ask */}
      <div className="entry" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="rail">
          <span className="no">04</span>
          Reach me
          <span className="mnote">One statement per page. This is the one.</span>
        </div>
        <div className="col">
          <div className="on-pravala">
            <p
              style={{
                fontSize: "clamp(21px,2.8vw,28px)",
                fontWeight: 300,
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
                color: "#FFF6EE",
              }}
            >
              If you&rsquo;re sitting on one of those messy, hard-to-define problems — I enjoy
              working through that discomfort with you.
            </p>
          </div>

          <p className="meta-sent" style={{ marginTop: 20, lineHeight: 2.2 }}>
            <a href="mailto:akshay@fastrbuild.com" className="link">
              akshay@fastrbuild.com
            </a>
            <br />
            <a href="https://x.com/AkshayExplores" target="_blank" rel="noopener noreferrer" className="link">
              @AkshayExplores
            </a>
            <br />
            <a href="https://github.com/akshayexplores" target="_blank" rel="noopener noreferrer" className="link">
              github.com/akshayexplores
            </a>
            <br />
            <Link href="/kriya" className="link">
              What I&rsquo;m building right now
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
