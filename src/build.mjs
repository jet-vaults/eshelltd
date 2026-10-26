// Static site generator for eshelltd.co.il. Zero dependencies (Node 18+).
// Reads src/data/*, writes HTML for both languages into wwwroot/.
//   node src/build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { company, routes, ui, pages, jobs, press, partners } from "./data/site.mjs";
import { projects, renewal } from "./data/projects.mjs";
import { privacy, accessibility } from "./data/legal.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "wwwroot");
const IMG = JSON.parse(readFileSync(join(ROOT, "src/data/images.json"), "utf8"));
const LANGS = ["he", "en"];
const DOMAIN = company.domain;

// ---------------------------------------------------------------- helpers
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const L = (lang) => (o) => (o && typeof o === "object" && lang in o ? o[lang] : o);
const href = (lang, path) => (lang === "en" ? "/en" + path : path);
const projPath = (p) => `${routes.projects}${p.slug}/`;
const citySlug = (p) => p.city.en.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
const minCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,>+~])\s*/g, "$1").replace(/;}/g, "}").trim();
const hash = (s) => createHash("sha1").update(s).digest("hex").slice(0, 10);

const ARROW = `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`;
const PLAY = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15l12.5-7.5z"/></svg>`;
const A11Y = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>`;

// <picture> with AVIF + WebP sources; width/height always declared (no CLS)
function pic(key, { alt = "", sizes = "100vw", cls = "", eager = false, max = 2560 } = {}) {
  const m = IMG[key];
  if (!m) throw new Error("missing image " + key);
  const ws = m.widths.filter((w) => w <= max);
  const set = (ext) => ws.map((w) => `/img/${key}-${w}.${ext} ${w}w`).join(", ");
  const fallbackW = ws.find((w) => w >= 1280) || ws[ws.length - 1];
  return `<picture><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><source type="image/webp" srcset="${set("webp")}" sizes="${sizes}"><img src="/img/${key}-${fallbackW}.webp" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""}${eager ? ` fetchpriority="high"` : ` loading="lazy"`} decoding="async"></picture>`;
}
const largest = (key, ext = "webp") => `/img/${key}-${IMG[key].widths[IMG[key].widths.length - 1]}.${ext}`;
const preloadImg = (key, sizes) => {
  const m = IMG[key];
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${m.widths.map((w) => `/img/${key}-${w}.avif ${w}w`).join(", ")}" imagesizes="${sizes}" fetchpriority="high">`;
};

// ---------------------------------------------------------------- assets
const css = minCss(readFileSync(join(ROOT, "src/css/site.css"), "utf8"));
const js = readFileSync(join(ROOT, "src/js/site.js"), "utf8").replace(/^\s*\/\*[\s\S]*?\*\/\s*/m, "");
const jsName = `site.${hash(js)}.js`;

// ---------------------------------------------------------------- layout
function layout(lang, o) {
  const u = ui[lang], t = L(lang), other = lang === "he" ? "en" : "he";
  const url = (l) => DOMAIN + href(l, o.path);
  const ogImg = DOMAIN + (o.og || "/og/home.jpg");
  const nav = [["projects", routes.projects], ["renewal", routes.renewal], ["about", routes.about], ["press", routes.press], ["careers", routes.careers], ["contact", routes.contact]];
  const navLinks = nav.map(([k, p]) => `<a href="${href(lang, p)}"${o.nav === k ? ' aria-current="page"' : ""}>${u.nav[k]}</a>`).join("");
  const fonts = lang === "he" ? ["400-hebrew", "500-hebrew"] : ["400-latin", "500-latin"];
  const org = {
    "@context": "https://schema.org", "@type": "GeneralContractor", "@id": DOMAIN + "/#org",
    name: company.name[lang], legalName: company.legalName[lang], alternateName: company.name[other],
    url: DOMAIN + href(lang, "/"), logo: DOMAIN + "/assets/brand/logo.png", image: DOMAIN + "/og/home.jpg",
    telephone: company.phoneIntl, email: company.email, foundingDate: "1994",
    address: { "@type": "PostalAddress", streetAddress: lang === "he" ? "התעשייה 51" : "51 HaTa'asiya St.", addressLocality: lang === "he" ? "נשר" : "Nesher", postalCode: company.postal, addressCountry: "IL" },
    sameAs: Object.values(company.social),
  };
  const ld = [org, ...(o.ld || [])];
  const switchHref = href(other, o.path);
  return `<!doctype html>
<html lang="${lang}" dir="${u.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<link rel="canonical" href="${url(lang)}">
<link rel="alternate" hreflang="he" href="${url("he")}">
<link rel="alternate" hreflang="en" href="${url("en")}">
<link rel="alternate" hreflang="x-default" href="${url("he")}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(company.name[lang])}">
<meta property="og:locale" content="${u.locale}">
<meta property="og:locale:alternate" content="${ui[other].locale}">
<meta property="og:title" content="${esc(o.ogTitle || o.title)}">
<meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${url(lang)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f2140">
<link rel="icon" href="/favicon.ico" sizes="32x32"><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
${fonts.map((f) => `<link rel="preload" href="/assets/fonts/plex-hebrew-${f}.woff2" as="font" type="font/woff2" crossorigin>`).join("\n")}
${o.preload || ""}
<script>document.documentElement.classList.add("js");try{var p=JSON.parse(localStorage.getItem("eh-a11y"))||{};for(var k in p)if(p[k])document.documentElement.classList.add("a-"+k)}catch(e){}</script>
<style>${css}</style>
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : { "@context": "https://schema.org", "@graph": ld.map(({ ["@context"]: _, ...x }) => x) })}</script>
</head>
<body>
<a class="skip" href="#main">${u.skip}</a>
<header class="hdr">
  <div class="wrap hdr__in">
    <a class="hdr__logo" href="${href(lang, "/")}"><img src="/assets/brand/logo.webp" width="728" height="120" alt="${esc(company.name[lang])}"></a>
    <nav class="nav" aria-label="${lang === "he" ? "ראשי" : "Main"}">${navLinks}</nav>
    <div class="hdr__util">
      <a href="${href(lang, routes.residents)}">${u.residents}</a>
      <a href="tel:${company.phone}" class="num" dir="ltr">${company.phone}</a>
      <a class="lang" href="${switchHref}" hreflang="${other}" lang="${other}" aria-label="${u.langSwitchLabel}">${u.langSwitch}</a>
    </div>
    <a class="hdr__mob-lang" href="${switchHref}" hreflang="${other}" lang="${other}" aria-label="${u.langSwitchLabel}">${u.langSwitch}</a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="mnav"><span></span><b class="sr">${u.menu}</b></button>
  </div>
</header>
<div class="mnav" id="mnav">
  <nav class="mnav__main" aria-label="${u.menu}">${nav.map(([k, p]) => `<a href="${href(lang, p)}">${u.nav[k]}</a>`).join("")}</nav>
  <div class="mnav__sub"><a href="${href(lang, routes.residents)}">${u.residents}</a><a href="tel:${company.phone}" dir="ltr" class="num">${company.phone}</a><a href="mailto:${company.email}">${company.email}</a></div>
</div>
<main id="main">
${o.body}
</main>
${footer(lang)}
<button class="a11y-btn" type="button" aria-expanded="false" aria-controls="a11y" aria-label="${u.a11y.open}">${A11Y}</button>
<div class="a11y" id="a11y" role="dialog" aria-label="${u.a11y.title}" hidden>
  <h2>${u.a11y.title}</h2>
  <div class="a11y__grid">
    <button type="button" data-a="big" aria-pressed="false">${u.a11y.bigger}</button>
    <button type="button" data-a="contrast" aria-pressed="false">${u.a11y.contrast}</button>
    <button type="button" data-a="links" aria-pressed="false">${u.a11y.links}</button>
    <button type="button" data-a="motion" aria-pressed="false">${u.a11y.motion}</button>
    <button type="button" class="reset" data-areset>${u.a11y.reset}</button>
  </div>
  <a href="${href(lang, routes.accessibility)}">${u.a11y.statement}</a>
</div>
<script>window.EH_FORMS=${JSON.stringify(company.forms)}</script>
<script src="/assets/${jsName}" defer></script>
</body>
</html>`;
}

