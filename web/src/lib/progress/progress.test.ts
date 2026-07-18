import { describe, it, expect } from "vitest";
import {
  defaultProgress,
  normalizeProgress,
  parseProgress,
  serializeProgress,
  recordQuizAttempt,
  markChapterComplete,
  addReflection,
  recordLeadership,
  recordSelf,
  recordHabitDay,
  addCommitment,
  completeCommitment,
  dayIndex,
  DAY_MS,
  PROGRESS_VERSION,
} from "./progress";

const T = 1_700_000_000_000;

describe("progress model", () => {
  it("provides sensible defaults", () => {
    expect(defaultProgress()).toEqual({
      version: PROGRESS_VERSION,
      chapters: {},
      assessments: { leadership: [], self: [] },
      commitments: [],
      habits: { streak: 0, longest: 0, lastDay: null },
    });
  });

  it("parses null / corrupt as defaults", () => {
    expect(parseProgress(null)).toEqual(defaultProgress());
    expect(parseProgress("{nope")).toEqual(defaultProgress());
  });

  it("normalises away invalid sections and entries", () => {
    const p = normalizeProgress({
      chapters: { "1": "not-an-object", "2": { completedAt: T } },
      assessments: { leadership: "bad" },
      commitments: null,
      habits: { streak: 3, longest: 5, lastDay: 42 },
    });
    expect(p.chapters["1"]).toBeUndefined();
    expect(p.chapters["2"]).toEqual({
      completedAt: T,
      quiz: null,
      reflections: [],
    });
    expect(p.assessments.leadership).toEqual([]);
    expect(p.commitments).toEqual([]);
    expect(p.habits).toEqual({ streak: 3, longest: 5, lastDay: 42 });
  });

  it("records quiz attempts, keeping the best score", () => {
    let p = recordQuizAttempt(defaultProgress(), 4, 3, 5, T);
    expect(p.chapters["4"].quiz).toEqual({
      attempts: 1,
      bestScore: 3,
      lastScore: 3,
      total: 5,
      lastAt: T,
    });
    p = recordQuizAttempt(p, 4, 2, 5, T + 1000);
    expect(p.chapters["4"].quiz).toMatchObject({
      attempts: 2,
      bestScore: 3, // best retained
      lastScore: 2, // latest recorded
    });
  });

  it("marks chapters complete idempotently", () => {
    const p1 = markChapterComplete(defaultProgress(), 1, T);
    expect(p1.chapters["1"].completedAt).toBe(T);
    const p2 = markChapterComplete(p1, 1, T + DAY_MS);
    expect(p2).toBe(p1); // unchanged reference
  });

  it("appends reflections and assessment history", () => {
    let p = addReflection(
      defaultProgress(),
      2,
      { tried: "a", happened: "b", change: "c" },
      T,
    );
    expect(p.chapters["2"].reflections).toEqual([
      { at: T, tried: "a", happened: "b", change: "c" },
    ]);
    p = recordLeadership(p, { at: T, pct: 60, band: "strong", partAvg: {} });
    p = recordLeadership(p, { at: T + 1, pct: 70, band: "strong", partAvg: {} });
    expect(p.assessments.leadership).toHaveLength(2);
    p = recordSelf(p, { at: T, composition: { red: 25 } });
    expect(p.assessments.self).toHaveLength(1);
  });

  it("tracks habit streaks across days", () => {
    const p0 = defaultProgress();
    const p1 = recordHabitDay(p0, T);
    expect(p1.habits).toEqual({
      streak: 1,
      longest: 1,
      lastDay: dayIndex(T),
    });
    const sameDay = recordHabitDay(p1, T + 1000);
    expect(sameDay).toBe(p1); // no double-count within a day
    const p2 = recordHabitDay(p1, T + DAY_MS);
    expect(p2.habits.streak).toBe(2);
    const p3 = recordHabitDay(p2, T + 2 * DAY_MS);
    expect(p3.habits).toMatchObject({ streak: 3, longest: 3 });
    const afterGap = recordHabitDay(p3, T + 10 * DAY_MS);
    expect(afterGap.habits).toMatchObject({ streak: 1, longest: 3 });
  });

  it("adds and completes commitments", () => {
    let p = addCommitment(
      defaultProgress(),
      { chapter: 5, text: "Have the hard conversation", dueAt: T + DAY_MS },
      T,
    );
    const id = p.commitments[0].id;
    expect(p.commitments[0]).toMatchObject({ chapter: 5, doneAt: null });
    p = completeCommitment(p, id, T + DAY_MS);
    expect(p.commitments[0].doneAt).toBe(T + DAY_MS);
  });

  it("round-trips through serialize/parse", () => {
    const p = recordQuizAttempt(defaultProgress(), 1, 4, 5, T);
    expect(parseProgress(serializeProgress(p))).toEqual(p);
  });
});
