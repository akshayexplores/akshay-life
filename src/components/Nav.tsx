"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const links = [
  { label: "Insights", href: "/insights" },
  { label: "Projects", href: "/projects" },
  { label: "Tools",    href: "/tools"    },
  { label: "About",    href: "/about"    },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed left-0 top-0 z-50 w-full"
      style={{
        background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-mono" style={{ fontSize: "13px", color: "var(--text-primary)", letterSpacing: "0.1em" }}>
          Akshay Sajeev
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link font-body" style={{ fontSize: "14px" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
