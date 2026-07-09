# Phase 1 - Homepage + Navigation + Content

## Goal

Build the homepage as a long-form landing page with every section from the
wireframe, plus the site header/footer. Real but short copy; the existing
primitives carry the look.

## Read first

- Phase 0 contracts; `docs/purpose.md`, `docs/lead-qualification.md`
- `src/components/ui/AGENTS.md` (tokens + design rules)

## Deliverables

- `src/components/site-header.tsx` - wordmark, in-page nav anchors (How We Work,
  Results, Operators), and the gold **Apply** CTA → `/apply`. Supports a
  `minimal` prop (wordmark only) for the application route.
- `src/components/site-footer.tsx` - wordmark, one-line positioning, nav, contact
  (`Hello@executivedistrict.com`), confidentiality note.
- `src/app/page.tsx` - sections in order:
  1. **Hero** - clear sell/transition headline, subhead, Apply + How-it-works,
     "Confidential · By application" microline.
  2. **Is this you?** - the qualifying mirror (Money / Partner / Direction,
     reframed toward transition).
  3. **Who we work with / who we don't** - explicit include + exclude.
  4. **How it works** (`#how-it-works`) - embedded operator model, 4 steps.
  5. **Proof** (`#results`) - `Stat` metric grid + disclaimer.
  6. **Operators** (`#operators`) - "operators who've sat in your chair", founder
     + bench (names/titles).
  7. **Confidentiality** - reassurance (defuses money sensitivity).
  8. **CTA** - Apply for a confidential conversation.

## Discipline

- Use `@/components/ui` primitives and tokens. No hard-coded colors.
- Headlines clear, not stories. Short copy. No numbered sections. Eyebrows sparse.
- Server Components (no `"use client"` on the homepage).

## Acceptance

- `/` renders all eight blocks; nav anchors jump correctly; Apply → `/apply`.
- `pnpm lint` + `pnpm typecheck` clean.
