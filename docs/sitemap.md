# Sitemap — URL structure

18 indexable pages + 404. All first-level URLs (no `/services/` or `/service-areas/` folders),
matching the reference site. Max click depth from home: 1.

## Core

| URL | File |
|---|---|
| `/` | `src/pages/index.astro` (main keyword: roof leak repair Severna Park) |
| `/about/` | `src/pages/about.astro` |
| `/contact/` | `src/pages/contact.astro` (calls only, no form) |
| `/privacy-policy/` | `src/pages/privacy-policy.astro` |
| `/terms/` | `src/pages/terms.astro` |
| 404 | `src/pages/404.astro` (noindex, out of sitemap) |

## Services (`src/content/services/*.md` → `src/pages/[slug].astro`)

`/emergency-roof-leak-repair/`, `/roof-flashing-repair/`, `/chimney-leak-repair/`,
`/skylight-leak-repair/`, `/flat-roof-leak-repair/`, `/roof-vent-leak-repair/`,
`/roof-leak-detection/`, `/storm-damage-roof-repair/`

## Areas (`src/content/locations/*.md` → `src/pages/[slug].astro`)

`/roof-leak-repair-arnold-md/`, `/roof-leak-repair-pasadena-md/`,
`/roof-leak-repair-millersville-md/`, `/roof-leak-repair-severn-md/`,
`/roof-leak-repair-glen-burnie-md/`

Slugs are file names and must stay unique across both folders.

## Redirects (`vercel.json`, 301)

Old Norman site URLs: `/services/*` → `/`, `/service-areas/*` → `/#areas`, `/blog/*` → `/`,
`/free-estimate/` → `/contact/`.
