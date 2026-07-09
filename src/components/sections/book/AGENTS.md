# AGENTS.md - `src/components/sections/book/`

Sections for the `/book` page. Read [`../AGENTS.md`](../AGENTS.md) first.

## Files

- `content.ts` - all page copy: intro paragraphs, the "What to expect"
  items, trust-strip items (with their lucide icons), the reassurance quote,
  and the booking iframe URL. Copy is verbatim from the owner-approved
  `plans/005-site-simplification/copy-deck.md`; edit it only against that
  deck. It also holds the plan-006 qualification-application copy and
  option lists (`qualifyCopy`, `tierCopy`, `*Options`, and the
  `QualifyAnswers` / `Tier` types), sourced from
  `plans/006-lead-qualification/phase-0-contracts.md` and recorded as an
  amendment in the plan-005 deck. Option VALUES are locked to the
  qualification config's keys (`src/lib/qualification/config.ts`); never
  change one side without the other.
- `qualify-form.tsx` (client) - the gated-booking application: three steps
  (You + the business / Where you are / Contact, optional revenue range
  last), progress indicator, per-step validation with inline errors, a
  visually hidden `company_website` honeypot, submit to `POST /api/qualify`.
  No qualification logic lives client-side; the component only renders the
  tier panel for the tier the server returns. Focus management: the step
  heading is focused on step change, the first invalid field on failed
  validation, and each tier panel focuses its own heading on reveal.
- `tier-qualified.tsx` (client) - tier 1 panel: brief confirmation heading,
  then the existing `BookingCalendar`. The ONLY place the calendar renders
  inside the application flow.
- `tier-borderline.tsx` (client) - tier 2 panel: follow-up promise, a
  message textarea + optional preferred-times input, submit to
  `POST /api/lead-contact` with `{ message, preferredTimes?, application }`
  (the parent passes the submitted answers), then a confirmation state.
- `tier-no-fit.tsx` (client) - tier 3 off-ramp copy only; deliberately no
  calendar, no form, no links.
- `booking-copy.tsx` - left column: "Start Here" label, h1 with the gold
  serif accent, body copy, and the "What to expect" checklist.
- `booking-calendar.tsx` - right column: the calendar card (navy header, GHL
  booking iframe, confidentiality footer). Sticky below the fixed header on
  desktop, and ordered first on mobile (matching production's `order: -1`).
- `trust-strip.tsx` - ice band with the four trust items (4 cols, 2 on
  tablet, 1 on phones).
- `bottom-reassurance.tsx` - navy band with the gold accent bar and the
  serif-italic reassurance paragraph.

## Conventions

- The page (`src/app/book/page.tsx`) owns the two-column grid; these
  components fill it.
- The booking iframe is a plain lazy-loaded embed of the production GHL
  calendar URL (no GHL embed script), height ~776px per the rendered
  original.
- Form error states use Tailwind's built-in `red-700` (AA on white/mist)
  plus a `CircleAlert` icon, since the brand theme defines no error token;
  color is never the only error signal. If a brand error token lands in
  `globals.css`, switch to it.
