# AGENTS.md - `src/lib/qualification/`

Server-side lead-qualification model for the gated `/book` application
(plan 006). Read [`src/lib/AGENTS.md`](../AGENTS.md) first; the locked
contracts are in `plans/006-lead-qualification/phase-0-contracts.md` and
the strategy in `docs/lead-qualification.md`.

## What lives here

- `types.ts` - the `Tier`, option-value string unions,
  `QualificationAnswers` + `parseQualificationAnswers()` and
  `ContactDetails` + `parseContactDetails()` (unknown -> parsed or null).
  The application deliberately carries no contact details (owner decision,
  2026-07-09); contact info is collected post-tier (booking calendar for
  qualified, `/api/lead-contact` for the rest) and validated as
  `ContactDetails`. Client-safe on purpose: the form imports these types.
  No rules or secrets here.
- `config.ts` - **the one owner-editable file**: option points, hard
  gates, tier thresholds, and `notifications.internalContact` (the address
  every lead email goes to). Imports `"server-only"`; the rules must never
  reach the client bundle. Retuning qualification = editing this file only.
- `scoring.ts` - `scoreApplication(answers): { tier, score }`. Pure:
  hard gates first, then points, then thresholds. Never hard-code a number
  here; everything comes from `config.ts`.
- `scoring.test.ts` + `test-setup.mjs` - `node --test` unit tests run by
  `pnpm test`. The setup file registers a resolve hook that stubs the
  `"server-only"` import and resolves extensionless relative `.ts` imports
  so Node's native type stripping can run the sources without a bundler.

## Rules

- Option values are locked string unions from the Phase 0 contract; do not
  rename them without a contract change (the form, routes, scoring, and
  email template all share them).
- `config.ts` stays `as const` and typed; `scoring.ts` stays pure and
  unit-tested. If you change scoring behavior, update the fixtures.
- Nothing in this directory may be imported from a client component except
  `types.ts`.
