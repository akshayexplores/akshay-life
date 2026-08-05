"use client"

import { useEffect } from "react"

/**
 * One watcher for the whole site.
 *
 * Marks every .entry and .plate as seen when it scrolls into view, which is
 * what motion.css keys off. Doing it centrally means no page has to wire up
 * its own reveal, and adding a section gets the behaviour for free.
 *
 * It also sets html.js. Every hidden-then-revealed rule is gated on that
 * class, so if this never runs the page is simply fully visible — the
 * failure mode is "no animation", never "no content".
 */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add("js")

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".entry, .plate"))

    if (reduce) {
      targets.forEach((el) => (el.dataset.seen = "1"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          el.dataset.seen = "1"
          io.unobserve(el)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )

    targets.forEach((el) => io.observe(el))

    // Anything already on screen at load should not wait for a scroll.
    requestAnimationFrame(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.dataset.seen = "1"
          io.unobserve(el)
        }
      })
    })

    return () => io.disconnect()
  }, [])

  return null
}
