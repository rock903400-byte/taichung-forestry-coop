function ext2mime(ext) {
  return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" }[ext] || "application/octet-stream";
}

function decode(data) {
  const m = data.match(/^data:([^;]+);base64,(.+)$/);
  if (!m) return null;
  const bin = atob(m[2]);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return { type: m[1], bytes };
}

export async function onRequestGet(context) {
  const id = context.params.id || "";
  if (!id) {
    return new Response("Not Found", { status: 404 });
  }
  const data = await context.env.CONTENT.get("upload:" + id);
  if (!data) {
    return new Response("Not Found", { status: 404 });
  }
  const img = decode(data);
  if (!img) {
    return new Response("Bad Image", { status: 415 });
  }
  return new Response(img.bytes, {
    headers: {
      "Content-Type": img.type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}