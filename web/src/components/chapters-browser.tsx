"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { PartKey } from "@/lib/chapters";

export type BrowserChapter = {
  number: number;
  title: string;
  summary: string;
  theme: string;
};

export type BrowserPart = {
  key: PartKey;
  title: string;
  focus: string;
  outcome: string;
  chapters: BrowserChapter[];
};

function chipClass(active: boolean) {
  return cn(
    "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
    active
      ? "bg-navy text-white dark:bg-ice dark:text-navy"
      : "bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  );
}

/** Client-side search + part filter over the chapter list (mirrors the vanilla
 *  #chapterSearch + part filters). Chapter content is passed in from the server
 *  page so no locale JSON is shipped to the client beyond what is displayed. */
export function ChaptersBrowser({ parts }: { parts: BrowserPart[] }) {
  const t = useTranslations("chapters");
  const [query, setQuery] = useState("");
  const [activePart, setActivePart] = useState<PartKey | "all">("all");

  const q = query.trim().toLowerCase();
  const isFiltering = q !== "" || activePart !== "all";

  const filtered = useMemo(
    () =>
      parts
        .filter((p) => activePart === "all" || p.key === activePart)
        .map((p) => ({
          ...p,
          chapters: q
            ? p.chapters.filter((c) =>
                `${c.title} ${c.summary} ${c.theme}`.toLowerCase().includes(q),
              )
            : p.chapters,
        }))
        .filter((p) => p.chapters.length > 0),
    [parts, activePart, q],
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 print:hidden">
        <label htmlFor="chapter-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <input
          id="chapter-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm shadow-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20 dark:focus:border-ice"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActivePart("all")}
            aria-pressed={activePart === "all"}
            className={chipClass(activePart === "all")}
          >
            {t("allChapters")}
          </button>
          {parts.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActivePart(p.key)}
              aria-pressed={activePart === p.key}
              className={chipClass(activePart === p.key)}
            >
              {t("partLabel", { part: p.key })}
            </button>
          ))}
          {isFiltering && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActivePart("all");
              }}
              className="ms-auto text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/50 px-5 py-12 text-center text-sm text-muted-foreground">
          {t("noMatches")}
        </p>
      ) : (
        filtered.map((part) => (
          <section key={part.key} id={`part-${part.key}`} className="scroll-mt-8">
            <div className="border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold tracking-wide text-ice dark:bg-ice dark:text-navy">
                  {t("partLabel", { part: part.key })}
                </span>
                <h2 className="font-serif text-2xl font-bold text-navy dark:text-ice">
                  {part.title}
                </h2>
              </div>
              <p className="mt-2 text-muted-foreground">{part.focus}</p>
              <p className="mt-1 text-sm text-foreground/70">
                <span className="font-semibold text-foreground/80">
                  {t("outcomeLabel")}:
                </span>{" "}
                {part.outcome}
              </p>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {part.chapters.map((ch) => (
                <li key={ch.number}>
                  <Link
                    href={`/chapters/${ch.number}`}
                    className="group flex h-full flex-col rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/20 dark:ring-foreground/10"
                  >
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {t("chapterLabel", { n: ch.number })}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-navy group-hover:underline dark:text-ice">
                      {ch.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {ch.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
