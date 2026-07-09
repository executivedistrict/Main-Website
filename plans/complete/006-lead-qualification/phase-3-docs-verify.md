# Phase 3 - Wiring, docs, verification (serial spine, orchestrator)

## Goal

Compose the gated `/book` page, align the docs, and verify end to end.

## Deliverables

1. `src/app/book/page.tsx`: application form replaces the on-load
   calendar; hero/intro copy adjusted per the approved Phase 0 copy;
   metadata updated if the copy changed it.
2. Copy deck amendment recording the approved form/off-ramp copy
   (plans/complete/005-site-simplification/copy-deck.md, Amendments
   section), per the copy law.
3. Docs: `docs/lead-qualification.md` gains a short "Implemented by plan
   006" pointer (strategy content unchanged); AGENTS.md map updates
   (`src/lib/`, `src/app/`, `src/components/sections/`); CLAUDE.md only
   if its booking references are now wrong.
4. Verification: `pnpm lint` + `pnpm typecheck` + `pnpm build`; live
   walkthrough of all three tiers on the dev server; Resend live send
   with the owner's key (or explicitly deferred); rate-limit and honeypot
   checks; keyboard + mobile pass on the form; confirm the calendar is
   unreachable without a qualified submission.
5. `PROGRESS.md` + `plans/index.md` updated per phase; plan moved to
   `plans/complete/` when done (live Resend test done or owner-deferred).

## Acceptance

All checks pass; strategy doc, config, and shipped behavior agree.
