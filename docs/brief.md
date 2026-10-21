# Project Brief — Roof Leak Repair, Severna Park, MD

Rebuilt 2026-10-21. The domain, phone and email stayed; the niche, location, content and
design all changed. The old broad "roofing contractors Norman OK" site is gone (git history
has it). Keyword data, page plan and design direction: `docs/STRATEGY.md`.

## 1. Project Identity

| | |
|---|---|
| Brand | Norman Roofing Experts (kept to match the domain and email) |
| Domain | normanroofingexperts.com |
| Niche | Roof leak repair (micro-niche inside roofing) |
| Location | Severna Park, Maryland (Anne Arundel County, ZIP 21146) + Arnold, Pasadena, Millersville, Severn, Glen Burnie |
| Phone | (773) 302-2292 (pay-per-call tracking number) |
| Email | normanroofingsexperts@gmail.com (shown in header/footer, like the reference site) |

## 2. Business Model

**Pay-per-call referral.** Every CTA is a phone call; there are no forms (the reference site
leakdetectioncoltonca.com uses none either). Calls are routed to an independent local roofing
provider who quotes and does the work. No GMB, no physical address.

### Voice & disclosure

This site is **not** the entity that performs roofing work. Every page must reflect that:

- Never write in a voice that claims this site inspects roofs, sends crews, carries insurance,
  holds licences, meets adjusters or issues warranties. Describe what **the provider** does,
  or give consumer-education advice.
- No years-in-business, founding year, reviews, ratings, awards, prices, response times or
  "24/7" claims. Cost content explains the factors, never a price.
- No street address. The reference site shows one; we don't have a real one, so the footer and
  top bar show the service area instead. Never invent one, and never add `LocalBusiness` schema.
- The referral disclosure appears in exactly four places: hero small print, the homepage
  "How the call works" section, About, and the footer.

## 3. Keyword Target

| Metric | Value |
|---|---|
| Primary keyword | **roof leak repair severna park** (50/mo, KD 0) |
| City roofing cluster | ~430/mo combined, all KD 0–3 (Semrush US, Oct 2026) |
| Sub-service topics | emergency leak repair, flashing, chimney, skylight, flat roof, vent/pipe boot, leak detection, storm damage |

Why this niche: picked on 2026-10-21 from Mudassar's shortlist of 34 niche/city pairs. It was the
only pair with real exact-match volume at KD 0, in a wealthy, older-housing, storm-exposed town.

## 4. Services (8, all leak-specific)

Emergency Roof Leak Repair, Roof Flashing Repair, Chimney Leak Repair, Skylight Leak Repair,
Flat Roof Leak Repair, Roof Vent & Pipe Boot Leak Repair, Roof Leak Detection, Storm Damage Roof
Repair. No general roofing (replacement, gutters, commercial) — that would dilute the micro-niche.

## 5. Technical Constraints

Astro static site on Vercel (push to `main` deploys). Pure static HTML output, one CSS file,
one deferred JS module, inline SVG artwork, self-hosted Sora + Inter. Verify with `npm run check`
(build + `seo-audit.mjs` + `content-audit.mjs`).

## 6. Open Questions

- [ ] **Local tracking number.** (773) is a Chicago area code; a 410/443 number would convert
      better in Maryland. Ask the pay-per-call network.
- [ ] **Hours / 24-7.** Unknown whether the routed line answers around the clock. Until
      confirmed, the site makes no availability claim.
- [ ] **Address.** If a real local address (e.g. a virtual office) is ever obtained, it can be
      added to `site.ts` and the footer. Until then, none.
- [ ] **Search Console.** Old Norman URLs 301 to the homepage via `vercel.json`. After deploy,
      submit the new sitemap and request indexing for the homepage.
- [ ] **seo-consultant skill.** `.claude/skills/seo-consultant/SKILL.md` still holds Norman, OK
      standing facts; update it before its next run.
