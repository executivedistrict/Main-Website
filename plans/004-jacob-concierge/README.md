# 004 - Jacob AI Concierge (Tavus) in the Home Hero

Port the delivered `docs/jacob-concierge-plugin-v2/` plugin (Express + untyped
React widget) into this Next.js app with no dedicated backend, and make Jacob
the first thing visitors see: the home hero's visual column becomes an
interactive "Meet Jacob" card that opens a full-screen video conversation.

## Goal

- `POST /api/jacob/conversation` Route Handler replaces the Express router.
  Tavus credentials stay server-side; the browser receives only a conversation
  URL; sessions are created only on an intentional click.
- A typed, token-styled, accessible widget (`src/components/jacob/`) replaces
  `JacobTavusWidget.jsx`: trigger card in the hero, modal dialog with focus
  trap, loading / error / retry states preserved from the plugin.
- Hero option A: the right-hand hero photo is replaced by the Meet Jacob card
  (using `/images/team/jacob-mirandette.png`). Left column copy is unchanged.
- Jacob's conversational context ships VERBATIM from the plugin's `server.js`,
  even where it conflicts with site copy. Reconciling it is an owner decision,
  tracked in `open-questions.md`, not something this plan fixes.

## Phase map

| Phase | Name | Mode |
| ----- | ---- | ---- |
| 0 | Contracts & scaffolding ([phase-0-contracts.md](./phase-0-contracts.md)) | Orchestrator only |
| 1 | Backend route + lib ([phase-1-backend.md](./phase-1-backend.md)) | Parallel with Phase 2 |
| 2 | Widget components ([phase-2-widget.md](./phase-2-widget.md)) | Parallel with Phase 1, then reviewer |
| 3 | Hero integration, docs, verification ([phase-3-hero-docs.md](./phase-3-hero-docs.md)) | Serial spine |

## Write surface (the only paths this plan may touch)

- `src/app/api/jacob/conversation/route.ts` (+ `src/app/api/` and
  `src/app/api/jacob/` `AGENTS.md` files, new directories)
- `src/lib/jacob/` (context, Tavus client, rate limiter, `AGENTS.md`)
- `src/components/jacob/` (trigger card, dialog, `AGENTS.md`)
- `src/components/sections/home/home-hero.tsx` and
  `src/components/sections/home/content.ts` (hero card copy additions only;
  existing reproduced copy is untouched)
- `src/components/ui/dialog.tsx` if shadcn Dialog is added (via shadcn CLI)
- `.env.example` (new), `CLAUDE.md` (copy-rule amendment only),
  `src/app/AGENTS.md`, `src/components/AGENTS.md`, `src/AGENTS.md`
  (directory-map updates only)
- `plans/004-jacob-concierge/` and `plans/index.md`

Everything else is off-limits. `docs/jacob-concierge-plugin-v2/` is read-only
reference material and must not be modified.

## Orchestration rules

1. Phase 0 must merge before any Phase 1+ agent runs.
2. Phases 1 and 2 touch disjoint trees and run as a parallel fan-out, followed
   by a reviewer agent that reads the phase specs + diff and reports
   divergence (verdict: BLOCKING / NON-BLOCKING / CLEAN).
3. Phase 3 is a serial spine (hero wiring depends on both prior phases).
4. The orchestrator never delegates understanding; agents receive the Phase 0
   contracts verbatim and an explicit "do not touch" list.

## Success definition

- Clicking the hero card opens the dialog, creates one Tavus session via the
  API route, and renders the conversation iframe (camera / mic permissions).
- No Tavus secret or ID ever reaches the client bundle or responses.
- Escape and backdrop close the dialog; focus is trapped while open and
  restored on close; the card and dialog work on mobile widths.
- `pnpm lint`, `pnpm typecheck`, `pnpm build` pass. Live end-to-end test
  requires real `TAVUS_*` keys from the owner (tracked in open-questions).

## Out of scope

- Rewriting Jacob's conversational context (owner follow-up, see
  `open-questions.md`).
- Distributed rate limiting (in-memory best-effort only; upgrade path noted
  in the backend phase).
- Placing Jacob on any page other than the home hero (a floating button on
  other pages is a possible follow-on, not part of this plan).
- Lead capture / visitor-name prefill UI (the API accepts the fields; no form
  is built).

## Edge cases addressed up front

- Serverless instances: rate limiter must not rely on `setInterval`; cleanup
  happens lazily on access.
- Cost control: no session pre-warming; session capped at 30 minutes by the
  Tavus `max_call_duration` property; one session per dialog open.
- Abuse: `visitorName` / `visitorCompany` length-capped before entering the
  LLM context.
- Missing env vars: route returns a 500 with a generic message and logs the
  specifics server-side only.
- The home page is under the "1:1 production copy" rule; this plan is the
  approved deviation and amends the CLAUDE.md note so future agents do not
  revert Jacob out of the hero.

## Related plans

No deferred plans flagged as related: `deferred/003-integrations` wires the
removed plan-001 apply/contact shells (Supabase / Resend / Cal.com) and is
neither a predecessor nor a follow-on to this work.
