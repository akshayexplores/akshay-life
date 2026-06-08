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
        <AnimatedText as="h2" text="23 tools I rely on." className="font-display tools-h2" />
        <style jsx>{`
          :global(.tools-h2) { font-size: clamp(34px, 6vw, 64px); font-weight: 400; color: var(--text-primary); line-height: 1.05; }
        `}</style>

        <div className="mt-12 flex flex-wrap gap-3">
          {toolCategories.map((c) => (
            <button
              key={c}
              data-cursor-hover
              onClick={() => setActive(c)}
              className="font-mono"
              style={{
                fontSize: "12px",
                padding: "8px 16px",
                borderRadius: "999px",
                letterSpacing: "0.05em",
                color: active === c ? "var(--bg-primary)" : "var(--text-secondary)",
                background: active === c ? "var(--accent)" : "transparent",
                border: `1px solid ${active === c ? "var(--accent)" : "var(--border)"}`,
                transition: "all 0.3s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((t) => (
              <motion.span
                key={t.name}
                layout
                data-cursor-hover
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04 }}
                className="tool-pill font-mono"
                style={{
                  fontSize: "14px",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  color: "var(--text-primary)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                {t.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        <style jsx global>{`
          .tool-pill { transition: background 0.3s, border-color 0.3s; }
          .tool-pill:hover { background: rgba(232,160,32,0.15) !important; border-color: var(--accent) !important; }
        `}</style>
      </div>
    </section>
  )
}
