(() => {
  'use strict';

  const escapeRegExp = (value = '') => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function referenceHeading(root) {
    return [...root.querySelectorAll('h2, h3')].find(heading => /^(参考文献|references|bibliography)$/i.test(heading.textContent.trim()));
  }

  function referenceElements(heading) {
    if (!heading) return [];
    const rows = [];
    let node = heading.nextElementSibling;
    while (node && !/^H[1-3]$/.test(node.tagName)) {
      if (node.matches('p, li')) rows.push(node);
      node = node.nextElementSibling;
    }
    return rows;
  }

  function sourceFromReference(row) {
    const urlAnchor = row.querySelector('a[href^="http"]');
    if (!urlAnchor) return null;

    const text = row.textContent.trim();
    const yearMatch = text.match(/\((\d{4}[a-z]?)\)/i);
    if (!yearMatch) return null;

    const beforeYear = text.slice(0, yearMatch.index).trim();
    const surname = beforeYear.split(',')[0].trim();
    if (!surname) return null;

    return {
      row,
      href: urlAnchor.href,
      urlAnchor,
      year: yearMatch[1],
      surname,
      label: `${surname} (${yearMatch[1]})`
    };
  }

  function wrapReferenceTitle(source) {
    const row = source.row;
    if (row.querySelector('.reference-title-link')) return;

    const childNodes = [...row.childNodes];
    const yearPattern = new RegExp(`\\(${escapeRegExp(source.year)}\\)\\.\\s*`, 'i');

    for (let index = 0; index < childNodes.length; index += 1) {
      const node = childNodes[index];
      if (node.nodeType !== Node.TEXT_NODE) continue;
      const value = node.nodeValue || '';
      const match = value.match(yearPattern);
      if (!match) continue;

      const titleStart = (match.index || 0) + match[0].length;
      const afterYear = value.slice(titleStart);
      if (afterYear.trim()) {
        const trailing = afterYear.match(/^(.*?\.)(\s*)$/s);
        const titleText = trailing ? trailing[1].replace(/\.$/, '') : afterYear.trim().replace(/\.$/, '');
        if (titleText) {
          const titleOffset = afterYear.indexOf(titleText);
          const before = value.slice(0, titleStart + Math.max(0, titleOffset));
          const after = value.slice(titleStart + Math.max(0, titleOffset) + titleText.length);
          const link = document.createElement('a');
          link.className = 'reference-title-link';
          link.href = source.href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = titleText;
          node.parentNode.insertBefore(document.createTextNode(before), node);
          node.parentNode.insertBefore(link, node);
          node.parentNode.insertBefore(document.createTextNode(after), node);
          node.remove();
          return;
        }
      }

      const nextMeaningful = childNodes.slice(index + 1).find(candidate => candidate.nodeType !== Node.TEXT_NODE || (candidate.nodeValue || '').trim());
      if (nextMeaningful?.nodeType === Node.ELEMENT_NODE && nextMeaningful.tagName === 'EM') {
        const link = document.createElement('a');
        link.className = 'reference-title-link';
        link.href = source.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        nextMeaningful.parentNode.insertBefore(link, nextMeaningful);
        link.appendChild(nextMeaningful);
        return;
      }
    }
  }

  function compactReferenceUrl(source) {
    const anchor = source.urlAnchor;
    if (!anchor || anchor.dataset.sourceCompact === 'true') return;
    anchor.dataset.sourceCompact = 'true';
    anchor.classList.add('reference-source-link');
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = '↗ 引用元';
    anchor.setAttribute('aria-label', `${source.label} の引用元を別タブで開く`);
  }

  function textNodesBeforeReferences(root, heading) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('a, code, button, .reading-stats, .reader-end-navigation, .reader-reflections')) return NodeFilter.FILTER_REJECT;
        if (heading && (heading === parent || heading.compareDocumentPosition(parent) & Node.DOCUMENT_POSITION_FOLLOWING)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function insertCitationLinks(root, sources, heading) {
    const nodes = textNodesBeforeReferences(root, heading);

    nodes.forEach(node => {
      const original = node.nodeValue || '';
      const lower = original.toLocaleLowerCase();
      const insertions = [];

      sources.forEach(source => {
        const surname = source.surname.toLocaleLowerCase();
        const year = source.year.toLocaleLowerCase();
        let from = 0;
        while (from < original.length) {
          const yearIndex = lower.indexOf(year, from);
          if (yearIndex === -1) break;
          const context = lower.slice(Math.max(0, yearIndex - 100), yearIndex);
          if (context.includes(surname)) {
            let at = yearIndex + source.year.length;
            if (original[at] === ')' || original[at] === '）') at += 1;
            insertions.push({ at, source });
          }
          from = yearIndex + source.year.length;
        }
      });

      if (!insertions.length) return;
      const unique = [];
      const seen = new Set();
      insertions.sort((a, b) => a.at - b.at).forEach(item => {
        const key = `${item.at}|${item.source.href}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      });

      const fragment = document.createDocumentFragment();
      let cursor = 0;
      unique.forEach(({ at, source }) => {
        fragment.appendChild(document.createTextNode(original.slice(cursor, at)));
        const link = document.createElement('a');
        link.className = 'citation-source-link';
        link.href = source.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = '↗';
        link.title = `${source.label} の引用元`;
        link.setAttribute('aria-label', `${source.label} の引用元を別タブで開く`);
        fragment.appendChild(link);
        cursor = at;
      });
      fragment.appendChild(document.createTextNode(original.slice(cursor)));
      node.replaceWith(fragment);
    });
  }

  function enhanceSourceLinks(context) {
    const root = context.root;
    const heading = referenceHeading(root);
    if (!heading) return;

    const sources = referenceElements(heading).map(sourceFromReference).filter(Boolean);
    if (!sources.length) return;

    sources.forEach(source => {
      wrapReferenceTitle(source);
      compactReferenceUrl(source);
    });
    insertCitationLinks(root, sources, heading);
  }

  function init() {
    if (window.MyEssaysReaderRuntime?.register) {
      window.MyEssaysReaderRuntime.register('source-links', enhanceSourceLinks, { priority: 40 });
      return;
    }

    document.addEventListener('myessays:reader-rendered', () => {
      const root = document.getElementById('readerContent');
      if (root) enhanceSourceLinks({ root });
    });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
