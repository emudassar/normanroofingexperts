// Per-URL indexing status via the URL Inspection API — coverage verdict,
// canonical, mobile usability, and rich results for one specific URL.
// Usage: npm run gsc:inspect -- https://normanroofingexperts.com/about/
import { searchConsoleFetch } from './lib.mjs';

const SITE_URL = 'https://normanroofingexperts.com/';
const inspectionUrl = process.argv[2];

if (!inspectionUrl) {
  console.error('Usage: npm run gsc:inspect -- <url>');
  process.exit(1);
}

const res = await searchConsoleFetch('/urlInspection/index:inspect', {
  method: 'POST',
  body: JSON.stringify({ inspectionUrl, siteUrl: SITE_URL }),
});

const r = res.inspectionResult;
const idx = r.indexStatusResult;

console.log(`URL: ${inspectionUrl}`);
console.log(`\nIndex status:`);
console.log(`  Verdict: ${idx.verdict}`);
console.log(`  Coverage state: ${idx.coverageState}`);
console.log(`  Last crawl: ${idx.lastCrawlTime ?? 'never crawled'}`);
console.log(`  Google-selected canonical: ${idx.googleCanonical ?? 'n/a'}`);
console.log(`  User-declared canonical: ${idx.userCanonical ?? 'n/a'}`);
console.log(`  Crawled as: ${idx.crawledAs ?? 'n/a'}`);
console.log(`  Indexing allowed: ${idx.robotsTxtState ?? 'n/a'} (robots.txt)`);

if (r.mobileUsabilityResult) {
  console.log(`\nMobile usability: ${r.mobileUsabilityResult.verdict}`);
}
if (r.richResultsResult) {
  console.log(`\nRich results: ${r.richResultsResult.verdict}`);
  for (const item of r.richResultsResult.detectedItems ?? []) {
    console.log(`  - ${item.richResultType}: ${item.items?.length ?? 0} item(s)`);
  }
}
