import { json, getToken, tokenValid } from "../_lib.js";
import DEFAULT_CONTENT from "../../data/content.json";

export async function onRequestGet(context) {
  return json(DEFAULT_CONTENT);
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