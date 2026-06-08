"use client"

import Link from "next/link"
import { useRef, useCallback } from "react"
import { gsap } from "@/lib/gsap"
import type { Project } from "@/data/projects"
import GradedImage, { GradedPlaceholder } from "@/components/ui/GradedImage"

const IMAGE_HEIGHTS = { large: 280, normal: 200 } as const

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const cardRef   = useRef<HTMLAnchorElement>(null)
  const imageRef  = useRef<HTMLDivElement>(null)

  const onEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8

    gsap.to(card, {
      rotateY: x, rotateX: y,
      transformPerspective: 900,
      duration: 0.5, ease: "power3.out",
      transformOrigin: "center center",
    })
  }, [])

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    if (!card) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8
    gsap.to(card, { rotateY: x, rotateX: y, duration: 0.3, ease: "power2.out" })
  }, [])

  const onLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" })
  }, [])

  const imageH = large ? IMAGE_HEIGHTS.large : IMAGE_HEIGHTS.normal

  return (
    <Link
      ref={cardRef}
      href={`/projects/${project.id}`}
      data-cursor-hover
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="project-card"
      style={{ willChange: "transform" }}
    >
      {/* ── Cover image / placeholder ── */}
      <div
        ref={imageRef}
        className="project-card-image"
        style={{ height: imageH, overflow: "hidden" }}
      >
        {project.cover ? (
          <GradedImage
            src={project.cover}
            alt={project.title}
            fill
            sizes={large ? "60vw" : "40vw"}
            style={{ position: "absolute", inset: 0, height: "100%" }}
          />
        ) : (
          <GradedPlaceholder
            gradient={project.coverGradient}
            style={{ position: "absolute", inset: 0, height: "100%" }}
          >
            {/* Subtle amber corner accent on placeholder */}
            <div style={{
              position: "absolute", bottom: 16, right: 20,
              fontFamily: "var(--font-mono)", fontSize: "10px",
              color: "rgba(235,164,39,0.35)", letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              {project.year}
            </div>
          </GradedPlaceholder>
        )}
        {/* Amber bottom edge on hover */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: "var(--accent)", transform: "scaleX(0)", transformOrigin: "left",
          transition: "transform 0.4s var(--ease-out)",
        }} className="card-accent-line" />
      </div>

      {/* ── Body ── */}
      <div className={`project-card-body${large ? " large" : ""}`}>
        <div>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", marginBottom: "14px" }}>
            {project.tags.map((t) => (
              <span key={t} className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="font-display"
            style={{
              fontSize: large ? "clamp(1.5rem, 2.5vw, 2.25rem)" : "clamp(1.2rem, 2vw, 1.75rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontVariationSettings: '"opsz" 36',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="font-body"
            style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, marginTop: "10px", maxWidth: "42ch" }}
          >
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
            {project.client} · {project.year}
          </span>
          <span
            className="font-mono arrow-icon"
            style={{ fontSize: "16px", color: "var(--accent)", transition: "transform 0.3s var(--ease-out)" }}
          >
            →
          </span>
        </div>
      </div>

      <style jsx global>{`
        .project-card:hover .card-accent-line { transform: scaleX(1) !important; }
        .project-card:hover .arrow-icon { transform: translateX(5px); }
      `}</style>
    </Link>
  )
}
