# SEO Checklist — Norman Roofing Experts

Living checklist. Check items off as they're completed during the build.
No GMB / no physical address — this is a website-only lead-gen site.

> **Last audited:** 16 August 2026, against a clean `npm run build`.
> An automated post-build audit checks duplicate titles/descriptions, canonical
> correctness, single-H1, JSON-LD validity, broken internal links, image alt/lazy/WebP,
> sitemap contents and click depth. Latest run: **33 pages, 2,178 internal links,
> 47 images, 0 problems.**

## Niche & Keyword Validation (done)
- [x] Primary keyword KD < 20 ("roofing contractors Norman OK" — KD 17)
- [x] Minimum search volume confirmed (1,300/mo)
- [x] Competitor organic traffic/authority checked (Semrush — AS 9 on top competitors)
- [x] Domain has no trademark/brand conflict

## Technical Foundation
- [x] Fast Core Web Vitals (Astro static output, **2.5 KB total JS**, 20 KB CSS, WebP images)
- [x] Mobile-first responsive layout (verified at 375 / 800 / 1280 — no horizontal overflow)
- [ ] HTTPS/SSL across all pages — *host-level, set at deploy*
- [x] Clean, descriptive, hyphenated URLs (see `docs/sitemap.md`)
- [x] `robots.txt` present and correct (`public/robots.txt`, references sitemap)
- [x] XML sitemap via `@astrojs/sitemap` — 33 URLs, 404 excluded
- [ ] Sitemap submitted to GSC + Bing Webmaster — *post-launch*
- [x] Canonical URL on every page (audited — all 34 match their own path)
- [x] 404 page implemented (`src/pages/404.astro`, `noindex`, excluded from sitemap)
- [x] No redirect chains/loops, no broken links (1,594 internal links resolve)
- [x] No render-blocking or unnecessary JS frameworks (no framework; fonts self-hosted + preloaded)

## On-Page Content (per page)
- [x] Target keyword in Title, H1, first paragraph (enforced by the `keyword`/`h1`/`intro` schema fields)
- [x] Unique `<title>` including service + area where relevant — all ≤ 62 chars, zero duplicates
- [x] Unique meta description with clear value prop + CTA — all ≤ 160 chars, zero duplicates
- [x] Single H1 per page, logical H2/H3 hierarchy (audited across all 34 pages)
- [x] Semantic/long-tail keyword coverage, no stuffing
- [x] FAQ section per service/location page (3–6 real Q&As on cost, insurance, timelines, materials)
- [x] Table of contents on long-form pages (blog posts with 3+ H2s)
- [x] Word count matches real user-query satisfaction, not padded
- [x] Descriptive image alt text (every `<img>` has alt; no keyword stuffing)

## Internal Linking
- [x] Every page reachable within 3 clicks of homepage, **max measured depth: 2**
- [x] No orphan pages (audited, zero unreachable pages)
- [x] Relevant, varied anchor text (not repeated exact-match)
- [x] Location pages ↔ service pages cross-linked (2–3 each way, enforced by `reference()` in the schema)

## Structured Data (Schema.org)
- [x] Organization schema (site-wide, in `BaseLayout.astro`) + WebSite node
- [x] Service schema (each of the 7 service pages, plus each location page)
- [x] FAQPage schema (all 7 services, all 12 locations, homepage)
- [x] BreadcrumbList schema site-wide
- [x] Article schema on blog posts
- [x] All JSON-LD validated as parseable at build time
- [x] AggregateRating/Review schema — **deliberately absent.** No verified reviews exist.
- [x] NO LocalBusiness schema with a fake address — verified absent from build output

## Performance
- [x] Images in WebP, compressed, lazy-loaded (only above-fold heroes are `eager`)
- [x] Minified HTML/CSS/JS (`compressHTML: true`, Astro default minification)
- [x] No render-blocking resources above the fold (self-hosted preloaded fonts, no external CSS/JS)
- [ ] Lighthouse/PageSpeed check on key templates — *run against the deployed URL post-launch*

## Content Strategy
- [x] Service pages cover real search intent per service (see `docs/brief.md`)
- [x] Location pages speak specifically to their real area — no generic boilerplate
      (Hall Park's 1960 all-electric history, Chautauqua/Miller district review requirements,
      Brookhaven's 1985 median build year, Slaughterville's 39 sq mi of acreage, etc.)
- [x] Content collections (`services`, `locations`, `blog`) stay structured/uniform via `src/content.config.ts`

## Conversion / Lead Gen
- [x] Click-to-call phone number on every page (sticky header, mobile-optimised `tel:` link)
- [x] Quote/estimate form with minimal friction (6 fields, 3 required, honeypot spam trap)
- [x] Trust signals near CTAs (years serving, licensed & insured, free photo inspection — no fabricated review counts)
- [x] Clear service-area messaging so leads self-qualify before converting
- [ ] Form wired to LeadSmart endpoint — *blocked on the endpoint URL; see `docs/brief.md` §12*

## Tracking (once live)
- [ ] Google Analytics (or privacy-friendly alternative) installed
- [x] Google Search Console connected — verified as siteOwner via OAuth; see `MEMORY.md` §8
- [ ] Bing Webmaster connected
- [x] Call tracking number configured — `(773) 302-2292` set in `src/config/site.ts`
- [ ] Form submission / conversion tracking

## E-E-A-T & Trust
- [x] Genuinely unique About page — real narrative, no filler
- [x] Fact-checked, credible content (local facts verified against the Oklahoma Historical
      Society, City of Norman planning sources and census data — see `docs/competitors.md` and
      the per-page research notes)
- [x] Links to authoritative external sources where relevant (state CIB registration, Oklahoma
      Insurance Department, carrier/agent verification — referenced in body copy)
- [x] Legal pages are specific to this business model (service-area business, no storefront,
      no deductible rebating, pricing ranges explicitly not quotations)

## Off-Page (post-launch, once a real rentable business is attached)
- [ ] Brand profile links (relevant social platforms)
- [ ] Niche edits / guest posts on relevant, real-traffic sites only
- [ ] Anchor text mix: brand > naked URL > partial match > exact match (exact match capped ~2%)
- [ ] 60-70% of early links point to homepage, shifting to inner pages as they gain traction
- [ ] NAP-based citations (Yelp, BBB, Angi, etc.) — deferred until a real contractor/address is attached to the site

## Pre-Launch QA
- [x] All internal links resolve (no 404s), 2,178 checked, 0 broken
- [x] `npm run build` completes cleanly — 34 pages, no warnings
- [x] Mobile device check (375px), tablet (800px), desktop (1280px). Nav dropdowns, forms and grids verified
- [ ] Cross-browser check on real devices — *pending deploy*
- [x] Schema data double-checked for accuracy (types verified; no fabricated entities)
- [ ] Replace placeholder imagery with real photography — see `docs/image-credits.md`
- [ ] Replace placeholder phone number in `src/config/site.ts`
- [x] Replace placeholder email in `src/config/site.ts`
- [x] Add Google Search Console HTML tag verification meta tag (`BaseLayout.astro`)
