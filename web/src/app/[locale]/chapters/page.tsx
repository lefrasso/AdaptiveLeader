import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppControls } from "@/components/app-controls";
import { ChaptersBrowser, type BrowserPart } from "@/components/chapters-browser";
import { BackToTop } from "@/components/back-to-top";
import { PART_ORDER, getPart, getChaptersByPart, getConclusion } from "@/lib/chapters";

type Props = { params: Promise<{ locale: string }> };

const HERO_STYLE = {
  background: "linear-gradient(135deg, var(--navy), var(--navy-2))",
} as const;

const DOTS = ["#d64550", "#f2b705", "#2e9e5b", "#2e86c1"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "chapters" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function ChaptersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("chapters");
  const tApp = await getTranslations("app");
  const conclusion = getConclusion(locale);

  const parts: BrowserPart[] = PART_ORDER.flatMap((pk) => {
    const part = getPart(locale, pk);
    if (!part) return [];
    return [
      {
        key: pk,
        title: part.title,
        focus: part.focus,
        outcome: part.outcome,
        chapters: getChaptersByPart(locale, pk).map((c) => ({
          number: c.number,
          title: c.title,
          summary: c.summary,
          theme: c.theme,
        })),
      },
    ];
  });

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-[84rem] items-center justify-between gap-4 px-5 py-3 print:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-navy hover:underline dark:text-ice"
        >
          ← {tApp("name")}
        </Link>
        <AppControls />
      </div>

      <header
        className="relative overflow-hidden text-white [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
        style={HERO_STYLE}
      >
        <div className="mx-auto w-full max-w-[84rem] px-5 py-10">
          <p className="mb-2.5 text-[13px] font-bold tracking-[3px] text-ice">
            {t("header.eyebrow")}
          </p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight sm:text-4xl">
            {t("header.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-ice">{t("header.lead")}</p>
          <div className="mt-5 flex gap-2.5" aria-hidden>
            {DOTS.map((c) => (
              <span
                key={c}
                className="size-4 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[84rem] space-y-14 px-5 py-12">
          <ChaptersBrowser parts={parts} />

          <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10">
            <p className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
              {t("coreSynthesis")}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-navy dark:text-ice">
              {conclusion.title}
            </h2>
            <p className="mt-3 text-foreground/90">{conclusion.summary}</p>
            <ul className="mt-4 space-y-2">
              {conclusion.synthesis.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-navy dark:bg-ice"
                    aria-hidden
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border pt-8 text-center">
            <Link
              href="/appendices"
              className="text-sm font-semibold text-navy hover:underline dark:text-ice"
            >
              {t("seeAppendices")} →
            </Link>
          </div>
        </div>
      </main>

      <BackToTop />
    </div>
  );
}
