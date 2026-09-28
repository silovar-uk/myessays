(() => {
  'use strict';

  if (window.MyEssaysAozoraBooks) return;

  const DB_NAME = 'myessays-books';
  const DB_VERSION = 1;
  const STORE = 'books';
  const READING_PREFIX = 'myessays:reading-state:';
  let dbPromise = null;
  let current = null;
  let importing = false;
  let shelfRows = [];
  let restoreShelfFocus = true;

  const parser = () => window.MyEssaysAozoraParser;
  const source = () => window.MyEssaysAozoraSource;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('このブラウザは本棚保存に対応していません'));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('本棚を開けませんでした'));
    });
    return dbPromise;
  }

  async function transact(mode, task) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const store = tx.objectStore(STORE);
      let request;
      try { request = task(store); }
      catch (error) { reject(error); return; }
      tx.oncomplete = () => resolve(request?.result);
      tx.onerror = () => reject(tx.error || request?.error || new Error('本棚の保存に失敗しました'));
      tx.onabort = () => reject(tx.error || new Error('本棚の処理が中断されました'));
    });
  }

  const get = id => transact('readonly', store => store.get(id));
  const put = record => transact('readwrite', store => store.put(record));
  const all = () => transact('readonly', store => store.getAll());

  function bookId() {
    if (globalThis.crypto?.randomUUID) return 'aozora-' + crypto.randomUUID();
    return 'aozora-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
  }

  function readingState(id) {
    try {
      const value = JSON.parse(localStorage.getItem(READING_PREFIX + id) || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch {
      return {};
    }
  }

  function writeReadingState(id, patch = {}) {
    if (!id) return;
    try {
      localStorage.setItem(READING_PREFIX + id, JSON.stringify({ ...readingState(id), ...patch }));
    } catch {}
  }

  function markBookAccessed(id) {
    writeReadingState(id, { lastBookOpenedAt: new Date().toISOString() });
  }

  function progressRatio(record) {
    const value = Number(readingState(record?.id).lastProgressRatio);
    if (!Number.isFinite(value)) return null;
    return Math.max(0, Math.min(1, value));
  }

  function bookActivityTime(record) {
    const state = readingState(record?.id);
    return String(state.lastBookOpenedAt || state.openedAt || record?.updatedAt || record?.importedAt || '');
  }

  function isResumeCandidate(record) {
    const state = readingState(record?.id);
    if (state.completedAt) return false;
    return Boolean(state.lastBookOpenedAt || state.openedAt || Number.isFinite(Number(state.lastProgressRatio)));
  }

  function recordToEssay(record) {
    if (!record?.document) return null;
    const metrics = parser()?.metrics?.(record.document) || { charCount: 0, minutes: 1 };
    return {
      id: record.id,
      title: record.document.title || '名称未設定',
      subtitle: record.document.author || '',
      abstract: '青空文庫XHTMLから読み込んだ本',
      type: 'Book',
      created: String(record.importedAt || '').slice(0, 10),
      updated: String(record.updatedAt || record.importedAt || '').slice(0, 10),
      tags: ['青空文庫'],
      keywords: [record.document.author || ''].filter(Boolean),
      grow: 0,
      body: parser()?.toMarkdown?.(record.document) || '',
      metrics,
      __aozoraBook: true,
      __readerDocument: record.document,
      __bookImportedAt: record.importedAt || '',
      __bookSourceName: record.sourceName || '',
      __bookSourceUrl: record.document.source?.xhtmlUrl || record.document.source?.url || '',
      __bookCardUrl: record.document.source?.cardUrl || '',
      __bookXhtmlUrl: record.document.source?.xhtmlUrl || record.document.source?.url || '',
      __bookSourceKey: record.sourceKey || ''
    };
  }

  async function getEssay(id) {
    const record = await get(id);
    if (record) markBookAccessed(id);
    current = recordToEssay(record);
    return current;
  }

  function currentEssay() {
    return current;
  }

  function clearCurrent() {
    current = null;
  }

  function appendRuns(target, runs) {
    let offset = 0;
    const readings = [];
    for (const run of runs || []) {
      const text = String(run?.text || '');
      if (!text) continue;
      if (run.ruby) {
        const ruby = document.createElement('ruby');
        const rb = document.createElement('rb');
        rb.textContent = text;
        const rpOpen = document.createElement('rp');
        rpOpen.textContent = '（';
        const rt = document.createElement('rt');
        rt.textContent = run.ruby;
        const rpClose = document.createElement('rp');
        rpClose.textContent = '）';
        ruby.append(rb, rpOpen, rt, rpClose);
        target.append(ruby);
        readings.push({ start: offset, end: offset + text.length, reading: String(run.ruby) });
      } else {
        target.append(document.createTextNode(text));
      }
      offset += text.length;
    }
    if (readings.length) target.dataset.rsvpReadingMap = JSON.stringify(readings);
  }

  function renderDocument(root, documentValue) {
    if (!root || !documentValue) return false;
    root.replaceChildren();
    root.dataset.readerSource = 'aozora';

    for (const block of documentValue.blocks || []) {
      if (block.type === 'heading') {
        const heading = document.createElement(block.level <= 3 ? 'h2' : 'h3');
        heading.textContent = block.text || '';
        root.append(heading);
        continue;
      }
      if (block.type === 'paragraph') {
        const paragraph = document.createElement('p');
        appendRuns(paragraph, block.runs || []);
        if (paragraph.textContent.trim()) root.append(paragraph);
      }
    }
    return true;
  }

  function setStatus(message = '', state = '') {
    ['aozoraImportStatus', 'aozoraShelfStatus'].forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      element.textContent = message;
      element.dataset.state = state;
    });
  }

  function setBusy(value) {
    importing = Boolean(value);
    const submit = document.getElementById('aozoraUrlSubmit');
    const fileButton = document.getElementById('aozoraFileButton');
    const input = document.getElementById('aozoraUrlInput');
    if (submit) submit.disabled = importing;
    if (fileButton) fileButton.disabled = importing;
    if (input) input.disabled = importing;
    document.getElementById('aozoraImportDialog')?.toggleAttribute('aria-busy', importing);
  }

  function statusForStep(step) {
    if (step === 'fetching-card') return '図書カードを確認しています…';
    if (step === 'finding-xhtml') return 'XHTMLを見つけています…';
    if (step === 'fetching-xhtml') return '本文を読み込んでいます…';
    return '読み込んでいます…';
  }

  function friendlyError(error) {
    const code = String(error?.code || error?.message || '');
    if (['INVALID_URL', 'UNSUPPORTED_HOST', 'UNSUPPORTED_PATH', 'UNSUPPORTED_URL'].includes(code)) {
      return '青空文庫の図書カードURLを貼ってください。';
    }
    if (code === 'XHTML_NOT_FOUND') {
      return 'この図書カードには読み込めるXHTML版が見つかりませんでした。';
    }
    if (code === 'RATE_LIMITED') {
      return 'アクセスが集中しています。少し後でもう一度お試しください。';
    }
    if (code === 'PROXY_NOT_CONFIGURED') {
      return 'URL読み込みの接続先がまだ設定されていません。';
    }
    return '青空文庫から本文を取得できませんでした。少し後でもう一度お試しください。';
  }

  async function existingBySourceKey(sourceKey) {
    if (!sourceKey) return null;
    const rows = await all();
    return rows.find(record => record?.sourceKey === sourceKey) || null;
  }

  async function saveImportedDocument(documentValue, options = {}) {
    const now = new Date().toISOString();
    const sourceKey = String(options.sourceKey || '');
    const existing = await existingBySourceKey(sourceKey);
    const record = existing
      ? {
          ...existing,
          document: documentValue,
          sourceKey,
          sourceName: options.sourceName || existing.sourceName || '',
          updatedAt: now
        }
      : {
          id: bookId(),
          document: documentValue,
          sourceKey,
          sourceName: options.sourceName || '',
          importedAt: now,
          updatedAt: now
        };

    await put(record);
    await refreshShelf();
    return record;
  }

  async function importFile(file) {
    if (importing) return null;
    setBusy(true);
    setStatus('XHTMLを読み込んでいます…', 'loading');
    try {
      const now = new Date().toISOString();
      const documentValue = await parser().parseFile(file);
      documentValue.source = {
        ...(documentValue.source || {}),
        importedAt: now
      };
      const record = await saveImportedDocument(documentValue, { sourceName: file?.name || '' });
      setStatus('「' + documentValue.title + '」を本棚に追加しました', 'success');
      closeImportDialog();
      window.MyEssaysRoute?.navigateBook?.(record.id);
      return record;
    } catch (error) {
      console.error('[AozoraBooks file]', error);
      setStatus(error?.message || 'XHTMLを読み込めませんでした', 'error');
      throw error;
    } finally {
      setBusy(false);
    }
  }

  async function importUrl(input) {
    if (importing) return null;
    setBusy(true);
    setStatus('図書カードを確認しています…', 'loading');
    try {
      const resolved = await source().resolveAozoraSource(input, {
        onStatus: step => setStatus(statusForStep(step), 'loading')
      });
      const now = new Date().toISOString();
      const documentValue = parser().parseArrayBuffer(resolved.buffer, {
        sourceUrl: resolved.xhtmlUrl,
        xhtmlUrl: resolved.xhtmlUrl,
        cardUrl: resolved.cardUrl,
        importedAt: now
      });
      const sourceKey = resolved.cardUrl || resolved.xhtmlUrl;
      const record = await saveImportedDocument(documentValue, {
        sourceKey,
        sourceName: new URL(resolved.xhtmlUrl).pathname.split('/').at(-1) || ''
      });
      setStatus('「' + documentValue.title + '」を本棚に追加しました', 'success');
      closeImportDialog();
      window.MyEssaysRoute?.navigateBook?.(record.id);
      return record;
    } catch (error) {
      console.error('[AozoraBooks URL]', error);
      setStatus(friendlyError(error), 'error');
      throw error;
    } finally {
      setBusy(false);
    }
  }

  function formatProgress(record) {
    const value = progressRatio(record);
    if (value == null) return '';
    return Math.round(value * 100) + '%';
  }

  function resumeCandidate(rows) {
    return rows
      .filter(isResumeCandidate)
      .sort((a, b) => bookActivityTime(b).localeCompare(bookActivityTime(a)))[0] || null;
  }

  function closeShelfDialog({ restoreFocus = true } = {}) {
    const dialog = document.getElementById('booksShelfDialog');
    restoreShelfFocus = restoreFocus;
    if (dialog?.open) dialog.close();
  }

  function navigateBook(id) {
    closeShelfDialog({ restoreFocus: false });
    window.MyEssaysRoute?.navigateBook?.(id);
  }

  function makeBookRow(record) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'books-row';
    button.dataset.bookId = record.id;

    const copy = document.createElement('span');
    copy.className = 'books-row-copy';
    const title = document.createElement('strong');
    title.textContent = record.document?.title || '名称未設定';
    const author = document.createElement('span');
    author.textContent = record.document?.author || '著者名なし';
    copy.append(title, author);

    const progress = document.createElement('span');
    progress.className = 'books-row-progress';
    progress.textContent = formatProgress(record) || '読む';

    button.append(copy, progress);
    button.addEventListener('click', () => navigateBook(record.id));
    return button;
  }

  function renderResume(record) {
    const section = document.getElementById('aozoraResumeSection');
    const button = document.getElementById('aozoraResumeButton');
    if (!section || !button) return;

    if (!record) {
      section.hidden = true;
      button.dataset.bookId = '';
      return;
    }

    const title = record.document?.title || '名称未設定';
    const author = record.document?.author || '著者名なし';
    const progress = formatProgress(record);

    document.getElementById('aozoraResumeTitle').textContent = title;
    document.getElementById('aozoraResumeAuthor').textContent = author;
    document.getElementById('aozoraResumeProgress').textContent = progress || '続きから';
    button.dataset.bookId = record.id;
    button.setAttribute('aria-label', progress ? `${title}の続きを読む、${progress}` : `${title}の続きを読む`);
    section.hidden = false;
  }

  function updateShelfTrigger(rows, resume) {
    const trigger = document.getElementById('bookshelfTrigger');
    const badge = document.getElementById('bookshelfTriggerProgress');
    if (!trigger || !badge) return;

    trigger.dataset.hasBooks = rows.length ? 'true' : 'false';
    if (!rows.length) {
      trigger.setAttribute('aria-label', '本棚。青空文庫から本を追加');
      badge.hidden = true;
      badge.textContent = '';
      return;
    }

    if (resume) {
      const progress = formatProgress(resume);
      const title = resume.document?.title || '本';
      trigger.setAttribute('aria-label', progress
        ? `本棚。${title}の続きを読む、${progress}`
        : `本棚。${title}の続きを読む`);
      badge.textContent = progress || '•';
      badge.hidden = false;
      return;
    }

    trigger.setAttribute('aria-label', `本棚。${rows.length}冊保存済み`);
    badge.hidden = true;
    badge.textContent = '';
  }

  async function refreshShelf() {
    const list = document.getElementById('aozoraBookList');
    let rows = [];
    try {
      rows = await all();
    } catch (error) {
      shelfRows = [];
      updateShelfTrigger([], null);
      if (list) {
        list.replaceChildren();
        list.append(Object.assign(document.createElement('p'), {
          className: 'books-empty',
          textContent: error?.message || '本棚を読み込めませんでした'
        }));
      }
      return [];
    }

    rows.sort((a, b) => String(b.updatedAt || b.importedAt || '').localeCompare(String(a.updatedAt || a.importedAt || '')));
    shelfRows = rows;

    const resume = resumeCandidate(rows);
    updateShelfTrigger(rows, resume);
    renderResume(resume);

    const count = document.getElementById('aozoraBookCount');
    if (count) count.textContent = rows.length + '冊';

    if (!list) return rows;
    list.replaceChildren();

    if (!rows.length) {
      list.append(Object.assign(document.createElement('p'), {
        className: 'books-empty',
        textContent: 'まだ本はありません。青空文庫から追加できます。'
      }));
      document.getElementById('aozoraSavedSection')?.removeAttribute('hidden');
      return rows;
    }

    const remaining = resume ? rows.filter(record => record.id !== resume.id) : rows;
    const savedSection = document.getElementById('aozoraSavedSection');
    if (savedSection) savedSection.hidden = remaining.length === 0;

    remaining.forEach(record => list.append(makeBookRow(record)));
    return rows;
  }

  async function openShelfFromTrigger() {
    const rows = await refreshShelf();
    if (!rows.length) {
      openImportDialog();
      return;
    }

    const dialog = document.getElementById('booksShelfDialog');
    const trigger = document.getElementById('bookshelfTrigger');
    if (!dialog || dialog.open) return;

    restoreShelfFocus = true;
    dialog.showModal();
    trigger?.setAttribute('aria-expanded', 'true');

    requestAnimationFrame(() => {
      const resume = document.getElementById('aozoraResumeButton');
      const firstBook = dialog.querySelector('.books-row');
      const importButton = document.getElementById('aozoraImportButton');
      if (resume && !document.getElementById('aozoraResumeSection')?.hidden) resume.focus();
      else if (firstBook instanceof HTMLElement) firstBook.focus();
      else importButton?.focus();
    });
  }

  function openImportDialog() {
    const dialog = document.getElementById('aozoraImportDialog');
    if (!dialog) return;
    setStatus('', '');
    dialog.showModal();
    requestAnimationFrame(() => document.getElementById('aozoraUrlInput')?.focus());
  }

  function closeImportDialog() {
    const dialog = document.getElementById('aozoraImportDialog');
    if (dialog?.open) dialog.close();
  }

  function init() {
    const shelfTrigger = document.getElementById('bookshelfTrigger');
    const shelfDialog = document.getElementById('booksShelfDialog');
    const importTrigger = document.getElementById('aozoraImportButton');
    const dialog = document.getElementById('aozoraImportDialog');
    const form = document.getElementById('aozoraUrlForm');
    const input = document.getElementById('aozoraUrlInput');
    const fileInput = document.getElementById('aozoraFileInput');
    const fileButton = document.getElementById('aozoraFileButton');

    shelfTrigger?.addEventListener('click', openShelfFromTrigger);
    document.getElementById('booksShelfClose')?.addEventListener('click', () => closeShelfDialog());
    shelfDialog?.addEventListener('click', event => {
      if (event.target === shelfDialog) closeShelfDialog();
    });
    shelfDialog?.addEventListener('close', () => {
      shelfTrigger?.setAttribute('aria-expanded', 'false');
      if (restoreShelfFocus) shelfTrigger?.focus();
      restoreShelfFocus = true;
    });

    document.getElementById('aozoraResumeButton')?.addEventListener('click', event => {
      const id = event.currentTarget?.dataset?.bookId;
      if (id) navigateBook(id);
    });

    importTrigger?.addEventListener('click', () => {
      closeShelfDialog({ restoreFocus: false });
      requestAnimationFrame(openImportDialog);
    });

    document.getElementById('aozoraImportClose')?.addEventListener('click', closeImportDialog);
    dialog?.addEventListener('click', event => {
      if (event.target === dialog && !importing) closeImportDialog();
    });

    form?.addEventListener('submit', async event => {
      event.preventDefault();
      const value = input?.value?.trim() || '';
      if (!value) {
        setStatus('青空文庫の図書カードURLを貼ってください。', 'error');
        input?.focus();
        return;
      }
      try { await importUrl(value); } catch {}
    });

    fileButton?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      fileInput.value = '';
      if (!file) return;
      try { await importFile(file); } catch {}
    });

    refreshShelf();
    window.addEventListener('focus', refreshShelf);
    document.addEventListener('myessays:reading-progress-changed', refreshShelf);
  }

  window.MyEssaysAozoraBooks = Object.freeze({
    version: '2026.09.28-quiet-bookshelf',
    getEssay,
    currentEssay,
    clearCurrent,
    renderDocument,
    importFile,
    importUrl,
    refreshShelf,
    openShelfFromTrigger,
    openImportDialog
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();