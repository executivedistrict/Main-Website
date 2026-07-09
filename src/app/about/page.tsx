import type { Metadata } from "next";

import { AboutHero } from "@/components/sections/about/about-hero";
import { FounderFeature } from "@/components/sections/about/founder-feature";
import { OperatorBench } from "@/components/sections/about/operator-bench";
import { PositioningStrip } from "@/components/sections/about/positioning-strip";
import { TeamCta } from "@/components/sections/about/team-cta";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Proven operators with P&L experience and real exits. Not coaches. Not consultants. Operators.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <FounderFeature />
      <OperatorBench />
      <PositioningStrip />
      <TeamCta />
    </>
  );
}
