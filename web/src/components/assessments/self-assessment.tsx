"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ORDER,
  COLOURS,
  QUESTION_IDS,
  type ColourKey,
  type Topics,
  emptyTopics,
  sumWeights,
  roundPercents,
  weightedTopicIds,
  computeComposition,
  tierLabel,
  pickNarrative,
  isBlendTitle,
} from "@/lib/assessments/self-assessment";
import { useShuffledOrder } from "@/lib/assessments/use-shuffled-order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const CARD = "rounded-2xl border border-border bg-card shadow-sm";

export function SelfAssessment() {
  const t = useTranslations("self");
  const [topics, setTopics] = useState<Topics>(emptyTopics);
  const order = useShuffledOrder(QUESTION_IDS, ORDER);
  const [name, setName] = useState("");
  const [revealed, setRevealed] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const total = QUESTION_IDS.length;
  const rated = weightedTopicIds(topics).length;
  const progressPct = (rated / total) * 100;

  const comp = useMemo(() => computeComposition(topics), [topics]);

  function setWeight(qid: string, colour: ColourKey, value: number) {
    setTopics((prev) => ({ ...prev, [qid]: { ...prev[qid], [colour]: value } }));
  }

  function reveal() {
    if (rated === 0) return;
    setRevealed(true);
    requestAnimationFrame(() =>
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function reset() {
    setTopics(emptyTopics());
    setName("");
    setRevealed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const colourName = (c: ColourKey) => t(`colours.${c}.name`);
  const archetype = (c: ColourKey) => t(`colours.${c}.archetype`);

  return (
    <div className="mx-auto w-full max-w-4xl px-5">
      {/* Notice */}
      <div
        className={cn(
          "my-6 flex items-start gap-3 rounded-xl border border-border border-s-4 border-s-navy bg-card px-4 py-3.5 text-sm shadow-sm print:hidden",
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
            htmlFor="personName"
            className="mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            {t("nameLabel")}
          </Label>
          <Input
            id="personName"
            autoComplete="off"
            placeholder={t("namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <p className="flex-1 basis-72 text-sm text-muted-foreground">
          {t("nameHint")}
        </p>
      </div>

      <SectionTitle title={t("rateTitle")} sub={t("rateSub")} />

      {/* Questions */}
      <div className="print:hidden">
        {QUESTION_IDS.map((qid, idx) => {
          const weights = topics[qid];
          const s = sumWeights(weights);
          const fr = s > 0 ? roundPercents({
            red: weights.red / s,
            yellow: weights.yellow / s,
            green: weights.green / s,
            blue: weights.blue / s,
          }) : null;

          return (
            <section key={qid} className={cn(CARD, "relative mb-3.5 px-5 py-5")}>
              <div className="absolute end-4 top-4 grid size-6 place-items-center rounded-full bg-secondary text-[11px] font-extrabold text-navy dark:text-ice">
                {idx + 1}
              </div>
              <h3 className="text-base font-bold text-navy dark:text-ice">
                {t(`questions.${qid}.aspect`)}
              </h3>
              <p className="mb-3 mt-0.5 text-sm text-muted-foreground">
                {t(`questions.${qid}.prompt`)}
              </p>

              {order[qid].map((c) => {
                const text = t(`questions.${qid}.options.${c}`);
                return (
                  <div key={c} className="mb-3.5">
                    <div className="text-sm">{text}</div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={weights[c]}
                        aria-label={text}
                        onChange={(e) =>
                          setWeight(qid, c, Number(e.target.value) || 0)
                        }
                        className="h-[22px] w-full cursor-pointer accent-navy"
                      />
                      <span className="w-8 text-end text-[13.5px] font-bold tabular-nums text-muted-foreground">
                        {weights[c]}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Blend bar — proportions only, colours stay hidden */}
              {fr ? (
                <div className="flex h-4 overflow-hidden rounded-full border border-border bg-secondary">
                  {order[qid].map((c) =>
                    fr[c] > 0 ? (
                      <span
                        key={c}
                        style={{ width: `${fr[c]}%` }}
                        className="flex items-center justify-center border-e-2 border-card text-[10px] font-bold text-white last:border-e-0"
                      >
                        {fr[c] >= 14 ? `${fr[c]}%` : ""}
                      </span>
                    ) : null,
                  )}
                </div>
              ) : (
                <div className="flex h-4 items-center justify-center rounded-full border border-border bg-secondary">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {t("notRated")}
                  </span>
                </div>
              )}
              <div className="mt-1.5 text-[11px] text-muted-foreground">
                {t("splitCap")}
              </div>
            </section>
          );
        })}
      </div>

      {/* Controls */}
      <div className="my-6 flex flex-wrap items-center gap-5 print:hidden">
        <div className="flex-1 basis-64">
          <Progress value={progressPct} />
          <p className="mt-2 text-sm text-muted-foreground">
            {t("progress", { n: rated, total })}
          </p>
        </div>
        <Button size="lg" disabled={rated === 0} onClick={reveal}>
          {t("reveal")}
        </Button>
      </div>

      {revealed && comp && (
        <ResultsView
          ref={resultsRef}
          t={t}
          comp={comp}
          name={name.trim()}
          colourName={colourName}
          archetype={archetype}
          onReset={reset}
        />
      )}
    </div>
  );
}

type TFn = ReturnType<typeof useTranslations>;

function ResultsView({
  ref,
  t,
  comp,
  name,
  colourName,
  archetype,
  onReset,
}: {
  ref: React.Ref<HTMLElement>;
  t: TFn;
  comp: NonNullable<ReturnType<typeof computeComposition>>;
  name: string;
  colourName: (c: ColourKey) => string;
  archetype: (c: ColourKey) => string;
  onReset: () => void;
}) {
  const { pct, sorted, primary, secondary } = comp;
  const who = name || t("results.you");
  const p = pct[primary];
  const s = pct[secondary];

  const narrKey = pickNarrative(p, s);
  const narr =
    narrKey === "strong"
      ? t("results.narrStrong", {
          who,
          primary: colourName(primary),
          p,
          archetype: archetype(primary),
        })
      : narrKey === "even"
        ? t("results.narrEven", {
            who,
            primary: colourName(primary),
            secondary: colourName(secondary),
            p,
            s,
          })
        : t("results.narrSecondary", {
            who,
            primary: colourName(primary),
            secondary: colourName(secondary),
            p,
            s,
          });

  const profileTitle = isBlendTitle(p, s)
    ? t("results.profileTitleBlend", {
        primary: colourName(primary),
        secondary: colourName(secondary),
      })
    : t("results.profileTitleLed", { primary: colourName(primary) });

  const primaryHex = COLOURS[primary].hex;
  const onLight = COLOURS[primary].onLight;

  const self = t.raw(`self.${primary}`) as {
    strengths: string[];
    shadow: string[];
    blindSpots: string[];
    question: string;
  };
  const emotion = t.raw(`emotion.${primary}`) as {
    triggers: string[];
    warning: string[];
    recovery: string[];
    practice: string;
  };
  const others = ORDER.filter((c) => c !== primary);

  return (
    <section ref={ref} aria-live="polite" className="mb-16 mt-2 scroll-mt-5">
      <header className="mb-5">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          {name ? t("results.titleNamed", { name }) : t("results.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("results.sub", { colour: colourName(primary), pct: p })}
        </p>
      </header>

      {/* Composition */}
      <div className={cn(CARD, "mb-5.5 px-6 py-5")}>
        <h4 className="mb-3.5 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {t("results.compTitle")}
        </h4>
        <div className="mb-4 flex h-[34px] overflow-hidden rounded-[10px] border border-border">
          {ORDER.map((c) =>
            pct[c] > 0 ? (
              <span
                key={c}
                style={{
                  width: `${pct[c]}%`,
                  background: COLOURS[c].hex,
                  color: COLOURS[c].onLight ? "#1e2761" : "#fff",
                }}
                className="flex min-w-0 items-center justify-center text-[13px] font-extrabold"
              >
                {pct[c] >= 10 ? `${colourName(c)} ${pct[c]}%` : ""}
              </span>
            ) : null,
          )}
        </div>
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {ORDER.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5">
              <i
                className="size-2.5 rounded-full"
                style={{ background: COLOURS[c].hex }}
              />
              {colourName(c)} · {archetype(c)}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-2.5">
          {sorted.map((c) => (
            <div key={c} className="flex items-center gap-3">
              <span className="flex w-[74px] items-center gap-2 font-bold">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: COLOURS[c].hex }}
                />
                {colourName(c)}
              </span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <i
                  className="block h-full rounded-full"
                  style={{ width: `${pct[c]}%`, background: COLOURS[c].hex }}
                />
              </span>
              <span className="w-9 text-end font-bold tabular-nums">
                {pct[c]}%
              </span>
              <span className="w-[78px] text-end text-[11.5px] text-muted-foreground">
                {t(`results.tiers.${tierLabel(pct[c])}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile card */}
      <div
        className="mb-5.5 rounded-2xl p-7 shadow-md"
        style={{ background: primaryHex, color: onLight ? "#1e2761" : "#fff" }}
      >
        <p className="mb-1.5 text-xs font-extrabold tracking-[2px] opacity-85">
          {t("results.profileTag", { archetype: archetype(primary).toUpperCase() })}
        </p>
        <h3 className="mb-1.5 text-xl font-bold">{profileTitle}</h3>
        <p className="opacity-95">{narr}</p>
      </div>

      {/* Self-Awareness */}
      <SectionTitle title={t("results.saTitle")} sub={t("results.saSub")} />
      <div className="grid gap-4 md:grid-cols-3">
        <InsightBlock accent={primaryHex} title={t("results.saStrengths")} items={self.strengths} />
        <InsightBlock accent={primaryHex} title={t("results.saShadow")} items={self.shadow} />
        <InsightBlock
          accent={primaryHex}
          title={t("results.saBlind")}
          items={self.blindSpots}
          quote={self.question}
        />
      </div>

      {/* Emotional Control */}
      <SectionTitle title={t("results.ecTitle")} sub={t("results.ecSub")} />
      <div className="grid gap-4 md:grid-cols-3">
        <InsightBlock accent={primaryHex} title={t("results.ecTriggers")} items={emotion.triggers} />
        <InsightBlock accent={primaryHex} title={t("results.ecWarning")} items={emotion.warning} />
        <InsightBlock
          accent={primaryHex}
          title={t("results.ecRecovery")}
          items={emotion.recovery}
          quote={emotion.practice}
        />
      </div>

      {/* Influencing Other Colours */}
      <SectionTitle title={t("results.infTitle")} sub={t("results.infSub")} />
      <div className="grid gap-4 md:grid-cols-3">
        {others.map((oc) => {
          const d = t.raw(`influence.${primary}.${oc}`) as {
            challenge: string;
            adapt: string;
            phrase: string;
          };
          return (
            <div key={oc} className={cn(CARD, "p-5")}>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: COLOURS[oc].hex }}
                />
                {t("results.colourTag", {
                  name: colourName(oc),
                  archetype: archetype(oc),
                })}
              </div>
              <h5 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t("results.infChallenge")}
              </h5>
              <p className="mb-2 mt-1 text-sm">{d.challenge}</p>
              <h5 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {t("results.infAdapt")}
              </h5>
              <p className="mt-1 text-sm">{d.adapt}</p>
              <div
                className="mt-3 rounded-lg border border-s-4 bg-secondary px-3 py-2 text-sm italic"
                style={{ borderInlineStartColor: primaryHex }}
              >
                {d.phrase}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3.5 print:hidden">
        <Button size="lg" onClick={onReset}>
          {t("results.retake")}
        </Button>
        <Button size="lg" variant="outline" onClick={() => window.print()}>
          {t("results.print")}
        </Button>
      </div>
    </section>
  );
}

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-4 mt-8">
      <h2 className="font-serif text-xl font-bold">{title}</h2>
      <span className="text-sm text-muted-foreground">{sub}</span>
    </div>
  );
}

function InsightBlock({
  accent,
  title,
  items,
  quote,
}: {
  accent: string;
  title: string;
  items: string[];
  quote?: string;
}) {
  return (
    <div className={cn(CARD, "p-5")}>
      <h4 className="mb-2.5 flex items-center gap-2 text-sm font-bold">
        <span className="size-2.5 rounded-full" style={{ background: accent }} />
        {title}
      </h4>
      <ul className="list-disc space-y-1.5 ps-5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {quote ? (
        <div
          className="mt-3 rounded-lg border border-s-4 bg-secondary px-3 py-2 text-sm italic"
          style={{ borderInlineStartColor: accent }}
        >
          {quote}
        </div>
      ) : null}
    </div>
  );
}
