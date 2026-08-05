import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { pillarFor, type PillarId } from "@/data/pillars"

const CONTENT_DIR = path.join(process.cwd(), "content")

export type InsightMeta = {
  slug: string
  title: string
  /** Subject as synced from akshay-brain (frontmatter `category`). */
  subject: string
  pillar: PillarId
  type: string
  status: string
  date: string
  excerpt: string
  tags: string[]
  readingMinutes: number
}

export type Doc<T> = {
  meta: T
  content: string
}

function readDir(sub: string): string[] {
  const dir = path.join(CONTENT_DIR, sub)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
}

function estimateMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 225))
}

/** Newest first. Entries with no date sort last rather than first. */
function byDateDesc(a: { date: string; title: string }, b: { date: string; title: string }): number {
  if (a.date === b.date) return a.title.localeCompare(b.title)
  if (!a.date) return 1
  if (!b.date) return -1
  return a.date < b.date ? 1 : -1
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): InsightMeta {
  const subject = (data.category as string) ?? "Uncategorised"
  return {
    slug,
    title: (data.title as string) ?? slug,
    subject,
    pillar: pillarFor(subject),
    type: (data.type as string) ?? "insight",
    status: (data.status as string) ?? "draft",
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    readingMinutes: estimateMinutes(body),
  }
}

export function getAllInsights(): InsightMeta[] {
  return readDir("insights")
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "")
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "insights", file), "utf-8")
      const { data, content } = matter(raw)
      return toMeta(slug, data, content)
    })
    .sort(byDateDesc)
}

export function getInsight(slug: string): Doc<InsightMeta> | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(CONTENT_DIR, "insights", `${slug}${ext}`)
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8")
      const { data, content } = matter(raw)
      return { meta: toMeta(slug, data, content), content }
    }
  }
  return null
}

/* ─────────────────────────────────────────────
   Projects

   Bodies are Akshay's own writing, imported from the Coda
   "Master Projects DB". The card teaser is each piece's own
   opening line — no summary here is written by the site.

   The fallbacks below matter: one file still carries the older
   frontmatter shape (description/tags, no category/skills), and a
   missing field should degrade to a plain card, never to a crash.
   ───────────────────────────────────────────── */

export type ProjectMeta = {
  slug: string
  title: string
  client: string
  year: string
  date: string
  /** Primary skill, mapped through the same subject → pillar table as insights. */
  subject: string
  pillar: PillarId
  skills: string[]
  excerpt: string
  thumbnail: string
  status: string
  readingMinutes: number
}

function firstParagraph(body: string): string {
  const para = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith(">") && !p.startsWith("-"))
  return para ? para.replace(/\*\*/g, "").replace(/\s+/g, " ") : ""
}

function toProjectMeta(
  slug: string,
  data: Record<string, unknown>,
  body: string
): ProjectMeta {
  const skills =
    (data.skills as string[]) ?? (data.tags as string[]) ?? []
  const subject = (data.category as string) ?? skills[0] ?? "Uncategorised"

  return {
    slug,
    title: (data.title as string) ?? slug,
    client: (data.client as string) ?? "",
    year: (data.year as string) ?? "",
    date: (data.date as string) ?? "",
    subject,
    pillar: pillarFor(subject),
    skills,
    excerpt:
      (data.excerpt as string) ??
      (data.description as string) ??
      firstParagraph(body),
    thumbnail: (data.thumbnail as string) ?? "",
    status: (data.status as string) ?? "draft",
    readingMinutes: estimateMinutes(body),
  }
}

export function getAllProjects(): ProjectMeta[] {
  return readDir("projects")
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "")
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "projects", file), "utf-8")
      const { data, content } = matter(raw)
      return toProjectMeta(slug, data, content)
    })
    .sort(byDateDesc)
}

export function getProject(slug: string): Doc<ProjectMeta> | null {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(CONTENT_DIR, "projects", `${slug}${ext}`)
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8")
      const { data, content } = matter(raw)
      return { meta: toProjectMeta(slug, data, content), content }
    }
  }
  return null
}

/* ─────────────────────────────────────────────
   Minimal markdown renderer for trusted local content.
   Kept dependency-free on purpose: the content pipeline
   is ours end to end, so there is nothing to sanitise
   that we did not write.
   ───────────────────────────────────────────── */

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function inline(s: string): string {
  let out = escapeHtml(s)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy" />`)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, h) => `<a href="${h}">${t}</a>`)
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>")
  return out
}

type ListNode = { indent: number; text: string; children: ListNode[] }

function renderList(items: string[]): string {
  const root: ListNode[] = []
  const stack: { indent: number; items: ListNode[] }[] = [{ indent: -1, items: root }]

  for (const item of items) {
    const match = item.match(/^(\s*)[-*]\s+(.*)$/)
    const indent = match ? match[1].length : 0
    const text = match ? match[2] : item
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop()
    const node: ListNode = { indent, text, children: [] }
    stack[stack.length - 1].items.push(node)
    stack.push({ indent, items: node.children })
  }

  const build = (nodes: ListNode[]): string => {
    if (!nodes.length) return ""
    return `<ul>${nodes
      .map((n) => {
        const kids = build(n.children)
        return `<li>${inline(n.text)}${kids ? kids : ""}</li>`
      })
      .join("")}</ul>`
  }

  return build(root)
}

export function renderMarkdown(md: string, opts: { dropFirstH1?: boolean } = {}): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const html: string[] = []
  let para: string[] = []
  let list: string[] = []
  let inCode = false
  let codeLang = ""
  let codeLines: string[] = []
  let droppedH1 = false

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(" "))}</p>`)
      para = []
    }
  }
  const flushList = () => {
    if (list.length) {
      html.push(renderList(list))
      list = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith("```")) {
      if (inCode) {
        html.push(
          `<pre><code${codeLang ? ` class="language-${codeLang}"` : ""}>${escapeHtml(codeLines.join("\n"))}</code></pre>`
        )
        codeLines = []
        codeLang = ""
        inCode = false
      } else {
        flushPara()
        flushList()
        codeLang = trimmed.slice(3).trim()
        inCode = true
      }
      continue
    }
    if (inCode) {
      codeLines.push(line)
      continue
    }

    if (/^---+\s*$/.test(trimmed)) {
      flushPara()
      flushList()
      html.push("<hr />")
      continue
    }

    if (!trimmed) {
      flushPara()
      flushList()
      continue
    }

    if (line.startsWith("#### ")) {
      flushPara(); flushList()
      html.push(`<h4>${inline(line.slice(5))}</h4>`)
    } else if (line.startsWith("### ")) {
      flushPara(); flushList()
      html.push(`<h3>${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith("## ")) {
      flushPara(); flushList()
      html.push(`<h2>${inline(line.slice(3))}</h2>`)
    } else if (line.startsWith("# ")) {
      flushPara(); flushList()
      // The page already renders the title as <h1>; drop the duplicate.
      if (opts.dropFirstH1 && !droppedH1) {
        droppedH1 = true
      } else {
        html.push(`<h2>${inline(line.slice(2))}</h2>`)
      }
    } else if (/^\s*[-*]\s+/.test(line)) {
      flushPara()
      list.push(line)
    } else if (line.startsWith("> ")) {
      flushPara(); flushList()
      html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`)
    } else {
      flushList()
      para.push(trimmed)
    }
  }

  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`)
  }
  flushPara()
  flushList()

  return html.join("\n")
}
