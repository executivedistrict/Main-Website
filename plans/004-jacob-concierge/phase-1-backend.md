# Phase 1 - Backend route + lib (parallel with Phase 2)

## Goal

Implement the server side: `src/lib/jacob/` modules and the
`POST /api/jacob/conversation` Route Handler, per the Phase 0 contracts.

## Scope

- `src/lib/jacob/context.ts`, `tavus.ts`, `rate-limit.ts`, `AGENTS.md`
- `src/app/api/jacob/conversation/route.ts`, plus `AGENTS.md` in
  `src/app/api/` and `src/app/api/jacob/`
- `.env.example` documenting the three `TAVUS_*` vars

## Not in scope

- Any component or hero work (Phase 2/3). No CORS layer. No health endpoint.
- Editing the context wording (verbatim copy from the plugin, see
  `open-questions.md`).

## Contracts received

`phase-0-contracts.md` verbatim: endpoint shape, error mapping, env names,
module signatures, Tavus request properties.

## Deliverables

1. Route handler flow: validate env vars (500 + server-side log if missing),
   resolve client IP from `x-forwarded-for` (first hop) with `"unknown"`
   fallback, rate-limit check (429), parse + trim + truncate body fields to
   100 chars, `buildContext`, `createConversation`, return
   `{ conversation_url }`. Map upstream 401 to a generic 500 message and
   upstream 429 to a 429, mirroring the plugin's error table.
2. `export const runtime = "nodejs"` and no caching (`dynamic = "force-dynamic"`
   or POST-only default behavior confirmed against Next 16 docs in
   `node_modules/next/dist/docs/`).

## Agent instructions

Read first (authoritative): this file, `phase-0-contracts.md`,
`docs/jacob-concierge-plugin-v2/server.js` (source being ported), `CLAUDE.md`,
`src/AGENTS.md`, `src/app/AGENTS.md`, `src/lib/AGENTS.md`.
Do NOT touch: anything outside the Scope list above; especially
`src/components/`, `docs/`, existing lib files.

## Acceptance

- `pnpm typecheck` and `pnpm lint` pass.
- `curl -X POST localhost:3000/api/jacob/conversation` with no env vars set
  returns the generic 500 JSON (and logs specifics to the server console).
- Six rapid requests from one IP: the sixth returns 429.
- With real keys (if available): 200 with a `conversation_url`; no other
  fields in the response body.
