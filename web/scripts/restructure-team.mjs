// One-time restructure of Part IV (Build the Team): renumber chapters to make
// room, merge extra Trust content into the existing Trust chapter, and add three
// new English chapters (Composition & Foundations, Growth & Onboarding,
// Distributed & Hybrid Teams). New content is English-first; other locales get it
// via the chapter loader's English fallback. Idempotent (marker data-team="1").
//   Run:  node scripts/restructure-team.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const chDir = resolve(here, "..", "src", "lib", "chapters");
const LOCALES = ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

// Existing chapter numbers shift to open 11 (Composition) and 15/16 (Growth,
// Distributed) inside Part IV. Chapters 1–10 are untouched.
const RENUMBER = { 11: 12, 12: 13, 13: 14, 14: 17, 15: 18, 16: 19, 17: 20, 18: 21, 19: 22 };

const TEAM_MARKER = 'data-team="1"';

// Appended to the existing Trust & Psychological Safety chapter (now #13).
const TRUST_MERGE = `<p ${TEAM_MARKER}><strong>Safety is the base of a bigger pattern.</strong> Patrick Lencioni's <em>Five Dysfunctions of a Team</em> stacks the failure modes: an <strong>absence of trust</strong> breeds a <strong>fear of conflict</strong>, which breeds a <strong>lack of commitment</strong>, then an <strong>avoidance of accountability</strong>, and finally <strong>inattention to results</strong>. Because it is a pyramid, you cannot fix the top without the base — and the base is <em>vulnerability-based trust</em>: people admitting mistakes, gaps, and "I need help" without fear it will be used against them.</p><ul><li><strong>Healthy conflict is a feature, not a bug:</strong> Lencioni distinguishes productive <em>task</em> conflict (arguing the idea) from destructive <em>relationship</em> conflict (attacking the person). Teams that avoid conflict do not become harmonious — they make worse decisions quietly and relitigate them in the hallway. A leader's job is often to <em>mine for conflict</em>: surface the disagreement the room is swallowing.</li><li><strong>Working agreements make the implicit explicit:</strong> a short, co-authored set of team norms — how we meet, how we decide, how we disagree, response-time expectations, what "done" means — removes the friction of a dozen unspoken assumptions. Norms you write together you can hold each other to; norms you leave implicit you cannot.</li></ul><p>The combination is the goal: high safety <em>and</em> high standards, where it is safe to raise a problem <em>and</em> expected that you will.</p>`;

