"use client";

import { useEffect } from "react";
import { usePreferences } from "@/lib/prefs/store";

/**
 * Applies preference-driven side effects to the document. Currently mirrors the
 * reduce-motion choice onto a data attribute that motion CSS can key off, in
 * addition to the OS-level `prefers-reduced-motion` media query.
 */
export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefs = usePreferences();

  useEffect(() => {
    document.documentElement.dataset.reduceMotion = prefs.reduceMotion
      ? "true"
      : "false";
  }, [prefs.reduceMotion]);

  return <>{children}</>;
}
