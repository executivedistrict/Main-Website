import { Container } from "@/components/ui";
import { aggregateMetrics } from "./content";

/**
 * Headline-numbers strip under the hero: four navy figures with labels,
 * hairline-divided on desktop, stacking 2-up then 1-up on smaller screens.
 */
export function AggregateMetrics() {
  return (
    <section className="border-b border-line bg-white px-5 py-14 sm:px-8 sm:py-[60px]">
      <Container className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
        {aggregateMetrics.map((metric) => (
          <div
            key={metric.label}
            className="relative px-4 py-6 lg:not-last:after:absolute lg:not-last:after:top-[20%] lg:not-last:after:-right-4 lg:not-last:after:h-[60%] lg:not-last:after:w-px lg:not-last:after:bg-line lg:not-last:after:content-['']"
          >
            <div className="mb-2 text-[clamp(32px,3.5vw,44px)] leading-none font-bold text-navy">
              {metric.value}
            </div>
            <div className="text-sm leading-normal text-slate">
              {metric.label}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
