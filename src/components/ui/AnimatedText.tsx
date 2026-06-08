"use client"

import { useRef, useEffect, ElementType, CSSProperties } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "p",
  style,
}: {
  text: string
  className?: string
  delay?: number
  as?: ElementType
  style?: CSSProperties
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const words = ref.current.querySelectorAll(".word-inner")
    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { clipPath: "inset(0 0 100% 0)", y: 14 },
        {
          clipPath: "inset(0 0 0% 0)", y: 0,
          stagger: 0.04, duration: 0.7, delay,
          ease: "power4.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%" },
          onComplete: () => words.forEach((w) => ((w as HTMLElement).style.willChange = "auto")),
        }
      )
    }, ref)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [delay, text])

  return (
    <Tag ref={ref} className={className} aria-label={text} style={style}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-wrap"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span
            className="word-inner"
            style={{ display: "inline-block", willChange: "transform", marginRight: "0.28em" }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export default AnimatedText
