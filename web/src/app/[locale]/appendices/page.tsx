import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppControls } from "@/components/app-controls";
import { getAppendices } from "@/lib/appendices";

type Props = { params: Promise<{ locale: string }> };

const HERO_STYLE = {
  background: "linear-gradient(135deg, var(--navy), var(--navy-2))",
} as const;

const DOTS = ["#d64550", "#f2b705", "#2e9e5b", "#2e86c1"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "appendices" });
  return { title: t("meta.title"), description: t("meta.description") };
}

function AxHead({
  letter,
  title,
  text,
}: {
  letter: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-ice dark:bg-ice dark:text-navy">
          {letter}
        </span>
        <h2 className="font-serif text-2xl font-bold text-navy dark:text-ice">
          {title}
        </h2>
      </div>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </div>
  );
}

export default async function AppendicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("appendices");
  const tApp = await getTranslations("app");
  const ax = getAppendices(locale);

  const practice = [
    ["daily", ax.practice.daily],
    ["weekly", ax.practice.weekly],
    ["monthly", ax.practice.monthly],
  ] as const;

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-[84rem] items-center justify-between gap-4 px-5 py-3 print:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-navy hover:underline dark:text-ice"
        >
          ← {tApp("name")}
        </Link>
        <AppControls />
      </div>

      <header
        className="relative overflow-hidden text-white [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
        style={HERO_STYLE}
      >
        <div className="mx-auto w-full max-w-[84rem] px-5 py-10">
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
        <div className="mx-auto w-full max-w-[84rem] space-y-14 px-5 py-12">
          {/* Appendix A — Colour Pocket Guide */}
          <section>
            <AxHead
              letter={ax.meta.A.letter}
              title={ax.meta.A.title}
              text={ax.meta.A.text}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ax.colours.map((c) => {
                const fg = c.onLight ? "var(--navy)" : "#fff";
                const chip = c.onLight ? "bg-black/10" : "bg-white/20";
                return (
                  <div
                    key={c.id}
                    className="rounded-2xl p-5 shadow-sm ring-1 ring-foreground/10 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
                    style={{ background: c.hex, color: fg }}
                  >
                    <strong className="text-lg">{c.name}</strong>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.traits.map((tr) => (
                        <span
                          key={tr}
                          className={`rounded-full ${chip} px-2 py-0.5 text-xs font-medium`}
                        >
                          {tr}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-sm">
                      <span className="font-semibold opacity-80">
                        {t("atBest")}
                      </span>{" "}
                      {c.best}
                    </p>
                    <p className="mt-1.5 text-sm">
                      <span className="font-semibold opacity-80">
                        {t("underStress")}
                      </span>{" "}
                      {c.shadow}
                    </p>
                    <p className="mt-1.5 text-sm">
                      <span className="font-semibold opacity-80">
                        {t("toInfluence")}
                      </span>{" "}
                      {c.need}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Appendix B — How to Communicate With Each Colour */}
          <section>
            <AxHead
              letter={ax.meta.B.letter}
              title={ax.meta.B.title}
              text={ax.meta.B.text}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ax.comms.map((c) => (
                <div
                  key={c.colour}
                  className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10"
                >
                  <div
                    className="px-4 py-2 font-bold [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
                    style={{
                      background: c.hex,
                      color: c.onLight ? "var(--navy)" : "#fff",
                    }}
                  >
                    {c.colour}
                  </div>
                  <div className="p-4">
                    <p className="text-sm italic text-muted-foreground">
                      &ldquo;{c.open.replace(/^"|"$/g, "")}&rdquo;
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-bold text-green">
                          ✓ {t("do")}
                        </p>
                        <ul className="mt-1.5 space-y-1 text-sm text-foreground/90">
                          {c.dos.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-red">
                          ✗ {t("avoid")}
                        </p>
                        <ul className="mt-1.5 space-y-1 text-sm text-foreground/90">
                          {c.donts.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Appendix C — The Leader's Practice */}
          <section>
            <AxHead
              letter={ax.meta.C.letter}
              title={ax.meta.C.title}
              text={ax.meta.C.text}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {practice.map(([key, items]) => (
                <div
                  key={key}
                  className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10"
                >
                  <h3 className="font-serif text-lg font-semibold text-navy dark:text-ice">
                    {t(key)}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/90">
                    {items.map((d, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-navy dark:bg-ice"
                          aria-hidden
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Appendix D — Further Reading */}
          <section>
            <AxHead
              letter={ax.meta.D.letter}
              title={ax.meta.D.title}
              text={ax.meta.D.text}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {ax.books.map((g) => (
                <div
                  key={g.cat}
                  className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10"
                >
                  <h3 className="font-serif text-lg font-semibold text-navy dark:text-ice">
                    {g.cat}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {g.items.map((b) => (
                      <li key={b.title}>
                        <p className="text-sm">
                          <strong className="text-foreground">{b.title}</strong>{" "}
                          <span className="text-muted-foreground">
                            · {b.author}
                          </span>
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {b.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
