"use client"

import { useRef, useEffect, ElementType } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "p",
}: {
  text: string
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const words = ref.current.querySelectorAll(".word-inner")
    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.04,
        duration: 0.75,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
        onComplete: () => words.forEach((w) => ((w as HTMLElement).style.willChange = "auto")),
      })
    }, ref)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [delay, text])

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-wrap"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span
            className="word-inner"
            style={{ display: "inline-block", willChange: "transform", marginRight: "0.26em" }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export default AnimatedText
