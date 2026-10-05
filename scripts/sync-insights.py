#!/usr/bin/env python3
"""
Sync Insights from akshay-brain to akshay-life.

Reads .md files from akshay-brain/Insights/, transforms frontmatter,
and writes them to content/insights/ in the akshay-life format.

Slugs listed in scripts/blocked-slugs.txt are never published: they are
skipped, and any existing copy in content/insights/ is removed.
"""

import os
import re
from datetime import datetime

BRAIN_DIR = "akshay-brain/Insights"
OUTPUT_DIR = "content/insights"
BLOCKED_FILE = "scripts/blocked-slugs.txt"


def load_blocked() -> set:
    """Slugs that must never be published, one per line; # starts a comment."""
    try:
        with open(BLOCKED_FILE, "r", encoding="utf-8") as f:
            return {
                line.strip()
                for line in f
                if line.strip() and not line.strip().startswith("#")
            }
    except FileNotFoundError:
        return set()


def parse_frontmatter(content: str):
    """Parse simple YAML frontmatter manually."""
    fm = {}
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm_raw = parts[1].strip()
            body = parts[2].strip()
            for line in fm_raw.split("\n"):
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if ":" in line:
                    key, value = line.split(":", 1)
                    key = key.strip()
                    value = value.strip()
                    if value.startswith("[") and value.endswith("]"):
                        items = value[1:-1].split(",")
                        fm[key] = [item.strip().strip('"').strip("'") for item in items if item.strip()]
                    else:
                        value = value.strip('"').strip("'")
                        fm[key] = value
    return fm, body


def generate_slug(filename: str) -> str:
    base = filename.replace(".md", "").split(" - ")[0].split(" — ")[0]
    slug = re.sub(r"[^\w\s-]", "", base).strip().lower()
    slug = re.sub(r"[-\s]+", "-", slug)
    return slug


def generate_excerpt(body: str) -> str:
    lines = body.split("\n")
    in_first_para = False
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if in_first_para:
                break
            continue
        if stripped.startswith("#") and not in_first_para:
            continue
        if not in_first_para and stripped:
            in_first_para = True
            excerpt = stripped
            break
    else:
        excerpt = ""

    # Strip wikilinks
    excerpt = re.sub(
        r"\[\[[^\]|]+\|?([^\]]*)\]\]",
        lambda m: m.group(1) if m.group(1) else m.group(0).replace("[[", "").replace("]]", "").split("|")[-1],
        excerpt,
    )

    if len(excerpt) > 160:
        excerpt = excerpt[:160].rsplit(" ", 1)[0] + "…"
    return excerpt


def clean_body(body: str) -> str:
    # Strip wikilinks from body
    body = re.sub(
        r"\[\[[^\]|]+\|?([^\]]*)\]\]",
        lambda m: m.group(1) if m.group(1) else m.group(0).replace("[[", "").replace("]]", "").split("|")[-1],
        body,
    )
    return body


def main():
    # Find all .md files
    insight_files = []
    for root, dirs, files in os.walk(BRAIN_DIR):
        for f in files:
            if f.endswith(".md") and f != "Insights Index.md":
                insight_files.append(os.path.join(root, f))

    insight_files.sort()

    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    blocked = load_blocked()
    skipped = 0

    # Track existing slugs to handle duplicates
    existing_slugs = set()

    for filepath in insight_files:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        fm, body = parse_frontmatter(content)

        title = fm.get("title", "")
        category = fm.get("subject", "Insight")
        insight_type = fm.get("type", "insight")
        status = fm.get("status", "draft")
        tags = fm.get("tags", [])

        slug = generate_slug(os.path.basename(filepath))

        # Blocked slugs are never published, and any copy already on disk goes.
        if slug in blocked:
            stale = os.path.join(OUTPUT_DIR, f"{slug}.mdx")
            if os.path.exists(stale):
                os.remove(stale)
            print(f"✗ {slug}.mdx (blocked)")
            skipped += 1
            continue

        if slug in existing_slugs:
            base = slug
            i = 1
            while f"{base}-{i}" in existing_slugs:
                i += 1
            slug = f"{base}-{i}"
        existing_slugs.add(slug)

        excerpt = generate_excerpt(body)
        mtime = os.path.getmtime(filepath)
        date = datetime.fromtimestamp(mtime).strftime("%Y-%m-%d")

        body_clean = clean_body(body)

        # Build output
        lines = ["---"]
        lines.append(f'title: "{title}"')
        lines.append(f'category: "{category}"')
        lines.append(f'type: "{insight_type}"')
        lines.append(f'status: "{status}"')
        lines.append(f'slug: "{slug}"')
        lines.append(f'excerpt: "{excerpt.replace(chr(34), chr(92) + chr(34))}"')
        lines.append(f'date: "{date}"')
        if tags:
            lines.append("tags:")
            for tag in tags:
                lines.append(f'  - "{tag}"')
        lines.append("---")
        lines.append("")

        output_path = os.path.join(OUTPUT_DIR, f"{slug}.mdx")
        with open(output_path, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
            f.write(body_clean)
            f.write("\n")

        print(f"✓ {slug}.mdx")

    print(f"\nSynced {len(insight_files) - skipped} insights to {OUTPUT_DIR} ({skipped} blocked)")


if __name__ == "__main__":
    main()
