import type { Metadata } from "next"
import { tools, toolCategories } from "@/data/tools"
import ToolsClient from "./ToolsClient"

export const metadata: Metadata = {
  title: "Tools",
  description: "The 23 tools actually in the stack, and one line each on why.",
}

export default function ToolsPage() {
  return (
    <main className="relative z-[2] mx-auto max-w-[1180px] px-6 pt-32 md:px-10 md:pt-40">
      <p className="t-label">Tools</p>
      <h1 className="t-display mt-5" style={{ maxWidth: "22ch" }}>
        The working stack
      </h1>
      <p
        className="mt-6 font-body"
        style={{ maxWidth: "62ch", fontSize: "1.0625rem", lineHeight: 1.75, color: "var(--text-dim)" }}
      >
        {tools.length} tools across {toolCategories.length} categories. Each one has a line on why
        it is here — not what the vendor claims it does.
      </p>

      <ToolsClient tools={tools} categories={toolCategories} />
    </main>
  )
}
