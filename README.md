# The Adaptive Leader

An elegant, minimalist, fully multilingual leadership guide and self-development
web app built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no
build step. It consolidates the crucial topics for developing leadership skills
into an interactive, scannable reference paired with three hands-on tools.

> It is not intended to replace the book or the deep reading behind it — it is a
> guide: a fast, structured way to revisit the ideas, assess yourself, and put
> them into practice.

> **ARC design philosophy** — **A**nchor the reader, build **R**hythm, and
> deliver **C**larity. A persistent navigation, repeated card patterns, and a
> calm navy/ice palette keep the whole experience easy to orient.

---

## ✨ Features

- **17 chapters across 5 parts** — a complete leadership curriculum, from
  *Expert to Leader* through *Leading Across Cultures*.
- **Rich, expanded theory deep-dives** — every chapter includes an
  evidence-based theory section (Leadership Pipeline, Johari Window, Goleman's
  EI, SBI, Project Aristotle, OKRs, GROW, the Culture Map, and more) plus a
  concrete *case in point*, a *put it to work* practical angle, supporting
  research, and *common pitfalls* to avoid.
- **The Four Colours model** — Red, Yellow, Green, Blue behavioural language
  woven through every chapter (colour angles, leader-in-action stories,
  watch-outs).
- **4 appendices** — colour quick guide, communication cheat-sheet, the
  leader's daily/weekly/monthly practice, and a further-reading list.
- **Three interactive tools**
  - 🎯 **Communication Style Evaluator** — analyse a communication style and get
    tailored recommendations.
  - 🌈 **Colour Self-Assessment** — reveal your own colour composition and
    profile.
  - 📊 **Leadership Skills Assessment** — rate yourself across all 17 topics and
    get a prioritised action plan of recommendations to improve.
- **About dialog** — a pop-up describing the guide's intent and crediting its
  contributors.
- **10 languages, 100% translated** — every heading, body, appendix, and theory
  deep-dive is fully localised (not just the labels).
- **Right-to-left support** — full RTL layout for Arabic.
- **Light & dark mode** — respects the system `color-scheme`.
- **Zero dependencies** — loads instantly, works offline once cached, and can be
  hosted anywhere static files are served.

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

Because it's a pure static site, you only need a browser.

### Option 1 — Open directly

Double-click `index.html`, or open it in your browser.

### Option 2 — Serve locally (recommended)

Some browsers restrict `iframe` and `fetch` behaviour on the `file://`
protocol. Serving over `http://` avoids that:

```bash
# Python 3
python -m http.server 8000

# or Node.js
npx serve .
```

Then visit <http://localhost:8000>.

---

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
4. Choose the `main` branch and the `/ (root)` folder, then **Save**.
5. Your site will be live at `https://<username>.github.io/<repository>/`.

No build configuration is required — GitHub Pages serves the files as-is.

---

## 📁 Project structure

```
.
├── index.html                        # Main app shell
├── styles.css                        # All styling (design system, RTL, dark mode)
├── script.js                         # App logic, i18n engine, rendering
│
├── chapters-i18n.js                  # Chapter body translations (all languages)
├── chapters-extra.js                 # Extended English chapter content
├── theory-i18n.js                    # Rich HTML theory deep-dives (all languages)
├── ax-i18n.js                        # Appendix content translations
│
├── Communication-Style-Evaluator.html # Embedded tool #1
├── Self-Assessment.html              # Embedded tool #2
└── Leadership-Assessment.html        # Embedded tool #3
```

### How the internationalisation works

- `script.js` holds the `UI` object (interface strings) and a `t()` helper.
- `getBook(locale)` merges the base content with per-language overrides from
  `chapters-i18n.js`, `theory-i18n.js`, and `ax-i18n.js`.
- Extended English-only annotations live in `chapters-extra.js` and are skipped
  for other locales so translated content always takes precedence.
- All data files load **before** `script.js`, which then renders the active
  language.

---

## 🎨 Design

- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces)
  (display serif) + [Manrope](https://fonts.google.com/specimen/Manrope) (sans),
  with Noto Sans Arabic / SC / JP / KR for full script coverage.
- **Palette** — deep navy `#1e2761`, ice blue `#cadcfc`, soft background
  `#eef1f8`.
- **Responsive** — adapts from wide desktop to mobile with a sticky top bar and
  collapsible sidebar navigation.

---

## 🤝 Contributing

Issues and pull requests are welcome. Because there's no build step, changes are
easy to test — just edit a file and refresh the browser.

To add or refine a translation, update the relevant `*-i18n.js` file and the
`UI` object in `script.js`.

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