const NEW_CHAPTERS = [
  {
    number: 11,
    part: "IV",
    title: "Composition & Foundations",
    summary: "A team's ceiling is set before the work starts — by why it exists, who is on it, who decides what, and how its skills and perspectives are composed.",
    theme: "You cannot lead your way out of a badly composed team.",
    theory: "A charter defines the team's purpose and accountability; clear roles and decision rights (RACI) remove the ambiguity that stalls work; a capability map surfaces skill gaps and single points of failure; and hiring for adaptability plus cognitive diversity builds a team that can learn and change.",
    theoryHtml: `<p>Most team problems that look like performance or personality problems are really <strong>composition</strong> problems — decided long before the first stand-up. Four foundations set the ceiling.</p><ul><li><strong>Purpose and charter:</strong> a short team charter names why the team exists, what it is accountable for, how success is measured, and what is out of scope. Without it, teams drift toward whatever is loudest; with it, priorities and trade-offs have a reference point everyone shares.</li><li><strong>Role clarity and decision rights:</strong> most stalls trace back to "I thought you owned that." A <strong>RACI</strong> (Responsible, Accountable, Consulted, Informed) or a levels-of-delegation map makes ownership explicit — one Accountable person per decision, not a committee — so work moves without permission-seeking or collision.</li><li><strong>Capability mapping:</strong> a simple skills matrix (people × skills, current level) exposes two risks at once — <em>gaps</em> the team cannot yet cover, and <em>single points of failure</em>, the "bus factor" of one where a critical skill lives in exactly one head. You cannot plan around a risk you have not mapped.</li><li><strong>Hiring for adaptability and potential:</strong> current skill is the easiest thing to see and the fastest to date. Learning agility — how quickly someone makes sense of the new and adjusts — predicts long-run contribution better than pedigree, especially in fast-changing work.</li><li data-more="1"><strong>Cognitive and experiential diversity:</strong> Scott Page's work shows diverse problem-solvers can outperform more uniformly "able" ones, because a range of mental models covers more of the problem. But diversity only pays off with <em>inclusion</em> — psychological safety to voice the different view. Difference without inclusion is just tension.</li></ul><p><strong>Case in point.</strong> A leader inherits a team that is busy but thrashing. Before changing anyone, she writes a one-page charter, maps a RACI, and builds a skills matrix — and immediately sees the real problem: two people quietly own every critical system (bus factor of one), and three decisions have no clear owner. Fixing composition, not effort, unlocks the team.</p>`,
    keyModels: [
      { name: "Team charter", desc: "A short, shared statement of purpose, accountability, success measures, and scope. It converts a group of people into a team pointed the same way, and gives every later trade-off a reference point." },
      { name: "RACI / decision rights", desc: "Responsible, Accountable, Consulted, Informed — one Accountable owner per decision. Ambiguous ownership, not difficulty, is what stalls most work; making rights explicit is the cheapest speed-up available." },
      { name: "Skills matrix & bus factor", desc: "A people-by-skills grid that reveals capability gaps and single points of failure. A 'bus factor of one' — a critical skill held by exactly one person — is a risk you can only manage once you can see it." },
      { name: "Hiring for learning agility (Lombardo & Eichinger)", desc: "Potential and adaptability predict long-run performance better than current skill or pedigree, especially where the work changes. Hire for the slope, not just the intercept." },
      { name: "Cognitive diversity (Scott Page)", desc: "A diversity of mental models can beat uniform ability on complex problems — but only when paired with inclusion. Without the safety to voice the different view, diversity adds friction instead of insight." },
    ],
    colourAngle: {
      red: "Reds compose for speed and results and will define decision rights crisply — but may hire in their own fast, direct image and under-value the steadier or more analytical profiles that keep a team from driving off a cliff.",
      yellow: "Yellows build warm, energetic teams and champion diversity of people — but can under-invest in the unglamorous foundations (charter, RACI, skills matrix), leaving the team inspired but unclear on who owns what.",
      green: "Greens attend to belonging and fit, which builds cohesion — but their comfort with harmony can lead to hiring for likeness and avoiding the honest capability audit that surfaces a struggling or single-point-of-failure teammate.",
      blue: "Blues love the skills matrix and clear roles and will map them rigorously — but can over-index on demonstrated competence and credentials, screening out the high-potential adaptable hire who does not yet tick every box.",
    },
    leaderInAction: "A newly appointed lead resists the urge to reorganise people in week one. Instead she runs three artefacts: a one-page charter (purpose, what we're accountable for, what we're not), a RACI for the top ten recurring decisions, and a skills matrix. The matrix reveals a bus factor of one on the payments system and a yawning gap in data skills; the RACI reveals two decisions everyone assumed someone else owned. Her first moves — cross-train a second payments engineer, hire for data, assign clear owners — come straight from the map, not from guesswork.",
    practice: "Draft a one-page charter for your team (purpose, accountabilities, success measures, out-of-scope) and a RACI for your five most contested recurring decisions. Then build a quick skills matrix and circle every 'bus factor of one'.",
    watchOut: [
      "Hiring clones — composing a team of people who think like you feels comfortable and quietly caps the range of problems the team can solve.",
      "Ambiguous decision rights — 'we decide together' usually means no one is accountable and decisions drift; name one Accountable owner even for shared work.",
      "Diversity without inclusion — assembling different perspectives and then running the team so only the loudest are heard wastes the very difference you hired for.",
    ],
    takeaways: [
      "A team's ceiling is set at composition — purpose, roles, skills, and mix — before any leadership happens.",
      "Make ownership explicit (RACI) and map your skills; ambiguous rights and single points of failure are silent killers.",
      "Hire for adaptability and cognitive diversity, then build the inclusion that lets that diversity actually pay off.",
    ],
    checks: [
      {
        q: "Two decisions on your team keep stalling because 'everyone thought someone else owned them.' What fixes this fastest?",
        options: [
          "Add more people to each decision so nothing is missed",
          "Assign one Accountable owner per decision (a RACI), even where the work is shared",
          "Escalate both decisions to your manager",
          "Wait until the team builds more trust",
        ],
        correct: 1,
        why: "Ambiguous ownership — not difficulty — stalls most work; naming a single Accountable owner per decision is the cheapest speed-up, and a RACI makes it explicit.",
      },
      {
        q: "A critical system is understood by exactly one engineer. In team terms, what is this?",
        options: [
          "A sign of a strong specialist to protect",
          "A 'bus factor of one' — a single point of failure to cross-train away",
          "Efficient use of expertise",
          "A hiring problem to solve later",
        ],
        correct: 1,
        why: "A skill held by one person is a single point of failure ('bus factor of one'); a skills matrix surfaces it so you can cross-skill and reduce the risk before it bites.",
      },
      {
        q: "You want the benefits of a cognitively diverse team. What has to come with the diversity?",
        options: [
          "Faster consensus so debates don't slow you down",
          "Inclusion — the psychological safety for different views to actually be voiced",
          "A single dominant thinking style to align everyone",
          "More seniority on the team",
        ],
        correct: 1,
        why: "Diverse mental models only outperform when people feel safe to voice the different view; diversity without inclusion adds friction, not insight.",
      },
    ],
    practiceRubric: [
      "Your charter names accountabilities and what's out of scope — not just an inspiring mission line.",
      "Every contested decision in your RACI has exactly one Accountable owner.",
      "Your skills matrix flags real single points of failure, with a cross-skilling move attached to at least one.",
    ],
    practiceExemplar: "Charter: 'We own checkout reliability and conversion; we are not accountable for the catalogue.' RACI surfaced that 'pricing changes' had no owner — assigned to Dana. Skills matrix showed only Sam knows the fraud engine (bus factor 1) — Priya starts pairing with him on it this sprint.",
  },
  {
    number: 15,
    part: "IV",
    title: "Growth & Onboarding",
    summary: "A team is only as strong as how fast new members become effective and how deliberately the existing ones keep growing.",
    theme: "Development is not a perk; it is how a team compounds.",
    theory: "Structured onboarding shortens time-to-productivity; matching a coaching or directing style to each person's readiness (situational leadership) grows them without over- or under-supporting; individual development plans and career pathing retain and stretch people; and cross-skilling builds resilience and coverage.",
    theoryHtml: `<p>Teams do not stay strong by accident — they compound when people ramp fast and grow on purpose. Four disciplines make that happen.</p><ul><li><strong>Structured onboarding:</strong> the difference between a two-week and a two-month ramp is rarely talent — it is design. A <strong>30/60/90-day plan</strong>, a named buddy or mentor, early access and early wins, and clarity on "what good looks like" turn a nervous newcomer into a contributor while the enthusiasm is still high.</li><li><strong>Coaching vs. directing (Situational Leadership):</strong> Hersey and Blanchard's model matches your style to the person's <em>competence and commitment on the specific task</em> — directing for the new-and-unsure, coaching and supporting as they grow, delegating once they are able and willing. The error is a single default: directing an expert insults them; delegating to a novice abandons them.</li><li><strong>Development and career pathing:</strong> growth is retained talent. Individual development plans, honest growth conversations, and visible paths keep people stretching in place instead of leaving to grow. The <strong>70-20-10</strong> rule of thumb — most development from challenging experience, some from others, a little from formal training — points you at stretch assignments, not just courses.</li><li><strong>Mentoring and sponsorship:</strong> mentors give advice; <em>sponsors</em> spend their own credibility to open doors. Both matter, and leaders often over-supply the first and under-supply the second.</li><li data-more="1"><strong>Cross-skilling for resilience:</strong> <strong>T-shaped</strong> people — deep in one area, capable across several — give a team coverage when someone is out and flexibility when priorities shift, while shrinking the bus-factor risk. The trade-off is depth, so cross-skill deliberately, not everywhere.</li></ul><p><strong>Case in point.</strong> Two leads hire identical graduates. One hands over a laptop and a backlog; the other runs a 30/60/90 plan with a buddy, three scoped early wins, and weekly coaching that fades to delegation as competence grows. Three months in, the second graduate is autonomous and the first is still hesitantly asking permission — the gap is onboarding design, not ability.</p>`,
    keyModels: [
      { name: "Situational Leadership (Hersey & Blanchard)", desc: "Match your style — directing, coaching, supporting, delegating — to the person's competence and commitment on the specific task. No single style fits everyone; diagnosing readiness precedes choosing how to lead." },
      { name: "The 30/60/90-day plan", desc: "A staged onboarding ramp — learn, contribute, own — with a buddy, early wins, and an explicit picture of 'what good looks like'. Time-to-productivity is a design choice, not a personality trait." },
      { name: "70-20-10 development", desc: "Roughly 70% of growth comes from challenging experience, 20% from other people, 10% from formal training. It points leaders toward stretch assignments and coaching over sending people on courses." },
      { name: "Mentoring vs. sponsorship (Ibarra/Hewlett)", desc: "Mentors advise; sponsors advocate — spending their own credibility to create opportunity. Development stalls when a leader mentors generously but never sponsors." },
      { name: "T-shaped skills / cross-skilling", desc: "Depth in one area plus breadth across others gives a team coverage, flexibility, and a smaller bus factor. Trade against depth deliberately rather than cross-skilling everyone on everything." },
    ],
    colourAngle: {
      red: "Reds ramp people fast and delegate early — a gift for able newcomers, a cliff for unsure ones. Their growth edge is patience: to coach and support before delegating, and to see development as leverage rather than a tax on delivery.",
      yellow: "Yellows are natural, encouraging onboarders who make people feel welcome — but can skip the structure (plans, 'what good looks like', honest feedback), leaving newcomers warm but directionless and stretch conversations vague.",
      green: "Greens are patient, attentive developers who build real belonging — but their care can tip into over-support, doing the hard part for people and delegating too late, which quietly caps the growth they most want to nurture.",
      blue: "Blues build thorough onboarding plans and clear competency ladders — but can over-formalise development into checklists and courses, under-weighting the 70% that comes from messy, stretching, real-world experience.",
    },
    leaderInAction: "A manager notices new hires taking three months to contribute and senior engineers quietly bored. He builds a 30/60/90 template with a buddy and scoped early wins, and starts matching his style to readiness — directing the graduate through her first tickets, then coaching, then stepping back — while handing the bored senior a stretch project with sponsorship into a cross-team forum. Ramp time halves, and the senior, newly challenged, stops updating her CV.",
    practice: "Pick one new or recent joiner and one person who has plateaued. For the joiner, draft a 30/60/90 plan with a buddy and one early win; for the plateaued person, name one stretch experience (70-20-10) and whether they need a mentor or a sponsor.",
    watchOut: [
      "A single leadership style for everyone — directing an expert or delegating to a novice both fail; diagnose readiness first.",
      "Onboarding by osmosis — 'they'll pick it up' turns a two-week ramp into a two-month one and burns the newcomer's early momentum.",
      "Confusing mentoring with sponsorship — plenty of advice and no advocacy leaves capable people stuck and quietly looking elsewhere.",
    ],
    takeaways: [
      "Time-to-productivity is designed, not innate — a structured ramp with a buddy and early wins pays off for months.",
      "Match coaching vs. directing to each person's readiness on the task; the default-style trap under- or over-supports.",
      "Grow people through stretch experience and sponsorship, and cross-skill for resilience — development is how a team compounds.",
    ],
    checks: [
      {
        q: "A capable 10-year expert joins your team. What leadership style fits (Situational Leadership)?",
        options: [
          "Directing — give detailed step-by-step instructions",
          "Delegating (or supporting) — set the outcome and get out of the way",
          "The same style you use with everyone, for consistency",
          "Hands-off entirely, with no check-ins",
        ],
        correct: 1,
        why: "Style should match competence and commitment on the task; a high-competence expert needs delegating/supporting, not directing — over-directing an expert is demotivating.",
      },
      {
        q: "Per the 70-20-10 rule, where does most real development come from?",
        options: [
          "Formal training and courses",
          "Challenging on-the-job experience and stretch assignments",
          "Reading and self-study",
          "Annual performance reviews",
        ],
        correct: 1,
        why: "Roughly 70% of growth comes from challenging experience, 20% from others, and only 10% from formal training — so leaders should reach for stretch assignments before courses.",
      },
      {
        q: "What's the difference between mentoring and sponsorship?",
        options: [
          "They are two words for the same thing",
          "A mentor advises; a sponsor spends their own credibility to open doors",
          "Mentoring is formal; sponsorship is informal",
          "Sponsorship is only for senior people",
        ],
        correct: 1,
        why: "Mentors give guidance; sponsors advocate and create opportunity. Development stalls when a leader mentors generously but never sponsors.",
      },
    ],
    practiceRubric: [
      "The joiner's 30/60/90 plan has a named buddy, a concrete early win, and an explicit 'what good looks like'.",
      "Your style for the joiner matches their readiness on each task, not a single default.",
      "The plateaued person's plan leans on a stretch experience (not just a course), with mentor vs. sponsor made explicit.",
    ],
    practiceExemplar: "Joiner (Aria): day-30 = ship two small fixes with Ben as buddy; day-60 = own the notifications service; day-90 = lead a small feature. I'll direct then coach then delegate as she ramps. Plateaued (Marco): stretch = lead the migration (70-20-10 experience); he needs a sponsor, so I'll put his name forward for the architecture guild.",
  },
  {
    number: 16,
    part: "IV",
    title: "Distributed & Hybrid Teams",
    summary: "When a team is spread across locations, time zones, and employment types, trust, clarity, and pace stop being automatic — they have to be designed.",
    theme: "Distance punishes what was already fragile and rewards what you make explicit.",
    theory: "Remote trust and belonging must be built on purpose; async-first communication and written context replace hallway osmosis; vendors and contractors are integrated as full team members rather than a second tier; cultural intelligence carries you across borders; and a sustainable pace, deliberately protected, prevents the burnout that distance quietly accelerates.",
    theoryHtml: `<p>Co-location hides a lot of weak process behind hallway conversations and shared body language. Distance removes that cushion, so a distributed or hybrid team has to <em>design</em> what an in-person team gets for free.</p><ul><li><strong>Trust and belonging, built on purpose:</strong> remote teams run on <em>swift trust</em> granted up front and then confirmed by reliable delivery. You build it by over-communicating context, honouring commitments visibly, and creating intentional connection — because the watercooler will not do it for you. Time-zone <em>equity</em> matters too: rotate the meeting pain rather than always taxing the same region.</li><li><strong>Async-first and written by default:</strong> when people cannot be online together, the documented decision, the recorded demo, and the clear written brief become the team's nervous system. Async-first widens who can contribute (including the quiet and the non-native speaker) and stops progress from depending on overlapping hours.</li><li><strong>Integrate vendors and contractors as full members:</strong> two-tier teams — "us" and "the contractors" — leak trust and context. Give partners the mission, the access, and the inclusion of anyone else doing the work; withholding them guarantees the disengagement you then blame on them.</li><li><strong>Cultural intelligence across borders:</strong> distributed usually means multicultural. <strong>CQ</strong> — the drive, knowledge, strategy, and action to work across cultures — and Meyer's culture scales turn "they're difficult" into "we sit far apart on feedback and hierarchy," which you can actually design around.</li><li data-more="1"><strong>Sustainable pace and burnout prevention:</strong> Christina Maslach frames burnout as exhaustion, cynicism, and a sense of ineffectiveness, driven by chronic mismatches in workload, control, reward, community, fairness, and values. Remote work erodes the boundary between on and off, so leaders must protect it — model logging off, respect time zones, and watch for the always-on quiet quitter before they break.</li></ul><p><strong>Case in point.</strong> A team split across three continents keeps missing handoffs and quietly resenting the region that always takes the 6 a.m. call. The lead switches to async-first (decisions written, demos recorded), rotates meeting times so the pain is shared, brings the two contractors fully into planning, and sets an explicit "no expectation of replies outside your hours" norm. Delivery steadies and the simmering us-versus-them dissolves — none of it required being in the same room.</p>`,
    keyModels: [
      { name: "Swift trust", desc: "Temporary teams and remote teams cannot wait for trust to accrue slowly, so members extend it up front and then confirm it through reliable delivery. Over-communicating context and honouring commitments is how you keep it." },
      { name: "Async-first / documentation", desc: "Written decisions, recorded demos, and clear briefs let a team make progress without overlapping hours — and widen who can contribute, including quieter members and non-native speakers." },
      { name: "Cultural intelligence (CQ — Earley & Ang)", desc: "The capability to work across cultures: the drive to engage, knowledge of how cultures differ, the strategy to plan and check reads, and the action to flex. Paired with Meyer's culture scales, it turns friction into an adjustable gap." },
      { name: "Maslach burnout model", desc: "Burnout is exhaustion, cynicism, and reduced efficacy, driven by mismatches in workload, control, reward, community, fairness, and values. It names what to fix rather than telling people to be more resilient." },
      { name: "Time-zone equity", desc: "Rotate the cost of inconvenient meetings and default to async so no single region always pays the early-morning or late-night tax. Fairness in when people work is part of remote trust." },
    ],
    colourAngle: {
      red: "Reds keep distributed teams decisive and fast — but their bias for the quick synchronous call can tax distant time zones and skip the written record, leaving async members and contractors out of the decision they are then asked to execute.",
      yellow: "Yellows work hard at remote connection and belonging, which distance badly needs — but their energy is built for the room; they can under-document and let the quieter, off-camera, or non-native voices fade on a video grid.",
      green: "Greens are attentive to inclusion and to who is overloaded, which protects against burnout — but their reluctance to impose can leave norms (response times, meeting rotation, off-hours boundaries) unspoken, so the fairness they want never gets designed in.",
      blue: "Blues excel at the documentation and clear process async-first demands — but can over-rely on written systems and under-invest in the human connection and cultural read that keep a distributed team a team, not a set of tickets.",
    },
    leaderInAction: "A leader running an APAC–EMEA–Americas team notices handoffs slipping and the Manila team silently resentful of always taking the late call. She moves the team async-first — every decision written, every demo recorded — rotates the one shared meeting through all three time zones, folds the two long-term contractors fully into planning and channels, and posts an explicit norm: no expectation of replies outside your own working hours. Within a month, handoffs are reliable, the contractors are proposing ideas, and the burnout risk in Manila has visibly eased.",
    practice: "Audit your distributed team on four fronts: (1) is the meeting-time pain rotated fairly, (2) are decisions written and findable, (3) are contractors treated as full members, and (4) is there a clear off-hours boundary? Fix the weakest one this week.",
    watchOut: [
      "Defaulting to synchronous — running a distributed team like a co-located one taxes distant time zones and quietly excludes async and off-camera members from real decisions.",
      "Two-tier teams — treating vendors and contractors as outsiders withholds the context and belonging that would make them engaged, then blaming them for disengaging.",
      "The always-on trap — remote work erodes the on/off boundary, so silence can hide burnout; watch workload and community, and model logging off yourself.",
    ],
    takeaways: [
      "Distance removes the cushion of co-location, so trust, clarity, and belonging must be designed, not assumed.",
      "Go async-first and write things down; rotate time-zone pain and bring contractors fully in.",
      "Protect a sustainable pace — burnout is a workload-and-boundary problem to design out, not a personal-resilience failing.",
    ],
    checks: [
      {
        q: "Your team spans three continents and one region always takes the inconvenient call. What's the fairest, most durable fix?",
        options: [
          "Keep the schedule — the team should adapt to the leader's time zone",
          "Go async-first and rotate the shared meeting time so the pain is shared",
          "Cancel all meetings",
          "Ask the tired region to simply push through it",
        ],
        correct: 1,
        why: "Time-zone equity — rotating meeting pain and defaulting to async — spreads the cost fairly and keeps distant members in the decisions, which is part of remote trust.",
      },
      {
        q: "How should long-term contractors and vendors be integrated into a distributed team?",
        options: [
          "Kept at arm's length with need-to-know access only",
          "Given the mission, access, and inclusion of any other team member doing the work",
          "Managed entirely through their agency, never directly",
          "Excluded from planning to protect confidentiality",
        ],
        correct: 1,
        why: "Two-tier 'us vs. the contractors' teams leak trust and context; giving partners real context and belonging is what turns them into engaged contributors.",
      },
      {
        q: "A remote report has gone quiet and their output is slipping. Through the burnout lens (Maslach), what's the wise first move?",
        options: [
          "Tell them to build more resilience",
          "Look at workload, control, and boundaries — and check the on/off-hours line — rather than assuming a motivation problem",
          "Add more status meetings to keep an eye on them",
          "Wait and see if it resolves itself",
        ],
        correct: 1,
        why: "Burnout is driven by mismatches in workload, control, reward, community, fairness, and values — not weak resilience; remote work erodes boundaries, so check those first.",
      },
    ],
    practiceRubric: [
      "You judged meeting-time fairness by whether the pain rotates, not by what's convenient for you.",
      "Decisions on your team are written and findable, so progress doesn't depend on overlapping hours.",
      "Contractors and the off-hours boundary are addressed explicitly, not left to assumption.",
    ],
    practiceExemplar: "Audit: meeting pain sat entirely on Manila (fail). Fix this week — rotate the weekly sync across all three zones and move status updates to a written thread. Contractors are in a separate channel (two-tier); I'll merge them into the main team channels and planning. Off-hours: I'll post a 'no replies expected outside your hours' norm and stop sending late-night messages myself.",
  },
];

