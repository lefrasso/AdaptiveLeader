// Team Builder tool — data + guidance logic.
//
// Synthesises the whole guide into practical advice for composing a team, from
// two inputs the app already models: each member's dominant COLOUR (the
// four-colour behavioural model, chapters 1–3 and appendix A) and their COUNTRY
// (the cross-cultural dimensions from Cultural Tips / the Culture Map, ch 18).
// It reads the team's colour balance (cognitive diversity, gaps, and
// over-representation — chapter 11) and its cultural spread (where norms differ
// and friction is likely — chapters 16 and 18), then returns grounded guidance.
//
// Pure and deterministic so it can be unit-tested; all guidance text is
// English-first here (the Cultural Tips rules follow the same convention).

import {
  COUNTRIES,
  COLOURS,
  COLOUR_ORDER,
  SCALES,
  getCountry,
  type ColourKey,
  type ScaleKey,
  type Country,
  type Colour,
} from "../cultural";

export {
  COUNTRIES,
  COLOURS,
  COLOUR_ORDER,
  SCALES,
  type ColourKey,
  type ScaleKey,
  type Country,
  type Colour,
};

export type Member = {
  id: string;
  name: string;
  colour: ColourKey;
  countryId: string;
};

export type InsightKind = "strength" | "gap" | "watch";
export type Insight = {
  kind: InsightKind;
  title: string;
  text: string;
  /** Where in the guide this draws from. */
  ref?: string;
};
export type Recommendation = { title: string; text: string; ref?: string };

export type Composition = {
  counts: Record<ColourKey, number>;
  pct: Record<ColourKey, number>;
  missing: ColourKey[];
  dominant: ColourKey | null;
  total: number;
};

export type ScaleSpread = {
  avg: number;
  min: number;
  max: number;
  spread: number;
};

export type TeamAnalysis = {
  size: number;
  composition: Composition;
  spread: Record<ScaleKey, ScaleSpread>;
  countries: Country[];
  regions: string[];
  colourInsights: Insight[];
  culturalInsights: Insight[];
  recommendations: Recommendation[];
};

// ---- thresholds -------------------------------------------------------------

/** A colour at or above this share of the team is "dominant". */
const DOMINANT_PCT = 50;
/** All four present and none above this share = a balanced mix. */
const BALANCED_MAX_PCT = 40;
/** A cultural dimension whose members span at least this range needs aligning. */
const WIDE_SPREAD = 40;
/** Every dimension within this range = a culturally aligned team. */
const ALIGNED_MAX_SPREAD = 20;
/** Coordination cost climbs past this size (ch 11 · two-pizza teams). */
const LARGE_TEAM = 9;

// ---- colour maths -----------------------------------------------------------

/** Largest-remainder rounding so the four percentages always total 100. */
function roundPct(
  counts: Record<ColourKey, number>,
  total: number,
): Record<ColourKey, number> {
  const pct = { red: 0, yellow: 0, green: 0, blue: 0 } as Record<ColourKey, number>;
  if (!total) return pct;
  const rem: [ColourKey, number][] = [];
  let used = 0;
  for (const c of COLOUR_ORDER) {
    const raw = (counts[c] / total) * 100;
    const floor = Math.floor(raw);
    pct[c] = floor;
    used += floor;
    rem.push([c, raw - floor]);
  }
  const left = 100 - used;
  rem.sort((a, b) => b[1] - a[1]);
  for (let i = 0; i < left; i++) pct[rem[i % COLOUR_ORDER.length][0]]++;
  return pct;
}

export function colourComposition(members: Member[]): Composition {
  const counts = { red: 0, yellow: 0, green: 0, blue: 0 } as Record<ColourKey, number>;
  for (const m of members) counts[m.colour]++;
  const total = members.length;
  const pct = roundPct(counts, total);
  const missing = COLOUR_ORDER.filter((c) => counts[c] === 0);
  let dominant: ColourKey | null = null;
  if (total > 0) {
    dominant = [...COLOUR_ORDER].sort((a, b) => counts[b] - counts[a])[0];
    if (counts[dominant] === 0) dominant = null;
  }
  return { counts, pct, missing, dominant, total };
}

