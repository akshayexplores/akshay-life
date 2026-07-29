"use client"

/**
 * The dot cluster beside "I look for patterns".
 *
 * Nine dots drifting on their own slow cycles. Read as scattered detail that
 * keeps almost-resolving into an arrangement — which is the sentence it sits
 * next to. Frozen under prefers-reduced-motion.
 */
const DOTS = [
  [10, 12], [22, 7], [34, 13], [16, 22], [28, 24],
  [40, 20], [12, 33], [25, 36], [37, 32],
]

export default function PatternDots() {
  return (
    <svg
      className="pattern-dots"
      viewBox="0 0 50 44"
      width="46"
      height="40"
      aria-hidden="true"
    >
      <ellipse cx="25" cy="22" rx="23" ry="19" fill="none"
               stroke="var(--pravala)" strokeOpacity="0.45" strokeWidth="1.2" />
      {DOTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="2"
          fill="var(--pravala)"
          style={{ animationDelay: `${(i % 5) * 0.44}s`, transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  )
}
