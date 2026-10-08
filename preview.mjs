// Builds a private review copy in ./preview with relative links, so the site can be shared as a claude.ai artifact.
// The form does not send leads in preview; it just jumps to the thank-you page.
import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const SRC = "docs", OUT = "preview";
rmSync(OUT, { recursive: true, force: true });

function walk(d) { return readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }); }

for (const file of walk(SRC)) {
  const rel = relative(SRC, file).replace(/\\/g, "/");
  if (["CNAME", ".nojekyll"].includes(rel)) continue;
  const dest = join(OUT, rel);
  mkdirSync(dirname(dest), { recursive: true });
  if (!/\.(html|js)$/.test(rel)) { writeFileSync(dest, readFileSync(file)); continue; }
  let s = readFileSync(file, "utf8");
  if (rel.endsWith(".js")) {
    s = s.replace(/fetch\("https:\/\/formsubmit[^"]+",[\s\S]*?\}\)\.then\(function \(r\) \{\s*if \(!r\.ok\) throw new Error\(r\.status\);/,
      'Promise.resolve().then(function () {');
    s = s.replace('location.href = "/thank-you/"', 'location.href = UP + "thank-you/index.html"');
    writeFileSync(dest, "var UP = document.documentElement.dataset.up || '';\n" + s);
    continue;
  }
  const depth = rel.split("/").length - 1;
  const up = depth ? "../".repeat(depth) : "";
  s = s.replace(/(href|src|action)="\/([^"]*)"/g, (_, a, p) => {
    if (p === "" ) p = "index.html";
    else if (p.endsWith("/")) p += "index.html";
    return `${a}="${up}${p}"`;
  });
  s = s.replace('<html lang="en">', `<html lang="en" data-up="${up}">`);
  s = s.replace("<body>", '<body><div style="background:#C8623A;color:#fff;text-align:center;padding:8px;font:600 14px Inter,sans-serif">Preview for review. The form does not send anything yet.</div>');
  if (rel === "index.html") {
    // The artifact host adds its own document skeleton around the main page.
    s = s.replace(/<title>[^<]*<\/title>/, "<title>Simpson Properties Preview</title>");
    s = s.replace("<!doctype html>\n", "").replace(/<\/?html[^>]*>|<\/?head>|<\/?body>/g, "");
    s = s.replace("<script src=\"main.js\"", "<script>document.documentElement.dataset.up=''</script><script src=\"main.js\"");
  }
  writeFileSync(dest, s);
}
console.log("Preview written to ./preview");
