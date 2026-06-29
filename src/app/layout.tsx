import type { Metadata } from "next"
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import "splitting/dist/splitting.css"
import SmoothScroll from "@/components/SmoothScroll"
import Cursor from "@/components/Cursor"
import Nav from "@/components/Nav"
import ScrollProgress from "@/components/ui/ScrollProgress"
import PageTransition from "@/components/PageTransition"
import Grain from "@/components/ui/Grain"
import Preloader from "@/components/ui/Preloader"

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
  display: "swap",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Akshay Sajeev — Generalist by design. Entrepreneur by behavior.",
  description: "I turn ambiguous startup problems into simple, scalable systems. Insights, projects, and tools from a generalist operator.",
  metadataBase: new URL("https://akshay.life"),
  openGraph: {
    title: "Akshay Sajeev — akshay.life",
    description: "I turn ambiguous startup problems into simple, scalable systems.",
    url: "https://akshay.life",
    siteName: "akshay.life",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshay Sajeev — akshay.life",
    description: "I turn ambiguous startup problems into simple, scalable systems.",
  },
  alternates: {
    canonical: "https://akshay.life",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akshay Sajeev",
  url: "https://akshay.life",
  jobTitle: "Founder / Chief Buildr",
  worksFor: {
    "@type": "Organization",
    name: "fastrBuild Intelligence",
  },
  sameAs: [
    "https://x.com/AkshayExplores",
    "https://github.com/akshayexplores",
  ],
  description: "Generalist by design. Entrepreneur by behavior. I turn ambiguous startup problems into simple, scalable systems.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Preloader />
        <Grain />
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
