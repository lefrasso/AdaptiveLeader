// Generates out/index.html after `next build` (static export).
// GitHub Pages serves out/ at ${basePath}/; this redirects "/" to a locale.
import { writeFile } from "node:fs/promises";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const locales = ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Adaptive Leader</title>
<script>
(function () {
  var supported = ${JSON.stringify(locales)};
  var stored;
  try { stored = localStorage.getItem("al.locale"); } catch (e) {}
  var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  var target =
    (stored && supported.indexOf(stored) >= 0) ? stored :
    (supported.indexOf(nav) >= 0 ? nav : "en");
  location.replace("${basePath}/" + target + "/");
})();
</script>
<meta http-equiv="refresh" content="0;url=${basePath}/en/">
</head>
<body>
<p>Redirecting to <a href="${basePath}/en/">The Adaptive Leader</a>&hellip;</p>
</body>
</html>
`;

await writeFile("out/index.html", html);
console.log("root-redirect: wrote out/index.html (basePath=" + (basePath || "/") + ")");
