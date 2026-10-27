"""Image pipeline (dev-time only, not shipped).

1. normalize: copies the selected originals from the crawl folder into
   src/images/<slug>/NN.jpg (max 2560px, JPEG q90) - the editable source set.
2. build: renders every src/images/<slug>/NN.jpg to
   wwwroot/img/<slug>/NN-<w>.avif and .webp for the responsive widths,
   and writes src/data/images.json (intrinsic sizes) for the HTML build.

Usage: python tools/images.py normalize <crawl_img_dir>
       python tools/images.py build
"""
import json, os, sys, glob
from concurrent.futures import ProcessPoolExecutor
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "images")
OUT = os.path.join(ROOT, "wwwroot", "img")
WIDTHS = [480, 800, 1280, 1920, 2560]


def normalize(crawl):
    sel = json.load(open(os.path.join(ROOT, "tools", "select.json"), encoding="utf-8"))
    for slug, spec in sel.items():
        frm, pick = (slug, spec) if isinstance(spec, list) else (spec["from"], spec["pick"])
        os.makedirs(os.path.join(SRC, slug), exist_ok=True)
        for n, key in enumerate(pick):
            src = glob.glob(os.path.join(crawl, frm, key + ".*"))[0]
            im = Image.open(src).convert("RGB")
            im.thumbnail((2560, 2560), Image.LANCZOS)
            im.save(os.path.join(SRC, slug, f"{n:02d}.jpg"), "JPEG", quality=90, optimize=True, progressive=True)
        print("normalized", slug, len(pick))


def render(path):
    slug = os.path.basename(os.path.dirname(path))
    name = os.path.splitext(os.path.basename(path))[0]
    im = Image.open(path).convert("RGB")
    w0, h0 = im.size
    os.makedirs(os.path.join(OUT, slug), exist_ok=True)
    widths = [w for w in WIDTHS if w < w0] + [min(w0, WIDTHS[-1])]
    widths = sorted(set(widths))
    for w in widths:
        h = round(h0 * w / w0)
        r = im if w == w0 else im.resize((w, h), Image.LANCZOS)
        base = os.path.join(OUT, slug, f"{name}-{w}")
        if not os.path.exists(base + ".avif"):
            r.save(base + ".avif", "AVIF", quality=64 if w >= 1280 else 54, speed=6)
        if not os.path.exists(base + ".webp"):
            r.save(base + ".webp", "WEBP", quality=85, method=5)
    return f"{slug}/{name}", {"w": w0, "h": h0, "widths": widths}


def build():
    files = sorted(glob.glob(os.path.join(SRC, "*", "*.jpg")))
    with ProcessPoolExecutor() as ex:
        meta = dict(ex.map(render, files))
    json.dump(meta, open(os.path.join(ROOT, "src", "data", "images.json"), "w", encoding="utf-8"), indent=1, sort_keys=True)
    print("rendered", len(meta), "images")


if __name__ == "__main__":
    {"normalize": lambda: normalize(sys.argv[2]), "build": build, "og": lambda: None}[sys.argv[1]]()


def og():
    """1200x630 JPEG share images: one per project hero plus section pages."""
    import re
    out = os.path.join(ROOT, "wwwroot", "og")
    os.makedirs(out, exist_ok=True)
    src = open(os.path.join(ROOT, "src", "data", "projects.mjs"), encoding="utf-8").read()
    pairs = {"home": "neot-navon/01", "projects": "kava-tiberias/00", "urban-renewal": "ur-yokneam/00", "about": "white-neighborhood-karmiel/00"}
    for slug, first in re.findall(r'slug: "([^"]+)"[\s\S]*?images: \[(?:"([^"]+)")?', src):
        pairs[slug] = first or None
    logo = Image.open(os.path.join(ROOT, "wwwroot", "assets", "brand", "logo-white.png")).convert("RGBA")
    for name, key in pairs.items():
        if key:
            im = Image.open(os.path.join(SRC, key + ".jpg")).convert("RGB")
            w, h = im.size
            s = max(1200 / w, 630 / h)
            im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
            l, t = (im.width - 1200) // 2, (im.height - 630) // 2
            im = im.crop((l, t, l + 1200, t + 630))
        else:
            im = Image.new("RGB", (1200, 630), (15, 33, 64))
            lg = logo.copy(); lg.thumbnail((560, 200))
            im.paste(lg, ((1200 - lg.width) // 2, (630 - lg.height) // 2), lg)
        im.save(os.path.join(out, name + ".jpg"), "JPEG", quality=82, optimize=True, progressive=True)
    print("og images", len(pairs))


if __name__ == "__main__" and sys.argv[1] == "og":
    og()
