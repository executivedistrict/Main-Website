import { qualificationConfig } from "./config";
import type { QualificationAnswers, Tier } from "./types";

/**
 * Pure scoring engine (plan 006, Phase 0 contract). Hard gates run first
 * and override everything; then option points are summed; then the tier
 * thresholds apply. All rules live in `config.ts`; this file never
 * hard-codes a number. Server-only transitively (via the config import).
 */

export interface ScoreResult {
  tier: Tier;
  score: number;
}

export function scoreApplication(answers: QualificationAnswers): ScoreResult {
  const { points, hardGates, thresholds } = qualificationConfig;

  const score =
    points.ownership[answers.ownership] +
    points.yearsOwned[answers.yearsOwned] +
    points.employees[answers.employees] +
    points.journey[answers.journey] +
    points.revenueRange[answers.revenueRange] +
    (answers.whyNow.trim().length >= points.whyNow.minChars
      ? points.whyNow.points
      : 0);

  // Hard gates first: they override the score entirely.
  if (hardGates.researcherIsNoFit && answers.ownership === "researcher") {
    return { tier: "no-fit", score };
  }
  if (
    hardGates.soloUnder2YearsIsNoFit &&
    answers.employees === "solo" &&
    answers.yearsOwned === "under-2"
  ) {
    return { tier: "no-fit", score };
  }

  const tier: Tier =
    score >= thresholds.qualified
      ? "qualified"
      : score >= thresholds.borderline
        ? "borderline"
        : "no-fit";

  return { tier, score };
}
