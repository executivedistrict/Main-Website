# Phase 0 - Contracts & Scaffolding (orchestrator only)

## Goal

Lock the API shape, module boundaries, component API, and env var names before
any implementation agent runs. Scaffold the directories.

## Contracts

### Endpoint

`POST /api/jacob/conversation`

Request body (JSON, both fields optional, each capped at 100 chars after
trim; longer values are truncated, not rejected):

```json
{ "visitorName": "John Smith", "visitorCompany": "Acme Corp" }
```

Responses (wire format keeps the plugin's `conversation_url` key for parity
with the delivered plugin docs):

- `200` `{ "conversation_url": string }`
- `429` `{ "error": string }` (rate limited: 5 requests / minute / IP,
  best-effort in-memory)
- `500` `{ "error": string }` (missing env vars or Tavus failure; generic
  message, details logged server-side only)

`GET` is not implemented (no health endpoint; Next.js provides its own
liveness signals).

### Env vars (same names as the plugin; documented in `.env.example`)

- `TAVUS_API_KEY`, `TAVUS_REPLICA_ID`, `TAVUS_PERSONA_ID` (all server-only;
  never `NEXT_PUBLIC_`)
- `ALLOWED_ORIGINS` and `NODE_ENV` from the plugin are dropped: the route is
  same-origin, so the plugin's CORS layer is not ported.

### Modules (`src/lib/jacob/`)

- `context.ts` - exports `DEFAULT_CONTEXT`, copied VERBATIM from
  `docs/jacob-concierge-plugin-v2/server.js` (lines 35-71), plus
  `buildContext(visitorName?, visitorCompany?)` reproducing the plugin's
  visitor-info concatenation. The context string must not be edited or
  "fixed" (owner follow-up, see `open-questions.md`). Add
  `import "server-only"`.
- `tavus.ts` - `createConversation(ctx: { context: string; conversationName:
  string }): Promise<string>` posts to `https://tavusapi.com/v2/conversations`
  with native `fetch`, 15s `AbortSignal.timeout`, and the plugin's properties
  verbatim: `max_call_duration: 1800`, `participant_left_timeout: 30`,
  `enable_recording: false`, `language: "english"`. Returns the
  `conversation_url`; throws a typed error carrying the upstream status.
  Add `import "server-only"`.
- `rate-limit.ts` - `checkRateLimit(key: string): boolean`, in-memory Map,
  window 60s, max 5. No `setInterval`: prune expired entries lazily inside
  the check (serverless-safe). Framework-agnostic, no imports.

### Component API (`src/components/jacob/`)

- `jacob-hero-card.tsx` - `JacobHeroCard` (client): the hero visual. Renders
  Jacob's photo (`/images/team/jacob-mirandette.png` via `next/image`), an
  "AI Concierge" eyebrow, one invitation line, and a play-style affordance.
  The whole card is a single `<button>` with a descriptive `aria-label`.
  Owns the open state and renders `JacobDialog`.
- `jacob-dialog.tsx` - `JacobDialog` (client):
  `{ open: boolean; onOpenChange(open: boolean): void }`. Built on shadcn/ui
  Dialog (Radix) for focus trap / restore, Escape, and backdrop close. On
  open it POSTs to the endpoint and drives the plugin's state machine:
  `loading | ready | error` with a retry button. Closing discards the
  session state (`participant_left_timeout` ends the Tavus call). Iframe:
  `allow="camera; microphone; autoplay; fullscreen"`, `allowFullScreen`,
  descriptive `title`. Near-fullscreen on mobile, centered max-w-[900px] /
  85vh on desktop. Token-styled navy surface; no hex in JSX.

### Scaffold created in this phase

Empty directories with `AGENTS.md` stubs: `src/app/api/` (+ `jacob/`),
`src/lib/jacob/`, `src/components/jacob/`. `PROGRESS.md` created.

## Acceptance

- This file reviewed against the plugin sources; scaffold committed to the
  working tree; `PROGRESS.md` shows Phase 0 complete before any agent runs.
