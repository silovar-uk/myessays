const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function loadSpeech({ voices = [] } = {}) {
  const storage = new Map();
  const synth = {
    getVoices: () => voices,
    addEventListener() {},
    cancel() {},
    pause() {},
    resume() {},
    speak(utterance) { synth.lastUtterance = utterance; },
    lastUtterance: null
  };
  class Utterance {
    constructor(text) {
      this.text = text;
      this.rate = 1;
      this.lang = '';
      this.pitch = 1;
      this.volume = 1;
      this.voice = null;
    }
  }
  const context = vm.createContext({
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value)
    },
    speechSynthesis: synth,
    SpeechSynthesisUtterance: Utterance,
    performance,
    console,
    setTimeout,
    clearTimeout
  });
  context.window = context;
  vm.runInContext(read('reader-rsvp-speech.js'), context);
  return { api: context.window.MyEssaysRsvpSpeech, synth, storage };
}

test('speech controller prefers the requested Japanese local voice', () => {
  const voices = [
    { name: 'Default EN', lang: 'en-US', voiceURI: 'en', localService: true, default: true },
    { name: 'Japanese cloud', lang: 'ja-JP', voiceURI: 'ja-cloud', localService: false, default: false },
    { name: 'Japanese local', lang: 'ja-JP', voiceURI: 'ja-local', localService: true, default: false }
  ];
  const { api } = loadSpeech({ voices });
  const hit = api.lib.selectVoice(voices, { lang: 'ja-JP', preferredVoiceURI: 'ja-local' });
  assert.equal(hit.voiceURI, 'ja-local');
});

test('speech calibration rejects implausible samples and smooths valid samples', () => {
  const { api } = loadSpeech();
  assert.equal(api.lib.updateCalibration(null, { actualMs: 1000, morae: 80, width: 20 }), null);
  const first = api.lib.updateCalibration(null, { actualMs: 2000, morae: 12, width: 18 });
  assert.equal(first.samples, 1);
  assert.equal(first.moraPerSecond, 6);
  const next = api.lib.updateCalibration(first, { actualMs: 2000, morae: 16, width: 20 });
  assert.equal(next.samples, 2);
  assert.ok(next.moraPerSecond > 6 && next.moraPerSecond < 8);
});

test('speech module exposes safe modes and cancels stale generations', () => {
  const { api, synth } = loadSpeech();
  assert.equal(api.supported(), true);
  assert.equal(api.setMode('sync'), 'sync');
  const first = api.speak({ sentenceId: 1, text: 'こんにちは。', meta: { kind: 'sentence', morae: 6, width: 6 } });
  assert.equal(first.ok, true);
  const previousGeneration = first.generation;
  api.cancel();
  assert.ok(api.state().generation > previousGeneration);
  assert.equal(api.state().status, 'idle');
  assert.ok(synth.lastUtterance);
});

test('speech error names are normalized without throwing', () => {
  const { api } = loadSpeech();
  assert.equal(api.lib.normalizeError('voice-unavailable'), 'voice-unavailable');
  assert.equal(api.lib.normalizeError('unknown-engine-error'), 'synthesis-failed');
});

test('index loads speech before the RSVP integration', () => {
  const html = read('index.html');
  assert.match(html, /reader-rsvp-speech\.css\?v=\d{8}-\d+/);
  assert.match(html, /reader-rsvp-speech\.js\?v=\d{8}-\d+/);
  assert.ok(html.indexOf('reader-rsvp-speech.js') < html.indexOf('reader-rsvp.js'));
});

test('RSVP integration has sync and landmark paths without lowering the visual speed ceiling', () => {
  const js = read('reader-rsvp.js');
  assert.match(js, /buildSentenceMap/);
  assert.match(js, /playSyncedSentence/);
  assert.match(js, /scheduleSentenceVisuals/);
  assert.match(js, /耳の標識/);
  assert.match(js, /boundaryReliable/);
  assert.match(js, /const SPEED_MAX = 4000/);
});
