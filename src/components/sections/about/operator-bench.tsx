import { bench, benchIntro } from "./content";
import { OperatorCard } from "./operator-card";

/**
 * "The Senior Operator Bench": intro headline plus one flat card grid of
 * the whole bench (1 / 2 / 3 columns as width allows). Each card carries
 * its function area as a gold tag, replacing the old one-group-per-band
 * layout that left most rows nearly empty.
 */
export function OperatorBench() {
  return (
    <section className="bg-white px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-[1200px]">
        <div>
          <h2 className="text-[clamp(28px,3vw,38px)] leading-[1.2] font-bold text-navy">
            {benchIntro.title}
          </h2>
          <p className="mt-4 max-w-[680px] text-[17px] leading-[1.7] text-slate">
            {benchIntro.sub}
          </p>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {bench.map((operator) => (
            <OperatorCard key={operator.name} operator={operator} />
          ))}
        </div>
      </div>
    </section>
  );
}
