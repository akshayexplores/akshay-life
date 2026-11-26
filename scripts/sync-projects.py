#!/usr/bin/env python3
"""
Sync project case studies from the akshay-brain vault into the site.

The vault is the source of truth. This script reads `Projects/*.md`, keeps only
the notes that are explicitly marked as publishable case studies, and writes:

    content/projects.json        the card rows consumed by getProjects()
    content/projects/<id>.mdx    the long-form body behind each card

WHY THE FILTER IS STRICT
------------------------
`Projects/` holds two different kinds of note in one folder:

  * venture notes  - private, reflective, first-person working journal.
                     These contain candid operational and financial detail
                     and must never reach the public site.
  * case studies   - client-facing write-ups intended for /krama.

A note is published only when BOTH of these hold:

    kind: case-study
    public: true          (a real YAML boolean, not the string "true")

Anything else is skipped. The default is always "do not publish" - a missing,
misspelled or malformed field excludes the note rather than exposing it. That
asymmetry is deliberate: the cost of wrongly skipping a case study is a missing
card, the cost of wrongly publishing a venture note is a private disclosure.

The script prints every decision it makes so a bad run is visible in CI logs
rather than silent.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

# Fields copied straight through to the site-facing MDX frontmatter.
BODY_FRONTMATTER_KEYS = (
    "title",
    "client",
    "category",
    "skills",
    "date",
    "excerpt",
    "source",
)

REQUIRED = ("id", "title", "outcome", "outcomeKind")

VALID_OUTCOME_KINDS = {"shipped", "shut-down", "precursor", "live", "in-progress"}


class SkipNote(Exception):
    """Raised with a human-readable reason when a note must not be published."""


def split_frontmatter(text: str) -> tuple[dict, str]:
    """Return (frontmatter, body). Raises SkipNote if there is no frontmatter."""
    if not text.startswith("---"):
        raise SkipNote("no YAML frontmatter")

    # Split on the closing delimiter of the frontmatter block only.
    parts = text.split("\n---", 2)
    if len(parts) < 2:
        raise SkipNote("unterminated YAML frontmatter")

    raw = parts[0][3:]  # drop the opening ---
    body = parts[1].lstrip("-").lstrip("\n")

    try:
        data = yaml.safe_load(raw) or {}
    except yaml.YAMLError as exc:
        raise SkipNote(f"unparseable frontmatter: {exc}") from exc

    if not isinstance(data, dict):
        raise SkipNote("frontmatter is not a mapping")

    return data, body


def check_publishable(fm: dict) -> None:
    """Raise SkipNote unless this note is explicitly a publishable case study."""
    kind = fm.get("kind")
    if kind != "case-study":
        raise SkipNote(f"kind is {kind!r}, not 'case-study'")

    public = fm.get("public")
    # Identity check against True, so only a genuine YAML boolean passes.
    #
    # Note that YAML 1.1 treats `true`, `yes` and `on` as the same boolean, so
    # all three publish. That is correct - each is an unambiguous yes from the
    # author. What this rejects is anything that merely *looks* like a yes:
    # the quoted string "true", the integer 1, "True " with trailing space.
    # Those indicate a typo or a templating accident rather than intent, and
    # the safe reading of an unclear flag is "do not publish".
    if public is not True:
        raise SkipNote(f"public is {public!r}, not boolean true")

    missing = [k for k in REQUIRED if not fm.get(k)]
    if missing:
        raise SkipNote(f"missing required field(s): {', '.join(missing)}")

    kind_value = fm.get("outcomeKind")
    if kind_value not in VALID_OUTCOME_KINDS:
        raise SkipNote(
            f"outcomeKind {kind_value!r} is not one of {sorted(VALID_OUTCOME_KINDS)}"
        )


def has_body(body: str) -> bool:
    """
    True when the note contains actual prose, not just a skeleton.

    A card row is emitted for every published note, but the long-form MDX is
    written only when there is something to read. This is what keeps the GRAC
    design card visible on /krama while leaving it unclickable until the
    write-up exists - matching how the site already behaves.

    The test is deliberately mechanical rather than a length threshold: strip
    HTML comments, then look for any line that is not blank and not a heading.
    A stub of empty `## Section` headings has none; one real paragraph has one.
    """
    without_comments = re.sub(r"<!--.*?-->", "", body, flags=re.DOTALL)
    for line in without_comments.splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        return True
    return False


def to_row(fm: dict) -> dict:
    """Map vault frontmatter onto the site's Project shape."""
    row = {
        "id": fm["id"],
        "title": fm["title"],
        "org": fm.get("client", ""),
        "summary": fm.get("excerpt", ""),
        "outcome": fm["outcome"],
        "outcomeKind": fm["outcomeKind"],
        "stack": list(fm.get("skills") or []),
    }
    if fm.get("relationship"):
        row["relationship"] = fm["relationship"]
    if fm.get("featured") is True:
        row["featured"] = True
    return row


