# Progress - 004 Jacob Concierge

| Phase | Name | Status |
| ----- | ---- | ------ |
| 0 | Contracts & scaffolding | ✅ Complete |
| 1 | Backend route + lib | ✅ Complete |
| 2 | Widget components | ✅ Complete |
| 3 | Hero integration, docs, verification | ✅ Complete (live-key E2E outstanding) |

Legend: 🔲 Drafted · 🔄 In progress · ✅ Complete

## Phase summaries

### Phase 0 - Contracts & scaffolding (shipped)

Contracts locked in `phase-0-contracts.md` as drafted (no changes during
scaffolding). Scaffolded `src/app/api/` + `src/app/api/jacob/`,
`src/lib/jacob/`, and `src/components/jacob/`, each with a real `AGENTS.md`
(not a stub) documenting rules, contracts pointer, and the verbatim-context
guardrail. Orchestrator-only, no agents run before completion.

### Phase 1 - Backend route + lib (shipped)

As specced: `src/lib/jacob/{context,tavus,rate-limit}.ts` and
`src/app/api/jacob/conversation/route.ts`, plus `.env.example`.
`DEFAULT_CONTEXT` verified byte-identical to the plugin source (diffed).
Runtime-verified: generic 500 without env vars (specifics only in server
logs), upstream 401 mapped to generic 500, sixth rapid request 429. Route is
dynamic (`f`) in the build. Deviation beyond the declared surface:
`.gitignore` gained `!.env.example` so the deliverable is not ignored by the
existing `.env*` rule. Zero new dependencies.

### Phase 2 - Widget components (shipped)

As specced: `src/components/jacob/{jacob-hero-card,jacob-dialog}.tsx`, with
the shadcn/ui Dialog added as `src/components/ui/dialog.tsx` and restyled to
tokens. The plugin's state machine (loading / error + retry / ready iframe)
is preserved; focus trap/restore, Escape, backdrop close, and scroll lock
come from Radix. A11y audit against the CLAUDE.md checklist passed.
shadcn CLI fallout beyond the declared surface: `components.json` (new),
`package.json` + `pnpm-lock.yaml` (adds the consolidated `radix-ui`
package), `src/components/ui/index.ts` barrel export, and a Dialog entry in
`src/components/ui/AGENTS.md`.

### Fan-out review (Phases 1 + 2)

Reviewer verdict NON-BLOCKING. Confirmed clean: contracts, error table,
verbatim context, rate-limit semantics, no secret reaches the client, tokens
only, a11y items. Finding carried into Phase 3: under React StrictMode (dev)
the dialog's session-creating effect runs twice, firing two paid Tavus
sessions per open; fix by deduping session creation (production unaffected).
Write-surface deviations above recorded as accepted.

### Phase 3 - Hero integration, docs, verification (shipped)

Fixed the reviewer's StrictMode finding: session creation in `JacobDialog`
is now deduped with a per-open/per-attempt ref key, and stale responses are
guarded by a generation counter bumped on close (one paid Tavus session per
open, even in dev). Hero: right column swapped from the boardroom photo to
`JacobHeroCard` (photo stays in `public/images/`); card copy added to
`content.ts` as clearly-marked new writing. Docs: CLAUDE.md copy rule now
records the hero card as the one approved deviation; directory maps updated
in `src/`, `src/app/`, `src/components/` AGENTS.md files. Verification:
lint (0 errors), typecheck, build (route `f`, all pages static) pass; live
page renders the card with correct ARIA; API error path returns the generic
500 and the dialog's error + retry state covers it.

Outstanding: live end-to-end test with real `TAVUS_*` keys (open-questions
item 2). The plan stays active until the owner supplies keys or explicitly
defers the live test; then it moves to `plans/complete/`.
