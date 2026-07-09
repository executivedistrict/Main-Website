# Phase 0 - Contracts (Nav config)

Lock the nav config shape before building. The header is a pure renderer of this
config.

```ts
// src/lib/nav.ts

export interface NavLeaf {
  kind: "leaf";
  label: string;
  href: string;
}

export interface NavSubItem {
  label: string;
  href: string;
  description: string; // required - one short line
  icon: string;        // lucide-react icon name, resolved at render
}

export interface NavParent {
  kind: "parent";
  label: string;
  href?: string;       // optional dedicated page for the parent itself
  items: NavSubItem[]; // opens a viewport-aware popover
}

export type NavItem = NavLeaf | NavParent;

export interface NavCta {
  label: string;       // e.g. "Apply"
  href: string;        // "/apply"
}

export interface NavConfig {
  items: NavItem[];    // left-aligned, after the logo
  cta: NavCta;         // right-aligned; the Application
}
```

## Rules

- Every `NavSubItem` has both an `icon` and a `description` - no exceptions.
- A `parent` renders a viewport-aware popover; a `leaf` renders a direct link.
- The `cta` is always the Application and is rendered separately on the right.
- No em-dashes in any label or description.

## Acceptance

- The header imports `navConfig` from `@/lib/nav` and renders entirely from it.
- Submenu popovers reposition to stay within the viewport on small screens.
