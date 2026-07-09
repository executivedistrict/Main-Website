import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";
import { metrics, metricsFootnote } from "./content";

/**
 * Ice-tinted results band: four navy figures with gold context lines,
 * separated by hairlines on desktop, stacking to one column on mobile, with
 * the claims-policy footnote underneath.
 */
export function MetricsBand() {
  return (
    <section
      aria-label="Client results"
      className="border-y border-line bg-ice px-5 py-14 sm:px-8 md:py-[72px]"
    >
      <Container className="grid gap-6 text-center sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-10">
        {metrics.map((metric, index) => (
          <div
            key={metric.value}
            className={cn(
              "relative",
              index < metrics.length - 1 &&
                "lg:after:absolute lg:after:top-[10%] lg:after:-right-5 lg:after:h-[80%] lg:after:w-px lg:after:bg-line lg:after:content-['']",
            )}
          >
            <div className="mb-2 text-[clamp(28px,3vw,36px)] font-bold text-navy">
              {metric.value}
            </div>
            <div className="text-[13px] leading-[1.5] text-slate">
              {metric.label}
            </div>
            <div className="mt-1.5 text-[11px] font-semibold tracking-[0.5px] text-gold uppercase">
              {metric.context}
            </div>
          </div>
        ))}
      </Container>
      <p className="mt-8 text-center text-xs text-slate">{metricsFootnote}</p>
    </section>
  );
}
