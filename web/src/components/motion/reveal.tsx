"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll wrapper. Content is rendered in its natural (visible) state
 * so no-JS clients, crawlers, and print all see it. On the client, once the
 * element scrolls into view an entrance animation is played by adding the
 * `motion-reveal` class (see globals.css). Honors reduced-motion (OS setting +
 * the in-app preference) by simply not animating. One-shot: it unobserves after
 * the first reveal.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.reduceMotion === "true";
    if (reduced) return; // leave content in its natural, visible state

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-reveal");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
