import { json, getToken, tokenValid, passwordOk, hashPassword } from "../_lib.js";

const TOKEN_TTL = 60 * 60 * 24 * 7;

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const pw = typeof body.password === "string" ? body.password : "";
    if (!(await passwordOk(pw, context.env))) {
      return json({ error: "密碼錯誤" }, 401);
    }
    const token = crypto.randomUUID();
    await context.env.CONTENT.put("token:" + token, String(Date.now()), { expirationTtl: TOKEN_TTL });
    return json({ token });
  } catch (e) {
    return json({ error: "請求格式錯誤" }, 400);
  }
}

export async function onRequestGet(context) {
  const token = getToken(context.request);
  if (!token || !(await tokenValid(token, context.env))) {
    return json({ error: "未登入" }, 401);
  }
  return json({ ok: true });
}

export { hashPassword };