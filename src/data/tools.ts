export type ToolCategory =
  | "Automation"
  | "CRM"
  | "No-Code"
  | "Dev"
  | "Productivity"
  | "Marketing"
  | "Design"
  | "AI"

export type Tool = {
  name: string
  category: ToolCategory
  /** One line. Why it is actually in the stack — not what the vendor says it does. */
  why: string
}

export const toolCategories: ToolCategory[] = [
  "Automation",
  "CRM",
  "No-Code",
  "Dev",
  "Productivity",
  "Marketing",
  "Design",
  "AI",
]

export const tools: Tool[] = [
  // ── Automation ──────────────────────────────
  { name: "N8N", category: "Automation", why: "Self-hosted, so the workflows that run the business are not renting their existence from a vendor." },
  { name: "Make", category: "Automation", why: "For the quick connective work that does not justify standing up an N8N flow." },

  // ── CRM ───────────────────────────────────
  { name: "Zoho CRM", category: "CRM", why: "Rebuilt it three times for three companies. The rebuild is the value, not the tool." },

  // ── No-Code ───────────────────────────────
  { name: "Coda", category: "No-Code", why: "Where an operating system gets prototyped before anyone argues about whether to build it." },
  { name: "GlideApps", category: "No-Code", why: "Ships a working mobile app in a weekend, which is the only honest way to test an app idea." },
  { name: "Airtable", category: "No-Code", why: "When the thing is really a database and pretending otherwise costs time." },

  // ── Dev ───────────────────────────────────
  { name: "Next.js", category: "Dev", why: "This site runs on it. Server components keep the content pipeline on the server where it belongs." },
  { name: "TypeScript", category: "Dev", why: "Catches the mistakes I make at 1am, before they reach a build." },
  { name: "Tailwind", category: "Dev", why: "Removes the naming argument entirely. There is no CSS file to bikeshed." },
  { name: "Framer Motion", category: "Dev", why: "Motion that respects prefers-reduced-motion without extra work." },
  { name: "Supabase", category: "Dev", why: "Postgres with auth attached, so a prototype does not need a backend hire." },
  { name: "Vercel", category: "Dev", why: "Push to main, it is live. Preview URLs make review a link instead of a meeting." },
  { name: "GitHub", category: "Dev", why: "Version control for code, and increasingly for writing too." },

  // ── Productivity ────────────────────────────
  { name: "Notion", category: "Productivity", why: "Client-facing docs and shared wikis. Everyone already knows how to read it." },
  { name: "Obsidian", category: "Productivity", why: "Plain markdown on disk. The notes outlive whatever app I use next." },
  { name: "Zoho Books", category: "Productivity", why: "Invoices and receivables. Unglamorous and load-bearing." },

  // ── Marketing ──────────────────────────────
  { name: "Apollo.io", category: "Marketing", why: "ICP filtering. Most of the work is deciding who not to contact." },
  { name: "LinkedIn Sales Navigator", category: "Marketing", why: "Where B2B intent is actually visible, if you read it instead of blasting it." },

  // ── Design ────────────────────────────────
  { name: "Figma", category: "Design", why: "Design systems and the handoff. Also the fastest way to end a layout argument." },
  { name: "Canva", category: "Design", why: "For the collateral that needs to exist today and does not need to be precious." },
  { name: "Remotion", category: "Design", why: "Video as React components — so a change is a diff, not a re-render in an editor." },

  // ── AI ────────────────────────────────────
  { name: "Claude", category: "AI", why: "Long-context reasoning over real documents. MCP connects it to the tools above." },
  { name: "ChatGPT", category: "AI", why: "Second opinion. Different failure modes are useful when the stakes are real." },
]
