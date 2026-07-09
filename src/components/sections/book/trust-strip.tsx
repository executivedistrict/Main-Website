import { trustItems } from "./content";

/** Ice band with the four trust items under the booking section. */
export function TrustStrip() {
  return (
    <section className="border-y border-line bg-ice px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 text-center sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
        {trustItems.map(({ icon: Icon, label, desc }) => (
          <div key={label}>
            <div className="mx-auto mb-3.5 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white">
              <Icon aria-hidden strokeWidth={1.5} className="h-[18px] w-[18px] text-navy" />
            </div>
            <p className="mb-1 text-sm font-semibold text-navy">{label}</p>
            <p className="text-[13px] leading-[1.5] text-slate">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
