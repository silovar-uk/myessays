const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadRenderer() {
  const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
  const start = source.indexOf('function escapeHtml');
  const end = source.indexOf('function readingMetrics');
  assert.ok(start >= 0 && end > start, 'renderer functions should be discoverable');
  const sandbox = {};
  vm.runInNewContext(`${source.slice(start, end)}\nglobalThis.renderMarkdownForTest = renderMarkdown;`, sandbox);
  return sandbox.renderMarkdownForTest;
}

const renderMarkdown = loadRenderer();

test('renders an accessible local figure with a caption', () => {
  const html = renderMarkdown('![構造図](assets/value-chain/example.svg "図1　説明")');
  assert.match(html, /<figure class="essay-figure">/);
  assert.match(html, /src="assets\/value-chain\/example\.svg"/);
  assert.match(html, /alt="構造図"/);
  assert.match(html, /<figcaption>図1　説明<\/figcaption>/);
  assert.match(html, /loading="lazy"/);
});

test('renders a Markdown table with headers and body cells', () => {
  const html = renderMarkdown([
    '| 活動 | KPI |',
    '| --- | --- |',
    '| CRM | 再来場率 |'
  ].join('\n'));
  assert.match(html, /<table class="essay-table">/);
  assert.match(html, /<th scope="col">活動<\/th>/);
  assert.match(html, /<td>再来場率<\/td>/);
});

test('does not create an image element for an unsafe source', () => {
  const html = renderMarkdown('![危険](javascript:alert(1))');
  assert.doesNotMatch(html, /<img/);
});
