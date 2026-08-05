#!/usr/bin/env python3
"""
Catch the ways this site silently goes wrong.

1. A subject appears in the vault that has no movement mapping. It falls back
   to Darsana and gets a generic position on the capacity map, with no warning.
2. The build log date on /kriya is hand-maintained and goes stale.
3. Draft status is recorded but never enforced.

Exits non-zero if anything needs attention, so a workflow can surface it.
"""
import datetime
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
INSIGHTS = ROOT / "content" / "insights"
MOVEMENTS = ROOT / "src" / "data" / "movements.ts"
BRAIN = ROOT / "src" / "lib" / "brain.ts"

problems = []

# ── 1. unmapped subjects ────────────────────────────────────────
subjects = set()
drafts = 0
total = 0
for f in sorted(INSIGHTS.glob("*.mdx")):
    t = f.read_text(encoding="utf-8")
    total += 1
    m = re.search(r'^category:\s*"?(.*?)"?\s*$', t, re.M)
    if m:
        subjects.add(m.group(1))
    if re.search(r'^status:\s*"?draft"?\s*$', t, re.M):
        drafts += 1

mapped = set(re.findall(r'"([^"]+)":\s*"(?:darshana|krama|kriya)"', MOVEMENTS.read_text(encoding="utf-8")))
seeded = set(re.findall(r'"([^"]+)":\s*\[\s*-?\d+\s*,\s*-?\d+\s*\]', BRAIN.read_text(encoding="utf-8")))

unmapped = sorted(subjects - mapped)
unseeded = sorted(subjects - seeded)

if unmapped:
    problems.append(
        "Subjects with no movement mapping (they default to Darsana): "
        + ", ".join(unmapped)
        + "  -> add to subjectToMovement in src/data/movements.ts"
    )
if unseeded:
    problems.append(
        "Subjects with no position on the capacity map: "
        + ", ".join(unseeded)
        + "  -> add to SEEDS in src/lib/brain.ts"
    )

# ── 2. stale build log ─────────────────────────────────────────
kj = ROOT / "content" / "kriya.json"
stamp = None
if kj.exists():
    m = re.search(r'"updated"\s*:\s*"([^"]+)"', kj.read_text(encoding="utf-8"))
    stamp = m.group(1) if m else None
else:
    m = re.search(r'updated:\s*"([^"]+)"', (ROOT / "src" / "lib" / "sources.ts").read_text(encoding="utf-8"))
    stamp = m.group(1) if m else None

if stamp:
    for fmt in ("%d %B %Y", "%d %b %Y"):
        try:
            d = datetime.datetime.strptime(stamp, fmt).date()
            age = (datetime.date.today() - d).days
            if age > 90:
                problems.append(f"Build log on /kriya is {age} days old (says '{stamp}') -> update it or the page is lying")
            break
        except ValueError:
            continue

# ── 3. draft status is ignored ──────────────────────────────────
if drafts:
    problems.append(
        f"{drafts} of {total} pieces are status:draft but the site publishes them anyway "
        "-> either fix the frontmatter in akshay-brain or make the site filter on status"
    )

if problems:
    print("DRIFT CHECK — needs attention:\n")
    for p in problems:
        print("  * " + p)
    sys.exit(1)

print(f"drift check clean — {total} pieces, {len(subjects)} subjects, all mapped and seeded")
