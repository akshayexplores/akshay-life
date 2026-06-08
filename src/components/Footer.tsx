export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
      <div
        className="mx-auto max-w-[1400px] px-6 py-10 md:px-12"
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: "1.1rem", fontWeight: 300, color: "var(--text-muted)", letterSpacing: "0.04em", fontVariationSettings: '"opsz" 14' }}
          >
            akshay.life
          </span>

          <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
            BUILT WITH NEXT.JS · GSAP · LENIS
          </span>

          <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            © 2026 AKSHAY SAJEEV
          </span>
        </div>

        {/* Thin amber line */}
        <div style={{ height: "1px", background: "linear-gradient(to right, var(--accent), transparent)" }} />
      </div>
    </footer>
  )
}
