import { Container } from "@/components/ui";
import { connectedContent } from "./content";

/** Navy synthesis band: centered headline, left-aligned narrow body column. */
export function ConnectedSection() {
  return (
    <section className="bg-navy px-5 py-14 sm:px-8 md:py-[100px]">
      <Container className="max-w-[800px] text-center">
        <h2 className="mb-10 text-2xl text-white sm:display-l">
          {connectedContent.title}
        </h2>
        <p className="text-left text-[17px] leading-[1.8] text-frost">
          {connectedContent.paragraph}
        </p>
      </Container>
    </section>
  );
}
