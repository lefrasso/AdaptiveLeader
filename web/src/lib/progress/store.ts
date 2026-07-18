"use client";

// Browser storage adapter + React hook for learning progress.
//
// Mirrors the preferences store (useSyncExternalStore, cross-tab), but keeps an
// in-memory source of truth and only PERSISTS to localStorage when the visitor
// has consented (progressAllowed). Without consent the learning features still
// work for the session; nothing is written to disk.

import { useSyncExternalStore } from "react";
import { getPreferences } from "@/lib/prefs/store";
import { progressAllowed } from "@/lib/prefs/prefs";
import {
  PROGRESS_KEY,
  defaultProgress,
  parseProgress,
  serializeProgress,
  type Progress,
} from "./progress";

const SERVER_SNAPSHOT = defaultProgress();

let current: Progress | null = null;

const listeners = new Set<() => void>();

function ensureLoaded(): Progress {
  if (current === null) {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(PROGRESS_KEY);
    } catch {
      raw = null;
    }
    current = parseProgress(raw);
  }
  return current;
}

function getSnapshot(): Progress {
  return ensureLoaded();
}

function getServerSnapshot(): Progress {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === PROGRESS_KEY || e.key === null) {
      current = null; // force a reload from storage on the next read
      callback();
    }
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

export function getProgress(): Progress {
  return ensureLoaded();
}

/** Apply a pure update; persists to localStorage only when consent === "all". */
export function setProgress(updater: (prev: Progress) => Progress): void {
  const next = updater(ensureLoaded());
  current = next;
  if (progressAllowed(getPreferences())) {
    try {
      window.localStorage.setItem(PROGRESS_KEY, serializeProgress(next));
    } catch {
      // ignore write failures (private mode, quota exceeded)
    }
  }
  emit();
}

/** Erase stored progress and reset the in-memory state. */
export function clearProgress(): void {
  current = defaultProgress();
  try {
    window.localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // ignore
  }
  emit();
}

/** React hook: current learning progress, cross-tab aware. */
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
