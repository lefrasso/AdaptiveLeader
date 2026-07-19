// Cultural Tips tool — data + analysis logic.
//
// Combines the Four-Colours behavioural model with cross-cultural dimensions
// (a pragmatic subset of Erin Meyer's Culture Map, referenced in chapter 18).
// Given a country and a colour it composes practical, country-specific tips.
// Country positions are general cultural tendencies (0..100) — starting points,
// not predictions about any individual.

export type ColourKey = "red" | "yellow" | "green" | "blue";

export type ScaleKey =
  | "communicating"
  | "evaluating"
  | "leading"
  | "trusting"
  | "disagreeing"
  | "scheduling";

export type Scale = {
  key: ScaleKey;
  name: string;
  /** Label for the 0 end of the spectrum. */
  low: string;
  /** Label for the 100 end of the spectrum. */
  high: string;
};

export const SCALES: Scale[] = [
  {
    key: "communicating",
    name: "Communicating",
    low: "Explicit · low-context",
    high: "Implicit · high-context",
  },
  {
    key: "evaluating",
    name: "Feedback",
    low: "Direct criticism",
    high: "Indirect criticism",
  },
  {
    key: "leading",
    name: "Leading",
    low: "Egalitarian",
    high: "Hierarchical",
  },
  {
    key: "trusting",
    name: "Trust",
    low: "Task-based",
    high: "Relationship-based",
  },
  {
    key: "disagreeing",
    name: "Disagreeing",
    low: "Confrontation is fine",
    high: "Avoids confrontation",
  },
  {
    key: "scheduling",
    name: "Time",
    low: "Linear · punctual",
    high: "Flexible · fluid",
  },
];

export type Country = {
  id: string;
  name: string;
  flag: string;
  region: string;
  /** App locale this culture maps to, when applicable. */
  locale?: string;
  summary: string;
  scales: Record<ScaleKey, number>;
};

