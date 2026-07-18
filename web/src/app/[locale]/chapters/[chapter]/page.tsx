import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppControls } from "@/components/app-controls";
import { ChapterQuiz } from "@/components/learning/chapter-quiz";
import { ChapterPractice } from "@/components/learning/chapter-practice";
import { Reveal } from "@/components/motion/reveal";
import {
  CHAPTER_NUMBERS,
  COLOUR_HEX,
  COLOUR_ORDER,
  getChapter,
  getPart,
} from "@/lib/chapters";

type Props = { params: Promise<{ locale: string; chapter: string }> };

const HERO_STYLE = {
  background: "linear-gradient(135deg, var(--navy), var(--navy-2))",
} as const;

export function generateStaticParams() {
  return CHAPTER_NUMBERS.map((n) => ({ chapter: String(n) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, chapter } = await params;
  const ch = getChapter(locale, Number(chapter));
  if (!ch) return {};
  return { title: `${ch.number}. ${ch.title}`, description: ch.summary };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10">
        <h2 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
          {title}
        </h2>
        <div className="mt-3">{children}</div>
      </section>
    </Reveal>
  );
}

export default async function ChapterDetailPage({ params }: Props) {
  const { locale, chapter } = await params;
  setRequestLocale(locale);

  const n = Number(chapter);
  const ch = getChapter(locale, n);
  if (!ch) notFound();

  const part = getPart(locale, ch.part);
  const t = await getTranslations("chapters");
  const tg = await getTranslations("growth");
  const prev = getChapter(locale, n - 1);
  const next = getChapter(locale, n + 1);

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-[72rem] items-center justify-between gap-4 px-5 py-3 print:hidden">
        <Link
          href="/chapters"
          className="text-sm font-semibold text-navy hover:underline dark:text-ice"
        >
          ← {t("allChapters")}
        </Link>
        <AppControls />
      </div>

      <header
        className="relative overflow-hidden text-white [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
        style={HERO_STYLE}
      >
        <div className="mx-auto w-full max-w-[72rem] px-5 py-10">
          <p className="mb-2.5 text-[13px] font-bold tracking-[2px] text-ice">
            {t("partChip", { part: ch.part, n: ch.number })}
            {part ? ` · ${part.title}` : ""}
          </p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight sm:text-4xl">
            {ch.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ice">{ch.summary}</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[72rem] space-y-5 px-5 py-10">
          <Section title={t("whyItMatters")}>
            <p className="text-foreground/90">{ch.theme}</p>
          </Section>

          <Section title={t("theoryDeepDive")}>
            {ch.theoryHtml ? (
              // Trusted, in-repo authored content — not user input.
              <div
                className="theory text-[15px]"
                dangerouslySetInnerHTML={{ __html: ch.theoryHtml }}
              />
            ) : (
              <p className="text-foreground/90">{ch.theory}</p>
            )}
          </Section>

          {ch.keyModels.length > 0 && (
            <Section title={t("keyModels")}>
              <ul className="space-y-4">
                {ch.keyModels.map((m) => (
                  <li key={m.name}>
                    <p className="font-semibold text-navy dark:text-ice">
                      {m.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {m.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {ch.colourAngle && (
            <Section title={t("colourAngle")}>
              <ul className="space-y-4">
                {COLOUR_ORDER.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span
                      className="mt-1 size-3.5 shrink-0 rounded-full"
                      style={{ background: COLOUR_HEX[c] }}
                      aria-hidden
                    />
                    <p className="text-sm text-foreground/90">
                      <span className="font-semibold">
                        {t(`colours.${c}`)}.
                      </span>{" "}
                      {ch.colourAngle![c]}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {ch.leaderInAction && (
            <Section title={t("leaderInAction")}>
              <p className="text-foreground/90 italic">{ch.leaderInAction}</p>
            </Section>
          )}

          <Section title={t("putIntoPractice")}>
            <ChapterPractice
              chapter={ch.number}
              practice={ch.practice}
              rubric={ch.practiceRubric}
              exemplar={ch.practiceExemplar}
            />
          </Section>

          {ch.watchOut.length > 0 && (
            <Section title={t("watchOut")}>
              <ul className="space-y-2">
                {ch.watchOut.map((w, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red" aria-hidden />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {ch.takeaways.length > 0 && (
            <Section title={t("chapterTakeaways")}>
              <ul className="space-y-2">
                {ch.takeaways.map((take, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                    <span>{take}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {ch.checks && ch.checks.length > 0 && (
            <Section title={tg("quizTitle")}>
              <p className="mb-4 text-sm text-muted-foreground">
                {tg("quizIntro")}
              </p>
              <ChapterQuiz chapter={ch.number} checks={ch.checks} />
            </Section>
          )}

          <nav className="flex items-stretch justify-between gap-4 pt-2">
            {prev ? (
              <Link
                href={`/chapters/${prev.number}`}
                className="group flex max-w-[48%] flex-col rounded-2xl bg-card p-4 text-start shadow-sm ring-1 ring-foreground/5 transition hover:ring-navy/20 dark:ring-foreground/10"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  ← {t("previous")}
                </span>
                <span className="mt-1 line-clamp-2 text-sm font-semibold text-navy group-hover:underline dark:text-ice">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/chapters/${next.number}`}
                className="group flex max-w-[48%] flex-col rounded-2xl bg-card p-4 text-end shadow-sm ring-1 ring-foreground/5 transition hover:ring-navy/20 dark:ring-foreground/10"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("next")} →
                </span>
                <span className="mt-1 line-clamp-2 text-sm font-semibold text-navy group-hover:underline dark:text-ice">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="pt-2 text-center print:hidden">
            <Link
              href="/appendices"
              className="text-sm font-semibold text-navy hover:underline dark:text-ice"
            >
              {t("seeAppendices")} →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
