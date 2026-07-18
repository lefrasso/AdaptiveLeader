"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon, XIcon } from "lucide-react";
import type { QuizCheck } from "@/lib/chapters";
import { usePreferences } from "@/lib/prefs/store";
import { setProgress } from "@/lib/progress/store";
import { recordQuizAttempt, recordHabitDay } from "@/lib/progress/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Scenario-retrieval quiz for a chapter. Records the attempt via the progress
 *  store (persisted only with consent) and gives growth-oriented feedback. */
export function ChapterQuiz({
  chapter,
  checks,
}: {
  chapter: number;
  checks: QuizCheck[];
}) {
  const t = useTranslations("growth");
  const prefs = usePreferences();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const total = checks.length;
  const current = checks[index];
  if (total === 0) return null;

  function check() {
    if (selected === null) return;
    setRevealed(true);
    if (selected === current.correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
      setRevealed(false);
      return;
    }
    setDone(true);
    setProgress((p) =>
      recordHabitDay(recordQuizAttempt(p, chapter, score, total)),
    );
  }

  function retry() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <div>
        <p className="text-lg font-semibold text-navy dark:text-ice">
          {t("result", { score, total })}
        </p>
        {prefs.consent !== "all" && (
          <p className="mt-2 text-xs text-muted-foreground">
            {t("enableSaving")}
          </p>
        )}
        <Button variant="outline" size="sm" className="mt-4" onClick={retry}>
          {t("retry")}
        </Button>
      </div>
    );
  }

  const isCorrect = revealed && selected === current.correct;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("question", { n: index + 1, total })}
      </p>
      <p className="mt-2 font-medium text-foreground">{current.q}</p>

      <ul className="mt-4 space-y-2">
        {current.options.map((opt, i) => {
          const chosen = selected === i;
          const correct = revealed && i === current.correct;
          const wrongChosen = revealed && chosen && i !== current.correct;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={revealed}
                onClick={() => setSelected(i)}
                aria-pressed={chosen}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-start text-sm transition-colors",
                  !revealed && chosen && "border-navy bg-accent",
                  !revealed && !chosen && "border-border hover:border-navy/40",
                  correct && "border-green bg-green/10",
                  wrongChosen && "border-red bg-red/10",
                  revealed &&
                    !correct &&
                    !wrongChosen &&
                    "border-border opacity-70",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border text-xs font-bold",
                    correct
                      ? "border-green text-green"
                      : wrongChosen
                        ? "border-red text-red"
                        : "border-muted-foreground/40 text-muted-foreground",
                  )}
                  aria-hidden
                >
                  {correct ? (
                    <CheckIcon className="size-3.5" />
                  ) : wrongChosen ? (
                    <XIcon className="size-3.5" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {revealed && (
        <p
          className={cn(
            "mt-3 rounded-lg px-3 py-2 text-sm text-foreground",
            isCorrect ? "bg-green/10" : "bg-secondary",
          )}
        >
          {isCorrect
            ? t("correct", { reason: current.why })
            : t("incorrect", { reason: current.why })}
        </p>
      )}

      <div className="mt-4">
        {!revealed ? (
          <Button size="sm" disabled={selected === null} onClick={check}>
            {t("checkAnswer")}
          </Button>
        ) : (
          <Button size="sm" onClick={next}>
            {t("next")}
          </Button>
        )}
      </div>
    </div>
  );
}
