# AGENTS.md - `src/components/sections/about/`

Sections for the `/about` (Our Team) page. Read
[`../AGENTS.md`](../AGENTS.md) first.

## Files

- `content.ts` - all page copy and the team roster (founder + flat `bench`
  list; each operator carries a `field` tag). Copy follows the owner-approved
  plan-005 copy deck (`plans/complete/005-site-simplification/copy-deck.md`);
  the bench bios were shortened further by owner request (deck Amendments
  section). Edit copy only with owner approval, reflected in the deck.
  Bench members are listed by first name only (owner request, deck
  Amendments); only Zach Booker keeps his full name.
- `about-hero.tsx` - navy hero ("The Team" / "Operators who've been in your
  chair.").
- `founder-feature.tsx` - Zach Booker feature: photo + gold accent bar, label,
  name, title, a single bio paragraph (`founder.bio` is a string). The founder
  stays at the top of the page, above the bench.
- `operator-card.tsx` - vertical centered card: circular grayscale headshot,
  color-coded `field` chip (per-field tint from the `FIELD_CHIPS` map; muted
  chip hues `gold-deep`/`sage`/`plum` come from `globals.css`), name, role,
  short bio (~30 words, consistent across the bench).
- `operator-bench.tsx` - "The Senior Operator Bench" intro plus ONE flat card
  grid of the whole bench (1 / 2 / 3 columns via `sm:`/`lg:`). Fields are
  per-card tags, not separate bands; do not reintroduce one-group-per-section
  layouts (they wasted most of each row).
- `positioning-strip.tsx` - navy band with the serif-italic positioning quote.
- `team-cta.tsx` - closing CTA ("Your next leadership hire shouldn't be a
  gamble.") linking to `/book`.

## Conventions

- Headshots live in `public/images/team/<kebab-name>.png`, rendered with
  `next/image`, `alt` = the person's name, grayscale with a hover
  partial-desaturation to match production.
- Jacob Mirandette (team member) is NOT the AI concierge "Jacob"; the AI
  persona has its own image (`public/images/ai-jacob.jpg`) and lives in
  `src/components/jacob/`. Keep them separate.
- Mobile-first: the bench grid is one column by default, two from `sm`,
  three from `lg`.
