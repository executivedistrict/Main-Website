# AGENTS.md - `src/app/api/qualify/`

Scores the `/book` application server-side (plan 006). Read
[`src/app/api/AGENTS.md`](../AGENTS.md) and the locked contracts in
`plans/006-lead-qualification/phase-0-contracts.md` first.

- Body: the application answers (option values are locked string unions;
  see `src/lib/qualification/types.ts`) plus the honeypot field
  `company_website`, which MUST be empty (400 otherwise).
- Response: `{ tier }` and nothing else. No score, no thresholds, no rules
  in the response or the client bundle.
- Every submission, all tiers, fire-and-forget emails the internal contact
  (`notifications.internalContact` in `src/lib/qualification/config.ts`)
  with subject `[Lead: <Tier>] <business name>`. Email failure or missing
  Resend env logs server-side and never blocks or changes the response.
- 400 invalid, 429 rate-limited (shared limiter, `qualify:` key prefix).
- Logic lives in `src/lib/qualification/` and `src/lib/email/`; keep this
  route thin (parse, validate, delegate, map errors).