function footer(lang) {
  const u = ui[lang], f = u.footer;
  const y = 2026;
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr__top">
      <div class="ftr__brand">
        <a class="ftr__logo" href="${href(lang, "/")}"><img src="/assets/brand/logo-white.webp" width="728" height="120" alt="${esc(company.name[lang])}" loading="lazy"></a>
        <p>${f.tagline}</p>
      </div>
      <div><h2>${f.company}</h2><ul>
        <li><a href="${href(lang, routes.projects)}">${u.nav.projects}</a></li>
        <li><a href="${href(lang, routes.renewal)}">${u.nav.renewal}</a></li>
        <li><a href="${href(lang, routes.about)}">${u.nav.about}</a></li>
        <li><a href="${href(lang, routes.press)}">${u.nav.press}</a></li>
        <li><a href="${href(lang, routes.careers)}">${u.nav.careers}</a></li></ul></div>
      <div><h2>${f.service}</h2><ul>
        <li><a href="${href(lang, routes.residents)}">${u.residents}</a></li>
        <li><a href="${href(lang, routes.contact)}">${u.nav.contact}</a></li>
        <li><a href="tel:${company.phone}" dir="ltr" class="num">${company.phone}</a></li>
        <li><a href="mailto:${company.email}">${company.email}</a></li>
        <li>${company.address[lang]}</li></ul></div>
      <div><h2>${f.follow}</h2><ul>
        <li><a href="${company.social.facebook}" rel="noopener" target="_blank">Facebook</a></li>
        <li><a href="${company.social.instagram}" rel="noopener" target="_blank">Instagram</a></li>
        <li><a href="${company.social.youtube}" rel="noopener" target="_blank">YouTube</a></li></ul></div>
    </div>
    <div class="ftr__bot">
      <p>© ${y} ${company.legalName[lang]}. ${f.rights}. ${f.renders}</p>
      <nav aria-label="${lang === "he" ? "מידע משפטי" : "Legal"}">
        <a href="${href(lang, routes.accessibility)}">${pages.legal[lang] && u.a11y.statement}</a>
        <a href="${href(lang, routes.privacy)}">${privacy[lang].h1}</a>
        <a href="${href(lang, routes.legal)}">${pages.legal[lang].h1}</a>
      </nav>
    </div>
  </div>
</footer>`;
}

const crumbs = (lang, trail) => {
  const items = [[ui[lang].breadcrumbHome, href(lang, "/")], ...trail];
  const ld = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, ...(p ? { item: DOMAIN + p } : {}) })) };
  return {
    html: `<nav aria-label="${lang === "he" ? "פירורי לחם" : "Breadcrumb"}"><ol class="crumbs">${items.map(([n, p], i) => `<li>${i < items.length - 1 ? `<a href="${p}">${esc(n)}</a>` : `<span aria-current="page">${esc(n)}</span>`}</li>`).join("")}</ol></nav>`,
    ld,
  };
};

const layers = `<span class="layers" aria-hidden="true"><i></i><i></i><i></i></span>`;

// ---------------------------------------------------------------- components
function card(lang, p, { sizes = "(max-width:640px) 100vw, (max-width:1000px) 50vw, 33vw", showSummary = false } = {}) {
  const t = L(lang), u = ui[lang];
  const media = p.images.length
    ? `<div class="card__media">${pic(p.images[0], { alt: `${t(p.name)}, ${t(p.city)} - ${u.render}`, sizes, max: 1280 })}</div>`
    : `<div class="card__media card__media--none"><span>${esc(t(p.name))}</span></div>`;
  return `<a class="card" href="${href(lang, projPath(p))}" data-st="${p.status}" data-city="${citySlug(p)}">${media}<div class="card__body"><h3 class="card__name">${esc(t(p.name))}</h3><p class="card__meta"><span>${esc(t(p.city))}</span><span class="st">${u.statusOne[p.status]}</span></p>${showSummary ? `<p class="card__sum">${esc(t(p.summary))}</p>` : ""}</div></a>`;
}

function field(lang, { id, name, label, type = "text", required = false, full = false, options = null, auto = "", value = "" }) {
  const u = ui[lang];
  const req = required ? " required" : "";
  const opt = required ? "" : ` <small>${u.form.optional}</small>`;
  let input;
  if (options) input = `<select id="${id}" name="${name}"${req} aria-describedby="${id}-err"><option value="">${u.form.choose}</option>${options.map((o) => `<option${o === value ? " selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
  else if (type === "textarea") input = `<textarea id="${id}" name="${name}"${req} aria-describedby="${id}-err"></textarea>`;
  else input = `<input id="${id}" name="${name}" type="${type}"${auto ? ` autocomplete="${auto}"` : ""}${type === "tel" ? ' inputmode="tel" dir="ltr"' : ""}${type === "email" ? ' dir="ltr"' : ""}${value ? ` value="${esc(value)}"` : ""}${req} aria-describedby="${id}-err">`;
  return `<div class="fld${full ? " full" : ""}"><label for="${id}">${esc(label)}${opt}</label>${input}<span class="err" id="${id}-err" aria-live="polite"></span></div>`;
}

function form(lang, { kind, subject, to = company.email, fields, cls = "" }) {
  const u = ui[lang], f = u.form;
  const msgs = { required: f.required, phone: f.invalidPhone, email: f.invalidEmail, sending: f.sending, ok: f.ok, err: f.err, mailto: f.mailto };
  return `<form class="form ${cls}" data-form="${kind}" data-subject="${esc(subject)}" data-to="${to}" data-msgs='${esc(JSON.stringify(msgs))}' novalidate>
${fields.join("\n")}
<input type="checkbox" name="botcheck" class="sr" tabindex="-1" aria-hidden="true">
<label class="chk full"><input type="checkbox" required> <span>${f.consent} <a href="${href(lang, routes.privacy)}">${privacy[lang].h1}</a></span></label>
<div class="full"><button class="btn" type="submit">${f.send}${ARROW}</button></div>
<p class="form__status full" role="status" aria-live="polite"></p>
</form>`;
}
const baseFields = (lang, pre) => {
  const f = ui[lang].form;
  return [
    field(lang, { id: pre + "-name", name: "name", label: f.name, required: true, auto: "name" }),
    field(lang, { id: pre + "-phone", name: "phone", label: f.phone, type: "tel", required: true, auto: "tel" }),
    field(lang, { id: pre + "-email", name: "email", label: f.email, type: "email", auto: "email", full: true }),
  ];
};

// ---------------------------------------------------------------- pages
const byStatus = (s) => projects.filter((p) => p.status === s);
const statuses = ["marketing", "planning", "occupied"];

function cityIndex(lang) {
  const t = L(lang), m = new Map();
  for (const p of projects) {
    const k = citySlug(p);
    if (!m.has(k)) m.set(k, { name: t(p.city), n: 0 });
    m.get(k).n++;
  }
  return [...m.entries()].sort((a, b) => b[1].n - a[1].n || a[1].name.localeCompare(b[1].name, lang));
}

function home(lang) {
  const c = pages.home[lang], u = ui[lang], t = L(lang);
  const heroKey = "neot-navon/01";
  const heroSizes = "100vw";
  const featured = ["neot-navon-haifa", "kava-tiberias", "haparsa-rechasim", "elad-center"].map((s) => projects.find((p) => p.slug === s));
  const body = `
<section class="hero" aria-labelledby="hero-h">
  ${pic(heroKey, { alt: c.heroCaption, sizes: heroSizes, cls: "hero__img", eager: true })}
  <div class="wrap hero__in">
    <h1 class="h-xl" id="hero-h">${c.heroLines.map((l) => `<span>${l}</span>`).join("")}</h1>
    <p class="hero__text">${c.heroText}</p>
    <div class="hero__cta"><a class="btn btn--light" href="${href(lang, routes.projects)}">${c.cta1}${ARROW}</a><a class="btn btn--ghost-light" href="${href(lang, routes.renewal)}">${c.cta2}</a></div>
  </div>
  <p class="hero__cap">${c.heroCaption}</p>
</section>

<section aria-label="${lang === "he" ? "החברה במספרים" : "The company in numbers"}">
  <div class="wrap"><div class="scale">${c.scale.map((s) => `<div><span class="scale__v num">${s.value}</span><span class="scale__l">${s.label}</span></div>`).join("")}</div></div>
</section>

<section class="sec sec--navy on-dark" aria-labelledby="roof-h">
  <div class="wrap roof">
    <div class="roof__text rv">${layers}<h2 class="h-l" id="roof-h">${c.roofTitle.map((l) => `<span style="display:block">${l}</span>`).join("")}</h2><p>${c.roofText}</p>
      <p><a class="link" href="${href(lang, routes.about)}">${u.nav.about}${ARROW}</a></p></div>
    <ol class="stack" role="list">${c.roof.map((r) => `<li class="stack__item rv"><h3>${r.title}</h3><p>${r.text}</p></li>`).join("")}</ol>
  </div>
</section>

<section class="sec" aria-labelledby="feat-h">
  <div class="wrap">
    <div class="sec__head sec__head--row"><div><h2 class="h-l" id="feat-h">${c.featuredTitle}</h2><p class="lead muted" style="margin-top:14px">${c.featuredText}</p></div><a class="link" href="${href(lang, routes.projects)}">${u.allProjects}${ARROW}</a></div>
    <div class="feat">${featured.map((p, i) => card(lang, p, { sizes: i === 0 ? "(max-width:900px) 100vw, 58vw" : i === 3 ? "100vw" : "(max-width:900px) 100vw, 42vw", showSummary: true })).join("")}</div>
    <nav class="tabs" style="margin-top:clamp(48px,6vw,80px)" aria-label="${u.filterLabel}">${statuses.map((s) => `<a href="${href(lang, routes.projects)}?status=${s}"><b>${u.status[s]}</b><span class="num">${byStatus(s).length}</span></a>`).join("")}</nav>
  </div>
</section>

<section class="sec sec--paper" aria-labelledby="ur-h">
  <div class="wrap split">
    <div class="split__media rv">${pic("ur-haifa-hatoren/00", { alt: t(renewal[2].name) + " - " + u.render, sizes: "(max-width:900px) 100vw, 58vw", max: 1920 })}</div>
    <div class="rv">${layers}<h2 class="h-l" id="ur-h">${c.renewalTitle}</h2><p class="lead" style="margin-top:20px">${c.renewalText}</p>
      <ul class="ur-list">${renewal.map((r) => `<li><b>${esc(t(r.name))}</b><span class="num">${esc(t(r.facts[1].value))} ${lang === "he" ? "יח\"ד חדשות" : "new homes"}</span></li>`).join("")}</ul>
      <a class="btn" href="${href(lang, routes.renewal)}">${c.renewalCta}${ARROW}</a></div>
  </div>
</section>

<section class="sec" aria-labelledby="cities-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="h-m" id="cities-h">${c.citiesTitle}</h2><p class="muted">${c.citiesText}</p></div>
    <div class="cities rv">${cityIndex(lang).map(([k, v]) => `<a href="${href(lang, routes.projects)}?city=${k}">${esc(v.name)}<span class="num">${v.n}</span></a>`).join("")}</div>
  </div>
</section>

<section class="sec sec--tight sec--paper" aria-labelledby="partners-h">
  <div class="wrap">
    <div class="sec__head"><h2 class="h-m" id="partners-h">${c.partnersTitle}</h2></div>
    <ul class="logos" role="list">${partners.map((p) => `<li><img src="/assets/partners/${p.file}.webp" alt="${esc(p.name)}" loading="lazy" decoding="async" width="240" height="100"></li>`).join("")}</ul>
  </div>
</section>
${contactBand(lang, c.contactTitle, c.contactText)}`;
  return layout(lang, { path: "/", title: c.title, description: c.description, body, preload: preloadImg(heroKey, heroSizes), og: "/og/home.jpg" });
}

function contactBand(lang, title, text) {
  const u = ui[lang];
  return `<section class="sec sec--navy on-dark" aria-labelledby="cb-h">
  <div class="wrap cband">
    <div>${layers}<h2 class="h-m" id="cb-h">${title}</h2><a class="cband__phone num" href="tel:${company.phone}" dir="ltr">${company.phone}</a>
      <div class="cband__meta"><a href="mailto:${company.email}">${company.email}</a><span>${company.address[lang]}</span></div></div>
    <div class="cband__cta"><a class="btn btn--light" href="${href(lang, routes.contact)}">${u.nav.contact}${ARROW}</a><a class="btn btn--ghost-light" href="${href(lang, routes.residents)}">${u.residents}</a></div>
  </div>
</section>`;
}

function projectsHub(lang) {
  const c = pages.projects[lang], u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[c.h1, null]]);
  const order = [...byStatus("marketing"), ...byStatus("planning"), ...byStatus("occupied")];
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1}</h1><p class="lead">${c.lead}</p></div>
<div class="wrap">
  <div class="filters" role="search" aria-label="${u.filterLabel}">
    <div class="seg" role="group" aria-label="${u.filterLabel}">
      <button type="button" data-status="all" aria-pressed="true">${u.status.all}<span class="num">${projects.length}</span></button>
      ${statuses.map((s) => `<button type="button" data-status="${s}" aria-pressed="false">${u.status[s]}<span class="num">${byStatus(s).length}</span></button>`).join("")}
    </div>
    <label for="f-city">${u.city}<select id="f-city"><option value="all">${u.allCities}</option>${cityIndex(lang).sort((a, b) => a[1].name.localeCompare(b[1].name, lang)).map(([k, v]) => `<option value="${k}">${esc(v.name)}</option>`).join("")}</select></label>
    <p class="filters__count" data-count data-tpl="${u.results("{n}")}" aria-live="polite">${u.results(projects.length)}</p>
  </div>
  <h2 class="sr">${c.h1}</h2>
  <div class="grid" data-projects>${order.map((p) => card(lang, p, { showSummary: true })).join("")}</div>
</div>
<div style="height:clamp(72px,10vw,136px)"></div>`;
  const ld = { "@context": "https://schema.org", "@type": "ItemList", itemListElement: order.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: DOMAIN + href(lang, projPath(p)), name: t(p.name) })) };
  return layout(lang, { path: routes.projects, nav: "projects", title: c.title, description: c.description, body, ld: [cr.ld, ld], og: "/og/projects.jpg" });
}

