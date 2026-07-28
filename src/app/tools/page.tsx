import type { Metadata } from "next"
import { tools, toolCategories } from "@/data/tools"
import ToolsClient from "./ToolsClient"

export const metadata: Metadata = {
  title: "Tools",
  description: "The working stack, and one line each on why it is actually here.",
}

export default function ToolsPage() {
  return (
    <main className="sheet" style={{ paddingTop: 116 }}>
      <section style={{ paddingBottom: 34, borderBottom: "1px solid var(--rule)" }}>
        <span className="lbl">The stack</span>
        <h1 className="t-h2" style={{ marginTop: 14, maxWidth: "24ch" }}>
          What&rsquo;s actually open on the machine
        </h1>
        <p className="t-first" style={{ marginTop: 18, maxWidth: "60ch" }}>
          Each one has a line on why it is here — not what the vendor claims it does.
        </p>
      </section>

      <ToolsClient tools={tools} categories={toolCategories} />
    </main>
  )
}
