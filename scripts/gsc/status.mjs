// Confirms the OAuth connection works and prints a full Search Console
// snapshot for normanroofingexperts.com: verified property, sitemaps, overall
// 28-day performance totals, and breakdowns by query/page/device/country.
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
  console.log(
    `  - ${sm.path} — last submitted ${sm.lastSubmitted ?? 'n/a'}, last downloaded ${sm.lastDownloaded ?? 'n/a'}, ${sm.contents?.[0]?.submitted ?? '?'} URLs submitted / ${sm.contents?.[0]?.indexed ?? '?'} indexed`
  );
}

const end = new Date();
const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
const fmt = (d) => d.toISOString().slice(0, 10);
const range = `${fmt(start)} to ${fmt(end)}`;

async function query(dimensions, rowLimit = 10) {
  const res = await gscFetch(`/sites/${encodedSite}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify({ startDate: fmt(start), endDate: fmt(end), dimensions, rowLimit }),
  });
  return res.rows ?? [];
}

const totals = await query([], 1);
console.log(`\nOverall performance, last 28 days (${range}):`);
if (totals.length === 0) {
  console.log('  No data yet — normal for a site that has not accumulated impressions.');
} else {
  const t = totals[0];
  console.log(
    `  clicks: ${t.clicks}, impressions: ${t.impressions}, CTR: ${(t.ctr * 100).toFixed(2)}%, avg position: ${t.position.toFixed(1)}`
  );
}

function printRows(label, rows, formatKey = (k) => k) {
  console.log(`\n${label}:`);
  if (rows.length === 0) {
    console.log('  No data yet.');
    return;
  }
  for (const row of rows) {
    console.log(
      `  - ${formatKey(row.keys[0])} — clicks: ${row.clicks}, impressions: ${row.impressions}, position: ${row.position.toFixed(1)}`
    );
  }
}

printRows(`Top queries (${range})`, await query(['query'], 10));
printRows(`Top pages (${range})`, await query(['page'], 10));
printRows(`By device (${range})`, await query(['device'], 5));
printRows(`By country (${range})`, await query(['country'], 5));

console.log(
  '\nFor per-URL indexing/mobile/rich-result status, run: npm run gsc:inspect -- <url>'
);
