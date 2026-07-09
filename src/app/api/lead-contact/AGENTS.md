# AGENTS.md - `src/app/api/lead-contact/`

Tier-2 (borderline) follow-up endpoint for the `/book` application
(plan 006). Read [`src/app/api/AGENTS.md`](../AGENTS.md) and the locked
contracts in `plans/006-lead-qualification/phase-0-contracts.md` first.

- Body: `{ message, preferredTimes?, application }` where `application`
  is the original answers echo the client holds in state (re-validated
  here with `parseQualificationAnswers`; never trusted).
- Sends the branded `[Lead follow-up] <business name>` email to the
  internal contact (`notifications.internalContact` in
  `src/lib/qualification/config.ts`), then returns `{ ok: true }`.
- Unlike `/api/qualify`, the email IS the point of this route: missing
  Resend env or a failed send returns a generic 500 (details logged
  server-side only).
- 400 invalid, 429 rate-limited (shared limiter, `lead-contact:` key
  prefix).
