import Link from "next/link"

export default function NotFound() {
  return (
    <main className="sheet" style={{ paddingTop: 140, paddingBottom: 90 }}>
      <span className="lbl">404</span>
      <h1 className="t-h2" style={{ marginTop: 14 }}>
        Nothing filed here
      </h1>
      <p className="t-first" style={{ marginTop: 16, maxWidth: "44ch" }}>
        The page moved, or it never existed. Both happen.
      </p>
      <p className="meta-sent" style={{ marginTop: 22, lineHeight: 2.2 }}>
        <Link href="/" className="link">Krama</Link>
        {" · "}
        <Link href="/darshana" className="link">the archive</Link>
        {" · "}
        <Link href="/kriya" className="link">what I&rsquo;m building</Link>
      </p>
    </main>
  )
}
