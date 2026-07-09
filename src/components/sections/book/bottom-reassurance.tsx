import { reassurance } from "./content";

/** Navy closing band: gold accent bar and the serif-italic reassurance line. */
export function BottomReassurance() {
  return (
    <section className="bg-navy px-5 py-[72px] sm:px-8">
      <div className="mx-auto max-w-[700px] text-center">
        <span aria-hidden className="mb-6 inline-block h-[3px] w-10 bg-gold" />
        <p className="font-serif text-lg italic leading-[1.8] text-white/[.82]">
          {reassurance}
        </p>
      </div>
    </section>
  );
}