// ---- cultural maths ---------------------------------------------------------

export function culturalSpread(members: Member[]): Record<ScaleKey, ScaleSpread> {
  const countries = members
    .map((m) => getCountry(m.countryId))
    .filter((c): c is Country => Boolean(c));
  const out = {} as Record<ScaleKey, ScaleSpread>;
  for (const s of SCALES) {
    const vals = countries.map((c) => c.scales[s.key]);
    if (!vals.length) {
      out[s.key] = { avg: 0, min: 0, max: 0, spread: 0 };
      continue;
    }
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    out[s.key] = { avg, min, max, spread: max - min };
  }
  return out;
}

// ---- guidance copy ----------------------------------------------------------

/** What each colour brings to a team, for gap/counterbalance phrasing. */
export const COLOUR_CONTRIBUTION: Record<ColourKey, string> = {
  red: "drive, pace and decisiveness",
  yellow: "energy, vision and connection",
  green: "stability, trust and follow-through",
  blue: "rigour, analysis and quality",
};

const MISSING_COLOUR: Record<ColourKey, Insight> = {
  red: {
    kind: "gap",
    title: "No natural driver",
    text: "Without a Red, decisions and pace can stall. Assign clear decision rights and a single accountable owner so momentum doesn't depend on everyone agreeing.",
    ref: "Ch 11 · Decision rights",
  },
  yellow: {
    kind: "gap",
    title: "Low energy & vision",
    text: "Without a Yellow, the team can under-sell the 'why' and lose morale in hard stretches. Ask someone to own communication, recognition, and the bigger picture.",
    ref: "Ch 4 · Emotional intelligence",
  },
  green: {
    kind: "gap",
    title: "Few stabilisers",
    text: "Without a Green, cohesion, listening, and follow-through are at risk. Protect psychological safety and make sure quieter concerns actually surface.",
    ref: "Ch 12 · Trust & safety",
  },
  blue: {
    kind: "gap",
    title: "No analyst",
    text: "Without a Blue, risks and quality gaps can go unseen. Make risk-checking an explicit responsibility and slow down before big, hard-to-reverse commitments.",
    ref: "Ch 11 · Capability map",
  },
};

const DOMINANT_COLOUR: Record<ColourKey, Insight> = {
  red: {
    kind: "watch",
    title: "Red-dominant team",
    text: "Plenty of drive, but a risk of conflict, steamrolling, and burnout. Build in structured listening and make it genuinely safe to disagree.",
    ref: "Ch 8 · Conflict",
  },
  yellow: {
    kind: "watch",
    title: "Yellow-dominant team",
    text: "Great energy and ideas, but detail, realism, and follow-through can slip. Add checkpoints, written follow-up, and a designated devil's advocate.",
    ref: "Ch 11 · Foundations",
  },
  green: {
    kind: "watch",
    title: "Green-dominant team",
    text: "Strong harmony, but the team may avoid hard conversations and resist change. Name issues explicitly and never mistake silence for agreement.",
    ref: "Ch 12 · Trust & safety",
  },
  blue: {
    kind: "watch",
    title: "Blue-dominant team",
    text: "High quality, but a risk of analysis paralysis and over-caution. Time-box decisions and protect momentum against endless refinement.",
    ref: "Ch 14 · Deciding under ambiguity",
  },
};

const BALANCED: Insight = {
  kind: "strength",
  title: "Balanced composition",
  text: "All four colours are represented fairly evenly — the full range of perspectives chapter 11 links to stronger problem-solving. Now build the inclusion that lets that diversity actually pay off.",
  ref: "Ch 11 · Cognitive diversity",
};

const MONOCHROME: Insight = {
  kind: "watch",
  title: "Single-colour team",
  text: "Everyone shares one style. It feels comfortable and low-friction, but it quietly caps the range of problems the team can solve. Deliberately develop or recruit the missing perspectives.",
  ref: "Ch 11 · Hiring clones",
};

