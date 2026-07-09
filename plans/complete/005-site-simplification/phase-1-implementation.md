# Phase 1 - Implementation (parallel fan-out per page, then reviewer)

## Goal

Apply the approved `copy-deck.md` to the codebase exactly.

## Fan-out (disjoint trees)

- Agent A - home + how-we-work merge: rewrite
  `src/components/sections/home/` content and components per the deck, add
  the capabilities row, delete `src/components/sections/how-we-work/` and
  `src/app/how-we-work/`, update `src/app/page.tsx` and `src/lib/nav.ts` +
  `src/components/site-footer.tsx` per the deck's approved nav list.
- Agent B - results: `src/components/sections/results/` + `/results`
  metadata, including the claims disclaimer line.
- Agent C - about: `src/components/sections/about/` + `/about` metadata.
- Agent D - book: `src/components/sections/book/` + `/book` metadata
  (light trim only).

## Rules

- The deck is verbatim law: no invented copy, no surviving cut copy, no
  editorial improvements beyond it.
- Components simplify where shorter copy leaves dead layout (e.g. a
  three-paragraph grid down to one paragraph loses the grid), but the visual
  language (tokens, section tones, accents) is unchanged.
- Each agent runs `pnpm typecheck` + `pnpm lint`; no `pnpm build` (parallel
  agents); update the page's section `AGENTS.md` if content structure
  changed.

## Reviewer

After all four land: diff vs deck, per section; checks for stray references
to the deleted route (grep `how-we-work`), unused exports/components left
behind, and a11y regressions in edited sections. Verdict BLOCKING /
NON-BLOCKING / CLEAN.

## Acceptance

- All four agents report typecheck/lint clean; reviewer verdict
  non-blocking or clean with findings folded into Phase 2.
