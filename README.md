# The Adaptive Leader

An interactive, fully multilingual leadership guide and self-development app —
**twenty-two chapters**, four appendices, and five hands-on assessment tools,
wrapped in a growth-mindset **learning loop** that helps you not just read about
leading but actually build the skill.

> It is not intended to replace the book or the deep reading behind it — it is a
> guide: a fast, structured way to revisit the ideas, assess yourself, and put
> them into practice.

The project exists in two forms:

- **[`web/`](web/) — the current app (recommended):** a modern **Next.js 16**
  build (React 19, TypeScript, Tailwind v4, next-intl) exported as a fully
  static site. All active development happens here — see
  [`web/README.md`](web/README.md).
- **Root (`index.html`, `script.js`, …) — the original:** the first version,
  built with plain **HTML/CSS/JavaScript** and no build step. Kept for reference.

---

## ✨ Features

### Content
- **22 chapters across 5 parts** — from *Expert to Leader* to *The Growth
  Mindset* (Satya Nadella's *Hit Refresh* + Carol Dweck).
- **Deep theory dives** — each chapter pairs the core idea with an evidence-based
  deep-dive (Leadership Pipeline, Johari Window, Goleman's EI, Situational
  Leadership, Cialdini, Lencioni, Edmondson's psychological safety, Kahneman,
  OKRs, GROW, the Culture Map, Ericsson's deliberate practice, and more), the
  four-colour angle, a leader-in-action story, a practice, and common pitfalls.
- **The Four Colours model** — Red / Yellow / Green / Blue behavioural language
  woven through every chapter.
- **4 appendices** — colour pocket guide, communication cheat-sheet, the
  leader's daily/weekly/monthly practice, and further reading.

### Interactive tools
- 🌈 **Colour Self-Assessment** — your colour composition and profile, plus a
  *stretch colour* to deliberately develop.
- 📊 **Leadership Skills Assessment** — rate yourself across 17 topics for a
  readiness index, a prioritised action plan with chapter pathways, and a
  **growth trajectory** that tracks improvement over time.
- 🎯 **Communication Style Evaluator** — analyse someone's style and get tailored
  recommendations.
- 🌍 **Cultural Tips** — pick a country and a colour for practical adaptation
  advice, across 24 countries and regions.
- 🧩 **Team Builder** — compose a team by colour and country and get grounded
  guidance on its balance, cultural spread, gaps, and how to build it.

### The learning loop (growth mindset)
- **End-of-chapter quizzes** — scenario retrieval with growth-oriented feedback.
- **Practice upgrade** — a self-check rubric, a "what good looks like" exemplar,
  and a *tried / happened / change* reflection you can save.
- **Spaced review + growth dashboard** — streaks, activity, your leadership
  trajectory, and chapters due for review — stored locally, on your device.

### Experience
- **10 languages, RTL** — full localisation; right-to-left for Arabic.
- **4 themes** — Default, Retro, Dark & Modern, and **Copilot** (Microsoft 365 /
  Fluent palette).
- **Privacy-first** — a consent banner and a Privacy & data panel; learning
  progress is opt-in, stored only in your browser, and exportable or erasable at
  any time.
- **Tasteful motion** — reveal-on-scroll that respects reduced-motion and print.

---

## 🌍 Supported languages

| Code | Language   | Code | Language   |
|------|------------|------|------------|
| `en` | English    | `de` | Deutsch    |
| `es` | Español    | `zh` | 中文        |
| `it` | Italiano   | `ja` | 日本語      |
| `fr` | Français   | `ko` | 한국어      |
| `pt` | Português  | `ar` | العربية (RTL) |

The selected language is remembered in `localStorage` between visits.

---

## 🚀 Getting started

The current app lives in [`web/`](web/) and uses **pnpm**:

```bash
cd web
pnpm install
pnpm dev          # http://localhost:3000  (the root redirects to /en)
```

Build a static export, run the tests, or lint:

```bash
pnpm build        # static export to web/out
pnpm test         # vitest
pnpm lint         # eslint
pnpm version:check # validate the SemVer release version
```

> Prefer the original zero-build version? Open `index.html` in a browser, or
> serve the repo root with `python -m http.server 8000`.

---

## 🏷️ Versioning

Releases follow [Semantic Versioning](https://semver.org/). The version in
[`web/package.json`](web/package.json) is the single source of truth and is
shown in the app's About dialog. Release tags use the matching `vX.Y.Z` form.

For a release, update `web/package.json` and [`CHANGELOG.md`](CHANGELOG.md), run
`pnpm version:check` from `web/`, commit the changes, and create the matching
annotated Git tag. The first complete release is **v1.0.0**.

---

## 🌐 Deploy to GitHub Pages

Deployment is automated by **GitHub Actions**
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)): every push to
`main` lints, tests, builds the static export
(`NEXT_PUBLIC_BASE_PATH=/AdaptiveLeader`), and publishes `web/out` to Pages. A
postbuild step writes the root redirect to the visitor's locale.

Enable it once via **Settings → Pages → Source → GitHub Actions**. The site then
lives at `https://<username>.github.io/AdaptiveLeader/`.

---

## 📁 Project structure

```
.
├── web/                     # ← the current Next.js app (see web/README.md)
│   ├── src/app/[locale]/    # routes: home, chapters, appendices, assessments…
│   ├── src/components/      # UI, assessments, learning loop, motion
│   ├── src/lib/             # chapters, appendices, assessments, prefs, progress
│   ├── messages/            # per-locale UI strings (next-intl)
│   └── scripts/             # content pipeline (extract / expand / translate)
│
├── index.html               # the original vanilla app (shell)
├── script.js                # original app logic + i18n engine
├── styles.css               # original styling
├── *-i18n.js                # original per-language content
└── .github/workflows/       # CI + Pages deploy
```

---

## 🎨 Design

- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (display serif) + [Manrope](https://fonts.google.com/specimen/Manrope) (sans),
  with Noto Sans Arabic / SC / JP / KR for full script coverage.
- **Theming** — four palettes: Default (navy/ice), Retro (warm), Dark & Modern,
  and Copilot (Microsoft 365 / Fluent). Hero gradients re-theme automatically.
- **Responsive** — adapts from wide desktop to mobile, with print-friendly
  styling and reduced-motion support.

---

## 🤝 Contributing

Issues and pull requests are welcome. For the current app, work in `web/`
(`pnpm dev`, `pnpm test`, `pnpm lint`).

Content is **English-first**: new chapters, theory, and UI are authored in
English, and other locales fall back to English until translated. Long-form
content lives in `web/src/lib/**/<locale>.json`, UI strings in
`web/messages/<locale>.json`; both are produced by the scripts in
`web/scripts/`.

---

## 🙏 Credits

Created with contributions from Maria Olhova, Sunny Pei, Gerardo Merello,
Pablo Scherer, Jay Rao, and Leandro Frasso. This application is powered by
Leandro.

---

## 📝 License

Released under the [MIT License](LICENSE).

The educational content is adapted from *The Adaptive Leader* leadership
workshop material. Please ensure you have the right to publish any source
content before deploying publicly.
