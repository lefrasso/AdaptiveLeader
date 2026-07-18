// One-off migration helper: extracts the English chapter content from the legacy
// vanilla-JS data files (script.js LANG_BOOK.en, chapters-extra.js CHAPTERS_EXTRA,
// theory-i18n.js THEORY_HTML.en) and emits a typed JSON payload consumed by
// src/lib/chapters. Run with:  node scripts/extract-chapters.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", ".."); // repo root
const read = (name) => readFileSync(resolve(root, name), "utf8");

/** Find the object literal that follows `const LANG_BOOK=` and return its text. */
function extractObjectLiteral(src, marker) {
  const start = src.indexOf(marker);
  if (start === -1) throw new Error(`marker not found: ${marker}`);
  let i = src.indexOf("{", start);
  const open = i;
  let depth = 0;
  let quote = null; // ' " `
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") i++; // skip escaped char
      else if (c === quote) quote = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") quote = c;
    else if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return src.slice(open, i + 1);
    }
  }
  throw new Error("unterminated object literal");
}

// --- LANG_BOOK.en (structure + prose) --------------------------------------
const scriptSrc = read("script.js");
const langBookText = extractObjectLiteral(scriptSrc, "const LANG_BOOK=");
const LANG_BOOK = new Function(`return (${langBookText});`)();
const en = LANG_BOOK.en;

// --- CHAPTERS_EXTRA (keyModels / colourAngle / leaderInAction / watchOut) ----
const win = {};
new Function("window", read("chapters-extra.js"))(win);
const EXTRA = win.CHAPTERS_EXTRA;

// --- THEORY_HTML.en (rich HTML deep-dives, 17 entries) ----------------------
const win2 = {};
new Function("window", read("theory-i18n.js"))(win2);
const THEORY_EN = win2.THEORY_HTML.en;

// --- Merge ------------------------------------------------------------------
const chapters = en.chapters.map((ch) => {
  const x = EXTRA[ch.number] ?? {};
  return {
    number: ch.number,
    part: ch.part,
    title: ch.title,
    summary: ch.summary,
    theme: ch.theme,
    theory: ch.theory,
    theoryHtml: THEORY_EN[ch.number - 1] ?? null,
    keyModels: x.keyModels ?? [],
    colourAngle: x.colourAngle ?? null,
    leaderInAction: x.leaderInAction ?? null,
    practice: ch.practice,
    watchOut: x.watchOut ?? [],
    takeaways: ch.takeaways ?? [],
  };
});

const book = {
  parts: en.parts,
  appendices: en.appendices,
  conclusion: en.conclusion,
  arc: en.arc,
  chapters,
};

const outDir = resolve(here, "..", "src", "lib", "chapters");
mkdirSync(outDir, { recursive: true });
const outFile = resolve(outDir, "en.json");
writeFileSync(outFile, JSON.stringify(book, null, 2) + "\n", "utf8");

const withHtml = chapters.filter((c) => c.theoryHtml).length;
console.log(
  `Wrote ${chapters.length} chapters (${withHtml} with rich theory HTML) to ${outFile}`,
);
console.log(
  `parts=${book.parts.length} appendices=${book.appendices.length} arc=${book.arc.length}`,
);

// --- Appendices A–D (AX English content) ------------------------------------
const axText = extractObjectLiteral(scriptSrc, "const AX=");
const AX = new Function(`return (${axText});`)();

const letters = ["A", "B", "C", "D"];
const meta = {};
en.appendices.forEach((a, i) => {
  const letter = letters[i];
  meta[letter] = {
    letter,
    title: a.title.replace(/^Appendix\s+[A-D]:\s*/, ""),
    text: a.text,
  };
});

const appendices = {
  meta,
  colours: AX.A.colours,
  comms: AX.B.comms,
  practice: {
    daily: AX.C.daily,
    weekly: AX.C.weekly,
    monthly: AX.C.monthly,
  },
  books: AX.D.books,
};

const apDir = resolve(here, "..", "src", "lib", "appendices");
mkdirSync(apDir, { recursive: true });
const apFile = resolve(apDir, "en.json");
writeFileSync(apFile, JSON.stringify(appendices, null, 2) + "\n", "utf8");
console.log(
  `Wrote appendices (colours=${appendices.colours.length} comms=${appendices.comms.length} bookGroups=${appendices.books.length}) to ${apFile}`,
);
