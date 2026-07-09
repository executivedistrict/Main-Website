# Phase 0 - Contracts & Scaffolding

## Goal

Lock the data shape, integration shell signatures, and route map before building,
so Phases 1–3 share one contract.

## Read first (authoritative)

- `/CLAUDE.md`, `/AGENTS.md`, `/src/AGENTS.md`, `/src/app/AGENTS.md`,
  `/src/components/AGENTS.md`, `/src/components/ui/AGENTS.md`, `/src/lib/AGENTS.md`
- `docs/purpose.md`, `docs/lead-qualification.md`

## Routes

- `/` - homepage (long-form landing). Nav links are in-page anchors:
  `#how-it-works`, `#results`, `#operators`.
- `/apply` - the 3-step application + the three confirmation states.

## Lead contract (`src/lib/leads.ts`)

```ts
export type LeadIntent = "grow" | "stabilize" | "sell" | "transition" | "not-sure";
export type FitStatus = "clear" | "borderline" | "no-fit";

export interface LeadApplication {
  // Step 1 - you & the business
  name: string;
  businessName: string;
  isOwner: boolean;
  industry: string;
  // Step 2 - stage & intent (non-financial proxies)
  yearsOwned: string;      // banded select, e.g. "10-20"
  employees: string;       // banded select, e.g. "11-50"
  intent: LeadIntent;
  // Step 3 - why now + contact
  whyNow: string;          // open text - strongest fit/show signal
  email: string;
  phone: string;
  preferredContact: "phone" | "email";
  revenueRange?: string;   // OPTIONAL, coarse, includes "prefer-not-to-say"
  company?: string;        // honeypot - must be empty
}

export function scoreLead(app: LeadApplication): FitStatus;
```

**Scoring (crude, rule-based):**

- Not the owner → `no-fit`.
- Intent `sell` / `transition` **and** a substantive `whyNow` → `clear`.
- Intent `grow` / `stabilize` / `not-sure` → `borderline`.
- Otherwise → `borderline`.

## Integration shell signatures

```ts
// src/lib/supabase.ts  (TODO: real client once keys exist)
export async function saveLead(app: LeadApplication, fit: FitStatus): Promise<void>;

// src/lib/email.ts  (TODO: Resend once key exists)
export async function notifyTeam(app: LeadApplication, fit: FitStatus): Promise<void>;
```

Both no-op (log) for now. The server action `src/app/apply/actions.ts`
(`submitApplication`) validates, scores, calls both shells, and returns
`{ status: FitStatus }`.

## Env (documented in `.env.example`, not required to run)

`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
`LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_BOOKING_URL`.

## Acceptance

- Contract compiles; downstream phases import from `@/lib/leads`.
- No real integration dependencies added (`@supabase/*`, `resend` NOT installed).
