# Phase 0 - Contracts, config schema + form copy (gates on owner sign-off)

## Goal

Lock the qualification model, config schema, API shapes, env vars, and the
form/off-ramp copy before implementation. Owner confirms the four assumed
defaults (README), the copy, and Resend account details.

## The form (fields locked from docs/lead-qualification.md)

Multi-step, ~7 questions, trust-first sequencing, visible confidentiality
line, "why" microcopy next to sensitive fields. Ranges only, no dollar
inputs. Steps:

1. **You + the business**: name, business name, "Are you the owner?"
   (Yes / No, I'm a partner or executive / No, I'm researching for someone
   else), industry (short text), years owned (Under 2 / 2-5 / 6-15 / 15+).
2. **Where you are**: employee count (Just me / 2-10 / 11-50 / 51-200 /
   200+), "Where are you in your journey?" (Grow / Stabilize / Sell /
   Transition / Not sure), "What's prompting you to reach out now?"
   (textarea, required non-empty; the config's `minChars` is a scoring
   proxy only, not a validation minimum).
3. **Contact**: email, phone, preferred contact method (Phone / Email /
   Text), and LAST an optional coarse revenue range (Under $500K /
   $500K-$1M / $1M-$5M / $5M-$20M / $20M+ / Prefer not to say).

## Config schema (`src/lib/qualification/config.ts`)

One typed, owner-editable file; changing standards never touches
components. Shape (locked):

```ts
export type Tier = "qualified" | "borderline" | "no-fit";

export const qualificationConfig = {
  // Points per selected option, keyed by field then option value.
  points: {
    ownership: { owner: 3, partner: 1, researcher: 0 },
    yearsOwned: { "under-2": 0, "2-5": 1, "6-15": 2, "15-plus": 3 },
    employees: { solo: 0, "2-10": 1, "11-50": 3, "51-200": 3, "200-plus": 2 },
    journey: { grow: 1, stabilize: 1, sell: 4, transition: 4, unsure: 2 },
    revenueRange: { "under-500k": 0, "500k-1m": 2, "1m-5m": 3, "5m-20m": 3,
      "20m-plus": 2, undisclosed: 1 },
    // Substance proxy for the open-text field: full points at or above
    // minChars, zero below. Substance itself is judged by the operator.
    whyNow: { minChars: 40, points: 2 },
  },
  // Hard gates run before scoring and override it.
  hardGates: {
    researcherIsNoFit: true,   // "researching for someone else" -> tier 3
    soloUnder2YearsIsNoFit: true, // solo AND under 2 years -> tier 3
  },
  // Score thresholds: >= qualified -> tier 1; >= borderline -> tier 2;
  // else tier 3. Max score with the defaults above: 18.
  thresholds: { qualified: 10, borderline: 6 },
} as const;
```

Numbers above are the starting calibration (sell/transition intent
dominates, per the strategy doc); the owner tunes them post-launch by
editing this file only. `scoring.ts` exports
`scoreApplication(answers): { tier: Tier; score: number }` (pure,
unit-tested with fixture answer sets for each tier).

## API contracts

- `POST /api/qualify` - body: the answers (all option values as string
  unions, honeypot field `company_website` must be empty). Validates,
  scores, fire-and-forget sends the branded internal notification email
  (every submission, all tiers; failure logs server-side and NEVER blocks
  or changes the response), returns `{ tier: Tier }` only. 400 invalid,
  429 rate-limited, 500 config error.
- `POST /api/lead-contact` - tier-2 follow-up message: body
  `{ message, preferredTimes? }` plus the original application echo
  (client holds it in state). Sends the Resend email, returns
  `{ ok: true }`.
- Both use the shared limiter (`src/lib/rate-limit.ts`, generalized from
  the jacob module; jacob's import updated) at 5/min/IP.

## Email (Resend via fetch, no SDK dependency)

- `src/lib/email/resend.ts`: `sendLeadEmail(...)` posting to
  `https://api.resend.com/emails`; server-only.
- Env (in `.env.example`): `RESEND_API_KEY`, `LEAD_FROM_EMAIL` (must be a
  Resend-verified sender on the owner's domain), `LEAD_NOTIFY_EMAIL`
  (default `Hello@executivedistrict.com`).
- Two email kinds, both to the internal contact, both branded:
  (a) application notification on every `/api/qualify` submission,
  subject `[Lead: <Tier>] <business name>`, body lists answers, score,
  tier, timestamp; (b) tier-2 follow-up on `/api/lead-contact`, subject
  `[Lead follow-up] <business name>`, adds the applicant's message.
  No confirmation emails to leads (owner decision).
- Branding: shared HTML template in `src/lib/email/template.ts` - navy
  header with the two-line uppercase wordmark, gold accent rule, Inter
  font stack, white body with a simple answers table, slate footer.
  Email HTML requires inline styles with literal hex values; this is the
  ONE sanctioned exception to the no-hex rule and uses the brand hexes
  from `globals.css` (documented in the module and its AGENTS.md).
- The internal contact lives in the qualification config
  (`notifications.internalContact` in `config.ts`) so the owner edits it
  alongside the tiers; `LEAD_FROM_EMAIL` stays env (must match the
  Resend-verified domain). `LEAD_NOTIFY_EMAIL` env var is dropped in
  favor of the config field.

## Frontend contracts (`src/components/sections/book/`)

- `qualify-form.tsx` ("use client"): 3-step form, progress indicator,
  client + server validation, keyboard operable, labels tied to inputs,
  error summary on submit failure. Holds answers in state; on response
  swaps in the tier panel. No tier logic client-side beyond rendering the
  returned tier.
- Tier panels: `tier-qualified.tsx` (reveals the existing
  `BookingCalendar`), `tier-borderline.tsx` (contact step ->
  `/api/lead-contact`, then a confirmation state), `tier-no-fit.tsx`
  (off-ramp copy only).
- `/book` composition: hero copy adjusted to the application framing
  (copy below), calendar no longer rendered on load.

## Form copy (draft for owner approval; deck amendment on approval)

- Step intro beat: "A confidential conversation starts with a few
  questions. We work with a limited number of owners, so we make sure
  every call is worth your time. Nothing you share leaves this
  conversation."
- Why-now label: "What's prompting you to reach out now?" helper: "One or
  two sentences is plenty. This goes straight to the operator you'd meet."
- Revenue helper: "Optional. A range is all we need, so we can match you
  to the right operator."
- Tier 2 panel: "You're a fit for a conversation. A senior operator will
  reach out personally within one business day to find a time. Anything
  you want them to know first?"
- Tier 3 off-ramp: "Based on your answers, we're probably not the right
  partner right now. We embed senior operators in established businesses,
  and we'd be wasting your time to pretend otherwise. If your situation
  changes, we'll be here."

## Acceptance

Confirmed by owner (2026-07-09, second pass): defaults as amended
(internal contact in config emailed for every submission; branded
emails), copy and calibration approved as drafted, Resend ready
(`RESEND_API_KEY` supplied later; live-send test deferred until then).
Phase 1 may begin.
