"use client";

import { useTranslations } from "next-intl";
import {
  usePreferences,
  setPreferences,
  clearPreferences,
  getPreferences,
} from "@/lib/prefs/store";
import { getProgress, clearProgress } from "@/lib/progress/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/** Controlled "Privacy & data" panel: motion + progress toggles, export, clear. */
export function PrivacyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("privacy");
  const prefs = usePreferences();

  function exportData() {
    const payload = {
      preferences: getPreferences(),
      progress: getProgress(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "adaptive-leader-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-bold text-navy dark:text-ice">
            {t("title")}
          </DialogTitle>
          <DialogDescription>{t("intro")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <label className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-sm font-medium">
                {t("reduceMotion")}
              </span>
              <span className="block text-xs text-muted-foreground">
                {t("reduceMotionHint")}
              </span>
            </span>
            <input
              type="checkbox"
              checked={prefs.reduceMotion}
              onChange={(e) =>
                setPreferences({ reduceMotion: e.target.checked })
              }
              style={{ accentColor: "var(--navy)" }}
              className="mt-1 size-4 shrink-0"
            />
          </label>

          <label className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-sm font-medium">
                {t("saveProgress")}
              </span>
              <span className="block text-xs text-muted-foreground">
                {t("saveProgressHint")}
              </span>
            </span>
            <input
              type="checkbox"
              checked={prefs.consent === "all"}
              onChange={(e) =>
                setPreferences({
                  consent: e.target.checked ? "all" : "essential",
                })
              }
              style={{ accentColor: "var(--navy)" }}
              className="mt-1 size-4 shrink-0"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={exportData}>
            {t("export")}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              clearPreferences();
              clearProgress();
            }}
          >
            {t("clear")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
