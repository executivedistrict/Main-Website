import "server-only";

import type { Tier } from "./types";

/**
 * Owner-editable qualification standards (plan 006, Phase 0 contract).
 * Changing tiers, points, gates, or the internal notification address
 * happens HERE and only here; components and routes never hard-code a
 * rule. Server-only: these rules must never reach the client bundle.
 */

export type { Tier };

export const qualificationConfig = {
  // Points per selected option, keyed by field then option value.
  points: {
    ownership: { owner: 3, partner: 1, researcher: 0 },
    yearsOwned: { "under-2": 0, "2-5": 1, "6-15": 2, "15-plus": 3 },
    employees: { solo: 0, "2-10": 1, "11-50": 3, "51-200": 3, "200-plus": 2 },
    journey: { grow: 1, stabilize: 1, sell: 4, transition: 4, unsure: 2 },
    revenueRange: {
      "under-500k": 0,
      "500k-1m": 2,
      "1m-5m": 3,
      "5m-20m": 3,
      "20m-plus": 2,
      undisclosed: 1,
    },
    // Substance proxy for the open-text field: full points at or above
    // minChars, zero below. Substance itself is judged by the operator.
    whyNow: { minChars: 40, points: 2 },
  },
  // Hard gates run before scoring and override it.
  hardGates: {
    researcherIsNoFit: true, // "researching for someone else" -> tier 3
    soloUnder2YearsIsNoFit: true, // solo AND under 2 years -> tier 3
  },
  // Score thresholds: >= qualified -> tier 1; >= borderline -> tier 2;
  // else tier 3. Max score with the defaults above: 18.
  thresholds: { qualified: 10, borderline: 6 },
  // Where every application and follow-up notification is sent. Edit the
  // address here; the sender address is hard-coded in
  // src/lib/email/resend.ts (the authorized sender for the API key).
  notifications: { internalContact: "hello@executivedistrict.com" },
} as const;
