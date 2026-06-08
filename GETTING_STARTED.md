# akshay.life

Scroll-driven personal site for Akshay Sajeev. Next.js 16 (App Router, TS) · Tailwind v4 · GSAP + ScrollTrigger · Lenis smooth scroll · Framer Motion. Content is MDX/markdown in `/content`.

## Run locally

The dependency folder was generated in a sandbox and should be regenerated on your machine:

```bash
rm -rf node_modules
npm install
npm run dev      # http://localhost:3000
```

Then build to verify:

```bash
npm run build
```

The production build is verified green — 19 routes (home, /notes, /projects, 2 note pages, 11 project pages).

## Deploy

Push to a Git repo and import into Vercel. `vercel.json` is included; Vercel runs `npm install` + `npm run build` automatically. Point the `akshay.life` domain at the project in Vercel's domain settings.

## Editing content

- **Notes** — add `.mdx` files to `content/notes/` (frontmatter: `title, category, date, excerpt`). They appear automatically on `/notes` and the homepage.
- **Projects** — edit the array in `src/data/projects.ts`; add matching `content/projects/<id>.mdx` for the detail page body.
- **Tools** — edit `src/data/tools.ts`.
- **Colors / type** — CSS variables in `src/app/globals.css`.

## Notes on the build

- `next/font` self-hosts Google Fonts at build time, so the build machine needs network access on first build (Vercel and local both have it).
- Markdown is rendered by a small zero-dependency renderer in `src/lib/mdx.ts` (replaced `next-mdx-remote`, which is incompatible with Next 16's Turbopack).
