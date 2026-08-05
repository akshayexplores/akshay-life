#!/usr/bin/env python3
"""
Publication is a fact about the site, not about the vault.

The vault records intent. Once a piece has been synced here it is live, so
this rewrites the SITE's copy: status -> published, and stamps publishedAt
with the date it first appeared. akshay-brain is never touched.

publishedAt is preserved once set, so re-running is idempotent and the real
first-published date survives later edits to the piece.
"""
from __future__ import annotations

import datetime
import pathlib
import re
import sys

INSIGHTS = pathlib.Path("content/insights")
TODAY = datetime.date.today().isoformat()


def field(head: str, key: str) -> str | None:
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', head, re.M)
    return m.group(1) if m else None


def main() -> int:
    if not INSIGHTS.is_dir():
        print("no content/insights; nothing to mark", file=sys.stderr)
        return 0

    changed, already = 0, 0
    for f in sorted(INSIGHTS.glob("*.md*")):
        raw = f.read_text(encoding="utf-8")
        m = re.match(r"^(---\s*\n)(.*?)(\n---\s*\n)(.*)$", raw, re.S)
        if not m:
            print(f"  {f.name}: no frontmatter - left alone")
            continue
        open_, head, close, body = m.groups()

        status = (field(head, "status") or "").strip().lower()
        published_at = field(head, "publishedAt")

        new_head = head
        touched = False

        if status != "published":
            if re.search(r"^status:", new_head, re.M):
                new_head = re.sub(r'^status:.*$', 'status: "published"', new_head, count=1, flags=re.M)
            else:
                new_head += '\nstatus: "published"'
            touched = True

        if not published_at:
            # First time we have seen it here - that is the publication date.
            new_head += f'\npublishedAt: "{TODAY}"'
            touched = True

        if touched:
            f.write_text(open_ + new_head + close + body, encoding="utf-8")
            changed += 1
        else:
            already += 1

    print(f"marked published: {changed} updated, {already} already current")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
