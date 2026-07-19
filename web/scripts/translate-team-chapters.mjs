// Merges authored translations of the four English-only chapters (11 Composition
// & Foundations, 15 Growth & Onboarding, 16 Distributed & Hybrid Teams, 22 The
// Growth Mindset) plus the updated conclusion into every non-English locale's
// chapter JSON. English is the base: number/part and each check's `correct` index
// are copied from en.json; the per-locale modules supply the translated strings
// and arrays. Idempotent — re-running re-applies the four chapters + conclusion.
//   Run:  node scripts/translate-team-chapters.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const chDir = resolve(here, "..", "src", "lib", "chapters");
const NUMS = [11, 15, 16, 22];
const LOCALES = ["es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

const en = JSON.parse(readFileSync(resolve(chDir, "en.json"), "utf8"));
const enByN = Object.fromEntries(en.chapters.map((c) => [c.number, c]));
const clone = (x) => JSON.parse(JSON.stringify(x));

function warnLen(loc, n, field, got, want) {
  if (got !== want) console.warn(`  ! ${loc} ch${n} ${field}: ${got} items, expected ${want}`);
}

function mergeChapter(loc, n, base, t) {
  const out = clone(base);
  for (const k of ["title", "summary", "theme", "theory", "theoryHtml", "leaderInAction", "practice", "practiceExemplar"]) {
    if (typeof t[k] === "string" && t[k].length) out[k] = t[k];
  }
  for (const k of ["watchOut", "takeaways", "practiceRubric"]) {
    if (Array.isArray(t[k])) {
      warnLen(loc, n, k, t[k].length, base[k].length);
      out[k] = t[k];
    }
  }
  if (t.colourAngle) out.colourAngle = { ...out.colourAngle, ...t.colourAngle };
  if (Array.isArray(t.keyModels)) {
    warnLen(loc, n, "keyModels", t.keyModels.length, base.keyModels.length);
    out.keyModels = base.keyModels.map((m, i) => ({ ...m, ...(t.keyModels[i] || {}) }));
  }
  if (Array.isArray(t.checks)) {
    warnLen(loc, n, "checks", t.checks.length, base.checks.length);
    out.checks = base.checks.map((c, i) => {
      const tc = t.checks[i] || {};
      const merged = { ...c };
      if (typeof tc.q === "string") merged.q = tc.q;
      if (typeof tc.why === "string") merged.why = tc.why;
      if (Array.isArray(tc.options)) {
        warnLen(loc, n, `checks[${i}].options`, tc.options.length, c.options.length);
        merged.options = tc.options;
      }
      return merged;
    });
  }
  return out;
}

let done = 0;
for (const loc of LOCALES) {
  let mod;
  try {
    mod = (await import(`./team-translations/${loc}.mjs`)).default;
  } catch {
    console.log(`${loc}: no translation module — skipped`);
    continue;
  }
  const file = resolve(chDir, `${loc}.json`);
  const book = JSON.parse(readFileSync(file, "utf8"));
  const byN = Object.fromEntries(book.chapters.map((c) => [c.number, c]));
  for (const n of NUMS) {
    const t = mod.chapters?.[n];
    if (!t) {
      console.warn(`  ! ${loc} ch${n} missing in module`);
      continue;
    }
    byN[n] = mergeChapter(loc, n, enByN[n], t);
  }
  book.chapters = Object.values(byN).sort((a, b) => a.number - b.number);
  if (mod.conclusion) {
    if (mod.conclusion.summary) book.conclusion.summary = mod.conclusion.summary;
    if (Array.isArray(mod.conclusion.synthesis)) book.conclusion.synthesis = mod.conclusion.synthesis;
  }
  writeFileSync(file, JSON.stringify(book, null, 2) + "\n", "utf8");
  console.log(`${loc}: merged ${NUMS.length} chapters + conclusion (${book.chapters.length} chapters total)`);
  done++;
}
console.log(`Done — ${done} locale(s) updated.`);
