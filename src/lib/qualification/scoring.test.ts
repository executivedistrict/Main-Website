import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { qualificationConfig } from "./config";
import { scoreApplication } from "./scoring";
import type { QualificationAnswers } from "./types";

/**
 * Unit tests for the pure scoring engine (run via `pnpm test`).
 * Fixtures cover each tier, every hard gate, and the exact threshold
 * and whyNow-length boundaries from the Phase 0 contract calibration.
 */

const LONG_WHY_NOW =
  "I am planning to step back in the next two years and need a real plan for the transition.";
const SHORT_WHY_NOW = "Just curious.";

function answers(overrides: Partial<QualificationAnswers> = {}): QualificationAnswers {
  return {
    name: "Pat Doe",
    businessName: "Doe Manufacturing",
    ownership: "owner",
    industry: "Manufacturing",
    yearsOwned: "6-15",
    employees: "11-50",
    journey: "grow",
    whyNow: LONG_WHY_NOW,
    email: "pat@example.com",
    phone: "616-555-0100",
    contactMethod: "phone",
    revenueRange: "1m-5m",
    ...overrides,
  };
}

describe("scoreApplication tiers", () => {
  it("scores a clear-fit owner as qualified (max calibration: 18)", () => {
    const result = scoreApplication(
      answers({
        yearsOwned: "15-plus",
        employees: "11-50",
        journey: "sell",
        revenueRange: "1m-5m",
      })
    );
    // owner 3 + 15-plus 3 + 11-50 3 + sell 4 + 1m-5m 3 + whyNow 2 = 18
    assert.equal(result.score, 18);
    assert.equal(result.tier, "qualified");
  });

  it("scores a borderline applicant as borderline", () => {
    const result = scoreApplication(
      answers({
        yearsOwned: "2-5",
        employees: "2-10",
        journey: "stabilize",
        revenueRange: "500k-1m",
        whyNow: SHORT_WHY_NOW,
      })
    );
    // owner 3 + 2-5 1 + 2-10 1 + stabilize 1 + 500k-1m 2 + whyNow 0 = 8
    assert.equal(result.score, 8);
    assert.equal(result.tier, "borderline");
  });

  it("scores a weak-signal applicant as no-fit by score alone", () => {
    const result = scoreApplication(
      answers({
        ownership: "partner",
        yearsOwned: "2-5",
        employees: "2-10",
        journey: "grow",
        revenueRange: "under-500k",
        whyNow: SHORT_WHY_NOW,
      })
    );
    // partner 1 + 2-5 1 + 2-10 1 + grow 1 + under-500k 0 + whyNow 0 = 4
    assert.equal(result.score, 4);
    assert.equal(result.tier, "no-fit");
  });
});

describe("hard gates", () => {
  it("gates a researcher to no-fit even with a qualifying score", () => {
    const result = scoreApplication(
      answers({
        ownership: "researcher",
        yearsOwned: "15-plus",
        employees: "51-200",
        journey: "sell",
        revenueRange: "5m-20m",
      })
    );
    // researcher 0 + 3 + 3 + 4 + 3 + 2 = 15, above the qualified threshold.
    assert.ok(result.score >= qualificationConfig.thresholds.qualified);
    assert.equal(result.tier, "no-fit");
  });

  it("gates solo AND under-2-years to no-fit even with a qualifying score", () => {
    const result = scoreApplication(
      answers({
        employees: "solo",
        yearsOwned: "under-2",
        journey: "sell",
        revenueRange: "5m-20m",
      })
    );
    // owner 3 + under-2 0 + solo 0 + sell 4 + 5m-20m 3 + whyNow 2 = 12.
    assert.ok(result.score >= qualificationConfig.thresholds.qualified);
    assert.equal(result.tier, "no-fit");
  });

  it("does not gate solo alone or under-2-years alone", () => {
    const soloOnly = scoreApplication(answers({ employees: "solo", journey: "sell" }));
    assert.notEqual(soloOnly.tier, "no-fit");
    const youngOnly = scoreApplication(answers({ yearsOwned: "under-2", journey: "sell" }));
    assert.notEqual(youngOnly.tier, "no-fit");
  });
});

describe("threshold boundaries (qualified >= 10, borderline >= 6)", () => {
  it("exactly 10 is qualified", () => {
    const result = scoreApplication(
      answers({ journey: "grow", revenueRange: "undisclosed", whyNow: SHORT_WHY_NOW,
        yearsOwned: "15-plus" })
    );
    // owner 3 + 15-plus 3 + 11-50 3 + grow 1 + undisclosed 1 + whyNow 0 = 11
    // Adjust to exactly 10: drop yearsOwned to 6-15 (2).
    const exact = scoreApplication(
      answers({ journey: "grow", revenueRange: "undisclosed", whyNow: SHORT_WHY_NOW })
    );
    // owner 3 + 6-15 2 + 11-50 3 + grow 1 + undisclosed 1 + whyNow 0 = 10
    assert.equal(exact.score, 10);
    assert.equal(exact.tier, "qualified");
    assert.equal(result.score, 11);
    assert.equal(result.tier, "qualified");
  });

  it("exactly 9 is borderline", () => {
    const result = scoreApplication(
      answers({ employees: "2-10", journey: "grow", revenueRange: "500k-1m",
        whyNow: SHORT_WHY_NOW })
    );
    // owner 3 + 6-15 2 + 2-10 1 + grow 1 + 500k-1m 2 + whyNow 0 = 9
    assert.equal(result.score, 9);
    assert.equal(result.tier, "borderline");
  });

  it("exactly 6 is borderline", () => {
    const result = scoreApplication(
      answers({ yearsOwned: "2-5", employees: "2-10", journey: "grow",
        revenueRange: "under-500k", whyNow: SHORT_WHY_NOW })
    );
    // owner 3 + 2-5 1 + 2-10 1 + grow 1 + under-500k 0 + whyNow 0 = 6
    assert.equal(result.score, 6);
    assert.equal(result.tier, "borderline");
  });

  it("exactly 5 is no-fit", () => {
    const result = scoreApplication(
      answers({ yearsOwned: "under-2", employees: "2-10", journey: "grow",
        revenueRange: "under-500k", whyNow: SHORT_WHY_NOW })
    );
    // owner 3 + under-2 0 + 2-10 1 + grow 1 + under-500k 0 + whyNow 0 = 5
    assert.equal(result.score, 5);
    assert.equal(result.tier, "no-fit");
  });
});

describe("whyNow substance proxy", () => {
  const { minChars, points } = qualificationConfig.points.whyNow;

  it("awards full points at exactly minChars", () => {
    const base = scoreApplication(answers({ whyNow: "x".repeat(minChars - 1) }));
    const atBoundary = scoreApplication(answers({ whyNow: "x".repeat(minChars) }));
    assert.equal(atBoundary.score - base.score, points);
  });

  it("ignores surrounding whitespace when measuring length", () => {
    const padded = scoreApplication(
      answers({ whyNow: `  ${"x".repeat(minChars - 1)}  ` })
    );
    const unpadded = scoreApplication(answers({ whyNow: "x".repeat(minChars - 1) }));
    assert.equal(padded.score, unpadded.score);
  });
});
