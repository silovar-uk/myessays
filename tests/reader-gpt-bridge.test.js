const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(ROOT, file), 'utf8');

test('GPT bridge exposes a quiet article visualization action beside reading completion', () => {
  const js = read('reader-gpt-bridge.js');
  const css = read('reader-gpt-bridge.css');
  const html = read('index.html');

  assert.match(html, /reader-gpt-bridge\.css\?v=20260928-1/);
  assert.match(html, /reader-gpt-bridge\.js\?v=20260928-1/);
  assert.match(js, /const RESONANCE_ROOT = '\.reader-resonance'/);
  assert.match(js, /GPTで画像化/);
  assert.match(js, /縦長9:16/);
  assert.match(js, /説明の網羅性を優先/);
  assert.match(js, /記事本文にない事実を追加しない/);
  assert.match(js, /https:\/\/chatgpt\.com\/\?prompt=/);
  assert.match(js, /navigator\.clipboard\?\.writeText/);
  assert.match(js, /document\.execCommand\('copy'\)/);
  assert.match(js, /reader-post-actions/);
  assert.match(css, /\.reader-visualize-button/);
  assert.match(css, /reader-visualize-awake/);
  assert.match(css, /prefers-reduced-motion/);
});
