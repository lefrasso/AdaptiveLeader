import { describe, expect, it } from "vitest";
import {
  buildDelivery,
  mergeUnique,
  pairKey,
  pickNarrative,
  significantColours,
  type ColourKey,
} from "./communication";

describe("pairKey", () => {
  it("is order-independent and alphabetical", () => {
    expect(pairKey("red", "yellow")).toBe("red+yellow");
    expect(pairKey("yellow", "red")).toBe("red+yellow");
    expect(pairKey("blue", "green")).toBe("blue+green");
  });
});

describe("pickNarrative", () => {
  it("chooses the right variant", () => {
    expect(pickNarrative(60, 20)).toBe("strong");
    expect(pickNarrative(40, 35)).toBe("even");
    expect(pickNarrative(45, 25)).toBe("secondaryStrong");
    expect(pickNarrative(50, 15)).toBe("secondaryLight");
  });
});

describe("significantColours", () => {
  it("keeps colours >= 20% and always includes the primary", () => {
    const pct: Record<ColourKey, number> = { red: 50, yellow: 30, green: 15, blue: 5 };
    expect(significantColours(pct, ["red", "yellow", "green", "blue"], "red")).toEqual([
      "red",
      "yellow",
    ]);
  });
});

describe("mergeUnique", () => {
  it("dedupes preserving order and caps length", () => {
    expect(mergeUnique([["a", "b"], ["b", "c", "d"]], 3)).toEqual(["a", "b", "c"]);
  });
});

describe("buildDelivery", () => {
  it("takes primary's first three then fills from secondary up to four", () => {
    expect(
      buildDelivery(["p1", "p2", "p3", "p4"], ["p2", "s1", "s2"]),
    ).toEqual(["p1", "p2", "p3", "s1"]);
  });

  it("returns primary's first three when there is no secondary", () => {
    expect(buildDelivery(["p1", "p2", "p3", "p4"], null)).toEqual(["p1", "p2", "p3"]);
  });
});
