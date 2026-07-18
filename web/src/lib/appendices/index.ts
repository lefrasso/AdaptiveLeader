// Appendices section — data access layer.
//
// Per-locale content is generated from the legacy vanilla-JS `AX` / `AX_I18N`
// data by scripts/extract-chapters.mjs (English) and scripts/extract-i18n.mjs
// (other locales). Structure lives here as TypeScript types; the prose lives in
// the per-locale JSON payloads. Unknown locales fall back to English.
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

export type AppendixLetter = "A" | "B" | "C" | "D";

export type AppendixMeta = {
  letter: AppendixLetter;
  title: string;
  text: string;
};

/** Appendix A — a colour in the pocket guide. */
export type ColourCard = {
  id: string;
  name: string;
  hex: string;
  onLight: boolean;
  traits: string[];
  best: string;
  shadow: string;
  need: string;
};

/** Appendix B — how to communicate with one colour. */
export type CommCard = {
  colour: string;
  hex: string;
  onLight: boolean;
  open: string;
  dos: string[];
  donts: string[];
};

/** Appendix C — the leader's daily/weekly/monthly practice. */
export type Practice = {
  daily: string[];
  weekly: string[];
  monthly: string[];
};

/** Appendix D — a reading-list category. */
export type BookGroup = {
  cat: string;
  items: { title: string; author: string; note: string }[];
};

export type Appendices = {
  meta: Record<AppendixLetter, AppendixMeta>;
  colours: ColourCard[];
  comms: CommCard[];
  practice: Practice;
  books: BookGroup[];
};

const DATA = { en, es, it, fr, pt, ar, de, zh, ja, ko } as unknown as Record<
  string,
  Appendices
>;

const fallback = en as unknown as Appendices;

/** The appendices content for a locale, falling back to English. */
export function getAppendices(locale: string): Appendices {
  return DATA[locale] ?? fallback;
}
