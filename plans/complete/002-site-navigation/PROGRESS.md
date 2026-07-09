# 002 - Site Navigation · Progress

| Phase | Title | Status |
| ----- | ----- | ------ |
| 0 | Contracts (nav config shape) | ✅ Complete |
| 1 | Config-driven header build | ✅ Complete |

## Phase 0 - Contracts

Locked `NavConfig` (leaf vs parent, `NavSubItem` with required icon +
description, `NavCta`) in `src/lib/nav.ts`.

## Phase 1 - Build

Shipped `src/lib/nav.ts` (config + types) and rebuilt
`src/components/site-header.tsx` as a config-driven header: logo + left-aligned
links, Apply CTA pinned right, leaf links vs parent popovers. Submenu items
render icon + label + description (lucide icons resolved from the config's string
keys). Popovers are viewport-aware (flip to the side with room, clamp to
`100vw`) and close on outside click / Escape. Mobile: a disclosure drawer
expressing the same config. Header + footer now live in `layout.tsx` (every
page, including 404) inside a sticky-footer column. Lint / typecheck / build
green.
