(() => {
  'use strict';

  const KEY_SETTINGS = 'myessays:rsvp-speech';
  const KEY_CALIBRATION = 'myessays:rsvp-speech-calibration';
  const MODES = Object.freeze({ OFF: 'off', SYNC: 'sync', LANDMARK: 'landmark' });
  const RATE_MIN = 0.5;
  const RATE_MAX = 3;
  const DEFAULT_MORA_PER_SECOND = 6.5;
  const DEFAULTS = Object.freeze({ mode: 'off', rate: 1, voiceURI: '', rememberEnabled: false });
  const KNOWN_ERRORS = new Set([
    'canceled', 'interrupted', 'audio-busy', 'audio-hardware', 'network',
    'synthesis-unavailable', 'synthesis-failed', 'language-unavailable',
    'voice-unavailable', 'text-too-long', 'invalid-argument', 'not-allowed'
  ]);

  const listeners = new Map();
  let voicesCache = [];
  let generation = 0;
  let startedAt = 0;
  let activeMeta = null;
  let activeUtterance = null;
  let lastError = null;
  let calibrationWriteTimer = 0;
  const boundaryProbe = { utterances: 0, events: 0, monotonic: true, lastCharIndex: -1 };

  function safeRead(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || 'null');
      return value && typeof value === 'object' ? value : fallback;
    } catch {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value)));
  }

  function normalizeSettings(value = {}) {
    const rememberEnabled = value.rememberEnabled === true;
    const requestedMode = [MODES.OFF, MODES.SYNC, MODES.LANDMARK].includes(value.mode) ? value.mode : MODES.OFF;
    return {
      mode: rememberEnabled ? requestedMode : MODES.OFF,
      rate: clamp(Number(value.rate) || DEFAULTS.rate, RATE_MIN, RATE_MAX),
      voiceURI: typeof value.voiceURI === 'string' ? value.voiceURI : '',
      rememberEnabled
    };
  }

  const settings = normalizeSettings(safeRead(KEY_SETTINGS, DEFAULTS));
  let calibrationStore = safeRead(KEY_CALIBRATION, {});

  const stateValue = {
    status: 'idle',
    mode: settings.mode,
    rate: settings.rate,
    voiceURI: settings.voiceURI,
    activeVoice: null,
    sentenceId: null,
    generation,
    boundaryReliable: false
  };

  function supported() {
    return Boolean(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  function emit(type, detail = {}) {
    const set = listeners.get(type);
    if (!set) return;
    for (const handler of [...set]) {
      try { handler({ type, detail }); } catch (error) { console.error('[rsvp-speech:event]', error); }
    }
  }

  function on(type, handler) {
    if (typeof handler !== 'function') return () => {};
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(handler);
    return () => listeners.get(type)?.delete(handler);
  }

  function normalizeVoice(voice) {
    return voice ? {
      name: String(voice.name || ''),
      lang: String(voice.lang || ''),
      voiceURI: String(voice.voiceURI || ''),
      localService: Boolean(voice.localService),
      default: Boolean(voice.default)
    } : null;
  }

  function voiceScore(voice, lang, preferredVoiceURI) {
    if (!voice) return -1;
    const requested = String(lang || 'ja-JP').toLowerCase();
    const base = requested.split('-')[0];
    const actual = String(voice.lang || '').toLowerCase();
    let score = 0;
    if (preferredVoiceURI && voice.voiceURI === preferredVoiceURI) score += 1000;
    if (actual === requested) score += 120;
    else if (actual.split('-')[0] === base) score += 90;
    if (voice.localService) score += 20;
    if (voice.default) score += 5;
    return score;
  }

  function selectVoice(voices, { lang = 'ja-JP', preferredVoiceURI = '' } = {}) {
    const list = Array.isArray(voices) ? voices.filter(Boolean) : [];
    if (!list.length) return null;
    return list
      .map((voice, order) => ({ voice, order, score: voiceScore(voice, lang, preferredVoiceURI) }))
      .sort((a, b) => b.score - a.score || a.order - b.order)[0]?.voice || null;
  }

  function loadVoices() {
    if (!supported()) {
      voicesCache = [];
      emit('voices', { voices: [] });
      return [];
    }
    try {
      voicesCache = window.speechSynthesis.getVoices?.() || [];
    } catch {
      voicesCache = [];
    }
    emit('voices', { voices: voicesCache.map(normalizeVoice) });
    return voicesCache;
  }

  function voices() {
    if (!voicesCache.length) loadVoices();
    return voicesCache.map(normalizeVoice);
  }

  function calibrationKey({ voiceURI = '', lang = 'ja-JP', rate = 1 } = {}) {
    return [String(voiceURI || 'auto'), String(lang || 'ja-JP'), Number(rate).toFixed(2)].join('|');
  }

  function updateCalibration(previous, sample, alpha = 0.25) {
    const actualMs = Number(sample?.actualMs);
    const morae = Number(sample?.morae);
    const width = Number(sample?.width);
    if (!Number.isFinite(actualMs) || actualMs < 120 || !Number.isFinite(morae) || morae <= 0) return previous || null;
    const measured = morae / (actualMs / 1000);
    if (!Number.isFinite(measured) || measured < 1 || measured > 30) return previous || null;
    const prev = previous && Number.isFinite(previous.moraPerSecond) ? previous : null;
    const moraPerSecond = prev ? prev.moraPerSecond * (1 - alpha) + measured * alpha : measured;
    const charsPerMinute = Number.isFinite(width) && width > 0
      ? (prev?.charsPerMinute ? prev.charsPerMinute * (1 - alpha) + (width / (actualMs / 60000)) * alpha : width / (actualMs / 60000))
      : Number(prev?.charsPerMinute || 0);
    return {
      moraPerSecond,
      charsPerMinute,
      samples: Number(prev?.samples || 0) + 1,
      updatedAt: new Date().toISOString()
    };
  }

  function persistCalibrationSoon() {
    clearTimeout(calibrationWriteTimer);
    calibrationWriteTimer = setTimeout(() => safeWrite(KEY_CALIBRATION, calibrationStore), 350);
  }

  function recordCalibration(meta, actualMs, voice) {
    if (!meta || meta.kind !== 'sentence') return;
    const key = calibrationKey({
      voiceURI: voice?.voiceURI || stateValue.voiceURI || '',
      lang: meta.lang || 'ja-JP',
      rate: meta.rate || stateValue.rate
    });
    const next = updateCalibration(calibrationStore[key], {
      actualMs,
      morae: meta.morae,
      width: meta.width
    });
    if (!next) return;
    calibrationStore = { ...calibrationStore, [key]: next };
    persistCalibrationSoon();
    emit('calibration', { key, value: { ...next } });
  }

  function calibration(options = {}) {
    const voiceURI = options.voiceURI || stateValue.activeVoice?.voiceURI || stateValue.voiceURI || '';
    const key = calibrationKey({ ...options, voiceURI, rate: options.rate || stateValue.rate });
    const value = calibrationStore[key];
    return value ? { ...value } : null;
  }

  function estimateMs({ morae, lang = 'ja-JP', voiceURI = '', rate = stateValue.rate } = {}) {
    const entry = calibration({ lang, voiceURI, rate });
    const fallback = DEFAULT_MORA_PER_SECOND * clamp(rate, RATE_MIN, RATE_MAX);
    const mps = Number(entry?.moraPerSecond) || fallback;
    return Math.max(180, (Math.max(1, Number(morae) || 1) / mps) * 1000);
  }

  function persistSettings() {
    safeWrite(KEY_SETTINGS, {
      mode: stateValue.mode,
      rate: stateValue.rate,
      voiceURI: stateValue.voiceURI,
      rememberEnabled: settings.rememberEnabled
    });
  }

  function configure(patch = {}) {
    if ('rememberEnabled' in patch) settings.rememberEnabled = patch.rememberEnabled === true;
    if ('rate' in patch) stateValue.rate = clamp(patch.rate, RATE_MIN, RATE_MAX);
    if ('voiceURI' in patch) stateValue.voiceURI = String(patch.voiceURI || '');
    if ('mode' in patch && [MODES.OFF, MODES.SYNC, MODES.LANDMARK].includes(patch.mode)) {
      stateValue.mode = supported() ? patch.mode : MODES.OFF;
    }
    persistSettings();
    return state();
  }

  function nextGeneration() {
    generation += 1;
    stateValue.generation = generation;
    return generation;
  }

  function cancel() {
    const next = nextGeneration();
    try { window.speechSynthesis?.cancel?.(); } catch {}
    activeUtterance = null;
    activeMeta = null;
    startedAt = 0;
    stateValue.sentenceId = null;
    stateValue.status = 'idle';
    lastError = null;
    boundaryProbe.lastCharIndex = -1;
    emit('cancel', { generation: next });
    return next;
  }

  function pause() {
    if (!supported()) return false;
    try { window.speechSynthesis.pause(); } catch { return false; }
    stateValue.status = 'paused';
    emit('pause', { generation: stateValue.generation, sentenceId: stateValue.sentenceId });
    return true;
  }

  function resume() {
    if (!supported()) return false;
    try { window.speechSynthesis.resume(); } catch { return false; }
    stateValue.status = 'speaking';
    emit('resume', { generation: stateValue.generation, sentenceId: stateValue.sentenceId });
    return true;
  }

  function setMode(mode) {
    const next = [MODES.OFF, MODES.SYNC, MODES.LANDMARK].includes(mode) ? mode : MODES.OFF;
    cancel();
    stateValue.mode = supported() ? next : MODES.OFF;
    persistSettings();
    emit('modechange', { mode: stateValue.mode });
    return stateValue.mode;
  }

  function setRate(rate) {
    const next = clamp(rate, RATE_MIN, RATE_MAX);
    if (next === stateValue.rate) return next;
    stateValue.rate = next;
    persistSettings();
    emit('ratechange', { rate: next });
    return next;
  }

  function setVoice(voiceURI) {
    stateValue.voiceURI = String(voiceURI || '');
    persistSettings();
    emit('voicechange', { voiceURI: stateValue.voiceURI });
    return stateValue.voiceURI;
  }

  function normalizeError(code) {
    const value = String(code || 'synthesis-failed');
    return KNOWN_ERRORS.has(value) ? value : 'synthesis-failed';
  }

  function speak({ sentenceId = null, text = '', lang = 'ja-JP', rate = stateValue.rate, voiceURI = stateValue.voiceURI, meta = {} } = {}) {
    const value = String(text || '').trim();
    if (!supported()) return { ok: false, reason: 'unsupported' };
    if (!value) return { ok: false, reason: 'empty' };

    const activeGeneration = nextGeneration();
    try { window.speechSynthesis.cancel(); } catch {}

    const utterance = new window.SpeechSynthesisUtterance(value);
    const resolvedRate = clamp(rate, RATE_MIN, RATE_MAX);
    const voice = selectVoice(voicesCache.length ? voicesCache : loadVoices(), { lang, preferredVoiceURI: voiceURI });
    utterance.lang = lang;
    utterance.rate = resolvedRate;
    utterance.pitch = 1;
    utterance.volume = 1;
    if (voice) utterance.voice = voice;

    activeUtterance = utterance;
    activeMeta = { ...meta, lang, rate: resolvedRate };
    stateValue.status = 'loading';
    stateValue.sentenceId = sentenceId;
    stateValue.activeVoice = normalizeVoice(voice);
    stateValue.generation = activeGeneration;
    lastError = null;
    boundaryProbe.lastCharIndex = -1;

    utterance.onstart = () => {
      if (activeGeneration !== generation) return;
      startedAt = performance.now();
      stateValue.status = 'speaking';
      emit('start', { generation: activeGeneration, sentenceId, voice: normalizeVoice(voice), meta: activeMeta });
    };

    utterance.onboundary = event => {
      if (activeGeneration !== generation) return;
      const charIndex = Number(event.charIndex);
      if (!Number.isFinite(charIndex) || charIndex < 0) return;
      if (boundaryProbe.lastCharIndex >= 0 && charIndex < boundaryProbe.lastCharIndex) boundaryProbe.monotonic = false;
      boundaryProbe.lastCharIndex = charIndex;
      boundaryProbe.events += 1;
      stateValue.boundaryReliable = boundaryProbe.utterances >= 3 && boundaryProbe.events >= 5 && boundaryProbe.monotonic;
      emit('boundary', {
        generation: activeGeneration,
        sentenceId,
        charIndex,
        elapsedTime: Number(event.elapsedTime || 0),
        name: String(event.name || ''),
        reliable: stateValue.boundaryReliable,
        meta: activeMeta
      });
    };

    utterance.onend = event => {
      if (activeGeneration !== generation) return;
      const actualMs = startedAt ? performance.now() - startedAt : Number(event.elapsedTime || 0) * 1000;
      boundaryProbe.utterances += 1;
      stateValue.boundaryReliable = boundaryProbe.utterances >= 3 && boundaryProbe.events >= 5 && boundaryProbe.monotonic;
      stateValue.status = 'idle';
      stateValue.sentenceId = null;
      recordCalibration(activeMeta, actualMs, voice);
      emit('end', {
        generation: activeGeneration,
        sentenceId,
        actualMs,
        reliable: stateValue.boundaryReliable,
        meta: activeMeta
      });
      activeUtterance = null;
      activeMeta = null;
      startedAt = 0;
    };

    utterance.onerror = event => {
      if (activeGeneration !== generation) return;
      const code = normalizeError(event.error);
      lastError = code;
      stateValue.status = code === 'canceled' || code === 'interrupted' ? 'idle' : 'error';
      emit('error', {
        generation: activeGeneration,
        sentenceId,
        code,
        recoverable: ['canceled', 'interrupted', 'voice-unavailable', 'language-unavailable'].includes(code),
        meta: activeMeta
      });
      activeUtterance = null;
      activeMeta = null;
      startedAt = 0;
    };

    try {
      window.speechSynthesis.speak(utterance);
      return { ok: true, generation: activeGeneration, voice: normalizeVoice(voice) };
    } catch (error) {
      const code = 'synthesis-failed';
      lastError = code;
      stateValue.status = 'error';
      emit('error', { generation: activeGeneration, sentenceId, code, recoverable: false, meta: activeMeta });
      return { ok: false, reason: code, error };
    }
  }

  function state() {
    return {
      supported: supported(),
      status: stateValue.status,
      mode: supported() ? stateValue.mode : MODES.OFF,
      rate: stateValue.rate,
      voiceURI: stateValue.voiceURI,
      activeVoice: stateValue.activeVoice ? { ...stateValue.activeVoice } : null,
      sentenceId: stateValue.sentenceId,
      generation: stateValue.generation,
      boundaryReliable: stateValue.boundaryReliable,
      rememberEnabled: settings.rememberEnabled,
      lastError
    };
  }

  if (supported()) {
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
  } else {
    stateValue.mode = MODES.OFF;
  }

  window.MyEssaysRsvpSpeech = Object.freeze({
    installed: true,
    MODES,
    supported,
    configure,
    voices,
    loadVoices,
    speak,
    pause,
    resume,
    cancel,
    setMode,
    setRate,
    setVoice,
    state,
    calibration,
    estimateMs,
    on,
    lib: Object.freeze({
      clamp,
      normalizeSettings,
      normalizeVoice,
      voiceScore,
      selectVoice,
      calibrationKey,
      updateCalibration,
      normalizeError
    })
  });
})();
