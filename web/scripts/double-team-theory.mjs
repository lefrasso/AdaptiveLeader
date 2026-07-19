// Doubles the theory deep-dive for the three team chapters that were added in
// the Part IV restructure (11 Composition & Foundations, 15 Growth & Onboarding,
// 16 Distributed & Hybrid Teams) — which predated by `double-theory.mjs` and so
// never received a second half. Brings them to the same two-part depth as the
// other chapters (structure like Chapter 1). Idempotent (marker: data-depth="2").
// English is appended to every locale that owns the chapter; locales that fall
// back to English are untouched (they don't carry these chapters yet).
//   Run:  node scripts/double-team-theory.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const chDir = resolve(here, "..", "src", "lib", "chapters");
const LOCALES = ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

// Chapter number -> English HTML appended after the existing theory. The first
// element carries data-depth="2" as the idempotency marker.
const EXPANSIONS = {
  11: `<p data-depth="2"><strong>Most of a team's effectiveness is decided before it starts.</strong> Richard Hackman's research on team effectiveness found that the enabling conditions a leader sets up front — a <em>real</em> team with stable membership, a compelling direction, an enabling structure, and a supportive context — matter far more than anything the leader does in the moment. His rough "60-30-10" rule captures it: roughly 60% of the variance in a team's performance is set by how the team is <em>designed</em>, 30% by how it is <em>launched</em>, and only 10% by day-to-day, hands-on leadership. Composition is leverage precisely because it sits upstream of everything else.</p><ul><li><strong>Roles, not just skills (Belbin):</strong> Belbin's nine team roles — from Plant (ideas) and Shaper (drive) to Completer-Finisher and Coordinator — show that a balanced mix of roles beats a roster of similar stars. A team of five Shapers fights; a team with no Finisher never ships. Map the roles you have and the ones you are missing, not only the skills.</li><li><strong>Size and coordination cost:</strong> Amazon's "two-pizza team" heuristic and Ringelmann's classic finding on social loafing point the same way — as a team grows, per-person effort tends to fall and coordination cost rises, because the number of communication links grows as n(n-1)/2. Smaller teams with clear ownership move faster than large ones with diffuse responsibility.</li><li><strong>Launch deliberately:</strong> because so much of effectiveness rides on the launch, a real kickoff — aligning on charter, roles, and working agreements in the first days — pays back many times over. Teams that "just start" spend the next quarter renegotiating what should have been settled in the first week.</li></ul><p>The practical shift is to treat team-building as an act of <em>design</em> done early and revisited at every membership change — not a hope that good people will sort themselves out once the work begins.</p>`,
  15: `<p data-depth="2"><strong>Great onboarding covers four things; most organisations do only the first.</strong> Talya Bauer's research frames onboarding as the "Four C's": <em>Compliance</em> (rules and paperwork), <em>Clarification</em> (what the role actually requires and what good looks like), <em>Culture</em> (the unwritten norms and language of the team), and <em>Connection</em> (the relationships and networks a person needs to get things done). Most onboarding stops at the first two and leaves the two that best predict retention — Culture and Connection — to chance.</p><ul><li><strong>Grow people at the edge (Vygotsky):</strong> the <em>zone of proximal development</em> is the band just beyond what someone can do alone but can reach with support. Effective development lives in the middle of the comfort–stretch–panic model: assignments hard enough to grow but scaffolded enough not to overwhelm, with the scaffolding removed as competence rises — exactly the arc from directing to delegating.</li><li><strong>Experience only teaches with reflection (Kolb):</strong> Kolb's learning cycle — concrete experience, reflective observation, abstract conceptualisation, active experimentation — explains why the "70" in 70-20-10 so often fails to deliver. Experience without structured reflection is just repetition; a short after-action habit is what converts hours into skill.</li><li><strong>Give growth somewhere to go:</strong> people who cannot see a path leave. Dual-ladder career frameworks — parallel technical and management tracks — let you grow and retain deep experts without forcing everyone into management to progress, and make development conversations concrete rather than vague reassurance.</li></ul><p>Onboarding and development are the same discipline at two time-scales: a deliberate design that moves a person from dependence to autonomy, and keeps moving them long after week one.</p>`,
  16: `<p data-depth="2"><strong>Distance changes what communication can carry.</strong> Media richness theory (Daft &amp; Lengel) ranks channels by how much they convey — face-to-face and video are "rich" (tone, expression, instant feedback), while chat and documents are "lean." The discipline is fit: use rich channels for ambiguous, emotional, or high-stakes messages (feedback, conflict, decisions that need buy-in) and lean, async channels for the simple and factual. Delivering hard news over text, or debating a settled fact in a live meeting, is a channel mismatch that quietly costs trust and time.</p><ul><li><strong>The common-ground problem (Cramton):</strong> distributed teams fail less from bad intent than from the <em>mutual-knowledge problem</em> — members assume a shared context that is not there, then misread a colleague's silence or delay as attitude rather than circumstance (a remote-amplified fundamental attribution error). The fix is to over-share context and state the situation explicitly: "it's a public holiday here," "I'm blocked on X."</li><li><strong>Proximity bias in hybrid (the two-tier trap):</strong> when some people are co-located and others remote, those in the room tend to get more airtime, visibility, and — research consistently finds — more promotions, regardless of output. Leaders must actively equalise: run hybrid meetings as if everyone were remote, make decisions in writing, and judge contribution by outcomes, not presence.</li><li><strong>Engineer the collisions (the Allen curve):</strong> Thomas Allen found the probability that two people communicate drops sharply with the distance between them; remote work sets that distance to infinity, so the spontaneous hallway exchange has to be deliberately designed back in — through written updates, virtual "watercooler" rituals, and periodic in-person gatherings.</li></ul><p>Leading at a distance is not in-person leadership done over video; it is a distinct craft in which context, fairness, and connection have to be built on purpose, because proximity will no longer build them for you.</p>`,
};

const MARKER = 'data-depth="2"';
let changed = 0;

for (const loc of LOCALES) {
  const file = resolve(chDir, `${loc}.json`);
  const book = JSON.parse(readFileSync(file, "utf8"));
  let touched = false;
  for (const ch of book.chapters) {
    const add = EXPANSIONS[ch.number];
    if (!add) continue;
    if (typeof ch.theoryHtml !== "string" || ch.theoryHtml.length === 0) continue;
    if (ch.theoryHtml.includes(MARKER)) continue; // idempotent
    ch.theoryHtml += add;
    touched = true;
    changed++;
  }
  if (touched) writeFileSync(file, JSON.stringify(book, null, 2) + "\n", "utf8");
  console.log(`${loc}: ${touched ? "team theory doubled" : "unchanged"}`);
}

console.log(`Done — ${changed} team-chapter theory sections expanded.`);
