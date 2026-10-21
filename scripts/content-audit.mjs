/**
 * Content quality gate over dist/ (run after a build):
 *  - main-content word count per page vs the minimum for its type
 *  - paragraphs/list items duplicated across pages
 *  - in-paragraph internal link count (3-6 per page)
 *  - the anchor text each inner page uses to link to the homepage,
 *    with no anchor used on more than 2 pages
 *  - title/description length, JSON-LD types, single H1
 * Writes docs/AUDIT.md and exits 1 if anything fails.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const OUT = 'docs/AUDIT.md';

const SERVICE_SLUGS = fs.readdirSync('src/content/services').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
const LOCATION_SLUGS = fs.readdirSync('src/content/locations').filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));

const MIN = { home: 2500, service: 1500, location: 1000, about: 700, contact: 350 };

const typeOf = (route) => {
  const slug = route.replace(/^\/|\/$/g, '');
  if (route === '/') return 'home';
  if (SERVICE_SLUGS.includes(slug)) return 'service';
  if (LOCATION_SLUGS.includes(slug)) return 'location';
  if (slug === 'about' || slug === 'contact') return slug;
  return 'other';
};

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const textOf = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = (s) => (s.match(/[A-Za-z0-9][A-Za-z0-9'’.,-]*/g) || []).length;

/** Main content only: drop chrome that repeats on every page. */
function mainContent(html) {
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] || '';
  return main
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<svg[\s\S]*?<\/svg>/g, '')
    .replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>/g, '')
    .replace(/<details class="toc"[\s\S]*?<\/details>/g, '')
    .replace(/<aside class="article__aside"[\s\S]*?<\/aside>/g, '')
    .replace(/<section[^>]*aria-label="Call to action"[\s\S]*?<\/section>/g, '')
    .replace(/<p class="hero__fine"[\s\S]*?<\/p>/g, '');
}

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name === 'index.html') pages.push(full);
  }
})(DIST);

const rows = [];
const blocks = new Map(); // normalised paragraph -> Set(route)
const homeAnchors = new Map(); // anchor -> [routes]
const fails = [];

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  let route = '/' + path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  route = route === '/' ? '/' : route + '/';
  const type = typeOf(route);
  const content = mainContent(html);
  const wc = words(textOf(content));

  // Paragraph-level blocks for the duplicate check (12+ words).
  for (const m of content.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const t = textOf(m[2]).toLowerCase();
    if (words(t) < 12) continue;
    if (!blocks.has(t)) blocks.set(t, new Set());
    blocks.get(t).add(route);
  }

  // In-paragraph internal links.
  let ctx = 0;
  let homeAnchor = '';
  for (const m of content.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    for (const a of m[2].matchAll(/<a\b[^>]*href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
      ctx++;
      if (a[1] === '/' && type !== 'home') homeAnchor = textOf(a[2]);
    }
  }
  if (homeAnchor) {
    if (!homeAnchors.has(homeAnchor)) homeAnchors.set(homeAnchor, []);
    homeAnchors.get(homeAnchor).push(route);
  }

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const types = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
  const schema = [...new Set(types)].filter((t) => !['ListItem', 'Place', 'Question', 'Answer', 'ContactPoint', 'Offer'].includes(t));

  const min = MIN[type];
  const problems = [];
  if (min && wc < min) problems.push(`words ${wc} < ${min}`);
  if (['home', 'service', 'location'].includes(type) && ctx < 3) problems.push(`only ${ctx} in-paragraph links`);
  if (['service', 'location'].includes(type) && !homeAnchor) problems.push('no contextual link to homepage');
  if (decode(title).length > 60) problems.push(`title ${decode(title).length} chars`);
  if (decode(desc).length > 155) problems.push(`description ${decode(desc).length} chars`);
  if (h1 !== 1) problems.push(`${h1} h1`);
  problems.forEach((p) => fails.push(`${route}: ${p}`));

  rows.push({ route, type, wc, min: min ?? '-', ctx, homeAnchor, tl: decode(title).length, dl: decode(desc).length, schema: schema.join(', '), h1, ok: problems.length === 0 });
}

const dups = [...blocks.entries()].filter(([, r]) => r.size > 1);
dups.forEach(([t, r]) => fails.push(`duplicate paragraph on ${[...r].join(', ')}: "${t.slice(0, 80)}…"`));
for (const [a, r] of homeAnchors) if (r.length > 2) fails.push(`homepage anchor "${a}" used on ${r.length} pages`);

rows.sort((a, b) => ['home', 'service', 'location', 'about', 'contact', 'other'].indexOf(a.type) - ['home', 'service', 'location', 'about', 'contact', 'other'].indexOf(b.type) || a.route.localeCompare(b.route));

const md = [
  '# AUDIT: content quality gate',
  '',
  `Generated by \`npm run content-audit\` from \`${DIST}/\`. Main content only (header, footer, breadcrumbs, TOC, call card and CTA band excluded).`,
  '',
  '| Page | Type | Words | Min | In-text links | Homepage anchor | Title | Desc | Schema | H1 | OK |',
  '|---|---|---|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| \`${r.route}\` | ${r.type} | ${r.wc} | ${r.min} | ${r.ctx} | ${r.homeAnchor || '-'} | ${r.tl} | ${r.dl} | ${r.schema} | ${r.h1} | ${r.ok ? 'yes' : 'NO'} |`),
  '',
  `Duplicate paragraphs across pages: **${dups.length}**`,
  '',
  fails.length ? `## Failures\n\n${fails.map((f) => `- ${f}`).join('\n')}` : '**All checks passed.**',
  '',
].join('\n');

fs.writeFileSync(OUT, md);
console.log(rows.map((r) => `${r.ok ? 'ok ' : 'NO '} ${String(r.wc).padStart(5)} words  ${String(r.ctx).padStart(2)} links  ${r.route}`).join('\n'));
console.log(fails.length ? `\n${fails.length} PROBLEM(S):\n- ${fails.join('\n- ')}` : '\nContent audit: no problems found.');
process.exit(fails.length ? 1 : 0);
