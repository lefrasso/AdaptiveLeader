// Self-Assessment (Colour profile) — structural config + pure logic.
// All user-facing TEXT lives in the i18n "self" namespace; this module holds
// only colour keys, hex values, question ids, and the composition maths.

export type ColourKey = "red" | "yellow" | "green" | "blue";

export const ORDER: ColourKey[] = ["red", "yellow", "green", "blue"];

export const COLOURS: Record<ColourKey, { hex: string; onLight: boolean }> = {
  red: { hex: "#d64550", onLight: false },
  yellow: { hex: "#f2b705", onLight: true },
  green: { hex: "#2e9e5b", onLight: false },
  blue: { hex: "#2e86c1", onLight: false },
};

export const QUESTION_IDS = [
  "work",
  "pressure",
  "comms",
  "decisions",
  "motivation",
  "conflict",
  "feedback",
  "strength",
] as const;

export type QuestionId = (typeof QUESTION_IDS)[number];

export type Weights = Record<ColourKey, number>;
/** question id -> per-colour slider weights (0..100) */
export type Topics = Record<string, Weights>;

export function emptyWeights(): Weights {
  return { red: 0, yellow: 0, green: 0, blue: 0 };
}

export function emptyTopics(): Topics {
  const t: Topics = {};
  for (const id of QUESTION_IDS) t[id] = emptyWeights();
  return t;
}

export function sumWeights(w: Weights): number {
  return w.red + w.yellow + w.green + w.blue;
}

/** Largest-remainder rounding so percentages always total exactly 100. */
export function roundPercents(
  fr: Record<ColourKey, number>,
): Record<ColourKey, number> {
  const floors = {} as Record<ColourKey, number>;
  const rem: [ColourKey, number][] = [];
  let used = 0;
  for (const c of ORDER) {
    const raw = fr[c] * 100;
    const f = Math.floor(raw);
    floors[c] = f;
    used += f;
    rem.push([c, raw - f]);
  }
  const left = 100 - used;
  rem.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < left; i++) floors[rem[i % ORDER.length][0]]++;
  return floors;
}

export function weightedTopicIds(topics: Topics): string[] {
  return Object.keys(topics).filter((t) => sumWeights(topics[t]) > 0);
}

/** Mean per-colour fraction across all rated aspects (each aspect normalised to 1). */
export function composition(topics: Topics): Record<ColourKey, number> | null {
  const ids = weightedTopicIds(topics);
  if (!ids.length) return null;
  const acc = emptyWeights();
  for (const tid of ids) {
    const wt = topics[tid];
    const s = sumWeights(wt);
    for (const c of ORDER) acc[c] += wt[c] / s;
  }
  const fr = {} as Record<ColourKey, number>;
  for (const c of ORDER) fr[c] = acc[c] / ids.length;
  return fr;
}

export type TierId = "dominant" | "secondary" | "minor" | "low";

export function tierLabel(p: number): TierId {
  if (p >= 35) return "dominant";
  if (p >= 20) return "secondary";
  if (p >= 10) return "minor";
  return "low";
}

export type Composition = {
  pct: Record<ColourKey, number>;
  sorted: ColourKey[];
  primary: ColourKey;
  secondary: ColourKey;
};

export function computeComposition(topics: Topics): Composition | null {
  const fr = composition(topics);
  if (!fr) return null;
  const pct = roundPercents(fr);
  const sorted = [...ORDER].sort((a, b) => pct[b] - pct[a]);
  return { pct, sorted, primary: sorted[0], secondary: sorted[1] };
}

/** Which narrative sentence to show for the primary/secondary split. */
export function pickNarrative(
  pPrimary: number,
  pSecondary: number,
): "strong" | "even" | "secondary" {
  if (pPrimary >= 55) return "strong";
  if (pPrimary - pSecondary <= 8) return "even";
  return "secondary";
}

/** Blend title only when the top two are close AND the secondary is meaningful. */
export function isBlendTitle(pPrimary: number, pSecondary: number): boolean {
  return pPrimary - pSecondary <= 8 && pSecondary >= 20;
}

/** The least-developed colour in a composition — the one to deliberately grow. */
export function pickStretchColour(comp: Composition): ColourKey {
  return comp.sorted[comp.sorted.length - 1];
}

/** Fisher–Yates shuffle (returns a new array). Used client-side to hide colours. */
export function shuffle<T>(input: T[]): T[] {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
