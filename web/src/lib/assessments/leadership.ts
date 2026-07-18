// Leadership Assessment — structural config and pure scoring logic.
// All user-facing TEXT lives in the i18n messages ("leadership" namespace);
// this module holds only structure, thresholds, colours, and math so the
// scoring is deterministic and unit-testable.

export type PartKey = "I" | "II" | "III" | "IV" | "V";

export const PART_ORDER: PartKey[] = ["I", "II", "III", "IV", "V"];

export type Topic = { n: number; part: PartKey; chapter: number };

export const TOPICS: Topic[] = [
  { n: 1, part: "I", chapter: 1 },
  { n: 2, part: "I", chapter: 2 },
  { n: 3, part: "I", chapter: 3 },
  { n: 4, part: "II", chapter: 4 },
  { n: 5, part: "II", chapter: 5 },
  { n: 6, part: "II", chapter: 6 },
  { n: 7, part: "III", chapter: 7 },
  { n: 8, part: "III", chapter: 8 },
  { n: 9, part: "III", chapter: 9 },
  { n: 10, part: "III", chapter: 10 },
  { n: 11, part: "IV", chapter: 12 },
  { n: 12, part: "IV", chapter: 13 },
  { n: 13, part: "IV", chapter: 14 },
  { n: 14, part: "V", chapter: 17 },
  { n: 15, part: "V", chapter: 18 },
  { n: 16, part: "V", chapter: 19 },
  { n: 17, part: "V", chapter: 20 },
];

export const SCALE_VALUES = [1, 2, 3, 4, 5] as const;

export type BandId = "emerging" | "developing" | "strong" | "exceptional";

export const BANDS: { id: BandId; min: number; max: number; color: string }[] = [
  { id: "emerging", min: 0, max: 34.9, color: "#d64550" },
  { id: "developing", min: 35, max: 59.9, color: "#f2b705" },
  { id: "strong", min: 60, max: 79.9, color: "#2e86c1" },
  { id: "exceptional", min: 80, max: 100, color: "#2e9e5b" },
];

/** topic number -> rating (1..5) */
export type Answers = Record<number, number>;

export type TopicScore = { topic: Topic; v: number };

export type Results = {
  vals: TopicScore[];
  avg: number;
  pct: number;
  partAvg: Record<PartKey, number>;
};

/** Colour for a topic/part average (v in 1..5). */
export function scoreColor(v: number): string {
  if (v <= 2) return "#d64550";
  if (v < 3) return "#e07b3e";
  if (v < 3.5) return "#f2b705";
  if (v < 4) return "#7bb241";
  return "#2e9e5b";
}

/** Colour for the overall readiness percentage (0..100). */
export function pctColor(p: number): string {
  if (p < 35) return "#d64550";
  if (p < 60) return "#f2b705";
  if (p < 80) return "#2e86c1";
  return "#2e9e5b";
}

/** Convert a 1..5 rating to a 0..100 bar width. */
export function valueToPct(v: number): number {
  return ((v - 1) / 4) * 100;
}

export function computeResults(answers: Answers): Results {
  const vals: TopicScore[] = TOPICS.map((topic) => ({
    topic,
    v: answers[topic.n],
  }));
  const avg = vals.reduce((s, x) => s + x.v, 0) / vals.length;
  const pct = Math.round(((avg - 1) / 4) * 100);

  const partAvg = {} as Record<PartKey, number>;
  for (const pk of PART_ORDER) {
    const items = vals.filter((x) => x.topic.part === pk);
    partAvg[pk] = items.reduce((s, x) => s + x.v, 0) / items.length;
  }

  return { vals, avg, pct, partAvg };
}

export function bandFor(pct: number) {
  return (
    BANDS.find((b) => pct >= b.min && pct <= b.max) ?? BANDS[BANDS.length - 1]
  );
}

/** Lowest-scoring topics first (v asc, then topic number asc). */
function sortAscending(vals: TopicScore[]): TopicScore[] {
  return [...vals].sort((a, b) =>
    a.v !== b.v ? a.v - b.v : a.topic.n - b.topic.n,
  );
}

/** Priority actions: topics rated <= 3, at least 3 and at most 6. */
export function getPriorities(vals: TopicScore[]): TopicScore[] {
  const sorted = sortAscending(vals);
  let priorities = sorted.filter((x) => x.v <= 3);
  if (priorities.length < 3) priorities = sorted.slice(0, 3);
  if (priorities.length > 6) priorities = priorities.slice(0, 6);
  return priorities;
}

/** Strengths: topics rated >= 4, highest first, up to 5. */
export function getStrengths(vals: TopicScore[]): TopicScore[] {
  return sortAscending(vals)
    .reverse()
    .filter((x) => x.v >= 4)
    .slice(0, 5);
}
