// Full indexing audit: inspects every URL in the built sitemap via the URL
// Inspection API and summarizes coverage/mobile/rich-results per page.
// Usage: npm run build (first, so dist/sitemap-0.xml is current), then
//        npm run gsc:audit
import fs from 'node:fs';
import { searchConsoleFetch } from './lib.mjs';

const SITE_URL = 'https://normanroofingexperts.com/';
const SITEMAP_PATH = 'dist/sitemap-0.xml';

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`${SITEMAP_PATH} not found — run \`npm run build\` first.`);
  process.exit(1);
}

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

console.log(`Inspecting ${urls.length} URLs from the sitemap...\n`);

const results = [];
for (const url of urls) {
  try {
    const res = await searchConsoleFetch('/urlInspection/index:inspect', {
      method: 'POST',
      body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
    });
    const idx = res.inspectionResult.indexStatusResult;
    results.push({
      url,
      verdict: idx.verdict,
      coverage: idx.coverageState,
      robots: idx.robotsTxtState,
      mobile: res.inspectionResult.mobileUsabilityResult?.verdict ?? 'n/a',
      richResults: res.inspectionResult.richResultsResult?.verdict ?? 'n/a',
    });
  } catch (err) {
    results.push({ url, verdict: 'ERROR', coverage: err.message, robots: '', mobile: '', richResults: '' });
  }
  // Stay well under the URL Inspection API's per-minute quota.
  await new Promise((r) => setTimeout(r, 1200));
}

const failing = results.filter((r) => r.verdict !== 'PASS');

console.log('Full results:');
for (const r of results) {
  console.log(`  [${r.verdict}] ${r.url}`);
  console.log(`      coverage: ${r.coverage} | robots: ${r.robots} | mobile: ${r.mobile} | rich results: ${r.richResults}`);
}

console.log(`\n${results.length - failing.length}/${results.length} pages PASS indexing verdict.`);
if (failing.length > 0) {
  console.log(`\nNeed attention:`);
  for (const r of failing) {
    console.log(`  - ${r.url} — ${r.verdict} (${r.coverage})`);
  }
} else {
  console.log('No indexing issues found.');
}
