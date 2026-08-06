(function () {
  var TOKEN = localStorage.getItem("tfpc_token") || "";
  var content = null;
  var uploads = [];
  var pickerCb = null;

  var ASSETS = [
    "assets/avatar.jpg",
    "assets/photo-diaozhi.jpg",
    "assets/photo-huayu.jpg",
    "assets/photo-line.jpg",
    "assets/photo-linying.jpg",
    "assets/photo-tuku1.jpg",
    "assets/photo-tuku3.jpg",
    "assets/photo-volunteer.jpg",
    "assets/photo-zhulin.jpg",
    "assets/reel-1.jpg", "assets/reel-2.jpg", "assets/reel-3.jpg", "assets/reel-4.jpg",
    "assets/reel-5.jpg", "assets/reel-6.jpg", "assets/reel-7.jpg", "assets/reel-8.jpg",
    "assets/reel-9.jpg", "assets/reel-10.jpg"
  ];

  var TABS = [
    { title: "首頁", path: "index", groups: [
      { label: "主視覺 Hero", fields: [
        { key: "hero.kicker", label: "上方標籤文字" },
        { key: "hero.t1", label: "主標題（第一行）" },
        { key: "hero.t2", label: "主標題（第二行）" },
        { key: "hero.s1", label: "副標語（前半）" },
        { key: "hero.s2", label: "副標語（金色強調）" },
        { key: "hero.btn1", type: "link", label: "按鈕一" },
        { key: "hero.btn2", type: "link", label: "按鈕二" },
        { key: "hero.bg", type: "img", label: "背景圖片" }
      ]},
      { label: "統計數字", list: { key: "stats", itemFields: [
        { key: "b", label: "數字" },
        { key: "s", label: "說明" }
      ]}},
      { label: "我們的精神", fields: [
        { key: "spirit.title", label: "區塊標題" },
        { key: "spirit.desc", label: "區塊說明" }
      ], list: { key: "spirit.items", itemFields: [
        { key: "icon", label: "圖示（Emoji）" },
        { key: "title", label: "標題" },
        { key: "body", type: "textarea", label: "內文" }
      ]}},
      { label: "最新消息（首頁 3 張卡片）", fields: [
        { key: "news.title", label: "區塊標題" },
        { key: "news.desc", label: "區塊說明" }
      ], list: { key: "news.cards", itemFields: [
        { key: "img", type: "img", label: "卡片圖片" },
        { key: "tag", label: "標籤" },
        { key: "date", label: "日期" },
        { key: "title", label: "標題" },
        { key: "body", type: "textarea", label: "內文" },
        { key: "link_text", label: "底部連結文字" },
        { key: "href", label: "卡片點擊網址" }
      ]}},
      { label: "森活樂校（首頁區塊）", fields: [
        { key: "school.kicker", label: "標籤" },
        { key: "school.title", label: "標題" },
        { key: "school.desc", label: "說明" },
        { key: "school.body", type: "textarea", label: "內文" },
        { key: "school.link", type: "link", label: "連結" },
        { key: "school.img", type: "img", label: "圖片" },
        { key: "school.caption", label: "圖片說明文字" }
      ]},
      { label: "永續行動區塊", fields: [
        { key: "action.title", label: "區塊標題" },
        { key: "action.desc", label: "區塊說明" },
        { key: "action.h3", label: "主標題" },
        { key: "action.p1", type: "textarea", label: "內文一" },
        { key: "action.p2", label: "內文二" },
        { key: "action.form.b", type: "textarea", label: "報名方塊文字" },
        { key: "action.form.btn", type: "link", label: "報名按鈕" },
        { key: "action.form.hint", label: "表單網址提示" }
      ], list: { key: "action.hashes", itemFields: [
        { key: "", label: "活動標籤（#）" }
      ]}},
      { label: "聯絡我們（首頁）", fields: [
        { key: "contact.title", label: "標題" },
        { key: "contact.desc", label: "說明" }
      ], list: { key: "contact.items", itemFields: [
        { key: "icon", label: "圖示（Emoji）" },
        { key: "label", label: "名稱" },
        { key: "value", label: "內容" },
        { key: "value2", label: "補充（僅電話項）", optional: true }
      ]}, list2: { key: "contact.btns", itemFields: [
        { key: "text", label: "按鈕文字" },
        { key: "href", label: "網址" }
      ]}}
    ]},
    { title: "關於我們", path: "about", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "合作社沿革", fields: [
        { key: "h2", label: "標題" }
      ], list: { key: "paras", itemFields: [
        { key: "", type: "textarea", label: "段落（可用 **粗體**）" }
      ]}},
      { label: "承攬標案紀錄", fields: [
        { key: "highlight.label", label: "前置文字" },
        { key: "highlight.body", type: "textarea", label: "內文" }
      ]},
      { label: "基本資料表（修改右列內容）", list: { key: "info", itemFields: [
        { key: "", label: "內容" }
      ]}},
      { label: "大事紀", fields: [
        { key: "timeline.title", label: "標題" },
        { key: "timeline.desc", label: "說明" }
      ], list: { key: "timeline.items", itemFields: [
        { key: "date", label: "日期" },
        { key: "title", label: "標題" },
        { key: "body", type: "textarea", label: "內文" }
      ]}}
    ]},
    { title: "森活樂校", path: "school", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "基地介紹", fields: [
        { key: "figure.img", type: "img", label: "圖片" },
        { key: "figure.caption", label: "圖片說明文字" },
        { key: "section.body", type: "textarea", label: "內文" }
      ], list: { key: "section.items", itemFields: [
        { key: "", label: "條列項目" }
      ]}},
      { label: "媒體報導", fields: [
        { key: "media.title", label: "標題" },
        { key: "media.desc", label: "說明" },
        { key: "media.video", type: "link", label: "影片連結" },
        { key: "media.btn", type: "link", label: "按鈕" }
      ]},
      { label: "森林安全小教室", fields: [
        { key: "safety.title", label: "標題" },
        { key: "safety.desc", label: "說明" }
      ], list: { key: "safety.cards", itemFields: [
        { key: "img", type: "img", label: "圖片" },
        { key: "title", label: "標題" },
        { key: "desc", type: "textarea", label: "說明" }
      ]}}
    ]},
    { title: "永續行動", path: "action", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "活動主視覺", fields: [
        { key: "banner.h3", label: "主標題" },
        { key: "banner.p1", type: "textarea", label: "內文一" },
        { key: "banner.p2", label: "內文二" },
        { key: "banner.form.b", type: "textarea", label: "報名方塊文字" },
        { key: "banner.form.btn", type: "link", label: "報名按鈕" },
        { key: "banner.form.hint", label: "表單網址提示" }
      ], list: { key: "banner.hashes", itemFields: [
        { key: "", label: "活動標籤（#）" }
      ]}},
      { label: "行動內容", fields: [
        { key: "cards.title", label: "標題" },
        { key: "cards.desc", label: "說明" }
      ], list: { key: "cards.items", itemFields: [
        { key: "icon", label: "圖示（Emoji）" },
        { key: "title", label: "標題" },
        { key: "body", type: "textarea", label: "內文" }
      ]}}
    ]},
    { title: "最新消息", path: "news", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "消息文章（各篇依內容自動顯示欄位）", list: { key: "articles", itemFields: [
        { key: "img", type: "img", label: "配圖" },
        { key: "tag", label: "標籤" },
        { key: "date", label: "日期" },
        { key: "title", label: "標題" },
        { key: "body", type: "textarea", label: "內文" },
        { key: "body2", type: "textarea", label: "補充內文", optional: true },
        { key: "video", type: "link", label: "影片網址", optional: true },
        { key: "form", type: "link", label: "報名表單網址", optional: true },
        { key: "btn1", type: "link", label: "按鈕一", optional: true },
        { key: "btn2", type: "link", label: "按鈕二", optional: true }
      ], subList: { key: "hashes", label: "活動標籤（#）", itemFields: [
        { key: "", label: "標籤" }
      ]}}},
      { label: "頁尾說明", fields: [
        { key: "note.pre", label: "前置文字" },
        { key: "note.link", type: "link", label: "Facebook 連結" }
      ]}
    ]},
    { title: "活動課程", path: "courses", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "課程時間表", list: { key: "table", itemFields: [
        { key: "time", type: "textarea", label: "時間（**日期**可粗體）" },
        { key: "content", type: "textarea", label: "研習內容 / 主題" },
        { key: "location", type: "textarea", label: "地點" },
        { key: "target", label: "對象" }
      ]}},
      { label: "報名說明", fields: [
        { key: "note", type: "textarea", label: "注意事項（可用 **粗體**）" }
      ]},
      { label: "研習回顧（照片與說明）", fields: [
        { key: "gallery.title", label: "區塊標題" },
        { key: "gallery.desc", label: "區塊說明" }
      ], list: { key: "gallery.items", itemFields: [
        { key: "", type: "img", label: "照片" }
      ]}}
    ]},
    { title: "相簿", path: "gallery", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "活動照片（調整照片與說明對應）", fields: [
        { key: "section.title", label: "區塊標題" },
        { key: "section.desc", label: "區塊說明" }
      ], list: { key: "items", itemFields: [
        { key: "", type: "img", label: "照片" }
      ]}},
      { label: "影音專區 Reel", fields: [
        { key: "videos.title", label: "標題" },
        { key: "videos.desc", label: "說明" }
      ], list: { key: "videos.items", itemFields: [
        { key: "", type: "img", label: "影片封面與連結" }
      ]}}
    ]},
    { title: "聯絡我們", path: "contact", groups: [
      { label: "頁首", fields: [
        { key: "hero.title", label: "標題" },
        { key: "hero.sub", label: "說明" }
      ]},
      { label: "聯絡方式", list: { key: "items", itemFields: [
        { key: "icon", label: "圖示（Emoji）" },
        { key: "label", label: "名稱" },
        { key: "value", label: "內容" },
        { key: "value2", label: "補充（僅電話項）", optional: true }
      ]}},
      { label: "連結按鈕", list: { key: "btns", itemFields: [
        { key: "text", label: "按鈕文字" },
        { key: "href", label: "網址" }
      ]}},
      { label: "一起參與", fields: [
        { key: "join.title", label: "標題" },
        { key: "join.desc", label: "說明" }
      ], list: { key: "join.items", itemFields: [
        { key: "title", label: "標題" },
        { key: "body", type: "textarea", label: "內文" }
      ]}}
    ]},
    { title: "全站設定", path: "site", groups: [
      { label: "各頁共用文字", fields: [
        { key: "brand", label: "導覽列名稱" },
        { key: "footer_brand", label: "頁尾名稱" },
        { key: "footer_slogan", label: "頁尾標語" },
        { key: "footer_note", label: "頁尾版權文字" },
        { key: "footer_note2", label: "頁尾口號" }
      ]}
    ]}
  ];

  function $(s, p) { return (p || document).querySelector(s); }
  function el(tag, attrs) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    return n;
  }
  function getAt(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, content);
  }

  function api(url, opts) {
    opts = opts || {};
    var h = {};
    if (TOKEN) h.Authorization = "Bearer " + TOKEN;
    if (opts.body && typeof opts.body === "object") {
      h["Content-Type"] = "application/json";
      opts.body = JSON.stringify(opts.body);
    }
    return fetch(url, {
      method: opts.method || "GET",
      headers: h,
      body: opts.body,
      cache: "no-store"
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error(data.error || "HTTP " + res.status);
        return data;
      });
    });
  }

  function msg(text, ok) {
    var m = $("#saveMsg");
    m.textContent = text || "";
    m.className = "msg " + (ok ? "ok" : "err");
    if (text) setTimeout(function () { m.textContent = ""; }, 4000);
  }

  function textField(container, path, def) {
    var wrap = el("div", { class: "item" });
    wrap.appendChild(el("label", { html: def.label }));
    var inp = el("textarea", { "data-bind": path, class: "tarea" });
    inp.style.minHeight = "90px";
    var v = getAt(path);
    if (v != null) inp.value = v;
    wrap.appendChild(inp);
    container.appendChild(wrap);
  }

  function inputField(container, path, def) {
    var wrap = el("div", { class: "item" });
    wrap.appendChild(el("label", { html: def.label }));
    var inp = el("input", { type: "text", "data-bind": path });
    var v = getAt(path);
    if (v != null) inp.value = v;
    wrap.appendChild(inp);
    container.appendChild(wrap);
  }

  function linkField(container, path, def) {
    var v = getAt(path);
    if (!v) return;
    var wrap = el("div", { class: "item" });
    wrap.appendChild(el("label", { html: def.label }));
    var row = el("div", { class: "row" });
    var d1 = el("div");
    d1.appendChild(el("label", { html: "文字" }));
    var t = el("input", { type: "text", "data-bind": path + ".text" });
    t.value = v.text || "";
    d1.appendChild(t);
    var d2 = el("div");
    d2.appendChild(el("label", { html: "網址" }));
    var u = el("input", { type: "text", "data-bind": path + ".href" });
    u.value = v.href || "";
    d2.appendChild(u);
    row.appendChild(d1);
    row.appendChild(d2);
    wrap.appendChild(row);
    container.appendChild(wrap);
  }

  function imgField(container, path, def) {
    var v = getAt(path);
    if (v == null) return;
    var isObj = typeof v === "object";
    var wrap = el("div", { class: "item" });
    wrap.appendChild(el("label", { html: def.label }));
    var box = el("div", { class: "img-field" });
    var thumb = el("img", { class: "thumb" });
    var ctrl = el("div", { class: "ctrl" });
    var btns = el("div", { class: "btns" });
    var bUp = el("button", { html: "上傳新圖" });
    var bPick = el("button", { html: "從圖庫選擇" });
    btns.appendChild(bUp);
    btns.appendChild(bPick);
    ctrl.appendChild(btns);

    function setSrc(url) {
      var inp = ctrl.querySelector("[data-bind]");
      if (inp) inp.value = url;
      thumb.src = url;
    }
    bUp.addEventListener("click", function () {
      var f = el("input", { type: "file", accept: "image/*" });
      f.style.display = "none";
      document.body.appendChild(f);
      f.addEventListener("change", function () {
        if (f.files[0]) uploadImage(f.files[0], setSrc);
        f.remove();
      });
      f.click();
    });
    bPick.addEventListener("click", function () {
      pickerCb = setSrc;
      openPicker();
    });

    if (isObj) {
      ctrl.appendChild(el("label", { html: "圖片網址" }));
      var src = el("input", { type: "text", "data-bind": path + ".src" });
      src.value = v.src || "";
      src.addEventListener("input", function () { thumb.src = src.value; });
      ctrl.appendChild(src);
      if (v.alt != null) {
        ctrl.appendChild(el("label", { html: "替代文字" }));
        var alt = el("input", { type: "text", "data-bind": path + ".alt" });
        alt.value = v.alt || "";
        ctrl.appendChild(alt);
      }
      if (v.cap != null) {
        ctrl.appendChild(el("label", { html: "照片說明（滑鼠移過照片時顯示）" }));
        var cap = el("textarea", { "data-bind": path + ".cap" });
        cap.value = v.cap || "";
        ctrl.appendChild(cap);
      }
      if (v.href != null) {
        ctrl.appendChild(el("label", { html: "點擊後的網址" }));
        var hre = el("input", { type: "text", "data-bind": path + ".href" });
        hre.value = v.href || "";
        ctrl.appendChild(hre);
      }
      thumb.src = v.src || "";
    } else {
      ctrl.appendChild(el("label", { html: "圖片網址" }));
      var s2 = el("input", { type: "text", "data-bind": path });
      s2.value = v || "";
      s2.addEventListener("input", function () { thumb.src = s2.value; });
      ctrl.appendChild(s2);
      thumb.src = v || "";
    }
    box.appendChild(thumb);
    box.appendChild(ctrl);
    wrap.appendChild(box);
    container.appendChild(wrap);
  }

  function field(container, path, def) {
    if (def.type === "textarea") textField(container, path, def);
    else if (def.type === "img") imgField(container, path, def);
    else if (def.type === "link") linkField(container, path, def);
    else inputField(container, path, def);
  }

  function renderList(container, basePath, listDef, listLabel) {
    var arr = getAt(basePath + "." + listDef.key);
    if (!Array.isArray(arr)) return;
    arr.forEach(function (item, i) {
      var itemPath = basePath + "." + listDef.key + "." + i;
      var sub = el("div", { class: "sub-item" });
      sub.appendChild(el("b", { html: (listLabel || listDef.label || listDef.key) + "  第 " + (i + 1) + " 項" }));
      listDef.itemFields.forEach(function (d) {
        if (d.optional && getAt(itemPath + (d.key ? "." + d.key : "")) == null) return;
        field(sub, itemPath + (d.key ? "." + d.key : ""), d);
      });
      if (listDef.subList) {
        renderList(sub, itemPath, listDef.subList);
      }
      container.appendChild(sub);
    });
  }

  function renderGroup(container, group) {
    var g = el("div", { class: "group" });
    g.appendChild(el("h3", { html: group.label }));
    var base = group.path ? group.path + "." : "";
    (group.fields || []).forEach(function (d) {
      if (d.optional && getAt(base + d.key) == null) return;
      field(g, base + d.key, d);
    });
    if (group.list) renderList(g, group.path || "", group.list);
    if (group.list2) renderList(g, group.path || "", group.list2);
    container.appendChild(g);
  }

  function renderAll() {
    var main = $("#main");
    main.innerHTML = "";
    TABS.forEach(function (tab, i) {
      var sec = el("div", { class: "tabsec", "data-tab": i });
      sec.style.display = i === 0 ? "block" : "none";
      sec.appendChild(el("div", { class: "tab-title", html: tab.title }));
      sec.appendChild(el("div", { class: "tab-sub", html: "修改後請點下方「儲存本頁修改」" }));
      tab.groups.forEach(function (g) {
        g.path = tab.path;
        var gc = el("div");
        gc.className = "";
        renderGroup(gc, g);
        Array.prototype.slice.call(gc.children).forEach(function (node) { sec.appendChild(node); });
      });
      main.appendChild(sec);
    });

    var tabs = $("#tabs");
    tabs.innerHTML = "";
    TABS.forEach(function (tab, i) {
      var b = el("button", { html: tab.title });
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () {
        document.querySelectorAll("#tabs button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        document.querySelectorAll(".tabsec").forEach(function (s) { s.style.display = "none"; });
        $('.tabsec[data-tab="' + i + '"]').style.display = "block";
      });
      tabs.appendChild(b);
    });
  }

  function collect() {
    var inputs = document.querySelectorAll("#main [data-bind]");
    Array.prototype.forEach.call(inputs, function (inp) {
      var seg = inp.getAttribute("data-bind").split(".");
      var target = content;
      for (var i = 0; i < seg.length - 1; i++) {
        if (target[seg[i]] == null) target[seg[i]] = /^\d+$/.test(seg[i + 1]) ? [] : {};
        target = target[seg[i]];
      }
      var v = inp.value;
      if (inp.tagName === "TEXTAREA") v = v.replace(/\r\n/g, "\n");
      target[seg[seg.length - 1]] = v;
    });
  }

  function save() {
    collect();
    $("#saveBtn").disabled = true;
    api("/api/content", { method: "PUT", body: content })
      .then(function () { msg("已儲存！前台網站已同步更新。", true); })
      .catch(function (e) { msg("儲存失敗：" + e.message, false); })
      .finally(function () { $("#saveBtn").disabled = false; });
  }

  function uploadImage(file, cb) {
    msg("圖片處理中…", false);
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var MAX = 1600;
        var scale = Math.min(1, MAX / Math.max(img.width, img.height));
        var canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        api("/api/upload", { method: "POST", body: { name: file.name, data: dataUrl } })
          .then(function (r) {
            uploads.push(r);
            cb(r.url);
            msg("上傳完成。", true);
          })
          .catch(function (err) { msg("上傳失敗：" + err.message, false); });
      };
      img.onerror = function () { msg("無法讀取圖片", false); };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function openPicker() {
    var grid = $("#modalGrid");
    grid.innerHTML = "";
    var seen = {};
    function add(url) {
      if (seen[url]) return;
      seen[url] = true;
      var b = el("button");
      b.appendChild(el("img", { src: url, loading: "lazy" }));
      b.addEventListener("click", function () {
        if (pickerCb) pickerCb(url);
        closePicker();
      });
      grid.appendChild(b);
    }
    ASSETS.forEach(add);
    uploads.forEach(function (u) { add(u.url); });
    $("#modal").style.display = "flex";
  }
  function closePicker() {
    $("#modal").style.display = "none";
    pickerCb = null;
  }

  function enterApp() {
    $("#login").style.display = "none";
    $("#app").style.display = "block";
    renderAll();
  }

  function boot() {
    $("#loginBtn").addEventListener("click", doLogin);
    $("#pw").addEventListener("keydown", function (e) { if (e.key === "Enter") doLogin(); });
    $("#saveBtn").addEventListener("click", save);
    $("#logoutBtn").addEventListener("click", function () {
      localStorage.removeItem("tfpc_token");
      location.reload();
    });
    $("#modalClose").addEventListener("click", closePicker);
    $("#modal").addEventListener("click", function (e) { if (e.target.id === "modal") closePicker(); });

    if (!TOKEN) return;
    api("/api/auth")
      .then(function () {
        return Promise.all([api("/api/content"), api("/api/upload")]);
      })
      .then(function (r) {
        content = r[0];
        uploads = r[1] || [];
        enterApp();
      })
      .catch(function () {
        localStorage.removeItem("tfpc_token");
        TOKEN = "";
      });
  }

  function doLogin() {
    var pw = $("#pw").value;
    if (!pw) return;
    api("/api/auth", { method: "POST", body: { password: pw } })
      .then(function (r) {
        TOKEN = r.token;
        localStorage.setItem("tfpc_token", TOKEN);
        return Promise.all([api("/api/content"), api("/api/upload")]);
      })
      .then(function (r) {
        content = r[0];
        uploads = r[1] || [];
        enterApp();
      })
      .catch(function (e) {
        $("#loginErr").textContent = "登入失敗：" + e.message;
      });
  }

  document.addEventListener("DOMContentLoaded", boot);
})();