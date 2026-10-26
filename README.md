# eshelltd

## Status

| | |
|---|---|
| **Domain** | `https://eshelltd.co.il` |
| **Pages URL** | `https://eshelltd.pages.dev` |
| **Storage mode** | `Standard` (`standard`) |
| **Storage account** | `jetvaults` |
| **Public storage** | `https://jetvaults.blob.core.windows.net/eshelltd/` |
| **Private storage** | `https://jetvaults.blob.core.windows.net/eshelltd-private/` |
| **Public container** | `eshelltd` |
| **Private container** | `eshelltd-private` |
| **Activated** | No |

## Nameservers

Set these at your domain registrar:

```
gordon.ns.cloudflare.com
sureena.ns.cloudflare.com
```

## Development

Edit files in `wwwroot/` and push to `main` - Cloudflare Pages auto-deploys.

Only the `wwwroot/` directory is served. Everything else stays in the repo.

## Site architecture

Static, bilingual (Hebrew primary, English under `/en/`), no framework, no runtime dependencies.

```
src/
  data/projects.mjs   every project once, both languages (name, city, status, facts, images...)
  data/site.mjs       company details, UI strings, page copy, jobs, press, partners
  data/legal.mjs      privacy policy and accessibility statement
  data/images.json    generated: intrinsic image sizes for width/height attributes
  css/site.css        one stylesheet, logical properties (works RTL and LTR); inlined at build
  js/site.js          ~8 KB progressive enhancement (menu, filters, gallery, forms, a11y panel)
  build.mjs           generator: writes all pages + sitemap, robots, _headers, _redirects
  images/<folder>/NN.jpg   editable image sources (max 2560px)
tools/
  images.py           image pipeline (AVIF + WebP at 480/800/1280/1920/2560, OG images)
  select.json         which crawled originals feed each project folder
wwwroot/              build output, served by Cloudflare Pages (commit it)
CONTENT_REVIEW.md     facts and translations awaiting client confirmation
```

### Build

```bash
python tools/images.py build   # only when images in src/images change (needs Pillow with AVIF)
python tools/images.py og      # share images, only when hero images change
node src/build.mjs             # always; Node 18+, no npm install
```

Commit `src/` and `wwwroot/` together. Cloudflare Pages serves `wwwroot/` as-is (no build step).

### Adding or editing a project

1. Add photos to `src/images/<folder>/00.jpg, 01.jpg ...` (00 = hero), then `python tools/images.py build`.
2. Add one entry to `src/data/projects.mjs` with both `he` and `en` text, `status` (`marketing`, `planning`, `occupied`) and `images`.
3. `node src/build.mjs`. The project page, both languages, hub cards, filters, sitemap and hreflang are generated.

### Bilingual routing

Every page key maps to the same path in both languages: `/about/` and `/en/about/`, `/projects/<slug>/` and `/en/projects/<slug>/`.
The language switch links to the same path in the other language, so it keeps the visitor on the same page or project.
Each page carries `lang`/`dir`, a self-canonical, `hreflang` he/en/x-default, localized OpenGraph, and the sitemap lists both versions.

### Indexing

`_headers` sends `X-Robots-Tag: noindex` on `*.eshelltd.pages.dev` preview hosts only. The production domain is indexable once DNS points here.
`_redirects` maps every old WordPress URL (both percent-encoding cases) to its new route with a 301.

### Forms

Set `company.forms.endpoint` and `accessKey` in `src/data/site.mjs` (e.g. Web3Forms) and rebuild. Until then, forms open the visitor's email app pre-filled to the company address.
