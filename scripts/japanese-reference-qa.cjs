const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'design-literacy-progressive-disclosure-information-timing';
const MIX_TARGET = 'But that creates an obvious tension.';
const EXPECTED_JAPANESE = '矛盾';
const CONTROL = '#readerLanguageInstantDirect';
const modeSelector = version => `${CONTROL} [data-reading-mode-intent="${version}"]`;

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

async function switchMode(page, version) {
  await page.waitForSelector(CONTROL, { state: 'visible' });
  const button = page.locator(modeSelector(version));
  assert.equal(await button.count(), 1, `Reading Mode choice should exist for ${version}`);
  if ((await button.getAttribute('aria-checked')) !== 'true') await button.click();
  await page.waitForFunction(expected => {
    const option = document.querySelector(`#readerLanguageInstantDirect [data-reading-mode-intent="${expected}"]`);
    return window.MyEssaysReaderVersions?.currentVersion?.() === expected
      && window.MyEssaysInstantReadingModes?.desiredVersion?.() === expected
      && !window.MyEssaysInstantReadingModes?.isTransitioning?.()
      && option?.getAttribute('aria-checked') === 'true';
  }, version);
}

async function ensureEnglishMix(page) {
  await switchMode(page, 'en-mix');
  await page.waitForFunction(target => document.querySelector('#readerContent')?.textContent?.includes(target), MIX_TARGET);
}

async function targetParagraph(page) {
  const locator = page.locator('#readerContent p', { hasText: MIX_TARGET }).first();
  assert.ok(await locator.count(), `English Mix should contain regression target: ${MIX_TARGET}`);
  return locator;
}

async function selectTranslatedEnglishParagraph(page) {
  const selected = await page.evaluate(targetText => {
    const paragraphs = Array.from(document.querySelectorAll('#readerContent p'));
    const target = paragraphs.find(paragraph => (paragraph.textContent || '').includes(targetText));
    if (!target) return null;
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
    return target.textContent.trim();
  }, MIX_TARGET);
  assert.ok(selected, `English Mix should contain regression target: ${MIX_TARGET}`);
  return selected;
}

async function assertJapaneseReference(page, expectedSelected) {
  await page.waitForSelector('#japaneseReferencePanel:not([hidden])');
  await page.waitForFunction(expected => {
    const panel = document.querySelector('#japaneseReferencePanel');
    const body = panel?.querySelector('.japanese-reference-text')?.textContent || '';
    const status = panel?.querySelector('.japanese-reference-status')?.textContent || '';
    return body.includes(expected) && !status.includes('特定できません');
  }, EXPECTED_JAPANESE);

  const selectedText = (await page.locator('.japanese-reference-selected-text').innerText()).trim();
  assert.equal(selectedText, expectedSelected, 'comparison panel should preserve the exact English Mix selection');

  const japaneseText = (await page.locator('.japanese-reference-text').innerText()).trim();
  assert.match(japaneseText, /矛盾/, 'translated English Mix paragraph should reveal its Japanese canonical paragraph');
}

async function assertLanguageLens(page) {
  const paragraph = await targetParagraph(page);
  const readingLocator = await paragraph.getAttribute('data-reading-locator');
  assert.ok(readingLocator, 'Language Lens target should carry a canonical Reading Locator');
  await paragraph.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await paragraph.hover();
  await page.waitForSelector('#paragraphLanguagePeek:not([hidden])');
  await page.locator('#paragraphLanguagePeek').click();
  await page.waitForSelector('#languageLensPanel:not([hidden])');
  await page.waitForFunction(expected => {
    const panel = document.querySelector('#languageLensPanel');
    const counterpart = panel?.querySelector('.language-lens-counterpart-copy')?.textContent || '';
    const status = panel?.querySelector('.language-lens-status')?.textContent || '';
    return counterpart.includes(expected) && !status.includes('対応版なし');
  }, EXPECTED_JAPANESE);

  const pair = await page.evaluate(() => ({
    lens: document.querySelector('#languageLensPanel')?.dataset.pairId || '',
    current: Array.from(document.querySelectorAll('#readerContent [data-reading-locator]'))
      .find(el => (el.textContent || '').includes('But that creates an obvious tension.'))?.dataset.readingLocator || ''
  }));
  assert.ok(pair.current, 'translated paragraph should have a canonical Reading Locator');
  assert.equal(pair.lens, pair.current, 'Language Lens must use the same Reading Locator as the paragraph');

  await page.locator('.language-lens-close').click();
  await page.waitForFunction(() => document.querySelector('#languageLensPanel')?.hidden === true);
}

