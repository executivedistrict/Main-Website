<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AGENTS.md - repository root

Directory-scoped instructions for the **root** of the Executive District site.
For general, codebase-wide rules read [`CLAUDE.md`](./CLAUDE.md) first.

## The convention

Every directory in this repo has an `AGENTS.md`. **Before editing a file, read
the `AGENTS.md` in its directory.** Deeper files override the rules here when
they conflict. New directory → add an `AGENTS.md` describing it.

## What lives here

Project configuration and the documentation entry points:

- `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`,
  `eslint.config.mjs` - build/tooling config. Change deliberately.
- `pnpm-workspace.yaml`, `pnpm-lock.yaml` - pnpm config and lockfile. pnpm 11+
  reads build-script and peer settings from `pnpm-workspace.yaml`, not
  `package.json`.
- `CLAUDE.md`, `AGENTS.md`, `README.md` - keep these in sync with the code.
- `docs/` - project background and build context.
  - `docs/purpose.md` - **why this site exists** (lead qualification; who to
    attract and who to repel). Read it before building anything.
  - `docs/lead-qualification.md` - the locked approach for qualifying traffic
    and routing it to a call. Follow it for any lead-capture/form/booking work.
  - `docs/design-system.html` - the **visual source of truth** for the UI (open
    in a browser). Implemented as `@theme` tokens in `src/app/globals.css` and
    primitives in `src/components/ui/`.
  - `docs/company-background.md` - source of truth for who the company is.
- `.claude/settings.json` - shared Claude Code project settings (tracked in git;
  local overrides go in the git-ignored `.claude/settings.local.json`).

## Rules

- **Before building any feature, page, or copy, read `docs/purpose.md`.** This
  site is a lead-qualification tool: it must attract the right owner (older,
  West-Michigan, sell-or-transition) and repel the wrong one. If a change
  doesn't advance that, it doesn't belong.
- **For any lead-capture, application-form, routing, or booking work, follow
  `docs/lead-qualification.md`** - gated application, smart routing, and
  non-financial proxies (no hard financials on the form).
- **Use pnpm**, never `npm`/`yarn`. Don't create a `package-lock.json`.
- Don't add new top-level directories without an `AGENTS.md`.
- Keep dependencies lean. The app is currently bare boilerplate with **no UI,
  icon, or font libraries** - add them deliberately, only when a real need lands.
- Track the latest compatible majors, but **keep ESLint on 9.x** (ESLint 10
  breaks `eslint-config-next`'s bundled `eslint-plugin-react`).
- After any change, `pnpm lint`, `pnpm typecheck`, and `pnpm build` must pass.
- Don't commit, push, or change tooling config unless explicitly asked.
