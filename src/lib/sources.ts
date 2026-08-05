/**
 * Content sources.
 *
 * Everything the site renders should come from the vault, not from code.
 * Each loader looks for a synced JSON file under `content/` first and falls
 * back to the checked-in defaults, so the site keeps working before the vault
 * carries that file and upgrades itself the moment it does.
 *
 * Vault contract — akshay-brain must place these at `Site/<name>.json`:
 *   projects.json  Project[]
 *   tools.json     Tool[]
 *   kriya.json     { updated: string, entries: BuildEntry[] }
 */

import fs from "fs"
import path from "path"
import { projects as fallbackProjects, type Project } from "@/data/projects"
import { tools as fallbackTools, type Tool } from "@/data/tools"

const CONTENT = path.join(process.cwd(), "content")

function readJson<T>(name: string): T | null {
  try {
    const f = path.join(CONTENT, name)
    if (!fs.existsSync(f)) return null
    const parsed = JSON.parse(fs.readFileSync(f, "utf-8"))
    return parsed as T
  } catch {
    // A malformed synced file must never take the site down; fall back.
    return null
  }
}

export function getProjects(): { rows: Project[]; synced: boolean } {
  const synced = readJson<Project[]>("projects.json")
  if (Array.isArray(synced) && synced.length) return { rows: synced, synced: true }
  return { rows: fallbackProjects, synced: false }
}

export function getTools(): { rows: Tool[]; synced: boolean } {
  const synced = readJson<Tool[]>("tools.json")
  if (Array.isArray(synced) && synced.length) return { rows: synced, synced: true }
  return { rows: fallbackTools, synced: false }
}

export type BuildEntry = { label: string; title: string; body: string }

const FALLBACK_KRIYA: { updated: string; entries: BuildEntry[] } = {
  updated: "29 July 2026",
  entries: [
    {
      label: "OrgIntel",
      title: "Organisational memory as a living system",
      body: "Companies lose their memory as they scale — every rep who leaves takes the context with them. Pivoted from product-first to service-first, because the sequence has to be proven on real engagements before it becomes software.",
    },
    {
      label: "Vajra",
      title: "Taking an AI workspace to market",
      body: "Grew out of the internal automation at FastrBuild — the N8N workflows that took roughly 30% of the repeatable work off the team. The work now is go-to-market: who it is for, what it replaces, what someone would actually pay for.",
    },
    {
      label: "FastrBuild",
      title: "Building the agency into a system",
      body: "Relationship-led marketing, CRM pipeline design and automated outbound — run as a repeatable engine rather than a set of engagements that depend on me being in the room.",
    },
    {
      label: "Acsia · LiLA",
      title: "Product vision, GTM and investor readiness",
      body: "Consulting with Acsia Technologies on LiLA, their agentic AI platform for automotive software. Financial modelling, the investor narrative, and the sales engine behind it. Consultant, not an employee. No equity.",
    },
    {
      label: "akshay.life",
      title: "Publishing the archive",
      body: "The pieces here are distilled from a private vault and sync automatically. The next pass is bringing across the twelve essays still stranded on the old site.",
    },
  ],
}

export function getBuildLog(): { updated: string; entries: BuildEntry[]; synced: boolean } {
  const synced = readJson<{ updated: string; entries: BuildEntry[] }>("kriya.json")
  if (synced?.entries?.length) {
    return { updated: synced.updated ?? FALLBACK_KRIYA.updated, entries: synced.entries, synced: true }
  }
  return { ...FALLBACK_KRIYA, synced: false }
}
