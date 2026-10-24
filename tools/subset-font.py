#!/usr/bin/env python3
"""Rebuild the Xiaolai webfont subset from the text used by the site.

Usage:
    python3 tools/subset-font.py /path/to/Xiaolai-Regular.ttf

Requires:
    pip install fonttools brotli
"""

from __future__ import annotations

import argparse
import string
import sys
from pathlib import Path

try:
    from fontTools import subset
except ImportError:
    sys.exit("fontTools is missing. Run: pip install fonttools brotli")


ROOT = Path(__file__).resolve().parent.parent
SOURCE_FILES = [
    ROOT / "index.html",
    ROOT / "guga.html",
    ROOT / "404.html",
    ROOT / "assets" / "js" / "data.js",
    ROOT / "assets" / "js" / "app.js",
    ROOT / "assets" / "js" / "guga.js",
    ROOT / "assets" / "css" / "style.css",
]
OUTPUT = ROOT / "assets" / "fonts" / "xiaolai.woff2"

# ASCII plus common Chinese punctuation and a few symbols used in the UI.
EXTRA = set(string.printable)
EXTRA.update("，。！？：；、「」『』（）《》〈〉…～·“”‘’")


def collect_text() -> str:
    chars = set(EXTRA)
    for path in SOURCE_FILES:
        if path.exists():
            chars.update(path.read_text(encoding="utf-8"))
    return "".join(sorted(chars))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("font", help="Path to Xiaolai-Regular.ttf")
    args = parser.parse_args()

    font_path = Path(args.font).expanduser().resolve()
    if not font_path.exists():
        sys.exit(f"Font not found: {font_path}")

    text = collect_text()
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_legacy = True
    options.name_languages = ["*"]
    options.notdef_outline = True

    font = subset.load_font(str(font_path), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, str(OUTPUT), options)
    print(f"Wrote {OUTPUT} ({OUTPUT.stat().st_size:,} bytes, {len(text)} characters)")


if __name__ == "__main__":
    main()
