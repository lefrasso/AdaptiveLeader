"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeMeta } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: string) {
    try {
      localStorage.setItem("al.locale", next);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex flex-wrap gap-1" role="group" aria-label="Language">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
            l === locale
              ? "bg-navy text-white"
              : "bg-secondary text-muted-foreground hover:bg-accent",
          )}
        >
          {localeMeta[l].label}
        </button>
      ))}
    </div>
  );
}
