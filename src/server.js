import http from "node:http";
import { readFile } from "node:fs/promises";
import { createStory } from "./story.js";
const port = Number(process.env.PORT || 3000);
const root = new URL("../public/", import.meta.url);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
async function handler(req, res) {
  const path = new URL(req.url, "http://localhost").pathname;
  const send = (status, value) => { res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }); res.end(JSON.stringify(value)); };
  if (req.method === "POST" && path === "/api/story") {
    let body = "";
    try {
      for await (const chunk of req) {
        body += chunk;
        if (Buffer.byteLength(body) > 8192) { send(413, { error: "Requisição muito grande" }); return; }
      }
      send(200, createStory(JSON.parse(body)));
    } catch (error) { send(400, { error: error instanceof SyntaxError ? "JSON inválido" : error.message }); }
    return;
  }
  if (req.method !== "GET") { send(405, { error: "Método não permitido" }); return; }
  const files = { "/": "index.html", "/index.html": "index.html", "/styles.css": "styles.css", "/app.js": "app.js" };
  if (!files[path]) { send(404, { error: "Não encontrado" }); return; }
  const filename = files[path];
  try {
    const content = await readFile(new URL(filename, root));
    res.writeHead(200, { "content-type": types[filename.slice(filename.lastIndexOf("."))], "x-content-type-options": "nosniff" });
    res.end(content);
  } catch { send(500, { error: "Falha ao carregar arquivo" }); }
}
if (process.env.NODE_ENV !== "test") http.createServer(handler).listen(port, () => console.log(`http://localhost:${port}`));
export { handler };
