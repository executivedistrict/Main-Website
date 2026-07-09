# AGENTS.md - `src/components/sections/legal/`

Shared layout components for the legal pages (`/privacy`, `/terms`), a 1:1
rebuild of the production legal pages. Read [`../AGENTS.md`](../AGENTS.md)
first.

## Files

- `legal-hero.tsx` - navy hero band: gold "Legal" label, page `h1`, and the
  "Last updated" line.
- `legal-content.tsx` - the prose column and its accents:
  - `LegalContent` - max-w 800px column that styles plain `h2`/`h3`/`p`/`ul`/
    `li`/`a` children via direct-child selectors, so page copy stays as plain
    semantic HTML.
  - `LegalDivider` - the 60x3px gold `hr` between numbered sections.
  - `LegalCallout` - ice callout box with the 4px blue left rule.

## Conventions

- Unlike other pages there is **no `content.ts`**: legal copy is long prose
  with interleaved inline markup (`strong`, links), so pages keep it as JSX
  inside `LegalContent`. Copy is verbatim production copy; edit it only
  against the production source.
- `LegalContent` styles only **direct children**, so `LegalCallout` paragraphs
  keep their own smaller slate styling.
- Both pages share these components; don't fork per-page variants.
