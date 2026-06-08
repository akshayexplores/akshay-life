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
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, t, h) => `<a href="${h}">${t}</a>`)
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>")
  return out
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n")
  const html: string[] = []
  let para: string[] = []
  let list: string[] = []

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(" "))}</p>`)
      para = []
    }
  }
  const flushList = () => {
    if (list.length) {
      html.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join("")}</ul>`)
      list = []
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
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
    } else if (/^[-*]\s+/.test(line)) {
      flushPara()
      list.push(line.replace(/^[-*]\s+/, ""))
    } else if (line.startsWith("> ")) {
      flushPara(); flushList()
      html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`)
    } else {
      flushList()
      para.push(line.trim())
    }
  }
  flushPara()
  flushList()
  return html.join("\n")
}
