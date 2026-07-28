"use client"

import { useMemo, useState } from "react"
import type { Tool, ToolCategory } from "@/data/tools"

export default function ToolsClient({
  tools,
  categories,
}: {
  tools: Tool[]
  categories: ToolCategory[]
}) {
  const [active, setActive] = useState<string>("all")

  const grouped = useMemo(() => {
    const cats = active === "all" ? categories : (categories.filter((c) => c === active) as ToolCategory[])
    return cats
      .map((c) => ({ category: c, items: tools.filter((t) => t.category === c) }))
      .filter((g) => g.items.length > 0)
  }, [tools, categories, active])

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-2">
        <button className="chip" data-active={active === "all" ? "1" : undefined} onClick={() => setActive("all")}>
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className="chip"
            data-active={active === c ? "1" : undefined}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-14">
        {grouped.map((g) => (
          <section key={g.category}>
            <div className="flex items-baseline gap-4">
              <h2 className="t-label" style={{ color: "var(--accent-dim)" }}>{g.category}</h2>
              <span className="t-meta">{g.items.length}</span>
            </div>

            <ul className="mt-5 grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden" }}>
              {g.items.map((t) => (
                <li key={t.name} style={{ background: "var(--surface)", padding: "1.4rem 1.4rem" }}>
                  <p className="font-mono" style={{ fontSize: "0.9375rem", color: "var(--text)", letterSpacing: "-0.01em" }}>
                    {t.name}
                  </p>
                  <p
                    className="mt-2 font-body"
                    style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-dim)" }}
                  >
                    {t.why}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
