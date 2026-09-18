(() => {
  'use strict';

  if (window.MyEssaysReadingState) return;

  const PREFIX = 'myessays:reading-state:';

  const key = id => id ? `${PREFIX}${id}` : '';

  function safeRead(id) {
    if (!id) return {};
    try {
      const raw = localStorage.getItem(key(id));
      if (!raw) return {};
      const value = JSON.parse(raw);
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch {
      return {};
    }
  }

  function safeWrite(id, value) {
    if (!id) return { ok: false, state: {} };
    try {
      localStorage.setItem(key(id), JSON.stringify(value));
      return { ok: true, state: value };
    } catch {
      return { ok: false, state: safeRead(id) };
    }
  }

  function merge(id, patch = {}) {
    const next = { ...safeRead(id), ...patch };
    return safeWrite(id, next);
  }

  function markOpened(id) {
    const current = safeRead(id);
    if (current.openedAt) return { ok: true, state: current };
    return safeWrite(id, { ...current, openedAt: new Date().toISOString() });
  }

  function setCompleted(id, completed = true) {
    const current = safeRead(id);
    const openedAt = current.openedAt || new Date().toISOString();
    if (completed) {
      if (current.completedAt) return { ok: true, state: current };
      return safeWrite(id, { ...current, openedAt, completedAt: new Date().toISOString() });
    }
    const { completedAt, resonance, ...rest } = current;
    return safeWrite(id, { ...rest, openedAt });
  }

  function normalizeValue(value) {
    const number = Number(value);
    return Number.isInteger(number) && number >= 1 && number <= 5 ? number : null;
  }

  function setResonance(id, value) {
    const normalized = normalizeValue(value);
    if (!id || normalized == null) return { ok: false, state: safeRead(id) };

    const current = safeRead(id);
    const now = new Date().toISOString();
    const previous = current.resonance && typeof current.resonance === 'object'
      ? current.resonance
      : null;

    return safeWrite(id, {
      ...current,
      openedAt: current.openedAt || now,
      completedAt: current.completedAt || now,
      resonance: {
        value: normalized,
        ratedAt: previous?.ratedAt || now,
        updatedAt: now
      }
    });
  }

  function getResonance(id) {
    const value = safeRead(id).resonance;
    const normalized = normalizeValue(value?.value);
    return normalized == null ? null : {
      value: normalized,
      ratedAt: String(value?.ratedAt || ''),
      updatedAt: String(value?.updatedAt || value?.ratedAt || '')
    };
  }

  function status(id) {
    const current = safeRead(id);
    if (current.completedAt) return 'completed';
    if (current.openedAt) return 'opened';
    return 'unread';
  }

  function clearCompletion(id) {
    return setCompleted(id, false);
  }

  window.MyEssaysReadingState = Object.freeze({
    prefix: PREFIX,
    read: safeRead,
    merge,
    markOpened,
    setCompleted,
    clearCompletion,
    setResonance,
    getResonance,
    status
  });
})();