(() => {
  'use strict';

  const ROOT = '.reader-resonance';
  const LABELS = {
    1: 'ほぼ残らなかった',
    2: '少し残った',
    3: '残った',
    4: 'かなり残った',
    5: '強く残った'
  };

  let undoSnapshot = null;
  let undoTimer = 0;

  const currentEssayId = () => window.MyEssaysRoute?.parse?.().articleId || '';

  function currentEssay() {
    const id = currentEssayId();
    if (!id) return null;
    try {
      if (typeof state !== 'undefined' && state.currentEssay?.id === id) return state.currentEssay;
      return typeof state !== 'undefined' && Array.isArray(state.essays)
        ? state.essays.find(essay => essay.id === id) || null
        : null;
    } catch {
      return null;
    }
  }

  const store = () => window.MyEssaysReadingState;

  function announce(root, message, tone = '') {
    const status = root?.querySelector('[data-resonance-status]');
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  }

  function dispatch(id) {
    document.dispatchEvent(new CustomEvent('myessays:resonance-changed', { detail: { essayId: id } }));
    window.dispatchEvent(new StorageEvent('storage', { key: `myessays:reading-state:${id}` }));
  }

  function sync(root, id) {
    const api = store();
    if (!api || !root || !id) return;

    const reading = api.read(id);
    const resonance = api.getResonance(id);
    const completed = Boolean(reading.completedAt);

    root.querySelectorAll('input[name="reader-resonance"]').forEach(input => {
      input.checked = Boolean(resonance && Number(input.value) === resonance.value);
    });

    const selected = root.querySelector('[data-resonance-selected]');
    if (selected) {
      selected.textContent = resonance
        ? `${resonance.value} — ${LABELS[resonance.value]}`
        : 'まだ記録していません';
      selected.dataset.hasValue = String(Boolean(resonance));
    }

    const secondary = root.querySelector('[data-resonance-secondary]');
    if (secondary) {
      secondary.textContent = completed ? '読了記録を解除' : '評価せず読了にする';
      secondary.dataset.action = completed ? 'undo-complete' : 'complete-only';
    }

    root.classList.toggle('is-completed', completed);
    root.classList.toggle('has-resonance', Boolean(resonance));
  }

  function setRating(root, id, value) {
    const api = store();
    if (!api) return announce(root, '保存機能を読み込めませんでした', 'error');

    const before = api.read(id);
    const result = api.setResonance(id, value);
    if (!result.ok) {
      sync(root, id);
      return announce(root, '保存できませんでした。もう一度試してください', 'error');
    }

    const firstCompletion = !before.completedAt;
    sync(root, id);
    announce(
      root,
      `${value} — ${LABELS[value]}${firstCompletion ? ' · 読了として保存しました' : ' · 変更しました'}`,
      'success'
    );
    dispatch(id);
  }

  function completeOnly(root, id) {
    const api = store();
    if (!api) return announce(root, '保存機能を読み込めませんでした', 'error');
    const result = api.setCompleted(id, true);
    if (!result.ok) return announce(root, '保存できませんでした。もう一度試してください', 'error');
    sync(root, id);
    announce(root, '評価せず読了として保存しました', 'success');
    dispatch(id);
  }

  function undoComplete(root, id) {
    const api = store();
    if (!api) return;
    const before = api.read(id);
    const result = api.clearCompletion(id);
    if (!result.ok) return announce(root, '変更を保存できませんでした', 'error');

    clearTimeout(undoTimer);
    undoSnapshot = { id, state: before };
    sync(root, id);

    const undo = root.querySelector('[data-resonance-undo]');
    if (undo) undo.hidden = false;
    announce(root, '読了と「残った度」を解除しました', 'success');

    undoTimer = window.setTimeout(() => {
      undoSnapshot = null;
      if (undo?.isConnected) undo.hidden = true;
    }, 10000);

    dispatch(id);
  }

  function restoreUndo(root, id) {
    const api = store();
    if (!api || !undoSnapshot || undoSnapshot.id !== id) return;
    const result = api.merge(id, undoSnapshot.state);
    if (!result.ok) return announce(root, '元に戻せませんでした', 'error');

    clearTimeout(undoTimer);
    undoSnapshot = null;
    const undo = root.querySelector('[data-resonance-undo]');
    if (undo) undo.hidden = true;
    sync(root, id);
    announce(root, '元に戻しました', 'success');
    dispatch(id);
  }

  function build(essay) {
    const root = document.createElement('section');
    root.className = 'reader-resonance';
    root.dataset.essayId = essay.id;
    root.setAttribute('aria-labelledby', 'readerResonanceTitle');

    const options = [1,2,3,4,5].map(value => `
      <label class="reader-resonance-option">
        <input type="radio" name="reader-resonance" value="${value}" aria-label="${value} ${LABELS[value]}">
        <span class="reader-resonance-number" aria-hidden="true">${value}</span>
      </label>`).join('');

    root.innerHTML = `
      <div class="reader-resonance-heading">
        <p class="reader-resonance-kicker">YOUR AFTERTASTE</p>
        <h3 id="readerResonanceTitle">この記事、どれくらい残った？</h3>
        <p class="reader-resonance-hint">良し悪しではなく、今の自分に何かが残った感覚。</p>
      </div>
      <fieldset class="reader-resonance-fieldset">
        <legend class="sr-only">残った度を1から5で選択</legend>
        <div class="reader-resonance-scale">${options}</div>
        <div class="reader-resonance-endpoints" aria-hidden="true">
          <span>ほぼ残らなかった</span>
          <span>強く残った</span>
        </div>
      </fieldset>
      <p class="reader-resonance-selected" data-resonance-selected>まだ記録していません</p>
      <p class="reader-resonance-status" data-resonance-status aria-live="polite" aria-atomic="true"></p>
      <button type="button" class="reader-resonance-secondary" data-resonance-secondary>評価せず読了にする</button>
      <div class="reader-resonance-undo" data-resonance-undo hidden>
        <span>読了記録を解除しました</span>
        <button type="button" data-resonance-restore>元に戻す</button>
      </div>`;

    root.addEventListener('change', event => {
      const input = event.target.closest('input[name="reader-resonance"]');
      if (!input) return;
      setRating(root, essay.id, Number(input.value));
    });

    root.addEventListener('click', event => {
      const secondary = event.target.closest('[data-resonance-secondary]');
      if (secondary) {
        if (secondary.dataset.action === 'undo-complete') undoComplete(root, essay.id);
        else completeOnly(root, essay.id);
        return;
      }
      if (event.target.closest('[data-resonance-restore]')) restoreUndo(root, essay.id);
    });

    sync(root, essay.id);
    return root;
  }

  function render(context) {
    const view = context?.view || document.getElementById('readerView');
    const content = context?.root || document.getElementById('readerContent');
    const essay = context?.essay || currentEssay();
    if (!view || !content || view.hidden || !essay) return;

    const old = content.querySelector(ROOT);
    if (old?.dataset.essayId === essay.id) {
      sync(old, essay.id);
      return;
    }

    old?.remove();
    const root = build(essay);
    const reflections = content.querySelector('.reader-reflections');
    const navigation = content.querySelector('.reader-end-navigation');
    const anchor = reflections || navigation;

    if (anchor?.parentElement) anchor.parentElement.insertBefore(root, anchor);
    else content.append(root);
  }

  window.MyEssaysReaderResonance = Object.freeze({ render, labels: { ...LABELS } });

  if (window.MyEssaysReaderRuntime?.register) {
    window.MyEssaysReaderRuntime.register('resonance', render, { priority: 70 });
  } else {
    document.addEventListener('myessays:reader-rendered', () => render());
  }

  window.addEventListener('storage', event => {
    if (!event.key?.startsWith('myessays:reading-state:')) return;
    const root = document.querySelector(ROOT);
    const id = currentEssayId();
    if (root && id) sync(root, id);
  });
})();