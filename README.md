# 有限責任臺中市林業生產合作社・森活樂校（官方風格網站）

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 以 Facebook 粉絲專頁「[臺中市林業生產合作社・森活樂校](https://www.facebook.com/profile.php?id=100063535766973)」之公開資料為依據，製作的多頁式官方網站風格網站（非貼文牆風格）。

**線上網站**: https://rock903400-byte.github.io/taichung-forestry-coop/

## 網站頁面

| 頁面 | 檔案 | 內容 |
|---|---|---|
| 首頁 | `index.html` | 主視覺、統計、理念、最新消息預覽、活動課程預覽、永續行動預覽、聯絡資訊 |
| 關於我們 | `about.html` | 合作社簡介、基本資料表（統編 82481842）、大事紀 |
| 森活樂校 | `school.html` | 頭嵙山森林社會基地介紹、媒體報導、森林安全小教室 |
| 永續行動 | `action.html` | 2025「換土＋種土」行動、報名表單 |
| 最新消息 | `news.html` | 新聞稿式文章（非 FB 牆） |
| 活動課程 | `courses.html` | 研習課程表、報名資訊 |
| 相簿 | `gallery.html` | 活動照片 8 張、精選短影片 Reel 10 支（真實縮圖） |
| 聯絡我們 | `contact.html` | 地址、電話、Email、Messenger、合作社登記查詢 |

## 資料原則

- 所有文字內容與 Facebook 粉專公開資訊一致，不放入動態數字（如追蹤者數、Reel 觀看數）。
- 地址為「臺中市新社區協中街 257 號（426）」。
- 「合作社登記查詢」連結為政府登記頁（si.taiwan.gov.tw），並非合作社官方網站。
- 圖片來源為 FB 粉專公開照片與 Reel 縮圖，僅供本專案展示使用。

## 內容管理後台（保留於私有環境）

後台介面（`admin.html` 與 `assets/js/admin.js`）為內容管理用途，需搭配 Cloudflare KV 後端
（`functions/api/`、`wrangler.toml`、`data/content.json`），該後端**未隨此公開 repo 發布**，
僅存在於業主私有部署環境。此公開 repo 以靜態前端展示為主。

## 資產 / 結構

- `assets/avatar.jpg`：粉專大頭照（導覽列標誌、favicon）
- `assets/photo-*.jpg`：活動照片 8 張
- `assets/reel-1.jpg ~ reel-10.jpg`：Reel 真實縮圖 10 張
- `assets/css/style.css`：全站共用樣式
- `assets/js/main.js`：行動版選單、導覽列目前頁面高亮
- `assets/js/content.js`：前台依 KV 內容套用到各頁 `data-field`
- `assets/js/admin.js`、`admin.html`：後台介面前端（需搭配私有後端）

## 部署

已部署至 **GitHub Pages**：<https://rock903400-byte.github.io/taichung-forestry-coop/>

同步視覺版部署於 Cloudflare Pages（含後台）：<https://taichung-forestry-coop.pages.dev/>

## 驗證

已全端驗證：8 頁互連無死連結、所有圖片可載入、console 無錯誤、行動版選單正常。
已全端 review 並修正：news 卡片行動版溢出（`.news-wide`）、課程表格窄螢幕橫向捲動（`.table-scroll`）、`og:image` 絕對 URL（指向 GitHub Pages）、相簿圖 `rel="noopener"`。

## License

MIT