const WIDE_SCALE: Record<ScaleKey, Insight> = {
  communicating: {
    kind: "watch",
    title: "Communication styles differ",
    text: "Your team spans explicit, low-context and implicit, high-context communicators. Default to writing decisions down and confirming understanding so meaning isn't lost in the subtext.",
    ref: "Ch 16 · Async-first",
  },
  evaluating: {
    kind: "watch",
    title: "Feedback norms differ",
    text: "Some members expect blunt critique; others read directness as rude. Agree how feedback is given — and by whom — before it is actually needed.",
    ref: "Ch 18 · Culture Map",
  },
  leading: {
    kind: "watch",
    title: "Views on hierarchy differ",
    text: "Some expect to challenge openly, others to defer to rank. Make decision rights and who-decides explicit so deference isn't mistaken for consensus.",
    ref: "Ch 11 · Decision rights",
  },
  trusting: {
    kind: "watch",
    title: "Trust is built differently",
    text: "Task-first and relationship-first members are mixed here. Invest in personal connection for those who need it, while keeping delivery visible for those who don't.",
    ref: "Ch 16 · Swift trust",
  },
  disagreeing: {
    kind: "watch",
    title: "Comfort with conflict varies",
    text: "Open debate energises some members and shuts others down. Create safe, structured ways to dissent so confrontation-averse voices are still heard.",
    ref: "Ch 8 · Conflict",
  },
  scheduling: {
    kind: "watch",
    title: "Time norms differ",
    text: "Punctual, linear members and flexible, fluid ones will frustrate each other. Set explicit expectations on deadlines, timekeeping, and what 'on time' means.",
    ref: "Ch 18 · Culture Map",
  },
};

const MULTI_REGION: Insight = {
  kind: "watch",
  title: "Spread across regions",
  text: "The team spans regions and probably time zones. Go async-first, rotate the pain of inconvenient meeting times, and run hybrid meetings as if everyone were remote.",
  ref: "Ch 16 · Distributed teams",
};

const MONOCULTURE: Insight = {
  kind: "watch",
  title: "Single-culture team",
  text: "Everyone shares one cultural baseline — low friction, but a blind spot when you work across borders. Seek an outside perspective before decisions with global reach.",
  ref: "Ch 18 · Culture Map",
};

const ALIGNED: Insight = {
  kind: "strength",
  title: "Culturally aligned",
  text: "Your members sit close together on the cultural dimensions, so norms are largely shared and friction is low. Stay alert to the blind spots a like-minded group can share.",
  ref: "Ch 18 · Culture Map",
};

// ---- analysis ---------------------------------------------------------------

export function analyseTeam(members: Member[]): TeamAnalysis | null {
  if (!members.length) return null;

  const composition = colourComposition(members);
  const spread = culturalSpread(members);
  const countries = uniqueCountries(members);
  const regions = [...new Set(countries.map((c) => c.region))];

  // Colour read.
  const colourInsights: Insight[] = [];
  const present = COLOUR_ORDER.filter((c) => composition.counts[c] > 0);
  if (present.length === 1) {
    colourInsights.push(MONOCHROME);
  } else if (
    composition.missing.length === 0 &&
    COLOUR_ORDER.every((c) => composition.pct[c] <= BALANCED_MAX_PCT)
  ) {
    colourInsights.push(BALANCED);
  }
  for (const c of composition.missing) colourInsights.push(MISSING_COLOUR[c]);
  if (present.length > 1) {
    for (const c of COLOUR_ORDER) {
      if (composition.pct[c] >= DOMINANT_PCT) colourInsights.push(DOMINANT_COLOUR[c]);
    }
  }

  // Cultural read.
  const culturalInsights: Insight[] = [];
  const wideScales = SCALES.filter((s) => spread[s.key].spread >= WIDE_SPREAD);
  if (countries.length <= 1) {
    culturalInsights.push(MONOCULTURE);
  } else {
    if (regions.length > 1) culturalInsights.push(MULTI_REGION);
    for (const s of wideScales) culturalInsights.push(WIDE_SCALE[s.key]);
    if (!wideScales.length && SCALES.every((s) => spread[s.key].spread <= ALIGNED_MAX_SPREAD)) {
      culturalInsights.push(ALIGNED);
    }
  }

  return {
    size: members.length,
    composition,
    spread,
    countries,
    regions,
    colourInsights,
    culturalInsights,
    recommendations: buildRecommendations(members, composition, spread, countries, regions),
  };
}

