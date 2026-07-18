import { describe, it, expect } from "vitest";
import {
  defaultPreferences,
  normalizePreferences,
  parsePreferences,
  serializePreferences,
  progressAllowed,
  PREFS_VERSION,
  type Preferences,
} from "./prefs";

describe("preferences model", () => {
  it("provides sensible defaults", () => {
    const d = defaultPreferences();
    expect(d).toEqual({
      version: PREFS_VERSION,
      theme: null,
      locale: null,
      reduceMotion: false,
      splashSeen: false,
      consent: "unset",
    });
  });

  it("parses null / empty as defaults", () => {
    expect(parsePreferences(null)).toEqual(defaultPreferences());
    expect(parsePreferences("")).toEqual(defaultPreferences());
  });

  it("recovers from corrupt JSON", () => {
    expect(parsePreferences("{not json")).toEqual(defaultPreferences());
  });

  it("fills defaults and drops invalid fields", () => {
    const p = normalizePreferences({
      theme: "retro",
      locale: "ar",
      reduceMotion: "yes", // invalid type -> default
      consent: "bogus", // invalid enum -> default
      extra: 1, // unknown -> ignored
    });
    expect(p.theme).toBe("retro");
    expect(p.locale).toBe("ar");
    expect(p.reduceMotion).toBe(false);
    expect(p.consent).toBe("unset");
    expect("extra" in p).toBe(false);
  });

  it("accepts valid consent levels", () => {
    expect(normalizePreferences({ consent: "all" }).consent).toBe("all");
    expect(normalizePreferences({ consent: "essential" }).consent).toBe(
      "essential",
    );
  });

  it("round-trips through serialize/parse", () => {
    const p: Preferences = {
      version: PREFS_VERSION,
      theme: "dark-modern",
      locale: "ja",
      reduceMotion: true,
      splashSeen: true,
      consent: "all",
    };
    expect(parsePreferences(serializePreferences(p))).toEqual(p);
  });

  it("always stamps the current version", () => {
    expect(normalizePreferences({ version: 999 }).version).toBe(PREFS_VERSION);
  });

  it("gates progress persistence on full consent", () => {
    expect(progressAllowed({ ...defaultPreferences(), consent: "all" })).toBe(
      true,
    );
    expect(
      progressAllowed({ ...defaultPreferences(), consent: "essential" }),
    ).toBe(false);
    expect(progressAllowed(defaultPreferences())).toBe(false);
  });
});
