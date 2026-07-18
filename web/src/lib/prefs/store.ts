"use client";

// Browser storage adapter + React hook for user preferences.
//
// Backed by localStorage and exposed through useSyncExternalStore so there is no
// setState-in-effect, no hydration mismatch, and cross-tab updates come for free
// (the "storage" event fires in other tabs). getSnapshot returns a cached
// reference until the stored string actually changes, as the hook requires.

import { useSyncExternalStore } from "react";
import {
  PREFS_KEY,
  defaultPreferences,
  parsePreferences,
  serializePreferences,
  type Preferences,
} from "./prefs";

// Referentially-stable snapshot used during SSR and hydration.
const SERVER_SNAPSHOT = defaultPreferences();

// Same-tab cache: keeps getSnapshot stable until the raw string changes.
let cache: { raw: string | null; value: Preferences } | null = null;

const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(PREFS_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): Preferences {
  const raw = readRaw();
  if (cache && cache.raw === raw) return cache.value;
  const value = parsePreferences(raw);
  cache = { raw, value };
  return value;
}

function getServerSnapshot(): Preferences {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === PREFS_KEY || e.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function emit(): void {
  for (const l of listeners) l();
}

export function getPreferences(): Preferences {
  return getSnapshot();
}

/** Merge a partial update (or updater fn) into stored preferences and notify. */
export function setPreferences(
  update: Partial<Preferences> | ((prev: Preferences) => Preferences),
): void {
  const prev = getSnapshot();
  const next =
    typeof update === "function" ? update(prev) : { ...prev, ...update };
  const raw = serializePreferences(next);
  try {
    window.localStorage.setItem(PREFS_KEY, raw);
  } catch {
    // ignore write failures (private mode, quota exceeded)
  }
  cache = { raw, value: next };
  emit();
}

/** Remove all stored preferences and reset to defaults. */
export function clearPreferences(): void {
  try {
    window.localStorage.removeItem(PREFS_KEY);
  } catch {
    // ignore
  }
  cache = { raw: null, value: defaultPreferences() };
  emit();
}

/** React hook: current preferences, cross-tab aware. */
export function usePreferences(): Preferences {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
