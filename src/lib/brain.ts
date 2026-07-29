/**
 * The capacity map — a cartogram of the cerebrum.
 *
 * Each subject gets a territory whose AREA is proportional to how much has
 * actually been written in it. That is the whole point: area is the quantity,
 * so the picture cannot flatter a domain that is thin.
 *
 * Territories are a power diagram (additively-weighted Voronoi). The weights
 * are solved at build time by iterating until each cell's share of the brain
 * matches its share of the corpus, so nothing here is hand-placed except the
 * anatomy and the seed points.
 *
 * Hue carries the movement (Darśana / Krama / Kriyā); tint depth carries the
 * same weight the area does, so the reading is reinforced rather than split.
 */

import type { MovementId } from "@/data/movements"

export const VIEW = { w: 580, h: 450 }

/** Lateral (left-facing) cerebrum. Also the clip mask for everything inside. */
export const CEREBRUM: [number, number][] = [
  [58,215],[60,178],[70,142],[90,112],[118,88],[154,70],[196,58],[240,52],[284,54],
  [326,64],[364,82],[396,106],[422,136],[438,170],[444,204],[442,232],[434,258],[418,278],
  [398,292],[374,300],[350,304],[332,316],[318,332],[300,344],[276,352],[250,354],[224,350],
  [200,340],[180,326],[166,308],[158,288],[150,272],[136,258],[118,246],[98,238],[76,230],
]

export const CEREBRUM_PATH =
  "M" + CEREBRUM.map(([x, y]) => `${x},${y}`).join(" L") + " Z"

/** The three landmark fissures, drawn heavier than the gyri. */
export const FISSURES = [
  { d: "M156 286 C196 266 244 250 296 242 C322 238 340 238 352 240", o: 0.55, w: 3.0 },
  { d: "M254 62 C266 104 280 150 296 210", o: 0.4, w: 2.2 },
  { d: "M418 132 C404 162 396 190 392 220", o: 0.34, w: 1.9 },
]

/** Cortical folds. Decoration — the only part of this drawing that is not data. */
export const GYRI = [
  "M78 168 C104 148 134 148 154 166","M70 200 C98 186 128 190 148 208",
  "M92 128 C120 108 152 108 174 126","M132 96 C160 78 192 78 214 94",
  "M182 74 C210 62 240 62 262 74","M170 148 C200 132 230 136 248 156",
  "M162 192 C192 178 220 184 240 202","M180 236 C210 224 236 230 254 248",
  "M108 232 C136 220 162 224 180 240","M276 62 C304 56 332 64 348 78",
  "M296 100 C324 88 352 94 370 110","M310 142 C338 130 366 136 384 152",
  "M320 186 C348 174 376 180 394 196","M326 228 C354 218 382 224 398 238",
  "M366 96 C392 108 412 128 422 150","M396 160 C418 176 430 196 434 216",
  "M310 268 C336 258 360 262 376 276","M196 296 C226 286 252 292 268 306",
  "M226 324 C252 316 276 320 292 332","M258 276 C284 266 308 270 322 282",
  "M100 186 C122 172 146 174 162 188","M148 118 C172 102 200 102 218 116",
  "M206 88 C230 76 256 78 274 90","M198 172 C224 158 250 162 266 180",
  "M212 218 C238 206 262 212 278 228","M132 250 C158 240 180 244 196 258",
  "M300 78 C326 70 350 78 364 92","M320 118 C346 108 372 114 388 130",
  "M334 164 C360 154 386 160 402 174","M342 206 C368 196 392 202 408 216",
  "M286 250 C310 242 332 246 346 258","M232 262 C256 252 278 256 292 268",
  "M170 268 C194 258 216 262 232 274","M254 306 C278 298 300 302 314 314",
  "M290 288 C314 280 336 284 350 294","M382 128 C404 142 418 160 424 178",
  "M406 194 C424 208 434 224 436 238","M88 154 C110 140 134 140 150 152",
]

/**
 * Seeds, laid out so each movement holds anatomically coherent ground:
 * Darśana frontal, Krama parietal and superior-temporal, Kriyā occipital.
 * These set *where* a domain sits. The solver sets how much room it gets.
 */
const SEEDS: Record<string, [number, number]> = {
  "Marketing": [126,168], "Entrepreneurship": [118,244], "Leadership": [80,206],
  "Life": [176,214], "Self help": [180,126], "Finance": [206,278],
  "Sales": [258,140], "Data Science": [262,232], "Design": [236,312], "Communities": [310,104],
  "Tech": [352,168], "Code": [392,132], "Machine Learning": [424,186],
  "Artificial Intelligence": [356,250], "Natural language Processing": [302,312],
  "Natural Language Processing": [302,312], "Video Production": [410,262],
}
const FALLBACK: [number, number] = [280, 200]

export const SHORT: Record<string, string> = {
  "Artificial Intelligence": "AI",
  "Natural language Processing": "NLP",
  "Natural Language Processing": "NLP",
  "Machine Learning": "ML",
  "Video Production": "Video",
  "Entrepreneurship": "Entrep.",
  "Data Science": "Data Sci.",
}

