import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllInsights, getInsight, renderMarkdown } from "@/lib/mdx"
import { movement } from "@/data/movements"

export function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getInsight(slug)
  if (!doc) return { title: "Not found" }
  return {
    title: doc.meta.title,
    description: doc.meta.excerpt || undefined,
    openGraph: {
      title: doc.meta.title,
      description: doc.meta.excerpt || undefined,
      type: "article",
      url: `https://akshay.life/darshana/${slug}`,
    },
    twitter: { card: "summary_large_image", title: doc.meta.title, description: doc.meta.excerpt || undefined },
    alternates: { canonical: `https://akshay.life/darshana/${slug}` },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getInsight(slug)
  if (!doc) notFound()

  const { meta, content } = doc
  const html = renderMarkdown(content, { dropFirstH1: true })
  const mv = movement(meta.movement)

  const all = getAllInsights()
  const idx = all.findIndex((i) => i.slug === slug)
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null
  const prev = idx > 0 ? all[idx - 1] : null

  return (
    <main className="sheet" style={{ paddingTop: 116 }}>
      <Link href="/darshana" className="meta">
        ← The archive
      </Link>

      <div className="entry" style={{ marginTop: 22, paddingBottom: 0 }}>
        <div className="rail">
          <span className="no">{String(all.length - idx).padStart(2, "0")}</span>
          {mv.roman}
          <span className="mnote">
            Filed under {meta.subject}. {meta.readingMinutes} min.
          </span>
        </div>

        <div className="col">
          <h1 className="t-h2">{meta.title}</h1>

          {meta.excerpt && (
            <p className="t-first" style={{ marginTop: 16 }}>
              {meta.excerpt}
            </p>
          )}

          <hr className="rule-hr" style={{ margin: "30px 0" }} />

          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

          {meta.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span key={t} className="chip" style={{ cursor: "default" }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <nav
            className="mt-14 flex flex-col gap-5 md:flex-row md:justify-between"
            style={{ borderTop: "1px solid var(--rule)", paddingTop: 24, marginBottom: 60 }}
          >
            {prev ? (
              <Link href={`/darshana/${prev.slug}`} style={{ maxWidth: "30ch" }}>
                <span className="lbl">Newer</span>
                <span style={{ display: "block", marginTop: 6, lineHeight: 1.45 }}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/darshana/${next.slug}`} style={{ maxWidth: "30ch" }} className="md:text-right">
                <span className="lbl">Older</span>
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
