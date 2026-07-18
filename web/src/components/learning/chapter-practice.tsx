"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";
import { usePreferences } from "@/lib/prefs/store";
import { setProgress } from "@/lib/progress/store";
import { addReflection, recordHabitDay } from "@/lib/progress/progress";
import { Button } from "@/components/ui/button";

/** Chapter practice with a self-check rubric, a "what good looks like" exemplar,
 *  and a reflection capture (tried / happened / change) saved to progress. */
export function ChapterPractice({
  chapter,
  practice,
  rubric,
  exemplar,
}: {
  chapter: number;
  practice: string;
  rubric?: string[];
  exemplar?: string;
}) {
  const t = useTranslations("growth");
  const prefs = usePreferences();
  const [showExemplar, setShowExemplar] = useState(false);
  const [tried, setTried] = useState("");
  const [happened, setHappened] = useState("");
  const [change, setChange] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    if (!tried.trim() && !happened.trim() && !change.trim()) return;
    setProgress((p) =>
      recordHabitDay(addReflection(p, chapter, { tried, happened, change })),
    );
    setSaved(true);
  }

  return (
    <div>
      <p className="text-foreground/90">{practice}</p>

      {rubric && rubric.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("practiceRubricTitle")}
          </p>
          <ul className="mt-2 space-y-1.5">
            {rubric.map((r, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                <CheckIcon
                  className="mt-0.5 size-4 shrink-0 text-green"
                  aria-hidden
                />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {exemplar && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowExemplar((s) => !s)}
            aria-expanded={showExemplar}
            className="text-sm font-semibold text-navy hover:underline dark:text-ice"
          >
            {t("exemplarTitle")} {showExemplar ? "−" : "+"}
          </button>
          {showExemplar && (
            <p className="mt-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-foreground/90 italic">
              {exemplar}
            </p>
          )}
        </div>
      )}

      <div className="mt-5 rounded-xl border border-border p-4">
        <p className="text-sm font-semibold text-foreground">
          {t("reflectTitle")}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {t("reflectIntro")}
        </p>
        <div className="mt-3 space-y-3">
          <ReflectField
            label={t("reflectTried")}
            value={tried}
            onChange={setTried}
          />
          <ReflectField
            label={t("reflectHappened")}
            value={happened}
            onChange={setHappened}
          />
          <ReflectField
            label={t("reflectChange")}
            value={change}
            onChange={setChange}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={save}>
            {t("saveReflection")}
          </Button>
          {saved && (
            <span className="text-xs text-muted-foreground">
              {prefs.consent === "all" ? t("savedLocally") : t("enableSaving")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ReflectField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full resize-y rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20 dark:focus:border-ice"
      />
    </label>
  );
}
