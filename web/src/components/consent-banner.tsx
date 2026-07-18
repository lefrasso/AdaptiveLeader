"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePreferences, setPreferences } from "@/lib/prefs/store";
import { Button } from "@/components/ui/button";

/** First-visit consent banner. Persists the choice in local preferences. */
export function ConsentBanner() {
  const t = useTranslations("consent");
  const prefs = usePreferences();
  const [mounted, setMounted] = useState(false);

  // Only decide visibility after the client has read localStorage, so returning
  // visitors don't get a one-frame banner flash. Same mount-guard pattern the
  // theme switcher uses for hydration-sensitive UI.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted || prefs.consent !== "unset") return null;

  return (
    <div
      role="region"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-4 shadow-lg backdrop-blur print:hidden"
    >
      <div className="mx-auto flex w-full max-w-[84rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-navy dark:text-ice">{t("title")}</p>
          <p className="mt-0.5 max-w-2xl text-sm text-muted-foreground">
            {t("body")}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreferences({ consent: "essential" })}
          >
            {t("essential")}
          </Button>
          <Button size="sm" onClick={() => setPreferences({ consent: "all" })}>
            {t("acceptAll")}
          </Button>
        </div>
      </div>
    </div>
  );
}
