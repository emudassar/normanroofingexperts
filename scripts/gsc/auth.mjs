// One-time OAuth loopback flow for Search Console access.
//
// Prints a Google consent URL — open it yourself, sign in with the Google
// account that owns the normanroofingexperts.com Search Console property,
// and click Allow. This script never sees your password; it only receives
// the redirect back to localhost with a short-lived auth code, which it
// exchanges for tokens saved to .gsc/token.json (gitignored).
import http from 'node:http';
import { getClientCreds, saveToken, SCOPE } from './lib.mjs';

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}`;

const { clientId, clientSecret } = getClientCreds();

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
  client_id: clientId,
  redirect_uri: REDIRECT_URI,
  response_type: 'code',
  scope: SCOPE,
  access_type: 'offline',
  prompt: 'consent',
})}`;

console.log('\nOpen this URL and approve access:\n');
console.log(authUrl);
console.log(`\nWaiting for the redirect to ${REDIRECT_URI} ...`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.end('Access denied — you can close this tab.');
    console.error(`\nGoogle returned an error: ${error}`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.end('No code received — you can close this tab.');
    return;
  }

  res.end('Connected. You can close this tab and return to the terminal.');
  server.close();

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    }),
  });
  const data = await tokenRes.json();
  if (!tokenRes.ok) {
    console.error(`\nToken exchange failed: ${data.error} — ${data.error_description ?? ''}`);
    process.exit(1);
  }

  saveToken({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expiry_date: Date.now() + data.expires_in * 1000,
  });

  console.log('\nSaved token to .gsc/token.json. Run: npm run gsc:status');
  process.exit(0);
});

server.listen(PORT);
