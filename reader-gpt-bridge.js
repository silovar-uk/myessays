(() => {
  'use strict';

  const ROOT = '.reader-reflections';
  const ENTRY_KEY = 'myessays:reader-reflections:v1:';
  const MAX_NOTE_CHARS = 5200;
  const MAX_SUMMARY_CHARS = 900;

  function idFromHash() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); } catch { return match[1]; }
  }

  function essayNow() {
    const id = idFromHash();
    try {
      return id && typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  function readEntries(id) {
    if (!id) return [];
    try {
      const value = JSON.parse(localStorage.getItem(`${ENTRY_KEY}${id}`) || '[]');
      if (!Array.isArray(value)) return [];
      return value
        .filter(entry => entry && typeof entry === 'object' && String(entry.text || '').trim())
        .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    } catch {
      return [];
    }
  }

  function normalizeSpace(value = '') {
    return String(value).replace(/\s+/g, ' ').trim();
  }

  function trimTo(value, max) {
    const text = String(value || '').trim();
    return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
  }

  function articleSummary(essay) {
    const abstract = normalizeSpace(essay?.abstract || '');
    const headings = [...document.querySelectorAll('#readerContent h2')]
      .map(heading => normalizeSpace(heading.textContent))
      .filter(Boolean)
      .filter(text => text !== '読んで、何が残った？')
      .slice(0, 6);

    if (abstract) {
      const outline = headings.length ? `\n主な論点: ${headings.join(' / ')}` : '';
      return trimTo(`${abstract}${outline}`, MAX_SUMMARY_CHARS);
    }

    const lead = [...document.querySelectorAll('#readerContent > p, #readerContent p')]
      .map(p => normalizeSpace(p.textContent))
      .filter(Boolean)
      .slice(0, 4)
      .join(' ');
    const outline = headings.length ? `\n主な論点: ${headings.join(' / ')}` : '';
    return trimTo(`${lead}${outline}`.trim(), MAX_SUMMARY_CHARS) || '要約なし';
  }

  function notesForPrompt(entries) {
    let used = 0;
    const selected = [];

    for (const entry of entries) {
      const text = String(entry.text || '').trim();
      if (!text) continue;
      const remaining = MAX_NOTE_CHARS - used;
      if (remaining <= 0) break;
      const clipped = trimTo(text, remaining);
      selected.push(clipped);
      used += clipped.length;
      if (clipped.length < text.length) break;
    }

    const omitted = selected.length < entries.length;
    return {
      text: selected.map((text, index) => `メモ${index + 1}:\n${text}`).join('\n\n---\n\n'),
      omitted
    };
  }

  function buildPrompt(essay, entries) {
    const notes = notesForPrompt(entries);
    const articleUrl = `${location.origin}${location.pathname}#/essay/${encodeURIComponent(essay?.id || idFromHash())}`;
    const omittedNote = notes.omitted ? '\n\n※URL長を抑えるため、読後メモは新しいものから一部を送っています。' : '';

    return `以下の記事を読んだ後に残したメモを起点に、考えを深める対話をしてください。

記事タイトル:
${essay?.title || document.title.replace(/\s*\|\s*My Essays\s*$/, '')}

記事URL:
${articleUrl}

記事の要約:
${articleSummary(essay)}

After Reading メモ:
${notes.text}${omittedNote}

進め方:
- まず、メモから読み取れる「自分が引っかかった核」を短く言語化してください。
- 次に、考えを深めるための視点を提示してください。整理だけでなく、必要なら反論・別解釈・関連する考え方も入れてください。
- メモを過度に肯定せず、記事本文の要約やURLの内容と照らして、飛躍があれば指摘してください。
- 一度に質問を大量に並べず、最後は今いちばん考える価値がある問いを1つだけ返してください。
- 結論を急がず、ここから会話を続けられる形にしてください。`;
  }

  function openChatGPT(root) {
    const essay = essayNow();
    const entries = readEntries(essay?.id || idFromHash());
    if (!entries.length) return;

    const prompt = buildPrompt(essay, entries);
    const url = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');

    const status = root.querySelector('[data-reflection-status]');
    if (status) {
      status.textContent = opened ? 'ChatGPTにメモを渡しました' : 'ChatGPTを開けませんでした';
      status.dataset.tone = opened ? 'success' : 'error';
      setTimeout(() => {
        if (status.textContent === 'ChatGPTにメモを渡しました' || status.textContent === 'ChatGPTを開けませんでした') {
          status.textContent = '';
          status.dataset.tone = '';
        }
      }, 2600);
    }
  }

  function enhance(root) {
    if (!root || root.dataset.gptBridgeReady === '1') return;
    const toolbar = root.querySelector('.reflection-toolbar');
    if (!toolbar) return;

    root.dataset.gptBridgeReady = '1';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'reflection-gpt-button';
    button.dataset.gptReflection = '1';
    button.innerHTML = '<span class="reflection-gpt-mark" aria-hidden="true">✦</span><span>GPTで深める</span>';
    button.setAttribute('aria-label', 'After ReadingのメモをChatGPTで深める');
    button.addEventListener('click', () => openChatGPT(root));
    toolbar.append(button);
  }

  function enhanceAll() {
    document.querySelectorAll(ROOT).forEach(enhance);
  }

  const observer = new MutationObserver(enhanceAll);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('myessays:reader-rendered', enhanceAll);
  window.addEventListener('hashchange', () => requestAnimationFrame(enhanceAll));
  enhanceAll();
})();
