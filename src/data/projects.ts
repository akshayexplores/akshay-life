/**
 * Eleven projects. Honest outcomes only.
 *
 * RULES ENFORCED IN THIS FILE:
 *  - No metric appears here unless Akshay supplied it. No estimates, no rounding up.
 *  - `outcome` states what actually happened, including when that is "shut down".
 *  - `relationship` is stated plainly. Akshay holds no equity in Acsia, LiLA or GRAC.
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
    id: "collectiveos",
    title: "CollectiveOS / iCreate",
    org: "Self-built",
    summary: "A no-code operating system for freelance collectives, assembled from Coda and Typeform.",
    outcome: "Full working OS. Zero lines of production code.",
    outcomeKind: "shipped",
    stack: ["Coda", "Typeform", "No-Code"],
    featured: true,
  },
  {
    id: "atom11",
    title: "Events-Led Marketing",
    org: "Atom11",
    summary: "Events-led marketing, awards presence, and the messaging and decks behind them.",
    outcome: "Shipped. Events carried the demand generation, not paid channels.",
    outcomeKind: "shipped",
    stack: ["Events", "Messaging", "Decks"],
  },
  {
    id: "soffit",
    title: "Publishing & CRM Rebuild",
    org: "Soffit",
    summary: "A cybersecurity publishing programme, a Zoho CRM rebuild, and an IT Maturity Assessment as the entry point.",
    outcome: "Shipped. The assessment became the front door to the pipeline.",
    outcomeKind: "shipped",
    stack: ["Zoho CRM", "Content", "B2B"],
  },
  {
    id: "soffit-sales",
    title: "Relationship-Led Sales System",
    org: "Soffit",
    summary: "Relationship-led sales funnels on a rebuilt Zoho instance, with automated follow-ups behind them.",
    outcome: "Shipped. Follow-up stopped depending on someone remembering.",
    outcomeKind: "shipped",
    stack: ["Zoho CRM", "Automation", "Sales"],
  },
  {
    id: "enterprise-pivot",
    title: "Enterprise Pivot",
    org: "Client engagement",
    summary: "Automated prospecting into a Zoho CRM, with an Organizational Maturity Assessment as the hook.",
    outcome: "Shipped. The assessment did the qualifying before a human joined the call.",
    outcomeKind: "shipped",
    stack: ["Zoho CRM", "Automation", "Prospecting"],
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
  {
    id: "speedlegal",
    title: "Fundraise Narrative & ABM",
    org: "Speedlegal",
    summary: "The fundraise narrative, a LinkedIn ABM motion, and the newsletter that carried both.",
    outcome: "Newsletter reached ~1.5k subscribers. Product Hunt launch finished #2 for the day.",
    outcomeKind: "shipped",
    stack: ["ABM", "LinkedIn", "Newsletter"],
    featured: true,
  },
  {
    id: "grac-design",
    title: "UI/UX & Design System",
    org: "GRAC",
    summary: "A design system and the case study documenting it.",
    outcome: "In progress. Not finished, not shipped.",
    outcomeKind: "in-progress",
    stack: ["Design System", "UI/UX", "Figma"],
    relationship: "Advisory role. No equity held.",
  },
  {
    id: "grac-fundraise",
    title: "Fundraise Narrative",
    org: "GRAC",
    summary: "The real-time compliance operations narrative behind the raise.",
    outcome: "Live and unclosed. No round announced.",
    outcomeKind: "live",
    stack: ["Narrative", "Fundraise", "Positioning"],
    relationship: "Advisory role. No equity held.",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
