# AGENTS.md - `src/app/terms/`

The `/terms` route: a 1:1 rebuild of the production Terms & Conditions page.
Read [`../AGENTS.md`](../AGENTS.md) first.

`page.tsx` is a Server Component exporting the original `metadata` and the
full legal text (verbatim production copy, kept inline as JSX) inside the
shared legal components from `src/components/sections/legal/` (`LegalHero`,
`LegalContent`, `LegalDivider`, `LegalCallout`). Internal links use
`next/link` (`/privacy`). Edit the legal text only against the production
source; `/privacy` uses the same components.
