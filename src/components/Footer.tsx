import Link from "next/link"

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "7rem" }}>
      <div className="mx-auto max-w-[1180px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div style={{ maxWidth: "34ch" }}>
            <p className="font-mono" style={{ fontSize: "13px", color: "var(--text)", letterSpacing: "0.04em" }}>
              akshay<span style={{ color: "var(--accent)" }}>.</span>life
            </p>
            <p className="t-meta" style={{ marginTop: "0.6rem", lineHeight: 1.6 }}>
              A body of thought attached to an operator. Not a portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/insights" className="t-meta link-u">Insights</Link>
            <Link href="/projects" className="t-meta link-u">Projects</Link>
            <Link href="/tools" className="t-meta link-u">Tools</Link>
            <Link href="/now" className="t-meta link-u">Now</Link>
            <Link href="/about" className="t-meta link-u">About</Link>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="mailto:akshay@fastrbuild.com" className="t-meta link-u">Email</a>
            <a href="https://x.com/AkshayExplores" target="_blank" rel="noopener noreferrer" className="t-meta link-u">X</a>
            <a href="https://github.com/akshayexplores" target="_blank" rel="noopener noreferrer" className="t-meta link-u">GitHub</a>
          </div>
        </div>

        <p className="t-meta" style={{ marginTop: "2.5rem" }}>
          © {new Date().getFullYear()} Akshay Sajeev
        </p>
      </div>
    </footer>
  )
}
