import { Button } from "@/components/ui";
import { closingCta } from "./content";

/** White closing CTA: display headline with serif accent and the booking button. */
export function ClosingCta() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-[100px]">
      <div className="mx-auto max-w-[800px] text-center">
        <h2 className="mb-5 text-[clamp(30px,3.5vw,42px)] leading-[1.15] font-bold">
          These results started with a <em>single conversation.</em>
        </h2>
        <p className="mx-auto mb-9 max-w-[600px] text-[17px] leading-[1.7] text-slate">
          {closingCta.body}
        </p>
        <Button href={closingCta.buttonHref} variant="primary" size="md">
          {closingCta.buttonLabel}
        </Button>
      </div>
    </section>
  );
}
