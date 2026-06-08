import type { Metadata } from "next"
import { Cormorant, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import "splitting/dist/splitting.css"
import SmoothScroll from "@/components/SmoothScroll"
import Cursor from "@/components/Cursor"
import Nav from "@/components/Nav"
import ScrollProgress from "@/components/ui/ScrollProgress"
import PageTransition from "@/components/PageTransition"

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Akshay Sajeev — Generalist by design. Entrepreneur by behavior.",
  description:
    "I turn ambiguous startup problems into simple, scalable systems. Notes, projects, and tools from a generalist operator.",
  metadataBase: new URL("https://akshay.life"),
  openGraph: {
    title: "Akshay Sajeev — akshay.life",
    description: "I turn ambiguous startup problems into simple, scalable systems.",
    url: "https://akshay.life",
    siteName: "akshay.life",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Cursor />
        <ScrollProgress />
        <SmoothScroll>
          <Nav />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
