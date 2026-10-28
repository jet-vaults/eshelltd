// Preview protection (only when built with LOCK_UNTIL=<ISO date>).
// Watermark overlay + countdown in every page, and a Pages _worker.js that
// shuts the whole deployment (pages and images) once the deadline passes.

export function lockHead(until) {
  const t = Date.parse(until);
  return `<style>
html,body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
img,picture{-webkit-user-drag:none;user-drag:none;pointer-events:auto}
.wm{position:fixed;inset:0;z-index:2147483000;pointer-events:none;background-image:url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='520' height='300'><g transform='rotate(-24 260 150)' font-family='Arial,sans-serif' text-anchor='middle'><text x='260' y='140' font-size='30' font-weight='700' fill='rgba(255,255,255,.22)' stroke='rgba(0,0,0,.18)' stroke-width='.8'>תצוגה מקדימה - איינשטיין אתרים</text><text x='260' y='180' font-size='18' fill='rgba(255,255,255,.2)' stroke='rgba(0,0,0,.15)' stroke-width='.6'>einstein-web.co.il · לא להעתקה</text></g></svg>`)}");background-repeat:repeat}
.lockbar{position:fixed;z-index:2147483001;inset-inline:0;inset-block-end:0;display:flex;justify-content:center;align-items:center;gap:14px;padding:10px 16px calc(10px + env(safe-area-inset-bottom));background:rgba(15,33,64,.94);color:#fff;font:600 15px/1.3 Plex,Arial,sans-serif;direction:rtl}
.lockbar b{font-variant-numeric:tabular-nums;letter-spacing:.04em;background:#fff;color:#0f2140;padding:4px 10px;border-radius:8px}
body{padding-block-end:46px}
.a11y-btn{inset-block-end:64px!important}.a11y{inset-block-end:122px!important}
@media print{body *{display:none!important}body::after{content:"הדפסה אינה מורשית - תצוגה מקדימה של איינשטיין אתרים";display:block;font:20px Arial;padding:40px}}
</style>
<script>window.__LOCK_UNTIL=${t};</script>`;
}

export function lockBody() {
  return `<div class="wm" aria-hidden="true"></div>
<div class="lockbar" role="status">תצוגה מקדימה - איינשטיין אתרים · האתר ייסגר בעוד <b id="lock-t">--:--:--</b></div>
<script>(function(){var T=window.__LOCK_UNTIL,el=document.getElementById("lock-t");
function done(){document.documentElement.innerHTML='<body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#0f2140;color:#fff;font-family:Arial,sans-serif;text-align:center;direction:rtl"><div><h1 style="font-size:34px;margin:0 0 12px">התצוגה המקדימה הסתיימה</h1><p style="opacity:.8;margin:0">עיצוב ופיתוח: איינשטיין אתרים · einstein-web.co.il</p></div></body>'}
function tick(){var s=Math.floor((T-Date.now())/1000);if(s<=0){done();return}var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;el.textContent=(h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(x<10?"0":"")+x;setTimeout(tick,1000)}tick();
document.addEventListener("contextmenu",function(e){e.preventDefault()});
document.addEventListener("dragstart",function(e){if(e.target.tagName==="IMG")e.preventDefault()});
document.addEventListener("copy",function(e){e.preventDefault()});
document.addEventListener("keydown",function(e){var k=(e.key||"").toLowerCase();if((e.ctrlKey||e.metaKey)&&["s","u","p","c"].indexOf(k)>-1||k==="printscreen"||k==="f12"){e.preventDefault()}});
})();</script>`;
}

export function lockWorker(until) {
  const t = Date.parse(until);
  return `// Preview lock: everything is gone after the deadline; images only load from site pages.
const UNTIL = ${t};
const CLOSED = \`<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>התצוגה הסתיימה</title><body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#0f2140;color:#fff;font-family:Arial,sans-serif;text-align:center"><div><h1 style="font-size:34px;margin:0 0 12px">התצוגה המקדימה הסתיימה</h1><p style="opacity:.8;margin:0">עיצוב ופיתוח: איינשטיין אתרים · einstein-web.co.il</p></div></body></html>\`;
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const page = !/[.][a-z0-9]{2,5}$/i.test(url.pathname) || url.pathname.endsWith(".html");
    if (page) {
      const cf = req.cf || {};
      console.log(JSON.stringify({ t: new Date().toISOString(), page: decodeURIComponent(url.pathname), country: cf.country, city: cf.city, region: cf.region, device: /Mobi/i.test(req.headers.get("user-agent") || "") ? "mobile" : "desktop", ref: req.headers.get("referer") || "" }));
    }
    if (Date.now() > UNTIL) return new Response(CLOSED, { status: 410, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } });
    if (/^\\/(img|og|files)\\//.test(url.pathname)) {
      const ref = req.headers.get("referer") || "";
      let ok = false;
      try { ok = new URL(ref).host === url.host; } catch (e) {}
      if (!ok) return new Response("Forbidden", { status: 403, headers: { "cache-control": "no-store" } });
    }
    const res = await env.ASSETS.fetch(req);
    const h = new Headers(res.headers);
    h.set("cache-control", "no-store");
    h.set("x-robots-tag", "noindex, nofollow");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  },
};
`;
}
