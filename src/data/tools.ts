export type Tool = { name: string; category: "Build" | "Grow" | "Manage" | "Create" }

export const tools: Tool[] = [
  { name: "Coda", category: "Build" },
  { name: "Claude", category: "Build" },
  { name: "n8n", category: "Build" },
  { name: "Framer", category: "Create" },
  { name: "Notion", category: "Manage" },
  { name: "Zoho CRM", category: "Grow" },
  { name: "Apollo.io", category: "Grow" },
  { name: "Kanbox", category: "Grow" },
  { name: "LinkedIn Sales Nav", category: "Grow" },
  { name: "Fathom", category: "Manage" },
  { name: "Superhuman", category: "Manage" },
  { name: "Loom", category: "Create" },
  { name: "Figma", category: "Create" },
  { name: "Canva", category: "Create" },
  { name: "Whimsical", category: "Create" },
  { name: "Zoho Books", category: "Manage" },
  { name: "Taplio", category: "Grow" },
  { name: "Spline", category: "Create" },
  { name: "Vercel", category: "Build" },
  { name: "GitHub", category: "Build" },
  { name: "Cursor", category: "Build" },
  { name: "Perplexity", category: "Manage" },
  { name: "Cal.com", category: "Manage" },
]

export const toolCategories = ["All", "Build", "Grow", "Manage", "Create"] as const
