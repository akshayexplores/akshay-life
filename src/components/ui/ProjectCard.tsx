"use client"

import Link from "next/link"
import { useState } from "react"
import type { Project } from "@/data/projects"

export default function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const [hover, setHover] = useState(false)

  return (
    <Link
      href={`/projects/${project.id}`}
      data-cursor-hover
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="project-card group flex h-full flex-col justify-between"
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hover ? "var(--border-hover)" : "var(--border)"}`,
        padding: large ? "40px" : "32px",
        minHeight: large ? "320px" : "240px",
        borderRadius: "2px",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 20px 60px rgba(0,0,0,0.4)" : "none",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.4s",
      }}
    >
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          {project.tags.map((t) => (
            <span key={t} className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              {t}
            </span>
          ))}
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: large ? "34px" : "28px",
            fontWeight: 500,
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
        <p
          className="mt-4 font-body"
          style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "44ch" }}
        >
          {project.description}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
          {project.client} · {project.year}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: "18px",
            color: hover ? "var(--accent)" : "var(--text-secondary)",
            transform: hover ? "translateX(6px)" : "translateX(0)",
            transition: "transform 0.3s, color 0.3s",
          }}
        >
          →
        </span>
      </div>
    </Link>
  )
}
