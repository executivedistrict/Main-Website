# AGENTS.md - `src/lib/email/`

Internal lead-notification email for the qualification flow (plan 006).
Read [`src/lib/AGENTS.md`](../AGENTS.md) first; contracts in
`plans/006-lead-qualification/phase-0-contracts.md`.

## What lives here

- `resend.ts` - `sendLeadEmail({ to, subject, html })` plus
  `isResendConfigured()`. A plain fetch POST to
  `https://api.resend.com/emails`; deliberately no Resend SDK. Server-only.
  Env: `RESEND_API_KEY` only. The FROM address is hard-coded in
  `resend.ts` (`Website <notifications@workwithcoba.com>`, the authorized
  sender for the key; owner decision, not configuration). The recipient is
  `notifications.internalContact` in `src/lib/qualification/config.ts`,
  not env.
- `template.ts` - `renderLeadEmail(...)` + `escapeHtml(...)`: the shared
  branded HTML layout (navy header with the two-line uppercase wordmark,
  gold accent rule, Inter/Arial stack, white body with an answers table,
  slate footer).

## Rules

- **Hex exception**: email HTML cannot use Tailwind tokens, so
  `template.ts` uses inline styles with literal hex values. This is the
  ONE sanctioned exception to the project's no-hard-coded-colors rule; the
  hexes mirror `src/app/globals.css` (navy `#0f1f3d`, gold `#c8973e`,
  slate `#2c3e5a`). Do not copy this pattern anywhere else.
- **Escape everything user-provided.** Any lead-supplied string
  interpolated into the HTML must go through `escapeHtml` (the template's
  render helpers already do this; keep it that way).
- Both files import `"server-only"`; never import them from a client
  component. `RESEND_API_KEY` must never appear in a response body.
- No confirmation emails to leads (owner decision); everything here goes
  to the internal contact.
