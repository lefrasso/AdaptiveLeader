// Pure, environment-agnostic preferences model.
//
// No DOM or localStorage access lives here so this module stays unit-testable
// under the node test environment. The browser storage adapter + React hook
// live in ./store (a "use client" module).

export const PREFS_KEY = "al.prefs.v1";
export const PREFS_VERSION = 1;

/** Consent state. "all" additionally unlocks learning-progress persistence. */
export type ConsentLevel = "unset" | "essential" | "all";

export type Preferences = {
  version: number;
  /** Chosen theme id mirror (default | retro | dark-modern), or null if unset. */
  theme: string | null;
  /** Chosen locale mirror (en, ar, …), or null if unset. */
  locale: string | null;
  /** User override to minimise animation regardless of the OS setting. */
  reduceMotion: boolean;
  /** Whether the one-time intro splash has been dismissed. */
  splashSeen: boolean;
  /** Cookie/consent state. */
  consent: ConsentLevel;
};

const CONSENT_VALUES: readonly ConsentLevel[] = ["unset", "essential", "all"];

export function defaultPreferences(): Preferences {
  return {
    version: PREFS_VERSION,
    theme: null,
    locale: null,
    reduceMotion: false,
    splashSeen: false,
    consent: "unset",
  };
}

/**
 * Coerce an arbitrary parsed value into a valid {@link Preferences}: fill
 * defaults, drop unknown/invalid fields, and stamp the current version. This is
 * where future version migrations are applied.
 */
export function normalizePreferences(input: unknown): Preferences {
  const base = defaultPreferences();
  if (!input || typeof input !== "object") return base;
  const o = input as Record<string, unknown>;
  return {
    version: PREFS_VERSION,
    theme: typeof o.theme === "string" ? o.theme : base.theme,
    locale: typeof o.locale === "string" ? o.locale : base.locale,
    reduceMotion:
      typeof o.reduceMotion === "boolean" ? o.reduceMotion : base.reduceMotion,
    splashSeen:
      typeof o.splashSeen === "boolean" ? o.splashSeen : base.splashSeen,
    consent:
      typeof o.consent === "string" && CONSENT_VALUES.includes(o.consent as ConsentLevel)
        ? (o.consent as ConsentLevel)
        : base.consent,
  };
}

/** Parse a raw JSON string (or null) into Preferences, tolerating corruption. */
export function parsePreferences(raw: string | null): Preferences {
  if (!raw) return defaultPreferences();
  try {
    return normalizePreferences(JSON.parse(raw));
  } catch {
    return defaultPreferences();
  }
}

export function serializePreferences(p: Preferences): string {
  return JSON.stringify(p);
}

/** Whether learning-progress persistence is allowed under the current consent. */
export function progressAllowed(p: Preferences): boolean {
  return p.consent === "all";
}
