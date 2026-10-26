(function () {
  "use strict";
  var d = document, html = d.documentElement, he = html.lang === "he";
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };

  /* ---------- mobile menu ---------- */
  var burger = $(".burger"), mnav = $("#mnav");
  if (burger && mnav) {
    var setMenu = function (open) {
      burger.setAttribute("aria-expanded", open);
      mnav.classList.toggle("open", open);
      d.body.classList.toggle("menu-open", open);
      if (open) { var f = $("a", mnav); if (f) f.focus(); }
    };
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && mnav.classList.contains("open")) { setMenu(false); burger.focus(); } });
  }

  /* ---------- reveal on scroll (below the fold only) ---------- */
  var rv = $$(".rv");
  if (rv.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  /* ---------- projects filter ---------- */
  var grid = $("[data-projects]");
  if (grid) {
    var cards = $$(".card", grid), btns = $$("[data-status]"), city = $("#f-city"), count = $("[data-count]");
    var tpl = count ? count.getAttribute("data-tpl") : "";
    var state = { status: "all", city: "all" };
    var q = new URLSearchParams(location.search);
    if (q.get("status")) state.status = q.get("status");
    if (q.get("city")) state.city = q.get("city");
    var apply = function (push) {
      var n = 0;
      cards.forEach(function (c) {
        var ok = (state.status === "all" || c.dataset.st === state.status) && (state.city === "all" || c.dataset.city === state.city);
        c.hidden = !ok; if (ok) n++;
      });
      btns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.status === state.status); });
      if (city) city.value = state.city;
      if (count) count.textContent = tpl.replace("{n}", n);
      if (push) {
        var p = new URLSearchParams();
        if (state.status !== "all") p.set("status", state.status);
        if (state.city !== "all") p.set("city", state.city);
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : ""));
      }
    };
    btns.forEach(function (b) { b.addEventListener("click", function () { state.status = b.dataset.status; apply(true); }); });
    if (city) city.addEventListener("change", function () { state.city = city.value; apply(true); });
    apply(false);
  }

  /* ---------- gallery lightbox (native <dialog>) ---------- */
  var gal = $(".gal"), lb = $("#lb");
  if (gal && lb && lb.showModal) {
    var items = $$("button", gal), img = $("img", lb), cnt = $("[data-lbcount]", lb), i = 0;
    var show = function (k) {
      i = (k + items.length) % items.length;
      img.src = items[i].dataset.full; img.alt = items[i].dataset.alt || "";
      if (cnt) cnt.textContent = (i + 1) + " / " + items.length;
    };
    items.forEach(function (b, k) { b.addEventListener("click", function () { show(k); lb.showModal(); }); });
    $("[data-lbclose]", lb).addEventListener("click", function () { lb.close(); });
    $("[data-lbprev]", lb).addEventListener("click", function () { show(i - 1); });
    $("[data-lbnext]", lb).addEventListener("click", function () { show(i + 1); });
    lb.addEventListener("keydown", function (e) {
      var fwd = he ? "ArrowLeft" : "ArrowRight", back = he ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) show(i + 1); else if (e.key === back) show(i - 1);
    });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("close", function () { img.removeAttribute("src"); items[i].focus(); });
  }

  /* ---------- video: load YouTube only on click ---------- */
  $$("[data-yt]").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = d.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + b.dataset.yt + "?autoplay=1&rel=0&playsinline=1";
      f.title = b.getAttribute("aria-label") || "video";
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      b.replaceWith(f);
    }, { once: true });
  });

  /* ---------- forms ---------- */
  var cfg = window.EH_FORMS || {};
  $$("form[data-form]").forEach(function (form) {
    var status = $(".form__status", form), msgs = JSON.parse(form.dataset.msgs || "{}");
    var fieldError = function (el, text) {
      var e = d.getElementById(el.id + "-err");
      el.setAttribute("aria-invalid", text ? "true" : "false");
      if (e) e.textContent = text || "";
    };
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var bad = null;
      $$("input,select,textarea", form).forEach(function (el) {
        if (el.type === "checkbox" || el.type === "hidden" || el.name === "botcheck") return;
        var v = el.value.trim(), t = "";
        if (el.required && !v) t = msgs.required;
        else if (v && el.type === "tel" && !/^[+0-9][0-9\s-]{7,16}$/.test(v)) t = msgs.phone;
        else if (v && el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) t = msgs.email;
        fieldError(el, t);
        if (t && !bad) bad = el;
      });
      var consent = $("input[type=checkbox][required]", form);
      if (consent && !consent.checked && !bad) bad = consent;
      if (bad) { bad.focus(); return; }

      var data = {}, lines = [];
      $$("input,select,textarea", form).forEach(function (el) {
        if (!el.name || el.name === "botcheck" || el.type === "checkbox") return;
        data[el.name] = el.value.trim();
        var lab = form.querySelector("label[for='" + el.id + "']");
        if (el.value.trim() && el.type !== "hidden") lines.push((lab ? lab.textContent.replace(/\(.*\)/, "").trim() : el.name) + ": " + el.value.trim());
      });
      var subject = form.dataset.subject + (data.project ? " - " + data.project : "");

      if (cfg.endpoint) {
        status.textContent = msgs.sending;
        fetch(cfg.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.assign({ access_key: cfg.accessKey, subject: subject, from_name: "eshelltd.co.il", page: location.href }, data)),
        }).then(function (r) { return r.json(); }).then(function (r) {
          if (!r.success) throw 0;
          form.reset(); status.textContent = msgs.ok;
        }).catch(function () { status.textContent = msgs.err; });
      } else {
        location.href = "mailto:" + form.dataset.to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        status.textContent = msgs.mailto + form.dataset.to;
      }
    });
  });

  /* ---------- accessibility panel ---------- */
  var ab = $(".a11y-btn"), ap = $("#a11y");
  if (ab && ap) {
    var KEY = "eh-a11y", prefs;
    try { prefs = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { prefs = {}; }
    var sync = function () {
      $$("[data-a]", ap).forEach(function (b) { b.setAttribute("aria-pressed", !!prefs[b.dataset.a]); html.classList.toggle("a-" + b.dataset.a, !!prefs[b.dataset.a]); });
      try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
    };
    ab.addEventListener("click", function () {
      var open = ap.hidden; ap.hidden = !open; ab.setAttribute("aria-expanded", open);
      if (open) $("button", ap).focus();
    });
    $$("[data-a]", ap).forEach(function (b) { b.addEventListener("click", function () { prefs[b.dataset.a] = !prefs[b.dataset.a]; sync(); }); });
    $("[data-areset]", ap).addEventListener("click", function () { prefs = {}; sync(); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ap.hidden) { ap.hidden = true; ab.setAttribute("aria-expanded", "false"); ab.focus(); } });
    sync();
  }
})();
