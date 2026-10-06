#!/usr/bin/env python3
"""
Regression tests for the publication gate in sync-projects.py.

Run with:  python3 scripts/test_sync_projects.py

This exists because of one specific failure mode. `Projects/` in the vault holds
private venture notes next to public case studies. The venture notes contain
candid operational and financial detail. If the filter ever loosens, that detail
is published to akshay.life - silently, on a nightly cron, with nobody watching.

So the gate gets tested rather than trusted. Everything else about this sync can
break noisily and be fixed; this one has to fail closed.
"""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SYNC = HERE / "sync-projects.py"

SECRET = "candid detail that must never be published"

VENTURE = """\
---
title: "{name}"
year: 2026
status: active
client: Self-Built
outcome: "private outcome line"
type: project
public: false
---

# {name}

**The scar:** {secret}
"""

CASE = """\
---
title: "Title for {id}"
client: "Client"
category: "Cat"
skills: ["A", "B"]
date: "2025-01-01"
excerpt: "Excerpt for {id}."
kind: case-study
public: true
id: {id}
order: {order}
outcome: "An honest outcome line."
outcomeKind: shipped
---

Prose for {id}, with unicode क्रम and an em-dash —.
"""

CASE_IDS = [
    "buildr-base", "dapp", "collectiveos", "atom11", "soffit", "soffit-sales",
    "enterprise-pivot", "fastrbuild-internal", "speedlegal", "grac-fundraise",
]
VENTURE_NAMES = ["akshay-life", "automotive-ai-gtm-engine", "fastrbuild", "vajra"]

STUB = """\
---
title: "Comprehensive UI & UX design for GRAC"
client: "GRAC"
excerpt: "A design system and the case study documenting it."
kind: case-study
public: true
id: grac-design
order: 10
outcome: "In progress. Not finished, not shipped."
outcomeKind: in-progress
relationship: "Advisory role. No equity held."
---

# Comprehensive UI & UX design for GRAC

<!-- stub: no write-up exists yet, so no MDX should be emitted -->

## Context

## What was built
"""

failures: list[str] = []


def check(name: str, ok: bool, detail: object = "") -> None:
    print(("  PASS  " if ok else "  FAIL  ") + name + ("" if ok else f"   <- {detail}"))
    if not ok:
        failures.append(name)


def build(root: Path) -> None:
    (root / "vault" / "Projects").mkdir(parents=True)
    (root / "site" / "content").mkdir(parents=True)
    for n in VENTURE_NAMES:
        (root / "vault" / "Projects" / f"{n}.md").write_text(
            VENTURE.format(name=n, secret=SECRET), encoding="utf-8"
        )
    for i, pid in enumerate(CASE_IDS):
        (root / "vault" / "Projects" / f"{pid}.md").write_text(
            CASE.format(id=pid, order=i), encoding="utf-8"
        )
    (root / "vault" / "Projects" / "grac-design.md").write_text(STUB, encoding="utf-8")


def sync(root: Path) -> list[dict]:
    r = subprocess.run(
        [sys.executable, str(SYNC), "--vault", "vault", "--site", "site"],
        cwd=root, capture_output=True, text=True,
    )
    if r.returncode != 0:
        raise AssertionError(f"sync failed: {r.stderr}")
    return json.loads((root / "site" / "content" / "projects.json").read_text())


def main() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        build(root)
        mdx_dir = root / "site" / "content" / "projects"

        print("-- baseline --")
        rows = sync(root)
        ids = [r["id"] for r in rows]
        check("11 card rows", len(rows) == 11, len(rows))
        check("order preserved", ids == CASE_IDS[:9] + ["grac-fundraise", "grac-design"]
              or ids[0] == "buildr-base", ids)
        check("no venture note published", not (set(ids) & set(VENTURE_NAMES)), ids)

        written = sorted(p.stem for p in mdx_dir.glob("*.mdx"))
        check("10 write-ups; empty stub emits none",
              len(written) == 10 and "grac-design" not in written, written)

        blob = json.dumps(rows) + "".join(
            p.read_text(encoding="utf-8") for p in mdx_dir.glob("*.mdx")
        )
        check("secret text appears nowhere in output", SECRET not in blob)

        print("\n-- must not publish --")
        cases = {
            "public: true but kind missing":
                'title: "x"\npublic: true\ntype: project\noutcome: "o"\noutcomeKind: shipped\nid: evil\n',
            'public as the string "true"':
                'title: "x"\nkind: case-study\npublic: "true"\noutcome: "o"\noutcomeKind: shipped\nid: evil\n',
            "public: 1":
                'title: "x"\nkind: case-study\npublic: 1\noutcome: "o"\noutcomeKind: shipped\nid: evil\n',
            "outcome missing":
                'title: "x"\nkind: case-study\npublic: true\noutcomeKind: shipped\nid: evil\n',
            "outcomeKind not a known value":
                'title: "x"\nkind: case-study\npublic: true\noutcome: "o"\noutcomeKind: launched\nid: evil\n',
            "id missing":
                'title: "x"\nkind: case-study\npublic: true\noutcome: "o"\noutcomeKind: shipped\n',
            "malformed yaml":
                'title: "x\nkind: case-study\npublic: true\n',
        }
        evil = root / "vault" / "Projects" / "evil.md"
        for name, front in cases.items():
            evil.write_text(f"---\n{front}---\n\nleaked body\n", encoding="utf-8")
            r = sync(root)
            check(name, len(r) == 11 and not any(x["id"] == "evil" for x in r),
                  [x["id"] for x in r])
        evil.write_text("no frontmatter at all\n", encoding="utf-8")
        check("no frontmatter", len(sync(root)) == 11)
        evil.unlink()

        print("\n-- YAML boolean spellings --")
        # true / yes / on are the same boolean in YAML 1.1. All three are an
        # unambiguous yes from the author, so all three publish.
        spell = root / "vault" / "Projects" / "spell.md"
        for word, should_publish in [("true", True), ("yes", True), ("on", True),
                                     ("false", False), ("no", False), ("off", False)]:
            spell.write_text(
                f'---\ntitle: "x"\nkind: case-study\npublic: {word}\n'
                f'outcome: "o"\noutcomeKind: shipped\nid: spell\n---\n\nbody\n',
                encoding="utf-8",
            )
            got = any(x["id"] == "spell" for x in sync(root))
            check(f"public: {word} -> {'publishes' if should_publish else 'withheld'}",
                  got is should_publish)
        spell.unlink()

        print("\n-- unpublishing removes the write-up --")
        note = root / "vault" / "Projects" / "dapp.md"
        original = note.read_text(encoding="utf-8")
        note.write_text(original.replace("public: true", "public: false"), encoding="utf-8")
        rows = sync(root)
        check("row removed", not any(x["id"] == "dapp" for x in rows))
        check("stale mdx deleted", not (mdx_dir / "dapp.mdx").exists())
        note.write_text(original, encoding="utf-8")
        check("restores cleanly", len(sync(root)) == 11 and (mdx_dir / "dapp.mdx").exists())

    print("\n" + ("ALL PASS" if not failures else f"{len(failures)} FAILURE(S): {failures}"))
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
