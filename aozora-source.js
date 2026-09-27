(() => {
  'use strict';

  if (window.MyEssaysAozoraSource) return;

  const DEFAULT_ENDPOINT = 'https://aozora-fetch.silovar-uk.workers.dev/v1/fetch';
  const HOST = 'www.aozora.gr.jp';
  const CARD_PATH = /^\/cards\/[0-9]{6}\/card[0-9]+\.html$/;
  const XHTML_PATH = /^\/cards\/[0-9]{6}\/files\/[A-Za-z0-9._-]+\.html$/;

  class AozoraSourceError extends Error {
    constructor(code, message = code, detail = null) {
      super(message);
      this.name = 'AozoraSourceError';
      this.code = code;
      this.detail = detail;
    }
  }

  function proxyEndpoint() {
    const meta = document.querySelector('meta[name="aozora-proxy-endpoint"]')?.content?.trim();
    return meta || window.MYESSAYS_AOZORA_PROXY_URL || DEFAULT_ENDPOINT;
  }

  function normalizeAozoraUrl(input) {
    let value = String(input || '').trim();
    if (!value) throw new AozoraSourceError('INVALID_URL');
    if (/^www\.aozora\.gr\.jp\//i.test(value)) value = 'https://' + value;

    let url;
    try { url = new URL(value); }
    catch { throw new AozoraSourceError('INVALID_URL'); }

    if (url.hostname.toLowerCase() !== HOST) throw new AozoraSourceError('UNSUPPORTED_HOST');
    if (url.username || url.password || url.port) throw new AozoraSourceError('UNSUPPORTED_URL');
    if (!['http:', 'https:'].includes(url.protocol)) throw new AozoraSourceError('UNSUPPORTED_URL');

    let decodedPath = '';
    try { decodedPath = decodeURIComponent(url.pathname); }
    catch { throw new AozoraSourceError('INVALID_URL'); }
    if (decodedPath.includes('..') || decodedPath.includes('\\') || decodedPath.includes('\0')) {
      throw new AozoraSourceError('UNSUPPORTED_PATH');
    }

    url.protocol = 'https:';
    url.hostname = HOST;
    url.hash = '';
    url.search = '';

    const kind = classifyAozoraUrl(url);
    if (kind === 'unsupported') throw new AozoraSourceError('UNSUPPORTED_PATH');
    return url.toString();
  }

  function classifyAozoraUrl(input) {
    let url;
    try { url = input instanceof URL ? input : new URL(String(input || '')); }
    catch { return 'unsupported'; }
    if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== HOST || url.username || url.password || url.port) return 'unsupported';
    if (CARD_PATH.test(url.pathname)) return 'card';
    if (XHTML_PATH.test(url.pathname)) return 'xhtml';
    return 'unsupported';
  }

  function validateAozoraUrl(input) {
    try {
      const url = normalizeAozoraUrl(input);
      return { ok: true, url, kind: classifyAozoraUrl(url) };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async function responseError(response) {
    let code = 'UPSTREAM_ERROR';
    try {
      const value = await response.clone().json();
      if (value?.error) code = String(value.error);
    } catch {}
    if (response.status === 404) code = 'UPSTREAM_NOT_FOUND';
    if (response.status === 429) code = 'RATE_LIMITED';
    throw new AozoraSourceError(code, code, { status: response.status });
  }

  async function fetchAozoraBytes(input) {
    const target = normalizeAozoraUrl(input);
    const endpoint = proxyEndpoint();
    if (!endpoint) throw new AozoraSourceError('PROXY_NOT_CONFIGURED');

    const requestUrl = new URL(endpoint, location.href);
    requestUrl.searchParams.set('url', target);
    let response;
    try {
      response = await fetch(requestUrl.toString(), {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        headers: { Accept: 'application/octet-stream' }
      });
    } catch (error) {
      throw new AozoraSourceError('NETWORK_ERROR', 'NETWORK_ERROR', error);
    }

    if (!response.ok) await responseError(response);
    return {
      url: target,
      buffer: await response.arrayBuffer(),
      sourceHeader: response.headers.get('X-Aozora-Source') || target
    };
  }

  function decodeHtml(buffer) {
    const parser = window.MyEssaysAozoraParser;
    if (!parser?.decodeArrayBuffer) throw new AozoraSourceError('PARSER_UNAVAILABLE');
    return parser.decodeArrayBuffer(buffer).html;
  }

  function parseCard(buffer) {
    const html = decodeHtml(buffer);
    return new DOMParser().parseFromString(html, 'text/html');
  }

  function eligibleXhtmlUrl(href, baseUrl) {
    if (!href) return '';
    let url;
    try { url = new URL(href, baseUrl); }
    catch { return ''; }
    const result = validateAozoraUrl(url.toString());
    return result.ok && result.kind === 'xhtml' ? result.url : '';
  }

  function findXhtmlUrl(cardDocument, cardUrl) {
    const anchors = [...cardDocument.querySelectorAll('a[href]')];

    const immediate = anchors.find(anchor => /いますぐ\s*XHTML\s*版で読む/i.test(String(anchor.textContent || '').replace(/\s+/g, ' ')));
    const immediateUrl = eligibleXhtmlUrl(immediate?.getAttribute('href'), cardUrl);
    if (immediateUrl) return immediateUrl;

    const rows = [...cardDocument.querySelectorAll('tr')].filter(row => /XHTML\s*ファイル/i.test(String(row.textContent || '').replace(/\s+/g, ' ')));
    for (const row of rows) {
      for (const anchor of row.querySelectorAll('a[href]')) {
        const hit = eligibleXhtmlUrl(anchor.getAttribute('href'), cardUrl);
        if (hit) return hit;
      }
    }

    for (const anchor of anchors) {
      const hit = eligibleXhtmlUrl(anchor.getAttribute('href'), cardUrl);
      if (hit) return hit;
    }

    throw new AozoraSourceError('XHTML_NOT_FOUND');
  }

  async function resolveAozoraSource(input, options = {}) {
    const onStatus = typeof options.onStatus === 'function' ? options.onStatus : () => {};
    const inputUrl = normalizeAozoraUrl(input);
    const kind = classifyAozoraUrl(inputUrl);

    if (kind === 'xhtml') {
      onStatus('fetching-xhtml');
      const xhtml = await fetchAozoraBytes(inputUrl);
      return { inputUrl, cardUrl: '', xhtmlUrl: inputUrl, buffer: xhtml.buffer };
    }

    onStatus('fetching-card');
    const card = await fetchAozoraBytes(inputUrl);
    onStatus('finding-xhtml');
    const cardDocument = parseCard(card.buffer);
    const xhtmlUrl = findXhtmlUrl(cardDocument, inputUrl);
    onStatus('fetching-xhtml');
    const xhtml = await fetchAozoraBytes(xhtmlUrl);
    return { inputUrl, cardUrl: inputUrl, xhtmlUrl, buffer: xhtml.buffer };
  }

  window.MyEssaysAozoraSource = Object.freeze({
    version: '2026.09.27',
    AozoraSourceError,
    normalizeAozoraUrl,
    classifyAozoraUrl,
    validateAozoraUrl,
    fetchAozoraBytes,
    parseCard,
    findXhtmlUrl,
    resolveAozoraSource,
    proxyEndpoint
  });
})();