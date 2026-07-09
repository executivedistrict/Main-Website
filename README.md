# Executive District

Marketing site for **Executive District** - fractional C-suite leadership for small-to-midsize businesses. We place part-time CFOs, COOs, CMOs, and legal counsel who *embed* into a company's leadership team and own outcomes, rather than consultants who advise from the outside.

This repository is the Next.js web application for the brand: a **1:1
recreation of the production Executive District site** (light design, navy +
blue + gold, Inter with Lora italic accents; snapshots in
`docs/Original Site HTML/`). The design system lives in
`src/app/globals.css` (tokens) and `docs/design-system.html` (visual
reference). Full business context lives in
[`docs/company-background.md`](docs/company-background.md).

---

## What the company does

Executive District provides fractional (part-time, senior) executives to business owners running companies doing **$500K–$50M in annual revenue** - the zone where a business is too big to run by gut feel, but too small to afford a full-time executive team.

The pitch - **"operators who embed, not consultants who advise"** - frames traditional consulting as "the advice trap." Their people sit at the leadership table, attend meetings, build the systems themselves, and are accountable for measurable results.

### The three problems they sell against

1. **Money** - Revenue is growing but profit and cash flow are a mystery (a fractional CFO fixes this).
2. **Partnership** - The owner feels alone, with no true peer to make decisions alongside.
3. **Direction** - The owner doesn't know whether to scale, sell, or hold.

The framing: these are symptoms of one root issue - the company has outgrown the owner's capacity to lead it alone but hasn't built the leadership infrastructure for its next stage.

### How an engagement works

1. **Confidential Conversation** - 30-minute fit call with a senior operator.
2. **Diagnostic Deep-Dive** - Assessment across five pillars: financial clarity, operational systems, revenue infrastructure, leadership capacity, strategic direction.
3. **Operator Match & Embed** - Matched with a fractional executive who embeds in the business.
4. **Results & Evolve** - Monthly accountability cycles with measurable outcomes.

### Positioning & claims

The site cites results such as a **$480K** annual profit increase, **600%** YoY growth, and **75+ companies served**. These are **anonymized and self-reported** marketing claims with no named clients - typical for confidential advisory work, but unverified. Keep that framing in any copy: present them as claims, not audited facts. Fuller background lives in [`docs/company-background.md`](docs/company-background.md).

---

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org) (App Router)     |
| Language       | TypeScript 6 (strict)                             |
| Styling        | Tailwind CSS v4 (CSS-first config in `globals.css`) |
| Linting        | ESLint 9 (`eslint-config-next`)                   |
| Package manager| [pnpm](https://pnpm.io) (pinned via `packageManager`) |

> ⚠️ This project uses **Next.js 16**, which has breaking changes from earlier versions. Before writing framework code, consult the docs bundled in `node_modules/next/dist/docs/` - see `AGENTS.md`.

**Version policy:** dependencies track the latest **compatible** majors. One deliberate hold - **ESLint stays on 9.x**: ESLint 10 removed `context.getFilename()`, which `eslint-config-next`'s bundled `eslint-plugin-react` still calls, so ESLint 10 breaks `pnpm lint`. Revisit when that plugin ships ESLint 10 support. pnpm build/peer settings live in `pnpm-workspace.yaml` (pnpm 11 no longer reads them from `package.json`).

---

## Getting started

This project uses **pnpm**. If you don't have it, enable it via Corepack
(`corepack enable`) or see [pnpm.io/installation](https://pnpm.io/installation).

```bash
pnpm install        # install dependencies
pnpm dev            # start the dev server at http://localhost:3000
pnpm build          # production build
pnpm start          # serve the production build
pnpm lint           # run ESLint
pnpm typecheck      # type-check without emitting
```

---

## Project structure

```
executive-district/
├── CLAUDE.md              # Entry point for AI agents → general codebase instructions
├── AGENTS.md              # Per-directory agent instructions (root scope)
├── docs/                  # purpose.md, design-system.html, Original Site HTML/, ...
├── public/                # Static assets (has its own AGENTS.md)
└── src/
    ├── app/               # App Router: routes, layout, global styles (AGENTS.md)
    ├── components/        # Header/footer, ui/ primitives, sections/<page>/
    └── lib/               # nav config, cn helper
```

Every directory carries its own `AGENTS.md`, per the convention in `CLAUDE.md`.

---

## Working with AI agents

This repo is set up for agent-assisted development:

- **`CLAUDE.md`** (root) holds the general, codebase-wide instructions.
- **`AGENTS.md`** files live in **every directory** and carry instructions specific to that directory.

**Before editing files in any directory, read that directory's `AGENTS.md` first.** See `CLAUDE.md` for the full convention.
