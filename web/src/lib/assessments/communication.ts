// Communication Style Evaluator — structural config + pure logic.
// Reuses the shared four-colour composition maths from the self-assessment
// module; all user-facing TEXT lives in the i18n "comm" namespace.

import {
  type ColourKey,
  type Topics,
  type Weights,
} from "./self-assessment";

export {
  ORDER,
  COLOURS,
  roundPercents,
  sumWeights,
  composition,
  computeComposition,
  tierLabel,
  weightedTopicIds,
  isBlendTitle,
  shuffle,
} from "./self-assessment";
export type { ColourKey, Topics, Weights, Composition } from "./self-assessment";

export const QUESTION_IDS = [
  "pace",
  "focus",
  "meeting",
  "decisions",
  "body",
  "frustration",
  "style",
  "pressure",
] as const;

export type QuestionId = (typeof QUESTION_IDS)[number];

export function emptyTopics(): Topics {
  const t: Topics = {};
  for (const id of QUESTION_IDS) {
    t[id] = { red: 0, yellow: 0, green: 0, blue: 0 } satisfies Weights;
  }
  return t;
}

/** Canonical key for a colour pair (alphabetical), e.g. red+yellow. */
export function pairKey(a: ColourKey, b: ColourKey): string {
  return [a, b].sort().join("+");
}

/** Which narrative sentence variant to show for the primary/secondary split. */
export function pickNarrative(
  pPrimary: number,
  pSecondary: number,
): "strong" | "even" | "secondaryStrong" | "secondaryLight" {
  if (pPrimary >= 55) return "strong";
  if (pPrimary - pSecondary <= 8) return "even";
  if (pSecondary >= 20) return "secondaryStrong";
  return "secondaryLight";
}

/** Colours at >= 20%, always including the primary. */
export function significantColours(
  pct: Record<ColourKey, number>,
  sorted: ColourKey[],
  primary: ColourKey,
): ColourKey[] {
  const sig = sorted.filter((c) => pct[c] >= 20);
  if (!sig.includes(primary)) sig.unshift(primary);
  return sig;
}

/** Merge string lists preserving order, de-duplicating, capped at `cap`. */
export function mergeUnique(lists: string[][], cap: number): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    for (const item of list) {
      if (!seen.has(item)) {
        seen.add(item);
        out.push(item);
      }
    }
  }
  return out.slice(0, cap);
}

/** Delivery tips: primary's first three, plus secondary's if it is significant (cap 4). */
export function buildDelivery(
  primaryDelivery: string[],
  secondaryDelivery: string[] | null,
): string[] {
  const out = primaryDelivery.slice(0, 3);
  if (secondaryDelivery) {
    for (const x of secondaryDelivery) {
      if (!out.includes(x) && out.length < 4) out.push(x);
    }
  }
  return out;
}
