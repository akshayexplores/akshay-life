# Littlebird -> akshay.life

Paste the block below into the Littlebird routine instructions. It tells
Littlebird what to write into the vault when it notices a new tool or project
in the day's work, so `/krama` and `/tools` update themselves the same way
`/darshana` already does.

Pipeline: **Littlebird observes -> Notion -> Obsidian (akshay-brain) ->
nightly sync -> site rebuild.** Nothing new is needed on the site side; the
sync script already reads these folders.

---

## The prompt

> **Publishing to akshay.life**
>
> Alongside the daily entry, watch for two things worth putting on Akshay's
> public site. Only act when the bar below is met. A thin entry is worse than
> no entry, because the site's whole claim is that nothing on it is inflated.
>
> ### A new tool
>
> Trigger: a tool appears in his actual working day **three or more times
> across at least two different days**. One trial does not count. Evaluating
> something does not count.
>
> Create `Site/Tools/<slug>.md` in the vault:
>
> ```
> ---
> name: "N8N"
> category: Automation
> why: "Self-hosted, so the workflows that run the business aren't renting their existence from a vendor."
> ---
> ```
>
> `category` must be exactly one of: `Automation`, `CRM`, `No-Code`, `Dev`,
> `Productivity`, `Marketing`, `Design`, `AI`. Anything else is rejected.
>
> `why` is the hard part and the only reason the page exists. Write **why it
> earns its place in his stack**, in his voice, from what you actually observed
> him doing with it. Not what the vendor says it does. Not a feature list. One
> sentence, concrete. If you cannot write that sentence from observation, do
> not create the file - note it in the daily entry and let him write it.
>
> ### A new project
>
> Trigger: a distinct body of work with a **name** and an **outcome you can
> state**. Work in progress qualifies only if `status: in-progress` is honest.
>
> Create `Site/Projects/<slug>.md`:
>
> ```
> ---
> title: "Dapp"
> org: "Self-built"
> status: shut-down
> summary: "A hyperlocal dating app for a closed college community, built on GlideApps."
> outcome: "100+ paying users. Shut down in month two - the unit economics did not work."
> stack: [GlideApps, No-Code, Community]
> featured: false
> relationship: ""
> ---
> ```
>
> `status` must be exactly one of: `shipped`, `shut-down`, `precursor`,
> `live`, `in-progress`.
>
> **`outcome` is mandatory and the sync rejects the file without it.** State
> what actually happened, including failure. "Shut down in month two" is a
> better entry than "launched successfully". Never write a number you did not
> observe - no invented user counts, revenue, or percentages. If you know
> something happened but not the figure, describe it without one.
>
> Use `relationship` to disclose anything non-obvious about his standing, e.g.
> `"Consultant, not an employee. No equity held."` Leave it empty if there is
> nothing to disclose. Getting this wrong is worse than omitting the project.
>
> ### A build-log entry
>
> When what he is actively building shifts, create or update
> `Site/Kriya/<slug>.md`:
>
> ```
> ---
> label: "OrgIntel"
> title: "Organisational memory as a living system"
> date: 2026-07-29
> active: true
> ---
> Companies lose their memory as they scale - every rep who leaves takes the
> context with them. Pivoted from product-first to service-first, because the
> sequence has to be proven on real engagements before it becomes software.
> ```
>
> Set `active: false` when he stops working on it rather than deleting the
> file - that keeps the history. `date` drives the "last updated" stamp on the
> page, so it must be the date the entry genuinely changed.
>
> ### Never
>
> - Never invent a metric, date, client name, or outcome.
> - Never publish revenue, receivables, client concentration, runway, or
>   hiring plans. That is private operating detail.
> - Never use agency vocabulary: leverage (as a verb), synergy, unlock, 10x,
>   game-changer, world-class, deep dive.
> - Never name a client without an existing public association.
> - If something would embarrass him if a prospect read it aloud, leave it in
>   the private daily entry.

---

## What the sync does with these

`scripts/sync-site-content.py` reads the three folders and writes
`content/projects.json`, `content/tools.json`, `content/kriya.json`. It
**refuses bad input rather than publishing it**:

| Input | Result |
|---|---|
| Project with no `outcome` | Skipped, logged |
| Tool whose `why` is under 20 characters | Skipped, logged |
| Category or status off the allowed list | Skipped, logged |
| Malformed JSON in the fallback files | Skipped; existing content kept |
| Folder absent entirely | Site falls back to `src/data` defaults |

Skips appear in the workflow log, so a rejected entry is visible rather than
silently missing. The weekly `krama-site-health` task surfaces them too.

## Draft -> published

`scripts/mark-published.py` runs after the insight sync. It sets
`status: published` in the **site's** copy and stamps `publishedAt` with the
date the piece first appeared. It never writes to akshay-brain: the vault
records intent, the site records publication. Re-running is a no-op.
