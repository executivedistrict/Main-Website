import { Button } from "@/components/ui";
import { cta } from "./content";

/** Closing CTA band: display headline with serif accent and the booking link. */
export function TeamCta() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-[100px]">
      <div className="mx-auto max-w-[800px] text-center">
        <h2 className="display-l text-balance">
          Your next leadership hire shouldn&rsquo;t be a <em>gamble.</em>
        </h2>
        <p className="mx-auto mt-5 mb-9 max-w-[600px] text-[17px] leading-[1.7] text-slate">
          {cta.body}
        </p>
        <Button href={cta.href}>{cta.button}</Button>
      </div>
    </section>
  );
}
