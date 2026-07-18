import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppControls } from "@/components/app-controls";
import { CulturalTips } from "@/components/assessments/cultural-tips";

type Props = { params: Promise<{ locale: string }> };

const HERO_STYLE = {
  background: "linear-gradient(135deg, var(--navy), var(--navy-2))",
} as const;

const DOTS = ["#d64550", "#f2b705", "#2e9e5b", "#2e86c1"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cultural" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function CulturalTipsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cultural");

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3 print:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-navy hover:underline dark:text-ice"
        >
          ← {t("meta.title")}
        </Link>
        <AppControls />
      </div>

      <header
        className="relative overflow-hidden text-white [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
        style={HERO_STYLE}
      >
        <div className="mx-auto w-full max-w-5xl px-5 py-10">
          <p className="mb-2.5 text-[13px] font-bold tracking-[3px] text-ice">
            {t("header.eyebrow")}
          </p>
          <h1 className="font-serif text-3xl font-extrabold leading-tight sm:text-4xl">
            {t("header.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-ice">{t("header.lead")}</p>
          <div className="mt-5 flex gap-2.5" aria-hidden>
            {DOTS.map((c) => (
              <span
                key={c}
                className="size-4 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <CulturalTips />
      </main>

      <footer
        className="mt-5 text-white [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
        style={HERO_STYLE}
      >
        <div className="mx-auto w-full max-w-5xl px-5 py-6 text-[13px] text-ice">
          {t("footer")}
        </div>
      </footer>
    </div>
  );
}
