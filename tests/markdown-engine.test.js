const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

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

test('local Markdown image URLs stay inside the site prefix', () => {
  const context = {
    window: {},
    document: {
      baseURI: 'https://silovar-uk.github.io/myessays/',
      querySelector: () => ({ src: 'https://silovar-uk.github.io/myessays/markdown-engine.js?v=test' })
    },
    URL
  };
  vm.runInNewContext(engine, context);
  const resolve = context.window.MyEssaysMarkdown.resolveImageSource;
  assert.equal(resolve('../assets/diagram.svg'), 'https://silovar-uk.github.io/myessays/assets/diagram.svg');
  assert.equal(resolve('./assets/diagram.svg'), 'https://silovar-uk.github.io/myessays/assets/diagram.svg');
  assert.equal(resolve('assets/diagram.svg'), 'https://silovar-uk.github.io/myessays/assets/diagram.svg');
  assert.equal(resolve('../assets/../../escape.svg'), '');
  assert.equal(resolve('javascript:alert(1)'), '');
});

test('factory incident article image references exist and resolve to the deployment prefix', () => {
  const files = [
    'essays/2026-11-03-shindanshi-news-20261103-1300-factory-ot-incident-drill.md',
    'english-mix/shindanshi-news-20261103-1300-factory-ot-incident-drill.md'
  ];
  for (const file of files) {
    const markdown = fs.readFileSync(path.join(root, file), 'utf8');
    const imagePaths = [...markdown.matchAll(/!\[[^\]]*\]\(([^\s)]+)/g)].map(match => match[1]);
    assert.equal(imagePaths.length, 2, file + ': expected two diagrams');
    for (const imagePath of imagePaths) {
      const assetPath = imagePath.replace(/^(?:\.\.?\/)?assets\//, 'assets/');
      assert.ok(fs.existsSync(path.join(root, assetPath)), file + ': missing ' + assetPath);
    }
  }
});
