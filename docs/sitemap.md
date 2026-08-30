# Sitemap / URL Structure — Norman Roofing Experts

> Confirmed information architecture. URLs are final and stable — they are the foundation for
> internal linking and any future off-page work.

**Domain:** `https://normanroofingexperts.com`
**Trailing slashes:** always. **Case:** lowercase, hyphenated.

## Core Pages

| Page | URL | Source |
|---|---|---|
| Home | `/` | `src/pages/index.astro` |
| About | `/about/` | `src/pages/about.astro` |
| Contact | `/contact/` | `src/pages/contact.astro` |
| Free Estimate | `/free-estimate/` | `src/pages/free-estimate.astro` |
| Blog | `/blog/` | `src/pages/blog/index.astro` |
| Privacy Policy | `/privacy-policy/` | `src/pages/privacy-policy.astro` |
| Terms of Service | `/terms/` | `src/pages/terms.astro` |
| 404 | — | `src/pages/404.astro` |

## Hub Pages

| Page | URL | Source |
|---|---|---|
| All Services | `/services/` | `src/pages/services/index.astro` |
| All Service Areas | `/service-areas/` | `src/pages/service-areas/index.astro` |

Both hubs are linked from the header and footer, which is what keeps every collection page
within three clicks of the homepage.

## Service Pages — 7

Content collection `services` (`src/content/services/*.md`), rendered by
`src/pages/services/[slug].astro` through `ServiceLayout.astro`.

| # | URL | Entry |
|---|---|---|
| 1 | `/services/roof-repair/` | `roof-repair.md` |
| 2 | `/services/roof-replacement/` | `roof-replacement.md` |
| 3 | `/services/roof-inspection/` | `roof-inspection.md` |
| 4 | `/services/storm-hail-damage-restoration/` | `storm-hail-damage-restoration.md` |
| 5 | `/services/gutter-installation-repair/` | `gutter-installation-repair.md` |
| 6 | `/services/residential-roofing/` | `residential-roofing.md` |
| 7 | `/services/commercial-roofing/` | `commercial-roofing.md` |

Service pages are **problem-driven**, not catalogue-driven: each answers "I have this problem,
what happens next and what does it cost."

## Location Pages — 12

Content collection `locations` (`src/content/locations/*.md`), rendered by
`src/pages/service-areas/[slug].astro` through `LocationLayout.astro`.

> Note: the collection is named `locations`; the public URL segment is `/service-areas/`.
> This is deliberate — `service-areas` reads better to users and matches how competitors'
> visitors search, while the collection name stays aligned with `src/content.config.ts`.

**Norman neighbourhoods / districts**

| # | URL | Entry |
|---|---|---|
| 1 | `/service-areas/campus-corner-university-north/` | `campus-corner-university-north.md` |
| 2 | `/service-areas/downtown-historic-district/` | `downtown-historic-district.md` |
| 3 | `/service-areas/brookhaven/` | `brookhaven.md` |
| 4 | `/service-areas/hall-park/` | `hall-park.md` |
| 5 | `/service-areas/adkins-crossing-summit-lakes/` | `adkins-crossing-summit-lakes.md` |
| 6 | `/service-areas/west-norman/` | `west-norman.md` |
| 7 | `/service-areas/franklin-denver/` | `franklin-denver.md` |

**Surrounding Cleveland / McClain County communities**

| # | URL | Entry |
|---|---|---|
| 8 | `/service-areas/noble-ok/` | `noble-ok.md` |
| 9 | `/service-areas/lexington-ok/` | `lexington-ok.md` |
| 10 | `/service-areas/slaughterville-ok/` | `slaughterville-ok.md` |
| 11 | `/service-areas/washington-little-axe-ok/` | `washington-little-axe-ok.md` |
| 12 | `/service-areas/goldsby-ok/` | `goldsby-ok.md` |

**Naming rule:** real, locally used place names only. No compass-direction inventions.
"West Norman" is retained because it is genuine local usage for the area west of I-35, not a
manufactured directional slug.

## Blog

Content collection `posts` (`src/content/blog/*.md`), rendered by
`src/pages/blog/[slug].astro`.

| URL | Entry |
|---|---|
| `/blog/oklahoma-hail-season-roof-guide/` | `oklahoma-hail-season-roof-guide.md` |
| `/blog/roof-insurance-claim-process-oklahoma/` | `roof-insurance-claim-process-oklahoma.md` |
| `/blog/best-roofing-materials-oklahoma-weather/` | `best-roofing-materials-oklahoma-weather.md` |

Three launch articles supporting the storm/hail and materials intent clusters. Cadence beyond
launch is an open question in `docs/brief.md` §12.

## Internal Linking Model

```
Home
├── /services/ ──────────► 7 service pages ──┐
├── /service-areas/ ─────► 12 location pages ┤ cross-linked both directions
├── /free-estimate/                          │  (2–3 links each way per page)
├── /about/  /contact/
├── /blog/ ──────────────► 3 posts ──────────┘
└── /privacy-policy/  /terms/
```

- Every service page links to **2–3 relevant location pages**.
- Every location page links to **2–3 relevant service pages**.
- The header links both hubs; the footer links **every** service and location page directly,
  so nothing is deeper than **2 clicks** from home.
- No orphan pages.

## Click Depth Audit

| Depth | Pages |
|---|---|
| 0 | `/` |
| 1 | All core pages, both hubs, all 7 services, all 12 locations (footer-linked) |
| 2 | Blog posts |

Maximum depth: **2**. Requirement was ≤ 3.

## Page Inventory Total

| Type | Count |
|---|---|
| Core pages | 9 |
| Hub pages | 2 |
| Service pages | 7 |
| Location pages | 12 |
| Blog posts | 3 |
| **Total indexable** | **33** |
| 404 (noindex, excluded from sitemap) | 1 |

## Future: Service × Location Matrix

Deferred, not built. If organic traction justifies it later, the structure supports
`/services/[service]/[location]/` without rearchitecture. Only build these where genuinely
differentiated content exists — a 7 × 12 grid of near-duplicate pages would undo the very
advantage described in `docs/competitors.md`.

## XML Sitemap

Generated by `@astrojs/sitemap` from the `site` value in `astro.config.mjs`. Output at
`/sitemap-index.xml`, referenced from `/robots.txt`. The 404 page is excluded.
