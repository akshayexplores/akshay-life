"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    })

    instance.on("scroll", ScrollTrigger.update)

    const update = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    return () => {
      gsap.ticker.remove(update)
      instance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
