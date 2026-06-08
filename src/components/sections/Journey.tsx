"use client"

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

type Chapter = {
  label: string
  quote: string
  body: string
  stat?: string
  big?: boolean
  outro?: string
}

const chapters: Chapter[] = [
  {
    label: "On Outreach",
    quote: "I've run cold outbound and watched it fail for reasons dashboards couldn't explain.",
    body: "Not because the list was wrong. Not because the copy was bad. Because real sales isn't about volume. It's about timing and trust — and you can't automate your way into either.",
  },
  {
    label: "On Building",
    quote: "I built a hyperlocal dating app that hit 100 paying users in the first month. Then I shut it down.",
    body: "The unit economics didn't make sense. It was the hardest decision I'd made at that point — killing something that was working by every vanity metric but failing by the one that actually mattered.",
    stat: "[100] paying users.  [Month 1].",
  },
  {
    label: "On Leverage",
    quote: "I led the build of a full collective-based work ecosystem. Not a single line of production code.",
    body: "CollectiveOS was the moment I understood what leverage actually felt like. Tools aren't a shortcut. They're force multipliers — but only if you know what you're trying to move.",
  },
  {
    label: "On Survival",
    quote: "I've raised investment twice. Watched one acquisition go through. Lived through a bankruptcy.",
    body: "There's a version of entrepreneurship that looks neat from the outside — pitch decks, term sheets, press releases. The real version is messier. And more honest. And worth every scar.",
  },
  {
    label: "The Constant",
    quote: "Between all of this, I've built and broken a lot.",
    body: "The constant has been learning and evolving in public. Getting more honest each time about what truly creates leverage.",
    big: true,
    outro: "This is that record.",
  },
]

function Panel({ ch, index }: { ch: Chapter; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelRef.current) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const els = panelRef.current!.querySelectorAll(".panel-reveal")
      gsap.fromTo(els,
        { opacity: 0, y: 24, filter: "blur(6px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          }
        }
      )
    }, panelRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={panelRef}
      className="journey-panel relative flex w-screen shrink-0 items-center justify-center px-8"
      style={{ height: "100%" }}
    >
      {/* Chapter number */}
      <span
        className="panel-reveal absolute left-8 top-24 font-mono md:left-16"
        style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.15em" }}
      >
        {String(index + 1).padStart(2, "0")} / 05
      </span>

      <div style={{ maxWidth: "720px" }}>
        {/* Section label */}
        <p className="panel-reveal text-label">
          {ch.label}
        </p>

        {/* Stat numbers — big amber accent */}
        {ch.stat && (
          <p
            className="panel-reveal font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 900,
              color: "var(--accent)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginTop: "2.5rem",
              fontVariationSettings: '"opsz" 72',
            }}
          >
            {ch.stat}
          </p>
        )}

        {/* Quote */}
        <p
          className="panel-reveal font-display"
          style={{
            fontSize: ch.big ? "clamp(2rem, 4.5vw, 4.5rem)" : "clamp(1.6rem, 3.5vw, 3.5rem)",
            fontWeight: ch.big ? 700 : 500,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            marginTop: ch.stat ? "1.5rem" : "2.5rem",
            fontVariationSettings: ch.big ? '"opsz" 72' : '"opsz" 48',
            fontStyle: "italic",
          }}
        >
          {ch.quote}
        </p>

        {/* Body */}
        <p
          className="panel-reveal font-body"
          style={{
            fontSize: ch.big ? "1.125rem" : "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "52ch",
            marginTop: "1.5rem",
          }}
        >
          {ch.body}
        </p>

        {/* Outro */}
        {ch.outro && (
          <>
            <div className="panel-reveal" style={{ width: 60, height: 2, background: "var(--accent)", marginTop: "2.5rem" }} />
            <p className="panel-reveal font-mono" style={{ fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.1em", marginTop: "1rem" }}>
              {ch.outro}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const fillRef    = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (mobile) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        xPercent: -100 * (chapters.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=400%",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fillRef.current) fillRef.current.style.transform = `scaleX(${self.progress})`
          },
        },
      })
      return () => tween.kill()
    }, sectionRef)

    return () => { ctx.revert(); ScrollTrigger.refresh() }
  }, [])

  return (
    <section id="journey" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <span className="text-label">02 / 06</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>
        <p className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Krama
        </p>
        <h2
          className="font-display text-display"
          style={{ color: "var(--text-primary)" }}
        >
          Progress.
        </h2>
      </div>

      {/* Panels */}
      {!mounted || isMobile ? (
        <div className="flex flex-col">
          {chapters.map((ch, i) => (
            <div key={i} className="border-t py-20 px-8" style={{ borderColor: "var(--border)", minHeight: "70vh", display: "flex", alignItems: "center" }}>
              <Panel ch={ch} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div ref={sectionRef} style={{ height: "100vh", overflow: "hidden" }}>
          <div className="relative h-full">
            <div ref={trackRef} className="flex h-full" style={{ width: `${chapters.length * 100}vw` }}>
              {chapters.map((ch, i) => (
                <Panel key={i} ch={ch} index={i} />
              ))}
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-12 left-8 right-8 md:left-16 md:right-16" style={{ height: 1, background: "var(--border)" }}>
              <div ref={fillRef} className="h-full origin-left" style={{ background: "var(--accent)", transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