function projectPage(lang, p) {
  const u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[pages.projects[lang].h1, href(lang, routes.projects)], [t(p.name), null]]);
  const hero = p.images[0];
  const heroSizes = "100vw";
  const alt = (i) => `${t(p.name)}, ${t(p.city)} - ${u.render}${i ? " " + (i + 1) : ""}`;
  const related = [...projects.filter((x) => x.slug !== p.slug && x.status === p.status), ...projects.filter((x) => x.slug !== p.slug && x.status !== p.status)].slice(0, 3);
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.map);
  const gallery = p.images.slice(1);
  const body = `
<div class="wrap">
  <div class="ptitle">
    <div>${cr.html}<span class="badge${p.status === "marketing" ? " badge--marketing" : ""}">${u.statusOne[p.status]}</span>
      <h1 class="h-l">${esc(t(p.name))}</h1>
      <p class="ptitle__meta"><span>${esc(t(p.city))}</span><span>${esc(t(p.area))}</span>${p.year ? `<span class="num">${lang === "he" ? "אכלוס" : "Occupied"} ${p.year}</span>` : ""}</p></div>
    <div class="hero__cta">${p.status !== "occupied" ? `<a class="btn" href="#inquiry">${u.leaveDetails}${ARROW}</a>` : ""}${p.phone ? `<a class="btn btn--line num" href="tel:${p.phone.replace(/[^0-9*+]/g, "")}" dir="ltr">${p.phone}</a>` : ""}</div>
  </div>
</div>
${hero ? `<figure class="phero" style="margin:0">${pic(hero, { alt: alt(0), sizes: heroSizes, eager: true })}<figcaption>${u.render}</figcaption></figure>` : `<div class="phero"><div class="card__media card__media--none" style="aspect-ratio:21/7"><span>${esc(t(p.tagline))}</span></div></div>`}

<section class="sec" aria-labelledby="ov-h">
  <div class="wrap pbody">
    <div class="pbody__text"><h2 class="sr" id="ov-h">${u.overview}</h2><p class="pbody__tag">${esc(t(p.tagline))}</p>${t(p.body).map((x) => `<p>${esc(x)}</p>`).join("")}${p.partners ? `<p class="muted">${esc(t(p.partners))}</p>` : ""}</div>
    <aside class="facts" aria-labelledby="facts-h"><h2 id="facts-h">${u.facts}</h2><dl>${p.facts.map((f) => `<div><dt>${esc(t(f.label))}</dt><dd class="num">${esc(t(f.value))}</dd></div>`).join("")}</dl>${p.note ? `<p class="facts__note">${esc(t(p.note))}</p>` : ""}</aside>
  </div>
</section>
${p.highlights ? `<section class="sec sec--tight" style="padding-top:0" aria-labelledby="hl-h"><div class="wrap"><h2 class="h-s" id="hl-h" style="margin-bottom:20px">${u.highlights}</h2><ul class="hl">${t(p.highlights).map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div></section>` : ""}
${gallery.length ? `<section class="sec sec--paper" aria-labelledby="gal-h"><div class="wrap"><div class="sec__head">${layers}<h2 class="h-m" id="gal-h">${u.gallery}</h2></div>
  <div class="gal">${gallery.map((k, i) => `<button type="button" data-full="${largest(k)}" data-alt="${esc(alt(i + 1))}" aria-label="${esc(alt(i + 1))}">${pic(k, { alt: "", sizes: i % 5 === 0 ? "(max-width:700px) 100vw, 66vw" : "(max-width:700px) 50vw, 33vw", max: 1920 })}</button>`).join("")}</div></div></section>
<dialog class="lb" id="lb" aria-label="${u.gallery}"><button type="button" class="lb__close" data-lbclose>${u.close}</button><img alt=""><div class="lb__bar"><span class="num" data-lbcount></span><div class="lb__nav"><button type="button" data-lbprev aria-label="${lang === "he" ? "הקודם" : "Previous"}">${lang === "he" ? "→" : "←"}</button><button type="button" data-lbnext aria-label="${lang === "he" ? "הבא" : "Next"}">${lang === "he" ? "←" : "→"}</button></div></div></dialog>` : ""}
${p.video || p.externalSite ? `<section class="sec" aria-labelledby="vid-h"><div class="wrap"><div class="sec__head sec__head--row"><h2 class="h-m" id="vid-h">${p.video ? u.video : u.externalSite}</h2>${p.externalSite ? `<a class="link" href="${p.externalSite}" target="_blank" rel="noopener">${u.externalSite}${ARROW}</a>` : ""}</div>
  ${p.video ? `<button type="button" class="vid" data-yt="${p.video}" aria-label="${u.playVideo}: ${esc(t(p.name))}">${pic(p.images[1] || p.images[0], { alt: "", sizes: "100vw", max: 1920 })}<span class="vid__play">${PLAY}</span></button>` : ""}</div></section>` : ""}
<section class="sec ${p.video || p.externalSite ? "sec--paper" : ""}" aria-labelledby="loc-h">
  <div class="wrap loc">
    <div>${layers}<h2 class="h-m" id="loc-h">${u.location}</h2><p class="lead" style="margin-top:16px">${esc(t(p.area))}, ${esc(t(p.city))}</p><p style="margin-top:24px"><a class="link" href="${mapUrl}" target="_blank" rel="noopener">${u.openMap}${ARROW}</a></p></div>
    <div class="loc__map" aria-hidden="true"><div><div class="loc__city">${esc(t(p.city))}</div><div class="muted">${esc(t(p.area))}</div></div></div>
  </div>
</section>
<section class="sec sec--navy on-dark" id="inquiry" aria-labelledby="inq-h">
  <div class="wrap inq">
    <div>${layers}<h2 class="h-m" id="inq-h">${u.interested}</h2><p style="margin-top:16px">${u.interestedText}</p>${p.phone ? `<p style="margin-top:24px">${u.salesLine}: <a class="num" href="tel:${p.phone.replace(/[^0-9*+]/g, "")}" dir="ltr" style="color:#fff">${p.phone}</a></p>` : `<p style="margin-top:24px"><a class="num" href="tel:${company.phone}" dir="ltr" style="color:#fff">${company.phone}</a></p>`}</div>
    ${form(lang, { kind: "project", subject: (lang === "he" ? "פנייה מהאתר" : "Website inquiry") + ": " + t(p.name), fields: [...baseFields(lang, "pq"), `<input type="hidden" name="project" value="${esc(t(p.name))}">`, field(lang, { id: "pq-msg", name: "message", label: ui[lang].form.message, type: "textarea", full: true })] })}
  </div>
</section>
<section class="sec" aria-labelledby="rel-h">
  <div class="wrap"><div class="sec__head sec__head--row"><h2 class="h-m" id="rel-h">${u.related}</h2><a class="link" href="${href(lang, routes.projects)}">${u.allProjects}${ARROW}</a></div>
  <div class="grid">${related.map((r) => card(lang, r)).join("")}</div></div>
</section>`;
  const ld = { "@context": "https://schema.org", "@type": "Place", name: t(p.name), description: t(p.summary), address: { "@type": "PostalAddress", addressLocality: t(p.city), addressCountry: "IL" }, ...(hero ? { image: DOMAIN + largest(hero) } : {}), url: DOMAIN + href(lang, projPath(p)) };
  const title = `${t(p.name)}, ${t(p.city)} | ${company.name[lang]}`;
  return layout(lang, { path: projPath(p), nav: "projects", title, description: t(p.summary), body, preload: hero ? preloadImg(hero, heroSizes) : "", ld: [cr.ld, ld], og: `/og/${p.slug}.jpg` });
}

