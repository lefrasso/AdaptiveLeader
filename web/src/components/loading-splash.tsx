"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeMeta } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Theme options shown in the splash (mirrors the header theme switcher). */
const THEMES = [
  { id: "default", labelKey: "default", swatch: "var(--navy)" },
  { id: "retro", labelKey: "retro", swatch: "var(--red)" },
  { id: "dark-modern", labelKey: "darkModern", swatch: "var(--blue)" },
] as const;

/**
 * Modules "loaded" during the splash. The first six reuse the already-translated
 * nav labels; the last two are splash-specific.
 */
const MODULE_KEYS = [
  "nav.chapters",
  "nav.appendices",
  "nav.self",
  "nav.leadership",
  "nav.evaluator",
  "nav.cultural",
  "splash.modules.themes",
  "splash.modules.i18n",
] as const;

const STEP_MS = 240;

/**
 * Persists across client-side (soft) navigations within one JS session so the
 * splash only appears on genuine full page loads — not when following links.
 */
let shownThisSession = false;

/** Full-screen boot overlay: simulates module loading, then lets the visitor
 * pick a theme and language before entering the guide. */
export function LoadingSplash() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const t = useTranslations();

  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [loaded, setLoaded] = useState(0);
  const [pendingLocale, setPendingLocale] = useState<string>(locale);

  // Decide on mount whether to show the splash at all.
  useEffect(() => {
    let skip = shownThisSession;
    try {
      // Set right before a locale-change navigation so the destination page
      // doesn't replay the splash.
      if (sessionStorage.getItem("al.splashSkip")) {
        sessionStorage.removeItem("al.splashSkip");
        skip = true;
      }
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    if (skip) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time boot gate
      setVisible(false);
    } else {
      shownThisSession = true;
    }
  }, []);

  // Lock background scroll while the overlay is up.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  // Simulate loading the modules, then reveal the theme/language chooser.
  useEffect(() => {
    if (!visible || phase !== "loading") return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLoaded(i);
      if (i >= MODULE_KEYS.length) {
        window.clearInterval(id);
        window.setTimeout(() => setPhase("ready"), 400);
      }
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [visible, phase]);

  if (!visible) return null;

  const pct = Math.round((loaded / MODULE_KEYS.length) * 100);
  const activeTheme = theme ?? "default";

  function enter() {
    try {
      localStorage.setItem("al.locale", pendingLocale);
    } catch {
      // ignore
    }
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      if (pendingLocale !== locale) {
        try {
          sessionStorage.setItem("al.splashSkip", "1");
        } catch {
          // ignore
        }
        router.replace(pathname, { locale: pendingLocale });
        window.setTimeout(() => {
          try {
            sessionStorage.removeItem("al.splashSkip");
          } catch {
            // ignore
          }
        }, 1500);
      }
    }, 320);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("app.name")}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background px-6 transition-opacity duration-300",
        closing && "pointer-events-none opacity-0",
      )}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center">
          <div className="mb-4 flex justify-center gap-2" aria-hidden>
            {["var(--red)", "var(--yellow)", "var(--green)", "var(--blue)"].map(
              (c, i) => (
                <span
                  key={c}
                  className="size-3.5 animate-pulse rounded-full"
                  style={{ background: c, animationDelay: `${i * 150}ms` }}
                />
              ),
            )}
          </div>
          <h1 className="font-serif text-2xl font-bold text-navy dark:text-ice">
            {t("app.name")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("splash.subtitle")}
          </p>
        </div>

        {phase === "loading" ? (
          <div className="mt-8">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              <div
                className="h-full rounded-full bg-navy transition-[width] duration-300 ease-out dark:bg-ice"
                style={{ width: `${pct}%` }}
              />
            </div>

            <ul className="mt-6 space-y-2.5">
              {MODULE_KEYS.map((key, idx) => {
                const done = idx < loaded;
                const active = idx === loaded;
                return (
                  <li key={key} className="flex items-center gap-3 text-sm">
                    <span className="grid size-5 shrink-0 place-items-center">
                      {done ? (
                        <svg
                          viewBox="0 0 20 20"
                          className="size-5 text-green"
                          fill="none"
                          aria-hidden
                        >
                          <circle cx="10" cy="10" r="9" fill="currentColor" />
                          <path
                            d="m6 10.5 2.5 2.5 5.5-6"
                            stroke="white"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : active ? (
                        <svg
                          viewBox="0 0 20 20"
                          className="size-4 animate-spin text-navy dark:text-ice"
                          fill="none"
                          aria-hidden
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="8"
                            stroke="currentColor"
                            strokeOpacity="0.25"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M10 2a8 8 0 0 1 8 8"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <span className="size-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "transition-colors",
                        done || active
                          ? "text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {t(key)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-center text-xs font-medium tracking-wide text-muted-foreground">
              {t("splash.loading")} · {pct}%
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {/* Theme */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("splash.chooseTheme")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {THEMES.map((th) => {
                  const active = activeTheme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setTheme(th.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-3 transition",
                        active
                          ? "border-navy ring-2 ring-navy/30 dark:border-ice dark:ring-ice/30"
                          : "border-border hover:border-navy/40",
                      )}
                    >
                      <span
                        className="size-6 rounded-full ring-1 ring-foreground/15"
                        style={{ background: th.swatch }}
                        aria-hidden
                      />
                      <span className="text-xs font-medium">
                        {t(`splash.themes.${th.labelKey}`)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("splash.chooseLanguage")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {routing.locales.map((l) => {
                  const active = pendingLocale === l;
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setPendingLocale(l)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "bg-navy text-white dark:bg-ice dark:text-navy"
                          : "bg-secondary text-muted-foreground hover:bg-accent",
                      )}
                    >
                      {localeMeta[l].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={enter}
              autoFocus
              className="w-full rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-ice dark:text-navy"
            >
              {t("splash.enter")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
