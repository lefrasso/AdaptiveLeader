// Pure spaced-repetition scheduling for chapter reviews.
//
// After a chapter quiz, the chapter falls "due for review" again after an
// interval that grows with the number of attempts (a simple expanding
// schedule). Spacing is what turns short-term recall into durable memory. No
// DOM here, so it stays unit-testable.

import { DAY_MS, type Progress } from "./progress";

export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 30];

/** When a chapter with this quiz state next becomes due for review. */
export function nextReviewAt(quiz: {
  attempts: number;
  lastAt: number;
}): number {
  const idx = Math.min(
    Math.max(quiz.attempts - 1, 0),
    REVIEW_INTERVALS_DAYS.length - 1,
  );
  return quiz.lastAt + REVIEW_INTERVALS_DAYS[idx] * DAY_MS;
}

export type DueReview = { chapter: number; dueAt: number };

/** Chapters whose review is due, most overdue first. */
export function dueReviews(
  progress: Progress,
  now: number = Date.now(),
): DueReview[] {
  const out: DueReview[] = [];
  for (const [key, cp] of Object.entries(progress.chapters)) {
    if (!cp.quiz) continue;
    const dueAt = nextReviewAt(cp.quiz);
    if (dueAt <= now) out.push({ chapter: Number(key), dueAt });
  }
  return out.sort((a, b) => a.dueAt - b.dueAt);
}
