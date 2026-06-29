import Link from "next/link"
import Footer from "@/components/Footer"
import ToolsClient from "./ToolsClient"

export const metadata = {
  title: "Tools — Akshay Sajeev",
  description: "The tools I use and recommend for building, growing, managing, and creating.",
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">
        <Link
          href="/"
          data-cursor-hover
          className="font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)" }}
        >
          ← back
        </Link>
        <h1
          className="mt-8 font-display"
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.05,
          }}
        >
          Tools
        </h1>
        <p
          className="mt-4 font-body"
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: "520px",
          }}
        >
          The stack I use to build, grow, and ship. No affiliate links — just what actually works.
        </p>

        <ToolsClient />
      </div>
      <Footer />
    </main>
  )
}
