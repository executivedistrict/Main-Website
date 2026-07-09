import { Eyebrow } from "@/components/ui";
import { hero } from "./content";

/** Navy page hero: gold eyebrow, display headline with serif accent, subline. */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy px-5 pt-40 pb-16 sm:px-8 sm:pb-24">
      {/* faint gold radial glow, top-right (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[200px] -right-[200px] size-[600px] rounded-full bg-[radial-gradient(circle,var(--color-gold)_0%,transparent_70%)] opacity-[0.06]"
      />
      <div className="relative z-1 mx-auto max-w-[800px] text-center">
        <Eyebrow className="mb-6">{hero.label}</Eyebrow>
        <h1 className="display-xl text-white">
          Operators who&rsquo;ve been in <em>your chair.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-[640px] text-[17px] leading-[1.8] text-frost-soft">
          {hero.sub}
        </p>
      </div>
    </section>
  );
}
