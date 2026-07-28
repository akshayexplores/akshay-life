import type { Metadata } from "next"
import { Newsreader, JetBrains_Mono, Noto_Serif_Devanagari } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
})

const SITE = "https://akshay.life"
const LINE = "I look for the pattern behind the mess. Then I build the thing that holds it."

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Krama — Akshay Sajeev",
    template: "%s — Krama",
  },
  description: LINE,
  openGraph: {
    title: "Krama — Akshay Sajeev",
    description: LINE,
    url: SITE,
    siteName: "Krama",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krama — Akshay Sajeev",
    description: LINE,
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
  description: LINE,
  address: { "@type": "PostalAddress", addressLocality: "Thiruvananthapuram", addressCountry: "IN" },
  sameAs: ["https://x.com/AkshayExplores", "https://github.com/akshayexplores"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jetbrains.variable} ${devanagari.variable}`}>
      <head>
        <meta name="theme-color" content="#F2EDE3" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
