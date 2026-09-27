const HOST = 'www.aozora.gr.jp';
const CARD_PATH = /^\/cards\/[0-9]{6}\/card[0-9]+\.html$/;
const XHTML_PATH = /^\/cards\/[0-9]{6}\/files\/[A-Za-z0-9._-]+\.html$/;
const DEFAULT_ORIGIN = 'https://silovar-uk.github.io';
const MAX_REDIRECTS = 3;
const MAX_BYTES = 8 * 1024 * 1024;

export function allowedOrigins(env = {}) {
  const extra = String(env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
  return new Set([DEFAULT_ORIGIN, ...extra]);
}

export function normalizeTarget(input) {
  let url;
  try { url = new URL(String(input || '')); }
  catch { throw new Error('INVALID_URL'); }

  if (url.protocol !== 'https:') throw new Error('INVALID_URL');
  if (url.hostname.toLowerCase() !== HOST) throw new Error('UNSUPPORTED_HOST');
  if (url.username || url.password || url.port || url.search || url.hash) throw new Error('UNSUPPORTED_URL');
  if (/%/i.test(url.pathname)) throw new Error('UNSUPPORTED_PATH');

  const decoded = decodeURIComponent(url.pathname);
  if (decoded.includes('..') || decoded.includes('\\') || decoded.includes('\0')) throw new Error('UNSUPPORTED_PATH');
  if (!CARD_PATH.test(url.pathname) && !XHTML_PATH.test(url.pathname)) throw new Error('UNSUPPORTED_PATH');
  return url;
}

function cors(origin, env) {
  const headers = new Headers({
    'Vary': 'Origin',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  if (origin && allowedOrigins(env).has(origin)) headers.set('Access-Control-Allow-Origin', origin);
  return headers;
}

function jsonError(code, status, origin, env) {
  const headers = cors(origin, env);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify({ error: code }), { status, headers });
}

async function fetchWithValidatedRedirects(initial, upstreamFetch) {
  let current = normalizeTarget(initial);

  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const response = await upstreamFetch(current.toString(), {
      method: 'GET',
      redirect: 'manual',
      cache: 'no-store',
      headers: {
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.1',
        'User-Agent': 'MyEssays-Aozora-Reader/1.0'
      }
    });

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('Location');
      if (!location) throw new Error('UPSTREAM_ERROR');
      if (redirectCount >= MAX_REDIRECTS) throw new Error('TOO_MANY_REDIRECTS');
      current = normalizeTarget(new URL(location, current).toString());
      continue;
    }

    return { response, finalUrl: current.toString() };
  }

  throw new Error('TOO_MANY_REDIRECTS');
}

export async function handleRequest(request, env = {}, upstreamFetch = fetch) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('Origin') || '';
  const headers = cors(origin, env);

  if (request.method === 'OPTIONS') {
    if (origin && !allowedOrigins(env).has(origin)) return jsonError('ORIGIN_NOT_ALLOWED', 403, origin, env);
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Accept');
    headers.set('Access-Control-Max-Age', '86400');
    return new Response(null, { status: 204, headers });
  }

  if (!['GET', 'HEAD'].includes(request.method)) return jsonError('METHOD_NOT_ALLOWED', 405, origin, env);
  if (origin && !allowedOrigins(env).has(origin)) return jsonError('ORIGIN_NOT_ALLOWED', 403, origin, env);
  if (requestUrl.pathname !== '/v1/fetch') return jsonError('NOT_FOUND', 404, origin, env);

  const rawTarget = requestUrl.searchParams.get('url');
  if (!rawTarget) return jsonError('INVALID_REQUEST', 400, origin, env);

  let target;
  try { target = normalizeTarget(rawTarget); }
  catch (error) {
    const code = String(error?.message || 'INVALID_URL');
    const status = code === 'UNSUPPORTED_HOST' || code === 'UNSUPPORTED_PATH' || code === 'UNSUPPORTED_URL' ? 403 : 400;
    return jsonError(code, status, origin, env);
  }

  try {
    const { response, finalUrl } = await fetchWithValidatedRedirects(target, upstreamFetch);
    if (response.status === 404) return jsonError('UPSTREAM_NOT_FOUND', 404, origin, env);
    if (!response.ok) return jsonError('UPSTREAM_ERROR', 502, origin, env);

    const announced = Number(response.headers.get('Content-Length') || 0);
    if (announced > MAX_BYTES) return jsonError('UPSTREAM_TOO_LARGE', 413, origin, env);

    const body = await response.arrayBuffer();
    if (body.byteLength > MAX_BYTES) return jsonError('UPSTREAM_TOO_LARGE', 413, origin, env);

    const outHeaders = cors(origin, env);
    outHeaders.set('Content-Type', 'application/octet-stream');
    outHeaders.set('Content-Length', String(body.byteLength));
    outHeaders.set('X-Aozora-Source', finalUrl);
    if (request.method === 'HEAD') return new Response(null, { status: 200, headers: outHeaders });
    return new Response(body, { status: 200, headers: outHeaders });
  } catch (error) {
    const code = String(error?.message || 'UPSTREAM_ERROR');
    if (['UNSUPPORTED_HOST', 'UNSUPPORTED_PATH', 'UNSUPPORTED_URL'].includes(code)) return jsonError(code, 403, origin, env);
    if (code === 'TOO_MANY_REDIRECTS') return jsonError(code, 502, origin, env);
    return jsonError('UPSTREAM_ERROR', 502, origin, env);
  }
}

export default {
  fetch(request, env) {
    return handleRequest(request, env);
  }
};