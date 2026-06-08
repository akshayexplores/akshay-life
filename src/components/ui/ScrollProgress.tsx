"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      setProgress(Math.min(1, Math.max(0, scrolled)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden h-[80vh] w-px -translate-y-1/2 md:block" style={{ background: "var(--border)" }}>
      <div
        className="w-px origin-top"
        style={{ background: "var(--accent)", height: "100%", transform: `scaleY(${progress})` }}
      />
    </div>
  )
}
