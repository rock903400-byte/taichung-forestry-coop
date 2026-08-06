export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export function getToken(request) {
  const h = request.headers.get("Authorization");
  if (!h || !h.startsWith("Bearer ")) return null;
  return h.slice(7).trim();
}

export async function tokenValid(token, env) {
  if (!token) return false;
  const t = await env.CONTENT.get("token:" + token);
  return !!t;
}

export async function hashPassword(pw) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function passwordOk(pw, env) {
  if (!env.ADMIN_PASSWORD) return false;
  if (env.ADMIN_PASSWORD.length === 64 && !env.ADMIN_PASSWORD.includes("test")) {
    return (await hashPassword(pw)) === env.ADMIN_PASSWORD;
  }
  return pw === env.ADMIN_PASSWORD;
}