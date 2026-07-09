# Phase 2 - Docs, redirect, verification (serial spine, orchestrator)

## Goal

Make the simplification durable in the repo's rules and verify end to end.

## Deliverables

1. `next.config.ts`: permanent redirect `/how-we-work` -> `/`.
2. `CLAUDE.md`: replace the "1:1 reproduction" writing rule with the new
   copy law: the approved deck (plan 005) is the copy source of truth;
   concision + qualification lens govern future edits; claims disclaimer
   policy applies; MHTML snapshots in `docs/Original Site HTML/` remain as
   historical reference only. Keep the Jacob hero deviation note.
3. AGENTS.md updates: route lists (`src/app/AGENTS.md`), section map
   (`src/components/sections/AGENTS.md`), any per-page files the fan-out
   did not already fix.
4. Verification: `pnpm lint` + `pnpm typecheck` + `pnpm build`; redirect
   works; grep shows zero `how-we-work` references outside plans/ and
   docs/; word-count spot check against the deck targets; responsive +
   keyboard pass on the home page (most-changed).
5. `PROGRESS.md` + `plans/index.md` updated per phase; plan moved to
   `plans/complete/` when done.

## Acceptance

All checks pass; the deck, the live site, and the docs agree.