function uniqueCountries(members: Member[]): Country[] {
  const seen = new Set<string>();
  const out: Country[] = [];
  for (const m of members) {
    if (seen.has(m.countryId)) continue;
    const country = getCountry(m.countryId);
    if (country) {
      seen.add(m.countryId);
      out.push(country);
    }
  }
  return out;
}

function buildRecommendations(
  members: Member[],
  composition: Composition,
  spread: Record<ScaleKey, ScaleSpread>,
  countries: Country[],
  regions: string[],
): Recommendation[] {
  const recs: Recommendation[] = [];

  // Foundations always come first — composition sets the ceiling, foundations
  // decide whether you reach it (ch 11).
  recs.push({
    title: "Set the foundations first",
    text: "Whatever the mix, write a one-page team charter and a RACI so purpose and decision rights are explicit. Composition sets the ceiling; foundations decide whether you reach it.",
    ref: "Ch 11 · Composition & Foundations",
  });

  // Cover missing perspectives.
  if (composition.missing.length) {
    const names = composition.missing.map((c) => COLOURS[c].name);
    const contributions = composition.missing.map((c) => COLOUR_CONTRIBUTION[c]);
    recs.push({
      title: `Cover the missing ${names.length > 1 ? "perspectives" : "perspective"}`,
      text: `You have no ${listJoin(names)} on the team, so you are light on ${listJoin(
        contributions,
      )}. Assign that role to someone explicitly, or recruit for it on the next hire.`,
      ref: "Ch 11 · Capability map",
    });
  }

  // Counterbalance a dominant colour.
  if (composition.dominant && composition.pct[composition.dominant] >= DOMINANT_PCT) {
    const d = composition.dominant;
    recs.push({
      title: `Counterbalance a ${COLOURS[d].name}-heavy team`,
      text: `${composition.pct[d]}% of the team leads with ${COLOURS[d].name}. Protect the styles it can crowd out and appoint someone to voice the opposite view before big calls.`,
      ref: "Ch 11 · Cognitive diversity",
    });
  }

  // Team size.
  if (members.length <= 2) {
    recs.push({
      title: "Guard against single points of failure",
      text: "On a small team, one person often owns each critical skill — a 'bus factor of one'. Cross-skill deliberately so no essential knowledge sits with just one person.",
      ref: "Ch 11 · Bus factor",
    });
  } else if (members.length >= LARGE_TEAM) {
    recs.push({
      title: "Watch coordination cost",
      text: `At ${members.length} people, communication links and coordination cost climb fast. Consider splitting into smaller sub-teams, each with a clear owner.`,
      ref: "Ch 11 · Team size",
    });
  }

  // Align the widest cultural dimension.
  const widest = [...SCALES].sort((a, b) => spread[b.key].spread - spread[a.key].spread)[0];
  if (widest && spread[widest.key].spread >= WIDE_SPREAD) {
    recs.push({
      title: `Align on ${widest.name.toLowerCase()}`,
      text: `Your team is furthest apart on ${widest.name.toLowerCase()} (a ${spread[widest.key].spread}-point spread). Make the norm explicit and agreed rather than assumed, so the difference doesn't become friction.`,
      ref: "Ch 18 · Culture Map",
    });
  }

  // Distributed working.
  if (regions.length > 1 || countries.length > 2) {
    recs.push({
      title: "Work async-first",
      text: "With members across cultures and time zones, write decisions down, record demos, and rotate meeting times so no one region always pays the early-morning tax.",
      ref: "Ch 16 · Distributed & hybrid teams",
    });
  }

  return recs;
}

function listJoin(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
