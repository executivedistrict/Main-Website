# AGENTS.md - `src/app/api/lead-contact/`

Post-tier follow-up endpoint for the `/book` application (plan 006):
tier 2 (borderline, an operator reaches out) and tier 3 (no-fit, the
applicant clicked "I'm stuck and need help"). Qualified leads never post
here; they book on the calendar. Read
[`src/app/api/AGENTS.md`](../AGENTS.md) and the locked contracts in
`plans/006-lead-qualification/phase-0-contracts.md` first.

- Body: `{ message, preferredTimes?, tier, contact, application }` where
  `tier` is `"borderline" | "no-fit"`, `contact` is the applicant's
  contact details (re-validated with `parseContactDetails`; this route is
  where contact info is collected, the application carries none), and
  `application` is the original answers echo the client holds in state
  (re-validated with `parseQualificationAnswers`; never trusted).
- Sends the branded `[Lead follow-up: <Tier>] <business name>` email
  (contact rows + application rows) to the internal contact
  (`notifications.internalContact` in
  `src/lib/qualification/config.ts`), then returns `{ ok: true }`.
- Unlike `/api/qualify`, the email IS the point of this route: missing
  Resend env or a failed send returns a generic 500 (details logged
  server-side only).
- 400 invalid, 429 rate-limited (shared limiter, `lead-contact:` key
  prefix).
