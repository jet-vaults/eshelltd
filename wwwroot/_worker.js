// Preview lock: everything is gone after the deadline; images only load from site pages.
const UNTIL = 1793207605000;
const CLOSED = `<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>התצוגה הסתיימה</title><body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#0f2140;color:#fff;font-family:Arial,sans-serif;text-align:center"><div><h1 style="font-size:34px;margin:0 0 12px">התצוגה המקדימה הסתיימה</h1><p style="opacity:.8;margin:0">עיצוב ופיתוח: איינשטיין אתרים · einstein-web.co.il</p></div></body></html>`;
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const page = !/.[a-z0-9]{2,5}$/i.test(url.pathname) || url.pathname.endsWith(".html");
    if (page) {
      const cf = req.cf || {};
      console.log(JSON.stringify({ t: new Date().toISOString(), page: decodeURIComponent(url.pathname), country: cf.country, city: cf.city, region: cf.region, device: /Mobi/i.test(req.headers.get("user-agent") || "") ? "mobile" : "desktop", ref: req.headers.get("referer") || "" }));
    }
    if (Date.now() > UNTIL) return new Response(CLOSED, { status: 410, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } });
    if (/^\/(img|og|files)\//.test(url.pathname)) {
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
