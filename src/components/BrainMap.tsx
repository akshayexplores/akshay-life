"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  CEREBRUM_PATH, FISSURES, GYRI, VIEW, polygonPath, type Territory,
} from "@/lib/brain"
import { movement } from "@/data/movements"

const HUE: Record<string, string> = {
  darshana: "186,82,44",   // pravāla
  krama: "186,132,42",     // arka
  kriya: "36,50,82",       // nīla
}

export default function BrainMap({
  territories,
  totalPieces,
}: {
  territories: Territory[]
  totalPieces: number
}) {
  const [active, setActive] = useState<string | null>(null)
  const router = useRouter()
  const max = territories[0]?.share ?? 1
  const open = (s: string) => router.push(`/darshana?s=${encodeURIComponent(s)}`)

  const fillOf = (t: Territory) => {
    const base = 0.16 + (t.share / max) * 0.62
    return active === t.subject ? Math.min(0.96, base + 0.26) : base
  }
  const labelDark = (t: Territory) => t.share / max > 0.5 || t.movement === "kriya"

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label={`Capacity map of ${totalPieces} written pieces. Each territory's area is that domain's share of the corpus. Largest: ${territories[0]?.subject}.`}
      >
        <defs>
          <clipPath id="cerebrum">
            <path d={CEREBRUM_PATH} />
          </clipPath>
        </defs>

        <g clipPath="url(#cerebrum)">
          {territories.map((t) => (
            <path
              key={t.subject}
              d={polygonPath(t.polygon)}
              fill={`rgb(${HUE[t.movement]})`}
              fillOpacity={fillOf(t)}
              stroke="var(--bhurja)"
              strokeWidth="1.4"
              style={{ transition: "fill-opacity 0.2s var(--ease)", cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-label={`${t.subject}: ${t.pieces} ${t.pieces === 1 ? "piece" : "pieces"}, ${Math.round(t.share * 100)} percent of the corpus`}
              onMouseEnter={() => setActive(t.subject)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(t.subject)}
              onBlur={() => setActive(null)}
              onClick={() => open(t.subject)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(t.subject) }
              }}
            />
          ))}

          {GYRI.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--masi)" strokeOpacity="0.28"
                  strokeWidth="1.6" strokeLinecap="round" pointerEvents="none" />
          ))}
          {FISSURES.map((f, i) => (
            <path key={i} d={f.d} fill="none" stroke="var(--masi)" strokeOpacity={f.o}
                  strokeWidth={f.w} strokeLinecap="round" pointerEvents="none" />
          ))}
        </g>

        <path d={CEREBRUM_PATH} fill="none" stroke="var(--masi)" strokeOpacity="0.85"
              strokeWidth="2.6" strokeLinejoin="round" pointerEvents="none" />

        {territories
          .filter((t) => t.share >= 0.038)
          .map((t) => (
            <g key={t.subject} pointerEvents="none" fill={labelDark(t) ? "var(--bhurja)" : "var(--masi)"}>
              <text x={t.label[0]} y={t.label[1] - 1} textAnchor="middle"
                    className="font-mono" fontSize="9.5" letterSpacing="0.8">
                {t.short.toUpperCase()}
              </text>
              <text x={t.label[0]} y={t.label[1] + 10} textAnchor="middle"
                    className="font-mono" fontSize="9" fillOpacity="0.75">
                {Math.round(t.share * 100)}%
              </text>
            </g>
          ))}
      </svg>

      <figcaption style={{ marginTop: 16, borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
        <p className="meta-sent" style={{ maxWidth: "52ch" }}>
          Each territory is sized by how much I&rsquo;ve actually written in it — area <em>is</em>{" "}
          the number. Colour marks the movement it belongs to. Redrawn from the archive on every
          sync.
        </p>

        <ol className="cap-legend" style={{ marginTop: 14 }}>
          {territories.map((t) => {
            const on = active === t.subject
            return (
              <li key={t.subject}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(t.subject)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(t.subject)}
                  onBlur={() => setActive(null)}
                  onClick={() => open(t.subject)}
                  data-on={on ? "1" : undefined}
                  title={`${movement(t.movement).roman} · ${t.pieces} ${t.pieces === 1 ? "piece" : "pieces"}`}
                >
                  <span className="sw" style={{ background: `rgb(${HUE[t.movement]})`, opacity: 0.25 + (t.share / max) * 0.75 }} />
                  <span className="nm">{t.subject}</span>
                  <span className="pc">{Math.round(t.share * 100)}%</span>
                </button>
              </li>
            )
          })}
        </ol>

        <p className="meta" style={{ marginTop: 12 }}>
          <span style={{ color: "var(--pravala-deep)" }}>■</span> Darśana &nbsp;
          <span style={{ color: "var(--arka)" }}>■</span> Krama &nbsp;
          <span style={{ color: "var(--nila)" }}>■</span> Kriyā
        </p>
      </figcaption>
    </figure>
  )
}
