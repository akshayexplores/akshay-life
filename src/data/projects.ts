export type Project = {
  id: string
  title: string
  client: string
  description: string
  tags: string[]
  year: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "fastrbuild-ops",
    title: "Team & Ops Management Systems",
    client: "fastrBuild",
    description:
      "Built the internal operating system that runs FastrBuild — task management, client workflows, team accountability, all without production code.",
    tags: ["Coda", "No-Code", "Systems Design"],
    year: "2024",
    featured: true,
  },
  {
    id: "dapp",
    title: "Dapp",
    client: "Self-Built",
    description:
      "A hyperlocal, closed-community dating app. 100 paying users in month one. Shut down when the unit economics didn't work.",
    tags: ["Product", "Growth", "Community"],
    year: "2023",
    featured: true,
  },
  {
    id: "collectiveos",
    title: "CollectiveOS",
    client: "Self-Built",
    description:
      "A collective-based work ecosystem built entirely on Coda. Full MVP. Zero lines of production code.",
    tags: ["No-Code", "Coda", "Product"],
    year: "2023",
  },
  {
    id: "soffit-thought-leadership",
    title: "Thought Leadership Build",
    client: "Soffit",
    description:
      "Positioned Soffit as a credible voice in cybersecurity through systematic content and relationship architecture.",
    tags: ["Content", "Brand", "B2B"],
    year: "2024",
  },
  {
    id: "soffit-sales",
    title: "Relationship-Led Sales System",
    client: "Soffit",
    description:
      "Built sales funnels and systems grounded in relationship-first principles, replacing cold transactional outreach.",
    tags: ["Sales", "CRM", "Systems"],
    year: "2024",
  },
  {
    id: "atom11",
    title: "Events-Led Marketing Campaigns",
    client: "Atom11",
    description:
      "Designed and executed marketing campaigns across the US and APAC, using events as the primary demand generation lever.",
    tags: ["Marketing", "Events", "Growth"],
    year: "2024",
  },
  {
    id: "enterprise-pivot",
    title: "Automated Prospecting Engine",
    client: "Enterprise Pivot",
    description:
      "Built an automated prospecting and outreach engine that replaced hours of manual SDR work with systematic, triggered sequences.",
    tags: ["Automation", "Sales", "n8n"],
    year: "2024",
  },
  {
    id: "fastrbuild-n8n",
    title: "N8N Workflow Automations",
    client: "fastrBuild",
    description:
      "Automated the repeatable work — lead capture, follow-up sequences, reporting, CRM sync — so the team could focus on what only humans can do.",
    tags: ["n8n", "Automation", "Ops"],
    year: "2025",
  },
  {
    id: "speedlegal",
    title: "Fundraise & ABM Campaigns",
    client: "Speedlegal",
    description:
      "Designed and executed an account-based marketing strategy alongside a fundraise push, turning investor attention into pipeline.",
    tags: ["ABM", "Fundraise", "Marketing"],
    year: "2024",
  },
  {
    id: "grac-design",
    title: "UI & UX Design",
    client: "GRAC",
    description:
      "Comprehensive UI/UX design across the full GRAC product — from information architecture to final pixel.",
    tags: ["UI/UX", "Design", "Product"],
    year: "2024",
  },
  {
    id: "grac-fundraise",
    title: "Fundraise Support",
    client: "GRAC",
    description:
      "Supported GRAC's fundraise with materials, positioning narrative, and investor-readiness strategy.",
    tags: ["Fundraise", "Strategy", "Decks"],
    year: "2024",
  },
]