let touched = 0;

for (const loc of LOCALES) {
  const file = resolve(chDir, `${loc}.json`);
  const book = JSON.parse(readFileSync(file, "utf8"));

  const already = book.chapters.some(
    (c) => typeof c.theoryHtml === "string" && c.theoryHtml.includes(TEAM_MARKER),
  );
  if (already) {
    console.log(`${loc}: unchanged (already restructured)`);
    continue;
  }

  // 1. Renumber existing chapters to open the new slots.
  for (const c of book.chapters) {
    const next = RENUMBER[c.number];
    if (next) c.number = next;
  }

  // 2. Merge the extra Trust content into the (now #13) Trust chapter.
  const trust = book.chapters.find((c) => c.number === 13);
  if (trust && typeof trust.theoryHtml === "string") {
    trust.theoryHtml += TRUST_MERGE;
  }

  // 3. English is the source for the three new chapters; other locales inherit
  //    them through the loader's English fallback.
  if (loc === "en") {
    book.chapters.push(...NEW_CHAPTERS.map((c) => structuredClone(c)));
  }

  book.chapters.sort((a, b) => a.number - b.number);
  writeFileSync(file, JSON.stringify(book, null, 2) + "\n", "utf8");
  touched++;
  console.log(`${loc}: restructured (${book.chapters.length} chapters)`);
}

console.log(`Done — ${touched} locale files updated.`);
