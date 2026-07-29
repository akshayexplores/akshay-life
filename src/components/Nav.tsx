"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Mark from "./Mark"

const links = [
  { label: "Darśana", href: "/darshana" },
  { label: "Krama", href: "/krama" },
  { label: "Kriyā", href: "/kriya" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className="fixed left-0 top-0 z-50 w-full"
      style={{
        background: scrolled || open ? "rgba(242,237,227,0.94)" : "transparent",
        backdropFilter: scrolled || open ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled || open ? "blur(8px)" : "none",
        borderBottom: `1px solid ${scrolled || open ? "var(--rule)" : "transparent"}`,
        transition: "background 0.28s var(--ease), border-color 0.28s var(--ease)",
      }}
    >
      <nav
        className="sheet flex items-center justify-between"
        style={{ paddingTop: "var(--s4)", paddingBottom: "var(--s4)" }}
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Krama — home">
          <Mark size={22} />
          <span style={{ fontSize: 21, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--masi)" }}>
            Krama
          </span>
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
                  fontSize: 10.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: active ? "var(--pravala-deep)" : "#98897A",
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
            fontSize: 10.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#98897A",
            background: "transparent",
            border: "1px solid var(--rule)",
            padding: "6px 11px",
            cursor: "pointer",
          }}
        >
          {open ? "Close" : "Index"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--rule)" }}>
          <div className="sheet flex flex-col">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/")
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: active ? "var(--pravala-deep)" : "#98897A",
                    padding: "13px 0",
                    borderBottom: "1px solid var(--rule)",
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
