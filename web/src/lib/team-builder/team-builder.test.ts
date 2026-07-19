import { describe, it, expect } from "vitest";
import {
  analyseTeam,
  colourComposition,
  culturalSpread,
  COLOUR_ORDER,
  SCALES,
  type Member,
} from "./index";

let seq = 0;
function member(colour: Member["colour"], countryId: string): Member {
  return { id: `m${seq++}`, name: "", colour, countryId };
}

describe("colourComposition", () => {
  it("counts members and totals to 100%", () => {
    const c = colourComposition([
      member("red", "us"),
      member("red", "us"),
      member("blue", "de"),
      member("green", "jp"),
    ]);
    expect(c.total).toBe(4);
    expect(c.counts.red).toBe(2);
    const sum = COLOUR_ORDER.reduce((a, k) => a + c.pct[k], 0);
    expect(sum).toBe(100);
    expect(c.dominant).toBe("red");
    expect(c.missing).toContain("yellow");
    expect(c.missing).not.toContain("red");
  });

  it("reports an empty team cleanly", () => {
    const c = colourComposition([]);
    expect(c.total).toBe(0);
    expect(c.dominant).toBeNull();
    expect(c.missing).toEqual(COLOUR_ORDER);
  });
});

describe("culturalSpread", () => {
  it("computes min, max, and spread across members' countries", () => {
    const s = culturalSpread([member("red", "us"), member("green", "jp")]);
    // US communicating 10, Japan 90 -> spread 80
    expect(s.communicating.min).toBe(10);
    expect(s.communicating.max).toBe(90);
    expect(s.communicating.spread).toBe(80);
  });

  it("has zero spread for a single-country team", () => {
    const s = culturalSpread([member("red", "us"), member("blue", "us")]);
    for (const scale of SCALES) expect(s[scale.key].spread).toBe(0);
  });
});

describe("analyseTeam", () => {
  it("returns null for an empty team", () => {
    expect(analyseTeam([])).toBeNull();
  });

  it("flags every missing colour as a gap", () => {
    const a = analyseTeam([member("red", "us"), member("red", "de")])!;
    const titles = a.colourInsights.map((i) => i.title);
    expect(titles).toContain("Low energy & vision"); // no yellow
    expect(titles).toContain("Few stabilisers"); // no green
    expect(titles).toContain("No analyst"); // no blue
    expect(a.composition.missing).toEqual(["yellow", "green", "blue"]);
  });

  it("flags a single-colour team", () => {
    const a = analyseTeam([member("red", "us"), member("red", "uk")])!;
    expect(a.colourInsights.some((i) => i.title === "Single-colour team")).toBe(true);
  });

  it("recognises a balanced four-colour team", () => {
    const a = analyseTeam([
      member("red", "us"),
      member("yellow", "us"),
      member("green", "us"),
      member("blue", "us"),
    ])!;
    expect(a.colourInsights.some((i) => i.kind === "strength")).toBe(true);
    expect(a.composition.missing).toHaveLength(0);
  });

  it("flags a dominant colour above half the team", () => {
    const a = analyseTeam([
      member("red", "us"),
      member("red", "us"),
      member("red", "us"),
      member("blue", "us"),
    ])!;
    expect(a.colourInsights.some((i) => i.title === "Red-dominant team")).toBe(true);
  });

  it("flags wide cultural spread and multiple regions", () => {
    const a = analyseTeam([member("red", "us"), member("green", "jp")])!;
    expect(a.culturalInsights.some((i) => i.title === "Spread across regions")).toBe(true);
    expect(a.culturalInsights.some((i) => i.title === "Communication styles differ")).toBe(true);
  });

  it("flags a single-culture team", () => {
    const a = analyseTeam([member("red", "us"), member("blue", "us")])!;
    expect(a.culturalInsights.some((i) => i.title === "Single-culture team")).toBe(true);
  });

  it("always recommends setting the foundations first", () => {
    const a = analyseTeam([member("red", "us")])!;
    expect(a.recommendations[0].title).toBe("Set the foundations first");
  });

  it("recommends guarding against single points of failure on tiny teams", () => {
    const a = analyseTeam([member("red", "us")])!;
    expect(a.recommendations.some((r) => r.title === "Guard against single points of failure")).toBe(true);
  });

  it("recommends watching coordination cost on large teams", () => {
    const members = Array.from({ length: 10 }, () => member("blue", "us"));
    const a = analyseTeam(members)!;
    expect(a.recommendations.some((r) => r.title === "Watch coordination cost")).toBe(true);
  });

  it("always produces at least one recommendation", () => {
    const a = analyseTeam([
      member("red", "us"),
      member("yellow", "de"),
      member("green", "jp"),
    ])!;
    expect(a.recommendations.length).toBeGreaterThan(0);
  });
});
