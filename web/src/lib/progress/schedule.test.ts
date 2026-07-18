import { describe, it, expect } from "vitest";
import { nextReviewAt, dueReviews, REVIEW_INTERVALS_DAYS } from "./schedule";
import { DAY_MS, defaultProgress, recordQuizAttempt } from "./progress";

const T = 1_700_000_000_000;

describe("spaced review schedule", () => {
  it("expands the interval with attempts (capped)", () => {
    expect(nextReviewAt({ attempts: 1, lastAt: T })).toBe(T + 1 * DAY_MS);
    expect(nextReviewAt({ attempts: 2, lastAt: T })).toBe(T + 3 * DAY_MS);
    expect(nextReviewAt({ attempts: 3, lastAt: T })).toBe(T + 7 * DAY_MS);
    expect(nextReviewAt({ attempts: 4, lastAt: T })).toBe(T + 30 * DAY_MS);
    expect(nextReviewAt({ attempts: 9, lastAt: T })).toBe(T + 30 * DAY_MS);
  });

  it("lists only chapters whose review is due, most overdue first", () => {
    let p = defaultProgress();
    p = recordQuizAttempt(p, 1, 3, 3, T); // due at T + 1 day
    p = recordQuizAttempt(p, 2, 2, 3, T + 5 * DAY_MS); // due at T + 6 days

    const dueEarly = dueReviews(p, T + 2 * DAY_MS);
    expect(dueEarly.map((d) => d.chapter)).toEqual([1]);

    const dueLater = dueReviews(p, T + 10 * DAY_MS);
    expect(dueLater.map((d) => d.chapter)).toEqual([1, 2]);
  });

  it("ignores chapters without a quiz", () => {
    expect(dueReviews(defaultProgress(), T)).toEqual([]);
    expect(REVIEW_INTERVALS_DAYS.length).toBe(4);
  });
});