function renewalPage(lang) {
  const c = pages.renewal[lang], u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[u.nav.renewal, null]]);
  const heroKey = "ur-yokneam/00";
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1.map((l) => `<span style="display:block">${l}</span>`).join("")}</h1><p class="lead">${c.lead}</p></div>
<figure class="phero" style="margin:0">${pic(heroKey, { alt: t(renewal[0].name) + " - " + u.render, sizes: "100vw", eager: true })}<figcaption>${esc(t(renewal[0].name))}. ${u.render}</figcaption></figure>
<section class="sec" aria-labelledby="why-h"><div class="wrap"><div class="sec__head"><h2 class="h-m" id="why-h">${c.whyTitle}</h2></div>
  <div class="facts-row">${c.why.map((w) => `<div><span class="v num">${w.value}</span><span class="l">${w.label}</span></div>`).join("")}</div></div></section>
<section class="sec sec--tight" style="padding-top:0" aria-labelledby="prob-h"><div class="wrap cols2"><div>${layers}<h2 class="h-l" id="prob-h">${c.problemTitle}</h2></div><p class="lead">${c.problem}</p></div></section>
<section class="sec sec--navy on-dark" aria-labelledby="way-h"><div class="wrap"><div class="sec__head">${layers}<h2 class="h-l" id="way-h">${c.wayTitle}</h2></div>
  <ol class="rows" role="list">${c.way.map((w) => `<li class="rv"><h3>${w.title}</h3><p>${w.text}</p></li>`).join("")}</ol></div></section>
