import { describe, it, expect } from "vitest";
import {
  COUNTRIES,
  COLOUR_ORDER,
  SCALES,
  analyse,
  getCountry,
} from "./index";

describe("cultural data", () => {
  it("covers all 10 app locales plus the extra countries (24 total)", () => {
    expect(COUNTRIES).toHaveLength(24);
    const locales = new Set(
      COUNTRIES.map((c) => c.locale).filter(Boolean) as string[],
    );
    for (const l of ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"]) {
      expect(locales.has(l)).toBe(true);
    }
    const ids = COUNTRIES.map((c) => c.id);
    for (const extra of ["uk", "us", "br", "mx", "ar", "au"]) {
      expect(ids).toContain(extra);
    }
    for (const added of ["in", "my", "ph", "eg", "dz", "ca", "cz", "bg", "ro"]) {
      expect(ids).toContain(added);
    }
  });

  it("has unique country ids", () => {
    const ids = COUNTRIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every country a value on every scale", () => {
    for (const c of COUNTRIES) {
      for (const s of SCALES) {
        const v = c.scales[s.key];
        expect(typeof v).toBe("number");
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("analyse", () => {
  it("returns null for an unknown country", () => {
    expect(analyse("atlantis", "red")).toBeNull();
  });

  it("flags a Red in Japan to soften criticism and avoid confrontation", () => {
    const a = analyse("jp", "red");
    expect(a).not.toBeNull();
    const scales = a!.adapt.map((t) => t.scale);
    expect(scales).toContain("evaluating"); // indirect feedback -> adapt
    expect(scales).toContain("disagreeing"); // avoids confrontation -> adapt
  });

  it("tells a Green in Germany to speak up (direct feedback / confrontation ok)", () => {
    const a = analyse("de", "green")!;
    const scales = a.adapt.map((t) => t.scale);
    expect(scales).toContain("evaluating"); // direct feedback -> adapt
    expect(scales).toContain("disagreeing"); // confrontation ok -> adapt
  });

  it("recognises a Green's relationship strength in Brazil", () => {
    const a = analyse("br", "green")!;
    expect(a.strengths.map((t) => t.scale)).toContain("trusting");
  });

  it("produces at least one tip for every country/colour combination", () => {
    for (const c of COUNTRIES) {
      for (const k of COLOUR_ORDER) {
        const a = analyse(c.id, k)!;
        expect(a.strengths.length + a.adapt.length).toBeGreaterThan(0);
      }
    }
  });

  it("never returns the same scale as both a strength and an adapt", () => {
    for (const c of COUNTRIES) {
      for (const k of COLOUR_ORDER) {
        const a = analyse(c.id, k)!;
        const s = new Set(a.strengths.map((t) => t.scale));
        for (const t of a.adapt) expect(s.has(t.scale)).toBe(false);
      }
    }
  });

  it("getCountry resolves by id", () => {
    expect(getCountry("us")?.name).toBe("United States");
  });
});
