"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const links = [
  { label: "Insights", href: "/insights" },
  { label: "Projects", href: "/projects" },
  { label: "Tools",    href: "/tools"    },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/#connect" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden,   setHidden]   = useState(false)
  const [open,     setOpen]     = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > lastY.current && y > 180) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { document.body.style.overflow = open ? "hidden" : "" }, [open])

  return (
    <>
      <motion.header
        className="fixed left-0 top-0 z-50 w-full"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: scrolled ? "rgba(10,9,8,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" data-cursor-hover className="font-mono" style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
            AK
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} data-cursor-hover className="nav-link font-body" style={{ fontSize: "13px" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            data-cursor-hover
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col justify-center gap-[5px] md:hidden"
            style={{ width: 24, height: 16 }}
          >
            <span style={{ display: "block", height: 1.5, width: 24, background: "var(--text-primary)", transform: open ? "translateY(6.5px) rotate(45deg)" : "none", transition: "transform 0.3s" }} />
            <span style={{ display: "block", height: 1.5, width: 24, background: "var(--text-primary)", opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", height: 1.5, width: 24, background: "var(--text-primary)", transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none", transition: "transform 0.3s" }} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-10 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="flex flex-col gap-6">
              {links.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display"
                  style={{ fontSize: "clamp(2.5rem, 12vw, 4rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", fontVariationSettings: '"opsz" 72' }}
                >
                  <span className="text-label" style={{ marginRight: "1rem" }}>—</span>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-16">
              <p className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.15em" }}>akshay.life</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
