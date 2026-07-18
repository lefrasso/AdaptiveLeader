"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  PART_ORDER,
  TOPICS,
  SCALE_VALUES,
  type Answers,
  type Results,
  computeResults,
  bandFor,
  scoreColor,
  pctColor,
  valueToPct,
  getPriorities,
  getStrengths,
} from "@/lib/assessments/leadership";
import { trajectoryOf } from "@/lib/assessments/trajectory";
import { Link } from "@/i18n/navigation";
import { useProgress, setProgress } from "@/lib/progress/store";
import { recordLeadership } from "@/lib/progress/progress";
import { ScoreRing } from "@/components/assessments/score-ring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const CARD = "rounded-2xl border border-border bg-card shadow-sm";

export function LeadershipAssessment() {
  const t = useTranslations("leadership");
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const total = TOPICS.length;
  const done = Object.keys(answers).length;
  const progressPct = Math.round((done / total) * 100);
  const complete = done >= total;

  function setAnswer(n: number, v: number) {
    setAnswers((prev) => ({ ...prev, [n]: v }));
  }

  function reveal() {
    if (!complete) return;
    const r = computeResults(answers);
    const firstReveal = results === null;
    setResults(r);
    if (firstReveal) {
      setProgress((p) =>
        recordLeadership(p, {
          at: Date.now(),
          pct: r.pct,
          band: bandFor(r.pct).id,
          partAvg: r.partAvg,
        }),
      );
    }
    requestAnimationFrame(() =>
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function reset() {
    setAnswers({});
    setResults(null);
    setName("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5">
      {/* Notice */}
      <div
        className={cn(
          "my-6 flex items-start gap-3 rounded-xl border border-border border-s-4 border-s-navy bg-card px-4 py-3.5 text-sm shadow-sm",
          "print:hidden",
        )}
      >
        <p>
          {t.rich("notice", {
            b: (chunks) => (
              <strong className="text-navy dark:text-ice">{chunks}</strong>
            ),
          })}
        </p>
      </div>

      {/* Name box */}
      <div
        className={cn(
          CARD,
          "flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 px-6 py-5 print:hidden",
        )}
      >
        <div className="flex-1 basis-80">
          <Label
            htmlFor="userName"
            className="mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            {t("nameLabel")}
          </Label>
          <Input
            id="userName"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className="flex-1 basis-72 text-sm text-muted-foreground">
          {t("nameHint")}
        </p>
      </div>

      {/* Assessment form */}
      <div className="print:hidden">
        {PART_ORDER.map((pk) => {
          const items = TOPICS.filter((topic) => topic.part === pk);
          return (
            <section key={pk} className="mt-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-1.5 text-xs font-bold tracking-wide text-white">
                  {t("partPill", { part: pk, title: t(`parts.${pk}.title`) })}
                </span>
                <span className="text-sm text-muted-foreground">
                  {t(`parts.${pk}.focus`)}
                </span>
              </div>

              {items.map((topic) => (
                <div key={topic.n} className={cn(CARD, "mb-3.5 px-5 pb-4 pt-4.5")}>
                  <div className="flex items-start gap-3">
                    <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-secondary text-[13px] font-extrabold text-navy dark:text-ice">
                      {topic.n}
                    </span>
                    <div>
                      <p className="mt-0.5 text-base font-bold text-navy dark:text-ice">
                        {t(`topics.${topic.n}.title`)}
                      </p>
                      <p className="mb-3.5 mt-0.5 text-sm">
                        {t(`topics.${topic.n}.stmt`)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-5 gap-2"
                    role="group"
                    aria-label={t(`topics.${topic.n}.title`)}
                  >
                    {SCALE_VALUES.map((v) => {
                      const selected = answers[topic.n] === v;
                      return (
                        <button
                          key={v}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setAnswer(topic.n, v)}
                          className={cn(
                            "rounded-[10px] border-[1.5px] px-1 py-2.5 text-center text-xs font-bold leading-tight transition-colors",
                            selected
                              ? "border-navy bg-navy text-white shadow-sm"
                              : "border-border bg-secondary text-muted-foreground hover:border-navy",
                          )}
                        >
                          <b
                            className={cn(
                              "block text-[15px]",
                              selected ? "text-white" : "text-foreground",
                            )}
                          >
                            {v}
                          </b>
                          <span className="max-[560px]:hidden">
                            {t(`scale.${v}`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>

      {/* Controls */}
      <div className="my-8 flex flex-wrap items-center gap-5 print:hidden">
        <div className="flex-1 basis-64">
          <Progress value={progressPct} />
          <p className="mt-2 text-sm text-muted-foreground">
            {t("progress", { done, total })}
          </p>
        </div>
        <Button size="lg" disabled={!complete} onClick={reveal}>
          {t("reveal")}
        </Button>
      </div>

      {results && (
        <Results
          ref={resultsRef}
          t={t}
          results={results}
          name={name.trim()}
          onReset={reset}
        />
      )}
    </div>
  );
}

function Results({
  ref,
  t,
  results,
  name,
  onReset,
}: {
  ref: React.Ref<HTMLElement>;
  t: ReturnType<typeof useTranslations>;
  results: Results;
  name: string;
  onReset: () => void;
}) {
  const band = bandFor(results.pct);
  const priorities = getPriorities(results.vals);
  const strengths = getStrengths(results.vals);
  const progress = useProgress();
  const traj = trajectoryOf(progress.assessments.leadership);

  return (
    <section ref={ref} aria-live="polite" className="mb-16 mt-2 scroll-mt-5">
      <header className="mb-5">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {name
            ? t("resultTitleNamed", { name })
            : t("resultTitle")}
        </h2>
        <p className="text-muted-foreground">{t("resultSub")}</p>
      </header>

      {/* Score hero */}
      <div className={cn(CARD, "mb-5 flex flex-wrap items-center gap-6 p-6")}>
        <ScoreRing
          pct={results.pct}
          color={pctColor(results.pct)}
          primary={`${results.pct}%`}
          secondary={t("scoreAvg", { avg: results.avg.toFixed(1) })}
        />
        <div className="flex-1 basis-80">
          <span
            className="mb-2.5 inline-block rounded-full px-3 py-1 text-[13px] font-extrabold tracking-wide text-white"
            style={{ background: band.color }}
          >
            {t(`bands.${band.id}.name`)}
          </span>
          <h3 className="mb-1.5 text-xl font-bold">
            {t("bandHeading", { band: t(`bands.${band.id}.name`) })}
          </h3>
          <p className="text-[15px] text-muted-foreground">
            {t(`bands.${band.id}.text`)}
          </p>
          <p
            className={cn(
              "mt-2.5 text-sm font-semibold",
              traj.trend === "up"
                ? "text-green"
                : traj.trend === "down"
                  ? "text-red"
                  : "text-navy dark:text-ice",
            )}
          >
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {t("trajLabel")}:
            </span>{" "}
            {traj.trend === "up"
              ? t("trajUp", { delta: Math.abs(traj.delta) })
              : traj.trend === "down"
                ? t("trajDown", { delta: Math.abs(traj.delta) })
                : traj.trend === "steady"
                  ? t("trajSteady")
                  : t("trajFirst")}
          </p>
        </div>
      </div>

      {/* Breakdown by theme */}
      <Block title={t("breakdownTitle")} sub={t("breakdownSub")}>
        {PART_ORDER.map((pk) => {
          const a = results.partAvg[pk];
          return (
            <div
              key={pk}
              className="mb-3 grid grid-cols-[minmax(0,1fr)_52px] items-center gap-3.5 sm:grid-cols-[200px_1fr_52px]"
            >
              <div className="text-sm font-bold">
                {t("partPill", { part: pk, title: t(`parts.${pk}.title`) })}
                <small className="block text-[11.5px] font-medium text-muted-foreground">
                  {t(`parts.${pk}.focus`)}
                </small>
              </div>
              <div className="order-3 col-span-full h-3.5 overflow-hidden rounded-full border border-border bg-secondary sm:order-none sm:col-span-1">
                <i
                  className="block h-full rounded-full"
                  style={{ width: `${valueToPct(a)}%`, background: scoreColor(a) }}
                />
              </div>
              <div
                className="text-end text-sm font-extrabold tabular-nums"
                style={{ color: scoreColor(a) }}
              >
                {a.toFixed(1)}
              </div>
            </div>
          );
        })}
      </Block>

      {/* Priority actions */}
      <Block title={t("priorityTitle")} sub={t("prioritySub")}>
        {priorities.map((x, i) => {
          const col = scoreColor(x.v);
          return (
            <div
              key={x.topic.n}
              className="mb-3.5 rounded-xl border border-border border-s-4 bg-secondary px-4.5 py-4"
              style={{ borderInlineStartColor: col }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-navy text-xs font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-[15.5px] font-extrabold text-navy dark:text-ice">
                  {t(`topics.${x.topic.n}.title`)}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: col }}
                >
                  {t("rated", { v: x.v })}
                </span>
                <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  {t("chip", { part: x.topic.part, n: x.topic.n })}
                </span>
              </div>
              <p className="text-sm">
                <span className="font-bold text-navy dark:text-ice">
                  {t("tryThis")}
                </span>{" "}
                {t(`topics.${x.topic.n}.rec`)}
              </p>
              <Link
                href={`/chapters/${x.topic.n}`}
                className="mt-2 inline-block text-sm font-semibold text-navy hover:underline dark:text-ice"
              >
                {t("learnThis")}
              </Link>
            </div>
          );
        })}
      </Block>

      {/* Strengths */}
      <Block title={t("strengthsTitle")} sub={t("strengthsSub")}>
        {strengths.length === 0 ? (
          <div className="flex items-start gap-3 py-3">
            <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-muted-foreground" />
            <div>
              <div className="text-sm font-bold">{t("noStrengthTitle")}</div>
              <div className="text-[13px] text-muted-foreground">
                {t("noStrengthDesc")}
              </div>
            </div>
          </div>
        ) : (
          strengths.map((x) => (
            <div
              key={x.topic.n}
              className="flex items-start gap-3 border-b border-border py-3 last:border-b-0"
            >
              <span
                className="mt-1.5 size-2.5 shrink-0 rounded-full"
                style={{ background: scoreColor(x.v) }}
              />
              <div>
                <div className="text-sm font-bold">
                  {t(`topics.${x.topic.n}.title`)} · {x.v}/5
                </div>
                <div className="text-[13px] text-muted-foreground">
                  {t("strengthDesc", {
                    part: x.topic.part,
                    title: t(`parts.${x.topic.part}.title`),
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </Block>

      {/* All scores */}
      <Block title={t("allTitle")} sub={t("allSub")}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-6 gap-y-2.5">
          {results.vals.map((x) => (
            <div
              key={x.topic.n}
              className="grid grid-cols-[1fr_90px_26px] items-center gap-2.5"
              title={t(`topics.${x.topic.n}.title`)}
            >
              <div className="truncate text-[13px]">
                {x.topic.n}. {t(`topics.${x.topic.n}.title`)}
              </div>
              <div className="h-2.5 overflow-hidden rounded-full border border-border bg-secondary">
                <i
                  className="block h-full rounded-full"
                  style={{ width: `${valueToPct(x.v)}%`, background: scoreColor(x.v) }}
                />
              </div>
              <div className="text-end text-[12.5px] font-bold tabular-nums text-muted-foreground">
                {x.v}/5
              </div>
            </div>
          ))}
        </div>
      </Block>

      <div className="mt-2 flex flex-wrap gap-3.5 print:hidden">
        <Button size="lg" onClick={onReset}>
          {t("retake")}
        </Button>
        <Button size="lg" variant="outline" onClick={() => window.print()}>
          {t("print")}
        </Button>
      </div>
    </section>
  );
}

function Block({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(CARD, "mb-5 px-6 py-5")}>
      <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      <p className="mb-4 mt-1 text-sm text-muted-foreground">{sub}</p>
      {children}
    </div>
  );
}
