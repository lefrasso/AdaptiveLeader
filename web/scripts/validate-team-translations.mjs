// Validates authored chapter translation modules before they are merged into
// locale JSON. Run with locale arguments, or with none to validate all locales.
//   node scripts/validate-team-translations.mjs zh ja ko
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const chapterDir = resolve(here, "..", "src", "lib", "chapters");
const chapterNumbers = [11, 15, 16, 22];
const allLocales = ["es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];
const locales = process.argv.slice(2).length ? process.argv.slice(2) : allLocales;
const requiredKeys = [
  "title",
  "summary",
  "theme",
  "theory",
  "theoryHtml",
  "keyModels",
  "colourAngle",
  "leaderInAction",
  "practice",
  "watchOut",
  "takeaways",
  "checks",
  "practiceRubric",
  "practiceExemplar",
];
const stringKeys = [
  "title",
  "summary",
  "theme",
  "theory",
  "theoryHtml",
  "leaderInAction",
  "practice",
  "practiceExemplar",
];

const english = JSON.parse(readFileSync(resolve(chapterDir, "en.json"), "utf8"));
const englishByNumber = Object.fromEntries(english.chapters.map((chapter) => [chapter.number, chapter]));
const htmlTags = (html) => (html.match(/<[^>]+>/g) || []).join("");
const sameKeys = (actual, expected) => JSON.stringify(Object.keys(actual ?? {})) === JSON.stringify(expected);

let failed = false;
for (const locale of locales) {
  const errors = [];
  let translation;
  try {
    translation = (await import(`./team-translations/${locale}.mjs`)).default;
  } catch (error) {
    console.error(`${locale}: unable to load module (${error.message})`);
    failed = true;
    continue;
  }

  if (typeof translation.conclusion?.summary !== "string" || !translation.conclusion.summary.trim()) {
    errors.push("conclusion.summary is missing");
  }
  if (translation.conclusion?.synthesis?.length !== english.conclusion.synthesis.length) {
    errors.push(`conclusion.synthesis has ${translation.conclusion?.synthesis?.length ?? 0} items`);
  }

  for (const number of chapterNumbers) {
    const chapter = translation.chapters?.[number];
    const base = englishByNumber[number];
    if (!chapter) {
      errors.push(`ch${number} is missing`);
      continue;
    }
    if (!sameKeys(chapter, requiredKeys)) errors.push(`ch${number} fields differ from the contract`);
    for (const key of stringKeys) {
      if (typeof chapter[key] !== "string" || !chapter[key].trim()) errors.push(`ch${number}.${key} is empty`);
    }
    if (htmlTags(chapter.theoryHtml) !== htmlTags(base.theoryHtml)) {
      errors.push(`ch${number}.theoryHtml tag skeleton differs`);
    }
    if (!sameKeys(chapter.colourAngle, ["red", "yellow", "green", "blue"])) {
      errors.push(`ch${number}.colourAngle keys differ`);
    }
    for (const key of ["keyModels", "watchOut", "takeaways", "checks", "practiceRubric"]) {
      if (chapter[key]?.length !== base[key].length) {
        errors.push(`ch${number}.${key} has ${chapter[key]?.length ?? 0}/${base[key].length} items`);
      }
    }
    chapter.keyModels?.forEach((model, index) => {
      if (!sameKeys(model, ["name", "desc"]) || !model.name?.trim() || !model.desc?.trim()) {
        errors.push(`ch${number}.keyModels[${index}] is incomplete`);
      }
    });
    chapter.checks?.forEach((check, index) => {
      if (!sameKeys(check, ["q", "options", "why"])) errors.push(`ch${number}.checks[${index}] fields differ`);
      if (check.options?.length !== base.checks[index].options.length) {
        errors.push(`ch${number}.checks[${index}].options has ${check.options?.length ?? 0}/${base.checks[index].options.length} items`);
      }
    });
  }

  if (errors.length) {
    failed = true;
    console.error(`${locale}: FAIL\n  - ${errors.join("\n  - ")}`);
  } else {
    console.log(`${locale}: OK (${chapterNumbers.join(", ")} + conclusion)`);
  }
}

if (failed) process.exitCode = 1;