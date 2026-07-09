import type { Metadata } from "next";
import { AggregateMetrics } from "@/components/sections/results/aggregate-metrics";
import { CaseStudySection } from "@/components/sections/results/case-study";
import { ClosingCta } from "@/components/sections/results/closing-cta";
import { caseStudies } from "@/components/sections/results/content";
import { ResultsHero } from "@/components/sections/results/results-hero";

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Self-reported results from anonymized client engagements: EBITDA gains, revenue growth, operational transformation, and exit readiness.",
};

/**
 * /results - Client Results page per the approved plan-005 copy deck:
 * hero (with claims disclaimer), aggregate metrics strip, four case
 * studies, and a closing CTA.
 */
export default function ResultsPage() {
  const [roofing, lawFirm, healthTech, utility] = caseStudies;

  return (
    <>
      <ResultsHero />
      <AggregateMetrics />
      <CaseStudySection study={roofing} />
      <CaseStudySection study={lawFirm} />
      <CaseStudySection study={healthTech} />
      <CaseStudySection study={utility} />
      <ClosingCta />
    </>
  );
}
