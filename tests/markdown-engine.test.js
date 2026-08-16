const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const engine = fs.readFileSync(path.join(root, 'markdown-engine.js'), 'utf8');
const nodeEssay = fs.readFileSync(path.join(root, 'essays', '2026-08-16-nodejs-from-zero.md'), 'utf8');

test('pins a standards Markdown parser and sanitizer before the reader engine', () => {
  assert.match(indexHtml, /marked@18\.0\.7\/lib\/marked\.umd\.js/);
  assert.match(indexHtml, /dompurify@3\.4\.12\/dist\/purify\.min\.js/);
  const markedPosition = indexHtml.indexOf('marked@18.0.7');
  const purifyPosition = indexHtml.indexOf('dompurify@3.4.12');
  const appPosition = indexHtml.indexOf('app.js');
  const enginePosition = indexHtml.indexOf('markdown-engine.js');
  assert.ok(markedPosition >= 0 && markedPosition < appPosition);
  assert.ok(purifyPosition >= 0 && purifyPosition < appPosition);
  assert.ok(enginePosition > appPosition);
});

test('new engine owns parsing, sanitization, code blocks and footnotes', () => {
  assert.match(engine, /window\.marked\.parse/);
  assert.match(engine, /window\.DOMPurify\.sanitize/);
  assert.match(engine, /className = 'code-block'/);
  assert.match(engine, /className = 'code-copy'/);
  assert.match(engine, /class=\"footnote-ref\"/);
  assert.match(engine, /window\.renderMarkdown = render/);
});

test('Node.js article keeps language-labelled fenced code as authoring input', () => {
  assert.match(nodeEssay, /```text/);
  assert.match(nodeEssay, /```js/);
  assert.match(nodeEssay, /```bash/);
  assert.doesNotMatch(engine, /paragraph\.push\(line\.trim\(\)\)/);
});
