"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export default function CountUp({
  target,
  duration = 1.5,
  className,
}: {
  target: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      setValue(Math.round(easeOutCubic(p) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
