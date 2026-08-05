import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProjects } from "@/lib/sources"
import { getProjectBody, projectIdsWithBody } from "@/lib/projects-content"
import { renderMarkdown } from "@/lib/mdx"
import { outcomeLabel } from "@/data/projects"

/** Only projects that actually have a write-up get a page. */
function readable() {
  const withBody = projectIdsWithBody()
  return getProjects().rows.filter((p) => withBody.has(p.id))
}

export function generateStaticParams() {
  return readable().map((p) => ({ slug: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const body = getProjectBody(slug)
  if (!body) return { title: "Not found" }

  return {
    title: body.title,
    description: body.excerpt || undefined,
    openGraph: {
      title: body.title,
      description: body.excerpt || undefined,
      type: "article",
      url: `https://akshay.life/krama/${slug}`,
    },
    twitter: { card: "summary_large_image", title: body.title, description: body.excerpt || undefined },
    alternates: { canonical: `https://akshay.life/krama/${slug}` },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const body = getProjectBody(slug)
  if (!body) notFound()

  const rows = readable()
  const idx = rows.findIndex((p) => p.id === slug)
  const row = idx >= 0 ? rows[idx] : null
  const prev = idx > 0 ? rows[idx - 1] : null
  const next = idx >= 0 && idx < rows.length - 1 ? rows[idx + 1] : null

  const html = renderMarkdown(body.content, { dropFirstH1: true })

  return (
    <main className="sheet" style={{ paddingTop: 116 }}>
      <Link href="/krama" className="meta">
        ← The work
      </Link>

      <div className="entry" style={{ marginTop: 22, paddingBottom: 0 }}>
        <div className="rail">
          <span className="no">{String(idx + 1).padStart(2, "0")}</span>
          Krama
          <span className="mnote">
            {row ? `${row.org}. ` : ""}
            {body.readingMinutes} min.
          </span>
        </div>

        <div className="col">
          <h1 className="t-h2">{body.title}</h1>

          {row && (
            <p
              className="font-mono"
              style={{
                marginTop: 14,
                fontSize: 10.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--masi)",
              }}
            >
              {outcomeLabel[row.outcomeKind]}
              <span style={{ color: "#98897A" }}> · {row.stack.join(" · ")}</span>
            </p>
          )}

          {row && (
            <p className="t-first" style={{ marginTop: 16 }}>
              {row.outcome}
            </p>
          )}

          <hr className="rule-hr" style={{ margin: "30px 0" }} />

          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

          {row?.relationship && (
            <p className="meta-sent" style={{ marginTop: 32 }}>
              {row.relationship}
            </p>
          )}

          {body.skills.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {body.skills.map((s) => (
                <span key={s} className="chip" style={{ cursor: "default" }}>
                  {s}
                </span>
              ))}
            </div>
          )}

          <nav
            className="mt-14 flex flex-col gap-5 md:flex-row md:justify-between"
            style={{ borderTop: "1px solid var(--rule)", paddingTop: 24, marginBottom: 60 }}
          >
            {prev ? (
              <Link href={`/krama/${prev.id}`} style={{ maxWidth: "30ch" }}>
                <span className="lbl">Previous</span>
                <span style={{ display: "block", marginTop: 6, lineHeight: 1.45 }}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/krama/${next.id}`} style={{ maxWidth: "30ch" }} className="md:text-right">
                <span className="lbl">Next</span>
                <span style={{ display: "block", marginTop: 6, lineHeight: 1.45 }}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </main>
  )
}
