// Pure trajectory maths for repeated assessments.
//
// The growth-mindset reframe: measure *improvement over time*, not just the
// current level. Given a chronological history of results (oldest → newest),
// compare the two most recent to produce a "since last time" signal. No DOM, so
// this stays unit-testable.

export type Trend = "up" | "down" | "steady" | "first";

export type Trajectory = {
  trend: Trend;
  /** latest − previous, in percentage points (0 when there is no previous). */
  delta: number;
  latestPct: number;
  previousPct: number | null;
  count: number;
};

/** Compare the two most recent results in a chronological history. */
export function trajectoryOf(history: readonly { pct: number }[]): Trajectory {
  const count = history.length;
  if (count === 0) {
    return { trend: "first", delta: 0, latestPct: 0, previousPct: null, count };
  }
  const latestPct = history[count - 1].pct;
  if (count === 1) {
    return { trend: "first", delta: 0, latestPct, previousPct: null, count };
  }
  const previousPct = history[count - 2].pct;
  const delta = latestPct - previousPct;
  const trend: Trend = delta > 0 ? "up" : delta < 0 ? "down" : "steady";
  return { trend, delta, latestPct, previousPct, count };
}
