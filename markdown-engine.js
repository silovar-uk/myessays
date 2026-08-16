(() => {
  'use strict';

  const ENGINE_VERSION = '2026.08.16.2';
  const legacyRender = typeof window.renderMarkdown === 'function' ? window.renderMarkdown : null;

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[char]));
  }

  function slugify(value = '') {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[\s　]+/g, '-')
      .replace(/[^\p{L}\p{N}\-]/gu, '')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'section';
  }

  function normalizeMarkdown(markdown = '') {
    return String(markdown)
      .replace(/\r\n?/g, '\n')
      .replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '');
  }

  function safeImageSource(value = '') {
    const source = String(value).trim();
    if (/^https:\/\//i.test(source)) return true;
    if (/^(?:\.\.?\/)?assets\/[A-Za-z0-9_./-]+(?:[?#].*)?$/i.test(source)) return true;
    if (/^\/myessays\/assets\/[A-Za-z0-9_./-]+(?:[?#].*)?$/i.test(source)) return true;
    return false;
  }

  function collectFootnotes(markdown) {
    const lines = markdown.split('\n');
    const definitions = new Map();
    const body = [];
    let inFence = false;
    let fenceChar = '';
    let fenceLength = 0;

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (fence) {
        const marker = fence[1];
        const char = marker[0];
        if (!inFence) {
          inFence = true;
          fenceChar = char;
          fenceLength = marker.length;
        } else if (char === fenceChar && marker.length >= fenceLength) {
          inFence = false;
          fenceChar = '';
          fenceLength = 0;
        }
        body.push(line);
        continue;
      }

      if (!inFence) {
        const definition = line.match(/^\[\^([^\]]+)\]:\s*(.*)$/);
        if (definition) {
          const id = definition[1].trim();
          const chunks = [definition[2]];
          while (index + 1 < lines.length) {
            const continuation = lines[index + 1].match(/^(?: {2,}|\t)(.*)$/);
            if (!continuation) break;
            chunks.push(continuation[1]);
            index += 1;
          }
          definitions.set(id, chunks.join('\n').trim());
          continue;
        }
      }

      body.push(line);
    }

    if (!definitions.size) {
      return { markdown: body.join('\n'), definitions, numbers: new Map(), references: new Map() };
    }

    const numbers = new Map();
    const references = new Map();
    inFence = false;
    fenceChar = '';
    fenceLength = 0;

    const replaced = body.map(line => {
      const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
      if (fence) {
        const marker = fence[1];
        const char = marker[0];
        if (!inFence) {
          inFence = true;
          fenceChar = char;
          fenceLength = marker.length;
        } else if (char === fenceChar && marker.length >= fenceLength) {
          inFence = false;
          fenceChar = '';
          fenceLength = 0;
        }
        return line;
      }
      if (inFence) return line;

      return line.replace(/\[\^([^\]]+)\]/g, (match, rawId) => {
        const id = rawId.trim();
        if (!definitions.has(id)) return match;
        if (!numbers.has(id)) numbers.set(id, numbers.size + 1);
        const count = (references.get(id) || 0) + 1;
        references.set(id, count);
        const number = numbers.get(id);
        const safeId = slugify(id);
        const refId = `fnref-${safeId}${count > 1 ? `-${count}` : ''}`;
        return `<sup class="footnote-ref"><a href="#fn-${safeId}" id="${refId}" aria-label="脚注${number}へ">${number}</a></sup>`;
      });
    });

    return { markdown: replaced.join('\n'), definitions, numbers, references };
  }

  function renderFootnotes(footnotes) {
    if (!footnotes.numbers.size || !window.marked?.parseInline) return '';
    const ordered = [...footnotes.numbers.entries()].sort((a, b) => a[1] - b[1]);
    const items = ordered.map(([id, number]) => {
      const safeId = slugify(id);
      const body = window.marked.parseInline(footnotes.definitions.get(id) || '');
      return `<li id="fn-${safeId}"><span class="footnote-number">${number}</span><div class="footnote-body">${body} <a class="footnote-backref" href="#fnref-${safeId}" aria-label="本文の脚注${number}へ戻る">↩</a></div></li>`;
    }).join('');
    return `<section class="footnotes" aria-label="脚注"><h2 class="footnotes-title">脚注</h2><ol>${items}</ol></section>`;
  }

  function languageLabel(language = '') {
    const labels = {
      js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript',
      bash: 'Shell', sh: 'Shell', shell: 'Shell', zsh: 'Shell',
      html: 'HTML', css: 'CSS', json: 'JSON', yaml: 'YAML', yml: 'YAML',
      md: 'Markdown', markdown: 'Markdown', py: 'Python', python: 'Python',
      text: 'Text', plaintext: 'Text', txt: 'Text', sql: 'SQL'
    };
    return labels[String(language).toLowerCase()] || String(language || 'Code').toUpperCase();
  }

  function makeUniqueHeadingIds(root) {
    const used = new Map();
    root.querySelectorAll('h1, h2, h3, h4').forEach(heading => {
      const base = slugify(heading.textContent);
      const count = (used.get(base) || 0) + 1;
      used.set(base, count);
      heading.id = count === 1 ? base : `${base}-${count}`;
    });
  }

  function enhanceLinks(root) {
    root.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (!/^https?:\/\//i.test(href)) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      } catch {
        // DOMPurify already rejects unsafe protocols; malformed links stay inert.
      }
    });
  }

  function enhanceImages(root) {
    root.querySelectorAll('img').forEach(image => {
      const source = image.getAttribute('src') || '';
      if (!safeImageSource(source)) {
        image.replaceWith(document.createTextNode(image.alt || ''));
        return;
      }
      image.loading = 'lazy';
      image.decoding = 'async';
    });

    root.querySelectorAll('p').forEach(paragraph => {
      if (paragraph.children.length !== 1 || paragraph.firstElementChild?.tagName !== 'IMG' || paragraph.textContent.trim()) return;
      const image = paragraph.firstElementChild;
      const figure = document.createElement('figure');
      figure.className = 'essay-figure';
      paragraph.replaceWith(figure);
      figure.appendChild(image);
      const captionText = image.getAttribute('title');
      if (captionText) {
        const caption = document.createElement('figcaption');
        caption.textContent = captionText;
        figure.appendChild(caption);
        image.removeAttribute('title');
      }
    });
  }

  function enhanceTables(root) {
    root.querySelectorAll('table').forEach(table => {
      table.classList.add('essay-table');
      table.querySelectorAll('thead th').forEach(cell => cell.setAttribute('scope', 'col'));
      if (table.parentElement?.classList.contains('essay-table-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'essay-table-wrap';
      wrap.setAttribute('role', 'region');
      wrap.setAttribute('aria-label', '横スクロールできる表');
      wrap.tabIndex = 0;
      table.replaceWith(wrap);
      wrap.appendChild(table);
    });
  }

  function enhanceCodeBlocks(root) {
    root.querySelectorAll('pre > code').forEach(code => {
      const pre = code.parentElement;
      if (!pre || pre.parentElement?.classList.contains('code-block')) return;
      const languageClass = [...code.classList].find(name => name.startsWith('language-'));
      const language = languageClass ? languageClass.slice('language-'.length) : '';
      const block = document.createElement('div');
      block.className = 'code-block';
      block.dataset.language = language || 'plain';

      const toolbar = document.createElement('div');
      toolbar.className = 'code-toolbar';
      const label = document.createElement('span');
      label.className = 'code-language';
      label.textContent = languageLabel(language);
      const copy = document.createElement('button');
      copy.className = 'code-copy';
      copy.type = 'button';
      copy.textContent = 'コピー';
      copy.setAttribute('aria-label', `${languageLabel(language)}コードをコピー`);
      toolbar.append(label, copy);

      pre.classList.add('code-block-pre');
      code.classList.add('code-block-code');
      pre.replaceWith(block);
      block.append(toolbar, pre);
    });
  }

  function enhanceBlockquotes(root) {
    root.querySelectorAll('blockquote').forEach(quote => {
      const text = quote.textContent.trim();
      if (/^Simple English\s*:/i.test(text)) quote.classList.add('callout', 'callout-english');
    });
  }

  function enhanceTaskLists(root) {
    root.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.disabled = true;
      input.tabIndex = -1;
    });
  }

  function enhanceHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const root = template.content;
    makeUniqueHeadingIds(root);
    enhanceLinks(root);
    enhanceImages(root);
    enhanceTables(root);
    enhanceCodeBlocks(root);
    enhanceBlockquotes(root);
    enhanceTaskLists(root);
    const container = document.createElement('div');
    container.append(root.cloneNode(true));
    return container.innerHTML;
  }

  function render(markdown = '') {
    if (!window.marked?.parse || !window.DOMPurify?.sanitize) {
      console.warn('[MyEssaysMarkdown] Marked or DOMPurify is unavailable; using legacy renderer.');
      return legacyRender ? legacyRender(markdown) : `<p>${escapeHtml(markdown)}</p>`;
    }

    try {
      const source = normalizeMarkdown(markdown);
      const footnotes = collectFootnotes(source);
      const parsed = window.marked.parse(footnotes.markdown, {
        gfm: true,
        // MyEssays treats an author-entered newline as editorial intent. This
        // keeps examples, verse-like passages and deliberate Japanese rhythm
        // visible without requiring article-specific <br> tags.
        breaks: true,
        pedantic: false
      });
      const withFootnotes = `${parsed}${renderFootnotes(footnotes)}`;
      const sanitized = window.DOMPurify.sanitize(withFootnotes, {
        USE_PROFILES: { html: true },
        ADD_ATTR: ['target', 'rel', 'loading', 'decoding', 'scope', 'aria-label', 'tabindex'],
        FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
        FORBID_ATTR: ['style']
      });
      return enhanceHtml(sanitized);
    } catch (error) {
      console.error('[MyEssaysMarkdown] Rendering failed; using legacy renderer.', error);
      return legacyRender ? legacyRender(markdown) : `<p>${escapeHtml(markdown)}</p>`;
    }
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest('.code-copy');
    if (!button) return;
    const code = button.closest('.code-block')?.querySelector('code');
    if (!code) return;
    const original = button.textContent;
    try {
      await copyText(code.textContent || '');
      button.textContent = 'コピー済み';
    } catch {
      button.textContent = '失敗';
    }
    window.setTimeout(() => { button.textContent = original; }, 1400);
  });

  window.MyEssaysMarkdown = {
    version: ENGINE_VERSION,
    render,
    enhanceHtml,
    legacyRender
  };

  // app.js currently owns the public renderMarkdown name. Replacing that one
  // entry point lets the existing reader/navigation/note ecosystem stay intact
  // while Markdown parsing moves to this dedicated standards-based engine.
  window.renderMarkdown = render;
  try { renderMarkdown = render; } catch { /* global binding may be non-writable in unusual hosts */ }
})();