export type Territory = {
  subject: string
  short: string
  movement: MovementId
  pieces: number
  words: number
  share: number      // share of the corpus
  areaShare: number  // share of the brain actually achieved
  polygon: [number, number][]
  label: [number, number]
}

function inCerebrum(x: number, y: number): boolean {
  let inside = false
  const n = CEREBRUM.length
  for (let i = 0; i < n; i++) {
    const [x1, y1] = CEREBRUM[i]
    const [x2, y2] = CEREBRUM[(i + 1) % n]
    if (y1 === y2) continue
    if (y1 > y !== y2 > y && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) inside = !inside
  }
  return inside
}

/** Cell of the power diagram: argmin over |p-s|² - w. Bisectors stay linear. */
function powerCell(i: number, S: [number, number][], w: number[]): [number, number][] {
  let cell: [number, number][] = [
    [0, 0], [VIEW.w, 0], [VIEW.w, VIEW.h], [0, VIEW.h],
  ]
  const [six, siy] = S[i]
  for (let j = 0; j < S.length; j++) {
    if (j === i || !cell.length) continue
    const [sjx, sjy] = S[j]
    const ax = 2 * (sjx - six)
    const ay = 2 * (sjy - siy)
    const c = sjx * sjx + sjy * sjy - six * six - siy * siy - w[j] + w[i]
    const f = (p: [number, number]) => ax * p[0] + ay * p[1] - c
    const out: [number, number][] = []
    for (let k = 0; k < cell.length; k++) {
      const cur = cell[k]
      const prv = cell[(k - 1 + cell.length) % cell.length]
      const fc = f(cur), fp = f(prv)
      if (fc <= 0) {
        if (fp > 0) {
          const t = fp / (fp - fc)
          out.push([prv[0] + t * (cur[0] - prv[0]), prv[1] + t * (cur[1] - prv[1])])
        }
        out.push(cur)
      } else if (fp <= 0) {
        const t = fp / (fp - fc)
        out.push([prv[0] + t * (cur[0] - prv[0]), prv[1] + t * (cur[1] - prv[1])])
      }
    }
    cell = out
  }
  return cell
}

export function buildTerritories(
  input: { subject: string; pieces: number; words: number; movement: MovementId }[]
): Territory[] {
  const rows = input.filter((r) => r.words > 0)
  if (!rows.length) return []

  const total = rows.reduce((s, r) => s + r.words, 0)
  const target = rows.map((r) => r.words / total)
  const S: [number, number][] = rows.map((r) => SEEDS[r.subject] ?? FALLBACK)

  // Sample the cerebrum once; the solver only re-assigns these points.
  const step = 3
  const px: number[] = []
  const py: number[] = []
  for (let y = 0; y < VIEW.h; y += step) {
    for (let x = 0; x < VIEW.w; x += step) {
      if (inCerebrum(x, y)) { px.push(x); py.push(y) }
    }
  }
  const N = px.length

  const w = new Array(rows.length).fill(0)
  const frac = new Array(rows.length).fill(0)

  for (let iter = 0; iter < 260; iter++) {
    const count = new Array(rows.length).fill(0)
    for (let p = 0; p < N; p++) {
      let best = 0
      let bd = Infinity
      for (let i = 0; i < S.length; i++) {
        const dx = px[p] - S[i][0]
        const dy = py[p] - S[i][1]
        const d = dx * dx + dy * dy - w[i]
        if (d < bd) { bd = d; best = i }
      }
      count[best]++
    }
    let maxErr = 0
    for (let i = 0; i < rows.length; i++) {
      frac[i] = count[i] / N
      const e = target[i] - frac[i]
      w[i] += e * 7000
      maxErr = Math.max(maxErr, Math.abs(e))
    }
    if (maxErr < 0.0012) break
  }

  // Label anchors: centroid of the points each territory actually holds.
  const sx = new Array(rows.length).fill(0)
  const sy = new Array(rows.length).fill(0)
  const cn = new Array(rows.length).fill(0)
  for (let p = 0; p < N; p++) {
    let best = 0, bd = Infinity
    for (let i = 0; i < S.length; i++) {
      const dx = px[p] - S[i][0]
      const dy = py[p] - S[i][1]
      const d = dx * dx + dy * dy - w[i]
      if (d < bd) { bd = d; best = i }
    }
    sx[best] += px[p]; sy[best] += py[p]; cn[best]++
  }

  return rows
    .map((r, i) => ({
      subject: r.subject,
      short: SHORT[r.subject] ?? r.subject,
      movement: r.movement,
      pieces: r.pieces,
      words: r.words,
      share: target[i],
      areaShare: frac[i],
      polygon: powerCell(i, S, w),
      label: (cn[i] ? [sx[i] / cn[i], sy[i] / cn[i]] : S[i]) as [number, number],
    }))
    .sort((a, b) => b.share - a.share)
}

export function polygonPath(poly: [number, number][]): string {
  if (!poly.length) return ""
  return "M" + poly.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " Z"
}
