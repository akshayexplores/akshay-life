# Coda migration manifest

The legacy site at `akshay.life` is a Coda doc. When the domain is repointed at
Vercel, **these 12 essays go offline.** They are not in `akshay-brain`, so the
daily sync will not bring them across.

Captured 28 July 2026 from `akshay.life/insights-30`. Titles and subjects are
verbatim; the bodies sit behind Coda's JavaScript renderer and were not
retrievable programmatically.

## Status

**Not migrated.** Bodies must be exported by hand (Coda → ··· → Export → Markdown)
or rewritten. Per the field manual §04, the opening line and central claim of
each piece are `[HUMAN_REQUIRED]` — an assistant may reformat and add
frontmatter, but may not author them.

## The 12

| # | Title | Coda subject | Proposed slug | Movement |
|---|-------|--------------|---------------|----------|
| 1 | The Pain of Becoming Yourself | Leadership | `the-pain-of-becoming-yourself` | Darśana |
| 2 | 7 Frameworks to Speak Like a Consultant | Leadership, Sales | `frameworks-to-speak-like-a-consultant` | Krama |
| 3 | You Don't Have a Marketing Problem. You Have a Strategy Problem. | Marketing, Leadership | `not-a-marketing-problem` | Darśana |
| 4 | How to Generate Content That People Actually Remember | Marketing | `content-people-actually-remember` | Krama |
| 5 | You're Prompting AI Wrong. Here's Why. | Data Science & AI | `youre-prompting-ai-wrong` | Kriyā |
| 6 | 4 Design Sites I Keep Going Back To | Design | `design-sites-i-keep-going-back-to` | Krama |
| 7 | Sales Navigator Is a $1,200/Year Research Assistant. Claude Does It in 2 Minutes. | Sales, Data Science & AI | `sales-navigator-vs-claude` | Kriyā |
| 8 | The Cold Email Formula That Doesn't Feel Like a Cold Email | Sales, Marketing | `cold-email-that-doesnt-feel-cold` | Krama |
| 9 | Your Startup's Financial Model Is Lying to You | Finance & Operations, Leadership | `your-financial-model-is-lying` | Darśana |
| 10 | CASM: The Learning Style Nobody Told You About | Leadership | `casm-learning-style` | Darśana |
| 11 | The VC Boom Is Bigger Than Ever. That's Not Entirely Good News. | Finance & Operations, Leadership | `the-vc-boom-is-not-entirely-good-news` | Darśana |
| 12 | Why 'Just Running Ads' Is a Strategy for Losing Money | Marketing | `just-running-ads-loses-money` | Darśana |

## How to bring one across

1. Export the body from Coda as Markdown.
2. Drop it in `akshay-brain` under `Insights/<Subject>/` with frontmatter
   matching the existing files — `title`, `category`, `type: insight`,
   `status`, `slug`, `excerpt`, `date`, `tags`. The daily GitHub Action syncs
   it into `content/insights/` from there.
3. The movement is derived from `category` via `src/data/movements.ts`. Two
   Coda subjects are **not** in that map and would fall through to Darśana:
   `Data Science & AI` (items 5 and 7 — map to `kriya`) and
   `Finance & Operations` (items 9 and 11 — map to `darshana`, which the
   fallback already gives, but add it explicitly).

## Also unmigrated

`content/notes/` still holds the old note files. Nothing reads them since the
`/notes` route was removed — `/notes` and `/notes/:slug` now 308 to `/darshana`.
Delete them or fold them into the vault.
