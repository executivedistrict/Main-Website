# AGENTS.md - `src/app/api/`

Next.js Route Handlers (the app's server-side API; there is no dedicated
backend). Read [`/CLAUDE.md`](../../../CLAUDE.md) and
[`src/app/AGENTS.md`](../AGENTS.md) first.

## Rules

- One route per folder (`<name>/route.ts`), App Router conventions. Confirm
  Route Handler APIs against `node_modules/next/dist/docs/` (Next.js 16).
- Secrets come from server-only env vars, never `NEXT_PUBLIC_*`, and must
  never appear in a response body or client bundle.
- Responses are JSON with a deliberate, minimal shape; log details
  server-side, return generic messages to the client.
- Business logic lives in `src/lib/`; route files stay thin (parse,
  validate, delegate, map errors).

## Routes

- `jacob/conversation/` - creates a Tavus session for the Jacob AI
  concierge (see `jacob/AGENTS.md` and `plans/004-jacob-concierge/`).
- `qualify/` - scores the `/book` application and returns `{ tier }` only
  (see `qualify/AGENTS.md` and `plans/006-lead-qualification/`).
- `lead-contact/` - tier-2 follow-up message email (see
  `lead-contact/AGENTS.md`).

All three share the best-effort limiter in `src/lib/rate-limit.ts`
(5/min/IP, keys namespaced per route).