export const COUNTRIES: Country[] = [
  {
    id: "us",
    name: "United States",
    flag: "🇺🇸",
    region: "Americas",
    locale: "en",
    summary:
      "Low-context and explicit — say what you mean and put it in writing. Feedback is direct but wrapped in positives. Egalitarian and fast-moving; decisions come quickly and individually.",
    scales: { communicating: 10, evaluating: 40, leading: 25, trusting: 20, disagreeing: 45, scheduling: 20 },
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    locale: "en",
    summary:
      "Explicit on facts but understated and indirect on feedback — criticism is wrapped in politeness and irony. Egalitarian, and diplomacy is preferred over open confrontation.",
    scales: { communicating: 30, evaluating: 60, leading: 30, trusting: 30, disagreeing: 60, scheduling: 25 },
  },
  {
    id: "au",
    name: "Australia",
    flag: "🇦🇺",
    region: "Asia-Pacific",
    locale: "en",
    summary:
      "Very egalitarian and informal, with blunt, friendly directness. Little patience for hierarchy or self-importance — say it plainly and without airs.",
    scales: { communicating: 15, evaluating: 35, leading: 15, trusting: 25, disagreeing: 40, scheduling: 25 },
  },
  {
    id: "de",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    locale: "de",
    summary:
      "Explicit, precise and very direct — negative feedback is given plainly and not taken personally. Punctual and structured; debate on the merits is welcomed, then decisions are firm.",
    scales: { communicating: 10, evaluating: 20, leading: 55, trusting: 25, disagreeing: 25, scheduling: 10 },
  },
  {
    id: "fr",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    locale: "fr",
    summary:
      "Intellectual debate is valued — disagreement signals engagement. More hierarchical and higher-context; feedback can be pointed but is delivered within a relationship. Decisions concentrate at the top.",
    scales: { communicating: 60, evaluating: 35, leading: 70, trusting: 55, disagreeing: 30, scheduling: 55 },
  },
  {
    id: "it",
    name: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    locale: "it",
    summary:
      "Relationship-first and expressive; much is communicated implicitly and through personal connection. Hierarchy and personal trust matter, and time is flexible. Build the relationship before the task.",
    scales: { communicating: 65, evaluating: 50, leading: 60, trusting: 70, disagreeing: 45, scheduling: 65 },
  },
  {
    id: "es",
    name: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    locale: "es",
    summary:
      "Warm and relationship-driven; personal rapport underpins business. Communication is expressive and higher-context, time is flexible, and hierarchy is respected but personable.",
    scales: { communicating: 60, evaluating: 50, leading: 55, trusting: 65, disagreeing: 50, scheduling: 65 },
  },
  {
    id: "pt",
    name: "Portugal",
    flag: "🇵🇹",
    region: "Europe",
    locale: "pt",
    summary:
      "Relationship-oriented and courteous; feedback is diplomatic and confrontation is softened. Higher-context communication with respect for hierarchy and personal trust.",
    scales: { communicating: 60, evaluating: 58, leading: 55, trusting: 65, disagreeing: 60, scheduling: 55 },
  },
  {
    id: "br",
    name: "Brazil",
    flag: "🇧🇷",
    region: "Americas",
    locale: "pt",
    summary:
      "Highly relationship-driven and warm; trust is personal and built over time. Communication is expressive and higher-context, feedback is softened to protect relationships, and time is flexible.",
    scales: { communicating: 65, evaluating: 62, leading: 60, trusting: 78, disagreeing: 58, scheduling: 70 },
  },
  {
    id: "mx",
    name: "Mexico",
    flag: "🇲🇽",
    region: "Americas",
    locale: "es",
    summary:
      "Warm, relationship-centered and respectful of hierarchy. Feedback is indirect to preserve dignity and harmony, and confrontation is avoided. Invest in personal trust and be patient with time.",
    scales: { communicating: 65, evaluating: 70, leading: 70, trusting: 75, disagreeing: 68, scheduling: 70 },
  },
  {
    id: "ar",
    name: "Argentina",
    flag: "🇦🇷",
    region: "Americas",
    locale: "es",
    summary:
      "Expressive and relationship-driven with a European streak — more open to direct debate than much of Latin America. Personal connection is essential and time is flexible.",
    scales: { communicating: 60, evaluating: 45, leading: 55, trusting: 70, disagreeing: 42, scheduling: 65 },
  },
  {
    id: "ae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    locale: "ar",
    summary:
      "Deeply relationship- and honour-based; trust and personal connection precede business. Communication is high-context and indirect, hierarchy is strong, and criticism is never delivered publicly. Patience and respect are essential.",
    scales: { communicating: 72, evaluating: 72, leading: 78, trusting: 82, disagreeing: 72, scheduling: 58 },
  },
  {
    id: "cn",
    name: "China",
    flag: "🇨🇳",
    region: "Asia-Pacific",
    locale: "zh",
    summary:
      "Very high-context — meaning lives in what is left unsaid. Preserving 'face' is paramount, so criticism is private and indirect. Strong hierarchy and relationship (guanxi); harmony is protected and open disagreement avoided.",
    scales: { communicating: 82, evaluating: 80, leading: 80, trusting: 80, disagreeing: 82, scheduling: 45 },
  },
  {
    id: "jp",
    name: "Japan",
    flag: "🇯🇵",
    region: "Asia-Pacific",
    locale: "ja",
    summary:
      "The highest-context culture — much is communicated implicitly and through silence. Consensus is built quietly before meetings (nemawashi), confrontation is avoided and 'face' protected. Punctual and meticulous.",
    scales: { communicating: 90, evaluating: 85, leading: 75, trusting: 70, disagreeing: 90, scheduling: 15 },
  },
  {
    id: "kr",
    name: "South Korea",
    flag: "🇰🇷",
    region: "Asia-Pacific",
    locale: "ko",
    summary:
      "High-context and strongly hierarchical — age and rank shape interaction. Reading the room ('nunchi') matters; criticism is indirect to protect harmony and seniority. Relationship-based, with fast-paced execution.",
    scales: { communicating: 80, evaluating: 75, leading: 82, trusting: 72, disagreeing: 80, scheduling: 30 },
  },
  {
    id: "in",
    name: "India",
    flag: "🇮🇳",
    region: "Asia-Pacific",
    summary:
      "High-context and strongly relationship- and hierarchy-driven — rank and personal connection shape everything. Criticism is softened to protect harmony and status, open disagreement is avoided, and time is fluid. Invest in the relationship and read the subtext.",
    scales: { communicating: 75, evaluating: 70, leading: 80, trusting: 72, disagreeing: 72, scheduling: 75 },
  },
  {
    id: "my",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Asia-Pacific",
    summary:
      "Very high-context and strongly hierarchical — 'face' and harmony are protected at all costs. Feedback is indirect, open confrontation is avoided, and trust is personal. Respect rank and never criticise anyone publicly.",
    scales: { communicating: 80, evaluating: 78, leading: 85, trusting: 78, disagreeing: 82, scheduling: 55 },
  },
  {
    id: "ph",
    name: "Philippines",
    flag: "🇵🇭",
    region: "Asia-Pacific",
    summary:
      "Warm, relationship-first and high-context — personal rapport and harmony come before the task. Feedback is gentle and indirect to preserve 'face' (pakikisama), hierarchy is respected, and time is flexible.",
    scales: { communicating: 72, evaluating: 75, leading: 80, trusting: 75, disagreeing: 78, scheduling: 60 },
  },
  {
    id: "eg",
    name: "Egypt",
    flag: "🇪🇬",
    region: "Middle East",
    locale: "ar",
    summary:
      "Deeply relationship- and honour-based; trust and personal connection precede business. Communication is high-context and indirect, hierarchy is strong, criticism is never public, and time is fluid. Patience and respect open every door.",
    scales: { communicating: 78, evaluating: 72, leading: 80, trusting: 80, disagreeing: 72, scheduling: 75 },
  },
  {
    id: "dz",
    name: "Algeria",
    flag: "🇩🇿",
    region: "Middle East",
    locale: "ar",
    summary:
      "Relationship- and honour-based with a French administrative streak. High-context and indirect, hierarchical, and trust is built personally over time. Feedback is diplomatic and confrontation is softened; invest in the relationship first.",
    scales: { communicating: 74, evaluating: 66, leading: 78, trusting: 78, disagreeing: 66, scheduling: 70 },
  },
  {
    id: "ca",
    name: "Canada",
    flag: "🇨🇦",
    region: "Americas",
    locale: "en",
    summary:
      "Explicit and low-context, but more understated and polite than the US — feedback is direct yet diplomatic. Egalitarian and consensus-minded; punctual and task-oriented, with confrontation softened by courtesy.",
    scales: { communicating: 18, evaluating: 48, leading: 25, trusting: 25, disagreeing: 50, scheduling: 20 },
  },
  {
    id: "cz",
    name: "Czech Republic",
    flag: "🇨🇿",
    region: "Europe",
    summary:
      "Fairly explicit and low-context, with reasonably direct feedback delivered soberly. Moderately hierarchical and increasingly task-based; punctual and structured, with a pragmatic tolerance for debate on the merits.",
    scales: { communicating: 32, evaluating: 38, leading: 48, trusting: 45, disagreeing: 45, scheduling: 25 },
  },
  {
    id: "bg",
    name: "Bulgaria",
    flag: "🇧🇬",
    region: "Europe",
    summary:
      "Moderate-context and relationship-aware, with hierarchy respected and trust built personally. Feedback is fairly candid among trusted colleagues but softened in public; time and pace are moderately flexible.",
    scales: { communicating: 45, evaluating: 42, leading: 60, trusting: 55, disagreeing: 55, scheduling: 45 },
  },
  {
    id: "ro",
    name: "Romania",
    flag: "🇷🇴",
    region: "Europe",
    summary:
      "Relationship-oriented and moderately high-context; hierarchy and personal trust matter. Feedback is indirect and diplomatic, open confrontation is avoided, and time is flexible. Build rapport before pushing the task.",
    scales: { communicating: 52, evaluating: 55, leading: 65, trusting: 60, disagreeing: 60, scheduling: 50 },
  },
];

