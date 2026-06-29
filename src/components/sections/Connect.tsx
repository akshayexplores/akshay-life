"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const socials = [
  { label: "Twitter",    value: "@AkshayExplores",     href: "https://twitter.com/AkshayExplores" },
  { label: "LinkedIn",   value: "/in/akshayexplores",  href: "https://www.linkedin.com/in/akshayexplores" },
  { label: "FastrBuild", value: "fastrbuild.com",       href: "https://fastrbuild.com" },
]

export default function Connect() {
  const [copied, setCopied] = useState(false)
  const email = "akshay@fastrbuild.com"

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* silent */
    }
  }

  return (
    <section id="connect" style={{ background: "var(--bg-primary)", minHeight: "90vh", display: "flex", alignItems: "center", padding: "clamp(5rem, 12vw, 10rem) 0" }}>
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem" }}>
          <span className="text-label">Connect</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Headline */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "var(--text-primary)",
            maxWidth: "18ch",
            fontVariationSettings: '"opsz" 72',
          }}
        >
          If you&apos;re sitting on one of those{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            messy, hard-to-define problems
          </span>{" "}
          —
        </h2>

        <p
          className="font-body"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "var(--text-secondary)", maxWidth: "48ch", lineHeight: 1.7, marginTop: "2rem" }}
        >
          I&apos;m the kind of person who enjoys working through that discomfort.
          Turning ambiguity into clarity, structure, and leverage — that&apos;s the work.
        </p>

        {/* Email */}
        <div style={{ marginTop: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "1rem" }}>
            <button
              onClick={copy}
              data-cursor-hover
              className="email-link font-display"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontVariationSettings: '"opsz" 72',
              }}
            >
              {email}
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="font-mono"
                  style={{ fontSize: "12px", color: "var(--accent)", letterSpacing: "0.1em" }}
                >
                  COPIED ✓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.12em", marginTop: "0.75rem" }}>
            CLICK TO COPY
          </p>
        </div>

        {/* Socials */}
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="social-link font-body"
              style={{ fontSize: "0.9375rem" }}
            >
              <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "0.5rem" }}>
                {s.label}
              </span>
              {s.value}
            </a>
          ))}
        </div>

        {/* Ambient accent block */}
        <div style={{
          marginTop: "5rem",
          padding: "2.5rem 3rem",
          background: "rgba(235,164,39,0.06)",
          border: "1px solid rgba(235,164,39,0.15)",
          borderRadius: "3px",
          maxWidth: "560px",
        }}>
          <p
            className="font-display"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4, fontStyle: "italic", fontVariationSettings: '"opsz" 24' }}
          >
            &ldquo;Generalist by design. Entrepreneur by behavior.&rdquo;
          </p>
          <p className="font-mono" style={{ fontSize: "11px", color: "var(--accent)", marginTop: "1rem", letterSpacing: "0.12em" }}>
            — akshay.life
          </p>
        </div>

      </div>
    </section>
  )
}
