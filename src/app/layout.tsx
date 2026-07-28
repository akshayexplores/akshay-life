import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import SmoothScroll from "@/components/SmoothScroll"
import ScrollProgress from "@/components/ScrollProgress"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE = "https://akshay.life"
const TAGLINE = "I enter ambiguous spaces, find the signal, and build the system that scales it."

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Akshay Sajeev — akshay.life",
    template: "%s — akshay.life",
  },
  description: TAGLINE,
  openGraph: {
    title: "Akshay Sajeev — akshay.life",
    description: TAGLINE,
    url: SITE,
    siteName: "akshay.life",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshay Sajeev — akshay.life",
    description: TAGLINE,
    creator: "@AkshayExplores",
  },
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
  authors: [{ name: "Akshay Sajeev", url: SITE }],
  creator: "Akshay Sajeev",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akshay Sajeev",
  url: SITE,
  jobTitle: "Founder, FastrBuild Intelligence",
  description: TAGLINE,
  sameAs: ["https://x.com/AkshayExplores", "https://github.com/akshayexplores"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="scanlines">
        <SmoothScroll />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
