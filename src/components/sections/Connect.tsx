"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const socials = [
  { label: "Twitter", value: "@AkshayExplores", href: "https://twitter.com/AkshayExplores" },
  { label: "LinkedIn", value: "/in/akshayexplores", href: "https://www.linkedin.com/in/akshayexplores" },
  { label: "FastrBuild", value: "fastrbuild.com", href: "https://fastrbuild.com" },
]

export default function Connect() {
  const [copied, setCopied] = useState(false)
  const email = "akshay@fastrbuild.com"

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="connect" className="flex items-center py-40 md:py-56" style={{ background: "var(--bg-primary)", minHeight: "90vh" }}>
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <p className="font-display" style={{ fontSize: "clamp(34px, 4.5vw, 56px)", fontWeight: 300, maxWidth: "640px", lineHeight: 1.3, color: "var(--text-primary)" }}>
          If you&apos;re sitting on one of those messy, hard-to-define problems —{" "}
          <span className="italic" style={{ color: "var(--accent)" }}>
            I&apos;m the kind of person who enjoys working through that discomfort.
          </span>
        </p>

        <p className="mt-8 font-body" style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.7 }}>
          Turning ambiguity into clarity, structure, and leverage — that&apos;s the work.
        </p>

        <div className="mt-12">
          <button onClick={copy} data-cursor-hover className="email-link font-display" style={{ fontSize: "32px", color: "var(--text-primary)", background: "transparent", position: "relative" }}>
            {email}
          </button>
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="ml-4 font-mono"
                style={{ fontSize: "13px", color: "var(--accent)" }}
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-body" style={{ fontSize: "14px" }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-cursor-hover className="social-link" style={{ color: "var(--text-secondary)", transition: "color 0.3s" }}>
              <span style={{ color: "var(--text-muted)" }}>{s.label} </span>
              {s.value}
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .email-link::after {
          content: ""; position: absolute; left: 0; bottom: -2px; width: 100%; height: 1px;
          background: var(--accent); transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .email-link:hover::after { transform: scaleX(1); }
        .social-link:hover { color: var(--accent) !important; }
      `}</style>
    </section>
  )
}
