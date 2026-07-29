/**
 * The capacity map.
 *
 * Every dot is one unit of written corpus. Dots are allocated to each subject
 * in proportion to how much has actually been written in it, then scattered
 * inside a brain outline within that subject's region. Denser region = more
 * written = more capacity claimed.
 *
 * Nothing here is hand-tuned per subject: weights come from the live content
 * in `content/insights`, so the map redraws itself every time the vault syncs.
 * If a subject goes quiet, its region visibly thins.
 */

export type Region = {
  subject: string
  pieces: number
  words: number
  share: number
  dots: [number, number][]
}

export const BRAIN_VIEWBOX = { w: 500, h: 430 }

/** Closed outline, also used as the point-in-polygon mask for scattering. */
const OUTLINE: [number, number][] = [
  [60,196],[64,166],[78,140],[100,120],[126,106],[150,96],[150,78],[168,62],[196,52],
  [226,50],[250,58],[272,48],[302,44],[330,50],[352,66],[366,88],[390,96],[412,112],
  [428,136],[436,164],[434,192],[444,214],[446,240],[436,264],[418,282],[420,300],
  [410,320],[392,332],[370,336],[360,352],[340,366],[316,372],[300,368],[286,374],
  [268,370],[258,364],[236,360],[212,362],[190,356],[170,344],[150,346],[128,338],
  [112,322],[104,302],[86,290],[70,270],[64,246],[70,224],
]

/**
 * Region centres, ordered front (left) → back (right) so the three movements
 * occupy anatomically coherent territory: Darśana frontal, Krama parietal,
 * Kriyā occipital. A subject with no seed falls back to the centroid.
 */
const SEEDS: Record<string, [number, number]> = {
  // Darśana — frontal
  "Marketing": [132, 168],
  "Entrepreneurship": [120, 250],
  "Leadership": [96, 205],
  "Life": [160, 222],
  "Self help": [178, 150],
  "Finance": [158, 290],
  // Krama — parietal / mid
  "Sales": [250, 140],
  "Data Science": [252, 232],
  "Design": [228, 300],
  "Communities": [296, 182],
  // Kriyā — occipital
  "Tech": [350, 150],
  "Artificial Intelligence": [330, 250],
  "Code": [378, 200],
  "Machine Learning": [402, 168],
  "Natural language Processing": [352, 310],
  "Natural Language Processing": [352, 310],
  "Video Production": [400, 258],
}

const FALLBACK: [number, number] = [250, 210]

/** Closed Catmull-Rom → cubic bezier, so the outline draws as curves not facets. */
function smooth(pts: [number, number][], t = 0.5): string {
  const n = pts.length
  const d = [`M${pts[0][0]},${pts[0][1]}`]
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * t
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * t
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * t
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * t
    d.push(`C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0]},${p2[1]}`)
  }
  return d.join(" ") + " Z"
}

export const BRAIN_PATH = smooth(OUTLINE)

export const SULCI = [
  "M104 150 C150 122 196 130 222 162",
  "M96 244 C144 268 190 258 222 232",
  "M252 74 C282 108 280 148 254 174",
  "M330 108 C372 132 376 176 346 202",
  "M186 196 C226 182 258 196 274 228",
  "M300 286 C338 274 368 288 384 314",
  "M366 88 C352 122 356 158 378 180",
]

function inPolygon(x: number, y: number): boolean {
  let inside = false
  const n = OUTLINE.length
  for (let i = 0; i < n; i++) {
    const [x1, y1] = OUTLINE[i]
    const [x2, y2] = OUTLINE[(i + 1) % n]
    if (y1 > y !== y2 > y && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) inside = !inside
  }
  return inside
}

/** Mulberry32 — small deterministic PRNG so server and client agree exactly. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const TOTAL_DOTS = 380

export function layoutBrain(
  input: { subject: string; pieces: number; words: number }[]
): Region[] {
  const totalWords = input.reduce((s, r) => s + r.words, 0) || 1

  const seedOf = (s: string): [number, number] => SEEDS[s] ?? FALLBACK
  const known = input.filter((r) => SEEDS[r.subject])

  const regions: Region[] = input.map((r) => ({
    subject: r.subject,
    pieces: r.pieces,
    words: r.words,
    share: r.words / totalWords,
    dots: [],
  }))

  const quota = new Map<string, number>(
    regions.map((r) => [r.subject, Math.max(5, Math.round(TOTAL_DOTS * r.share))])
  )
  const bySubject = new Map(regions.map((r) => [r.subject, r]))

  // Nearest-seed assignment gives each subject a Voronoi territory inside the
  // outline; rejection sampling with a minimum spacing keeps the stipple even.
  const nearest = (x: number, y: number): string => {
    let best = known[0]?.subject ?? input[0].subject
    let bestD = Infinity
    for (const r of known) {
      const [sx, sy] = seedOf(r.subject)
      const d = (sx - x) ** 2 + (sy - y) ** 2
      if (d < bestD) { bestD = d; best = r.subject }
    }
    return best
  }

  const rand = rng(11)
  let guard = 0
  const remaining = () => regions.some((r) => r.dots.length < (quota.get(r.subject) ?? 0))

  while (remaining() && guard < 400_000) {
    guard++
    const x = 55 + rand() * 395
    const y = 42 + rand() * 368
    if (!inPolygon(x, y)) continue
    const subject = nearest(x, y)
    const region = bySubject.get(subject)
    if (!region) continue
    if (region.dots.length >= (quota.get(subject) ?? 0)) continue
    let tooClose = false
    for (const [px, py] of region.dots) {
      if ((x - px) ** 2 + (y - py) ** 2 < 46) { tooClose = true; break }
    }
    if (tooClose) continue
    region.dots.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10])
  }

  return regions.sort((a, b) => b.words - a.words)
}