def render_body(fm: dict, body: str) -> str:
    """Rebuild the site MDX, carrying only the fields the site reads."""
    carried = {k: fm[k] for k in BODY_FRONTMATTER_KEYS if k in fm}
    front = yaml.safe_dump(carried, sort_keys=False, allow_unicode=True).rstrip()
    return f"---\n{front}\n---\n\n{body.strip()}\n"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--vault", required=True, type=Path, help="path to akshay-brain")
    ap.add_argument("--site", required=True, type=Path, help="path to akshay-life")
    ap.add_argument(
        "--check",
        action="store_true",
        help="report what would change without writing anything",
    )
    args = ap.parse_args()

    src = args.vault / "Projects"
    if not src.is_dir():
        print(f"FATAL: {src} does not exist", file=sys.stderr)
        return 1

    out_dir = args.site / "content" / "projects"
    out_json = args.site / "content" / "projects.json"

    published: list[tuple[dict, str]] = []
    skipped: list[tuple[str, str]] = []

    for path in sorted(src.glob("*.md")):
        try:
            fm, body = split_frontmatter(path.read_text(encoding="utf-8"))
            check_publishable(fm)
        except SkipNote as exc:
            skipped.append((path.name, str(exc)))
            continue
        published.append((fm, body))

    # Stable ordering: explicit `order` first, then date descending, then title.
    def sort_key(item: tuple[dict, str]):
        fm = item[0]
        order = fm.get("order")
        return (
            0 if isinstance(order, int) else 1,
            order if isinstance(order, int) else 0,
            str(fm.get("date") or ""),
            str(fm.get("title") or ""),
        )

    published.sort(key=sort_key)

    ids = [fm["id"] for fm, _ in published]
    duplicates = {i for i in ids if ids.count(i) > 1}
    if duplicates:
        print(f"FATAL: duplicate id(s): {sorted(duplicates)}", file=sys.stderr)
        return 1

    # Every published note gets a card. Only those with prose get a write-up.
    with_body = [(fm, body) for fm, body in published if has_body(body)]

    print(f"published {len(published)} case stud{'y' if len(published)==1 else 'ies'}:")
    for fm, body in published:
        mark = "write-up" if has_body(body) else "card only, no write-up yet"
        print(f"  + {fm['id']:<22} {fm['title'][:44]:<46} {mark}")
    print(f"skipped {len(skipped)} note(s):")
    for name, reason in skipped:
        print(f"  - {name:<34} {reason}")

    if args.check:
        return 0

    out_dir.mkdir(parents=True, exist_ok=True)

    # Remove stale MDX so that unpublishing a note in the vault - or emptying
    # its body - actually removes the write-up from the site.
    keep = {f"{fm['id']}.mdx" for fm, _ in with_body}
    for stale in out_dir.glob("*.mdx"):
        if stale.name not in keep:
            stale.unlink()
            print(f"  x removed stale {stale.name}")

    for fm, body in with_body:
        (out_dir / f"{fm['id']}.mdx").write_text(render_body(fm, body), encoding="utf-8")

    rows = [to_row(fm) for fm, _ in published]
    out_json.write_text(
        json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(
        f"wrote {out_json.relative_to(args.site)} "
        f"({len(rows)} card row(s)) and {len(with_body)} MDX write-up(s)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
