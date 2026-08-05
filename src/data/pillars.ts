export type PillarId =
  | "ambiguity-archive"
  | "systems-that-survive"
  | "honest-ai"
  | "compounding-notes"
  | "founder-scars"

export type Pillar = {
  id: PillarId
  name: string
  blurb: string
}

export const pillars: Pillar[] = [
  {
    id: "ambiguity-archive",
    name: "The Ambiguity Archive",
    blurb: "Entering a messy space and finding the signal. Specific decisions, incomplete information, the call, the outcome.",
  },
  {
    id: "systems-that-survive",
    name: "Systems That Survive",
    blurb: "Mental models and frameworks that hold up under pressure. Watched work across multiple companies.",
  },
  {
    id: "honest-ai",
    name: "The Honest AI Playbook",
    blurb: "What actually works with AI in a real company. What is hype. What breaks at scale.",
  },
  {
    id: "compounding-notes",
    name: "The Compounding Notes",
    blurb: "Small optimizations that become big advantages. The boring stuff that matters.",
  },
  {
    id: "founder-scars",
    name: "Founder Scars",
    blurb: "Specific failures. The named breakage, the decision, the aftermath, the lesson.",
  },
]

/**
 * Subject → pillar.
 *
 * Two vocabularies feed this table and they do not match:
 *   - insights carry `category` synced from akshay-brain
 *   - projects carry `category` taken from the Coda "Skill" column
 *
 * Coda uses compound names ("Data Science & AI") where the vault uses
 * short ones ("Data Science"). Both spellings are mapped on purpose —
 * an unmapped subject does not error, it silently falls through to
 * DEFAULT_PILLAR, which is how four projects ended up in one bucket.
 */
export const subjectToPillar: Record<string, PillarId> = {
  "Artificial Intelligence": "honest-ai",
  "Machine Learning": "honest-ai",
  "Natural language Processing": "honest-ai",
  "Natural Language Processing": "honest-ai",
  "Data Science & AI": "honest-ai",

  "Code": "systems-that-survive",
  "Tech": "systems-that-survive",
  "Data Science": "systems-that-survive",
  "Design": "systems-that-survive",
  "Leadership": "systems-that-survive",
  "No-code & Vibe-coding": "systems-that-survive",

  "Sales": "ambiguity-archive",
  "Marketing": "ambiguity-archive",

  "Entrepreneurship": "founder-scars",
  "Finance": "founder-scars",
  "Finance & Operations": "founder-scars",

  "Communities": "compounding-notes",
  "Video Production": "compounding-notes",
  "Self help": "compounding-notes",
  "Life": "compounding-notes",
}

export const DEFAULT_PILLAR: PillarId = "systems-that-survive"

export function pillarFor(subject: string): PillarId {
  return subjectToPillar[subject] ?? DEFAULT_PILLAR
}

export function pillarName(id: PillarId): string {
  return pillars.find((p) => p.id === id)?.name ?? id
}
