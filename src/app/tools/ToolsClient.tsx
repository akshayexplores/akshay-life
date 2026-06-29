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
            data-cursor-hover
            className="rounded-full px-4 py-1.5 font-mono transition-colors"
            style={{
              fontSize: "13px",
              letterSpacing: "0.02em",
              background: activeCategory === cat ? "var(--accent)" : "transparent",
              color: activeCategory === cat ? "var(--bg-primary)" : "var(--text-muted)",
              border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p
        className="mt-4 font-mono"
        style={{ fontSize: "13px", color: "var(--text-muted)" }}
      >
        {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </p>

      {/* Tools grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <div
            key={tool.name}
            className="rounded-lg border p-5 transition-colors hover:border-[var(--accent)]"
            style={{ borderColor: "var(--border)" }}
          >
            <p
              className="font-mono"
              style={{ fontSize: "12px", color: "var(--accent)" }}
            >
              {tool.category}
            </p>
            <p
              className="mt-2 font-body"
              style={{
                fontSize: "16px",
                color: "var(--text-primary)",
                fontWeight: 500,
              }}
            >
              {tool.name}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
