# AGENTS.md - `src/app/book/`

The `/book` route: a 1:1 rebuild of the production "Book a Confidential
Discovery Call" page. Read [`../AGENTS.md`](../AGENTS.md) first.

`page.tsx` is a Server Component that exports the page `metadata` (original
title + meta description) and composes the sections from
`src/components/sections/book/` (booking copy + embedded GHL calendar, trust
strip, navy reassurance band). All copy and the calendar URL live in that
sections directory; edit content there, not here.