<section class="sec" aria-labelledby="urp-h"><div class="wrap"><div class="sec__head"><h2 class="h-l" id="urp-h">${c.projectsTitle}</h2></div>
  <div class="ur">${renewal.map((r) => `<article class="ur__item rv" aria-labelledby="ur-${r.id}">
    <div class="ur__media">${r.images.slice(0, 3).map((k, i) => pic(k, { alt: `${t(r.name)} - ${u.render}${i ? " " + (i + 1) : ""}`, sizes: i ? "(max-width:900px) 33vw, 20vw" : "(max-width:900px) 66vw, 40vw", max: 1920 })).join("")}</div>
    <div><h3 class="h-m" id="ur-${r.id}">${esc(t(r.name))}</h3><p style="margin-top:16px">${esc(t(r.body))}</p><dl>${r.facts.map((f) => `<div><dt>${esc(t(f.label))}</dt><dd class="num">${esc(t(f.value))}</dd></div>`).join("")}</dl></div>
  </article>`).join("")}</div></div></section>
<section class="sec sec--paper" aria-labelledby="ben-h"><div class="wrap"><div class="sec__head">${layers}<h2 class="h-l" id="ben-h">${c.benefitsTitle}</h2></div>
  <ul class="tick">${c.benefits.map((b) => `<li>${b}</li>`).join("")}</ul><p class="note" style="margin-top:28px">${c.benefitsNote}</p></div></section>
