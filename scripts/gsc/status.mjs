// Confirms the OAuth connection works and prints a quick Search Console
// snapshot for normanroofingexperts.com: verified property, sitemaps, and
// the last 28 days of search performance (if any data has accrued yet).
import { gscFetch } from './lib.mjs';

const DOMAIN = 'normanroofingexperts.com';

const sitesRes = await gscFetch('/sites');
const sites = sitesRes.siteEntry ?? [];
const match = sites.find((s) => s.siteUrl.includes(DOMAIN));

console.log(`Properties visible to this account (${sites.length}):`);
for (const s of sites) {
  console.log(`  - ${s.siteUrl} (${s.permissionLevel})`);
}

if (!match) {
  console.log(`\nNo property matching "${DOMAIN}" found in this account.`);
  console.log('Add/verify it in Search Console, or re-run gsc:auth with the right Google account.');
  process.exit(1);
}

console.log(`\nConnected: ${match.siteUrl} — permission: ${match.permissionLevel}`);

const encodedSite = encodeURIComponent(match.siteUrl);

const sitemaps = await gscFetch(`/sites/${encodedSite}/sitemaps`);
const sitemapList = sitemaps.sitemap ?? [];
console.log(`\nSitemaps (${sitemapList.length}):`);
for (const sm of sitemapList) {
  console.log(`  - ${sm.path} — last submitted ${sm.lastSubmitted ?? 'n/a'}, last downloaded ${sm.lastDownloaded ?? 'n/a'}`);
}

const end = new Date();
const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
const fmt = (d) => d.toISOString().slice(0, 10);

const analytics = await gscFetch(`/sites/${encodedSite}/searchAnalytics/query`, {
  method: 'POST',
  body: JSON.stringify({
    startDate: fmt(start),
    endDate: fmt(end),
    dimensions: ['query'],
    rowLimit: 10,
  }),
});

const rows = analytics.rows ?? [];
console.log(`\nTop queries, last 28 days (${fmt(start)} to ${fmt(end)}):`);
if (rows.length === 0) {
  console.log('  No data yet — normal for a site that has not accumulated impressions.');
} else {
  for (const row of rows) {
    console.log(
      `  - "${row.keys[0]}" — clicks: ${row.clicks}, impressions: ${row.impressions}, position: ${row.position.toFixed(1)}`
    );
  }
}
