"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import AnimatedText from "@/components/ui/AnimatedText"
import { tools, toolCategories } from "@/data/tools"

export default function Tools() {
  const [active, setActive] = useState<(typeof toolCategories)[number]>("All")
  const filtered = active === "All" ? tools : tools.filter((t) => t.category === active)

  return (
    <section id="tools" className="py-32 md:py-48" style={{ background: "var(--bg-primary)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <span className="text-label">05 / 06</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <AnimatedText as="h2" text="23 tools I rely on." className="font-display text-display" style={{ color: "var(--text-primary)" }} />

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-3">
          {toolCategories.map((c) => (
            <button
              key={c}
              data-cursor-hover
              onClick={() => setActive(c)}
              className="font-mono"
              style={{
                fontSize: "11px",
                padding: "8px 18px",
                borderRadius: "999px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active === c ? "var(--bg-primary)" : "var(--text-secondary)",
                background: active === c ? "var(--accent)" : "transparent",
                border: `1px solid ${active === c ? "var(--accent)" : "var(--border)"}`,
                transition: "all 0.25s var(--ease-out)",
                cursor: "none",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Pills */}
        <motion.div layout className="mt-10 flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((t) => (
              <motion.span
                key={t.name}
                layout
                data-cursor-hover
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="tool-pill font-mono"
                style={{
                  fontSize: "13px",
                  padding: "11px 20px",
                  borderRadius: "999px",
                  color: "var(--text-primary)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  letterSpacing: "0.04em",
                }}
              >
                {t.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
