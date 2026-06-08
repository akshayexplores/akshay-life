"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"
import CountUp from "@/components/ui/CountUp"

// ─────────────────────────────────────────────────────────────────────────
// ASSET SLOT
// Swap null → "/images/hero.jpg" (or .mp4 for video) once you have the file.
// Recommended: 1920×1080 landscape photo or looping video, high contrast.
// ─────────────────────────────────────────────────────────────────────────
const HERO_IMAGE: string | null = null
const HERO_VIDEO: string | null = null  // e.g. "/videos/hero-loop.mp4"

type Particle = { left: string; top: string; size: number; opacity: number; duration: number; delay: number }

function makeParticles(n: number): Particle[] {
  return Array.from({ length: n }, () => ({
    left: `${Math.random() * 100}%`,
    top:  `${Math.random() * 100}%`,
    size: Math.random() < 0.4 ? 2 : 1.5,
    opacity: 0.15 + Math.random() * 0.2,
    duration: 10 + Math.random() * 8,
    delay: Math.random() * -18,
  }))
}

export default function Hero() {
  const root       = useRef<HTMLElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    setParticles(makeParticles(isMobile ? 25 : 65))

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      gsap.set(".hero-line-1, .hero-line-2, .hero-name, .hero-sub, .hero-stats, .hero-scroll", { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Clip-path line reveals
      const tl = gsap.timeline({ delay: 0.15 })

      tl.fromTo(".hero-name",
        { clipPath: "inset(0 0 100% 0)", y: 12 },
        { clipPath: "inset(0 0 0% 0)",   y: 0, duration: 0.7, ease: "power4.out" },
        0
      )
      tl.fromTo(".hero-line-1",
        { clipPath: "inset(0 0 100% 0)", y: 16 },
        { clipPath: "inset(0 0 0% 0)",   y: 0, duration: 0.9, ease: "power4.out" },
        0.12
      )
      tl.fromTo(".hero-line-2",
        { clipPath: "inset(0 0 100% 0)", y: 16 },
        { clipPath: "inset(0 0 0% 0)",   y: 0, duration: 0.9, ease: "power4.out" },
        0.22
      )
      tl.fromTo(".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.7
      )
      tl.fromTo(".hero-stats",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.9
      )
      tl.fromTo(".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        1.3
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: "100svh", paddingBottom: "clamp(3rem, 8vh, 6rem)" }}
    >
      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
        {HERO_VIDEO ? (
          <>
            <video
              src={HERO_VIDEO}
              autoPlay muted loop playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                       filter: "grayscale(0.5) contrast(1.1) brightness(0.85)" }}
            />
            {/* Grade overlays */}
            <div style={{ position: "absolute", inset: 0, background: "#0A0908", mixBlendMode: "multiply", opacity: 0.5 }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 55% at 80% 15%, #EBA427 0%, transparent 65%)", mixBlendMode: "screen", opacity: 0.2 }} />
          </>
        ) : HERO_IMAGE ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMAGE} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                                                   filter: "grayscale(0.5) contrast(1.1) brightness(0.85)" }} />
            <div style={{ position: "absolute", inset: 0, background: "#0A0908", mixBlendMode: "multiply", opacity: 0.5 }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 55% at 80% 15%, #EBA427 0%, transparent 65%)", mixBlendMode: "screen", opacity: 0.2 }} />
          </>
        ) : (
          /* Cinematic placeholder gradient */
          <div
            style={{
              position: "absolute", inset: 0,
              background: `
                radial-gradient(ellipse 45% 40% at 82% 12%, rgba(235,164,39,0.14) 0%, transparent 60%),
                radial-gradient(ellipse 30% 50% at 10% 90%, rgba(235,164,39,0.05) 0%, transparent 55%),
                linear-gradient(165deg, #181208 0%, #0E0C08 25%, #0A0908 55%, #0C0A07 80%, #0A0908 100%)
              `,
            }}
          />
        )}

        {/* Ambient amber glow (animated) */}
        <div
          style={{
            position: "absolute",
            top: "-10%", right: "-5%",
            width: "55%", height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(235,164,39,0.09) 0%, transparent 70%)",
            animation: "ambientPulse 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              borderRadius: "50%",
              background: "var(--text-muted)",
              opacity: p.opacity,
              animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Bottom gradient fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
          background: "linear-gradient(to top, var(--bg-primary), transparent)",
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">

        {/* Name label */}
        <div className="hero-name mb-6" style={{ clipPath: "inset(0 0 100% 0)" }}>
          <span className="text-label" style={{ color: "var(--accent)" }}>
            Akshay Sajeev
          </span>
        </div>

        {/* Main headline */}
        <div style={{ overflow: "hidden" }}>
          <h1
            className="hero-line-1 font-display text-hero"
            style={{ clipPath: "inset(0 0 100% 0)", color: "var(--text-primary)" }}
          >
            Generalist
          </h1>
        </div>
        <div style={{ overflow: "hidden" }}>
          <h1
            className="hero-line-2 font-display text-hero"
            style={{ clipPath: "inset(0 0 100% 0)", color: "var(--text-primary)" }}
          >
            by design.
          </h1>
        </div>

        <div
          className="mt-8 md:mt-10"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: "3rem",
          }}
        >
          <p
            className="hero-sub font-body"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", color: "var(--text-secondary)", maxWidth: "44ch", lineHeight: 1.65, opacity: 0 }}
          >
            I turn ambiguous startup problems into simple, scalable systems.
            <span className="font-display" style={{ fontStyle: "italic", color: "var(--accent-warm)", fontVariationSettings: '"opsz" 24' }}>
              {" "}Entrepreneur by behavior.
            </span>
          </p>

          {/* Stats */}
          <div className="hero-stats flex gap-8 md:gap-12" style={{ opacity: 0 }}>
            {[
              { n: 89,  l: "E-Notes"  },
              { n: 11,  l: "Projects" },
              { n: 12,  l: "Clients"  },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "right" }}>
                <div className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: "var(--accent)", lineHeight: 1, fontVariationSettings: '"opsz" 48' }}>
                  <CountUp target={s.n} />
                </div>
                <div className="text-label mt-2" style={{ color: "var(--text-muted)" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="hero-scroll absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          scroll
        </span>
        <div style={{ position: "relative", width: 1, height: 44, background: "var(--border)" }}>
          <span
            style={{
              position: "absolute", top: 0, left: -2,
              width: 5, height: 5, borderRadius: "50%",
              background: "var(--accent)",
              animation: "scrollDot 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* ── Section number ── */}
      <div className="absolute bottom-10 right-6 z-10 hidden md:block" style={{ right: "max(1.5rem, calc(50% - 700px + 3rem))" }}>
        <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.15em" }}>
          00 / 06
        </span>
      </div>
    </section>
  )
}
