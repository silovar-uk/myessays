from pathlib import Path


def read(path):
    return Path(path).read_text()


def write(path, text):
    Path(path).write_text(text)


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected exactly 1 anchor, got {count}')
    return text.replace(old, new, 1)


# Reader V2 keeps location semantics, but the Reading Mode Shell is the sole
# visible progress surface.
path = 'reader-v2.js'
text = read(path)
text = replace_once(text, """        </div>
        <div class=\"reader-v2-header-progress\" aria-hidden=\"true\"><span></span></div>`;
""", """        </div>`;
""", 'remove hidden Reader V2 progress DOM')
text = replace_once(text, """    const title = header.querySelector('.reader-v2-current-title');
    const progress = header.querySelector('.reader-v2-header-progress span');
    if (title) title.textContent = locationValue.sectionTitle || 'Introduction';
    if (progress) {
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, locationValue.progressRatio))})`;
    }
""", """    const title = header.querySelector('.reader-v2-current-title');
    if (title) title.textContent = locationValue.sectionTitle || 'Introduction';
""", 'remove Reader V2 progress rendering')
if 'reader-v2-header-progress' in text:
    raise SystemExit('reader-v2.js still contains header progress DOM')
write(path, text)

# Reading Mode Shell renders the sole progress bar directly from semantic progress.
path = 'reader-mode-shell.js'
text = read(path)
start = text.index('  function headerProgress() {')
end = text.index('  function updateContext(detail = null) {', start)
text = text[:start] + text[end:]
text = replace_once(text, """    const ratio = Number.isFinite(detail?.progressRatio)
      ? Math.min(1, Math.max(0, detail.progressRatio))
      : headerProgress();
""", """    const semanticRatio = window.MyEssaysReadingLocators?.progress?.().ratio;
    const ratio = Number.isFinite(detail?.progressRatio)
      ? Math.min(1, Math.max(0, detail.progressRatio))
      : (Number.isFinite(semanticRatio) ? Math.min(1, Math.max(0, semanticRatio)) : 0);
""", 'shell semantic progress fallback')
text = replace_once(text, """  document.addEventListener('myessays:reading-mode-settled', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reading-location-changed', event => {
""", """  document.addEventListener('myessays:reading-mode-settled', () => scheduleSync({ availability: true }));
  document.addEventListener('myessays:reading-mode-stable', () => scheduleSync());
  document.addEventListener('myessays:reading-progress-changed', () => scheduleSync());
  document.addEventListener('myessays:reading-location-changed', event => {
""", 'shell semantic progress events')
write(path, text)

# Remove obsolete CSS reference to a progress element that no longer exists.
path = 'reader-mode-shell.css'
text = read(path)
text = replace_once(text, """body.reader-v2-open .reader-v2-current,
body.reader-v2-open .reader-v2-header-progress,
body.reader-v2-open #readerLanguageInstantDirect,
""", """body.reader-v2-open .reader-v2-current,
body.reader-v2-open #readerLanguageInstantDirect,
""", 'remove obsolete header-progress CSS')
write(path, text)

# Static contract: one visible progress surface, semantic value owner.
path = 'tests/reader-reading-pivot.test.js'
text = read(path)
text = replace_once(text, """  assert.match(v2, /reader-v2-header-progress/);
  assert.match(v2, /MyEssaysReadingLocators\\?\\.progress\\?\\.\\(\\)/);
""", """  const shell = read('reader-mode-shell.js');
  assert.doesNotMatch(v2, /reader-v2-header-progress/);
  assert.match(v2, /MyEssaysReadingLocators\\?\\.progress\\?\\.\\(\\)/);
  assert.match(shell, /reader-mode-shell__progress/);
  assert.match(shell, /MyEssaysReadingLocators\\?\\.progress\\?\\.\\(\\)/);
""", 'static progress display owner')
write(path, text)

path = 'tests/reader-mode-shell.test.js'
text = read(path)
insert = r'''
test('shell is the only visible reading progress surface', () => {
  const shell = read('reader-mode-shell.js');
  const v2 = read('reader-v2.js');
  const ui = read('ui-enhancements.js');
  assert.match(shell, /reader-mode-shell__progress/);
  assert.match(shell, /MyEssaysReadingLocators\?\.progress\?\.\(\)/);
  assert.doesNotMatch(v2, /reader-v2-header-progress/);
  assert.doesNotMatch(ui, /reading-progress-track|reading-progress-bar/);
});

'''
anchor = "test('semantic focus feedback respects reduced motion', () => {"
if insert.strip() not in text:
    text = replace_once(text, anchor, insert + anchor, 'insert shell progress ownership test')
write(path, text)

