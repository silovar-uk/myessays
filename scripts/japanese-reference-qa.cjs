const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'design-literacy-progressive-disclosure-information-timing';

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

async function selectEnglishParagraph(page) {
  const selected = await page.evaluate(() => {
    const paragraphs = Array.from(document.querySelectorAll('#readerContent p'));
    const target = paragraphs.find(paragraph => {
      const text = (paragraph.textContent || '').trim();
      const latin = (text.match(/[A-Za-z]/g) || []).length;
      const japanese = (text.match(/[\u3040-\u30ff\u3400-\u9fff]/g) || []).length;
      return text.length >= 24 && text.length <= 420 && latin >= 18 && latin > japanese;
    });
    if (!target) return null;
    const range = document.createRange();
    range.selectNodeContents(target);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
    return target.textContent.trim();
  });
  assert.ok(selected, 'English Mix should contain a selectable English-heavy paragraph');
  return selected;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(String(error)));

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await ensureEnglishMix(page);
  await selectEnglishParagraph(page);

  await page.waitForSelector('#japaneseReferencePanel:not([hidden])');
  await page.waitForFunction(() => {
    const panel = document.querySelector('#japaneseReferencePanel');
    const body = panel?.querySelector('.japanese-reference-text')?.textContent || '';
    const status = panel?.querySelector('.japanese-reference-status')?.textContent || '';
    return /[\u3040-\u30ff\u3400-\u9fff]/.test(body) && !status.includes('特定できません');
  });

  const japaneseText = (await page.locator('.japanese-reference-text').innerText()).trim();
  assert.match(japaneseText, /[\u3040-\u30ff\u3400-\u9fff]/, 'selected English Mix paragraph should reveal Japanese text');

  const panelBox = await page.locator('#japaneseReferencePanel').boundingBox();
  const tocBox = await page.locator('#readerAside').boundingBox();
  assert.ok(panelBox, 'Japanese reference panel should be visible on desktop');
  assert.ok(panelBox.x > 1280 / 2, `desktop panel should use the right-side lane: ${JSON.stringify(panelBox)}`);
  if (tocBox) assert.equal(overlaps(panelBox, tocBox), false, 'Japanese reference panel must not cover the reader TOC');

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
  await selectEnglishParagraph(page);
  await page.waitForSelector('#japaneseReferencePanel:not([hidden])');
  await page.waitForFunction(() => /[\u3040-\u30ff\u3400-\u9fff]/.test(document.querySelector('.japanese-reference-text')?.textContent || ''));

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
