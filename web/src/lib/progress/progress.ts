// Pure, environment-agnostic learning-progress model.
//
// No DOM or localStorage access here so this module stays unit-testable under
// the node test environment. The browser storage adapter + React hook live in
// ./store (a "use client" module) and gate persistence on user consent.

export const PROGRESS_KEY = "al.progress.v1";
export const PROGRESS_VERSION = 1;

export type QuizResult = {
  attempts: number;
  bestScore: number;
  lastScore: number;
  total: number;
  lastAt: number;
};

export type Reflection = {
  at: number;
  tried: string;
  happened: string;
  change: string;
};

export type ChapterProgress = {
  completedAt: number | null;
  quiz: QuizResult | null;
  reflections: Reflection[];
};

export type LeadershipEntry = {
  at: number;
  pct: number;
  band: string;
  partAvg: Record<string, number>;
};

export type SelfEntry = {
  at: number;
  composition: Record<string, number>;
};

export type Commitment = {
  id: string;
  at: number;
  chapter: number | null;
  text: string;
  dueAt: number | null;
  doneAt: number | null;
};

export type Habits = {
  streak: number;
  longest: number;
  /** UTC day index of the most recent activity, or null. */
  lastDay: number | null;
};

export type Progress = {
  version: number;
  chapters: Record<string, ChapterProgress>;
  assessments: {
    leadership: LeadershipEntry[];
    self: SelfEntry[];
  };
  commitments: Commitment[];
  habits: Habits;
};

export function defaultProgress(): Progress {
  return {
    version: PROGRESS_VERSION,
    chapters: {},
    assessments: { leadership: [], self: [] },
    commitments: [],
    habits: { streak: 0, longest: 0, lastDay: null },
  };
}

export const DAY_MS = 86_400_000;

/** UTC day bucket for a timestamp (stable + testable streak arithmetic). */
export function dayIndex(ts: number): number {
  return Math.floor(ts / DAY_MS);
}

// ── Normalisation (corruption-tolerant) ────────────────────────────

