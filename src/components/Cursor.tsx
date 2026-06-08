"use client"

import { useEffect, useRef, useState } from "react"

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicked,  setClicked]  = useState(false)
  const [enabled,  setEnabled]  = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHover) return
    setEnabled(true)

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0
    let raf = 0
    const hoverRef = { current: false }

    const onMove = (e: MouseEvent) => { dotX = e.clientX; dotY = e.clientY }

    const render = () => {
      // Dot tracks exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px,${dotY}px) translate(-50%,-50%)`
      }
      // Ring lags with lerp
      const lerpFactor = hoverRef.current ? 0.12 : 0.16
      ringX += (dotX - ringX) * lerpFactor
      ringY += (dotY - ringY) * lerpFactor
      if (ringRef.current) {
        const s = hoverRef.current ? 2.2 : 1
        ringRef.current.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%) scale(${s})`
      }
      raf = requestAnimationFrame(render)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const interactive = !!t.closest("a,button,[data-cursor-hover],input,textarea")
      hoverRef.current = interactive
      setHovering(interactive)
    }
    const onDown = () => setClicked(true)
    const onUp   = () => setClicked(false)

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup",   onUp)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup",   onUp)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0, top: 0,
          zIndex: 9999,
          width: hovering ? 0 : 7,
          height: hovering ? 0 : 7,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          transition: "width 0.2s, height 0.2s",
          transform: `scale(${clicked ? 0.5 : 1})`,
          willChange: "transform",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0, top: 0,
          zIndex: 9998,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "var(--accent)" : "rgba(235,164,39,0.5)"}`,
          background: hovering ? "rgba(235,164,39,0.12)" : "transparent",
          pointerEvents: "none",
          transition: "width 0.25s, height 0.25s, border-color 0.25s, background 0.25s",
          willChange: "transform",
        }}
      />
    </>
  )
}
