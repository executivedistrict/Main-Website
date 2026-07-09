import { Container } from "@/components/ui";
import { processContent } from "./content";

/** 4-step engagement process: gold-ruled mist cards with big serif numbers. */
export function ProcessSection() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 md:py-[100px]">
      <Container>
        <h2 className="mb-3 text-2xl sm:display-l">{processContent.title}</h2>
        <p className="mb-14 text-[17px] text-slate md:mb-[60px]">
          {processContent.sub}
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processContent.steps.map((step) => (
            <div
              key={step.num}
              className="rounded-xs border-t-[3px] border-gold bg-mist px-6 py-8"
            >
              <div
                aria-hidden="true"
                className="mb-4 font-serif text-5xl leading-none font-semibold text-ice"
              >
                {step.num}
              </div>
              <h3 className="mb-3 text-base font-bold text-navy">
                {step.title}
              </h3>
              <p className="text-sm leading-[1.7] text-slate">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
