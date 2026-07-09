# Phase 1 - Backend: config, scoring, Resend routes (parallel with Phase 2)

## Goal

Implement `src/lib/qualification/` (config, types, scoring), the shared
rate limiter move, `src/lib/email/resend.ts`, and both route handlers per
the Phase 0 contracts.

## Scope

- `src/lib/qualification/{config,types,scoring}.ts` + `AGENTS.md`
- `src/lib/email/{resend,template}.ts` + `AGENTS.md` (branded HTML template)
- `src/lib/rate-limit.ts` (moved/generalized from `src/lib/jacob/rate-limit.ts`;
  update the jacob conversation route's import; delete the old module)
- `src/app/api/qualify/route.ts`, `src/app/api/lead-contact/route.ts` +
  `AGENTS.md` files
- `.env.example` additions
- Scoring unit tests (fixtures per tier, hard-gate cases, threshold edges)
  using the repo's test setup; if none exists, a minimal script invoked by
  `pnpm test` is added (confirm approach against package.json first)

## Not in scope

Components (Phase 2), page composition (Phase 3), any Jacob behavior
change beyond the import path.

## Rules

- Contracts verbatim (schema, endpoints, error table, env names).
- Secrets server-only; responses carry the tier and nothing else.
- Email failure logs server-side and never blocks the `{ tier }` response.
- No new dependencies (Resend via fetch).

## Acceptance

- `pnpm typecheck` + `pnpm lint` pass; scoring tests pass.
- `curl` checks: valid qualified/borderline/no-fit fixture bodies return
  the right tier; honeypot-filled body 400s; sixth rapid request 429s.
  With Resend env missing: `/api/qualify` still returns the tier (email
  skipped, error logged); `/api/lead-contact` returns the generic 500.
  Verify the rendered email HTML by writing a sample to a file and
  eyeballing structure (no live send until the key lands).