export type Colour = {
  id: ColourKey;
  name: string;
  archetype: string;
  hex: string;
  onLight: boolean;
  /** Characteristics in normal, day-to-day situations. */
  normal: string[];
  /** How the style tends to show up under stress. */
  stress: string[];
  /** Universal tips for working with this style. */
  considerations: string[];
};

export const COLOURS: Record<ColourKey, Colour> = {
  red: {
    id: "red",
    name: "Red",
    archetype: "The Driver",
    hex: "#d64550",
    onLight: false,
    normal: [
      "Decisive, fast and results-focused — creates momentum",
      "Direct and to the point",
      "Competitive and comfortable taking charge",
      "Impatient with delay, detail and small talk",
    ],
    stress: [
      "Becomes controlling and blunt",
      "Overrides others to force a result",
      "Dismisses emotion and nuance",
      "Cuts people off and escalates",
    ],
    considerations: [
      "Lead with the bottom line and clear options",
      "Respect their time — be brief and confident",
      "Give them control over the 'how'",
      "Don't take bluntness personally",
    ],
  },
  yellow: {
    id: "yellow",
    name: "Yellow",
    archetype: "The Inspirer",
    hex: "#f2b705",
    onLight: true,
    normal: [
      "Enthusiastic, sociable and idea-driven",
      "Persuasive and optimistic",
      "Energises people around a vision",
      "Big-picture rather than detail",
    ],
    stress: [
      "Scattered and over-promising",
      "Avoids hard truths and detail",
      "Talks more than listens",
      "Takes criticism personally",
    ],
    considerations: [
      "Bring energy and warmth; connect to a bigger purpose",
      "Allow time to talk and feel recognised",
      "Don't drown them in data",
      "Help them capture the detail and follow-through",
    ],
  },
  green: {
    id: "green",
    name: "Green",
    archetype: "The Supporter",
    hex: "#2e9e5b",
    onLight: false,
    normal: [
      "Patient, loyal and empathetic",
      "Steady, calm and reliable",
      "Builds trust and harmony",
      "Prefers gradual, consulted change",
    ],
    stress: [
      "Goes quiet and withdraws",
      "Avoids conflict — agrees, then disengages",
      "Absorbs pressure until it breaks",
      "Resists sudden change",
    ],
    considerations: [
      "Build the relationship first; never rush",
      "Give time to process and avoid surprises",
      "Invite their honest view explicitly",
      "Don't mistake silence for agreement",
    ],
  },
  blue: {
    id: "blue",
    name: "Blue",
    archetype: "The Analyst",
    hex: "#2e86c1",
    onLight: false,
    normal: [
      "Analytical, precise and quality-focused",
      "Logical and structured",
      "Catches risks and flaws others miss",
      "Wants evidence before acting",
    ],
    stress: [
      "Over-analyses and is slow to decide",
      "Becomes hyper-critical and perfectionist",
      "Withdraws emotionally",
      "Gets lost in detail",
    ],
    considerations: [
      "Come prepared with facts, evidence and structure",
      "Give time and space to analyse",
      "Send written detail and acknowledge risks",
      "Don't oversell or pressure for speed",
    ],
  },
};

