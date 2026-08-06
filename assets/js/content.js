(function () {
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function applyText(s) {
    return escapeHtml(s)
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\n/g, "<br>");
  }

  function getByPath(data, path) {
    if (!path) return undefined;
    return path.split(".").reduce(function (o, k) {
      return o == null ? undefined : o[k];
    }, data);
  }

  function apply(el, v) {
    if (v == null) return;
    if (el.hasAttribute("data-bg")) {
      if (typeof v === "string") {
        el.style.backgroundImage = "url('" + v + "')";
      } else if (v && v.src) {
        el.style.backgroundImage = "url('" + v.src + "')";
      }
      return;
    }
    if (typeof v === "string") {
      el.innerHTML = applyText(v);
      return;
    }
    if (typeof v !== "object") return;
    if (v.text != null) el.innerHTML = applyText(v.text);
    if (v.src != null) {
      if (el.tagName === "IMG") {
        el.src = v.src;
        if (v.alt != null) el.alt = v.alt;
      } else {
        var img = el.querySelector("img");
        if (img) {
          img.src = v.src;
          if (v.alt != null) img.alt = v.alt;
        }
      }
    }
    if (v.href != null && (el.tagName === "A" || el.hasAttribute("data-href"))) {
      el.href = v.href;
    }
    if (v.cap != null && el.hasAttribute("data-cap")) {
      el.setAttribute("data-cap", v.cap);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/content", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("no content api");
        return res.json();
      })
      .then(function (data) {
        document.querySelectorAll("[data-field]").forEach(function (el) {
          apply(el, getByPath(data, el.getAttribute("data-field")));
        });
      })
      .catch(function () {});
  });
})();