function asFiniteNumber(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function isReflection(v: unknown): v is Reflection {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return (
    typeof r.at === "number" &&
    typeof r.tried === "string" &&
    typeof r.happened === "string" &&
    typeof r.change === "string"
  );
}

function normalizeQuiz(v: unknown): QuizResult | null {
  if (!v || typeof v !== "object") return null;
  const q = v as Record<string, unknown>;
  if (typeof q.attempts !== "number") return null;
  return {
    attempts: q.attempts,
    bestScore: asFiniteNumber(q.bestScore, 0),
    lastScore: asFiniteNumber(q.lastScore, 0),
    total: asFiniteNumber(q.total, 0),
    lastAt: asFiniteNumber(q.lastAt, 0),
  };
}

function normalizeHabits(v: unknown): Habits {
  const base: Habits = { streak: 0, longest: 0, lastDay: null };
  if (!v || typeof v !== "object") return base;
  const h = v as Record<string, unknown>;
  return {
    streak: asFiniteNumber(h.streak, 0),
    longest: asFiniteNumber(h.longest, 0),
    lastDay: typeof h.lastDay === "number" ? h.lastDay : null,
  };
}

/** Coerce an arbitrary parsed value into a valid {@link Progress}. */
export function normalizeProgress(input: unknown): Progress {
  const base = defaultProgress();
  if (!input || typeof input !== "object") return base;
  const o = input as Record<string, unknown>;

  const chapters: Record<string, ChapterProgress> = {};
  if (o.chapters && typeof o.chapters === "object") {
    for (const [k, v] of Object.entries(o.chapters as Record<string, unknown>)) {
      if (!v || typeof v !== "object") continue;
      const c = v as Record<string, unknown>;
      chapters[k] = {
        completedAt: typeof c.completedAt === "number" ? c.completedAt : null,
        quiz: normalizeQuiz(c.quiz),
        reflections: Array.isArray(c.reflections)
          ? c.reflections.filter(isReflection)
          : [],
      };
    }
  }

  const a = (o.assessments ?? {}) as Record<string, unknown>;
  return {
    version: PROGRESS_VERSION,
    chapters,
    assessments: {
      leadership: Array.isArray(a.leadership)
        ? (a.leadership as LeadershipEntry[])
        : [],
      self: Array.isArray(a.self) ? (a.self as SelfEntry[]) : [],
    },
    commitments: Array.isArray(o.commitments)
      ? (o.commitments as Commitment[])
      : [],
    habits: normalizeHabits(o.habits),
  };
}

export function parseProgress(raw: string | null): Progress {
  if (!raw) return defaultProgress();
  try {
    return normalizeProgress(JSON.parse(raw));
  } catch {
    return defaultProgress();
  }
}

export function serializeProgress(p: Progress): string {
  return JSON.stringify(p);
}

// ── Pure update helpers (never mutate the input) ───────────────────

function chapter(p: Progress, key: string): ChapterProgress {
  return (
    p.chapters[key] ?? { completedAt: null, quiz: null, reflections: [] }
  );
}

export function recordQuizAttempt(
  p: Progress,
  chapterNumber: number,
  score: number,
  total: number,
  at: number = Date.now(),
): Progress {
  const key = String(chapterNumber);
  const c = chapter(p, key);
  const quiz: QuizResult = {
    attempts: (c.quiz?.attempts ?? 0) + 1,
    bestScore: Math.max(c.quiz?.bestScore ?? 0, score),
    lastScore: score,
    total,
    lastAt: at,
  };
  return { ...p, chapters: { ...p.chapters, [key]: { ...c, quiz } } };
}

export function markChapterComplete(
  p: Progress,
  chapterNumber: number,
  at: number = Date.now(),
): Progress {
  const key = String(chapterNumber);
  const c = chapter(p, key);
  if (c.completedAt) return p;
  return {
    ...p,
    chapters: { ...p.chapters, [key]: { ...c, completedAt: at } },
  };
}

export function addReflection(
  p: Progress,
  chapterNumber: number,
  r: Omit<Reflection, "at">,
  at: number = Date.now(),
): Progress {
  const key = String(chapterNumber);
  const c = chapter(p, key);
  return {
    ...p,
    chapters: {
      ...p.chapters,
      [key]: { ...c, reflections: [...c.reflections, { at, ...r }] },
    },
  };
}

export function recordLeadership(p: Progress, entry: LeadershipEntry): Progress {
  return {
    ...p,
    assessments: {
      ...p.assessments,
      leadership: [...p.assessments.leadership, entry],
    },
  };
}

export function recordSelf(p: Progress, entry: SelfEntry): Progress {
  return {
    ...p,
    assessments: { ...p.assessments, self: [...p.assessments.self, entry] },
  };
}

/** Register activity for the current day, updating the streak counters. */
export function recordHabitDay(p: Progress, at: number = Date.now()): Progress {
  const today = dayIndex(at);
  const last = p.habits.lastDay;
  let streak: number;
  if (last === null) streak = 1;
  else if (today === last) return p; // already counted today
  else if (today === last + 1) streak = p.habits.streak + 1;
  else streak = 1;
  return {
    ...p,
    habits: {
      streak,
      longest: Math.max(p.habits.longest, streak),
      lastDay: today,
    },
  };
}

export function addCommitment(
  p: Progress,
  c: Pick<Commitment, "chapter" | "text" | "dueAt">,
  at: number = Date.now(),
): Progress {
  const commitment: Commitment = {
    id: `${at}-${p.commitments.length}`,
    at,
    doneAt: null,
    ...c,
  };
  return { ...p, commitments: [...p.commitments, commitment] };
}

export function completeCommitment(
  p: Progress,
  id: string,
  at: number = Date.now(),
): Progress {
  return {
    ...p,
    commitments: p.commitments.map((c) =>
      c.id === id ? { ...c, doneAt: at } : c,
    ),
  };
}