export const COLOUR_ORDER: ColourKey[] = ["red", "yellow", "green", "blue"];

type TipKind = "adapt" | "strength";
type When = "high" | "low";
type TipRule = { scale: ScaleKey; when: When; kind: TipKind; text: string };

const HIGH = 60;
const LOW = 40;

// Per-colour rules keyed to cultural scales. For a given country each scale
// fires at most one rule (its value is either high, low, or neutral).
const RULES: Record<ColourKey, TipRule[]> = {
  red: [
    { scale: "evaluating", when: "high", kind: "adapt", text: "Your blunt feedback can cause loss of face. Deliver criticism privately and gently, and open from the relationship rather than the problem." },
    { scale: "evaluating", when: "low", kind: "strength", text: "Your directness fits — state the bottom line plainly. Just pair each problem with a proposed way forward." },
    { scale: "leading", when: "high", kind: "adapt", text: "Openly challenging authority can read as disrespect. Acknowledge rank and move decisions through the hierarchy, not around it." },
    { scale: "leading", when: "low", kind: "strength", text: "The egalitarian, challenge-anyone style suits you here — just make space for others to push back too." },
    { scale: "trusting", when: "high", kind: "adapt", text: "A results-first approach can feel transactional. Invest real time in personal trust before pushing for outcomes." },
    { scale: "trusting", when: "low", kind: "strength", text: "Task-first works here — move fast and let competence build the trust." },
    { scale: "disagreeing", when: "high", kind: "adapt", text: "Head-on confrontation shuts people down here. Make room for indirect dissent and listen for what people won't say directly." },
    { scale: "communicating", when: "high", kind: "adapt", text: "Being explicit and to the point can miss the subtext. Slow down and read what is implied, not just what is said." },
    { scale: "scheduling", when: "high", kind: "adapt", text: "Pushing a rigid deadline can strain relationships. Hold the goal but flex the timeline." },
  ],
  yellow: [
    { scale: "communicating", when: "low", kind: "adapt", text: "Charm and big-picture talk need explicit specifics and written follow-up to land here." },
    { scale: "evaluating", when: "low", kind: "adapt", text: "Expect blunt feedback — it isn't a rejection of you. Separate the idea from yourself." },
    { scale: "evaluating", when: "high", kind: "strength", text: "Your tact and positivity suit a culture that softens criticism — you preserve face naturally." },
    { scale: "trusting", when: "high", kind: "strength", text: "Your warmth is a real asset — you build the personal trust these cultures run on." },
    { scale: "trusting", when: "low", kind: "adapt", text: "Relationship charm won't substitute for delivering results here — back the enthusiasm with output." },
    { scale: "scheduling", when: "low", kind: "adapt", text: "Punctuality and follow-through matter — don't let enthusiasm outrun the details." },
    { scale: "leading", when: "high", kind: "adapt", text: "Respect formality and hierarchy; over-familiarity can undercut your credibility." },
    { scale: "disagreeing", when: "low", kind: "adapt", text: "Be ready for direct pushback and don't smooth over real issues to keep the mood up." },
  ],
  green: [
    { scale: "evaluating", when: "low", kind: "adapt", text: "Direct feedback here isn't hostility. State your own view plainly — quiet agreement can be mistaken for consent." },
    { scale: "disagreeing", when: "low", kind: "adapt", text: "Debate is expected. Speak up early; silence may be read as having nothing to add." },
    { scale: "trusting", when: "high", kind: "strength", text: "Your relationship focus fits perfectly — you build the trust these cultures are built on." },
    { scale: "communicating", when: "high", kind: "strength", text: "Your attunement to subtext is an advantage — you read the room these cultures rely on." },
    { scale: "evaluating", when: "high", kind: "strength", text: "Your tact preserves face naturally — a strong fit for indirect-feedback cultures." },
    { scale: "leading", when: "high", kind: "strength", text: "Your respect for people and rank fits a hierarchical culture well." },
    { scale: "scheduling", when: "low", kind: "strength", text: "Your reliability and steadiness suit a punctual, structured culture." },
    { scale: "scheduling", when: "high", kind: "adapt", text: "Flexible time suits your patience — just keep your own commitments crisp so steadiness doesn't blur into drift." },
  ],
  blue: [
    { scale: "trusting", when: "high", kind: "adapt", text: "Data alone won't build trust here. Invest in the personal relationship before presenting the analysis." },
    { scale: "trusting", when: "low", kind: "strength", text: "A task-and-evidence focus fits — let the rigour of your work speak." },
    { scale: "communicating", when: "high", kind: "adapt", text: "Precision can miss implied meaning. Attend to context and what is left unsaid." },
    { scale: "evaluating", when: "high", kind: "adapt", text: "Blunt critique of flaws can cause loss of face. Frame risks diplomatically and in private." },
    { scale: "evaluating", when: "low", kind: "strength", text: "Your candour about flaws fits — just pair each problem with a solution." },
    { scale: "leading", when: "high", kind: "adapt", text: "Route your analysis through the right authority; going around rank can backfire." },
    { scale: "scheduling", when: "high", kind: "adapt", text: "A rigid process can clash with flexible time — keep your standards but flex the schedule." },
    { scale: "disagreeing", when: "low", kind: "strength", text: "Challenge on the merits is welcome — bring the evidence and make the case." },
  ],
};

export type Tip = { scale: ScaleKey; scaleName: string; text: string };

export type CulturalAnalysis = {
  country: Country;
  colour: Colour;
  strengths: Tip[];
  adapt: Tip[];
};

export function getCountry(id: string): Country | undefined {
  return COUNTRIES.find((c) => c.id === id);
}

/** Compose country-specific tips for a colour from the cultural scale positions. */
export function analyse(countryId: string, colour: ColourKey): CulturalAnalysis | null {
  const country = getCountry(countryId);
  if (!country) return null;
  const scaleName = (k: ScaleKey) => SCALES.find((s) => s.key === k)?.name ?? k;
  const strengths: Tip[] = [];
  const adapt: Tip[] = [];
  for (const rule of RULES[colour]) {
    const v = country.scales[rule.scale];
    const fires =
      (rule.when === "high" && v >= HIGH) || (rule.when === "low" && v <= LOW);
    if (!fires) continue;
    const tip: Tip = { scale: rule.scale, scaleName: scaleName(rule.scale), text: rule.text };
    (rule.kind === "strength" ? strengths : adapt).push(tip);
  }
  return { country, colour: COLOURS[colour], strengths, adapt };
}
