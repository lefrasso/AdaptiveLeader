import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, localeMeta, type Locale } from "@/i18n/routing";
import { manrope, fraunces } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoadingSplash } from "@/components/loading-splash";
import { cn } from "@/lib/utils";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "The Adaptive Leader",
    template: "%s · The Adaptive Leader",
  },
  description:
    "A practical, interactive guide to leading across the four colours.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering for next-intl.
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeMeta[locale as Locale].dir;

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={cn("h-full", manrope.variable, fraunces.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="default"
          enableSystem={false}
          themes={["default", "retro", "dark-modern"]}
          value={{
            default: "theme-default",
            retro: "theme-retro",
            "dark-modern": "dark",
          }}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <TooltipProvider>{children}</TooltipProvider>
            <LoadingSplash />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
