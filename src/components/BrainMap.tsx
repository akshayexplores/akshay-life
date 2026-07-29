"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import {
  CEREBELLUM_PATH, CEREBRUM_PATH, FOLIA, STEM_PATH, VIEW,
  foldPaths, rayPaths, type Territory,
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

  const max = territories[0]?.share ?? 1
  const shown = active ? territories.find((t) => t.subject === active) : null
  const open = (s: string) => router.push(`/darshana?s=${encodeURIComponent(s)}`)

  // Fills stay light so the ink folds keep the drawing — colour marks the
  // zone, the linework says "brain".
  const fillOf = (t: Territory) => {
    const base = 0.08 + (t.share / max) * 0.34
    return active === t.subject ? Math.min(0.62, base + 0.22) : base
  }

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        role="img"
        aria-label={`Capacity map of ${totalPieces} written pieces across ${territories.length} domains. Each territory's area is that domain's share of the corpus. Largest: ${territories[0]?.subject}.`}
      >
        <defs>
          <clipPath id="cortex"><path d={CEREBRUM_PATH} /></clipPath>
        </defs>

        {/* radiating dashes */}
        <g className="rays" aria-hidden="true">
          {rays.map((r, i) => (
            <line
              key={i}
              x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
              stroke="var(--pravala)" strokeWidth="2.2" strokeLinecap="round"
              strokeDasharray="7 6"
              style={{ animationDelay: `${(i % 12) * 0.32}s` }}
            />
          ))}
        </g>

        {/* cerebellum + brainstem */}
        <path d={CEREBELLUM_PATH} fill="var(--bhurja-2)" stroke="var(--masi)" strokeWidth="3" strokeOpacity="0.9" />
        {FOLIA.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--masi)" strokeOpacity="0.4" strokeWidth="1.7" />
        ))}
        <path d={STEM_PATH} fill="var(--bhurja-2)" stroke="var(--masi)" strokeWidth="3" strokeOpacity="0.9" />

        {/* cortex */}
        <path d={CEREBRUM_PATH} fill="var(--bhurja)" />

        <g clipPath="url(#cortex)">
          {territories.map((t) => (
            <path
              key={t.subject}
              d={t.path}
              fill={`rgb(${HUE[t.movement]})`}
              fillOpacity={fillOf(t)}
              style={{ transition: "fill-opacity 0.22s var(--ease)", cursor: "pointer" }}
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

          {folds.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="var(--masi)" strokeOpacity="0.58"
                  strokeWidth="2.4" strokeLinecap="round" pointerEvents="none" />
          ))}
        </g>

        <path d={CEREBRUM_PATH} fill="none" stroke="var(--masi)" strokeWidth="3.4"
              strokeOpacity="0.92" strokeLinejoin="round" pointerEvents="none" />

        {/* only the domains with room to hold a label */}
        {territories.filter((t) => t.share >= 0.055).map((t) => (
          <g key={t.subject} pointerEvents="none">
            <text x={t.label[0]} y={t.label[1] - 1} textAnchor="middle" className="font-mono"
                  fontSize="10" letterSpacing="0.8" fill="var(--masi)"
                  stroke="var(--bhurja)" strokeWidth="2.4" paintOrder="stroke">
              {t.short.toUpperCase()}
            </text>
            <text x={t.label[0]} y={t.label[1] + 11} textAnchor="middle" className="font-mono"
                  fontSize="9.5" fill="var(--pravala-deep)"
                  stroke="var(--bhurja)" strokeWidth="2.4" paintOrder="stroke">
              {Math.round(t.share * 100)}%
            </text>
          </g>
        ))}
      </svg>

      <figcaption style={{ marginTop: 14, borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
        <p className="meta" style={{ color: shown ? "var(--pravala-deep)" : undefined, minHeight: "1.9em" }}>
          {shown
            ? `${shown.subject} · ${shown.pieces} ${shown.pieces === 1 ? "piece" : "pieces"} · ${Math.round(shown.share * 100)}%`
            : `${totalPieces} pieces · ${territories.length} domains · area = how much I've written`}
        </p>
        <p className="meta" style={{ marginTop: 2 }}>
          <span style={{ color: "var(--pravala)" }}>■</span> Darśana{" "}
          <span style={{ color: "var(--arka)", marginLeft: 10 }}>■</span> Krama{" "}
          <span style={{ color: "var(--nila)", marginLeft: 10 }}>■</span> Kriyā
        </p>
      </figcaption>
    </figure>
  )
}
