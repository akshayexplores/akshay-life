#!/usr/bin/env python3
"""
Sync the non-insight content from akshay-brain into content/.

Two input shapes, in order of preference:

  1. Markdown notes with YAML frontmatter - the shape an observational agent
     (Littlebird -> Notion -> Obsidian) can actually maintain, and what
     Obsidian is good at.

         Site/Projects/*.md   Site/Tools/*.md   Site/Kriya/*.md

  2. A single curated JSON file, if you would rather hand-maintain one.

         Site/projects.json   Site/tools.json   Site/kriya.json

Neither present -> the site falls back to the defaults in src/data, so nothing
breaks before the vault carries any of this.

This never writes to akshay-brain. The vault is read-only from here.
"""
from __future__ import annotations

import json
import pathlib
import re
import sys

BRAIN = pathlib.Path("akshay-brain")
OUT = pathlib.Path("content")
OUT.mkdir(exist_ok=True)

SEARCH = ["Site", "site", "_site", "."]
TOOL_CATEGORIES = {"Automation", "CRM", "No-Code", "Dev", "Productivity", "Marketing", "Design", "AI"}
OUTCOME_KINDS = {"shipped", "shut-down", "precursor", "live", "in-progress"}


def parse_note(path: pathlib.Path) -> tuple[dict, str]:
    """Minimal frontmatter reader: scalars, [a, b] inline lists, - a blocks."""
    raw = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", raw, re.S)
    if not m:
        return {}, raw.strip()
    head, body = m.group(1), m.group(2).strip()
    data: dict = {}
    key = None
    for line in head.splitlines():
        if not line.strip():
            continue
        if re.match(r"^\s*-\s+", line) and key:
            data.setdefault(key, [])
            if isinstance(data[key], list):
                data[key].append(line.split("-", 1)[1].strip().strip("\"'"))
            continue
        km = re.match(r'^([A-Za-z_][\w-]*):\s*(.*)$', line)
        if not km:
            continue
        key, val = km.group(1), km.group(2).strip()
        if val == "":
            data[key] = []
        elif val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            data[key] = [v.strip().strip("\"'") for v in inner.split(",") if v.strip()] if inner else []
        else:
            v = val.strip().strip("\"'")
            data[key] = {"true": True, "false": False}.get(v.lower(), v)
    return data, body


def find_dir(name):
    for d in SEARCH:
        p = BRAIN / d / name
        if p.is_dir():
            return p
    return None


def find_file(name):
    for d in SEARCH:
        p = BRAIN / d / name
        if p.is_file():
            return p
    return None


def from_json(name, ok):
    j = find_file(name)
    if not j:
        return None, [f"{name}: not in vault"]
    try:
        data = json.loads(j.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return None, [f"{name}: invalid JSON, refusing to overwrite - {e}"]
    if not ok(data):
        return None, [f"{name}: failed shape check"]
    return data, [f"{name}: accepted"]


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def build_projects():
    d = find_dir("Projects")
    if not d:
        return from_json("projects.json", lambda x: isinstance(x, list) and x)
    rows, log = [], []
    for f in sorted(d.glob("*.md")):
        fm, body = parse_note(f)
        title = fm.get("title") or f.stem
        kind = str(fm.get("status", "")).strip().lower()
        outcome = str(fm.get("outcome") or "").strip()
        if kind not in OUTCOME_KINDS:
            log.append(f"{f.name}: status '{kind}' invalid - skipped")
            continue
        if not outcome:
            log.append(f"{f.name}: no outcome - skipped (a project without an outcome is a claim, not a record)")
            continue
        stack = fm.get("stack") or []
        row = {
            "id": fm.get("id") or slug(title),
            "title": title,
            "org": fm.get("org") or "",
            "summary": str(fm.get("summary") or body.split("\n")[0] or "").strip(),
            "outcome": outcome,
            "outcomeKind": kind,
            "stack": stack if isinstance(stack, list) else [str(stack)],
            "featured": bool(fm.get("featured", False)),
        }
        if fm.get("relationship"):
            row["relationship"] = fm["relationship"]
        rows.append(row)
        log.append(f"{f.name}: ok")
    return (rows or None), log


def build_tools():
    d = find_dir("Tools")
    if not d:
        return from_json("tools.json", lambda x: isinstance(x, list) and x)
    rows, log = [], []
    for f in sorted(d.glob("*.md")):
        fm, body = parse_note(f)
        name = fm.get("name") or f.stem
        cat = str(fm.get("category") or "").strip()
        why = str(fm.get("why") or body.split("\n")[0] or "").strip()
        if cat not in TOOL_CATEGORIES:
            log.append(f"{f.name}: category '{cat}' invalid - skipped")
            continue
        if len(why) < 20:
            log.append(f"{f.name}: 'why' missing or too thin - skipped (the reason is the whole point of the page)")
            continue
        rows.append({"name": name, "category": cat, "why": why})
        log.append(f"{f.name}: ok")
    return (rows or None), log


def build_kriya():
    d = find_dir("Kriya")
    if not d:
        return from_json("kriya.json", lambda x: isinstance(x, dict) and x.get("entries"))
    dated, log, newest = [], [], ""
    for f in sorted(d.glob("*.md")):
        fm, body = parse_note(f)
        if str(fm.get("active", True)).lower() == "false":
            log.append(f"{f.name}: inactive - skipped")
            continue
        label = fm.get("label") or fm.get("title") or f.stem
        text = str(fm.get("body") or body).strip()
        if not text:
            log.append(f"{f.name}: empty - skipped")
            continue
        date = str(fm.get("date") or "")
        dated.append((date, {"label": label, "title": fm.get("title") or label, "body": text}))
        newest = max(newest, date)
        log.append(f"{f.name}: ok")
    if not dated:
        return None, log
    dated.sort(key=lambda r: r[0], reverse=True)
    return {"updated": newest, "entries": [r[1] for r in dated]}, log


def main() -> int:
    if not BRAIN.is_dir():
        print("akshay-brain not checked out; nothing to sync", file=sys.stderr)
        return 0
    for label, builder, out in (
        ("projects", build_projects, "projects.json"),
        ("tools", build_tools, "tools.json"),
        ("kriya", build_kriya, "kriya.json"),
    ):
        data, log = builder()
        print(f"\n[{label}]")
        for line in log:
            print("  " + line)
        if data:
            (OUT / out).write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            n = len(data) if isinstance(data, list) else len(data.get("entries", []))
            print(f"  -> wrote content/{out} ({n} items)")
        else:
            print(f"  -> content/{out} untouched; site falls back to src/data")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
