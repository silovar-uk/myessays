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

  assert.match(html, /reader-gpt-bridge\.css\?v=20260930-1/);
  assert.match(html, /reader-gpt-bridge\.js\?v=20260930-1/);
  assert.match(js, /const RESONANCE_ROOT = '\.reader-resonance'/);
  assert.match(js, /GPTで画像化/);
  assert.match(js, /縦長9:16/);
  assert.match(js, /説明の網羅性を優先/);
  assert.match(js, /記事本文にない事実を追加しない/);
  assert.match(js, /document\.title\.replace\(\/\\s\*\\\|\\s\*My Essays\\s\*\$\//);
  assert.match(js, /https:\/\/chatgpt\.com\/\?prompt=/);
  assert.match(js, /navigator\.clipboard\?\.writeText/);
  assert.match(js, /document\.execCommand\('copy'\)/);
  assert.match(js, /reader-post-actions/);
  assert.match(css, /\.reader-visualize-button/);
  assert.match(css, /reader-visualize-awake/);
  assert.match(css, /prefers-reduced-motion/);
});


test('GPT visualization is available at the article entrance and completion offers TOP return', () => {
  const js = read('reader-gpt-bridge.js');
  const css = read('reader-gpt-bridge.css');

  assert.ok(js.includes("const INTRO_ROOT = '.reader-v2-intro'"));
  assert.ok(js.includes('function visualizationButton('));
  assert.ok(js.includes('function enhanceIntroVisualization('));
  assert.ok(js.includes('reader-intro-visualize-button'));
  assert.ok(js.includes("details.insertAdjacentElement('beforebegin', block)"));
  assert.ok(js.includes('reader-top-return-button'));
  assert.ok(js.includes("top.href = '#/'"));
  assert.ok(js.includes('TOPへ戻る'));
  assert.ok(js.includes("window.scrollTo({ top: 0, behavior: 'instant' })"));
  assert.match(css, /\.reader-intro-visualize/);
  assert.match(css, /\.reader-top-return-button/);
});


test('GPT sequel turns the article ending into a next-question launchpad', () => {
  const js = read('reader-gpt-bridge.js');
  const css = read('reader-gpt-bridge.css');

  assert.match(js, /function buildSequelPrompt\(essay\)/);
  assert.match(js, /GPTで続編/);
  assert.match(js, /前の記事によって生まれた次の問いへ進む/);
  assert.match(js, /未解決点/);
  assert.match(js, /原記事と同じ結論をもう一度証明するだけの記事は禁止/);
  assert.match(js, /リサーチ → 構造化 → 不足点の特定 → 再リサーチ/);
  assert.match(js, /重要な外部情報には出典URL/);
  assert.match(js, /function openArticleSequel\(root\)/);
  assert.match(js, /続編の指示をコピーしてChatGPTを開きました/);
  assert.match(js, /reader-sequel-button/);
  assert.match(js, /reader-expand-actions/);
  assert.match(js, /reader-return-actions/);
  assert.match(js, /label\.textContent = 'この記事から'/);

  const introStart = js.indexOf('function enhanceIntroVisualization');
  const introEnd = js.indexOf('function enhanceVisualization');
  const intro = js.slice(introStart, introEnd);
  assert.doesNotMatch(intro, /sequelButton/);
  assert.match(intro, /visualizationButton/);

  assert.match(css, /\.reader-expand-actions/);
  assert.match(css, /\.reader-sequel-button/);
  assert.match(css, /grid-template-columns:\s*repeat\(2/);
  assert.match(css, /@media \(max-width: 350px\)[\s\S]*grid-template-columns:\s*1fr/);
  assert.match(css, /\.reader-sequel-button[\s\S]*min-height:\s*46px/);
  assert.match(css, /prefers-reduced-motion/);
});
