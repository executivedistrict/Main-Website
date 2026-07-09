import { positioning } from "./content";

/** Navy band with the serif-italic positioning statement. */
export function PositioningStrip() {
  return (
    <section className="bg-navy px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[800px] text-center">
        <div aria-hidden className="mb-7 inline-block h-[3px] w-10 bg-gold" />
        <p className="font-serif text-[clamp(18px,2.2vw,22px)] leading-[1.8] italic text-frost">
          {positioning}
        </p>
      </div>
    </section>
  );
}
