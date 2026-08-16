(() => {
  const ROOT_SELECTOR = '.reader-reflections';
  const STORAGE_PREFIX = 'myessays:reader-reflections:v1:';
  const prompts = [
    '一番残ったこと、違和感、持ち帰りたいこと…',
    '読み終わって、最初に浮かんだこと…',
    'あとで思い出したい一文や考え…'
  ];

  function getCurrentEssayId() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function getCurrentEssay() {
    const id = getCurrentEssayId();
    if (!id || typeof state === 'undefined' || !Array.isArray(state.essays)) return null;
    return state.essays.find(essay => essay.id === id) || null;
  }

  function storageKey(id = getCurrentEssayId()) {
    return id ? `${STORAGE_PREFIX}${id}` : '';
  }

  function normalizeEntry(value) {
    if (!value || typeof value !== 'object') return null;
    const text = String(value.text || '').trim();
    const createdAt = String(value.createdAt || '');
    if (!text || !createdAt) return null;
    return {
      id: String(value.id || createdAt),
      text,
      createdAt,
      updatedAt: String(value.updatedAt || createdAt)
    };
  }

  function readEntries(id = getCurrentEssayId()) {
    const key = storageKey(id);
    if (!key) return [];
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(normalizeEntry)
        .filter(Boolean)
        .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    } catch {
      return [];
    }
  }

  function writeEntries(id, entries) {
    const key = storageKey(id);
    if (!key) return false;
    try {
      if (entries.length) localStorage.setItem(key, JSON.stringify(entries));
      else localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  function makeId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).format(date).replace(/\//g, '.');
  }

  function setStatus(root, message, tone = '') {
    const status = root?.querySelector('[data-reflection-status]');
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
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

  function plainCopy(entries) {
    return entries.map(entry => entry.text).join('\n\n---\n\n');
  }

  function detailedCopy(essay, entries) {
    const title = essay?.title || 'My Essays';
    const url = location.href;
    const blocks = entries.map(entry => {
      const created = formatDateTime(entry.createdAt);
      const updated = formatDateTime(entry.updatedAt);
      const edited = updated && updated !== created ? `\n更新: ${updated}` : '';
      return `作成: ${created}${edited}\n${entry.text}`;
    });
    return `記事: ${title}\nURL: ${url}\n\n${blocks.join('\n\n---\n\n')}`;
  }

  function createAction(label, action, className = '') {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `reflection-card-action ${className}`.trim();
    button.dataset.action = action;
    button.textContent = label;
    return button;
  }

  function createCard(entry, index) {
    const article = document.createElement('article');
    article.className = 'reflection-card';
    article.dataset.entryId = entry.id;

    const head = document.createElement('div');
    head.className = 'reflection-card-head';

    const meta = document.createElement('div');
    meta.className = 'reflection-card-meta';
    const created = document.createElement('time');
    created.dateTime = entry.createdAt;
    created.textContent = `作成 ${formatDateTime(entry.createdAt)}`;
    meta.appendChild(created);

    if (entry.updatedAt && entry.updatedAt !== entry.createdAt) {
      const updated = document.createElement('time');
      updated.dateTime = entry.updatedAt;
      updated.textContent = `更新 ${formatDateTime(entry.updatedAt)}`;
      meta.appendChild(updated);
    }

    const marker = document.createElement('span');
    marker.className = 'reflection-card-marker';
    marker.textContent = String(index + 1).padStart(2, '0');

    head.append(meta, marker);

    const body = document.createElement('p');
    body.className = 'reflection-card-text';
    body.textContent = entry.text;

    const editArea = document.createElement('div');
    editArea.className = 'reflection-edit-area';
    editArea.hidden = true;
    const textarea = document.createElement('textarea');
    textarea.className = 'reflection-edit-textarea';
    textarea.rows = 4;
    textarea.value = entry.text;
    textarea.setAttribute('aria-label', '読後メモを編集');
    const editActions = document.createElement('div');
    editActions.className = 'reflection-edit-actions';
    editActions.append(
      createAction('キャンセル', 'cancel-edit'),
      createAction('保存', 'save-edit', 'reflection-card-action--primary')
    );
    editArea.append(textarea, editActions);

    const actions = document.createElement('div');
    actions.className = 'reflection-card-actions';
    actions.append(
      createAction('編集', 'edit'),
      createAction('コピー', 'copy'),
      createAction('削除', 'delete', 'reflection-card-action--danger')
    );

    article.append(head, body, editArea, actions);
    return article;
  }

  function buildRoot(essay, entries) {
    const root = document.createElement('section');
    root.className = 'reader-reflections';
    root.dataset.essayId = essay.id;
    root.setAttribute('aria-labelledby', 'readerReflectionsTitle');

    root.innerHTML = `
      <div class="reader-reflections-heading">
        <div>
          <p class="reader-reflections-kicker">AFTER READING</p>
          <h2 id="readerReflectionsTitle">読んで、何が残った？</h2>
        </div>
        <p class="reader-reflections-local">このブラウザだけに保存</p>
      </div>

      <div class="reflection-composer">
        <textarea class="reflection-composer-input" rows="4" spellcheck="true" aria-label="読後メモを追加"></textarea>
        <div class="reflection-composer-footer">
          <span class="reflection-composer-hint">追加するたび、別のメモとして残ります</span>
          <button class="reflection-add-button" type="button" disabled>メモを残す</button>
        </div>
      </div>

      <div class="reflection-toolbar">
        <span class="reflection-count"></span>
        <div class="reflection-copy-actions">
          <button type="button" data-copy="plain">メモだけコピー</button>
          <button type="button" data-copy="detail">記事情報込みコピー</button>
        </div>
      </div>

      <p class="reflection-status" data-reflection-status aria-live="polite"></p>
      <div class="reflection-list"></div>`;

    const input = root.querySelector('.reflection-composer-input');
    input.placeholder = prompts[Math.floor(Math.random() * prompts.length)];
    refreshRoot(root, essay, entries);
    bindRoot(root, essay);
    return root;
  }

  function refreshRoot(root, essay, entries = readEntries(essay.id)) {
    const list = root.querySelector('.reflection-list');
    const count = root.querySelector('.reflection-count');
    const copyActions = root.querySelector('.reflection-copy-actions');
    if (!list || !count || !copyActions) return;

    list.replaceChildren(...entries.map((entry, index) => createCard(entry, index)));
    count.textContent = entries.length ? `${entries.length}件の読後メモ` : 'まだメモはありません';
    copyActions.hidden = entries.length === 0;
  }

  function bindRoot(root, essay) {
    const input = root.querySelector('.reflection-composer-input');
    const addButton = root.querySelector('.reflection-add-button');

    function syncAddButton() {
      addButton.disabled = !input.value.trim();
    }

    function addEntry() {
      const text = input.value.trim();
      if (!text) return;
      const now = new Date().toISOString();
      const entries = readEntries(essay.id);
      entries.unshift({ id: makeId(), text, createdAt: now, updatedAt: now });
      if (!writeEntries(essay.id, entries)) {
        setStatus(root, '保存できませんでした', 'error');
        return;
      }
      input.value = '';
      syncAddButton();
      refreshRoot(root, essay, entries);
      setStatus(root, 'メモを保存しました', 'success');
      input.focus();
    }

    input.addEventListener('input', syncAddButton);
    input.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        addEntry();
      }
    });
    addButton.addEventListener('click', addEntry);

    root.addEventListener('click', async event => {
      const copyButton = event.target.closest('[data-copy]');
      if (copyButton) {
        const entries = readEntries(essay.id);
        if (!entries.length) return;
        const text = copyButton.dataset.copy === 'detail' ? detailedCopy(essay, entries) : plainCopy(entries);
        try {
          await copyText(text);
          setStatus(root, copyButton.dataset.copy === 'detail' ? '記事情報込みでコピーしました' : 'メモをコピーしました', 'success');
        } catch {
          setStatus(root, 'コピーできませんでした', 'error');
        }
        return;
      }

      const actionButton = event.target.closest('[data-action]');
      if (!actionButton) return;
      const card = actionButton.closest('.reflection-card');
      const entryId = card?.dataset.entryId;
      if (!entryId) return;

      const entries = readEntries(essay.id);
      const entry = entries.find(item => item.id === entryId);
      if (!entry) return;
      const action = actionButton.dataset.action;

      if (action === 'copy') {
        try {
          await copyText(entry.text);
          setStatus(root, 'このメモをコピーしました', 'success');
        } catch {
          setStatus(root, 'コピーできませんでした', 'error');
        }
        return;
      }

      if (action === 'edit') {
        card.querySelector('.reflection-card-text').hidden = true;
        card.querySelector('.reflection-card-actions').hidden = true;
        const editArea = card.querySelector('.reflection-edit-area');
        editArea.hidden = false;
        const textarea = editArea.querySelector('textarea');
        textarea.value = entry.text;
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        return;
      }

      if (action === 'cancel-edit') {
        card.querySelector('.reflection-card-text').hidden = false;
        card.querySelector('.reflection-card-actions').hidden = false;
        card.querySelector('.reflection-edit-area').hidden = true;
        return;
      }

      if (action === 'save-edit') {
        const textarea = card.querySelector('.reflection-edit-textarea');
        const text = textarea.value.trim();
        if (!text) {
          setStatus(root, '空のメモは保存できません', 'error');
          textarea.focus();
          return;
        }
        entry.text = text;
        entry.updatedAt = new Date().toISOString();
        if (!writeEntries(essay.id, entries)) {
          setStatus(root, '保存できませんでした', 'error');
          return;
        }
        refreshRoot(root, essay, entries);
        setStatus(root, 'メモを更新しました', 'success');
        return;
      }

      if (action === 'delete') {
        if (!window.confirm('この読後メモを削除しますか？')) return;
        const nextEntries = entries.filter(item => item.id !== entryId);
        if (!writeEntries(essay.id, nextEntries)) {
          setStatus(root, '削除できませんでした', 'error');
          return;
        }
        refreshRoot(root, essay, nextEntries);
        setStatus(root, 'メモを削除しました', 'success');
      }
    });
  }

  function renderReaderReflections() {
    const readerView = document.getElementById('readerView');
    const readerContent = document.getElementById('readerContent');
    if (!readerView || !readerContent || readerView.hidden) return;

    const essay = getCurrentEssay();
    const existing = readerContent.querySelector(ROOT_SELECTOR);
    if (!essay) {
      existing?.remove();
      return;
    }

    if (existing?.dataset.essayId === essay.id) {
      refreshRoot(existing, essay);
      return;
    }

    existing?.remove();
    const root = buildRoot(essay, readEntries(essay.id));
    const navigation = readerContent.querySelector('.reader-end-navigation');
    if (navigation) readerContent.insertBefore(root, navigation);
    else readerContent.appendChild(root);
  }

  window.MyEssaysReaderReflections = Object.freeze({
    render: renderReaderReflections,
    readEntries,
    plainCopy,
    detailedCopy
  });

  document.addEventListener('myessays:reader-rendered', renderReaderReflections);
  window.addEventListener('hashchange', () => requestAnimationFrame(renderReaderReflections));
  window.addEventListener('pageshow', () => requestAnimationFrame(renderReaderReflections));
  window.addEventListener('storage', event => {
    if (event.key?.startsWith(STORAGE_PREFIX)) requestAnimationFrame(renderReaderReflections);
  });
})();
