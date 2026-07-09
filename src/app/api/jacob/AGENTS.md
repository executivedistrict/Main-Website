# AGENTS.md - `src/app/api/jacob/`

API surface for the Jacob AI concierge (Tavus conversational video).
Contracts are locked in `plans/004-jacob-concierge/phase-0-contracts.md`;
read it before changing anything here.

- `conversation/route.ts` - `POST` only. Creates one Tavus session per
  intentional user click and returns ONLY `{ "conversation_url": string }`.
  Errors: 429 (rate limit, 5/min/IP best-effort), 500 (missing env vars or
  upstream failure; generic message, specifics logged server-side).
- Tavus credentials (`TAVUS_API_KEY`, `TAVUS_REPLICA_ID`,
  `TAVUS_PERSONA_ID`) are server-only and must never leave this layer.
- Never pre-warm or pre-create sessions: each one burns paid Tavus minutes.
- Logic lives in `src/lib/jacob/`; keep the route thin.
