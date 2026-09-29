(() => {
  'use strict';

  const ROOT = '.reader-reflections';
  const INTRO_ROOT = '.reader-v2-intro';
  const RESONANCE_ROOT = '.reader-resonance';
  const ENTRY_KEY = 'myessays:reader-reflections:v1:';
  const MAX_NOTE_CHARS = 5200;
  const MAX_SUMMARY_CHARS = 900;

  function idFromHash() {
    return window.MyEssaysRoute?.parse?.().articleId || '';
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

  function articleUrl(essay) {
    return `${location.origin}${location.pathname}#/essay/${encodeURIComponent(essay?.id || idFromHash())}`;
  }

  function buildPrompt(essay, entries) {
    const notes = notesForPrompt(entries);
    const articleUrlValue = articleUrl(essay);
    const omittedNote = notes.omitted ? '\n\n※URL長を抑えるため、読後メモは新しいものから一部を送っています。' : '';

    return `以下の記事を読んだ後に残したメモを起点に、考えを深める対話をしてください。

記事タイトル:
${essay?.title || document.title.replace(/\s*\|\s*My Essays\s*$/, '')}

記事URL:
${articleUrlValue}

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

  function buildVisualizationPrompt(essay) {
    return `以下の記事を読み、その内容を1枚の情報画像として再構成してください。

記事タイトル:
${essay?.title || document.title.replace(/\s*\|\s*My Essays\s*$/, '')}

記事URL:
${articleUrl(essay)}

記事の要約:
${articleSummary(essay)}

【画像の目的】
この記事を読み終えた人が、画像を見るだけで論旨・重要事項・関係性を再構成できる「記憶の地図」にしてください。

【要件】
- 縦長9:16で制作してください。
- 説明の網羅性を優先してください。
- 主要な論点、因果関係、対比、分類、具体例、数字、固有名詞、注意点を落とさないでください。
- 単なる箇条書きポスターにはせず、情報同士の関係が視覚的に伝わる構成にしてください。
- 独創的で、ダイナミックな構図にしてください。
- 視線の流れが自然に「全体 → 構造 → 詳細」へ進むようにしてください。
- 記事本文にない事実を追加しないでください。
- 日本語で、文字の可読性を十分に確保してください。
- 装飾よりも内容理解を優先してください。
- 記事のテーマに合わせて、図解、模式図、時間軸、比較、階層、地図的配置などから最適な表現方法を選んでください。

最終的に画像を生成してください。`;
  }


  function buildSequelPrompt(essay) {
    return `以下の記事を読み、その記事から自然に生まれる「続編」にあたる新しい1本の記事を作ってください。

記事タイトル:
${essay?.title || document.title.replace(/\s*\|\s*My Essays\s*$/, '')}

記事URL:
${articleUrl(essay)}

記事の要約:
${articleSummary(essay)}

【続編の考え方】
原記事を単純に長くしたり、同じ説明を言い換えたりしないでください。
続編とは「前の記事の続きを書く」ことではなく、「前の記事によって生まれた次の問いへ進む」こととして扱ってください。

まず内部で次を整理してください。
1. 原記事がすでに答えたこと
2. 原記事が意図的・非意図的に残した未解決点
3. 原記事から自然につながる周辺論点
4. 読者の理解を一段進める問い
5. 単なる焼き直しにならない続編の中心命題

そのうえで、最も価値の高い1つの方向を選び、ユーザーへ複数案を選ばせず、そのまま調査と執筆まで進めてください。

【進め方】
- リサーチ → 構造化 → 不足点の特定 → 再リサーチ → 記事構成 → 執筆 → 事実確認 → 推敲、の順で進めてください。
- 必要な場合はWebで再調査し、時点によって変わる情報は最新情報を確認してください。
- 可能な限り一次情報・公式資料・原典を優先してください。
- 続編単体でも意味が分かるようにしてください。
- 冒頭で原記事を長々と要約せず、続編に必要な前提だけを短く示してください。
- 原記事と同じ結論をもう一度証明するだけの記事は禁止です。
- 「原記事を読んだあとだからこそ生まれる問い」を扱ってください。
- 日本語は自然な日本語にし、不要な英語の翻訳語をそのまま残さないでください。
- 固有名詞や定着した専門用語で原語が有用な場合は、日本語名称の後ろに括弧で添えてください。
- 初見の読者にも理解できるよう、「そもそも → 具体的な事実 → そこから分かること → 一段抽象化した意味」を往復してください。
- 各段落を単調な「主張 → 例 → まとめ」だけにせず、抽象度が不均等に上下しながら思考が前進する構成にしてください。
- 重要な外部情報には出典URLを付けてください。
- 最後は単なるまとめではなく、「この続編によって、原記事の見え方がどう変わったか」まで到達してください。
- タイトルも新しく付けてください。「続編」「Part 2」を付けただけのタイトルは禁止です。

最終的に、完成した記事本文を出力してください。`;
  }

  function copyPrompt(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(helper);
      helper.select();
      const ok = document.execCommand('copy');
      helper.remove();
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  function announceVisualization(root, message, tone = '') {
    const status = root?.querySelector('[data-gpt-visualize-status]');
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
    window.setTimeout(() => {
      if (!status.isConnected || status.textContent !== message) return;
      status.textContent = '';
      status.dataset.tone = '';
    }, 2600);
  }

  function openArticleVisualization(root) {
    const essay = essayNow();
    const prompt = buildVisualizationPrompt(essay);
    const url = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
    const copyTask = copyPrompt(prompt).then(() => true).catch(() => false);

    window.open(url, '_blank', 'noopener,noreferrer');
    copyTask.then(copied => {
      announceVisualization(
        root,
        copied ? '画像化の指示をコピーしてChatGPTを開きました' : 'ChatGPTを開きました',
        'success'
      );
    });
  }


  function openArticleSequel(root) {
    const essay = essayNow();
    const prompt = buildSequelPrompt(essay);
    const url = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
    const copyTask = copyPrompt(prompt).then(() => true).catch(() => false);

    window.open(url, '_blank', 'noopener,noreferrer');
    copyTask.then(copied => {
      announceVisualization(
        root,
        copied ? '続編の指示をコピーしてChatGPTを開きました' : 'ChatGPTを開きました',
        'success'
      );
    });
  }

  function openChatGPT(root) {
    const essay = essayNow();
    const entries = readEntries(essay?.id || idFromHash());
    if (!entries.length) return;

    const prompt = buildPrompt(essay, entries);
    const url = `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    const status = root.querySelector('[data-reflection-status]');
    if (status) {
      status.textContent = 'ChatGPTにメモを渡しました';
      status.dataset.tone = 'success';
      setTimeout(() => {
        if (status.textContent === 'ChatGPTにメモを渡しました') {
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

  function visualizationButton(root, extraClass = '') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = ['reader-visualize-button', extraClass].filter(Boolean).join(' ');
    button.dataset.gptVisualize = '1';
    button.innerHTML = '<span aria-hidden="true">↗</span><span>GPTで画像化</span>';
    button.setAttribute('aria-label', 'この記事をChatGPTで画像化する');
    button.title = '記事の構造を9:16の情報画像に変換';
    button.addEventListener('click', () => openArticleVisualization(root));
    return button;
  }


  function sequelButton(root) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'reader-sequel-button';
    button.dataset.gptSequel = '1';
    button.innerHTML = '<span aria-hidden="true">→</span><span>GPTで続編</span>';
    button.setAttribute('aria-label', 'この記事から次の問いを見つけてChatGPTで続編を作る');
    button.title = '原記事が残した次の問いから、新しい記事を作る';
    button.addEventListener('click', () => openArticleSequel(root));
    return button;
  }

  function visualizationStatus() {
    const status = document.createElement('p');
    status.className = 'reader-visualize-status';
    status.dataset.gptVisualizeStatus = '1';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    return status;
  }

  function enhanceIntroVisualization(root) {
    if (!root || root.dataset.gptIntroVisualizeReady === '1') return;
    const meta = root.querySelector('.reader-v2-intro-meta');
    if (!meta) return;

    root.dataset.gptIntroVisualizeReady = '1';

    const block = document.createElement('div');
    block.className = 'reader-intro-visualize';
    block.append(
      visualizationButton(root, 'reader-intro-visualize-button'),
      visualizationStatus()
    );

    const details = root.querySelector('.reader-v2-article-info');
    if (details) details.insertAdjacentElement('beforebegin', block);
    else root.append(block);
  }

  function enhanceVisualization(root) {
    if (!root || root.dataset.gptVisualizeReady === '1') return;
    const stage = root.querySelector('.reader-seal-stage');
    const seal = stage?.querySelector('[data-resonance-seal]');
    if (!stage || !seal) return;

    root.dataset.gptVisualizeReady = '1';

    let actions = stage.querySelector('.reader-post-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'reader-post-actions';
      seal.insertAdjacentElement('beforebegin', actions);
      actions.append(seal);
    }

    const expand = document.createElement('div');
    expand.className = 'reader-expand';
    const label = document.createElement('p');
    label.className = 'reader-expand-label';
    label.textContent = 'この記事から';
    const expandActions = document.createElement('div');
    expandActions.className = 'reader-expand-actions';
    expandActions.append(visualizationButton(root), sequelButton(root));
    expand.append(label, expandActions);
    actions.append(expand);

    const returns = document.createElement('div');
    returns.className = 'reader-return-actions';
    const top = document.createElement('a');
    top.className = 'reader-top-return-button';
    top.href = '#/';
    top.innerHTML = '<span aria-hidden="true">←</span><span>TOPへ戻る</span>';
    top.setAttribute('aria-label', 'TOPへ戻る');
    top.addEventListener('click', () => {
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0);
    });
    returns.append(top);
    actions.append(returns);

    stage.append(visualizationStatus());
  }

  function enhanceAll() {
    document.querySelectorAll(ROOT).forEach(enhance);
    document.querySelectorAll(INTRO_ROOT).forEach(enhanceIntroVisualization);
    document.querySelectorAll(RESONANCE_ROOT).forEach(enhanceVisualization);
  }

  const observer = new MutationObserver(enhanceAll);
  observer.observe(document.body, { childList: true, subtree: true });
  document.addEventListener('myessays:reader-rendered', enhanceAll);
  window.addEventListener('hashchange', () => requestAnimationFrame(enhanceAll));
  enhanceAll();
})();
