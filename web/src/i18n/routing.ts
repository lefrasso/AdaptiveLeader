import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All locales supported by the AdaptiveLeader guide
  locales: ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"],
  defaultLocale: "en",
  // Always prefix the URL with the locale (e.g. /en, /ar) so every locale
  // has a stable static path. The root "/" is handled by a build-time redirect.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", dir: "ltr" },
  es: { label: "Español", dir: "ltr" },
  it: { label: "Italiano", dir: "ltr" },
  fr: { label: "Français", dir: "ltr" },
  pt: { label: "Português", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
  de: { label: "Deutsch", dir: "ltr" },
  zh: { label: "中文", dir: "ltr" },
  ja: { label: "日本語", dir: "ltr" },
  ko: { label: "한국어", dir: "ltr" },
};