<section class="sec sec--navy on-dark" id="contact-ur" aria-labelledby="urf-h"><div class="wrap inq">
  <div>${layers}<h2 class="h-m" id="urf-h">${c.formTitle}</h2><p style="margin-top:16px">${c.formText}</p><p style="margin-top:24px"><a class="num" href="tel:${company.phone}" dir="ltr" style="color:#fff">${company.phone}</a></p></div>
  ${form(lang, { kind: "renewal", subject: lang === "he" ? "התחדשות עירונית - פנייה מהאתר" : "Urban renewal inquiry", fields: [field(lang, { id: "ur-role", name: "role", label: c.role, options: c.roles, required: true }), field(lang, { id: "ur-addr", name: "address", label: c.address, auto: "street-address" }), ...baseFields(lang, "ur"), field(lang, { id: "ur-msg", name: "message", label: u.form.message, type: "textarea", full: true })] })}
</div></section>`;
  return layout(lang, { path: routes.renewal, nav: "renewal", title: c.title, description: c.description, body, preload: preloadImg(heroKey, "100vw"), ld: [cr.ld], og: "/og/urban-renewal.jpg" });
}

function aboutPage(lang) {
  const c = pages.about[lang], u = ui[lang], h = pages.home[lang];
  const cr = crumbs(lang, [[u.nav.about, null]]);
  const heroKey = "white-neighborhood-karmiel/00";
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-xl">${c.h1}</h1><p class="lead" style="margin-top:8px">${c.lead}</p></div>
<figure class="phero" style="margin:0">${pic(heroKey, { alt: (lang === "he" ? "השכונה הלבנה, כרמיאל" : "The White Neighbourhood, Karmiel"), sizes: "100vw", eager: true })}<figcaption>${lang === "he" ? "השכונה הלבנה, כרמיאל" : "The White Neighbourhood, Karmiel"}</figcaption></figure>
<section class="sec" aria-label="${c.milestonesTitle}"><div class="wrap cols2"><div class="prose">${c.story.map((p) => `<p class="lead" style="max-width:none">${p}</p>`).join("")}</div>
  <div><h2 class="h-s" style="margin-bottom:20px">${c.milestonesTitle}</h2><div class="facts" style="position:static"><dl>${c.milestones.map((m) => `<div><dt>${m.label}</dt><dd class="num">${m.value}</dd></div>`).join("")}</dl></div></div></div></section>
<section class="sec sec--navy on-dark" aria-labelledby="roof-h"><div class="wrap roof">
  <div class="roof__text">${layers}<h2 class="h-l" id="roof-h">${h.roofTitle.map((l) => `<span style="display:block">${l}</span>`).join("")}</h2><p>${h.roofText}</p></div>
  <ol class="stack" role="list">${h.roof.map((r) => `<li class="stack__item"><h3>${r.title}</h3><p>${r.text}</p></li>`).join("")}</ol></div></section>
<section class="sec" aria-labelledby="val-h"><div class="wrap"><div class="sec__head">${layers}<h2 class="h-l" id="val-h">${c.valuesTitle}</h2></div>
  <ol class="rows" role="list">${c.values.map((v) => `<li class="rv"><h3>${v.title}</h3><p>${v.text}</p></li>`).join("")}</ol></div></section>
<section class="sec sec--paper" aria-labelledby="fld-h"><div class="wrap"><div class="sec__head"><h2 class="h-m" id="fld-h">${c.fieldsTitle}</h2></div><ul class="tick">${c.fields.map((f) => `<li>${f}</li>`).join("")}</ul></div></section>
<section class="sec" aria-labelledby="reg-h"><div class="wrap"><div class="sec__head"><h2 class="h-m" id="reg-h">${c.regionsTitle}</h2></div>
  <div class="cities">${cityIndex(lang).map(([k, v]) => `<a href="${href(lang, routes.projects)}?city=${k}">${esc(v.name)}<span class="num">${v.n}</span></a>`).join("")}</div></div></section>
<section class="sec sec--tight sec--paper" aria-labelledby="car-h"><div class="wrap sec__head--row sec__head" style="margin:0"><div><h2 class="h-m" id="car-h">${c.ctaTitle}</h2><p class="muted" style="margin-top:10px">${c.ctaText}</p></div><a class="btn" href="${href(lang, routes.careers)}">${u.nav.careers}${ARROW}</a></div></section>`;
  return layout(lang, { path: routes.about, nav: "about", title: c.title, description: c.description, body, preload: preloadImg(heroKey, "100vw"), ld: [cr.ld], og: "/og/about.jpg" });
}

