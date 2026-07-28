/**
 * Darśana → Krama → Kriyā
 *
 * Per the Krama field manual v2, §03: "Not 'pillars.' Movements — because they
 * run in sequence, and krama means sequence. Use as site sections, service
 * stages, and content categories simultaneously."
 */

export type MovementId = "darshana" | "krama" | "kriya"

export type Movement = {
  id: MovementId
  devanagari: string
  roman: string
  gloss: string
  heading: string
  body: string
  mapsTo: string
}

export const movements: Movement[] = [
  {
    id: "darshana",
    devanagari: "दर्शन",
    roman: "Darśana",
    gloss: "seeing",
    heading: "Look beneath until the real shape appears",
    body: "Not analysis for its own sake. Seeing what the dashboard cannot explain, and refusing to accept the first explanation offered.",
    mapsTo: "diagnosis · discovery · the audit before the plan · positioning · “why is this actually happening?”",
  },
  {
    id: "krama",
    devanagari: "क्रम",
    roman: "Krama",
    gloss: "order",
    heading: "Put the pattern in the right sequence",
    body: "Compression — from a flood of raw detail down to a small set of recurring shapes, then a template you can hand to someone else.",
    mapsTo: "frameworks · process design · CRM architecture · sequencing · the template pulled from the first real attempt",
  },
  {
    id: "kriya",
    devanagari: "क्रिया",
    roman: "Kriyā",
    gloss: "action",
    heading: "Build it so it runs without you in the room",
    body: "Sequence that isn’t built is philosophy. Service first, product later, but always product eventually.",
    mapsTo: "shipping · automation · the system that outlasts the engagement",
  },
]

/**
 * Subject (frontmatter `category`, synced from akshay-brain) → movement.
 *
 * Editorial mapping, derived from the "maps to" line of each movement in the
 * field manual. Current distribution across the 29 synced pieces:
 * Darśana 12 · Krama 7 · Kriyā 10.
 */
export const subjectToMovement: Record<string, MovementId> = {
  // Darśana — diagnosis, positioning, the why underneath
  "Marketing": "darshana",
  "Entrepreneurship": "darshana",
  "Finance": "darshana",
  "Leadership": "darshana",
  "Life": "darshana",
  "Self help": "darshana",

  // Krama — frameworks, sequencing, the template
  "Sales": "krama",
  "Data Science": "krama",
  "Design": "krama",
  "Communities": "krama",

  // Kriyā — shipping, automation, the system that outlasts
  "Tech": "kriya",
  "Code": "kriya",
  "Artificial Intelligence": "kriya",
  "Machine Learning": "kriya",
  "Natural language Processing": "kriya",
  "Natural Language Processing": "kriya",
  "Video Production": "kriya",
}

export const DEFAULT_MOVEMENT: MovementId = "darshana"

export function movementFor(subject: string): MovementId {
  return subjectToMovement[subject] ?? DEFAULT_MOVEMENT
}

export function movement(id: MovementId): Movement {
  return movements.find((m) => m.id === id) ?? movements[0]
}