async function assertCrossParagraphSelectionCloses(page) {
  await page.evaluate(() => {
    const paragraphs = Array.from(document.querySelectorAll('#readerContent p')).filter(p => (p.textContent || '').trim());
    const first = paragraphs.find(p => (p.textContent || '').includes('But that creates an obvious tension.'));
    const index = paragraphs.indexOf(first);
    const second = paragraphs[index + 1];
    if (!first || !second) return;
    const range = document.createRange();
    range.setStart(first, 0);
    range.setEnd(second, second.childNodes.length);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
  });
  await page.waitForFunction(() => document.querySelector('#japaneseReferencePanel')?.hidden === true);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await ensureEnglishMix(page);

  // Primary new UX: paragraph-level Language Lens works without text selection.
  await assertLanguageLens(page);

  // Compatibility UX: selecting translated text still reveals canonical Japanese.
  const desktopSelected = await selectTranslatedEnglishParagraph(page);
  await assertJapaneseReference(page, desktopSelected);

  const panelBox = await page.locator('#japaneseReferencePanel').boundingBox();
  const tocBox = await page.locator('#readerAside').boundingBox();
  const modeBox = await page.locator('.reader-mode-bar').boundingBox();
  assert.ok(panelBox, 'Japanese reference panel should be visible on desktop');
  assert.ok(panelBox.x > 1280 / 2, `desktop panel should use the right-side lane: ${JSON.stringify(panelBox)}`);
  if (tocBox) assert.equal(overlaps(panelBox, tocBox), false, 'Japanese reference panel must not cover the Reader Map');
  if (modeBox) assert.equal(overlaps(panelBox, modeBox), false, 'Japanese reference panel must not cover the reading mode control');

  await assertCrossParagraphSelectionCloses(page);
  const desktopSelectedAgain = await selectTranslatedEnglishParagraph(page);
  await assertJapaneseReference(page, desktopSelectedAgain);

  await page.locator('#noteTab').click();
  await page.waitForFunction(() => document.querySelector('#readerView')?.classList.contains('note-is-open'));
  const visibilityWithNote = await page.locator('#japaneseReferencePanel').evaluate(element => getComputedStyle(element).visibility);
  assert.equal(visibilityWithNote, 'hidden', 'Japanese reference should yield to the reading note panel');
  await page.locator('#closeNote').click();

  await switchMode(page, 'ja');
  assert.equal(await page.locator('#japaneseReferencePanel').isHidden(), true, 'switching back to Japanese should close the reference panel');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await ensureEnglishMix(page);
  const mobileSelected = await selectTranslatedEnglishParagraph(page);
  await assertJapaneseReference(page, mobileSelected);

  const mobileBox = await page.locator('#japaneseReferencePanel').boundingBox();
  assert.ok(mobileBox, 'Japanese reference bottom sheet should be visible on mobile');
  assert.ok(mobileBox.x >= 0 && mobileBox.x + mobileBox.width <= 390.5, `bottom sheet overflows horizontally: ${JSON.stringify(mobileBox)}`);
  assert.ok(mobileBox.y >= 0 && mobileBox.y + mobileBox.height <= 844.5, `bottom sheet overflows vertically: ${JSON.stringify(mobileBox)}`);
  assert.ok(mobileBox.y + mobileBox.height <= 790, `bottom sheet should stay above the bottom controls: ${JSON.stringify(mobileBox)}`);

  await page.evaluate(() => {
    const selection = window.getSelection();
    selection?.removeAllRanges();
    document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
  });
  await page.waitForFunction(() => document.querySelector('#japaneseReferencePanel')?.hidden === true);
  const mobileParagraph = await targetParagraph(page);
  await mobileParagraph.click();
  await page.waitForSelector('#paragraphLanguageDock:not([hidden])');
  await page.locator('#paragraphLanguageDock button').click();
  await page.waitForSelector('#languageLensPanel:not([hidden])');
  const lensBox = await page.locator('#languageLensPanel').boundingBox();
  assert.ok(lensBox, 'Language Lens bottom sheet should be visible on mobile');
  assert.ok(lensBox.x >= 0 && lensBox.x + lensBox.width <= 390.5, `Language Lens overflows mobile viewport: ${JSON.stringify(lensBox)}`);

  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  await browser.close();
  console.log('Japanese reference + Language Lens browser QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});