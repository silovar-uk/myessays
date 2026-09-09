(() => {
  'use strict';
  const originalFetch = window.fetch.bind(window);
  const essayPath = 'essays/2026-09-09-braess-paradox-zero-minute-shortcut.md';
  const articleId = 'braess-paradox-zero-minute-shortcut';
  const enMixPath = 'english-mix/braess-paradox-zero-minute-shortcut.md';

  window.fetch = async (input, init) => {
    const response = await originalFetch(input, init);
    if (!response.ok) return response;

    const rawUrl = typeof input === 'string' ? input : input?.url;
    if (!rawUrl) return response;
    const url = new URL(rawUrl, window.location.href);

    if (url.pathname.endsWith('/data/index.json')) {
      const data = await response.clone().json();
      if (Array.isArray(data.essays) && !data.essays.includes(essayPath)) data.essays.unshift(essayPath);
      return new Response(JSON.stringify(data), { status: response.status, statusText: response.statusText, headers: { 'content-type': 'application/json' } });
    }

    if (url.pathname.endsWith('/data/versions-index.json')) {
      const data = await response.clone().json();
      data.articles ||= {};
      data.articles[articleId] = { ...(data.articles[articleId] || {}), 'en-mix': enMixPath };
      return new Response(JSON.stringify(data), { status: response.status, statusText: response.statusText, headers: { 'content-type': 'application/json' } });
    }

    return response;
  };
})();
