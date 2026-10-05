/**
 * Three projects. Honest outcomes only.
 *
 * RULES ENFORCED IN THIS FILE:
 *  - No metric appears here unless Akshay supplied it. No estimates, no rounding up.
 *  - `outcome` states what actually happened, including when that is "shut down".
 *  - No client or third-party company is named here. Client work, funding and
 *    equity detail stay off the public site.
 */

export type Outcome = "shipped" | "shut-down" | "precursor" | "live" | "in-progress"

export type Project = {
  id: string
  title: string
  org: string
  /** One line. What it was. His words where supplied. */
  summary: string
  /** What actually happened. The honest part. */
  outcome: string
  outcomeKind: Outcome
  stack: string[]
  /** Stated plainly where it matters. Empty string = nothing to disclose. */
  relationship?: string
  featured?: boolean
}

export const outcomeLabel: Record<Outcome, string> = {
  "shipped": "Shipped",
  "shut-down": "Shut down",
  "precursor": "Precursor",
  "live": "Live",
  "in-progress": "In progress",
}

export const projects: Project[] = [
  {
    id: "buildr-base",
    title: "Buildr Base",
    org: "FastrBuild",
    summary: "A Coda-based operating system for FastrBuild's internal ops — visibility and coordination in one place.",
    outcome: "Runs the company day to day. No production code was written for it.",
    outcomeKind: "shipped",
    stack: ["Coda", "No-Code", "Systems Design"],
    featured: true,
  },
  {
    id: "dapp",
    title: "Dapp",
    org: "Self-built",
    summary: "A hyperlocal dating app for a closed college community, built on GlideApps.",
    outcome: "100+ paying users. Shut down in month two — the unit economics did not work.",
    outcomeKind: "shut-down",
    stack: ["GlideApps", "No-Code", "Community"],
    featured: true,
  },
  {
    id: "fastrbuild-internal",
    title: "Internal Automation",
    org: "FastrBuild",
    summary: "N8N workflows covering the repeatable internal work — capture, follow-up, reporting, sync.",
    outcome: "Automated roughly 30% of internal work. Became the precursor to Vajra.",
    outcomeKind: "precursor",
    stack: ["N8N", "Automation", "Ops"],
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
