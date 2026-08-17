# Placeholder Image Credits

Every image currently on the site is a **placeholder**. Filenames are prefixed
`placeholder-` so they are trivial to find and swap once real project photography exists
(see `docs/brief.md` §12).

All images are from **Pexels** under the [Pexels License](https://www.pexels.com/license/):
free for commercial use, no attribution required, modification permitted. Attribution is
recorded here anyway so provenance is auditable.

**No image on this site was taken from a competitor.** Sourcing was restricted to Pexels
search results.

## Selection notes

Preference was given to US asphalt-shingle roofing work on brick/siding homes (several of
the crew shots are from Texas and North Carolina jobs) because that matches central
Oklahoma housing stock far better than the European clay-tile imagery that dominates
generic "roof" stock searches. The storm image is a genuine Oklahoma sky.

## Files

Stored in `src/assets/images/` (processed to WebP at build time by `astro:assets`), except
the Open Graph image which must stay a raw file in `public/og/`.

| File | Pexels photo ID | Subject |
|---|---|---|
| `placeholder-hero-roofer-shingle.jpg` | 37677394 | Roofer installing asphalt shingles (Allen, TX) |
| `placeholder-crew-brick-home.jpg` | 37677476 | Crew re-roofing a brick home (Allen, TX) |
| `placeholder-crew-blue-sky.jpg` | 38028508 | Shingle installation under blue sky (Fort Worth, TX) |
| `placeholder-service-roof-repair.jpg` | 38346748 | Roofer securing equipment on a shingled roof |
| `placeholder-service-roof-replacement.jpg` | 33404981 | Roof replacement on a brick house (Fort Worth, TX) |
| `placeholder-service-roof-inspection.jpg` | 38346732 | Roofer in safety gear inspecting a roof |
| `placeholder-service-storm-hail.jpg` | 17302260 | Storm front over open country (Buffalo, OK) |
| `placeholder-service-gutters.jpg` | 529964 | Rainwater running off a gutter line |
| `placeholder-service-residential.jpg` | 33404248 | Nail-gun shingle installation, residential roof |
| `placeholder-service-commercial.jpg` | 38800167 | Aerial of a large low-slope commercial roof |
| `placeholder-area-campus-corner.jpg` | 5178060 | Two-storey brick home, mature trees |
| `placeholder-area-downtown-historic.jpg` | 37181599 | Victorian eave, decorative trim and gutter |
| `placeholder-area-brookhaven.jpg` | 4469158 | Two-storey brick family home |
| `placeholder-area-hall-park.jpg` | 15504477 | Row of adjacent suburban houses |
| `placeholder-area-adkins-crossing.jpg` | 7710011 | Modern home with stone facade |
| `placeholder-area-west-norman.jpg` | 3555615 | Suburban family house, modern facade |
| `placeholder-area-franklin-denver.jpg` | 35742592 | Traditional house under overcast sky |
| `placeholder-area-noble.jpg` | 4044785 | House with porch and front garden |
| `placeholder-area-lexington.jpg` | 15369780 | Two-storey house with lawn and garage |
| `placeholder-area-slaughterville.jpg` | 12343741 | Rural outbuilding with guttering |
| `placeholder-area-washington-little-axe.jpg` | 7601185 | Contemporary house on a large lot |
| `placeholder-area-goldsby.jpg` | 5353883 | Two-storey house with wide driveway |
| `placeholder-blog-hail-season.jpg` | 13532613 | Storm clouds over farmland and a rural road |
| `placeholder-blog-insurance-claim.jpg` | 33404080 | Synthetic slate installation on a brick house |
| `placeholder-blog-materials.jpg` | 37704240 | Metal roof panel installation |
| `public/og/placeholder-og-default.jpg` | 38028508 | Open Graph default, 1200×630 |

Photo pages resolve at `https://www.pexels.com/photo/<id>/`.

## Replacing them

1. Drop the real photo into `src/assets/images/` with a non-`placeholder-` name.
2. Update the `heroImage` path in the relevant markdown entry under
   `src/content/services/` or `src/content/locations/`.
3. Update `heroImageAlt` — alt text describes the *new* photo, not the old one.
4. Delete the orphaned placeholder and its row above.
