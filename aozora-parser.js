(() => {
  'use strict';

  if (window.MyEssaysAozoraParser) return;

  const SKIP_SELECTOR = [
    'script', 'style', 'noscript', 'template',
    '.notes', '.bibliographical_information', '.bibliografical_information', '.after_text'
  ].join(',');

  const HEADING_LEVEL = Object.freeze({
    H1: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6
  });

  function normalizeEncoding(value = '') {
    const label = String(value || '').trim().toLowerCase().replace(/[_\s]/g, '-');
    if (!label) return '';
    if (['utf8', 'utf-8'].includes(label)) return 'utf-8';
    if (['shift-jis', 'shift_jis', 'sjis', 'x-sjis', 'windows-31j', 'ms-kanji', 'csshiftjis'].includes(label)) return 'shift_jis';
    if (['euc-jp', 'eucjp'].includes(label)) return 'euc-jp';
    return label;
  }

  function detectEncoding(buffer) {
    const bytes = new Uint8Array(buffer || new ArrayBuffer(0));
    if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) return 'utf-8';

    const probeBytes = bytes.slice(0, Math.min(bytes.length, 8192));
    let probe = '';
    try { probe = new TextDecoder('windows-1252').decode(probeBytes); }
    catch { probe = Array.from(probeBytes, byte => String.fromCharCode(byte)).join(''); }

    const xml = probe.match(/<\?xml[^>]*encoding\s*=\s*["']([^"']+)["']/i);
    const metaCharset = probe.match(/<meta[^>]+charset\s*=\s*["']?([A-Za-z0-9._-]+)/i);
    const metaHttp = probe.match(/<meta[^>]+content\s*=\s*["'][^"']*charset\s*=\s*([A-Za-z0-9._-]+)/i);
    const declared = xml?.[1] || metaCharset?.[1] || metaHttp?.[1] || '';
    return normalizeEncoding(declared) || 'shift_jis';
  }

  function decodeArrayBuffer(buffer) {
    const preferred = detectEncoding(buffer);
    const candidates = [preferred, 'shift_jis', 'utf-8'].filter((value, index, array) => value && array.indexOf(value) === index);
    let lastError = null;

    for (const encoding of candidates) {
      try {
        const html = new TextDecoder(encoding, { fatal: false }).decode(buffer);
        const replacementRatio = (html.match(/\uFFFD/g) || []).length / Math.max(1, html.length);
        if (replacementRatio < 0.02 || encoding === candidates.at(-1)) return { html, encoding };
      } catch (error) {
        lastError = error;
      }
    }

    if (lastError) throw lastError;
    return { html: '', encoding: preferred || 'utf-8' };
  }

  function metaContent(doc, name) {
    const wanted = String(name || '').toLowerCase();
    const hit = [...doc.querySelectorAll('meta[name]')].find(meta => String(meta.getAttribute('name') || '').toLowerCase() === wanted);
    return hit?.getAttribute('content')?.trim() || '';
  }

  function cleanText(value = '') {
    return String(value)
      .replace(/\r/g, '')
      .replace(/[\n\t]+/g, ' ')
      .replace(/ {2,}/g, ' ')
      .trim();
  }

  function plainText(element) {
    if (!element) return '';
    const clone = element.cloneNode(true);
    clone.querySelectorAll('rt, rp, script, style, noscript, template, .notes').forEach(node => node.remove());
    return cleanText(clone.textContent || '');
  }

  function normalizeRuns(runs) {
    const next = [];
    for (const run of runs) {
      const text = String(run?.text || '');
      if (!text) continue;
      const normalized = text.replace(/\r/g, '').replace(/[\n\t]+/g, ' ').replace(/ {2,}/g, ' ');
      if (!normalized.trim()) continue;
      const value = { text: normalized };
      if (run.ruby) value.ruby = cleanText(run.ruby);
      const last = next.at(-1);
      if (!value.ruby && last && !last.ruby) last.text += value.text;
      else next.push(value);
    }
    if (next.length) {
      next[0].text = next[0].text.replace(/^ +/, '');
      next[next.length - 1].text = next[next.length - 1].text.replace(/ +$/, '');
    }
    return next.filter(run => run.text);
  }

  function parseDocument(html, options = {}) {
    const dom = new DOMParser().parseFromString(String(html || ''), 'text/html');
    const parserError = dom.querySelector('parsererror');
    if (parserError && !dom.body?.textContent?.trim()) throw new Error('XHTMLを解析できませんでした');

    const title = metaContent(dom, 'DC.Title')
      || plainText(dom.querySelector('.title'))
      || cleanText(dom.querySelector('title')?.textContent || '')
      || '名称未設定';

    const author = metaContent(dom, 'DC.Creator')
      || plainText(dom.querySelector('.author'))
      || '';

    const main = dom.querySelector('.main_text, #main_text');
    if (!main) throw new Error('青空文庫の本文(main_text)を見つけられませんでした');

    const blocks = [];
    let paragraphRuns = [];

    const appendRun = run => {
      if (!run?.text) return;
      paragraphRuns.push(run);
    };

    const flushParagraph = () => {
      const runs = normalizeRuns(paragraphRuns);
      paragraphRuns = [];
      if (!runs.length) return;
      const text = runs.map(run => run.text).join('');
      if (!cleanText(text)) return;
      blocks.push({ type: 'paragraph', runs });
    };

    const visit = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const value = String(node.nodeValue || '');
        if (value.trim()) appendRun({ text: value });
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      const element = node;
      if (element.matches(SKIP_SELECTOR)) return;

      if (HEADING_LEVEL[element.tagName]) {
        flushParagraph();
        const text = plainText(element);
        if (text) blocks.push({ type: 'heading', level: HEADING_LEVEL[element.tagName], text });
        return;
      }

      if (element.tagName === 'BR') {
        flushParagraph();
        return;
      }

      if (element.tagName === 'RUBY') {
        const rb = element.querySelector(':scope > rb');
        let base = rb ? plainText(rb) : '';
        if (!base) {
          const clone = element.cloneNode(true);
          clone.querySelectorAll('rt, rp').forEach(child => child.remove());
          base = cleanText(clone.textContent || '');
        }
        const ruby = cleanText([...element.querySelectorAll(':scope > rt')].map(rt => rt.textContent || '').join(''));
        if (base) appendRun(ruby ? { text: base, ruby } : { text: base });
        return;
      }

      if (element.tagName === 'IMG') {
        const alt = cleanText(element.getAttribute('alt') || element.getAttribute('title') || '');
        if (alt) appendRun({ text: alt });
        return;
      }

      const blockBoundary = ['P', 'DIV', 'BLOCKQUOTE', 'LI', 'SECTION', 'ARTICLE'].includes(element.tagName);
      if (blockBoundary && element !== main) flushParagraph();
      [...element.childNodes].forEach(visit);
      if (blockBoundary && element !== main) flushParagraph();
    };

    [...main.childNodes].forEach(visit);
    flushParagraph();

    if (!blocks.length) throw new Error('本文を読み取れませんでした');

    return {
      schemaVersion: 1,
      title,
      author,
      source: {
        type: 'aozora-xhtml',
        url: String(options.sourceUrl || options.xhtmlUrl || ''),
        cardUrl: String(options.cardUrl || ''),
        xhtmlUrl: String(options.xhtmlUrl || options.sourceUrl || ''),
        name: String(options.sourceName || ''),
        encoding: String(options.encoding || ''),
        importedAt: String(options.importedAt || '')
      },
      blocks
    };
  }

  function parseArrayBuffer(buffer, options = {}) {
    const decoded = decodeArrayBuffer(buffer);
    return parseDocument(decoded.html, { ...options, encoding: decoded.encoding });
  }

  async function parseFile(file) {
    if (!file?.arrayBuffer) throw new Error('XHTMLファイルを選択してください');
    const buffer = await file.arrayBuffer();
    return parseArrayBuffer(buffer, { sourceName: file.name || '' });
  }

  function plainTextOf(documentValue) {
    return (documentValue?.blocks || [])
      .map(block => block.type === 'heading'
        ? block.text
        : (block.runs || []).map(run => run.text).join(''))
      .join('\n');
  }

  function metrics(documentValue) {
    const fullText = plainTextOf(documentValue);
    const text = fullText.replace(/\s/g, '');
    const japaneseChars = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー々〆ヶ]/gu) || []).length;
    const englishWords = (fullText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
    return {
      charCount: text.length,
      minutes: Math.max(1, Math.ceil((japaneseChars / 500) + (englishWords / 200)))
    };
  }

  function escapeMarkdown(value = '') {
    return String(value).replace(/([\\*_{}\[\]()#+.!>|-])/g, '\\$1');
  }

  function toMarkdown(documentValue) {
    const out = [];
    for (const block of documentValue?.blocks || []) {
      if (block.type === 'heading') {
        const level = block.level <= 3 ? 2 : 3;
        out.push('#'.repeat(level) + ' ' + escapeMarkdown(block.text || ''));
      } else if (block.type === 'paragraph') {
        out.push((block.runs || []).map(run => escapeMarkdown(run.text || '')).join(''));
      }
      out.push('');
    }
    return out.join('\n').trim();
  }

  window.MyEssaysAozoraParser = Object.freeze({
    version: '2026.09.27',
    detectEncoding,
    decodeArrayBuffer,
    parseDocument,
    parseArrayBuffer,
    parseFile,
    plainTextOf,
    metrics,
    toMarkdown
  });
})();