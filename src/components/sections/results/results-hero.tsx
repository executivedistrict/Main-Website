import { Eyebrow } from "@/components/ui";
import { hero } from "./content";

/**
 * Navy page hero: gold "Proof" eyebrow, display headline with serif accent,
 * subline, and the claims-policy disclaimer line.
 */
export function ResultsHero() {
  return (
    <section className="relative overflow-hidden bg-navy px-5 pt-40 pb-16 sm:px-8 sm:pb-24">
      {/* faint blue radial glow, bottom-right (decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[150px] -bottom-[250px] size-[600px] rounded-full bg-[radial-gradient(circle,var(--color-blue)_0%,transparent_60%)] opacity-[0.07]"
      />
      <div className="relative z-1 mx-auto max-w-[800px] text-center">
        <Eyebrow className="mb-6">{hero.label}</Eyebrow>
        <h1 className="display-xl text-white">
          We don&rsquo;t talk about results. We <em>show them.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-[640px] text-[17px] leading-[1.8] text-frost-soft">
          {hero.sub}
        </p>
        {/* frost-faint over navy is ~5.7:1, passing WCAG AA for normal text */}
        <p className="mx-auto mt-4 max-w-[640px] text-[13px] leading-[1.7] text-frost-faint">
          {hero.disclaimer}
        </p>
      </div>
    </section>
  );
}
