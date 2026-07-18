// Migration helper: extracts per-locale chapter + appendix content from the
// legacy vanilla-JS data files and emits src/lib/{chapters,appendices}/<locale>.json
// for every non-English locale. Replicates the vanilla getBook(locale) merge.
// Run:  node scripts/extract-i18n.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", ".."); // repo root
const read = (name) => readFileSync(resolve(root, name), "utf8");

const LOCALES = ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

function extractObjectLiteral(src, marker) {
  const start = src.indexOf(marker);
  if (start === -1) throw new Error(`marker not found: ${marker}`);
  let i = src.indexOf("{", start);
  const open = i;
  let depth = 0;
  let quote = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") i++;
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

// --- Load legacy data --------------------------------------------------------
const scriptSrc = read("script.js");
const LANG_BOOK = new Function(
  `return (${extractObjectLiteral(scriptSrc, "const LANG_BOOK=")});`,
)();
const OVERRIDES = new Function(
  `return (${extractObjectLiteral(scriptSrc, "const OVERRIDES=")});`,
)();

const win = {};
new Function("window", read("chapters-extra.js"))(win);
new Function("window", read("chapters-i18n.js"))(win);
new Function("window", read("theory-i18n.js"))(win);
new Function("window", read("ax-i18n.js"))(win);
const CHAPTERS_I18N = win.CHAPTERS_I18N ?? {};
const THEORY_HTML = win.THEORY_HTML ?? {};
const AX_I18N = win.AX_I18N ?? {};

// English appendix fallback lives in script.js (`const AX=`).
const AX_EN = new Function(
  `return (${extractObjectLiteral(scriptSrc, "const AX=")});`,
)();

// --- Replicate vanilla getBook(locale) --------------------------------------
function buildBook(locale) {
  let book;
  if (locale === "en") {
    book = LANG_BOOK.en;
  } else if (LANG_BOOK[locale]) {
    book = LANG_BOOK[locale];
    const i18nChapters = CHAPTERS_I18N[locale] ?? [];
    if (i18nChapters.length) {
      book = {
        ...book,
        chapters: book.chapters.map((ch) => {
          const ext = i18nChapters.find((c) => c.number === ch.number);
          if (!ext) return ch;
          const merged = { ...ch };
          if (ext.colourAngle) merged.colourAngle = ext.colourAngle;
          if (ext.leaderInAction) merged.leaderInAction = ext.leaderInAction;
          if (ext.watchOut) merged.watchOut = ext.watchOut;
          if (ext.keyModels) merged.keyModels = ext.keyModels;
          return merged;
        }),
      };
    }
  } else {
    const ov = OVERRIDES[locale];
    const i18nChapters = CHAPTERS_I18N[locale] ?? [];
    const base = LANG_BOOK.en;
    if (!ov && !i18nChapters.length) {
      book = base;
    } else {
      const chapters = base.chapters.map((ch, i) => {
        const i18n = i18nChapters.find((c) => c.number === ch.number) ?? {};
        return {
          ...ch,
          ...i18n,
          title: ov?.chapterTitles?.[i] ?? i18n.title ?? ch.title,
          number: ch.number,
          part: ch.part,
        };
      });
      const parts = (ov?.parts ?? base.parts).map((p, i) => ({
        ...(base.parts[i] ?? {}),
        ...p,
      }));
      book = {
        ...base,
        chapters,
        parts,
        arc: ov?.arc ?? base.arc,
        appendices: ov?.appendices ?? base.appendices,
        conclusion: ov?.conclusion ?? base.conclusion,
      };
    }
  }
  return book;
}

function chaptersFor(locale) {
  const book = buildBook(locale);
  const tH = THEORY_HTML[locale] ?? THEORY_HTML.en ?? [];
  const chapters = book.chapters.map((ch) => ({
    number: ch.number,
    part: ch.part,
    title: ch.title,
    summary: ch.summary,
    theme: ch.theme,
    theory: ch.theory,
    theoryHtml: tH[ch.number - 1] ?? THEORY_HTML.en?.[ch.number - 1] ?? null,
    keyModels: ch.keyModels ?? [],
    colourAngle: ch.colourAngle ?? null,
    leaderInAction: ch.leaderInAction ?? null,
    practice: ch.practice,
    watchOut: ch.watchOut ?? [],
    takeaways: ch.takeaways ?? [],
  }));
  return {
    parts: book.parts,
    appendices: book.appendices,
    conclusion: book.conclusion,
    chapters,
  };
}

function appendicesFor(locale) {
  const ax = locale === "en" ? AX_EN : (AX_I18N[locale] ?? AX_EN);
  const book = buildBook(locale);
  const letters = ["A", "B", "C", "D"];
  const meta = {};
  book.appendices.forEach((a, i) => {
    const letter = letters[i];
    meta[letter] = {
      letter,
      title: a.title.replace(/^(Appendix|Apéndice|Appendice|Annexe|Anhang|Apêndice)\s+[A-D]\s*[:：]\s*/i, ""),
      text: a.text,
    };
  });
  return {
    meta,
    colours: ax.A.colours,
    comms: ax.B.comms,
    practice: {
      daily: ax.C.daily,
      weekly: ax.C.weekly,
      monthly: ax.C.monthly,
    },
    books: ax.D.books,
  };
}

// --- Emit --------------------------------------------------------------------
const chDir = resolve(here, "..", "src", "lib", "chapters");
const axDir = resolve(here, "..", "src", "lib", "appendices");

const report = [];
for (const locale of LOCALES) {
  if (locale === "en") continue; // en.json is produced by extract-chapters.mjs
  const ch = chaptersFor(locale);
  const ax = appendicesFor(locale);
  writeFileSync(
    resolve(chDir, `${locale}.json`),
    JSON.stringify(ch, null, 2) + "\n",
    "utf8",
  );
  writeFileSync(
    resolve(axDir, `${locale}.json`),
    JSON.stringify(ax, null, 2) + "\n",
    "utf8",
  );
  const titleTranslated = ch.chapters[0].title !== LANG_BOOK.en.chapters[0].title;
  const hasI18n = Boolean(CHAPTERS_I18N[locale]);
  const hasTheory = Boolean(THEORY_HTML[locale]);
  const hasAx = locale === "en" || Boolean(AX_I18N[locale]);
  report.push(
    `${locale}: chapters=${ch.chapters.length} titleTranslated=${titleTranslated} i18n=${hasI18n} theoryHtml=${hasTheory} appendicesTranslated=${hasAx}`,
  );
}

console.log("Per-locale extraction complete:\n" + report.join("\n"));
console.log(
  "\nCHAPTERS_I18N locales:",
  Object.keys(CHAPTERS_I18N).join(",") || "(none)",
);
console.log("THEORY_HTML locales:", Object.keys(THEORY_HTML).join(","));
console.log("AX_I18N locales:", Object.keys(AX_I18N).join(","));
console.log("OVERRIDES locales:", Object.keys(OVERRIDES).join(","));
