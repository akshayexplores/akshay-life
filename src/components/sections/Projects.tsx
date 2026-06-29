"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { projects } from "@/data/projects"
import AnimatedText from "@/components/ui/AnimatedText"
import ProjectCard from "@/components/ui/ProjectCard"

const rows: { items: number[]; widths: string[] }[] = [
  { items: [0, 1],   widths: ["60%", "38%"] },
  { items: [2, 3],   widths: ["48%", "48%"] },
  { items: [4, 5],   widths: ["38%", "60%"] },
  { items: [6, 7],   widths: ["60%", "38%"] },
  { items: [8, 9],   widths: ["48%", "48%"] },
  { items: [10],     widths: ["48%"] },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card")
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { clipPath: "inset(0 0 100% 0)", y: 20 },
            { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.75, stagger: 0.06, ease: "power4.out" }
          ),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={ref} className="py-32 md:py-48" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <span className="text-label">Projects</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <AnimatedText as="h2" text="11 things I've built." className="font-display text-display" style={{ color: "var(--text-primary)" }} />

        <div className="mt-20 flex flex-col gap-5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex flex-col gap-5 md:flex-row">
              {row.items.map((pi, ci) => (
                <div key={pi} className="w-full" style={{ flexBasis: row.widths[ci] }}>
                  <ProjectCard project={projects[pi]} large={parseFloat(row.widths[ci]) >= 58} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/projects"
            data-cursor-hover
            className="font-display inline-flex items-center gap-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", fontVariationSettings: '"opsz" 36' }}
          >
            See all projects{" "}
            <span style={{ color: "var(--accent)", transition: "transform 0.3s var(--ease-out)", display: "inline-block" }} className="see-all-arrow">→</span>
          </Link>
        </div>
      </div>
      <style jsx global>{`
        a:hover .see-all-arrow { transform: translateX(8px); }
      `}</style>
    </section>
  )
}
