import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1200px] px-6 pb-16 pt-12 md:px-12">
      <div className="flex items-center justify-between border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <span className="font-mono" style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} Akshay Sajeev
        </span>
        <div className="flex items-center gap-6">
          <a href="https://x.com/AkshayExplores" target="_blank" rel="noopener noreferrer" className="font-mono" style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            X
          </a>
          <a href="https://github.com/akshayexplores" target="_blank" rel="noopener noreferrer" className="font-mono" style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
