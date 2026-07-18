// Chapters section — data access layer.
//
// Per-locale chapter content is generated from the legacy vanilla-JS data files
// by scripts/extract-chapters.mjs (English) and scripts/extract-i18n.mjs (other
// locales). Structure lives here as TypeScript types; the prose lives in the
// per-locale JSON payloads. Unknown locales fall back to English.
import en from "./en.json";
import es from "./es.json";
import it from "./it.json";
import fr from "./fr.json";
import pt from "./pt.json";
import ar from "./ar.json";
import de from "./de.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";

export type PartKey = "I" | "II" | "III" | "IV" | "V";

export type KeyModel = { name: string; desc: string };

export type ColourKey = "red" | "yellow" | "green" | "blue";

export type ColourAngle = Record<ColourKey, string>;

export type Chapter = {
  number: number;
  part: PartKey;
  title: string;
  summary: string;
  theme: string;
  /** Plain-text theory fallback. */
  theory: string;
  /** Rich HTML theory deep-dive (trusted, authored in-repo). */
  theoryHtml: string | null;
  keyModels: KeyModel[];
  colourAngle: ColourAngle | null;
  leaderInAction: string | null;
  practice: string;
  watchOut: string[];
  takeaways: string[];
};

export type Part = {
  key: PartKey;
  title: string;
  focus: string;
  outcome: string;
};

export type Appendix = { title: string; text: string };

export type Conclusion = {
  title: string;
  summary: string;
  synthesis: string[];
};

export type Book = {
  parts: Part[];
  appendices: Appendix[];
  conclusion: Conclusion;
  chapters: Chapter[];
};

const BOOKS = { en, es, it, fr, pt, ar, de, zh, ja, ko } as unknown as Record<
  string,
  Book
>;

const fallback = en as unknown as Book;

export const PART_ORDER: PartKey[] = ["I", "II", "III", "IV", "V"];

/** Brand hex for each behavioural colour (matches the assessments palette). */
export const COLOUR_HEX: Record<ColourKey, string> = {
  red: "#d64550",
  yellow: "#f2b705",
  green: "#2e9e5b",
  blue: "#2e86c1",
};

export const COLOUR_ORDER: ColourKey[] = ["red", "yellow", "green", "blue"];

/** The whole book for a locale, falling back to English for unknown locales. */
export function getBook(locale: string): Book {
  return BOOKS[locale] ?? fallback;
}

export function getParts(locale: string): Part[] {
  return getBook(locale).parts;
}

export function getPart(locale: string, key: PartKey): Part | undefined {
  return getBook(locale).parts.find((p) => p.key === key);
}

export function getChapters(locale: string): Chapter[] {
  return getBook(locale).chapters;
}

export function getChaptersByPart(locale: string, key: PartKey): Chapter[] {
  return getBook(locale).chapters.filter((c) => c.part === key);
}

export function getChapter(locale: string, n: number): Chapter | undefined {
  return getBook(locale).chapters.find((c) => c.number === n);
}

export function getConclusion(locale: string): Conclusion {
  return getBook(locale).conclusion;
}

/** All chapter numbers in order — used for static params and prev/next nav.
 *  Chapter numbering is identical across locales. */
export const CHAPTER_NUMBERS: number[] = fallback.chapters.map((c) => c.number);