function residentsPage(lang) {
  const c = pages.residents[lang], u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[u.residents, null]]);
  const projOptions = [...byStatus("occupied"), ...byStatus("marketing")].map((p) => `${t(p.name)}, ${t(p.city)}`).concat(lang === "he" ? ["אחר"] : ["Other"]);
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1}</h1><p class="lead">${c.lead}</p></div>
<section class="sec" style="padding-top:0"><div class="wrap inq">
  <aside class="side-card" aria-label="${c.phoneTitle}"><h2>${c.phoneTitle}</h2><a class="cband__phone num" style="color:var(--navy)" href="tel:${company.phone}" dir="ltr">${company.phone}</a><p><a href="mailto:${company.email}">${company.email}</a><br>${company.address[lang]}</p><p class="small muted" style="margin-top:12px">${c.note} <a href="${href(lang, routes.contact)}">${u.nav.contact}</a></p></aside>
  ${form(lang, { kind: "residents", subject: lang === "he" ? "פניית דייר" : "Resident inquiry", fields: [field(lang, { id: "rs-project", name: "project", label: u.form.project, options: projOptions, required: true }), field(lang, { id: "rs-type", name: "type", label: u.form.type, options: c.types, required: true }), ...baseFields(lang, "rs"), field(lang, { id: "rs-msg", name: "message", label: u.form.message, type: "textarea", required: true, full: true })] })}
</div></section>`;
  return layout(lang, { path: routes.residents, title: c.title, description: c.description, body, ld: [cr.ld] });
}

function contactPage(lang) {
  const c = pages.contact[lang], u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[u.nav.contact, null]]);
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1}</h1><p class="lead">${c.lead}</p></div>
<section class="sec" style="padding-top:0"><div class="wrap inq">
  <div><h2 class="h-s" style="margin-bottom:24px">${c.office}</h2>
    <dl class="contact-list">
      <div><dt>${u.form.phone}</dt><dd><a class="num" href="tel:${company.phone}" dir="ltr">${company.phone}</a></dd></div>
      <div><dt>${u.form.email}</dt><dd><a href="mailto:${company.email}">${company.email}</a></dd></div>
      <div><dt>${lang === "he" ? "כתובת" : "Address"}</dt><dd>${company.address[lang]}</dd></div>
    </dl>
    <p style="margin-top:24px"><a class="link" href="${company.mapsUrl}" target="_blank" rel="noopener">${u.openMap}${ARROW}</a></p>
    <div class="side-card" style="margin-top:40px"><h2>${c.residentsBox}</h2><p>${c.residentsText}</p><p><a class="link" href="${href(lang, routes.residents)}">${u.residents}${ARROW}</a></p></div>
  </div>
  ${form(lang, { kind: "contact", subject: lang === "he" ? "פנייה מהאתר" : "Website inquiry", fields: [field(lang, { id: "ct-subject", name: "subject", label: c.subject, options: c.subjects, required: true }), field(lang, { id: "ct-project", name: "project", label: u.form.project, options: byStatus("marketing").map((p) => t(p.name)) }), ...baseFields(lang, "ct"), field(lang, { id: "ct-msg", name: "message", label: u.form.message, type: "textarea", full: true })] })}
</div></section>`;
  const ld = { "@context": "https://schema.org", "@type": "ContactPage", url: DOMAIN + href(lang, routes.contact), name: c.h1 };
  return layout(lang, { path: routes.contact, nav: "contact", title: c.title, description: c.description, body, ld: [cr.ld, ld] });
}

function careersPage(lang) {
  const c = pages.careers[lang], u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[u.nav.careers, null]]);
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1}</h1><p class="lead">${c.lead}</p></div>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="jobs">${jobs.map((j, i) => `<details${i === 0 ? " open" : ""}><summary><div><span class="code num">${j.code}</span><h2>${esc(t(j.title))}</h2></div></summary>
  <div class="jobs__in"><p>${esc(t(j.intro))}</p><div><h3>${c.role}</h3><ul>${t(j.duties).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div><div><h3>${c.req}</h3><ul>${t(j.reqs).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
  <p class="muted small">${c.equal}</p><p><a class="btn" href="mailto:${company.hrEmail}?subject=${encodeURIComponent(j.code + " " + t(j.title))}">${c.apply}${ARROW}</a></p></div></details>`).join("")}</div>
  <p class="lead" style="margin-top:48px">${c.general}<a href="mailto:${company.hrEmail}">${company.hrEmail}</a></p></div></section>`;
  const ld = jobs.map((j) => ({ "@context": "https://schema.org", "@type": "JobPosting", title: t(j.title), description: t(j.intro), hiringOrganization: { "@type": "Organization", name: company.legalName[lang], sameAs: DOMAIN }, employmentType: "FULL_TIME", datePosted: "2026-08-13", jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "IL", addressRegion: lang === "he" ? "צפון" : "North" } } }));
  return layout(lang, { path: routes.careers, nav: "careers", title: c.title, description: c.description, body, ld: [cr.ld, ...ld] });
}

function pressPage(lang) {
  const c = pages.press[lang], u = ui[lang], t = L(lang);
  const cr = crumbs(lang, [[u.nav.press, null]]);
  const body = `
