import { cn } from "@/lib/utils";

/** Circular progress ring using a conic-gradient (ports the original `.ring`). */
export function ScoreRing({
  pct,
  color,
  primary,
  secondary,
  className,
}: {
  pct: number;
  color: string;
  primary: string;
  secondary: string;
  className?: string;
}) {
  return (
    <div
      className={cn("grid size-[130px] shrink-0 place-items-center rounded-full", className)}
      style={{
        background: `conic-gradient(${color} calc(${pct} * 1%), var(--secondary) 0)`,
      }}
      role="img"
      aria-label={`${pct}%`}
    >
      <div className="grid size-[104px] place-items-center rounded-full bg-card text-center">
        <b className="text-3xl leading-none font-extrabold text-foreground">
          {primary}
        </b>
        <span className="text-[11px] tracking-wide text-muted-foreground">
          {secondary}
        </span>
      </div>
    </div>
  );
}
