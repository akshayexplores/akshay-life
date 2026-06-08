"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHover) return
    setEnabled(true)

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const render = () => {
      ringX += (dotX - ringX) * 0.18
      ringY += (dotY - ringY) * 0.18
      if (dotRef.current) dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${hoverRef.current ? 2 : 1})`
      raf = requestAnimationFrame(render)
    }

    const hoverRef = { current: false }
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = t.closest("a, button, [data-cursor-hover], input, textarea")
      hoverRef.current = !!interactive
      setHovering(!!interactive)
    }
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{ width: 6, height: 6, background: "var(--accent)", mixBlendMode: "normal" }}
        animate={{ scale: clicked ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-[width,height,background] duration-200"
        style={{
          width: hovering ? 48 : 24,
          height: hovering ? 48 : 24,
          border: "2px solid var(--accent)",
          background: hovering ? "rgba(232,160,32,0.15)" : "transparent",
        }}
      />
    </>
  )
}
