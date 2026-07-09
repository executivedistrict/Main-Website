# AGENTS.md - `src/app/privacy/`

The `/privacy` route: a 1:1 rebuild of the production Privacy Policy page.
Read [`../AGENTS.md`](../AGENTS.md) first.

`page.tsx` is a Server Component exporting the original `metadata` and the
full legal text (verbatim production copy, kept inline as JSX) inside the
shared legal components from `src/components/sections/legal/` (`LegalHero`,
`LegalContent`, `LegalDivider`, `LegalCallout`). Edit the legal text only
against the production source; `/terms` uses the same components.
