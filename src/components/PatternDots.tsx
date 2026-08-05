"use client"

/**
 * The dot cluster above "I look for patterns".
 *
 * At rest the nine dots drift on their own slow cycles. Hover the statement
 * and they settle into a 3x3 grid, then scatter again on leave — the gesture
 * is the sentence it sits above.
 *
 * Each dot carries its own offset to its grid slot as a CSS variable, so the
 * arrangement is computed here and the motion lives in motion.css.
 */
const DOTS: [number, number][] = [
  [10, 12], [22, 7], [34, 13],
  [16, 22], [28, 24], [40, 20],
  [12, 33], [25, 36], [37, 32],
]

// The order they resolve into: three columns, three rows, centred.
const GRID: [number, number][] = [
  [13, 11], [25, 11], [37, 11],
  [13, 22], [25, 22], [37, 22],
  [13, 33], [25, 33], [37, 33],
]

export default function PatternDots() {
  return (
    <svg
      className="pattern-dots"
      viewBox="0 0 50 44"
      width="54"
      height="47"
      aria-hidden="true"
    >
      <ellipse cx="25" cy="22" rx="23" ry="19" fill="none"
               strokeOpacity="0.5" strokeWidth="1.2" />
      {DOTS.map(([x, y], i) => {
        const [gx, gy] = GRID[i]
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2"
            style={{
              animationDelay: `${(i % 5) * 0.44}s`,
              transformOrigin: `${x}px ${y}px`,
              // consumed by motion.css on hover
              ["--dx" as string]: `${gx - x}px`,
              ["--dy" as string]: `${gy - y}px`,
            }}
          />
        )
      })}
    </svg>
  )
}
