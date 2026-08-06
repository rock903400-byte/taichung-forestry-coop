import { json, getToken, tokenValid } from "../_lib.js";

const MAX_BYTES = 2 * 1024 * 1024;

export async function onRequestPost(context) {
  const token = getToken(context.request);
  if (!token || !(await tokenValid(token, context.env))) {
    return json({ error: "未登入或登入已過期" }, 401);
  }
  try {
    const body = await context.request.json();
    const data = typeof body.data === "string" ? body.data : "";
    const name = typeof body.name === "string" ? body.name : "photo";
    const m = data.match(/^data:image\/(jpeg|png|webp|gif);base64,/);
    if (!m) return json({ error: "僅支援 JPEG/PNG/WebP/GIF 圖片" }, 400);
    const raw = data.split(",")[1];
    const approxBytes = Math.ceil((raw.length * 3) / 4);
    if (approxBytes > MAX_BYTES) {
      return json({ error: "圖片太大（上限 2MB），請壓縮後再上傳" }, 400);
    }
    const id = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
    await context.env.CONTENT.put("upload:" + id, data);

    const indexRaw = await context.env.CONTENT.get("uploads");
    const index = indexRaw ? JSON.parse(indexRaw) : {};
    index[id] = { id, name, url: "/api/img/" + id, size: approxBytes, at: Date.now() };
    await context.env.CONTENT.put("uploads", JSON.stringify(index));

    return json({ ok: true, id, url: "/api/img/" + id, name });
  } catch (e) {
    return json({ error: "上傳失敗" }, 400);
  }
}

export async function onRequestGet(context) {
  const token = getToken(context.request);
  if (!token || !(await tokenValid(token, context.env))) {
    return json({ error: "未登入或登入已過期" }, 401);
  }
  try {
    const indexRaw = await context.env.CONTENT.get("uploads");
    const index = indexRaw ? JSON.parse(indexRaw) : {};
    return json(Object.values(index).reverse());
  } catch (e) {
    return json({ error: "讀取失敗" }, 500);
  }
}