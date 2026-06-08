"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

const EASE_IN  = [0.76, 0, 0.24, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} style={{ position: "relative" }}>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.52, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
        >
          {children}
        </motion.div>

        {/* Amber curtain — starts covering screen, then slides up off */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9995,
            background: "var(--accent)",
            pointerEvents: "none",
          }}
          initial={{ y: "0%" }}
          animate={{ y: "-105%", transition: { duration: 0.65, ease: EASE_IN, delay: 0.08 } }}
          exit={{ y: "0%", transition: { duration: 0.5, ease: EASE_IN } }}
        />

        {/* Dark overlay behind curtain so old content isn't visible */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9994,
            background: "var(--bg-primary)",
            pointerEvents: "none",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.01, delay: 0.73 } }}
          exit={{ opacity: 1, transition: { duration: 0.01 } }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
