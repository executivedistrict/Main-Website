# AGENTS.md - `public/`

Static assets served from the site root. Read [`/CLAUDE.md`](../CLAUDE.md) for
general rules.

## What lives here

Files here are served as-is at the URL root: `public/logo.svg` → `/logo.svg`.
The directory is currently **empty** - the default `create-next-app` SVGs were
removed during the strip. Add the brand's real assets here as they land.

## Rules

- Reference these assets by **root-absolute path** (`/logo.svg`), and prefer
  `next/image` for raster images.
- Keep assets optimized (compress images, minify SVGs) - they ship to every
  visitor uncached-by-default.
- Use clear, kebab-case file names. Don't put source files (`.psd`, `.ai`,
  `.fig`) here; only production-ready assets.
- No secrets or sensitive files - **everything in `public/` is publicly
  accessible.**
