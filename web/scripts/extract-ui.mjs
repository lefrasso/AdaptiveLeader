// Migration helper: maps the vanilla `UI` object (script.js) to the next-intl
// message namespaces and deep-merges the translated labels into each non-English
// messages/<locale>.json. Existing values are preserved; only mapped keys are
// added/updated. Unmapped keys fall back to English via request.ts deep-merge.
// Run:  node scripts/extract-ui.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const src = readFileSync(resolve(root, "script.js"), "utf8");

function extractObjectLiteral(s, marker) {
  const start = s.indexOf(marker);
  let i = s.indexOf("{", start);
  const open = i;
  let depth = 0,
    q = null;
  for (; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === "\\") i++;
      else if (c === q) q = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") q = c;
    else if (c === "{") depth++;
    else if (c === "}") {
      if (--depth === 0) return s.slice(open, i + 1);
    }
  }
}

const UI = new Function(`return (${extractObjectLiteral(src, "const UI=")});`)();

const LOCALES = ["es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

/** Strip a leading HTML entity + space, e.g. "&#10003; Do" -> "Do". */
const stripEntity = (v) => String(v).replace(/^&#\d+;\s*/, "");

// Contributor credits are proper nouns — identical across every locale (they
// were hard-coded in the vanilla index.html, not in the UI object).
const CREDITS =
  "Maria Olhova · Sunny Pei · Gerardo Merello · Pablo Scherer · Jay Rao · Leandro Frasso";

function fragmentFor(loc) {
  const u = UI[loc];
  return {
    nav: {
      appendices: u.appendicesTitle,
      self: u.saTitle,
      leadership: u.laTitle,
      evaluator: u.evalTitle,
    },
    common: {
      language: u.language,
    },
    about: {
      trigger: u.navAbout,
      title: u.aboutTitle,
      body1: u.aboutBody1,
      body2: u.aboutBody2,
      creditsLabel: u.aboutCreditsLabel,
      credits: CREDITS,
      powered: u.aboutPowered,
    },
    home: {
      stats: {
        parts: u.partsLabel,
        chapters: u.chaptersLabel,
        appendices: u.appendicesNum,
        tools: u.toolsLabel,
      },
    },
    chapters: {
      partLabel: `${u.partLabel} {part}`,
      focusThisPart: u.focusThisPart,
      searchLabel: u.searchLabel,
      searchPlaceholder: u.searchPlaceholder,
      clearFilters: u.clearFilters,
      noMatches: u.useSearch,
      whyItMatters: u.whyItMatters,
      theoryDeepDive: u.theoryDeepDive,
      keyModels: u.keyModels,
      colourAngle: u.colourAngle,
      leaderInAction: u.leaderInAction,
      putIntoPractice: u.putIntoPractice,
      watchOut: u.watchOut,
      chapterTakeaways: u.chapterTakeaways,
      previous: u.previous,
      next: u.next,
      seeAppendices: u.seeAppendices,
      coreSynthesis: u.coreSynthesis,
    },
    appendices: {
      header: {
        eyebrow: u.appendicesEyebrow,
        title: u.appendicesTitle,
      },
      atBest: u.axAtBest,
      underStress: u.axUnderStress,
      toInfluence: u.axToInfluence,
      do: stripEntity(u.axDo),
      avoid: stripEntity(u.axAvoid),
      daily: u.axDaily,
      weekly: u.axWeekly,
      monthly: u.axMonthly,
    },
  };
}

function deepMerge(base, override) {
  const out = { ...base };
  for (const k of Object.keys(override)) {
    const b = base[k];
    const o = override[k];
    if (
      b &&
      o &&
      typeof b === "object" &&
      typeof o === "object" &&
      !Array.isArray(b) &&
      !Array.isArray(o)
    ) {
      out[k] = deepMerge(b, o);
    } else {
      out[k] = o;
    }
  }
  return out;
}

const msgDir = resolve(here, "..", "messages");
for (const loc of LOCALES) {
  const file = resolve(msgDir, `${loc}.json`);
  const existing = existsSync(file)
    ? JSON.parse(readFileSync(file, "utf8"))
    : {};
  const merged = deepMerge(existing, fragmentFor(loc));
  writeFileSync(file, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(
    `${loc}: nav+home+chapters+appendices labels merged (top keys: ${Object.keys(merged).join(",")})`,
  );
}
