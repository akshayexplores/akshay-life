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
    const cats = active === "all" ? categories : categories.filter((c) => c === active)
    return cats
      .map((c) => ({ category: c, items: tools.filter((t) => t.category === c) }))
      .filter((g) => g.items.length > 0)
  }, [tools, categories, active])

  return (
    <>
      <div style={{ padding: "26px 0 0" }}>
        <span className="lbl">Filter</span>
        <div className="mt-3 flex flex-wrap gap-2">
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
      </div>

      {grouped.map((g, gi) => (
        <div className="entry" key={g.category} style={{ borderTop: gi === 0 ? "1px solid var(--rule)" : undefined, marginTop: gi === 0 ? 26 : 0 }}>
          <div className="rail">
            <span className="no">{String(gi + 1).padStart(2, "0")}</span>
            {g.category}
          </div>
          <div className="col" style={{ maxWidth: "none" }}>
            <ol className="idx">
              {g.items.map((t) => (
                <li key={t.name}>
                  <div className="row">
                    <span>
                      <span style={{ fontSize: 17, color: "var(--masi)", display: "block" }}>{t.name}</span>
                      <span
                        style={{
                          display: "block",
                          fontSize: 15,
                          lineHeight: 1.62,
                          color: "var(--masi-soft)",
                          marginTop: 4,
                          maxWidth: "64ch",
                        }}
                      >
                        {t.why}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </>
  )
}
