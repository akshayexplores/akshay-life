export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-8 font-mono md:flex-row md:items-center md:justify-between md:px-12" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
        <span>© 2026 Akshay Sajeev</span>
        <span>Built with Next.js &amp; GSAP</span>
      </div>
    </footer>
  )
}
