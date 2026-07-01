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

  const related = getAllInsights()
    .filter(
      (i) => i.category === insight.meta.category && i.slug !== insight.meta.slug
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <article className="mx-auto max-w-[680px] px-6 pb-32 pt-40 md:px-0">
        <Link
          href="/insights"
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
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "var(--text-primary)",
          }}
        >
          {insight.meta.title}
        </h1>
        <p
          className="mt-4 font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          {date}
        </p>

        <div
          className="prose-note mt-14"
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(insight.content),
          }}
        />
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-[680px] px-6 pb-24 md:px-0">
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
          <div className="mt-6 flex flex-col">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/insights/${r.slug}`}
                className="group border-b py-4"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="font-body" style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
                  {r.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
