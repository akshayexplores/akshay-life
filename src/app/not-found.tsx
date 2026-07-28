import Link from "next/link"

export default function NotFound() {
  return (
    <main className="relative z-[2] mx-auto max-w-[720px] px-6 pt-40 pb-24">
      <p className="t-label">404</p>
      <h1 className="t-display mt-5">Nothing here</h1>
      <p className="mt-6 font-body" style={{ color: "var(--text-dim)", maxWidth: "48ch" }}>
        The page moved, or it never existed. Both happen.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
        <Link href="/" className="t-meta link-u" style={{ color: "var(--accent)" }}>Home</Link>
        <Link href="/insights" className="t-meta link-u">Insights</Link>
        <Link href="/projects" className="t-meta link-u">Projects</Link>
      </div>
    </main>
  )
}
