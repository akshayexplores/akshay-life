export type Project = {
  id: string
  title: string
  client: string
  description: string
  tags: string[]
  year: string
  featured?: boolean
  /** Swap string → real image path once assets are ready, e.g. "/images/projects/fastrbuild-ops.jpg" */
  cover?: string | null
  /** Placeholder gradient until real cover is provided */
  coverGradient: string
}

export const projects: Project[] = [
  {
    id: "fastrbuild-ops",
    title: "Team & Ops Management Systems",
    client: "fastrBuild",
    description: "Built the internal operating system that runs FastrBuild — task management, client workflows, team accountability, all without production code.",
    tags: ["Coda", "No-Code", "Systems Design"],
    year: "2024",
    featured: true,
    cover: null,
    coverGradient: "linear-gradient(135deg, #1C1208 0%, #2A1C08 45%, #1A1510 100%)",
  },
  {
    id: "dapp",
    title: "Dapp",
    client: "Self-Built",
    description: "A hyperlocal, closed-community dating app. 100 paying users in month one. Shut down when the unit economics didn't work.",
    tags: ["Product", "Growth", "Community"],
    year: "2023",
    featured: true,
    cover: null,
    coverGradient: "linear-gradient(155deg, #0C1018 0%, #141E2A 55%, #0A0C12 100%)",
  },
  {
    id: "collectiveos",
    title: "CollectiveOS",
    client: "Self-Built",
    description: "A collective-based work ecosystem built entirely on Coda. Full MVP. Zero lines of production code.",
    tags: ["No-Code", "Coda", "Product"],
    year: "2023",
    cover: null,
    coverGradient: "linear-gradient(135deg, #0F1410 0%, #182015 55%, #0A0D0A 100%)",
  },
  {
    id: "soffit-thought-leadership",
    title: "Thought Leadership Build",
    client: "Soffit",
    description: "Positioned Soffit as a credible voice in cybersecurity through systematic content and relationship architecture.",
    tags: ["Content", "Brand", "B2B"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(150deg, #140C18 0%, #201028 55%, #0A0810 100%)",
  },
  {
    id: "soffit-sales",
    title: "Relationship-Led Sales System",
    client: "Soffit",
    description: "Built sales funnels and systems grounded in relationship-first principles, replacing cold transactional outreach.",
    tags: ["Sales", "CRM", "Systems"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(135deg, #181008 0%, #241808 55%, #120E08 100%)",
  },
  {
    id: "atom11",
    title: "Events-Led Marketing Campaigns",
    client: "Atom11",
    description: "Designed and executed marketing campaigns across the US and APAC, using events as the primary demand generation lever.",
    tags: ["Marketing", "Events", "Growth"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(155deg, #0A1018 0%, #102030 55%, #080C15 100%)",
  },
  {
    id: "enterprise-pivot",
    title: "Automated Prospecting Engine",
    client: "Enterprise Pivot",
    description: "Built an automated prospecting and outreach engine that replaced hours of manual SDR work with systematic, triggered sequences.",
    tags: ["Automation", "Sales", "n8n"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(135deg, #0C1410 0%, #141C10 55%, #0A0C08 100%)",
  },
  {
    id: "fastrbuild-n8n",
    title: "N8N Workflow Automations",
    client: "fastrBuild",
    description: "Automated the repeatable work — lead capture, follow-up sequences, reporting, CRM sync — so the team could focus on what only humans can do.",
    tags: ["n8n", "Automation", "Ops"],
    year: "2025",
    cover: null,
    coverGradient: "linear-gradient(150deg, #181008 0%, #281808 55%, #140E08 100%)",
  },
  {
    id: "speedlegal",
    title: "Fundraise & ABM Campaigns",
    client: "Speedlegal",
    description: "Designed and executed an account-based marketing strategy alongside a fundraise push, turning investor attention into pipeline.",
    tags: ["ABM", "Fundraise", "Marketing"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(135deg, #0C0C18 0%, #141430 55%, #0A0A12 100%)",
  },
  {
    id: "grac-design",
    title: "UI & UX Design",
    client: "GRAC",
    description: "Comprehensive UI/UX design across the full GRAC product — from information architecture to final pixel.",
    tags: ["UI/UX", "Design", "Product"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(155deg, #18100C 0%, #2A1808 55%, #120E0A 100%)",
  },
  {
    id: "grac-fundraise",
    title: "Fundraise Support",
    client: "GRAC",
    description: "Supported GRAC's fundraise with materials, positioning narrative, and investor-readiness strategy.",
    tags: ["Fundraise", "Strategy", "Decks"],
    year: "2024",
    cover: null,
    coverGradient: "linear-gradient(135deg, #100C18 0%, #180C28 55%, #0C0810 100%)",
  },
]
