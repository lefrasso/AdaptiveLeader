import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

// Set NEXT_PUBLIC_BASE_PATH="/AdaptiveLeader" in CI for GitHub Pages project sites.
// Leave empty for local dev or when using a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Fully static site for GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  // Ensure client bundles resolve assets under the base path.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Only the dev server gets a "/" -> default-locale redirect (so the app opens at
// the root during `next dev`). It is intentionally absent from the production
// build so static export stays warning-free; the built site's root is handled by
// scripts/root-redirect.mjs (out/index.html).
export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withNextIntl({
      ...nextConfig,
      // Trust the forwarded origins used in Codespaces/remote dev so Next.js
      // doesn't block cross-origin requests to /_next/ dev resources (which
      // otherwise breaks HMR and client hydration → dead buttons).
      allowedDevOrigins: ["127.0.0.1", "localhost", "*.app.github.dev", "*.github.dev"],
      async redirects() {
        return [{ source: "/", destination: "/en", permanent: false }];
      },
    });
  }
  return withNextIntl(nextConfig);
}
