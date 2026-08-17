/**
 * Post-build SEO audit over dist/:
 *  - unique <title> and meta description
 *  - exactly one <h1> per page
 *  - canonical present and matching the page path
 *  - internal links all resolve to a built page
 *  - images: no missing alt, non-hero images lazy
 *  - sitemap excludes /404 and includes everything else
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = process.argv[2] ?? 'dist';

if (!fs.existsSync(DIST)) {
  console.error(`No build output at "${DIST}". Run \`npm run build\` first.`);
  process.exit(1);
}

const pages = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) pages.push(full);
  }
}
walk(DIST);

const routeOf = (file) => {
  let rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel.endsWith('index.html')) rel = rel.slice(0, -'index.html'.length);
  else rel = rel.replace(/\.html$/, '');
  return '/' + rel;
};

const titles = new Map();
const descs = new Map();
const routes = new Set(pages.map(routeOf));
const problems = [];
let linkCount = 0;
let imgCount = 0;

const grab = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeOf(file);
  const is404 = route === '/404';

  const title = grab(html, /<title>([^<]*)<\/title>/);
  const desc = grab(html, /<meta name="description" content="([^"]*)"/);
  const canonical = grab(html, /<link rel="canonical" href="([^"]*)"/);
  const h1s = html.match(/<h1[\s>]/g) || [];

  if (!title) problems.push(`${route}: missing <title>`);
  else {
    if (title.length > 62) problems.push(`${route}: title ${title.length} chars — "${title}"`);
    if (titles.has(title)) problems.push(`${route}: DUPLICATE title with ${titles.get(title)}`);
    else titles.set(title, route);
  }

  if (!desc) problems.push(`${route}: missing meta description`);
  else {
    if (desc.length > 160) problems.push(`${route}: description ${desc.length} chars`);
    if (descs.has(desc)) problems.push(`${route}: DUPLICATE description with ${descs.get(desc)}`);
    else descs.set(desc, route);
  }

  if (!canonical) problems.push(`${route}: missing canonical`);
  else {
    const want = route === '/' ? '/' : route.replace(/\/$/, '') + '/';
    const got = new URL(canonical).pathname;
    if (got !== want) problems.push(`${route}: canonical mismatch -> ${got}`);
  }

  if (h1s.length !== 1) problems.push(`${route}: ${h1s.length} <h1> tags (expected 1)`);

  // JSON-LD must parse
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`${route}: invalid JSON-LD — ${e.message}`); }
  }

  // Internal links
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/_astro/') || href.startsWith('/og/')) continue;
    if (/\.(xml|txt|ico|svg|png|jpg|webp|woff2?)$/.test(href)) continue;
    linkCount++;
    const norm = href.endsWith('/') ? href : href + '/';
    const alt = norm.replace(/\/$/, '');
    if (!routes.has(norm) && !routes.has(alt) && !routes.has(href)) {
      problems.push(`${route}: broken internal link -> ${href}`);
    }
  }

  // Images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    imgCount++;
    if (!/\salt=/.test(tag)) problems.push(`${route}: <img> without alt`);
    if (!/loading="(lazy|eager)"/.test(tag)) problems.push(`${route}: <img> without loading attr`);
    if (!/\.webp/.test(tag) && !/src="\/(favicon|og)/.test(tag)) {
      problems.push(`${route}: non-webp image`);
    }
  }

  if (is404 && !/name="robots" content="noindex/.test(html)) {
    problems.push('/404: missing noindex');
  }
}

// Sitemap
const smFiles = fs.readdirSync(DIST).filter((f) => f.startsWith('sitemap') && f.endsWith('.xml'));
const smUrls = new Set();
for (const f of smFiles) {
  const xml = fs.readFileSync(path.join(DIST, f), 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    if (!m[1].includes('sitemap')) smUrls.add(new URL(m[1]).pathname);
  }
}
if ([...smUrls].some((u) => u.includes('/404'))) problems.push('sitemap: contains /404');
for (const r of routes) {
  if (r === '/404') continue;
  const want = r === '/' ? '/' : r.replace(/\/$/, '') + '/';
  if (!smUrls.has(want)) problems.push(`sitemap: missing ${want}`);
}

// Click depth from home
const linksFrom = (route) => {
  const file = route === '/' ? path.join(DIST, 'index.html')
    : path.join(DIST, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf8');
  return [...html.matchAll(/href="(\/[^"#?]*)"/g)]
    .map((m) => (m[1].endsWith('/') ? m[1] : m[1] + '/'))
    .filter((h) => routes.has(h) && !h.startsWith('/_astro'));
};
const depth = new Map([['/', 0]]);
let frontier = ['/'];
while (frontier.length) {
  const next = [];
  for (const r of frontier) {
    for (const l of linksFrom(r)) {
      if (!depth.has(l)) { depth.set(l, depth.get(r) + 1); next.push(l); }
    }
  }
  frontier = next;
}
const orphans = [...routes].filter((r) => r !== '/404' && !depth.has(r));
const deep = [...depth.entries()].filter(([, d]) => d > 3);
orphans.forEach((r) => problems.push(`orphan page (unreachable from home): ${r}`));
deep.forEach(([r, d]) => problems.push(`click depth ${d}: ${r}`));

const maxDepth = Math.max(...[...depth.values()]);
console.log(`Pages: ${pages.length}  Internal links checked: ${linkCount}  Images: ${imgCount}`);
console.log(`Sitemap URLs: ${smUrls.size}  Max click depth from home: ${maxDepth}`);
console.log(problems.length ? `\n${problems.length} PROBLEM(S):\n- ${problems.join('\n- ')}` : '\nNo problems found.');
process.exit(problems.length ? 1 : 0);
