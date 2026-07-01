"use client"

import { useState } from "react"
import { tools, toolCategories } from "@/data/tools"

export default function ToolsClient() {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", ...toolCategories]

  const filtered =
    activeCategory === "All"
      ? tools
      : tools.filter((t) => t.category === activeCategory)

  return (
    <>
      {/* Category filters */}
      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="rounded-full px-3 py-1 font-mono transition-colors"
            style={{
              fontSize: "12px",
              letterSpacing: "0.02em",
              background: activeCategory === cat ? "var(--accent)" : "transparent",
              color: activeCategory === cat ? "#FFFFFF" : "var(--text-muted)",
              border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mt-4 font-mono" style={{ fontSize: "13px", color: "var(--text-muted)" }}>
        {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </p>

      {/* Tools list */}
      <div className="mt-10 flex flex-col">
        {filtered.map((tool) => (
          <div
            key={tool.name}
            className="border-b py-5"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-body" style={{ fontSize: "1.0625rem", color: "var(--text-primary)" }}>
                {tool.name}
              </span>
              <span className="font-mono flex-shrink-0" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {tool.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
