"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  COUNTRIES,
  COLOURS,
  COLOUR_ORDER,
  SCALES,
  analyse,
  type ColourKey,
} from "@/lib/cultural";
import { cn } from "@/lib/utils";

const CARD = "rounded-2xl border border-border bg-card shadow-sm";

export function CulturalTips() {
  const t = useTranslations("cultural");
  const [countryId, setCountryId] = useState("us");
  const [colour, setColour] = useState<ColourKey>("red");

  const analysis = analyse(countryId, colour);
  if (!analysis) return null;
  const { country, colour: col, strengths, adapt } = analysis;

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

      {/* 1 · Country */}
      <section className="mb-6">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
          {t("selectCountry")}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {COUNTRIES.map((c) => {
            const active = c.id === countryId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCountryId(c.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 text-start text-sm transition-colors",
                  active
                    ? "border-navy bg-navy text-white dark:border-ice dark:bg-ice dark:text-navy"
                    : "border-border bg-card hover:bg-accent",
                )}
              >
                <span className="text-lg" aria-hidden>
                  {c.flag}
                </span>
                <span className="font-medium leading-tight">{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2 · Colour */}
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
          {t("selectColour")}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {COLOUR_ORDER.map((k) => {
            const c = COLOURS[k];
            const active = k === colour;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setColour(k)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl border-2 bg-card px-3 py-2.5 text-start transition",
                  !active && "border-transparent hover:bg-accent",
                )}
                style={{ borderColor: active ? c.hex : undefined }}
              >
                <span
                  className="size-5 shrink-0 rounded-full ring-1 ring-foreground/15"
                  style={{ background: c.hex }}
                  aria-hidden
                />
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {c.archetype}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="space-y-5">
        {/* Cultural snapshot */}
        <section className={cn(CARD, "p-6")}>
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              {country.flag}
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-navy dark:text-ice">
                {country.name}
              </h3>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {t("snapshotTitle")} · {country.region}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground/90">{country.summary}</p>
          <div className="mt-5 space-y-3">
            {SCALES.map((s) => (
              <div key={s.key}>
                <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                  <span>{s.low}</span>
                  <span>{s.high}</span>
                </div>
                <div className="relative mt-1 h-1.5 rounded-full bg-secondary">
                  <span
                    className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy ring-2 ring-card dark:bg-ice"
                    style={{ left: `${country.scales[s.key]}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Colour: normal vs under stress */}
        <section className={cn(CARD, "p-6")}>
          <div className="flex items-center gap-2.5">
            <span
              className="size-4 rounded-full"
              style={{ background: col.hex }}
              aria-hidden
            />
            <h3 className="font-serif text-xl font-bold text-navy dark:text-ice">
              {t("profileHeading", { name: col.name, archetype: col.archetype })}
            </h3>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-secondary/60 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wide text-green">
                {t("normalTitle")}
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                {col.normal.map((x, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" aria-hidden />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-secondary/60 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wide text-red">
                {t("stressTitle")}
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-foreground/90">
                {col.stress.map((x, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red" aria-hidden />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Considerations + country-specific fit/adapt */}
        <section className={cn(CARD, "p-6")}>
          <h3 className="text-xs font-bold uppercase tracking-[2px] text-muted-foreground">
            {t("considerTitle")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            {col.considerations.map((x, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-navy dark:bg-ice" aria-hidden />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-bold text-green">✓ {t("fitsTitle")}</h4>
              <ul className="mt-2 space-y-2 text-sm text-foreground/90">
                {strengths.length ? (
                  strengths.map((tp, i) => (
                    <li key={i}>
                      <span className="font-semibold text-foreground/80">
                        {tp.scaleName}:
                      </span>{" "}
                      {tp.text}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">{t("noTips")}</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-red">▲ {t("adaptTitle")}</h4>
              <ul className="mt-2 space-y-2 text-sm text-foreground/90">
                {adapt.length ? (
                  adapt.map((tp, i) => (
                    <li key={i}>
                      <span className="font-semibold text-foreground/80">
                        {tp.scaleName}:
                      </span>{" "}
                      {tp.text}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">{t("noTips")}</li>
                )}
              </ul>
            </div>
          </div>
        </section>

        <p className="px-1 text-xs text-muted-foreground">{t("disclaimer")}</p>
      </div>
    </div>
  );
}
