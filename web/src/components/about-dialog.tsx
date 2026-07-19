"use client";

import { useTranslations } from "next-intl";
import { InfoIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { APP_VERSION } from "@/lib/version";

const DOTS = ["#d64550", "#f2b705", "#2e9e5b", "#2e86c1"];

/** Header "About this guide" button + modal. Mirrors the vanilla about overlay. */
export function AboutDialog() {
  const t = useTranslations("about");

  return (
    <Dialog>
      <DialogTrigger
        aria-label={t("title")}
        className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
      >
        <InfoIcon className="size-3.5" aria-hidden />
        <span className="hidden sm:inline">{t("trigger")}</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <div className="flex gap-1.5" aria-hidden>
          {DOTS.map((c) => (
            <span
              key={c}
              className="size-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>

        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-navy dark:text-ice">
              {t("title")}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm leading-relaxed text-foreground/90">
            {t("body1")}
          </DialogDescription>
          <p className="text-sm leading-relaxed text-foreground/90">
            {t("body2")}
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-secondary/50 p-4">
            <h3 className="text-xs font-bold tracking-[2px] text-muted-foreground uppercase">
              {t("creditsLabel")}
            </h3>
            <p className="mt-1.5 text-sm text-foreground/90">{t("credits")}</p>
          </div>
          <div className="flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
            <p>
              {t.rich("powered", {
                strong: (chunks) => (
                  <strong className="font-semibold text-foreground">
                    {chunks}
                  </strong>
                ),
              })}
            </p>
            <span className="shrink-0 font-mono text-xs tabular-nums">
              v{APP_VERSION}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
