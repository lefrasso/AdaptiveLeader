"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  analyseTeam,
  COUNTRIES,
  COLOURS,
  COLOUR_ORDER,
  SCALES,
  type ColourKey,
  type InsightKind,
  type Leader,
  type Member,
  type TeamAnalysis,
} from "@/lib/team-builder";
import { cn } from "@/lib/utils";

const CARD = "rounded-2xl border border-border bg-card shadow-sm";

const SEED: Member[] = [
  { id: "seed-1", name: "", colour: "red", countryId: "us" },
  { id: "seed-2", name: "", colour: "green", countryId: "jp" },
  { id: "seed-3", name: "", colour: "blue", countryId: "de" },
];

const SEED_LEADER: Leader = { colour: "yellow", countryId: "us" };

const TAG_STYLES: Record<InsightKind, string> = {
  strength: "bg-green/10 text-green",
  gap: "bg-red/10 text-red",
  watch: "bg-yellow/20 text-foreground",
};

/** Stable key of the current inputs, to detect edits made after generating. */
function inputsKey(members: Member[], leader: Leader): string {
  return JSON.stringify({
    l: [leader.colour, leader.countryId],
    m: members.map((m) => [m.colour, m.countryId]),
  });
}

export function TeamBuilder() {
  const t = useTranslations("team");
  const [leader, setLeader] = useState<Leader>(SEED_LEADER);
  const [members, setMembers] = useState<Member[]>(SEED);
  const [result, setResult] = useState<TeamAnalysis | null>(null);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const nextId = useRef(1);

  const addMember = () => {
    const id = `m-${nextId.current++}`;
    setMembers((m) => [...m, { id, name: "", colour: "yellow", countryId: "us" }]);
  };
  const removeMember = (id: string) =>
    setMembers((m) => m.filter((x) => x.id !== id));
  const update = (id: string, patch: Partial<Member>) =>
    setMembers((m) => m.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const currentKey = useMemo(() => inputsKey(members, leader), [members, leader]);
  const stale = result !== null && generatedKey !== currentKey;

  const generate = () => {
    setResult(analyseTeam(members, leader));
    setGeneratedKey(currentKey);
    if (typeof document !== "undefined") {
      requestAnimationFrame(() => {
        document
          .getElementById("team-plan")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const tagLabel: Record<InsightKind, string> = {
    strength: t("strengthTag"),
    gap: t("gapTag"),
    watch: t("watchTag"),
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5">
      <div className="my-6 flex items-start gap-3 rounded-xl border border-border border-s-4 border-s-navy bg-card px-4 py-3.5 text-sm shadow-sm print:hidden">
        <p>
          {t.rich("notice", {
            b: (chunks) => (
              <b className="font-semibold text-navy dark:text-ice">{chunks}</b>
            ),
          })}
        </p>
      </div>

      {/* 1 · Leader */}
      <section className="mb-6">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
          {t("leaderTitle")}
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">{t("leaderLede")}</p>
        <div
          className={cn(
            CARD,
            "grid grid-cols-1 gap-3 border-s-4 border-s-navy p-4 sm:grid-cols-2",
          )}
        >
          <label className="flex items-center gap-2">
            <span
              className="size-4 shrink-0 rounded-full ring-1 ring-foreground/15"
              style={{ background: COLOURS[leader.colour].hex }}
              aria-hidden
            />
            <span className="sr-only">{t("leaderColour")}</span>
            <select
              value={leader.colour}
              onChange={(e) =>
                setLeader((l) => ({ ...l, colour: e.target.value as ColourKey }))
              }
              className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {COLOUR_ORDER.map((k) => (
                <option key={k} value={k}>
                  {COLOURS[k].name} · {COLOURS[k].archetype}
                </option>
              ))}
            </select>
          </label>
          <select
            value={leader.countryId}
            onChange={(e) => setLeader((l) => ({ ...l, countryId: e.target.value }))}
            aria-label={t("leaderCountry")}
            className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {COUNTRIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 2 · Team editor */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
            {t("membersTitle")}
          </h2>
          <span className="text-xs text-muted-foreground">
            {t("sizeLabel", { n: members.length })}
          </span>
        </div>

        <div className="space-y-2">
          {members.map((m) => (
            <div
              key={m.id}
              className={cn(
                CARD,
                "grid grid-cols-1 gap-2 p-3 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center",
              )}
            >
              <input
                type="text"
                value={m.name}
                onChange={(e) => update(m.id, { name: e.target.value })}
                placeholder={t("memberNamePlaceholder")}
                aria-label={t("memberName")}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
              <label className="flex items-center gap-2">
                <span className="sr-only">{t("memberColour")}</span>
                <span
                  className="size-4 shrink-0 rounded-full ring-1 ring-foreground/15"
                  style={{ background: COLOURS[m.colour].hex }}
                  aria-hidden
                />
                <select
                  value={m.colour}
                  onChange={(e) =>
                    update(m.id, { colour: e.target.value as ColourKey })
                  }
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:w-36"
                >
                  {COLOUR_ORDER.map((k) => (
                    <option key={k} value={k}>
                      {COLOURS[k].name} · {COLOURS[k].archetype}
                    </option>
                  ))}
                </select>
              </label>
              <select
                value={m.countryId}
                onChange={(e) => update(m.id, { countryId: e.target.value })}
                aria-label={t("memberCountry")}
                className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:w-52"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeMember(m.id)}
                disabled={members.length <= 1}
                className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
              >
                {t("remove")}
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMember}
          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-accent dark:text-ice"
        >
          + {t("addMember")}
        </button>
      </section>

      {/* Submit */}
      <section className="mb-8">
        <button
          type="button"
          onClick={generate}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 sm:w-auto dark:bg-ice dark:text-navy"
        >
          {result ? t("regenerate") : t("generate")}
        </button>
        {stale ? (
          <p className="mt-2 text-xs font-medium text-red">{t("stale")}</p>
        ) : null}
      </section>

      {!result ? (
        <p className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          {t("prompt")}
        </p>
      ) : (
        <div id="team-plan" className="scroll-mt-4 space-y-5">
          {/* Leadership fit */}
          {result.leader ? (
            <section className={cn(CARD, "border-s-4 border-s-navy p-6")}>
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                {t("leaderFitTitle")}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <span
                  className="size-4 rounded-full ring-1 ring-foreground/15"
                  style={{ background: COLOURS[result.leader.colour].hex }}
                  aria-hidden
                />
                <span className="font-semibold text-foreground">
                  {COLOURS[result.leader.colour].name} ·{" "}
                  {COLOURS[result.leader.colour].archetype}
                </span>
                {result.leader.country ? (
                  <span className="text-muted-foreground">
                    · {result.leader.country.flag} {result.leader.country.name}
                  </span>
                ) : null}
              </div>

              {result.leader.colourInsights.length ||
              result.leader.cultureInsights.length ? (
                <ul className="mt-4 space-y-4">
                  {[
                    ...result.leader.colourInsights,
                    ...result.leader.cultureInsights,
                  ].map((it, i) => (
                    <li key={i}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                            TAG_STYLES[it.kind],
                          )}
                        >
                          {tagLabel[it.kind]}
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">
                          {it.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-foreground/90">{it.text}</p>
                      {it.ref ? (
                        <span className="mt-1 inline-block text-xs font-medium text-navy dark:text-ice">
                          {it.ref}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  {t("leaderFitEmpty")}
                </p>
              )}
            </section>
          ) : null}

          {/* Playbook: leading each colour */}
          {result.leader && result.leader.playbook.length ? (
            <section className={cn(CARD, "p-6")}>
              <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
                {t("playbookTitle")}
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {result.leader.playbook.map((p) => (
                  <div key={p.colour} className="rounded-xl bg-secondary/60 p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-3.5 rounded-full ring-1 ring-foreground/15"
                        style={{ background: COLOURS[p.colour].hex }}
                        aria-hidden
                      />
                      <h4 className="text-sm font-bold text-foreground">
                        {t("playbookHeading", {
                          count: p.count,
                          colour: COLOURS[p.colour].name,
                        })}
                      </h4>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground/90">{p.tip}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Colour composition */}
          <section className={cn(CARD, "p-6")}>
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
              {t("compositionTitle")}
            </h3>
            <div className="mt-4 flex h-5 w-full overflow-hidden rounded-full ring-1 ring-foreground/10">
              {COLOUR_ORDER.map((k) =>
                result.composition.pct[k] > 0 ? (
                  <span
                    key={k}
                    className="h-full"
                    style={{
                      width: `${result.composition.pct[k]}%`,
                      background: COLOURS[k].hex,
                    }}
                    aria-hidden
                  />
                ) : null,
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COLOUR_ORDER.map((k) => (
                <div key={k} className="flex items-center gap-2">
                  <span
                    className="size-3.5 shrink-0 rounded-full ring-1 ring-foreground/15"
                    style={{ background: COLOURS[k].hex }}
                    aria-hidden
                  />
                  <span className="text-sm">
                    <span className="font-semibold">
                      {result.composition.pct[k]}%
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {COLOURS[k].name} · {result.composition.counts[k]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Cultural spread */}
          <section className={cn(CARD, "p-6")}>
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
              {t("culturalTitle")}
            </h3>
            <div className="mt-4 space-y-3.5">
              {SCALES.map((s) => {
                const sp = result.spread[s.key];
                return (
                  <div key={s.key}>
                    <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                      <span>{s.low}</span>
                      <span className="font-semibold text-foreground/80">
                        {s.name}
                      </span>
                      <span>{s.high}</span>
                    </div>
                    <div className="relative mt-1 h-1.5 rounded-full bg-secondary">
                      <span
                        className="absolute top-0 h-full rounded-full bg-navy/25 dark:bg-ice/25"
                        style={{
                          left: `${sp.min}%`,
                          width: `${Math.max(sp.spread, 1)}%`,
                        }}
                        aria-hidden
                      />
                      <span
                        className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy ring-2 ring-card dark:bg-ice"
                        style={{ left: `${sp.avg}%` }}
                        aria-hidden
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("spreadHint")}</p>
          </section>

          {/* Colour read */}
          <InsightSection
            title={t("colourReadTitle")}
            insights={result.colourInsights}
            tagLabel={tagLabel}
            emptyText={t("colourReadEmpty")}
          />

          {/* Cultural read */}
          <InsightSection
            title={t("culturalReadTitle")}
            insights={result.culturalInsights}
            tagLabel={tagLabel}
            emptyText={t("culturalReadEmpty")}
          />

          {/* Recommendations */}
          <section className={cn(CARD, "p-6")}>
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
              {t("recommendationsTitle")}
            </h3>
            <ol className="mt-4 space-y-4">
              {result.recommendations.map((r, i) => (
                <li key={i} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white dark:bg-ice dark:text-navy">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {r.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-foreground/90">{r.text}</p>
                    {r.ref ? (
                      <span className="mt-1 inline-block text-xs font-medium text-navy dark:text-ice">
                        {r.ref}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <p className="px-1 text-xs text-muted-foreground">{t("disclaimer")}</p>
        </div>
      )}
    </div>
  );
}

function InsightSection({
  title,
  insights,
  tagLabel,
  emptyText,
}: {
  title: string;
  insights: { kind: InsightKind; title: string; text: string; ref?: string }[];
  tagLabel: Record<InsightKind, string>;
  emptyText: string;
}) {
  return (
    <section className={cn(CARD, "p-6")}>
      <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
        {title}
      </h3>
      {insights.length ? (
        <ul className="mt-4 space-y-4">
          {insights.map((it, i) => (
            <li key={i}>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide",
                    TAG_STYLES[it.kind],
                  )}
                >
                  {tagLabel[it.kind]}
                </span>
                <h4 className="text-sm font-semibold text-foreground">
                  {it.title}
                </h4>
              </div>
              <p className="mt-1 text-sm text-foreground/90">{it.text}</p>
              {it.ref ? (
                <span className="mt-1 inline-block text-xs font-medium text-navy dark:text-ice">
                  {it.ref}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">{emptyText}</p>
      )}
    </section>
  );
}
