const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'design-literacy-progressive-disclosure-information-timing';
const MIX_TARGET = 'But that creates an obvious tension.';
const EXPECTED_JAPANESE = '矛盾';

function overlaps(a, b) {
  if (!a || !b) return false;
  return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
}

async function ensureEnglishMix(page) {
  await page.waitForSelector('#readerLanguageSwitch:not([hidden])');
  const current = (await page.locator('.reader-language-current').innerText()).trim();
  if (current === 'EN MIX') return;
  await page.locator('.reader-language-trigger').click();
  await page.waitForSelector('#readerLanguageMenu:not([hidden])');
  await page.locator('[data-reader-version="en-mix"]').click();
  await page.waitForFunction(() => document.querySelector('.reader-language-current')?.textContent?.trim() === 'EN MIX');
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
  const desktopSelected = await selectTranslatedEnglishParagraph(page);
  await assertJapaneseReference(page, desktopSelected);

  const panelBox = await page.locator('#japaneseReferencePanel').boundingBox();
  const tocBox = await page.locator('#readerAside').boundingBox();
  assert.ok(panelBox, 'Japanese reference panel should be visible on desktop');
  assert.ok(panelBox.x > 1280 / 2, `desktop panel should use the right-side lane: ${JSON.stringify(panelBox)}`);
  if (tocBox) assert.equal(overlaps(panelBox, tocBox), false, 'Japanese reference panel must not cover the reader TOC');

  await assertCrossParagraphSelectionCloses(page);
  const desktopSelectedAgain = await selectTranslatedEnglishParagraph(page);
  await assertJapaneseReference(page, desktopSelectedAgain);

  await page.locator('#noteTab').click();
  await page.waitForFunction(() => document.querySelector('#readerView')?.classList.contains('note-is-open'));
  const visibilityWithNote = await page.locator('#japaneseReferencePanel').evaluate(element => getComputedStyle(element).visibility);
  assert.equal(visibilityWithNote, 'hidden', 'Japanese reference should yield to the reading note panel');
  await page.locator('#closeNote').click();

  const trigger = page.locator('.reader-language-trigger');
  await trigger.click();
  await page.waitForSelector('#readerLanguageMenu:not([hidden])');
  await page.locator('[data-reader-version="ja"]').click();
  await page.waitForFunction(() => document.querySelector('.reader-language-current')?.textContent?.trim() === 'JA');
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
  assert.ok(mobileBox.y + mobileBox.height <= 790, `bottom sheet should stay above the selection controls: ${JSON.stringify(mobileBox)}`);

  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join(' | ')}`);
  await browser.close();
  console.log('Japanese reference browser QA passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
