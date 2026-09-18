const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('desktop hover preview uses fixed bottom subtitle dock instead of paragraph-relative positioning', () => {
  const js = read('reader-language-lab.js');
  const css = read('reader-language-lab.css');

  assert.match(js, /const PREVIEW_DELAY_MS = 160;/);
  assert.match(js, /const previewMode = preview && !lensPinned && !isMobile\(\);/);
  assert.match(js, /if \(previewMode\) panel\.style\.removeProperty\('top'\);/);
  assert.match(js, /else positionPinnedLens\(panel, block\);/);

  assert.match(css, /@media \(min-width: 761px\)/);
  assert.match(css, /\.language-lens-panel\.is-preview[\s\S]*bottom:\s*22px/);
  assert.match(css, /\.language-lens-panel\.is-preview[\s\S]*left:\s*50%/);
  assert.match(css, /\.language-lens-panel\.is-preview[\s\S]*transform:\s*translateX\(-50%\)/);
  assert.match(css, /\.language-lens-panel\.is-preview[\s\S]*pointer-events:\s*none/);
});

test('hover preview shows only the counterpart while detailed controls stay pinned-only', () => {
  const css = read('reader-language-lab.css');

  assert.match(
    css,
    /\.language-lens-panel\.is-preview \.language-lens-head,[\s\S]*\.language-lens-panel\.is-preview \.language-lens-actions[\s\S]*display:\s*none/
  );
  assert.match(css, /-webkit-line-clamp:\s*3/);
  assert.match(css, /\.language-lens-panel\.is-pinned[\s\S]*pointer-events:\s*auto/);
});

test('pinned lens ignores incidental desktop hover and note mode suppresses previews', () => {
  const js = read('reader-language-lab.js');
  const css = read('reader-language-lab.css');

  assert.match(js, /if \(compareMode \|\| isMobile\(\) \|\| noteIsOpen\(\) \|\| lensPinned\) return;/);
  assert.match(css, /\.reader-shell\.note-is-open \.language-lens-panel\.is-preview[\s\S]*display:\s*none !important/);
});

test('mobile language dock remains the explicit interaction surface', () => {
  const css = read('reader-language-lab.css');
  const js = read('reader-language-lab.js');

  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.paragraph-language-dock[\s\S]*position:\s*fixed/);
  assert.match(js, /if \(isMobile\(\)\) \{[\s\S]*const dock = ensureMobileDock\(\)/);
});

test('reading mode changes close any transient or pinned language lens', () => {
  const js = read('reader-language-lab.js');

  assert.match(
    js,
    /myessays:reader-version-changed'[\s\S]*closeLens\(\{ force: true \}\)[\s\S]*placeModeBar/
  );
});

test('page cache keys load the subtitle-dock release', () => {
  const html = read('index.html');

  assert.match(html, /reader-language-lab\.css\?v=20260918-2/);
  assert.match(html, /reader-language-lab\.js\?v=20260918-2/);
});
