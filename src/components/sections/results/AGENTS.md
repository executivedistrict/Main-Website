# AGENTS.md - `src/components/sections/results/`

Sections for the `/results` page. Copy is sourced verbatim from the approved
plan-005 copy deck (`plans/005-site-simplification/copy-deck.md`), not the
production snapshot. Read [`../AGENTS.md`](../AGENTS.md) first.

## Files

- `content.ts` - all page copy: hero (subline + claims disclaimer), the four
  aggregate metrics, the four case studies (each a single `summary` paragraph
  plus key results), and the closing CTA. Edit copy only against the approved
  deck. Each case study carries a `tone` ("white" | "mist") matching the
  background alternation (01 mist, 02 white, 03 white, 04 mist).
- `results-hero.tsx` - navy hero ("Proof" / "We don't talk about results. We
  *show them.*"), with a smaller `frost-faint` disclaimer line under the
  subline (required by the claims policy in `/CLAUDE.md`; frost-faint on navy
  passes WCAG AA).
- `aggregate-metrics.tsx` - white metrics strip under the hero: four navy
  figures with hairline dividers on desktop, 2-up then 1-up on smaller screens.
- `case-study.tsx` - `CaseStudySection`, the reusable case-study block:
  oversized serif index (no tick), gold industry eyebrow + title, the summary
  paragraph, then a horizontal navy "Key Results" band below it (metrics 4-up
  at `lg` with hairline dividers, 2-up at `sm`, stacked on mobile).
- `closing-cta.tsx` - white closing CTA with the serif-accent headline,
  linking to `/book`. This is the page's only CTA band (the former mid-page
  CTA was cut in plan 005).

## Conventions

- Case-study order is fixed by the page (`src/app/results/page.tsx`), which
  destructures `caseStudies` from `content.ts`; keep the array order in sync.
- The figures are anonymized, self-reported client claims; the hero
  disclaimer line covers them. Present them as claims and don't extend them.
