import Hero from "@/components/sections/Hero"
import Journey from "@/components/sections/Journey"
import Projects from "@/components/sections/Projects"
import Notes from "@/components/sections/Notes"
import Tools from "@/components/sections/Tools"
import Connect from "@/components/sections/Connect"
import Footer from "@/components/Footer"
import { getAllNotes } from "@/lib/mdx"

export default function Home() {
  const notes = getAllNotes()
  return (
    <main>
      <Hero />
      <Journey />
      <Projects />
      <Notes notes={notes} />
      <Tools />
      <Connect />
      <Footer />
    </main>
  )
}
