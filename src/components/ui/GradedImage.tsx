"use client"

import Image from "next/image"
import { CSSProperties } from "react"

interface GradedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  className?: string
  style?: CSSProperties
  /** Override highlight position: "center" | "top-right" | "bottom-left" */
  highlightPos?: "center" | "top-right" | "bottom-left"
}

const HIGHLIGHT_POSITIONS: Record<string, string> = {
  "center":      "radial-gradient(ellipse 70% 60% at 50% 50%, #EBA427 0%, transparent 70%)",
  "top-right":   "radial-gradient(ellipse 60% 55% at 80% 15%, #EBA427 0%, transparent 65%)",
  "bottom-left": "radial-gradient(ellipse 60% 55% at 20% 85%, #EBA427 0%, transparent 65%)",
}

export default function GradedImage({
  src, alt, fill, width, height, priority, sizes,
  className = "", style, highlightPos = "top-right",
}: GradedImageProps) {
  return (
    <div className={`graded-img-wrap ${className}`} style={style}>
      {fill ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? "100vw"} />
      ) : (
        <Image src={src} alt={alt} width={width ?? 800} height={height ?? 600} priority={priority} sizes={sizes} />
      )}
      <div className="grade-shadow" />
      <div
        className="grade-highlight"
        style={{ background: HIGHLIGHT_POSITIONS[highlightPos] }}
      />
      <div className="grade-vignette" />
    </div>
  )
}

/** Gradient placeholder used when no image src is provided */
export function GradedPlaceholder({
  gradient,
  className = "",
  style,
  children,
}: {
  gradient: string
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}) {
  return (
    <div className={`graded-img-wrap ${className}`} style={style}>
      <div style={{ position: "absolute", inset: 0, background: gradient }} />
      <div className="grade-vignette" />
      {children}
    </div>
  )
}
