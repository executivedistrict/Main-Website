import { cn } from "@/lib/utils";
import { Container } from "@/components/ui";
import type { CaseStudy } from "./content";

type CaseStudySectionProps = {
  study: CaseStudy;
};

/**
 * One full case study: oversized serif index, industry eyebrow + title,
 * the summary paragraph, then a horizontal navy Key Results band (metrics
 * 4-up at lg, 2-up at sm, stacked on mobile). Background alternates per
 * `study.tone`.
 */
export function CaseStudySection({ study }: CaseStudySectionProps) {
  return (
    <section
      className={cn(
        "border-b border-line px-5 py-14 sm:px-8 sm:py-20",
        study.tone === "mist" ? "bg-mist" : "bg-white",
      )}
    >
      <Container>
        <div className="mb-8 flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-6">
          <div
            aria-hidden
            className={cn(
              "min-w-[80px] font-serif text-[72px] leading-none font-semibold",
              study.tone === "mist" ? "text-line" : "text-ice",
            )}
          >
            {study.number}
          </div>
          <div>
            <div className="mb-1 text-[11px] font-semibold tracking-[3px] text-gold uppercase">
              {study.industry}
            </div>
            <h2 className="display-m">{study.title}</h2>
          </div>
        </div>

        <p className="max-w-[860px] text-[15px] leading-[1.8] text-charcoal">
          {study.summary}
        </p>

        <div className="relative mt-10 overflow-hidden rounded-sm bg-navy px-7 py-8 sm:px-9">
          {/* faint gold radial glow, top-right (decorative) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-[radial-gradient(circle,var(--color-gold)_0%,transparent_70%)] opacity-10"
          />
          <h3 className="relative mb-7 text-[11px] font-bold tracking-[3px] text-gold uppercase">
            Key Results
          </h3>
          <ul className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {study.results.map((result) => (
              <li
                key={result.label}
                className="lg:border-l lg:border-line-onnavy lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <div className="mb-1 text-[28px] leading-[1.1] font-bold text-white">
                  {result.value}
                </div>
                <div className="text-[13px] leading-normal text-frost-soft">
                  {result.label}
                </div>
                {result.context ? (
                  <div className="mt-[3px] text-[11px] font-semibold tracking-[0.5px] text-gold">
                    {result.context}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
