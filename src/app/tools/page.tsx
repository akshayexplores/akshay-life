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
      <div className="mx-auto max-w-[680px] px-6 pb-24 pt-32 md:px-0 md:pt-40">
        <Link
          href="/"
          className="font-mono"
          style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
        >
          ← back
        </Link>
        <h1
          className="mt-8 font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Tools
        </h1>
        <p className="mt-4 font-body" style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          The stack I use to build, grow, and ship. No affiliate links — just what actually works.
        </p>

        <ToolsClient />
      </div>
      <Footer />
    </main>
  )
}
