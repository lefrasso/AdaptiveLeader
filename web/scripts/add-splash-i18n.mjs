// Adds the "splash" namespace (boot overlay: subtitle, loading label, theme &
// language chooser, module names) to every messages/<locale>.json. Deep-merge:
// existing keys are preserved; only the splash keys below are added/updated.
// Module names for the six tools reuse the already-translated nav.* labels.
// Run:  node scripts/add-splash-i18n.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const msgDir = resolve(here, "..", "messages");

function deepMerge(base, override) {
  const out = { ...base };
  for (const k of Object.keys(override)) {
    const b = base[k];
    const o = override[k];
    if (
      b &&
      o &&
      typeof b === "object" &&
      typeof o === "object" &&
      !Array.isArray(b) &&
      !Array.isArray(o)
    ) {
      out[k] = deepMerge(b, o);
    } else {
      out[k] = o;
    }
  }
  return out;
}

const SPLASH = {
  en: {
    subtitle: "Preparing your interactive leadership guide",
    loading: "Loading modules",
    chooseTheme: "Choose your theme",
    chooseLanguage: "Choose your language",
    enter: "Enter the guide",
    themes: { default: "Default", retro: "Retro", darkModern: "Dark & Modern" },
    modules: { themes: "Themes & styling", i18n: "Translations" },
  },
  es: {
    subtitle: "Preparando tu guía interactiva de liderazgo",
    loading: "Cargando módulos",
    chooseTheme: "Elige tu tema",
    chooseLanguage: "Elige tu idioma",
    enter: "Entrar a la guía",
    themes: {
      default: "Predeterminado",
      retro: "Retro",
      darkModern: "Oscuro y moderno",
    },
    modules: { themes: "Temas y estilos", i18n: "Traducciones" },
  },
  it: {
    subtitle: "Preparazione della tua guida interattiva alla leadership",
    loading: "Caricamento dei moduli",
    chooseTheme: "Scegli il tema",
    chooseLanguage: "Scegli la lingua",
    enter: "Entra nella guida",
    themes: {
      default: "Predefinito",
      retro: "Retrò",
      darkModern: "Scuro e moderno",
    },
    modules: { themes: "Temi e stile", i18n: "Traduzioni" },
  },
  fr: {
    subtitle: "Préparation de votre guide interactif du leadership",
    loading: "Chargement des modules",
    chooseTheme: "Choisissez votre thème",
    chooseLanguage: "Choisissez votre langue",
    enter: "Entrer dans le guide",
    themes: {
      default: "Par défaut",
      retro: "Rétro",
      darkModern: "Sombre et moderne",
    },
    modules: { themes: "Thèmes et style", i18n: "Traductions" },
  },
  pt: {
    subtitle: "Preparando o seu guia interativo de liderança",
    loading: "Carregando módulos",
    chooseTheme: "Escolha o seu tema",
    chooseLanguage: "Escolha o seu idioma",
    enter: "Entrar no guia",
    themes: {
      default: "Padrão",
      retro: "Retrô",
      darkModern: "Escuro e moderno",
    },
    modules: { themes: "Temas e estilo", i18n: "Traduções" },
  },
  de: {
    subtitle: "Ihr interaktiver Leadership-Guide wird vorbereitet",
    loading: "Module werden geladen",
    chooseTheme: "Wähle dein Design",
    chooseLanguage: "Wähle deine Sprache",
    enter: "Zum Guide",
    themes: {
      default: "Standard",
      retro: "Retro",
      darkModern: "Dunkel & Modern",
    },
    modules: { themes: "Designs & Stil", i18n: "Übersetzungen" },
  },
  ar: {
    subtitle: "جارٍ تحضير دليل القيادة التفاعلي",
    loading: "جارٍ تحميل الوحدات",
    chooseTheme: "اختر المظهر",
    chooseLanguage: "اختر اللغة",
    enter: "ادخل إلى الدليل",
    themes: { default: "افتراضي", retro: "ريترو", darkModern: "داكن وعصري" },
    modules: { themes: "المظاهر والتنسيق", i18n: "الترجمات" },
  },
  zh: {
    subtitle: "正在准备您的交互式领导力指南",
    loading: "正在加载模块",
    chooseTheme: "选择主题",
    chooseLanguage: "选择语言",
    enter: "进入指南",
    themes: { default: "默认", retro: "复古", darkModern: "深色现代" },
    modules: { themes: "主题与样式", i18n: "翻译" },
  },
  ja: {
    subtitle: "インタラクティブなリーダーシップガイドを準備しています",
    loading: "モジュールを読み込み中",
    chooseTheme: "テーマを選択",
    chooseLanguage: "言語を選択",
    enter: "ガイドに入る",
    themes: {
      default: "デフォルト",
      retro: "レトロ",
      darkModern: "ダーク＆モダン",
    },
    modules: { themes: "テーマとスタイル", i18n: "翻訳" },
  },
  ko: {
    subtitle: "인터랙티브 리더십 가이드를 준비하는 중",
    loading: "모듈 로딩 중",
    chooseTheme: "테마 선택",
    chooseLanguage: "언어 선택",
    enter: "가이드 시작",
    themes: { default: "기본", retro: "레트로", darkModern: "다크 & 모던" },
    modules: { themes: "테마 및 스타일", i18n: "번역" },
  },
};

for (const [locale, splash] of Object.entries(SPLASH)) {
  const file = resolve(msgDir, `${locale}.json`);
  const json = JSON.parse(readFileSync(file, "utf8"));
  const merged = deepMerge(json, { splash });
  writeFileSync(file, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(`✓ ${locale}: splash namespace merged`);
}
