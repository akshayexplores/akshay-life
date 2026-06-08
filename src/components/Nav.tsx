"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const links = [
  { label: "Notes", href: "/notes" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#connect" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      if (y > lastY.current && y > 200) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    <>
      <motion.header
        className="fixed left-0 top-0 z-50 w-full"
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
          <Link href="/" data-cursor-hover className="font-mono" style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            akshay.life
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} data-cursor-hover className="nav-link font-body" style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                {l.label}
              </Link>
            ))}
          </div>

          <button
            data-cursor-hover
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] md:hidden"
            style={{ width: 26, height: 18, justifyContent: "center" }}
          >
            <span style={{ display: "block", height: 1.5, width: 26, background: "var(--text-primary)", transform: open ? "translateY(6.5px) rotate(45deg)" : "none", transition: "transform 0.3s" }} />
            <span style={{ display: "block", height: 1.5, width: 26, background: "var(--text-primary)", opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", height: 1.5, width: 26, background: "var(--text-primary)", transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none", transition: "transform 0.3s" }} />
          </button>
        </nav>
      </motion.header>

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
            <div className="flex flex-col gap-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display"
                  style={{ fontSize: "44px", fontWeight: 300, color: "var(--text-primary)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .nav-link { position: relative; transition: color 0.3s; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px;
          width: 100%; height: 1px; background: var(--text-primary);
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-link:hover { color: var(--text-primary); }
        .nav-link:hover::after { transform: scaleX(1); }
      `}</style>
    </>
  )
}
