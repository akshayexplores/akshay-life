/**
 * Long-form project write-ups.
 *
 * The /krama list is still driven by getProjects() in src/lib/sources.ts —
 * that contract is unchanged. This adds the *body* of a project, keyed on
 * the same `id`, so a row can open into the full piece.
 *
 * Two sources on purpose: the row is a summary with an outcome attached and
 * has to stay short; the body is Akshay's own long-form writing, imported
 * from the Coda "Master Projects DB". A project with no file here is simply
 * not clickable — nothing breaks, it just doesn't open.
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"

const DIR = path.join(process.cwd(), "content", "projects")

export type ProjectBody = {
  id: string
  title: string
  client: string
  category: string
  skills: string[]
  date: string
  excerpt: string
  content: string
  words: number
  readingMinutes: number
}

function read(id: string): { data: Record<string, unknown>; content: string } | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(DIR, `${id}${ext}`)
    if (fs.existsSync(file)) {
      return matter(fs.readFileSync(file, "utf-8"))
    }
  }
  return null
}

export function getProjectBody(id: string): ProjectBody | null {
  const parsed = read(id)
  if (!parsed) return null

  const { data, content } = parsed
  const words = content.trim().split(/\s+/).filter(Boolean).length

  return {
    id,
    title: (data.title as string) ?? id,
    client: (data.client as string) ?? "",
    category: (data.category as string) ?? "",
    skills: (data.skills as string[]) ?? [],
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    content,
    words,
    readingMinutes: Math.max(1, Math.round(words / 225)),
  }
}

/** Ids that have a write-up on disk. Used to decide what is clickable. */
export function projectIdsWithBody(): Set<string> {
  if (!fs.existsSync(DIR)) return new Set()
  return new Set(
    fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.mdx?$/, ""))
  )
}
