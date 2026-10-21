# Norman Roofing Experts: Roof Leak Repair, Severna Park, MD

Pay-per-call lead-gen site for roof leak repair in Severna Park, Maryland, at
https://normanroofingexperts.com. Static Astro, deployed on Vercel from `main`.

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run check` | Build + SEO audit + content audit (run before every commit) |
| `npm run content-audit` | Word counts, duplicate paragraphs, links; writes `docs/AUDIT.md` |

Start with `CLAUDE.md`, then `docs/STRATEGY.md` and `docs/brief.md`.

## Deploy

Pushing to `main` deploys on Vercel. Headers, CSP and the 301s from the old site live in
`vercel.json`.
