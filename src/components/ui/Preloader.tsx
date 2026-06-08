"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

export default function Preloader() {
  const [show, setShow] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on first visit per session
    if (typeof window === "undefined") return
    const visited = sessionStorage.getItem("al-visited")
    if (visited) return

    // Check reduced motion preference
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      sessionStorage.setItem("al-visited", "1")
      return
    }

    sessionStorage.setItem("al-visited", "1")
    setShow(true)
  }, [])

  useEffect(() => {
    if (!show || !rootRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setShow(false),
      })

      // Count 0 → 100
      const counter = { val: 0 }
      tl.to(
        counter,
        {
          val: 100,
          duration: 0.9,
          ease: "power2.inOut",
          onUpdate() {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.val)).padStart(3, "0")
            }
          },
        },
        0
      )

      // Progress bar
      tl.from(barRef.current, { scaleX: 0, transformOrigin: "left", duration: 0.9, ease: "power2.inOut" }, 0)

      // Hold
      tl.to({}, { duration: 0.18 })

      // Exit: whole overlay slides up
      tl.to(rootRef.current, {
        yPercent: -105,
        duration: 0.7,
        ease: "power4.inOut",
      })
    }, rootRef)

    return () => ctx.revert()
  }, [show])

  if (!show) return null

  return (
    <div
      ref={rootRef}
      className="preloader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
      }}
    >
      <p
        className="font-display"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 300,
          letterSpacing: "0.05em",
          color: "var(--text-primary)",
          fontVariationSettings: '"opsz" 48',
        }}
      >
        akshay.life
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "160px" }}>
        <span
          ref={countRef}
          className="font-mono"
          style={{ fontSize: "2.5rem", color: "var(--accent)", letterSpacing: "0.04em", lineHeight: 1 }}
        >
          000
        </span>
        <div style={{ width: "100%", height: "1px", background: "var(--border)" }}>
          <div ref={barRef} style={{ height: "100%", background: "var(--accent)", width: "100%", transformOrigin: "left" }} />
        </div>
      </div>
    </div>
  )
}
