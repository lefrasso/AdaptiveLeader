"use client";

import { useRef, useSyncExternalStore } from "react";
import { shuffle, type ColourKey } from "./self-assessment";

export type Order = Record<string, ColourKey[]>;

const noopSubscribe = () => () => {};

/**
 * Per-question colour order for the assessment sliders.
 *
 * The server render and the first client (hydration) render both use the stable
 * `base` order so the markup matches exactly; once hydration completes the
 * client swaps in a shuffled order (to avoid positional bias). Implemented with
 * `useSyncExternalStore` so there is no `setState` inside an effect and no
 * hydration mismatch.
 */
export function useShuffledOrder(
  ids: readonly string[],
  base: readonly ColourKey[],
): Order {
  const server = useRef<Order | null>(null);
  server.current ??= Object.fromEntries(
    ids.map((id) => [id, [...base]]),
  ) as Order;

  const client = useRef<Order | null>(null);
  client.current ??= Object.fromEntries(
    ids.map((id) => [id, shuffle([...base])]),
  ) as Order;

  return useSyncExternalStore(
    noopSubscribe,
    () => client.current!,
    () => server.current!,
  );
}
