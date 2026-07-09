# AGENTS.md - `src/app/api/qualify/`

Scores the `/book` application server-side (plan 006). Read
[`src/app/api/AGENTS.md`](../AGENTS.md) and the locked contracts in
`plans/006-lead-qualification/phase-0-contracts.md` first.

- Body: the application answers (option values are locked string unions;
  see `src/lib/qualification/types.ts`) plus the honeypot field
  `company_website`, which MUST be empty (400 otherwise). The application
  carries NO contact details (owner decision, 2026-07-09): those are
  collected post-tier, by the booking calendar (qualified) or
  `/api/lead-contact` (borderline / no-fit).
- Response: `{ tier }` and nothing else. No score, no thresholds, no rules
  in the response or the client bundle.
- Borderline and no-fit submissions fire-and-forget an email to the
  internal contact (`notifications.internalContact` in
  `src/lib/qualification/config.ts`) with subject
  `[Lead: <Tier>] <business name>`. Qualified submissions send NO internal
  email (owner decision, 2026-07-09): the booking calendar feeds the CRM
  directly, so the booking is the notification. Email failure or missing
  Resend env logs server-side and never blocks or changes the response.
- 400 invalid, 429 rate-limited (shared limiter, `qualify:` key prefix).
- Logic lives in `src/lib/qualification/` and `src/lib/email/`; keep this
  route thin (parse, validate, delegate, map errors).
