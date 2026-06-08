"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import CountUp from "@/components/ui/CountUp"

type Particle = { left: string; top: string; size: number; opacity: number; duration: number; delay: number }

function makeParticles(n: number): Particle[] {
  return Array.from({ length: n }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() < 0.5 ? 2 : 1.5,
    opacity: 0.2 + Math.random() * 0.2,
    duration: 8 + Math.random() * 7,
    delay: Math.random() * -15,
  }))
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    setParticles(makeParticles(isMobile ? 30 : 80))

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(".hero-line-1", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, 0)
        .from(".hero-line-2", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, 0.3)
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.9, ease: "power2.out" }, 0.7)
        .from(".hero-stats", { opacity: 0, y: 20, duration: 0.9, ease: "power2.out" }, 1.0)
        .from(".hero-scroll", { opacity: 0, duration: 0.8, ease: "power2.out" }, 1.4)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(232,160,32,0.04), transparent)" }}
      />
      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "var(--text-muted)",
              opacity: p.opacity,
              animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <h1
          className="hero-line-1 font-display"
          style={{ fontSize: "clamp(52px, 9vw, 100px)", fontWeight: 300, lineHeight: 1.02, color: "var(--text-primary)" }}
        >
          Generalist by design.
        </h1>
        <h1
          className="hero-line-2 font-display"
          style={{ fontSize: "clamp(52px, 9vw, 100px)", fontWeight: 300, lineHeight: 1.02, color: "var(--text-primary)" }}
        >
          Entrepreneur by behavior.
        </h1>

        <p
          className="hero-sub mt-10 font-body"
          style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "480px", lineHeight: 1.6 }}
        >
          I turn ambiguous startup problems into simple, scalable systems.
        </p>

        <div className="hero-stats mt-16 flex gap-12 md:gap-20">
          {[
            { n: 89, l: "E-Notes" },
            { n: 11, l: "Projects" },
            { n: 12, l: "Clients" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-mono" style={{ fontSize: "32px", color: "var(--accent)", lineHeight: 1 }}>
                <CountUp target={s.n} />
              </div>
              <div
                className="mt-2 font-body uppercase"
                style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.15em" }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          scroll
        </span>
        <div style={{ position: "relative", width: 1, height: 40, background: "var(--border)" }}>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: -1.5,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "var(--accent)",
              animation: "scrollDot 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  )
}
