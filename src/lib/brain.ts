/**
 * The capacity map — a cartogram of the cortex.
 *
 * Each subject holds a territory whose AREA is its share of everything
 * actually written. Area is the quantity, so the picture cannot flatter a
 * domain that is thin. Territories come from a power diagram (additively
 * weighted Voronoi) whose weights are solved at build time until each cell's
 * share of the brain matches its share of the corpus.
 *
 * The drawing itself — outline, folds, cerebellum, brainstem, rays — is
 * generated here too, so the whole plate is one deterministic function of
 * the content on disk.
 */

import type { MovementId } from "@/data/movements"

export const VIEW = { x: -70, y: -58, w: 720, h: 600 }

/* ── Anatomy ─────────────────────────────────────────────────
   The load-bearing feature is the notch at roughly (150,296): the frontal
   underside rises, then the temporal lobe hooks forward and down. Without
   that notch a lateral brain silhouette reads as a potato.                */
export const CEREBRUM: [number, number][] = [
  [72,232],[70,196],[76,162],[90,130],[112,104],[140,84],[172,68],[208,58],[246,52],
  [286,50],[324,54],[360,64],[392,80],[420,102],[442,128],[458,158],[466,190],[468,222],
  [462,252],[450,276],[432,294],[410,306],
  [392,316],[378,330],[360,338],[340,340],
  [322,344],[306,352],[288,358],[268,362],[246,362],[224,358],
  [204,350],[188,338],[176,322],[171,304],
  [162,302],[152,300],[143,294],
  [136,283],[126,272],[114,262],[100,254],[86,246],[76,240],
]

export const CEREBELLUM: [number, number][] = [
  [352,330],[374,318],[398,314],[420,318],[436,330],[442,348],[436,366],
  [420,378],[398,384],[376,382],[358,372],[348,356],[346,342],
]

export const STEM: [number, number][] = [
  [330,344],[342,346],[348,362],[352,382],[354,400],[350,412],[340,414],[334,404],
  [330,386],[326,364],
]

export const FOLIA = [0, 1, 2, 3, 4].map(
  (i) => `M${350 + i * 4} ${330 + i * 11} C378 ${318 + i * 11} 410 ${320 + i * 11} 434 ${334 + i * 9}`
)

/* ── Path helpers ───────────────────────────────────────── */

export function smooth(P: [number, number][], closed = true, t = 0.55): string {
  const n = P.length
  const d = [`M${P[0][0].toFixed(1)},${P[0][1].toFixed(1)}`]
  const last = closed ? n : n - 1
  for (let i = 0; i < last; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i % n], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n]
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * t
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * t
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * t
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * t
    d.push(`C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`)
  }
  return d.join(" ") + (closed ? " Z" : "")
}

export const CEREBRUM_PATH = smooth(CEREBRUM)
export const CEREBELLUM_PATH = smooth(CEREBELLUM)
export const STEM_PATH = smooth(STEM)

function inside(x: number, y: number, poly: [number, number][]): boolean {
  let c = false
  const n = poly.length
  for (let i = 0; i < n; i++) {
    const [x1, y1] = poly[i]
    const [x2, y2] = poly[(i + 1) % n]
    if (y1 === y2) continue
    if (y1 > y !== y2 > y && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) c = !c
  }
  return c
}

/** Mulberry32 — deterministic, so the plate is identical on every build. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ── Cortical folds ─────────────────────────────────────────────
   Sulci run as long wandering ridges, roughly parallel, breaking at the lobe
   edges. Concentric rings read as a fingerprint; meandering bands read as a
   cortex. Each band is sampled across the outline and emitted only where it
   falls inside, so the breaks happen where the anatomy says they should.  */
