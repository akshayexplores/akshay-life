import { ImageResponse } from "next/og"

export const alt = "Krama — Akshay Sajeev"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2EDE3",
          padding: "76px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* the ascent */}
          <svg width="96" height="96" viewBox="0 0 256 256" fill="none">
            <path d="M22 226 H92 V156 H162 V86 H226" stroke="#1A1714" strokeWidth="15" strokeLinecap="square" />
            <circle cx="226" cy="86" r="17" fill="#C0562F" />
          </svg>

          <div style={{ display: "flex", marginTop: 34, fontSize: 96, fontWeight: 400, letterSpacing: "-3px", color: "#1A1714" }}>
            Krama
          </div>

          <div style={{ display: "flex", marginTop: 22, fontSize: 38, lineHeight: 1.35, color: "#4A423A", maxWidth: 880 }}>
            I look for the pattern behind the mess. Then I build the thing that holds it.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "5px", color: "#8E3A1B" }}>
            AKSHAY SAJEEV
          </div>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: "3px", color: "#8B7D6F" }}>
            akshay.life
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
