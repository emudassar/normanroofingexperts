// Shared helpers for the Search Console scripts. No third-party deps —
// Node's built-in fetch and http are enough for this small OAuth client.
import fs from 'node:fs';
import path from 'node:path';

export const TOKEN_PATH = path.resolve('.gsc/token.json');
export const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

export function getClientCreds() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error(
      'GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing from .env. Run with ' +
        '`node --env-file=.env ...` or add them to .env.'
    );
  }
  return { clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET };
}

export function loadToken() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(`No token at ${TOKEN_PATH} yet. Run: npm run gsc:auth`);
  }
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
}

export function saveToken(token) {
  fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
}

async function refreshAccessToken(token) {
  const { clientId, clientSecret } = getClientCreds();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: token.refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token refresh failed: ${data.error} — ${data.error_description ?? ''}`);
  }
  const updated = {
    ...token,
    access_token: data.access_token,
    expiry_date: Date.now() + data.expires_in * 1000,
  };
  saveToken(updated);
  return updated;
}

/** Returns a valid access token, refreshing it first if it's expired. */
export async function getAccessToken() {
  let token = loadToken();
  if (!token.expiry_date || Date.now() > token.expiry_date - 60_000) {
    token = await refreshAccessToken(token);
  }
  return token.access_token;
}

/** Authenticated fetch against an absolute Search Console API URL. */
export async function authedFetch(url, options = {}) {
  const accessToken = await getAccessToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`GSC API error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

/** Authenticated fetch against the legacy Search Console (webmasters v3) API. */
export function gscFetch(urlPath, options = {}) {
  return authedFetch(`https://www.googleapis.com/webmasters/v3${urlPath}`, options);
}

/** Authenticated fetch against the newer Search Console API (URL Inspection etc). */
export function searchConsoleFetch(urlPath, options = {}) {
  return authedFetch(`https://searchconsole.googleapis.com/v1${urlPath}`, options);
}
