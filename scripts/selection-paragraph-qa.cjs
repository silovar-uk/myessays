const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ID = 'design-literacy-progressive-disclosure-information-timing';
const TARGET = 'But that creates an obvious tension.';
const PHRASE = 'obvious tension';

async function english(page) {
  await page.waitForSelector('#readerModeShell', { state: 'visible' });
  const button = page.locator('#readerModeShell [data-reading-mode-intent="en-mix"]');
  if ((await button.getAttribute('aria-checked')) !== 'true') await button.click();
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix' && !window.MyEssaysInstantReadingModes?.isTransitioning?.());
}

async function selectPhrase(page, occurrence = 0) {
  return page.evaluate(({ TARGET, PHRASE, occurrence }) => {
    const p = [...document.querySelectorAll('#readerContent p')].find(x => (x.textContent || '').includes(TARGET));
    if (!p) return null;
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
    let node, seen = 0;
    while ((node = walker.nextNode())) {
      let from = 0;
      for (;;) {
        const index = node.data.indexOf(PHRASE, from);
        if (index < 0) break;
        if (seen++ === occurrence) {
          const range = document.createRange();
          range.setStart(node, index);
          range.setEnd(node, index + PHRASE.length);
          const selection = getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
          return { text: p.textContent, pair: p.dataset.readingLocator || p.dataset.pairId || '' };
        }
        from = index + PHRASE.length;
      }
    }
    return null;
  }, { TARGET, PHRASE, occurrence });
}

async function check(page, expected) {
  await page.waitForSelector('#japaneseReferencePanel:not([hidden])');
  const current = await page.locator('.japanese-reference-selected-text').innerText();
  const mark = await page.locator('.japanese-reference-selection-mark').innerText();
  assert.equal(current.trim(), expected.text.trim());
  assert.equal(mark.trim(), PHRASE);
  assert.equal(await page.locator('#japaneseReferencePanel').getAttribute('data-pair-id'), expected.pair);
  assert.ok(current.trim().length > mark.trim().length);
  assert.match(await page.locator('.japanese-reference-text').innerText(), /矛盾/);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${BASE}/#/essay/${ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await english(page);
  let expected = await selectPhrase(page);
  assert.ok(expected);
  await check(page, expected);

  await page.evaluate(({ TARGET, PHRASE }) => {
    const p = [...document.querySelectorAll('#readerContent p')].find(x => (x.textContent || '').includes(TARGET));
    const node = [...p.childNodes].find(x => x.nodeType === Node.TEXT_NODE && x.data.includes(PHRASE));
    if (node) node.data = `${PHRASE} / ${node.data}`;
  }, { TARGET, PHRASE });
  expected = await selectPhrase(page, 1);
  assert.ok(expected);
  await page.waitForFunction(phrase => document.querySelector('.japanese-reference-selection-mark')?.textContent === phrase, PHRASE);
  const before = await page.locator('.japanese-reference-selected-text').evaluate(el => {
    const mark = el.querySelector('mark');
    const range = document.createRange();
    range.selectNodeContents(el);
    range.setEndBefore(mark);
    return range.toString();
  });
  assert.ok(before.includes(PHRASE), 'Range offsets must target the second duplicate occurrence');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('#readerView:not([hidden])');
  await english(page);
  expected = await selectPhrase(page);
  await check(page, expected);
  const box = await page.locator('#japaneseReferencePanel').boundingBox();
  assert.ok(box && box.x >= 0 && box.x + box.width <= 390.5);
  await browser.close();
  console.log('Selection paragraph comparison QA passed');
})().catch(error => { console.error(error); process.exit(1); });
