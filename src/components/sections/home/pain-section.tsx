import { Container, Eyebrow } from "@/components/ui";
import type { Pain } from "./content";

/**
 * Numbered problem section: oversized serif number with a gold underline,
 * gold label, quoted headline with the italic accent, a single body
 * paragraph, and a gold-ruled pull-quote callout. Collapses to a single
 * column on mobile.
 */
export function PainSection({ pain }: { pain: Pain }) {
  return (
    <section id={pain.id} className="bg-white px-5 py-14 sm:px-8 md:py-[100px]">
      <Container className="grid items-start gap-4 md:grid-cols-[120px_1fr] md:gap-12">
        <div
          aria-hidden="true"
          className="relative pb-3 font-serif text-5xl leading-none font-semibold text-ice after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-gold after:content-[''] sm:text-[56px] md:text-8xl"
        >
          {pain.number}
        </div>
        <div>
          <Eyebrow className="mb-3 block tracking-[3px]">{pain.label}</Eyebrow>
          <h2 className="mb-8 text-2xl leading-[1.2] sm:text-[clamp(28px,3vw,36px)]">
            {pain.headline.pre}
            <em>{pain.headline.em}</em>
            {pain.headline.post}
          </h2>
          <p className="text-base leading-[1.8] text-charcoal">
            {pain.paragraph}
          </p>
          <div className="mt-8 rounded-r-sm border-l-4 border-gold bg-ice px-7 py-6">
            <p className="font-serif text-base italic leading-[1.7] text-navy">
              {pain.callout}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
