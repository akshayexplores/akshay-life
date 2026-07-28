"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const links = [
  { label: "Insights", href: "/insights" },
  { label: "Projects", href: "/projects" },
  { label: "Tools", href: "/tools" },
  { label: "Now", href: "/now" },
  { label: "About", href: "/about" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className="fixed left-0 top-0 z-50 w-full"
      style={{
        background: scrolled || open ? "rgba(18,18,18,0.86)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled || open ? "var(--border)" : "transparent"}`,
        transition: "background 0.3s var(--ease), border-color 0.3s var(--ease)",
      }}
    >
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="font-mono"
          style={{ fontSize: "13px", letterSpacing: "0.06em", color: "var(--text)" }}
        >
          akshay<span style={{ color: "var(--accent)" }}>.</span>life
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/")
            return (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: active ? "var(--accent)" : "var(--text-dim)",
                  transition: "color 0.18s var(--ease)",
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="font-mono md:hidden"
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 2,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex flex-col px-6 py-3">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/")
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: active ? "var(--accent)" : "var(--text-dim)",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
