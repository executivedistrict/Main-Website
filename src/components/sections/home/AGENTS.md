# AGENTS.md - `src/components/sections/home/`

Sections for the home route (`src/app/page.tsx`). Read
[`../AGENTS.md`](../AGENTS.md) first.

Section order: hero, proof bar, three pains, synthesis, capabilities row,
process, metrics band, final CTA.

- `content.ts` - all page copy, verbatim from the owner-approved plan-005
  copy deck (`plans/005-site-simplification/copy-deck.md`); do not reword it.
  The copy contains no em dashes.
- `home-hero.tsx` - headline, subhead, CTA, and the Jacob AI concierge card
  (card stacks first on mobile).
- `proof-bar.tsx` - navy stats strip under the hero.
- `pain-section.tsx` - numbered 01/02/03 problem section (big serif number,
  gold label, quoted headline, one body paragraph, gold callout box).
  Rendered three times from `pains` in `content.ts`, separated by hairline
  dividers.
- `connected-section.tsx` - navy "three problems are connected" synthesis
  (single paragraph).
- `capabilities-row.tsx` - mist section (`id="capabilities"`) with a centered
  header and three white cards, the content merged from the removed
  How We Work page. One column on mobile, three from `lg`.
- `process-section.tsx` - 4-step engagement process grid.
- `metrics-band.tsx` - ice results band with four navy figures plus the
  claims-policy footnote line (`metricsFootnote`).
- `final-cta.tsx` - closing CTA copy plus the "What to expect" checklist box.
