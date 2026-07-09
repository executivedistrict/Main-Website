# Phase 3 - Hero integration, docs, verification (serial spine)

## Goal

Mount Jacob as the home hero visual (option A), amend the documentation so
the deviation is deliberate and durable, and verify end-to-end.

## Scope

- `src/components/sections/home/home-hero.tsx` (replace the right-column
  photo with `JacobHeroCard`) and `content.ts` (add the card copy; existing
  reproduced copy untouched)
- `CLAUDE.md` (amend the 1:1 copy note: the Jacob hero card is an approved
  deviation from the production snapshot)
- `src/AGENTS.md`, `src/app/AGENTS.md`, `src/components/AGENTS.md`
  directory-map updates for `api/` and `jacob/`
- `plans/004-jacob-concierge/PROGRESS.md`, `plans/index.md`

## Not in scope

- Changes to any other section or page. No new copy beyond the card's
  eyebrow / invitation line / button label.

## Contracts received

Phases 1-2 as shipped (see `PROGRESS.md` phase summaries), plus
`phase-0-contracts.md`.

## Deliverables

1. Hero layout: left column (headline, subhead, CTA) unchanged; right column
   renders `JacobHeroCard`. The hero photo (`/images/hero.jpg`) is removed
   from the hero but stays in `public/images/`. Mobile: card stacks below
   the copy (same slot the photo used); confirm the hero still clears the
   fixed 72px header.
2. Card copy in `content.ts`: short, senior, plain-spoken (brand voice), no
   em-dashes (this is new writing). Suggested starting point, owner may
   revise: eyebrow "AI Concierge", line "Have a real conversation about
   your business, right now.", button label "Talk with Jacob".
3. CLAUDE.md amendment + AGENTS.md map updates.
4. Verification: `pnpm lint`, `pnpm typecheck`, `pnpm build`; manual pass on
   mobile + desktop widths; keyboard-only walkthrough; without real Tavus
   keys the error + retry path is the demonstrable flow, and the live
   conversation is verified once the owner supplies keys
   (`open-questions.md`).
5. On completion: move the plan to `plans/complete/` and update
   `plans/index.md` per `plans/AGENTS.md`.

## Agent instructions

Orchestrator may implement this phase directly (single serial spine, small
surface). If delegated, the agent reads: this file, `phase-0-contracts.md`,
`CLAUDE.md`, `src/components/AGENTS.md`,
`src/components/sections/AGENTS.md`, `src/components/sections/home/AGENTS.md`.
Do NOT touch: other sections' files, other pages, `docs/`.

## Acceptance

- Home page renders with Jacob card as the hero visual on `/`; all three
  build commands pass; a11y checklist satisfied; PROGRESS.md and index
  updated; plan moved to complete only when the live-key test is either done
  or explicitly deferred by the owner.
