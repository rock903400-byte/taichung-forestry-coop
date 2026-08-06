import { json, getToken, tokenValid } from "../_lib.js";

export async function onRequestGet(context) {
  try {
    const stored = await context.env.CONTENT.get("content");
    if (stored) {
      return json(JSON.parse(stored));
    }
    const fallback = await context.env.ASSETS.fetch(
      new URL("/data/content.json", context.request.url).toString()
    );
    if (fallback.ok) {
      return json(await fallback.json());
    }
    return json({ error: "內容尚未初始化" }, 404);
  } catch (e) {
    return json({ error: "讀取失敗" }, 500);
  }
}

export async function onRequestPut(context) {
  const token = getToken(context.request);
  if (!token || !(await tokenValid(token, context.env))) {
    return json({ error: "未登入或登入已過期" }, 401);
  }
  try {
    const body = await context.request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "內容格式錯誤" }, 400);
    }
    await context.env.CONTENT.put("content", JSON.stringify(body));
    return json({ ok: true, savedAt: Date.now() });
  } catch (e) {
    return json({ error: "請求格式錯誤" }, 400);
  }
}