export function foldPaths(): string[] {
  const r = rng(5)
  const xs = CEREBRUM.map((p) => p[0])
  const ys = CEREBRUM.map((p) => p[1])
  const x0 = Math.min(...xs) - 4, x1 = Math.max(...xs) + 4
  const y0 = Math.min(...ys) - 4, y1 = Math.max(...ys) + 4
  const rows = 14
  const out: string[] = []

  for (let i = 0; i < rows; i++) {
    const base = y0 + ((y1 - y0) * (i + 0.5)) / rows + (r() - 0.5) * 9
    const ph = r() * 6.28, ph2 = r() * 6.28
    const a1 = 11 * (0.7 + r() * 0.7), a2 = 5 * (0.6 + r() * 0.8)
    const w1 = 58 * (0.78 + r() * 0.5), w2 = 25
    let run: [number, number][] = []
    for (let x = x0; x <= x1; x += 5) {
      const y = base + a1 * Math.sin((x / w1) * 6.283 + ph) + a2 * Math.sin((x / w2) * 6.283 + ph2)
      if (inside(x, y, CEREBRUM)) run.push([x, y])
      else { if (run.length > 4) out.push(smooth(run, false)); run = [] }
    }
    if (run.length > 4) out.push(smooth(run, false))
  }

  // Enclosed folds, to break the banding the way real gyri do.
  const r2 = rng(9)
  let tries = 0, made = 0
  while (made < 16 && tries < 4000) {
    tries++
    const cx = Math.min(...xs) + r2() * (Math.max(...xs) - Math.min(...xs))
    const cy = Math.min(...ys) + r2() * (Math.max(...ys) - Math.min(...ys))
    const rx = 11 + r2() * 11, ry = 7 + r2() * 7, rot = r2() * 3.14
    const pts: [number, number][] = []
    let ok = true
    for (let k = 0; k < 14; k++) {
      const a = (6.283 * k) / 14
      const px = cx + Math.cos(a) * rx * Math.cos(rot) - Math.sin(a) * ry * Math.sin(rot)
      const py = cy + Math.cos(a) * rx * Math.sin(rot) + Math.sin(a) * ry * Math.cos(rot)
      if (!inside(px, py, CEREBRUM)) { ok = false; break }
      pts.push([px, py])
    }
    if (ok) { out.push(smooth(pts, true)); made++ }
  }
  return out
}

/* ── Radiating dashes ──────────────────────────────────────── */
export type Ray = { x1: number; y1: number; x2: number; y2: number; len: number }

export function rayPaths(count = 48): Ray[] {
  const cx = CEREBRUM.reduce((s, p) => s + p[0], 0) / CEREBRUM.length
  const cy = CEREBRUM.reduce((s, p) => s + p[1], 0) / CEREBRUM.length
  const out: Ray[] = []
  for (let i = 0; i < count; i++) {
    const a = (6.283 * i) / count + 0.1
    let lo = 0, hi = 700
    for (let k = 0; k < 24; k++) {
      const m = (lo + hi) / 2
      if (inside(cx + Math.cos(a) * m, cy + Math.sin(a) * m, CEREBRUM)) lo = m
      else hi = m
    }
    const r0 = lo + 18 + (i % 3) * 6
    const r1 = r0 + 40 + ((i * 29) % 50)
    out.push({
      x1: +(cx + Math.cos(a) * r0).toFixed(1), y1: +(cy + Math.sin(a) * r0).toFixed(1),
      x2: +(cx + Math.cos(a) * r1).toFixed(1), y2: +(cy + Math.sin(a) * r1).toFixed(1),
      len: +(r1 - r0).toFixed(1),
    })
  }
  return out
}

/* ── Territories ────────────────────────────────────────────── */

/**
 * Where each domain sits. Position is editorial; size is not — the solver
 * decides that from the corpus. Subjects with no entry here get a distinct
 * fallback seed off the ring below, so a newly-synced subject never collapses
 * onto another one.
 */
const SEEDS: Record<string, [number, number]> = {
  // Darśana — frontal
  "Marketing": [126,168], "Entrepreneurship": [118,244], "Leadership": [80,206],
  "Life": [176,214], "Self help": [180,126], "Finance": [206,278], "Economics": [206,278],
  // Krama — parietal, superior temporal
  "Sales": [258,140], "Data Science": [262,232], "Design": [236,312], "Communities": [310,104],
  // Kriyā — occipital
  "Tech": [352,168], "Code": [392,132], "Python": [406,116], "Machine Learning": [424,186],
  "Computer Networks": [352,214], "Artificial Intelligence": [356,250],
  "Natural language Processing": [302,312], "Natural Language Processing": [302,312],
  "Video Production": [410,262],
}

