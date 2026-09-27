const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'workers', 'aozora-fetch-worker', 'src', 'index.js'), 'utf8');
const modulePromise = import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

test('worker target validation is strict', async () => {
  const api = await modulePromise;
  assert.equal(
    api.normalizeTarget('https://www.aozora.gr.jp/cards/001383/card57349.html').toString(),
    'https://www.aozora.gr.jp/cards/001383/card57349.html'
  );
  for (const url of [
    'http://www.aozora.gr.jp/cards/001383/card57349.html',
    'https://www.aozora.gr.jp.evil.example/cards/001383/card57349.html',
    'https://user:pass@www.aozora.gr.jp/cards/001383/card57349.html',
    'https://www.aozora.gr.jp:8443/cards/001383/card57349.html',
    'https://www.aozora.gr.jp/index.html',
    'https://www.aozora.gr.jp/cards/001383/files/%2e%2e%2fevil.html'
  ]) assert.throws(() => api.normalizeTarget(url));
});

test('worker returns raw bytes with production CORS and no-store', async () => {
  const api = await modulePromise;
  const upstream = async () => new Response(Buffer.from([0x82, 0xa0, 0x82, 0xa2]), {
    status: 200,
    headers: { 'Content-Type': 'text/html', 'Content-Length': '4' }
  });
  const request = new Request(
    'https://worker.example/v1/fetch?url=' + encodeURIComponent('https://www.aozora.gr.jp/cards/001383/files/57349_60032.html'),
    { headers: { Origin: 'https://silovar-uk.github.io' } }
  );
  const response = await api.handleRequest(request, {}, upstream);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://silovar-uk.github.io');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Content-Type'), 'application/octet-stream');
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [0x82, 0xa0, 0x82, 0xa2]);
});

test('worker rejects unsupported origins, methods and external redirects', async () => {
  const api = await modulePromise;
  const target = encodeURIComponent('https://www.aozora.gr.jp/cards/001383/card57349.html');

  const wrongOrigin = await api.handleRequest(new Request('https://worker.example/v1/fetch?url=' + target, {
    headers: { Origin: 'https://evil.example' }
  }), {}, async () => new Response('never'));
  assert.equal(wrongOrigin.status, 403);

  const post = await api.handleRequest(new Request('https://worker.example/v1/fetch?url=' + target, {
    method: 'POST',
    headers: { Origin: 'https://silovar-uk.github.io' }
  }), {}, async () => new Response('never'));
  assert.equal(post.status, 405);

  const redirect = await api.handleRequest(new Request('https://worker.example/v1/fetch?url=' + target, {
    headers: { Origin: 'https://silovar-uk.github.io' }
  }), {}, async () => new Response(null, {
    status: 302,
    headers: { Location: 'https://evil.example/file.html' }
  }));
  assert.equal(redirect.status, 403);
});
