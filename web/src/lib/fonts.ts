import { Manrope, Fraunces } from "next/font/google";

// Primary UI typeface (variable font) -> maps to --font-sans (used by shadcn tokens).
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Editorial serif for large headings -> --font-serif / font-heading utility.
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const fontVariables = `${manrope.variable} ${fraunces.variable}`;
