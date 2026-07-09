import { Container } from "@/components/ui";
import { proofItems } from "./content";

/** Navy social-proof strip under the hero: three uppercase stat items. */
export function ProofBar() {
  return (
    <div className="bg-navy px-5 py-6 sm:px-8">
      <Container className="flex flex-col flex-wrap items-center justify-center gap-3 text-center md:flex-row md:gap-12">
        {proofItems.map((item) => (
          <span
            key={item.strong}
            className="text-sm font-medium tracking-[1px] text-frost uppercase"
          >
            {item.pre}
            <strong className="font-bold text-gold">{item.strong}</strong>
            {item.post}
          </span>
        ))}
      </Container>
    </div>
  );
}
