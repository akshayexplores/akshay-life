#!/usr/bin/env python3
"""
Sync the non-insight content from akshay-brain into content/.

Insights already have their own script. This covers the three data sets that
were previously hard-coded in the repo, so the vault becomes the single source
of truth for everything the site renders.

Vault contract — akshay-brain/Site/
    projects.json   list of Project objects
    tools.json      list of Tool objects
    kriya.json      { "updated": "29 July 2026", "entries": [ {label,title,body} ] }

A missing file is not an error: the site falls back to the checked-in defaults
in src/data, so nothing breaks before the vault carries these.
"""
import json
import pathlib
import sys

BRAIN = pathlib.Path("akshay-brain")
OUT = pathlib.Path("content")
OUT.mkdir(exist_ok=True)

# (vault file, output file, validator)
FILES = [
    ("projects.json", "projects.json", lambda d: isinstance(d, list) and len(d) > 0),
    ("tools.json",    "tools.json",    lambda d: isinstance(d, list) and len(d) > 0),
    ("kriya.json",    "kriya.json",    lambda d: isinstance(d, dict) and d.get("entries")),
]

# Where to look inside the vault, most specific first.
SEARCH = ["Site", "site", "_site", "."]


def find(name: str):
    for d in SEARCH:
        p = BRAIN / d / name
        if p.is_file():
            return p
    return None


def main() -> int:
    if not BRAIN.is_dir():
        print("akshay-brain not checked out; nothing to sync", file=sys.stderr)
        return 0

    wrote, skipped = [], []
    for src_name, out_name, ok in FILES:
        src = find(src_name)
        if src is None:
            skipped.append(f"{src_name} (not in vault)")
            continue
        try:
            data = json.loads(src.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            # Never let a malformed vault file overwrite good content.
            print(f"SKIP {src_name}: invalid JSON — {e}", file=sys.stderr)
            skipped.append(f"{src_name} (invalid JSON)")
            continue
        if not ok(data):
            print(f"SKIP {src_name}: failed shape check", file=sys.stderr)
            skipped.append(f"{src_name} (bad shape)")
            continue
        (OUT / out_name).write_text(
            json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
        wrote.append(f"{out_name} ({len(data) if isinstance(data, list) else len(data.get('entries', []))} items)")

    print("synced:", ", ".join(wrote) or "nothing")
    if skipped:
        print("skipped:", ", ".join(skipped))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
