(() => {
  'use strict';

  if (window.MyEssaysRoute?.installed) return;

  const LANG_TO_VERSION = Object.freeze({
    ja: 'ja',
    en: 'en-mix',
    es: 'es-mix'
  });
  const VERSION_TO_LANG = Object.freeze(Object.fromEntries(
    Object.entries(LANG_TO_VERSION).map(([lang, version]) => [version, lang])
  ));

  function normalizeLang(value) {
    const lang = String(value || '').trim().toLowerCase();
    return Object.prototype.hasOwnProperty.call(LANG_TO_VERSION, lang) ? lang : '';
  }

  function parse(hash = location.hash) {
    const raw = String(hash || '').replace(/^#/, '');
    const queryIndex = raw.indexOf('?');
    const routePath = queryIndex >= 0 ? raw.slice(0, queryIndex) : raw;
    const query = queryIndex >= 0 ? raw.slice(queryIndex + 1) : '';
    const params = new URLSearchParams(query);
    const match = routePath.match(/^\/essay\/(.+)$/);

    if (!match) {
      return {
        type: 'library',
        articleId: '',
        lang: '',
        hasLang: false,
        langValid: true
      };
    }

    let articleId = '';
    try { articleId = decodeURIComponent(match[1]); }
    catch { articleId = match[1]; }

    const hasLang = params.has('lang');
    const rawLang = hasLang ? params.get('lang') || '' : '';
    const lang = normalizeLang(rawLang);

    return {
      type: 'essay',
      articleId,
      lang,
      hasLang,
      langValid: !hasLang || Boolean(lang)
    };
  }

  function versionForLang(lang) {
    return LANG_TO_VERSION[normalizeLang(lang)] || 'ja';
  }

  function langForVersion(version) {
    return VERSION_TO_LANG[String(version || '')] || 'ja';
  }

  function essayHash({ articleId, lang = '' } = {}) {
    const encodedId = encodeURIComponent(String(articleId || ''));
    if (!encodedId) return '#/';
    const normalized = normalizeLang(lang);
    return `#/essay/${encodedId}${normalized ? `?lang=${normalized}` : ''}`;
  }

  function replaceEssayLanguage(lang, articleId = parse().articleId) {
    if (!articleId) return false;
    const normalized = normalizeLang(lang) || 'ja';
    const hash = essayHash({ articleId, lang: normalized });
    if (location.hash === hash) return true;

    const url = new URL(location.href);
    url.hash = hash;
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
    document.dispatchEvent(new CustomEvent('myessays:route-state-replaced', {
      detail: { articleId, lang: normalized, hash }
    }));
    return true;
  }

  function navigateEssay(articleId, lang = '') {
    const hash = essayHash({ articleId, lang });
    if (location.hash !== hash) location.hash = hash;
    return hash;
  }

  window.MyEssaysRoute = Object.freeze({
    installed: true,
    parse,
    essayHash,
    navigateEssay,
    replaceEssayLanguage,
    normalizeLang,
    versionForLang,
    langForVersion,
    langToVersion: LANG_TO_VERSION,
    versionToLang: VERSION_TO_LANG
  });
})();