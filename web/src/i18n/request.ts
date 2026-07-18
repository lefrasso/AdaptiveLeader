import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

type Dict = Record<string, unknown>;

/** Deep-merge locale messages over the English base so partial translations
 *  gracefully fall back to English (matches the original app's behavior). */
function deepMerge(base: Dict, override: Dict): Dict {
  const out: Dict = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    if (
      b &&
      o &&
      typeof b === "object" &&
      typeof o === "object" &&
      !Array.isArray(b) &&
      !Array.isArray(o)
    ) {
      out[key] = deepMerge(b as Dict, o as Dict);
    } else {
      out[key] = o;
    }
  }
  return out;
}

async function loadMessages(locale: string): Promise<Dict> {
  return (await import(`../../messages/${locale}.json`)).default as Dict;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = await loadMessages(routing.defaultLocale);
  const messages =
    locale === routing.defaultLocale
      ? base
      : deepMerge(base, await loadMessages(locale));

  return { locale, messages };
});
