import { cn } from "@/lib/utils";

type StatProps = React.ComponentProps<"div"> & {
  /** The headline figure, e.g. "$480K". */
  value: string;
  /** What the figure measures. */
  label: string;
  /** Optional source / context line, e.g. "Roofing contractor · 6 months". */
  source?: string;
  /** Set when rendering on a navy surface. */
  onNavy?: boolean;
};

/**
 * Metric block. Big gold figure over a label and an optional source line.
 * Pair with a disclaimer when showing client claims.
 */
export function Stat({
  value,
  label,
  source,
  onNavy = false,
  className,
  ...props
}: StatProps) {
  return (
    <div className={className} {...props}>
      <div className="text-4xl leading-none font-bold text-gold sm:text-5xl">
        {value}
      </div>
      <div
        className={cn(
          "mt-3 font-medium",
          onNavy ? "text-frost" : "text-navy",
        )}
      >
        {label}
      </div>
      {source ? (
        <div
          className={cn(
            "mt-1.5 text-sm",
            onNavy ? "text-frost-faint" : "text-slate",
          )}
        >
          {source}
        </div>
      ) : null}
    </div>
  );
}
