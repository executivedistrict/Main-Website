# AGENTS.md - `src/lib/jacob/`

Server-side modules for the Jacob AI concierge. Read
[`src/lib/AGENTS.md`](../AGENTS.md) and
`plans/004-jacob-concierge/phase-0-contracts.md` (locked contracts) first.

- `context.ts` - Jacob's conversational context, copied VERBATIM from
  `docs/jacob-concierge-plugin-v2/server.js`. **Do not edit or "fix" the
  wording**, even where it contradicts site copy: reconciling it is an open
  owner decision (`plans/004-jacob-concierge/open-questions.md`).
- `tavus.ts` - thin Tavus API client (`fetch`, 15s timeout). Server-only.

Rate limiting is NOT here anymore: the limiter was generalized and moved to
`src/lib/rate-limit.ts` (same semantics: 5/min/key, lazy pruning, no
timers), shared with the lead-qualification routes.

`context.ts` and `tavus.ts` import `"server-only"`; nothing in this
directory may be imported from client components.
