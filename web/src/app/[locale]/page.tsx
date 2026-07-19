import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppControls } from "@/components/app-controls";
import { GrowthDashboard } from "@/components/learning/growth-dashboard";
import { getParts, getChapters } from "@/lib/chapters";

type Props = { params: Promise<{ locale: string }> };

const DOTS = ["#d64550", "#f2b705", "#2e9e5b", "#2e86c1"];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const parts = getParts(locale);

  const stats = [
    { n: parts.length, label: t("home.stats.parts") },
    { n: getChapters(locale).length, label: t("home.stats.chapters") },
    { n: 4, label: t("home.stats.appendices") },
    { n: 5, label: t("home.stats.tools") },
  ];

  const tools = [
    {
      href: "/self-assessment",
      title: t("nav.self"),
      desc: t("home.tiles.self"),
    },
    {
      href: "/leadership-assessment",
      title: t("nav.leadership"),
      desc: t("home.tiles.leadership"),
    },
    {
      href: "/communication-evaluator",
      title: t("nav.evaluator"),
      desc: t("home.tiles.evaluator"),
    },
    {
      href: "/cultural-tips",
      title: t("nav.cultural"),
      desc: t("home.tiles.cultural"),
    },
    {
      href: "/team-builder",
      title: t("nav.team"),
      desc: t("home.tiles.team"),
    },
    {
      href: "/appendices",
      title: t("nav.appendices"),
      desc: t("home.tiles.appendices"),
    },
  ] as const;

  return (
    <main className="mx-auto w-full max-w-[96rem] px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <span className="font-serif text-lg font-semibold text-navy dark:text-ice">
          {t("app.name")}
        </span>
        <AppControls />
      </header>

      <section className="mt-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("home.eyebrow")}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
          {t("home.title")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {t("home.subtitle")}
        </p>
        <div className="mt-8 flex gap-2.5" aria-hidden>
          {DOTS.map((c) => (
            <span
              key={c}
              className="size-4 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl bg-card p-5 text-center shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10"
          >
            <div className="font-serif text-3xl font-bold text-navy dark:text-ice">
              {s.n}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      <GrowthDashboard />

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold text-navy dark:text-ice">
          {t("home.partsTitle")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((p) => (
            <Link
              key={p.key}
              href={`/chapters#part-${p.key}`}
              className="group flex h-full flex-col rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/20 dark:ring-foreground/10"
            >
              <span className="inline-flex w-fit items-center rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold tracking-wide text-ice dark:bg-ice dark:text-navy">
                {t("chapters.partLabel", { part: p.key })}
              </span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-navy group-hover:underline dark:text-ice">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.focus}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-bold text-navy dark:text-ice">
          {t("home.toolsTitle")}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex h-full flex-col rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/20 dark:ring-foreground/10"
            >
              <h3 className="font-serif text-lg font-semibold text-navy group-hover:underline dark:text-ice">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {tool.desc}
              </p>
              <span
                className="mt-3 text-sm font-semibold text-navy dark:text-ice"
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
