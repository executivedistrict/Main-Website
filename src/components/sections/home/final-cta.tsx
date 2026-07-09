import { Check } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { ctaCloseContent } from "./content";

/** Closing CTA: headline, body, primary CTA, and the "What to expect" box. */
export function FinalCta() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 md:py-[100px]">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="mb-7 text-2xl leading-[1.15] sm:display-l">
            {ctaCloseContent.headline.pre}
            <em>{ctaCloseContent.headline.em}</em>
            {ctaCloseContent.headline.post}
          </h2>
          {ctaCloseContent.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mb-9 text-base leading-[1.8] text-charcoal"
            >
              {paragraph}
            </p>
          ))}
          <Button href="/book" className="w-full sm:w-auto">
            {ctaCloseContent.cta}
          </Button>
        </div>
        <div className="rounded-sm border border-line bg-mist px-8 py-9">
          <h3 className="mb-5 text-lg font-bold text-navy">
            {ctaCloseContent.expectTitle}
          </h3>
          {ctaCloseContent.expectItems.map((item) => (
            <div key={item} className="mb-4 flex items-start gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue">
                <Check
                  aria-hidden="true"
                  strokeWidth={3}
                  className="size-3 text-white"
                />
              </span>
              <span className="text-[15px] leading-[1.6] text-charcoal">
                {item}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
