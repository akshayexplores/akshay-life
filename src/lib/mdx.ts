import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content")

export type NoteMeta = {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
}

export type InsightMeta = {
  slug: string
  title: string
  category: string
  type: string
  status: string
  date: string
  excerpt: string
  tags: string[]
}

export type ProjectMeta = {
  id: string
  title: string
  client: string
  description: string
  tags: string[]
  year: string
  featured?: boolean
}

export type Doc<T> = {
  meta: T
  content: string
}

function readDir(sub: string): string[] {
  const dir = path.join(CONTENT_DIR, sub)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))
}

export function getAllNotes(): NoteMeta[] {
  return readDir("notes")
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "notes", file), "utf-8")
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        category: data.category ?? "Note",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
      } as NoteMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getNote(slug: string): Doc<NoteMeta> | null {
  const file = path.join(CONTENT_DIR, "notes", `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf-8")
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      category: data.category ?? "Note",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
    },
    content,
  }
}

export function getAllInsights(): InsightMeta[] {
  return readDir("insights")
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(CONTENT_DIR, "insights", file), "utf-8")
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? slug,
        category: data.category ?? "Insight",
        type: data.type ?? "insight",
        status: data.status ?? "draft",
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
      } as InsightMeta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getInsight(slug: string): Doc<InsightMeta> | null {
  const file = path.join(CONTENT_DIR, "insights", `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf-8")
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      category: data.category ?? "Insight",
      type: data.type ?? "insight",
      status: data.status ?? "draft",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
    },
    content,
  }
}

export function getProjectDoc(id: string): Doc<Partial<ProjectMeta>> | null {
  const file = path.join(CONTENT_DIR, "projects", `${id}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf-8")
  const { data, content } = matter(raw)
  return { meta: data as Partial<ProjectMeta>, content }
}

// Lightweight, dependency-free markdown renderer for trusted local content.
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function inline(s: string): string {
  let out = escapeHtml(s)
  // Images: ![alt](url)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => `<img src="${src}" alt="${alt}" loading="lazy" />`)
  // Links: [text](url)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, h) => `<a href="${h}">${t}</a>`)
  // Bold: **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  // Italic: *text* (but not **)
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
  // Inline code: `code`
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>")
  return out
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const html: string[] = []
  let para: string[] = []
  let list: string[] = []
  let inCodeBlock = false
  let codeLang = ""
  let codeLines: string[] = []

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

  const renderList = (items: string[]): string => {
    // Handle nested lists by indentation
    const root: { indent: number; text: string; children: any[] }[] = []
    const stack: { indent: number; items: any[] }[] = [{ indent: -1, items: root }]

    for (const item of items) {
      const match = item.match(/^(\s*)[-*]\s+(.*)$/)
      const indent = match ? match[1].length : 0
      const text = match ? match[2] : item

      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
        stack.pop()
      }
      const node = { indent, text, children: [] }
      stack[stack.length - 1].items.push(node)
      stack.push({ indent, items: node.children })
    }

    const build = (nodes: any[]): string => {
      if (!nodes.length) return ""
      const lis = nodes.map((n) => {
        const childrenHtml = build(n.children)
        return `<li>${inline(n.text)}${childrenHtml ? `<ul>${childrenHtml}</ul>` : ""}</li>`
      })
      return `<ul>${lis.join("")}</ul>`
    }

    return build(root)
  }

  for (const raw of lines) {
    const line = raw
    const trimmed = line.trim()

    // Code blocks: ```lang
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        const code = escapeHtml(codeLines.join("\n"))
        html.push(`<pre><code${codeLang ? ` class="language-${codeLang}"` : ""}>${code}</code></pre>`)
        codeLines = []
        codeLang = ""
        inCodeBlock = false
      } else {
        // Start code block
        flushPara()
        flushList()
        codeLang = trimmed.slice(3).trim()
        inCodeBlock = true
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // Horizontal rule
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
    if (line.startsWith("### ")) {
      flushPara(); flushList()
      html.push(`<h3>${inline(line.slice(4))}</h3>`)
    } else if (line.startsWith("## ")) {
      flushPara(); flushList()
      html.push(`<h2>${inline(line.slice(3))}</h2>`)
    } else if (line.startsWith("# ")) {
      flushPara(); flushList()
      html.push(`<h2>${inline(line.slice(2))}</h2>`)
    } else if (/^\s*[-*]\s+/.test(line)) {
      flushPara()
      list.push(line)
    } else if (line.startsWith("> ")) {
      flushPara(); flushList()
      html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`)
    } else {
      flushList()
      para.push(line.trim())
    }
  }

  // Flush any remaining
  if (inCodeBlock) {
    const code = escapeHtml(codeLines.join("\n"))
    html.push(`<pre><code${codeLang ? ` class="language-${codeLang}"` : ""}>${code}</code></pre>`)
  }
  flushPara()
  flushList()

  return html.join("\n")
}
