import { describe, it, expect } from "vitest";
import { trajectoryOf } from "./trajectory";

describe("assessment trajectory", () => {
  it("reports 'first' with no or single history entry", () => {
    expect(trajectoryOf([]).trend).toBe("first");
    const one = trajectoryOf([{ pct: 60 }]);
    expect(one.trend).toBe("first");
    expect(one.latestPct).toBe(60);
    expect(one.previousPct).toBeNull();
  });

  it("detects upward growth between the two most recent", () => {
    const t = trajectoryOf([{ pct: 55 }, { pct: 68 }]);
    expect(t.trend).toBe("up");
    expect(t.delta).toBe(13);
    expect(t.previousPct).toBe(55);
    expect(t.latestPct).toBe(68);
  });

  it("detects decline", () => {
    const t = trajectoryOf([{ pct: 70 }, { pct: 64 }]);
    expect(t.trend).toBe("down");
    expect(t.delta).toBe(-6);
  });

  it("detects steady", () => {
    expect(trajectoryOf([{ pct: 60 }, { pct: 60 }]).trend).toBe("steady");
  });

  it("compares only the two most recent entries", () => {
    const t = trajectoryOf([{ pct: 30 }, { pct: 90 }, { pct: 95 }]);
    expect(t.delta).toBe(5);
    expect(t.count).toBe(3);
  });
});
