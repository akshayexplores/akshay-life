"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { projects } from "@/data/projects"
import AnimatedText from "@/components/ui/AnimatedText"
import ProjectCard from "@/components/ui/ProjectCard"

// Asymmetric layout: pairs of [largeLeft?] rows
const rows: { items: number[]; widths: string[] }[] = [
  { items: [0, 1], widths: ["60%", "38%"] },
  { items: [2, 3], widths: ["48%", "48%"] },
  { items: [4, 5], widths: ["38%", "60%"] },
  { items: [6, 7], widths: ["60%", "38%"] },
  { items: [8, 9], widths: ["48%", "48%"] },
  { items: [10], widths: ["48%"] },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card")
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }
          ),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-48" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <AnimatedText as="h2" text="11 things I've built." className="font-display projects-h2" />
        <style jsx>{`
          :global(.projects-h2) { font-size: clamp(40px, 7vw, 72px); font-weight: 400; color: var(--text-primary); line-height: 1.05; }
        `}</style>

        <div className="mt-20 flex flex-col gap-6">
          {rows.map((row, ri) => (
            <div key={ri} className="flex flex-col gap-6 md:flex-row">
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
            className="font-display inline-flex items-center gap-3"
            style={{ fontSize: "28px", color: "var(--text-primary)" }}
          >
            See all projects <span style={{ color: "var(--accent)" }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
