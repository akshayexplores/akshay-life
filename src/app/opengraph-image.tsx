import { ImageResponse } from "next/og"

export const alt = "Akshay Sajeev — akshay.life"
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
          background: "#121212",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6A6A6A",
            }}
          >
            Krama · Progress in sequence
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#EDEDED",
            }}
          >
            Akshay Sajeev
          </div>

          <div style={{ display: "flex", width: 128, height: 3, background: "#F2A73B", marginTop: 32 }} />

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 34,
              lineHeight: 1.4,
              color: "#9A9A9A",
              maxWidth: 900,
            }}
          >
            I enter ambiguous spaces, find the signal, and build the system that scales it.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#6A6A6A", letterSpacing: "0.06em" }}>
          akshay.life
        </div>
      </div>
    ),
    { ...size }
  )
}
