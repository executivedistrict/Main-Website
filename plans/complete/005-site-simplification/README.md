# 005 - Site Simplification

Cut the site's marketing copy roughly in half and remove the redundant
`/how-we-work` page, on the principle that visitors skim and the first
interaction has to get to the point. Shorter AND sharper: the qualification
lens from `docs/purpose.md` decides what survives, not just word count.

## Goal

- Marketing copy from ~4,700 words to a ~2,300-2,500 target.
- `/how-we-work` removed; its only non-duplicate content (the three
  capabilities) becomes one tight card row on the home page; the old URL
  redirects.
- Home loses its internal repetition (three-paragraph pain sections, the
  synthesis restating them); Results and About keep their pages but are cut
  hard; Book gets a light trim; legal pages untouched.
- All rewritten copy follows the brand voice (senior, plain-spoken,
  operator-minded), the no-em-dash rule (this is new writing), and presents
  results as self-reported claims per CLAUDE.md's claims policy.

## Phase map

| Phase | Name | Mode |
| ----- | ---- | ---- |
| 0 | Copy deck + contracts ([phase-0-copy-deck.md](./phase-0-copy-deck.md)) | Orchestrator + one drafting agent; **gates on owner approval of the deck** |
| 1 | Implementation ([phase-1-implementation.md](./phase-1-implementation.md)) | Parallel fan-out per page, then reviewer |
| 2 | Docs, redirect, verification ([phase-2-docs-verify.md](./phase-2-docs-verify.md)) | Serial spine |

## Write surface (the only paths this plan may touch)

- `src/components/sections/{home,about,results,book}/` (content + section
  components as the shorter copy changes layout needs)
- `src/components/sections/how-we-work/` (deleted in Phase 1)
- `src/app/how-we-work/` (deleted), `src/app/page.tsx` (if the home section
  list changes), `next.config.ts` (redirect)
- `src/lib/nav.ts`, `src/components/site-footer.tsx` (nav/footer link updates)
- Page `metadata` in the affected `page.tsx` files (titles/descriptions may
  shorten with the copy)
- `CLAUDE.md` (supersede the 1:1 copy rule), `src/app/AGENTS.md`,
  `src/components/AGENTS.md`, `src/components/sections/AGENTS.md`,
  `src/lib/AGENTS.md` (nav description; added retroactively in Phase 2 after
  the reviewer flagged it) and per-page section `AGENTS.md` files (route
  list + copy-rule updates)
- `plans/005-site-simplification/` and `plans/index.md`

Off-limits: `docs/` (including the MHTML snapshots, which stay as the
historical record), `src/lib/jacob/` and `src/components/jacob/` (Jacob's
context and widget are untouched per the owner; his card copy in
`sections/home/content.ts` may be trimmed only if the deck proposes it and
the owner approves), legal pages, `public/`.

## Orchestration rules

1. Phase 0's copy deck must be approved by the owner before any Phase 1
   agent runs (verbiage is the product; the deck is the contract).
2. Phase 1 agents fan out per page over disjoint trees; a reviewer agent
   then checks the diff against the approved deck (verdict BLOCKING /
   NON-BLOCKING / CLEAN).
3. Phase 2 is a serial spine (redirect, docs, full verification).
4. Every agent gets the approved deck verbatim plus an explicit
   "do not touch" list.

## Success definition

- Live pages read word-for-word from the approved deck; nothing invented,
  nothing surviving that the deck cut.
- `/how-we-work` returns a redirect (old links and nav anchors work);
  remaining routes: `/`, `/about`, `/results`, `/book`, `/privacy`, `/terms`.
- `pnpm lint`, `pnpm typecheck`, `pnpm build` pass; a11y and responsive
  checks hold on the edited sections.

## Out of scope

- Jacob's conversational context (locked, see plan 004 open questions).
- Design-system changes (tokens, primitives) beyond what shorter copy needs.
- New content, new sections, or SEO work beyond shortened metadata.

## Related plans

No deferred plans flagged as related: `deferred/003-integrations` targets
removed form shells and is neither predecessor nor follow-on. Plan 004
(Jacob) remains active awaiting Tavus keys; its hero card is part of the
home page this plan trims around, and its verbatim-context lock is honored.
