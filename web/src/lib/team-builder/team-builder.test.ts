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

describe("analyseTeam with a leader", () => {
  it("omits leader fit when no leader is supplied", () => {
    const a = analyseTeam([member("red", "us")])!;
    expect(a.leader).toBeUndefined();
  });

  it("builds a playbook entry for each colour present on the team", () => {
    const a = analyseTeam(
      [member("red", "us"), member("green", "us"), member("blue", "us")],
      { colour: "yellow", countryId: "us" },
    )!;
    expect(a.leader).toBeDefined();
    const colours = a.leader!.playbook.map((p) => p.colour);
    expect(colours).toEqual(["red", "green", "blue"]);
    for (const play of a.leader!.playbook) {
      expect(play.tip.length).toBeGreaterThan(0);
      expect(play.count).toBeGreaterThan(0);
    }
  });

  it("flags a leader who brings a colour the team lacks", () => {
    const a = analyseTeam([member("red", "us"), member("red", "us")], {
      colour: "blue",
      countryId: "us",
    })!;
    expect(a.leader!.colourInsights.some((i) => i.kind === "strength")).toBe(true);
  });

  it("flags a leader who mirrors the team's dominant style", () => {
    const a = analyseTeam(
      [member("red", "us"), member("red", "us"), member("red", "us")],
      { colour: "red", countryId: "us" },
    )!;
    expect(
      a.leader!.colourInsights.some((i) => i.title === "You mirror the team's dominant style"),
    ).toBe(true);
  });

  it("flags a leader whose culture sits far from the team's centre", () => {
    // A very explicit/direct leader (US) over a high-context team (Japan).
    const a = analyseTeam([member("green", "jp"), member("blue", "jp")], {
      colour: "red",
      countryId: "us",
    })!;
    expect(a.leader!.cultureInsights.length).toBeGreaterThan(0);
    expect(a.leader!.cultureInsights.every((i) => i.kind === "watch")).toBe(true);
  });

  it("has no culture-gap insights when leader shares the team's culture", () => {
    const a = analyseTeam([member("green", "us"), member("blue", "us")], {
      colour: "red",
      countryId: "us",
    })!;
    expect(a.leader!.cultureInsights).toHaveLength(0);
  });

  it("opens the recommendations with a leader-specific move", () => {
    const a = analyseTeam([member("green", "jp")], { colour: "red", countryId: "us" })!;
    expect(a.recommendations[0].title).toBe("Lead against your Red grain");
    expect(a.recommendations[1].title).toBe("Set the foundations first");
  });
});
