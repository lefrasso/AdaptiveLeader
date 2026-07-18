"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheckIcon } from "lucide-react";
import { PrivacyDialog } from "./privacy-dialog";

/** Persistent header button that opens the Privacy & data panel. */
export function PrivacyControl() {
  const t = useTranslations("privacy");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("title")}
        className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ShieldCheckIcon className="size-3.5" aria-hidden />
        <span className="hidden sm:inline">{t("trigger")}</span>
      </button>
      <PrivacyDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
