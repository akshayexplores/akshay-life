"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import {
  CEREBELLUM_PATH, CEREBRUM_PATH, FOLIA, STEM_PATH, VIEW,
  foldPaths, leaderLabels, rayPaths, type Territory,
} from "@/lib/brain"

const HUE: Record<string, string> = {
  darshana: "192,86,47",   // pravāla
  krama: "192,138,46",     // arka
  kriya: "31,42,68",       // nīla
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

  const folds = useMemo(() => foldPaths(), [])
  const rays = useMemo(() => rayPaths(), [])
  const leaders = useMemo(() => leaderLabels(territories, VIEW), [territories])

  const max = territories[0]?.share ?? 1
  const open = (s: string) => router.push(`/darshana?s=${encodeURIComponent(s)}`)

  const fillOf = (t: Territory) => {
    const base = 0.2 + (t.share / max) * 0.5
    if (!active) return base
    return active === t.subject ? Math.min(0.94, base + 0.24) : base * 0.4
  }

  const bind = (subject: string) => ({
    onMouseEnter: () => setActive(subject),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(subject),
    onBlur: () => setActive(null),
    onClick: () => open(subject),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(subject) }
    },
  })

  // The plate builds in sequence: outline, folds, territories largest-first,
  // then the labels draw out. Timings live in motion.css; the order is here.
  const FOLD_START = 0.35
  const TERR_START = 0.75
  const LEAD_START = 1.15

  return (
    <figure className="plate" style={{ margin: 0 }}>
      <svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label={`Capacity map of ${totalPieces} written pieces across ${territories.length} domains. Each territory's area is that domain's share of the corpus. Largest: ${territories[0]?.subject}.`}
      >
        <defs>
          <clipPath id="cortex"><path d={CEREBRUM_PATH} /></clipPath>
        </defs>

        <g className="rays" aria-hidden="true">
          {rays.map((r, i) => (
            <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                  stroke="var(--pravala)" strokeWidth="2" strokeLinecap="round"
                  strokeDasharray="6 5" style={{ animationDelay: `${(i % 12) * 0.32}s` }} />
          ))}
        </g>

        <path d={CEREBELLUM_PATH} fill="var(--bhurja-2)" stroke="var(--masi)" strokeWidth="2.6" strokeOpacity="0.9" />
        {FOLIA.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--masi)" strokeOpacity="0.4" strokeWidth="1.5" />
        ))}
        <path d={STEM_PATH} fill="var(--bhurja-2)" stroke="var(--masi)" strokeWidth="2.6" strokeOpacity="0.9" />
        <path d={CEREBRUM_PATH} fill="var(--bhurja)" />

        <g clipPath="url(#cortex)">
          {territories.map((t, i) => (
            <path
              key={t.subject}
              className="terr"
              d={t.path}
              fill={`rgb(${HUE[t.movement]})`}
              fillOpacity={fillOf(t)}
              stroke="var(--bhurja)" strokeWidth="1.6" strokeOpacity="0.9"
              style={{
                transition: "fill-opacity 0.22s var(--ease)",
                cursor: "pointer",
                animationDelay: `${TERR_START + i * 0.03}s`,
              }}
              tabIndex={-1}
              aria-hidden="true"
              {...bind(t.subject)}
            />
          ))}
          {folds.map((d, i) => (
            <path key={i} className="fold" d={d} pathLength={1} fill="none"
                  stroke="var(--masi)" strokeOpacity="0.4"
                  strokeWidth="2" strokeLinecap="round" pointerEvents="none"
                  style={{ animationDelay: `${FOLD_START + (i % 10) * 0.03}s` }} />
          ))}
        </g>

        <path className="cortex-line" d={CEREBRUM_PATH} pathLength={1} fill="none"
              stroke="var(--masi)" strokeWidth="3"
              strokeOpacity="0.92" strokeLinejoin="round" pointerEvents="none" />

        {/* every domain labelled, name and value in two aligned columns */}
        {leaders.map((l, i) => {
          const on = active === l.subject
          const dim = active && !on
          const end = l.points.split(" ").slice(-1)[0].split(",")
          const delay = `${LEAD_START + i * 0.04}s`
          return (
            <g
              key={l.subject}
              className="leader"
              data-on={on ? "1" : undefined}
              opacity={dim ? 0.32 : 1}
              tabIndex={0}
              role="button"
              aria-label={`${l.subject}: ${l.pieces} ${l.pieces === 1 ? "piece" : "pieces"}, ${Math.round(l.share * 100)} percent of the corpus`}
              style={{ cursor: "pointer" }}
              {...bind(l.subject)}
            >
              <polyline className="lead-line" points={l.points} pathLength={1} fill="none"
                        stroke={`rgb(${HUE[l.movement]})`}
                        strokeWidth={on ? 1.8 : 1.1} strokeOpacity={on ? 0.95 : 0.55}
                        style={{ animationDelay: delay }} />
              <circle className="lead-dot" cx={end[0]} cy={end[1]} r={on ? 3.4 : 2.4}
                      fill={`rgb(${HUE[l.movement]})`}
                      style={{ animationDelay: delay }} />
              <text
                className="lead-txt font-mono"
                x={l.tx} y={l.ty}
                textAnchor={l.side === "l" ? "start" : "end"}
                fontSize="13" letterSpacing="0.3"
                fill={on ? "var(--pravala-deep)" : "var(--masi)"}
                style={{ animationDelay: delay }}
              >
                {l.short}
              </text>
              <text
                className="lead-txt font-mono"
                x={l.vx} y={l.ty}
                textAnchor={l.side === "l" ? "end" : "start"}
                fontSize="13"
                fill={on ? "var(--pravala-deep)" : "var(--masi-faint)"}
                style={{ animationDelay: delay }}
              >
                {`${Math.round(l.share * 100)}%`}
              </text>
            </g>
          )
        })}
      </svg>

      <figcaption className="meta" style={{ marginTop: "var(--s4)", textAlign: "center" }}>
        {`${totalPieces} pieces · ${territories.length} domains · area = how much I’ve written`}
      </figcaption>
    </figure>
  )
}
