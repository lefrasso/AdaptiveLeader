"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpIcon } from "lucide-react";

/** Floating "back to top" button that appears once the page is scrolled. */
export function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    // Defer the initial check out of the effect body (avoids a synchronous
    // setState during mount) while still reflecting an already-scrolled page.
    const id = requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(id);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("backToTop")}
      className="fixed end-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full bg-navy text-white shadow-lg ring-1 ring-black/10 transition hover:bg-navy/90 focus-visible:ring-2 focus-visible:ring-navy/40 focus-visible:outline-none print:hidden dark:bg-ice dark:text-navy dark:hover:bg-ice/90"
    >
      <ArrowUpIcon className="size-5" aria-hidden />
    </button>
  );
}
