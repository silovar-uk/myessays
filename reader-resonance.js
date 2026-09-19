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
  let settleTimer = 0;

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
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: `myessays:reading-state:${id}` }));
    } catch {}
  }

  function setRatingOpen(root, open) {
    if (!root) return;
    root.dataset.ratingOpen = String(Boolean(open));
    sync(root, root.dataset.essayId || currentEssayId());
  }

  function sync(root, id) {
    const api = store();
    if (!api || !root || !id) return;

    const reading = api.read(id);
    const resonance = api.getResonance(id);
    const completed = Boolean(reading.completedAt);
    const ratingOpen = completed && (!resonance || root.dataset.ratingOpen === 'true');

    root.classList.toggle('is-completed', completed);
    root.classList.toggle('has-resonance', Boolean(resonance));
    root.classList.toggle('is-rating-open', ratingOpen);

    root.querySelectorAll('input[name="reader-resonance"]').forEach(input => {
      input.checked = Boolean(resonance && Number(input.value) === resonance.value);
    });

    const seal = root.querySelector('[data-resonance-seal]');
    if (seal) {
      seal.setAttribute('aria-pressed', String(completed));
      seal.dataset.state = completed ? 'completed' : 'ready';
      const mark = seal.querySelector('[data-seal-mark]');
      const label = seal.querySelector('[data-seal-label]');
      if (mark) mark.textContent = completed ? '✓' : '○';
      if (label) label.textContent = '読了';
    }

    const panel = root.querySelector('[data-resonance-rating]');
    if (panel) panel.hidden = !ratingOpen;

    const summary = root.querySelector('[data-resonance-summary]');
    if (summary) {
      summary.hidden = !completed || !resonance || ratingOpen;
      if (resonance) {
        const value = summary.querySelector('[data-summary-value]');
        const label = summary.querySelector('[data-summary-label]');
        if (value) value.textContent = String(resonance.value);
        if (label) label.textContent = LABELS[resonance.value];
      }
    }

    const secondary = root.querySelector('[data-resonance-secondary]');
    if (secondary) secondary.hidden = !completed;

    const after = root.querySelector('[data-resonance-after]');
    if (after) after.hidden = !completed;

    const undo = root.querySelector('[data-resonance-undo]');
    if (!completed && undoSnapshot?.id !== id && undo) undo.hidden = true;
  }

  function markCompleted(root, id) {
    const api = store();
    if (!api) return announce(root, '保存機能を読み込めませんでした', 'error');

    const before = api.read(id);
    if (before.completedAt) {
      setRatingOpen(root, !api.getResonance(id));
      return;
    }

    const result = api.setCompleted(id, true);
    if (!result.ok) return announce(root, '保存できませんでした。もう一度試してください', 'error');

    root.dataset.ratingOpen = 'true';
    root.classList.add('just-completed');
    clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => root.classList.remove('just-completed'), 620);
    sync(root, id);
    announce(root, '読了として保存しました', 'success');
    dispatch(id);
  }

  function setRating(root, id, value) {
    const api = store();
    if (!api) return announce(root, '保存機能を読み込めませんでした', 'error');

    const result = api.setResonance(id, value);
    if (!result.ok) {
      sync(root, id);
      return announce(root, '保存できませんでした。もう一度試してください', 'error');
    }

    root.dataset.ratingOpen = 'false';
    sync(root, id);
    announce(root, `${value} · ${LABELS[value]}`, 'success');
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
    root.dataset.ratingOpen = 'false';
    sync(root, id);

    const undo = root.querySelector('[data-resonance-undo]');
    if (undo) undo.hidden = false;
    announce(root, '読了を解除しました', 'success');

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
    root.dataset.ratingOpen = 'false';
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
    root.dataset.ratingOpen = 'false';
    root.setAttribute('aria-label', '読了');

    const options = [1,2,3,4,5].map(value => `
      <label class="reader-resonance-option" style="--resonance-step:${value}">
        <input type="radio" name="reader-resonance" value="${value}" aria-label="${value} ${LABELS[value]}">
        <span class="reader-resonance-dot" aria-hidden="true"></span>
      </label>`).join('');

    root.innerHTML = `
      <div class="reader-resonance-rule" aria-hidden="true"><span></span><i>◇</i><span></span></div>
      <div class="reader-seal-stage">
        <button type="button" class="reader-seal" data-resonance-seal aria-pressed="false">
          <span class="reader-seal-mark" data-seal-mark aria-hidden="true">○</span>
          <span data-seal-label>読了</span>
        </button>
        <p class="reader-resonance-status" data-resonance-status aria-live="polite" aria-atomic="true"></p>
      </div>
      <div class="reader-resonance-after" data-resonance-after hidden>
        <div class="reader-resonance-rating" data-resonance-rating hidden>
          <p class="reader-resonance-question">どれくらい残った？</p>
          <fieldset class="reader-resonance-fieldset">
            <legend class="sr-only">残った度を1から5で選択</legend>
            <div class="reader-resonance-scale">${options}</div>
          </fieldset>
        </div>
        <button type="button" class="reader-resonance-summary" data-resonance-summary hidden aria-label="残った度を変更">
          <strong data-summary-value></strong>
          <span data-summary-label></span>
          <small>変更</small>
        </button>
        <button type="button" class="reader-resonance-secondary" data-resonance-secondary hidden>読了を解除</button>
      </div>
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
      if (event.target.closest('[data-resonance-seal]')) {
        markCompleted(root, essay.id);
        return;
      }
      if (event.target.closest('[data-resonance-summary]')) {
        setRatingOpen(root, true);
        return;
      }
      if (event.target.closest('[data-resonance-secondary]')) {
        undoComplete(root, essay.id);
        return;
      }
      if (event.target.closest('[data-resonance-restore]')) restoreUndo(root, essay.id);
    });

    const existing = store()?.getResonance?.(essay.id);
    if (!existing && store()?.read?.(essay.id)?.completedAt) root.dataset.ratingOpen = 'true';
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

  window.MyEssaysReaderResonance = Object.freeze({
    render,
    labels: { ...LABELS },
    openRating: () => {
      const root = document.querySelector(ROOT);
      if (root) setRatingOpen(root, true);
    }
  });

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