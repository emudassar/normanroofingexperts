# CLAUDE.md — Norman Roofing Experts

Project architecture and conventions for this repo. Read this before making changes.

## What this project is

A production-grade **Astro** local SEO / rank-and-rent website for a roofing contractor
targeting **Norman, Oklahoma**. It is a marketing/lead-gen site: fast static pages, service
pages, location pages, and conversion-focused CTAs (call + quote form). It is not an app —
avoid app-style complexity. No GMB/Google Business Profile and no physical address — this
is a website-only lead-gen site (leads sold via LeadSmart).

See `docs/brief.md` for the full project brief, goals, and open questions.

## Read MEMORY.md first

Before making any change, read **`MEMORY.md`** (repo root, gitignored — local only, never
pushed). It's a live map of current project state: exact file locations, current config
values (phone, email, endpoints), the page/content inventory, outstanding pre-launch items,
and a short log of recent changes. It exists so you can go straight to the right file
instead of re-searching the whole site for things that are already known.

**After completing any change**, update the relevant section(s) of `MEMORY.md` — including
its "Recent changes" log — so it stays an accurate reflection of current state, not a
snapshot of some earlier session. If `MEMORY.md` is missing or looks stale/wrong versus the
actual code, fix it as part of the task rather than trusting it blindly.

## Current stage

**Built — pre-launch.** All 33 indexable pages plus a 404 are implemented and build clean:
7 service pages, 12 location pages, 3 blog posts, 2 collection hubs and the core static
pages. Docs (`brief.md`, `competitors.md`, `sitemap.md`, `seo-checklist.md`) are populated
with real project data. Treat anything in `docs/` as the source of truth for scope — don't
invent services, locations, or claims that aren't documented there.

**Outstanding before launch** (all tracked in `docs/brief.md` §12):
call-tracking number, lead email, the LeadSmart form endpoint, and swapping the
`placeholder-` imagery for real photography (`docs/image-credits.md`).

## Architecture

```
norman-roofing-experts/
├── CLAUDE.md
├── docs/
│   ├── brief.md            # project brief, goals, USPs, open questions
│   ├── competitors.md      # competitor research
│   ├── sitemap.md          # URL structure / page inventory
│   ├── seo-checklist.md    # living local SEO checklist — check off as work completes
│   └── design/             # reference design images — match direction, don't copy assets
├── src/
│   ├── content/
│   │   ├── services/       # markdown entries for the `services` collection
│   │   └── locations/      # markdown entries for the `locations` collection
│   ├── content.config.ts   # content collection schemas (services, locations)
│   ├── layouts/            # shared page layouts
│   ├── components/         # reusable components
│   └── pages/               # file-based routes
└── astro.config.mjs
```

## Stack decisions

- **Astro only.** No React/Vue/Svelte and no CSS framework (e.g. Tailwind) are installed.
  Do not add one unless there's a genuine, specific interactivity requirement that plain
  Astro + vanilla JS/CSS can't reasonably handle — ask before adding a dependency like this.
- **Content Collections** (`src/content.config.ts`) back the `services` and `locations`
  page types. New service or location pages should be added as markdown entries under
  `src/content/services/` or `src/content/locations/`, not hardcoded as one-off `.astro`
  pages, so the site stays consistent as it scales.
- **Static output.** This site has no need for SSR/server endpoints — keep it static unless
  a real requirement (e.g. a server-processed form) emerges.

## Planned routing

See `docs/sitemap.md` for the full planned URL structure. Summary: static core pages
(`/`, `/about/`, `/contact/`, `/free-estimate/`, etc.) plus dynamic routes for the
`services` and `locations` collections (`src/pages/services/[slug].astro`,
`src/pages/service-areas/[slug].astro`).

## Design reference

`docs/design/` holds reference images for the visual direction (layout structure, spacing,
color usage, typography weight). Match the direction — don't copy any brand-specific logos
or imagery from a reference.

Until real photography/licensed images are sourced, use the browser to find **free,
properly licensed stock images** (e.g. Unsplash, Pexels) for placeholder hero/service/
location imagery — roofing, houses, Oklahoma/Norman-relevant where possible. Mark any
placeholder image clearly (e.g. filename prefix `placeholder-`) so it's easy to swap for
real photos later. Never use images scraped from competitor sites.

## Development

```
npm install
npm run dev        # dev server
npm run build      # production build
npm run preview    # preview the production build locally
npm run seo-audit  # audit dist/ (needs a build first)
npm run check      # build + audit in one pass — run this before any commit
```

`scripts/seo-audit.mjs` walks the build output and fails on: duplicate or over-length
titles/descriptions, a missing or mismatched canonical, anything other than exactly one
`<h1>`, unparseable JSON-LD, broken internal links, images missing `alt`/`loading`/WebP,
sitemap contents (the 404 must stay out), orphan pages, and click depth over 3.

When starting the dev server as an agent (not for the human to watch live), prefer background
mode so the terminal isn't blocked:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Reference documentation

- [Routing, dynamic routes, middleware](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling](https://docs.astro.build/en/guides/styling/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/) (avoid unless justified — see Stack decisions above)

## Working conventions

- Keep `docs/brief.md`, `docs/competitors.md`, `docs/sitemap.md`, and `docs/seo-checklist.md`
  up to date as decisions get made — they're the source of truth for scope, not this file.
- Real neighborhood names for location pages, never compass directions (Northwest/Southeast
  etc.) — see `docs/competitors.md` for why.
- No `LocalBusiness` schema with a fake address anywhere — no physical presence, don't
  fabricate one.