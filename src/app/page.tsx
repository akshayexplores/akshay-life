import Hero from "@/components/sections/Hero"
import Journey from "@/components/sections/Journey"
import Projects from "@/components/sections/Projects"
import Insights from "@/components/sections/Notes"
import Tools from "@/components/sections/Tools"
import Connect from "@/components/sections/Connect"
import Footer from "@/components/Footer"
import { getAllInsights } from "@/lib/mdx"
import { projects } from "@/data/projects"

export default function Home() {
  const insights = getAllInsights()
  const stats = [
    { n: insights.length, l: "Insights" },
    { n: projects.length, l: "Projects" },
    { n: 12, l: "Clients" },
  ]

  return (
    <main>
      <Hero stats={stats} />
      <Journey />
      <Projects />
      <Insights insights={insights} />
      <Tools />
      <Connect />
      <Footer />
    </main>
  )
}
