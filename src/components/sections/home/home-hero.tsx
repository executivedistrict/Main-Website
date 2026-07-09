import { Button, Container } from "@/components/ui";
import { JacobHeroCard } from "@/components/jacob/jacob-hero-card";
import { heroContent, jacobCard } from "./content";

/**
 * Home hero: headline with the italic accent, subhead, primary CTA, and the
 * Jacob AI concierge card (an owner-approved deviation from the production
 * snapshot, which had the boardroom photo here; see
 * plans/004-jacob-concierge/). The card stacks first on mobile, sits right
 * on desktop. Top padding clears the 72px fixed header.
 */
export function HomeHero() {
  return (
    <section className="bg-white px-5 pt-[110px] pb-12 sm:px-8 md:pt-40 md:pb-20">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="text-[28px] leading-[1.1] font-bold sm:display-xl">
            {heroContent.headline.pre}
            <em>{heroContent.headline.em}</em>
            {heroContent.headline.post}
          </h1>
          <p className="mt-7 mb-9 text-[15px] leading-[1.6] text-slate sm:text-[17px] sm:leading-[1.7]">
            {heroContent.sub}
          </p>
          <Button href="/book" className="w-full sm:w-auto">
            {heroContent.cta}
          </Button>
        </div>
        <div className="order-first md:order-none">
          <JacobHeroCard
            heading={jacobCard.heading}
            subline={jacobCard.subline}
            buttonLabel={jacobCard.buttonLabel}
          />
        </div>
      </Container>
    </section>
  );
}
