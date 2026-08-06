# 有限責任臺中市林業生產合作社・森活樂校（官方風格網站）

以 Facebook 粉絲專頁「[臺中市林業生產合作社・森活樂校](https://www.facebook.com/profile.php?id=100063535766973)」之公開資料為依據，製作的多頁式官方網站風格網站（非貼文牆風格）。

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

## 內容管理後台

後台網址：**<https://taichung-forestry-coop.pages.dev/admin>**（已設 `noindex,nofollow`）

- 輸入管理密碼登入，可在「首頁 / 關於我們 / 森活樂校 / 永續行動 / 最新消息 / 活動課程 / 相簿 / 聯絡我們 / 全站設定」等分頁直接編輯文字、更新圖片與連結。
- 修改後點「儲存本頁修改」，立即套用至上線網站（存於 Cloudflare KV）。
- 圖片可「從圖庫選擇」已上傳圖片，或「上傳新圖」（自動壓縮至最長邊 1600px，存於 KV，單張約 2MB 內）。
- 後台密碼以 Pages secret `ADMIN_PASSWORD` 儲存；更換密碼：`wrangler pages secret put ADMIN_PASSWORD`。
- 所有頁面在後台未變更時，內容來自 `data/content.json`（預設值），儲存任一頁面後即改由 KV 內容優先。

## 資產 / 結構

- `assets/avatar.jpg`：粉專大頭照（導覽列標誌、favicon）
- `assets/photo-*.jpg`：活動照片 8 張
- `assets/reel-1.jpg ~ reel-10.jpg`：Reel 真實縮圖 10 張
- `assets/css/style.css`：全站共用樣式
- `assets/js/main.js`：行動版選單、導覽列目前頁面高亮
- `assets/js/content.js`：前台依 KV 內容套用到各頁 `data-field`
- `assets/js/admin.js`、`admin.html`：後台介面
- `data/content.json`：全站預設內容
- `functions/api/`：後端 API（登入驗證、內容讀寫、圖片上傳／顯示），使用 KV namespace `CONTENT`
- `wrangler.toml`：KV 綁定等設定

本地開發伺服器（含後台）：

```bash
wrangler pages dev . --port 8788 --kv CONTENT
```

本機密碼由 `.dev.vars`（`ADMIN_PASSWORD=...`）提供。`.dev.vars`、`.wrangler/` 已列入 `.gitignore`，請勿提交。

## 部署

已部署至 **Cloudflare Pages**：<https://taichung-forestry-coop.pages.dev/>

部署會一併上傳 Functions（API）與 KV 綁定設定：

```bash
# 建立專案（僅首次）
wrangler pages project create taichung-forestry-coop --production-branch=main

# 設定首頁密碼（僅首次或更換密碼）
wrangler pages secret put ADMIN_PASSWORD

# 部署
wrangler pages deploy . --project-name=taichung-forestry-coop --branch=main
```

## Git 管理

本資料夾為獨立 git 儲存庫（分支 main）。資料夾位於父層 `portfolio-website` repo 路徑下，且被其 `.gitignore`（`/*/`）刻意忽略，請在此資料夾內直接使用 git 指令，勿在父層 add。

## 驗證

已全端驗證：8 頁互連無死連結、所有圖片可載入、console 無錯誤、行動版選單正常。
已全端 review 並修正：news 卡片行動版溢出（`.news-wide`）、課程表格窄螢幕橫向捲動（`.table-scroll`）、`og:image` 絕對 URL（指向 Cloudflare Pages）、相簿圖 `rel="noopener"`。