<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1}</h1><p class="lead">${c.lead}</p></div>
<section class="sec" style="padding-top:0"><div class="wrap"><ul class="press">${press.map((x) => {
    const link = x.url ? `<a class="link" href="${x.url}"${x.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""} hreflang="he">${x.pdf ? c.pdf : c.read}${ARROW}</a>` : x.project ? `<a class="link" href="${href(lang, routes.projects + x.project + "/")}">${u.toProject}${ARROW}</a>` : "<span></span>";
    return `<li><time>${t(x.date)}</time><h2 lang="he" dir="rtl">${esc(x.title)}${x.source ? ` <span class="muted" style="font-weight:400">(${esc(x.source)})</span>` : ""}</h2>${link}</li>`;
  }).join("")}</ul></div></section>`;
  return layout(lang, { path: routes.press, nav: "press", title: c.title, description: c.description, body, ld: [cr.ld] });
}

function proseBlocks(blocks) {
  return blocks.map(([k, v]) => (k === "h" ? `<h2>${esc(v)}</h2>` : k === "ul" ? `<ul>${v.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>${esc(v)}</p>`)).join("\n");
}
function legalDoc(lang, doc, path) {
  const d = doc[lang], cr = crumbs(lang, [[d.h1, null]]);
  const body = `<div class="wrap phead">${cr.html}<h1 class="h-l">${d.h1}</h1></div><section class="sec" style="padding-top:0"><div class="wrap prose">${d.note ? `<p class="note">${d.note}</p>` : ""}${proseBlocks(d.blocks)}<p class="muted" style="margin-top:40px">${d.updated}</p></div></section>`;
  return layout(lang, { path, title: d.title, description: d.description, body, ld: [cr.ld] });
}
function legalPage(lang) {
  const c = pages.legal[lang], u = ui[lang], cr = crumbs(lang, [[c.h1, null]]);
  const body = `<div class="wrap phead">${cr.html}<h1 class="h-l">${c.h1}</h1></div>
<section class="sec" style="padding-top:0"><div class="wrap"><ul class="press">
  <li><time>${c.equalPayDate}</time><h2>${c.equalPay}</h2><a class="link" href="/files/equal-pay-report-2026.pdf" hreflang="he">${c.open}${ARROW}</a></li>
  <li><time></time><h2>${privacy[lang].h1}</h2><a class="link" href="${href(lang, routes.privacy)}">${privacy[lang].h1}${ARROW}</a></li>
  <li><time></time><h2>${accessibility[lang].h1}</h2><a class="link" href="${href(lang, routes.accessibility)}">${accessibility[lang].h1}${ARROW}</a></li>
</ul></div></section>`;
  return layout(lang, { path: routes.legal, title: c.title, description: c.description, body, ld: [cr.ld] });
}

function notFound() {
  const h = ui.he.notFound, e = ui.en.notFound;
  const body = `<div class="wrap phead" style="min-height:50vh"><h1 class="h-l">${h.title}</h1><p class="lead">${h.text}</p><div class="hero__cta" style="margin-top:28px"><a class="btn" href="/">${h.home}${ARROW}</a><a class="btn btn--line" href="${routes.projects}">${ui.he.allProjects}</a></div>
  <div lang="en" dir="ltr" style="margin-top:72px;padding-top:32px;border-top:1px solid var(--line)"><h2 class="h-m">${e.title}</h2><p class="lead" style="margin-top:12px">${e.text}</p><p style="margin-top:20px"><a class="link" href="/en/">${e.home}${ARROW}</a></p></div></div>`;
  return layout("he", { path: "/404", title: `${h.title} | ${company.name.he}`, description: h.text, body }).replace('<link rel="canonical"', '<meta name="robots" content="noindex"><link rel="canonical"');
}

// ---------------------------------------------------------------- write
const written = [];
function write(path, html) {
  const file = join(OUT, path.endsWith("/") ? path + "index.html" : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written.push(path);
}
for (const dir of ["en", "projects", "urban-renewal", "about", "residents", "contact", "careers", "press", "accessibility", "privacy", "legal"]) rmSync(join(OUT, dir), { recursive: true, force: true });
for (const f of ["index.html", "404.html", "sitemap.xml", "robots.txt", "_redirects", "_headers"]) rmSync(join(OUT, f), { force: true });
mkdirSync(join(OUT, "assets"), { recursive: true });
for (const f of (await import("node:fs")).readdirSync(join(OUT, "assets"))) if (/^site\.[0-9a-f]+\.js$/.test(f)) rmSync(join(OUT, "assets", f));
writeFileSync(join(OUT, "assets", jsName), js);

const sitemapUrls = [];
for (const lang of LANGS) {
  const pageSet = [
    ["/", home(lang)],
    [routes.projects, projectsHub(lang)],
    [routes.renewal, renewalPage(lang)],
    [routes.about, aboutPage(lang)],
    [routes.residents, residentsPage(lang)],
    [routes.contact, contactPage(lang)],
    [routes.careers, careersPage(lang)],
    [routes.press, pressPage(lang)],
    [routes.accessibility, legalDoc(lang, accessibility, routes.accessibility)],
    [routes.privacy, legalDoc(lang, privacy, routes.privacy)],
    [routes.legal, legalPage(lang)],
    ...projects.map((p) => [projPath(p), projectPage(lang, p)]),
  ];
  for (const [p, html] of pageSet) {
    write(href(lang, p), html);
    if (lang === "he") sitemapUrls.push(p);
  }
}
write("/404.html", notFound());

// sitemap with hreflang alternates
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls.flatMap((p) => LANGS.map((l) => `<url><loc>${DOMAIN}${href(l, p)}</loc><lastmod>${today}</lastmod>${LANGS.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${DOMAIN}${href(a, p)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}${p}"/></url>`)).join("\n")}
</urlset>
`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);

// Cloudflare Pages headers: preview hosts are never indexed; production is.
writeFileSync(join(OUT, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000

https://eshelltd.pages.dev/*
  X-Robots-Tag: noindex, nofollow

https://:branch.eshelltd.pages.dev/*
  X-Robots-Tag: noindex, nofollow

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/img/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=86400
`);

// Old WordPress URLs -> new routes (301). Encoded the way WordPress and browsers send them.
const old = {
  "/מי-אנחנו/": routes.about, "/התחדשות-עירונית/": routes.renewal, "/פניות-דיירים/": routes.residents, "/כתבו-עלינו/": routes.press,
  "/career/": routes.careers, "/privacy-policy/": routes.privacy, "/משפטי/": routes.legal, "/מאמרים/": routes.press,
  "/פרויקטים-בשיווק/": routes.projects + "?status=marketing", "/פרויקטים-בתכנון/": routes.projects + "?status=planning", "/פרוייקטים-מאוכלסים/": routes.projects + "?status=occupied",
  "/מחיר-למשתכן/": routes.projects, "/פרויקטי-דיור-מוגן/": routes.about,
};
for (const p of projects) old[p.source] = projPath(p);
const enc = (s) => s.split("/").map((seg) => encodeURIComponent(seg)).join("/");
const lines = [];
for (const [from, to] of Object.entries(old)) {
  const upper = enc(from), lower = upper.replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());
  lines.push(`${upper} ${to} 301`);
  if (lower !== upper) lines.push(`${lower} ${to} 301`);
}
writeFileSync(join(OUT, "_redirects"), lines.join("\n") + "\n");

console.log(`built ${written.length} pages, ${sitemapUrls.length * 2} sitemap urls, ${lines.length} redirects, css ${css.length}B, js ${js.length}B`);
