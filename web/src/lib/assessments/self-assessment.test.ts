import { describe, expect, it } from "vitest";
import {
  composition,
  computeComposition,
  emptyTopics,
  isBlendTitle,
  pickNarrative,
  roundPercents,
  tierLabel,
  type Topics,
} from "./self-assessment";

describe("roundPercents", () => {
  it("equal fractions total 100", () => {
    const p = roundPercents({ red: 0.25, yellow: 0.25, green: 0.25, blue: 0.25 });
    expect(p).toEqual({ red: 25, yellow: 25, green: 25, blue: 25 });
  });

  it("largest-remainder keeps the sum at exactly 100", () => {
    const p = roundPercents({ red: 1 / 3, yellow: 1 / 3, green: 1 / 3, blue: 0 });
    expect(p.red + p.yellow + p.green + p.blue).toBe(100);
    expect(p.red).toBe(34); // first remainder bump goes to red (ORDER order)
  });
});

describe("composition", () => {
  it("returns null when nothing is rated", () => {
    expect(composition(emptyTopics())).toBeNull();
  });

  it("a single all-red aspect yields 100% red", () => {
    const topics: Topics = { ...emptyTopics(), work: { red: 100, yellow: 0, green: 0, blue: 0 } };
    const c = computeComposition(topics)!;
    expect(c.pct.red).toBe(100);
    expect(c.primary).toBe("red");
  });

  it("normalises each aspect before averaging", () => {
    const topics: Topics = {
      ...emptyTopics(),
      work: { red: 100, yellow: 0, green: 0, blue: 0 },
      comms: { red: 0, yellow: 0, green: 0, blue: 100 },
    };
    const c = computeComposition(topics)!;
    expect(c.pct.red).toBe(50);
    expect(c.pct.blue).toBe(50);
    expect(c.primary).toBe("red"); // tie resolves to ORDER order
    expect(c.secondary).toBe("blue");
  });
});

describe("tierLabel", () => {
  it("maps percentages to tiers", () => {
    expect(tierLabel(35)).toBe("dominant");
    expect(tierLabel(20)).toBe("secondary");
    expect(tierLabel(10)).toBe("minor");
    expect(tierLabel(9)).toBe("low");
  });
});

describe("narrative selection", () => {
  it("pickNarrative", () => {
    expect(pickNarrative(60, 20)).toBe("strong");
    expect(pickNarrative(40, 35)).toBe("even");
    expect(pickNarrative(40, 25)).toBe("secondary");
  });

  it("isBlendTitle", () => {
    expect(isBlendTitle(40, 35)).toBe(true);
    expect(isBlendTitle(40, 25)).toBe(false);
    expect(isBlendTitle(26, 20)).toBe(true);
  });
});
