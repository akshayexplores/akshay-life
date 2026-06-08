export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono uppercase tracking-wider"
      style={{
        fontSize: "11px",
        color: "var(--text-muted)",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </span>
  )
}
