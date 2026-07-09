import type { Metadata } from "next";
import { Fragment } from "react";
import { CapabilitiesRow } from "@/components/sections/home/capabilities-row";
import { ConnectedSection } from "@/components/sections/home/connected-section";
import { pains } from "@/components/sections/home/content";
import { FinalCta } from "@/components/sections/home/final-cta";
import { HomeHero } from "@/components/sections/home/home-hero";
import { MetricsBand } from "@/components/sections/home/metrics-band";
import { PainSection } from "@/components/sections/home/pain-section";
import { ProcessSection } from "@/components/sections/home/process-section";
import { ProofBar } from "@/components/sections/home/proof-bar";

export const metadata: Metadata = {
  title: {
    absolute:
      "Executive District | Fractional C-Suite for $500K–$50M Businesses",
  },
  description:
    "Embedded fractional CFOs, COOs, CMOs, and legal counsel for owners who've outgrown doing it alone. We embed, own outcomes, and share the weight.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ProofBar />
      {pains.map((pain, index) => (
        <Fragment key={pain.id}>
          {index > 0 ? (
            <hr className="mx-auto w-full max-w-[1200px] border-line" />
          ) : null}
          <PainSection pain={pain} />
        </Fragment>
      ))}
      <ConnectedSection />
      <CapabilitiesRow />
      <ProcessSection />
      <MetricsBand />
      <FinalCta />
    </>
  );
}
