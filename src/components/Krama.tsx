"use client"

import { useMemo } from "react"

/**
 * KRAMA — क्रम — progress / sequence.
 *
 * A scanner passes over the title once every few seconds and a couple of
 * characters flicker as it goes. Deliberately restrained: it should read as
 * a signal being resolved, not as decoration.
 */
export default function Krama({
  text,
  className = "",
  as: Tag = "h1",
}: {
  text: string
  className?: string
  as?: "h1" | "h2" | "span"
}) {
  // Deterministic per-character flicker picks so server and client agree.
  const chars = useMemo(() => {
    const letters = text.split("")
    const flickerAt = new Set<number>()
    let acc = 0
    for (let i = 0; i < letters.length; i++) acc = (acc * 31 + letters[i].charCodeAt(0)) % 9973
    // two stable positions derived from the string itself
    const nonSpace = letters.map((c, i) => ({ c, i })).filter((x) => x.c.trim() !== "")
    if (nonSpace.length) {
      flickerAt.add(nonSpace[acc % nonSpace.length].i)
      flickerAt.add(nonSpace[(acc * 7 + 3) % nonSpace.length].i)
    }
    return letters.map((c, i) => ({ c, flicker: flickerAt.has(i) }))
  }, [text])

  return (
    <Tag className={`krama ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {chars.map(({ c, flicker }, i) => (
          <span
            key={i}
            className="krama-char"
            data-flicker={flicker ? "1" : undefined}
            style={flicker ? { animationDelay: `${(i % 5) * 0.37}s` } : undefined}
          >
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </Tag>
  )
}
