type LegalHeroProps = {
  /** Gold uppercase label above the headline. */
  label?: string;
  /** The page title ("Privacy Policy", "Terms & Conditions"). */
  title: string;
  /** The "Last updated: ..." line under the headline. */
  lastUpdated: string;
};

/** Navy hero band shared by the legal pages: label, h1, last-updated line. */
export function LegalHero({ label = "Legal", title, lastUpdated }: LegalHeroProps) {
  return (
    <section className="bg-navy px-5 pb-10 pt-[110px] sm:px-8 sm:pb-16 sm:pt-[140px]">
      <div className="mx-auto max-w-[800px]">
        <p className="eyebrow-label mb-4">{label}</p>
        <h1 className="mb-4 text-[28px] font-bold leading-[1.15] text-white sm:text-[clamp(30px,3.5vw,40px)]">
          {title}
        </h1>
        <p className="text-[15px] text-white/60">{lastUpdated}</p>
      </div>
    </section>
  );
}
