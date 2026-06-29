import Link from "next/link"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"
import { getAllInsights, getInsight, renderMarkdown } from "@/lib/mdx"

export function generateStaticParams() {
  return getAllInsights().map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) return { title: "Insight — Akshay Sajeev" }
  return {
    title: `${insight.meta.title} — Akshay Sajeev`,
    description: insight.meta.excerpt,
  }
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) notFound()

  const date = insight.meta.date
    ? new Date(insight.meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  // Related insights: same category, excluding current
  const related = getAllInsights()
    .filter(
      (i) => i.category === insight.meta.category && i.slug !== insight.meta.slug
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <article className="mx-auto max-w-[720px] px-6 pb-32 pt-40">
        <Link
          href="/insights"
          data-cursor-hover
          className="font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          ← all insights
        </Link>
        <p
          className="mt-10 font-mono uppercase"
          style={{
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "var(--accent)",
          }}
        >
          {insight.meta.category}
        </p>
        <h1
          className="mt-5 font-display"
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--text-primary)",
          }}
        >
          {insight.meta.title}
        </h1>
        <p
          className="mt-5 font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          {date}
        </p>

        {/* Tags */}
        {insight.meta.tags && insight.meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {insight.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 font-mono"
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose-note mt-14"
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(insight.content),
          }}
        />
      </article>

      {/* Related insights */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[720px] px-6 pb-24">
          <div
            className="mb-8 h-px w-full"
            style={{ background: "var(--border)" }}
          />
          <p
            className="font-mono uppercase"
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
            }}
          >
            Related in {insight.meta.category}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/insights/${r.slug}`}
                data-cursor-hover
                className="group block rounded-lg border p-4 transition-colors hover:border-[var(--accent)]"
                style={{ borderColor: "var(--border)" }}
              >
                <p
                  className="font-mono"
                  style={{ fontSize: "12px", color: "var(--accent)" }}
                >
                  {r.category}
                </p>
                <p
                  className="mt-2 font-body"
                  style={{
                    fontSize: "15px",
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                  }}
                >
                  {r.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
