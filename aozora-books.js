(() => {
  'use strict';

  if (window.MyEssaysAozoraBooks) return;

  const DB_NAME = 'myessays-books';
  const DB_VERSION = 1;
  const STORE = 'books';
  const READING_PREFIX = 'myessays:reading-state:';
  let dbPromise = null;
  let current = null;

  const parser = () => window.MyEssaysAozoraParser;

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
      __bookSourceUrl: record.document.source?.url || ''
    };
  }

  async function getEssay(id) {
    const record = await get(id);
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

  async function importFile(file) {
    const status = document.getElementById('aozoraImportStatus');
    if (status) status.textContent = 'XHTMLを読み込んでいます…';
    try {
      const documentValue = await parser().parseFile(file);
      const now = new Date().toISOString();
      const record = {
        id: bookId(),
        document: documentValue,
        sourceName: file?.name || '',
        importedAt: now,
        updatedAt: now
      };
      await put(record);
      if (status) status.textContent = '「' + documentValue.title + '」を本棚に追加しました';
      await refreshShelf();
      window.MyEssaysRoute?.navigateBook?.(record.id);
      return record;
    } catch (error) {
      console.error('[AozoraBooks]', error);
      if (status) status.textContent = error?.message || 'XHTMLを読み込めませんでした';
      throw error;
    }
  }

  function formatProgress(record) {
    const value = readingState(record.id);
    if (!Number.isFinite(Number(value.lastProgressRatio))) return '';
    return Math.round(Number(value.lastProgressRatio) * 100) + '%';
  }

  async function refreshShelf() {
    const list = document.getElementById('aozoraBookList');
    if (!list) return;
    let rows = [];
    try { rows = await all(); }
    catch (error) {
      list.replaceChildren();
      list.append(Object.assign(document.createElement('p'), { className: 'books-empty', textContent: error?.message || '本棚を読み込めませんでした' }));
      return;
    }

    rows.sort((a, b) => String(b.updatedAt || b.importedAt || '').localeCompare(String(a.updatedAt || a.importedAt || '')));
    list.replaceChildren();

    if (!rows.length) {
      list.append(Object.assign(document.createElement('p'), {
        className: 'books-empty',
        textContent: 'まだ本はありません。青空文庫のXHTMLを1冊入れると、ここから続きが読めます。'
      }));
      return;
    }

    rows.forEach(record => {
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
      button.addEventListener('click', () => window.MyEssaysRoute?.navigateBook?.(record.id));
      list.append(button);
    });
  }

  function init() {
    const trigger = document.getElementById('aozoraImportButton');
    const input = document.getElementById('aozoraFileInput');
    if (trigger && input) {
      trigger.addEventListener('click', () => input.click());
      input.addEventListener('change', async () => {
        const file = input.files?.[0];
        input.value = '';
        if (!file) return;
        try { await importFile(file); } catch {}
      });
    }
    refreshShelf();
    window.addEventListener('focus', refreshShelf);
    document.addEventListener('myessays:reading-progress-changed', refreshShelf);
  }

  window.MyEssaysAozoraBooks = Object.freeze({
    version: '2026.09.27',
    getEssay,
    currentEssay,
    clearCurrent,
    renderDocument,
    importFile,
    refreshShelf
  });

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();