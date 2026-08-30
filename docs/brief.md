# Project Brief — Norman Roofing Experts

> Source of truth for scope, positioning, and business model. Update this doc as decisions are made.

## 1. Project Identity

| Field | Value |
|---|---|
| Project / site name | Norman Roofing Experts |
| Domain | **NormanRoofingExperts.com** |
| Primary target city | Norman, Oklahoma |
| Niche / vertical | Roofing Contractors |
| Business model | Website-only local SEO lead generation (rank & rent optionality) |
| Physical location | **None.** No storefront, no Google Business Profile. |
| Phone (call-tracking number) | (773) 302-2292 |
| Email | _TBD — placeholder in `src/config/site.ts` must be replaced before launch_ |
| NAP / citations | **Not applicable at this stage.** No address exists; citations are deferred until a real contractor is attached. |

## 2. Business Model

**Website-only lead generation.** There is no physical storefront and no Google Business Profile
behind this site. That constraint shapes every decision below.

- **Lead capture:** quote/estimate form + a call-tracking phone number, both present site-wide.
- **Lead monetisation:** leads are sold through **LeadSmart**.
- **Long-term option:** once the site holds durable organic rankings, rent the whole asset to a
  real Norman roofing contractor, who then supplies licensing details, reviews, photography, and
  (optionally) a GBP.

### What this means in practice

| Constraint | Consequence for the build |
|---|---|
| No physical address | **Never** emit `LocalBusiness` / `RoofingContractor` schema with a fabricated address or geo. `Organization` schema only. |
| No Google Business Profile | The Maps 3-pack is **not** a realistic target. Organic ranking is the goal. |
| No verified reviews yet | No review counts, star ratings, or `AggregateRating` schema anywhere on the site. |
| No verified license number | Licensed & insured messaging stays general until a real contractor is attached; no invented license numbers. |
| No project photography | Visual design carries the premium feel via typography, colour, and layout — not stock photos pretending to be our own work. |

## 3. Keyword Target

| Metric | Value |
|---|---|
| Primary keyword | **roofing contractors Norman OK** |
| Monthly search volume | 1,300 |
| Keyword difficulty (KD) | 17 |
| Top competitor authority | Semrush AS 9 (see `docs/competitors.md`) |

The head term is winnable: low KD, meaningful volume, and no competitor holds meaningful
authority. Supporting intent is captured through problem-driven service pages and
neighbourhood-level location pages.

## 4. Brand Direction

**Premium / modern authority.** The site must read as an established, well-run regional roofing
company — not a template, and not a thin rank-and-rent shell.

- **Palette:** dark navy primary (`#0B1E3B`), warm copper accent, warm off-white ground.
- **Typography:** bold geometric display face for headings (Sora), clean humanist body face (Inter).
- **Layout:** generous whitespace, confident large hero typography, restrained ornament.
- **Anti-goals:** stock-photo hero collages, clip-art icons, rainbow gradients, cramped
  three-column "features" grids, badge soup.

## 5. Core USP / Differentiation

**Genuine neighbourhood-level location pages inside Norman.** No competitor has these.

All three profiled competitors stop at city level ("Norman", "Moore", "Edmond") or have no
location pages at all. Norman Roofing Experts publishes real, individually written pages for
areas inside and immediately around Norman — Campus Corner, the Downtown Historic District,
Brookhaven, Hall Park, and the surrounding towns residents actually name.

Rules that keep this a real differentiator rather than doorway spam:

- **Real place names only.** Never compass-direction inventions ("North Norman Heights").
- **Genuinely unique content per page.** Housing stock and age, typical roof types, storm
  exposure, relevant landmarks. If a specific detail isn't confidently known, it is written in a
  way that is generically true rather than invented.
- **Every location page cross-links to 2–3 relevant service pages,** and vice versa.

### Supporting USPs

- Storm and hail damage restoration with **insurance-claim assistance** — the highest-intent,
  highest-value entry point in this market for central Oklahoma.
- Problem-driven service pages written for a homeowner in a hurry, not for keyword skimming.
- Fast, accessible, static site — a measurable UX advantage over every profiled competitor.

## 6. Service Area

- **Core:** Norman, OK and its named neighbourhoods.
- **Surrounding towns covered by location pages:** Noble, Lexington, Slaughterville,
  Washington / Little Axe, Goldsby.
- Full list and URL structure: `docs/sitemap.md`.

## 7. Services Offered (final list — 7)

Problem-driven, mapped to real search intent:

1. Roof Repair
2. Roof Replacement
3. Roof Inspection
4. Storm & Hail Damage Restoration *(insurance-claim angle)*
5. Gutter Installation & Repair
6. Residential Roofing
7. Commercial Roofing

## 8. Target Customer

- **Primary:** Norman-area homeowners with an urgent problem — an active leak, post-storm hail
  damage, or a roof at end of life. High intent, short consideration window.
- **Secondary:** homeowners planning a proactive replacement or selling a house that needs a
  roof certification.
- **Tertiary:** light-commercial property managers (small retail, church, office, multi-family).

## 9. Brand Voice & Tone

Direct, competent, local-first. Written for a homeowner standing in their yard looking at a
damaged roof. Short sentences. Concrete specifics over adjectives. No hype, no exclamation
marks, no "Welcome to our website."

Claims are either verifiable or not made at all.

## 10. Conversion Goals

1. Tap the call-tracking number (primary on mobile).
2. Submit the quote form at `/free-estimate/` or the inline form on service/location pages.
3. Request a free roof inspection — the lowest-friction offer, used as the storm-season hook.

Every page must present both a call and a form path above the fold and again at the foot of the
page.

## 11. Technical Constraints

- **Astro only.** No React/Vue/Svelte. No CSS framework. Confirm before adding any such dependency.
- **Static output.** No SSR, no server endpoints. The lead form posts to a placeholder endpoint,
  to be wired to LeadSmart later.
- **Content-collection driven.** Services and locations are structured content (`src/content.config.ts`),
  never one-off hardcoded `.astro` pages.
- **Schema discipline.** `Organization`, `Service`, `FAQPage`, `BreadcrumbList` only.
  No `LocalBusiness`, no `AggregateRating` — see §2.

## 12. Open Questions

- [x] Provision the call-tracking number and replace the placeholder in `src/config/site.ts`.
- [x] Provision the lead email address and replace the placeholder in `src/config/site.ts`.
- [ ] Confirm the LeadSmart form endpoint URL and wire `LeadForm.astro` to it.
- [ ] Confirm licensing/insurance wording that is legally accurate pre-tenant.
- [ ] Confirm blog cadence beyond the three launch articles (all three are now written and live
      in `src/content/blog/`).
- [ ] Replace the `placeholder-` stock imagery with real photography — inventory and swap
      instructions in `docs/image-credits.md`.
- [ ] Once a tenant contractor is attached: real reviews, real photography, license number,
      and a decision on whether to add a GBP (which would then unlock `LocalBusiness` schema).