/** Distinct fallback positions, so unmapped subjects still get their own ground. */
const FALLBACK_RING: [number, number][] = [
  [230,180],[300,200],[210,240],[330,170],[270,280],[200,300],[340,290],[150,240],
]

export const SHORT: Record<string, string> = {
  "Artificial Intelligence": "AI",
  "Natural language Processing": "NLP",
  "Natural Language Processing": "NLP",
  "Machine Learning": "ML",
  "Video Production": "Video",
  "Entrepreneurship": "Entrep.",
  "Data Science": "Data Sci.",
  "Computer Networks": "Networks",
}

export type Territory = {
  subject: string
  short: string
  movement: MovementId
  pieces: number
  words: number
  share: number
  areaShare: number
  path: string
  label: [number, number]
}

function powerCell(i: number, S: [number, number][], w: number[]): [number, number][] {
  let cell: [number, number][] = [[-80,-70],[560,-70],[560,470],[-80,470]]
  const [six, siy] = S[i]
  for (let j = 0; j < S.length; j++) {
    if (j === i || !cell.length) continue
    const [sjx, sjy] = S[j]
    const ax = 2 * (sjx - six), ay = 2 * (sjy - siy)
    const c = sjx*sjx + sjy*sjy - six*six - siy*siy - w[j] + w[i]
    const f = (p: [number, number]) => ax * p[0] + ay * p[1] - c
    const out: [number, number][] = []
    for (let k = 0; k < cell.length; k++) {
      const cur = cell[k], prv = cell[(k - 1 + cell.length) % cell.length]
      const fc = f(cur), fp = f(prv)
      if (fc <= 0) {
        if (fp > 0) { const t = fp / (fp - fc); out.push([prv[0] + t*(cur[0]-prv[0]), prv[1] + t*(cur[1]-prv[1])]) }
        out.push(cur)
      } else if (fp <= 0) {
        const t = fp / (fp - fc); out.push([prv[0] + t*(cur[0]-prv[0]), prv[1] + t*(cur[1]-prv[1])])
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

  let fb = 0
  const S: [number, number][] = rows.map((r) => {
    const s = SEEDS[r.subject]
    if (s) return s
    return FALLBACK_RING[fb++ % FALLBACK_RING.length]
  })

  const px: number[] = [], py: number[] = []
  for (let y = 0; y < 470; y += 3) {
    for (let x = 0; x < 560; x += 3) if (inside(x, y, CEREBRUM)) { px.push(x); py.push(y) }
  }
  const N = px.length
  const w = new Array(rows.length).fill(0)
  const frac = new Array(rows.length).fill(0)

  for (let iter = 0; iter < 260; iter++) {
    const count = new Array(rows.length).fill(0)
    for (let p = 0; p < N; p++) {
      let best = 0, bd = Infinity
      for (let i = 0; i < S.length; i++) {
        const dx = px[p] - S[i][0], dy = py[p] - S[i][1]
        const d = dx*dx + dy*dy - w[i]
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

  const sx = new Array(rows.length).fill(0)
  const sy = new Array(rows.length).fill(0)
  const cn = new Array(rows.length).fill(0)
  for (let p = 0; p < N; p++) {
    let best = 0, bd = Infinity
    for (let i = 0; i < S.length; i++) {
      const dx = px[p] - S[i][0], dy = py[p] - S[i][1]
      const d = dx*dx + dy*dy - w[i]
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
      path: "M" + powerCell(i, S, w).map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " Z",
      label: (cn[i] ? [sx[i] / cn[i], sy[i] / cn[i]] : S[i]) as [number, number],
    }))
    .sort((a, b) => b.share - a.share)
}
