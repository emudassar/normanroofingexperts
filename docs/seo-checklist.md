# SEO checklist — Severna Park roof leak repair

Living checklist. Tick items as they're done.

## Niche & keywords
- [x] Niche + city chosen from Semrush data (`docs/STRATEGY.md` §2)
- [x] One primary keyword per page, no two pages targeting the same term
- [ ] Record the Severna Park top-10 SERP competitors (`docs/competitors.md`)

## Technical
- [x] Static Astro build, first-level URLs, trailing slashes
- [x] Unique title ≤60 and description ≤155 on every page (`npm run check` enforces)
- [x] Canonical, OG/Twitter tags, `lang`, one H1 per page
- [x] Sitemap without the 404; robots.txt no longer blocks `/_astro/` (CSS/JS must be crawlable)
- [x] 301s from old Norman URLs (`vercel.json`)
- [x] Self-hosted fonts, one CSS file, one deferred JS module, no raster images on pages

## Content
- [x] Homepage ≥2,500 words, services ≥1,500, areas ≥1,000, about ≥700, contact ≥350
- [x] No paragraph duplicated across pages (`content-audit.mjs`)
- [x] Question-style H2s, tables, callouts, FAQs on every money page
- [x] No invented stats, prices, reviews, landmarks or streets

## Internal linking
- [x] 3–6+ in-paragraph links per page
- [x] Every inner page links to `/` once with its own anchor (`docs/STRATEGY.md` §6)
- [x] Services ↔ areas ↔ nearby areas cross-linked; breadcrumbs on inner pages

## Structured data
- [x] Organization + WebSite + Service + FAQPage on home (no LocalBusiness)
- [x] Service + BreadcrumbList + FAQPage on service pages
- [x] WebPage + BreadcrumbList + FAQPage on area pages; AboutPage, ContactPage

## After deploy
- [ ] Submit `sitemap-index.xml` in Search Console and Bing
- [ ] Request indexing for `/` and the 8 service pages
- [ ] Confirm GA4 `phone_call_click` events arrive
- [ ] Re-run `npm run gsc:audit` after ~2 weeks to track indexing
