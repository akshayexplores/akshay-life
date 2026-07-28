import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllInsights, getInsight, renderMarkdown } from "@/lib/mdx"
import { pillarName } from "@/data/pillars"

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
      url: `https://akshay.life/insights/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.meta.title,
      description: doc.meta.excerpt || undefined,
    },
    alternates: { canonical: `https://akshay.life/insights/${slug}` },
  }
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getInsight(slug)
  if (!doc) notFound()

  const { meta, content } = doc
  const html = renderMarkdown(content, { dropFirstH1: true })

  const all = getAllInsights()
  const idx = all.findIndex((i) => i.slug === slug)
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null
  const prev = idx > 0 ? all[idx - 1] : null

  return (
    <main className="relative z-[2] mx-auto max-w-[720px] px-6 pt-32 md:pt-40">
      <Link href="/insights" className="t-meta link-u">← All insights</Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="t-meta" style={{ color: "var(--accent-dim)" }}>{pillarName(meta.pillar)}</span>
        <span className="t-meta">·</span>
        <span className="t-meta">{meta.subject}</span>
        <span className="t-meta">·</span>
        <span className="t-meta">{meta.readingMinutes} min</span>
      </div>

      <h1 className="t-display mt-5">{meta.title}</h1>

      {meta.excerpt && (
        <p
          className="mt-6 font-body"
          style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--text)" }}
        >
          {meta.excerpt}
        </p>
      )}

      <hr className="rule" style={{ margin: "2.5rem 0" }} />

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      {meta.tags.length > 0 && (
        <div className="mt-14 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <span key={t} className="chip" style={{ cursor: "default" }}>{t}</span>
          ))}
        </div>
      )}

      <nav className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2" style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        {prev ? (
          <Link href={`/insights/${prev.slug}`} className="bento block p-5">
            <p className="t-label">Newer</p>
            <p className="mt-2 font-body" style={{ color: "var(--text)", lineHeight: 1.5 }}>{prev.title}</p>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/insights/${next.slug}`} className="bento block p-5 md:text-right">
            <p className="t-label">Older</p>
            <p className="mt-2 font-body" style={{ color: "var(--text)", lineHeight: 1.5 }}>{next.title}</p>
          </Link>
        ) : <span />}
      </nav>
    </main>
  )
}
