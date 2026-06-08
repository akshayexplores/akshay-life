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
  return (
    <div
      className="journey-panel relative flex w-screen shrink-0 items-center justify-center px-8"
      style={{ height: "100%" }}
    >
      <span
        className="absolute left-8 top-24 font-mono md:left-16"
        style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.1em" }}
      >
        {String(index + 1).padStart(2, "0")} / 05
      </span>
      <div style={{ maxWidth: "680px" }}>
        <p className="font-mono uppercase" style={{ fontSize: "12px", color: "var(--accent)", letterSpacing: "0.15em" }}>
          {ch.label}
        </p>
        <p
          className="mt-8 font-display italic"
          style={{
            fontSize: ch.big ? "clamp(34px, 5vw, 56px)" : "clamp(28px, 4vw, 42px)",
            fontWeight: 300,
            lineHeight: 1.2,
            color: "var(--text-primary)",
          }}
        >
          {ch.quote}
        </p>
        <p
          className="mt-8 font-body"
          style={{ fontSize: ch.big ? "18px" : "16px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "520px" }}
        >
          {ch.body}
        </p>
        {ch.stat && (
          <p className="mt-8 font-mono" style={{ fontSize: "15px", color: "var(--accent)", letterSpacing: "0.04em" }}>
            {ch.stat}
          </p>
        )}
        {ch.outro && (
          <>
            <div className="mt-10" style={{ width: 80, height: 1, background: "var(--border)" }} />
            <p className="mt-6 font-mono" style={{ fontSize: "13px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
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
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (mobile) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const panels = chapters.length
      const tween = gsap.to(track, {
        xPercent: -100 * (panels - 1),
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
      return () => {
        tween.kill()
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="journey" className="relative" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-12">
        <p className="font-mono uppercase" style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.2em" }}>
          Krama
        </p>
        <h2 className="mt-4 font-display" style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 400, color: "var(--text-primary)" }}>
          Progress.
        </h2>
      </div>

      {!mounted || isMobile ? (
        // Mobile / SSR fallback: vertical stack
        <div className="flex flex-col gap-px">
          {chapters.map((ch, i) => (
            <div key={i} className="border-t py-20" style={{ borderColor: "var(--border)", minHeight: "70vh", display: "flex", alignItems: "center" }}>
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
            {/* progress bar */}
            <div className="absolute bottom-12 left-8 right-8 md:left-16 md:right-16" style={{ height: 1, background: "var(--border)" }}>
              <div ref={fillRef} className="h-full origin-left" style={{ background: "var(--accent)", transform: "scaleX(0)" }} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
