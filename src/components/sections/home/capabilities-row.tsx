import { Card, CardTitle, Container, SectionHeader } from "@/components/ui";
import { capabilitiesContent } from "./content";

/**
 * Capabilities row: centered header plus three white cards (headline with the
 * italic accent, one body paragraph), the content merged from the removed
 * How We Work page. Single column on mobile, three across from lg.
 */
export function CapabilitiesRow() {
  return (
    <section
      id="capabilities"
      className="bg-mist px-5 py-14 sm:px-8 md:py-[100px]"
    >
      <Container>
        <SectionHeader
          align="center"
          title={capabilitiesContent.header.title}
          description={capabilitiesContent.header.sub}
          className="mb-12 md:mb-14"
        />
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {capabilitiesContent.cards.map((card) => (
            <Card key={card.headline.em}>
              <CardTitle className="leading-[1.3]">
                {card.headline.pre}
                <em>{card.headline.em}</em>
                {card.headline.post}
              </CardTitle>
              <p className="text-[15px] leading-[1.7] text-charcoal">
                {card.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
