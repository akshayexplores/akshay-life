"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { BRAIN_PATH, BRAIN_VIEWBOX, SULCI, type Region } from "@/lib/brain"

/**
 * Plate: the capacity map.
 *
 * One dot = one unit of written corpus. Hover or focus a region to read what
 * it is. Click to open that subject in the archive.
 */
export default function BrainMap({
  regions,
  totalPieces,
}: {
  regions: Region[]
  totalPieces: number
}) {
  const [active, setActive] = useState<string | null>(null)
  const router = useRouter()

  const shown = active ? regions.find((r) => r.subject === active) : null
  const lead = regions[0]

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${BRAIN_VIEWBOX.w} ${BRAIN_VIEWBOX.h}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        role="img"
        aria-label={`Capacity map: ${totalPieces} pieces across ${regions.length} subjects. Densest region is ${lead?.subject}.`}
      >
        <path d={BRAIN_PATH} fill="none" stroke="var(--masi)" strokeOpacity="0.3" strokeWidth="1.1" />
        {SULCI.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="var(--masi)" strokeOpacity="0.11" strokeWidth="1" />
        ))}

        {regions.map((r) => {
          const on = active === r.subject
          return (
            <g
              key={r.subject}
              tabIndex={0}
              role="button"
              aria-label={`${r.subject}: ${r.pieces} ${r.pieces === 1 ? "piece" : "pieces"}, ${Math.round(r.share * 100)}% of the corpus`}
              onMouseEnter={() => setActive(r.subject)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(r.subject)}
              onBlur={() => setActive(null)}
              onClick={() => router.push(`/darshana?s=${encodeURIComponent(r.subject)}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  router.push(`/darshana?s=${encodeURIComponent(r.subject)}`)
                }
              }}
              style={{ cursor: "pointer", outline: "none" }}
            >
              {r.dots.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={on ? 2.1 : 1.6}
                  fill={on ? "var(--pravala)" : "var(--masi)"}
                  fillOpacity={on ? 0.95 : 0.44}
                  style={{ transition: "r 0.2s var(--ease), fill-opacity 0.2s var(--ease)" }}
                />
              ))}
            </g>
          )
        })}
      </svg>

      <figcaption style={{ marginTop: 18, borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
        {shown ? (
          <p className="meta" style={{ color: "var(--pravala-deep)" }}>
            {shown.subject} &nbsp;·&nbsp; {shown.pieces} {shown.pieces === 1 ? "piece" : "pieces"}{" "}
            &nbsp;·&nbsp; {Math.round(shown.share * 100)}% of what I&rsquo;ve written
          </p>
        ) : (
          <p className="meta">
            {totalPieces} pieces &nbsp;·&nbsp; {regions.length} domains &nbsp;·&nbsp; densest:{" "}
            {lead?.subject}
          </p>
        )}
        <p className="meta-sent" style={{ marginTop: 6, maxWidth: "46ch" }}>
          One dot is one unit of what I&rsquo;ve actually written. Denser means more time spent
          there. Redrawn from the archive on every sync — hover a region, or click to read it.
        </p>
      </figcaption>
    </figure>
  )
}
