import Link from "next/link"
import Mark from "./Mark"

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", marginTop: "var(--s9)" }}>
      <div className="sheet" style={{ paddingTop: "var(--s7)", paddingBottom: "var(--s8)" }}>
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div style={{ maxWidth: "32ch" }}>
            <div className="flex items-center gap-3">
              <Mark size={20} />
              <span style={{ fontSize: 19, fontWeight: 300, letterSpacing: "-0.03em" }}>Krama</span>
            </div>
            <p className="meta-sent" style={{ marginTop: "var(--s3)" }}>
              Ordered progress. A notebook kept in public by Akshay Sajeev — Bharat.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <Link href="/darshana" className="meta">Darśana</Link>
            <Link href="/krama" className="meta">Krama</Link>
            <Link href="/kriya" className="meta">Kriyā</Link>
            <Link href="/tools" className="meta">Tools</Link>
            <Link href="/about" className="meta">About</Link>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-2">
            <a href="mailto:akshay@fastrbuild.com" className="meta">Email</a>
            <a href="https://www.linkedin.com/in/akshayexplores/" target="_blank" rel="noopener noreferrer" className="meta">LinkedIn</a>
            <a href="https://x.com/AkshayExplores" target="_blank" rel="noopener noreferrer" className="meta">X</a>
            <a href="https://github.com/akshayexplores" target="_blank" rel="noopener noreferrer" className="meta">GitHub</a>
            <a href="/feed.xml" className="meta">RSS</a>
          </div>
        </div>

        <p className="meta" style={{ marginTop: "var(--s7)" }}>© {new Date().getFullYear()} Akshay Sajeev</p>
      </div>
    </footer>
  )
}
