"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useProgress } from "@/lib/progress/store";
import { dueReviews } from "@/lib/progress/schedule";
import { trajectoryOf } from "@/lib/assessments/trajectory";
import { cn } from "@/lib/utils";

/** Home-page "Your growth" surface: streak, activity, leadership trajectory, and
 *  spaced reviews due. Renders nothing until there is progress to show (so it is
 *  invisible on the server and for first-time visitors — no hydration flash). */
export function GrowthDashboard() {
  const t = useTranslations("dashboard");
  const progress = useProgress();

  const chapters = Object.values(progress.chapters);
  const chaptersExplored = chapters.length;
  const quizAttempts = chapters.reduce((s, c) => s + (c.quiz?.attempts ?? 0), 0);
  const reflections = chapters.reduce((s, c) => s + c.reflections.length, 0);
  const streak = progress.habits.streak;
  const leadership = progress.assessments.leadership;
  const traj = leadership.length > 0 ? trajectoryOf(leadership) : null;
  const due = dueReviews(progress);

  const hasProgress =
    chaptersExplored > 0 || streak > 0 || leadership.length > 0;
  if (!hasProgress) return null;

  return (
    <section className="mt-14">
      <h2 className="font-serif text-2xl font-bold text-navy dark:text-ice">
        {t("title")}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Tile
          value={streak}
          label={t("streakLabel")}
          sub={
            progress.habits.longest > 0
              ? t("streakBest", { days: progress.habits.longest })
              : undefined
          }
        />
        <Tile value={chaptersExplored} label={t("chapters")} />
        <Tile value={quizAttempts} label={t("quizzes")} />
        <Tile value={reflections} label={t("reflections")} />
      </div>

      {traj && (
        <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {t("readiness")}
            </p>
            <p className="mt-1 font-serif text-3xl font-bold text-navy dark:text-ice">
              {traj.latestPct}%
            </p>
          </div>
          {traj.trend !== "first" && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-sm font-bold",
                traj.trend === "up"
                  ? "bg-green/10 text-green"
                  : traj.trend === "down"
                    ? "bg-red/10 text-red"
                    : "bg-secondary text-muted-foreground",
              )}
            >
              {traj.trend === "up"
                ? t("trajUp", { delta: Math.abs(traj.delta) })
                : traj.trend === "down"
                  ? t("trajDown", { delta: Math.abs(traj.delta) })
                  : t("trajSteady")}
            </span>
          )}
        </div>
      )}

      {due.length > 0 && (
        <div className="mt-4 rounded-2xl border border-border p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {t("reviewTitle")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{t("reviewLede")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {due.map((d) => (
              <Link
                key={d.chapter}
                href={`/chapters/${d.chapter}`}
                className="rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-accent dark:text-ice"
              >
                {t("reviewChapter", { n: d.chapter })}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Tile({
  value,
  label,
  sub,
}: {
  value: number;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10">
      <div className="font-serif text-3xl font-bold text-navy dark:text-ice">
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      {sub && (
        <div className="mt-0.5 text-xs text-muted-foreground/80">{sub}</div>
      )}
    </div>
  );
}