# Helper transformations for browser QA: all user actions target the visible Shell.
def shellify_basic(path):
    text = read(path)
    text = text.replace("const CONTROL = '#readerLanguageInstantDirect';", "const CONTROL = '#readerModeShell';")
    text = text.replace('#readerLanguageInstantDirect [data-reading-mode-intent=', '#readerModeShell [data-reading-mode-intent=')
    text = text.replace("document.getElementById('readerLanguageInstantDirect')", "document.getElementById('readerModeShell')")
    return text

# Locator diagnostic.
path = 'scripts/reading-locator-diagnostic.cjs'
text = shellify_basic(path)
text = text.replace('persistent Reading Mode choice should exist', 'visible Reading Mode choice should exist')
write(path, text)

# Reading Focus + rapid interaction QA.
path = 'scripts/reading-focus-instant-qa.cjs'
text = shellify_basic(path)
text = replace_once(text, """async function waitForDirectControl(page, count) {
  await page.waitForSelector(CONTROL);
  await page.waitForFunction(expected => (
    document.querySelectorAll('#readerModeShell [data-reading-mode-intent]').length === expected
  ), count, { timeout: 10000 });
}
""", """async function waitForDirectControl(page, count) {
  await page.waitForSelector(CONTROL, { state: 'visible' });
  await page.waitForFunction(expected => (
    [...document.querySelectorAll('#readerModeShell [data-reading-mode-intent]')]
      .filter(button => !button.disabled).length === expected
  ), count, { timeout: 10000 });
}
""", 'focus QA visible enabled controls')
text = replace_once(text, """  assert.equal(await page.locator(CONTROL).count(), 0, 'JA-only article should not invent language controls');
""", """  assert.equal(await page.locator(`${CONTROL} [data-reading-mode-intent]:not(:disabled)`).count(), 1, 'JA-only article should expose only Japanese as an enabled Reading Mode');
""", 'JA-only shell control assertion')
text = text.replace('persistent control must remain connected', 'Reading Mode Shell must remain connected')
text = text.replace('persistent controls mounted', 'Reading Mode Shell mounted')
write(path, text)

# Reading Versions QA: visible Shell is the interaction target and sole progress DOM.
path = 'scripts/reading-versions-qa.cjs'
text = shellify_basic(path)
text = replace_once(text, """const optionSelector = version => `${CONTROL} .reader-language-direct-option[data-reading-mode-intent=\"${version}\"]`;
""", """const optionSelector = version => `${CONTROL} .reader-mode-shell__mode[data-reading-mode-intent=\"${version}\"]`;
""", 'versions QA shell selector')
text = replace_once(text, """      progressBars: {
        header: document.querySelectorAll('.reader-v2-header-progress').length,
        legacy: document.querySelectorAll('.reading-progress-track').length
      },
""", """      progressBars: {
        shell: document.querySelectorAll('.reader-mode-shell__progress').length,
        header: document.querySelectorAll('.reader-v2-header-progress').length,
        legacy: document.querySelectorAll('.reading-progress-track').length
      },
""", 'versions QA progress DOM state')
text = replace_once(text, """  assert.equal(before.progressBars.header, 1, 'Reader V2 must render exactly one progress bar');
  assert.equal(before.progressBars.legacy, 0, 'legacy body progress bar must be removed');
""", """  assert.equal(before.progressBars.shell, 1, 'Reading Mode Shell must render exactly one progress bar');
  assert.equal(before.progressBars.header, 0, 'Reader V2 must not retain a hidden duplicate progress bar');
  assert.equal(before.progressBars.legacy, 0, 'legacy body progress bar must be removed');
""", 'versions QA exactly one progress bar')
text = text.replace('persistent language control', 'Reading Mode Shell')
text = text.replace("assert.equal(await page.locator(optionSelector('en-mix')).textContent(), 'EN');", "assert.equal((await page.locator(optionSelector('en-mix')).textContent()).trim(), 'English Mix');")
text = text.replace("assert.equal(await page.locator(optionSelector('es-mix')).textContent(), 'ES');", "assert.equal((await page.locator(optionSelector('es-mix')).textContent()).trim(), 'Español Mix');")
write(path, text)

# Japanese Reference QA uses the visible Shell.
path = 'scripts/japanese-reference-qa.cjs'
text = shellify_basic(path)
write(path, text)

# URL QA also clicks and validates the user-facing Shell rather than the hidden mirror.
path = 'scripts/reading-mode-url-qa.cjs'
text = read(path)
text = text.replace("document.querySelector('#readerLanguageInstantDirect [aria-checked=\"true\"]')", "document.querySelector('#readerModeShell [aria-checked=\"true\"]')")
text = text.replace("document.getElementById('readerLanguageInstantDirect')", "document.getElementById('readerModeShell')")
write(path, text)

print('Reading Surface shell migration prepared successfully')
