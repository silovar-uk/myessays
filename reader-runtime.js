(() => {
  'use strict';

  const plugins = new Map();
  let renderSequence = 0;
  let scheduled = false;
  let currentContext = null;

  function essayIdFromHash() {
    const match = location.hash.match(/^#\/essay\/(.+)$/);
    if (!match) return '';
    try { return decodeURIComponent(match[1]); }
    catch { return match[1]; }
  }

  function findEssay(id) {
    if (!id) return null;
    try {
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  function makeContext(reason = 'render') {
    const root = document.getElementById('readerContent');
    const view = document.getElementById('readerView');
    const essayId = essayIdFromHash();
    if (!root || !view || view.hidden || !essayId || !root.children.length) return null;

    const essay = findEssay(essayId);
    if (!essay) return null;

    return Object.freeze({
      essay,
      essayId,
      root,
      view,
      reason,
      renderId: ++renderSequence
    });
  }

  async function runPlugin(record, context) {
    try {
      await record.mount(context);
    } catch (error) {
      console.error(`[ReaderRuntime:${record.name}]`, error);
    }
  }

  async function publish(reason = 'render') {
    scheduled = false;
    const context = makeContext(reason);
    if (!context) {
      currentContext = null;
      return;
    }

    currentContext = context;
    context.root.dataset.readerEssayId = context.essayId;
    context.root.dataset.readerRenderId = String(context.renderId);

    const ordered = [...plugins.values()].sort((a, b) => a.priority - b.priority);
    for (const plugin of ordered) await runPlugin(plugin, context);

    document.dispatchEvent(new CustomEvent('myessays:reader-ready', { detail: context }));
  }

  function schedule(reason = 'render') {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => publish(reason));
  }

  function register(name, mount, { priority = 100 } = {}) {
    if (!name || typeof mount !== 'function') return () => {};
    const record = { name, mount, priority };
    plugins.set(name, record);

    if (currentContext) requestAnimationFrame(() => runPlugin(record, currentContext));

    return () => {
      if (plugins.get(name) === record) plugins.delete(name);
    };
  }

  window.MyEssaysReaderRuntime = Object.freeze({
    version: '2026.08.16',
    register,
    schedule,
    getContext: () => currentContext
  });

  // app.js already emits this after the article DOM, metadata and TOC are ready.
  document.addEventListener('myessays:reader-rendered', () => schedule('reader-rendered'));

  // These are recovery paths only. Feature modules no longer need their own
  // hashchange / MutationObserver / pageshow timing logic.
  window.addEventListener('hashchange', () => schedule('hashchange'));
  window.addEventListener('pageshow', () => schedule('pageshow'));
})();
