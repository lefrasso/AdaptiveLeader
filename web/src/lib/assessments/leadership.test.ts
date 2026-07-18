import { describe, expect, it } from "vitest";
import {
  bandFor,
  computeResults,
  getPriorities,
  getStrengths,
  pctColor,
  scoreColor,
  TOPICS,
  type Answers,
} from "./leadership";

/** Build answers by giving every topic the same value, with optional overrides. */
function answersOf(base: number, overrides: Record<number, number> = {}): Answers {
  const a: Answers = {};
  for (const t of TOPICS) a[t.n] = base;
  return { ...a, ...overrides };
}

describe("computeResults", () => {
  it("all 3s → avg 3, pct 50 (developing)", () => {
    const r = computeResults(answersOf(3));
    expect(r.avg).toBe(3);
    expect(r.pct).toBe(50);
    expect(bandFor(r.pct).id).toBe("developing");
    for (const pk of ["I", "II", "III", "IV", "V"] as const) {
      expect(r.partAvg[pk]).toBe(3);
    }
  });

  it("all 5s → avg 5, pct 100 (exceptional)", () => {
    const r = computeResults(answersOf(5));
    expect(r.avg).toBe(5);
    expect(r.pct).toBe(100);
    expect(bandFor(r.pct).id).toBe("exceptional");
  });

  it("all 1s → avg 1, pct 0 (emerging)", () => {
    const r = computeResults(answersOf(1));
    expect(r.avg).toBe(1);
    expect(r.pct).toBe(0);
    expect(bandFor(r.pct).id).toBe("emerging");
  });
});

describe("getPriorities", () => {
  it("caps at 6 lowest topics, ordered by value then number", () => {
    const r = computeResults(answersOf(3));
    const p = getPriorities(r.vals);
    expect(p).toHaveLength(6);
    expect(p.map((x) => x.topic.n)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("returns at least 3 even when nothing is rated <= 3", () => {
    const r = computeResults(answersOf(5));
    const p = getPriorities(r.vals);
    expect(p).toHaveLength(3);
    expect(p.map((x) => x.topic.n)).toEqual([1, 2, 3]);
  });

  it("selects exactly the topics rated <= 3 in order", () => {
    const r = computeResults(answersOf(5, { 5: 1, 3: 2, 10: 2 }));
    const p = getPriorities(r.vals);
    expect(p.map((x) => x.topic.n)).toEqual([5, 3, 10]);
    expect(p.map((x) => x.v)).toEqual([1, 2, 2]);
  });
});

describe("getStrengths", () => {
  it("is empty when no topic is rated >= 4", () => {
    const r = computeResults(answersOf(3));
    expect(getStrengths(r.vals)).toHaveLength(0);
  });

  it("returns up to 5 highest topics, highest number first among ties", () => {
    const r = computeResults(answersOf(5));
    const s = getStrengths(r.vals);
    expect(s).toHaveLength(5);
    expect(s.map((x) => x.topic.n)).toEqual([17, 16, 15, 14, 13]);
  });
});

describe("colour thresholds", () => {
  it("scoreColor buckets", () => {
    expect(scoreColor(2)).toBe("#d64550");
    expect(scoreColor(2.5)).toBe("#e07b3e");
    expect(scoreColor(3)).toBe("#f2b705");
    expect(scoreColor(3.5)).toBe("#7bb241");
    expect(scoreColor(4)).toBe("#2e9e5b");
  });

  it("pctColor buckets", () => {
    expect(pctColor(34)).toBe("#d64550");
    expect(pctColor(50)).toBe("#f2b705");
    expect(pctColor(70)).toBe("#2e86c1");
    expect(pctColor(80)).toBe("#2e9e5b");
  });
});
