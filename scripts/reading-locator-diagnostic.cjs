const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

function state({ label, wanted = '' }) {
  const content = document.getElementById('readerContent');
  const pivot = window.MyEssaysReadingPivot?.current?.();
  const reading = window.MyEssaysReadingLocation?.current?.();
  const blocks = [...(content?.querySelectorAll(':scope > .reader-locator-block[data-reading-locator]') || [])]
    .map((block, index) => {
      const rect = block.getBoundingClientRect();
      return {
        index,
        locator: block.dataset.readingLocator || '',
        top: Number(rect.top.toFixed(3)),
        bottom: Number(rect.bottom.toFixed(3)),
        text: (block.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90)
      };
    });
  return {
    label,
    version: window.MyEssaysReaderVersions?.currentVersion?.() || '',
    scrollY: Number(window.scrollY.toFixed(3)),
    wanted,
    pivotLocator: window.MyEssaysReadingPivot?.locator?.() || pivot?.dataset?.readingLocator || '',
    pivotTop: pivot ? Number(pivot.getBoundingClientRect().top.toFixed(3)) : null,
    readingLocator: reading?.locator || '',
    exact: wanted ? blocks.filter(block => block.locator === wanted) : [],
    section4: blocks.filter(block => block.locator.startsWith('4-')),
    section5: blocks.filter(block => block.locator.startsWith('5-'))
  };
}

async function switchTo(page, version) {
  const current = await page.evaluate(() => window.MyEssaysReaderVersions?.currentVersion?.() || 'ja');
  if (current === version) return;
  const button = page.locator(`.reader-language-direct-option[data-reader-version="${version}"]`);
  await button.click();
  await page.waitForFunction(expected => window.MyEssaysReaderVersions?.currentVersion?.() === expected, version);
  await page.waitForFunction(expected => {
    const button = document.querySelector(`.reader-language-direct-option[data-reader-version="${expected}"]`);
    return button?.getAttribute('aria-checked') === 'true';
  }, version);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.reader-language-direct');
  await page.waitForSelector('#readerContent > p.reader-locator-block.is-reading-pivot');

  // Match the deep-position continuity check while allowing the Reading Pivot
  // itself to follow the second-visible-paragraph rule.
  const scrollDelta = await page.evaluate(() => Math.max(700, document.documentElement.scrollHeight * 0.35));
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, scrollDelta);
  await page.waitForTimeout(420);

  const before = await page.evaluate(() => {
    const pivot = window.MyEssaysReadingPivot?.current?.();
    return {
      locator: window.MyEssaysReadingPivot?.locator?.() || '',
      top: pivot?.getBoundingClientRect?.().top ?? null
    };
  });
  console.log('ES_LOCATOR_DIAGNOSTIC JA', JSON.stringify(await page.evaluate(state, { label: 'ja', wanted: before.locator })));

  await switchTo(page, 'en-mix');
  await page.waitForTimeout(320);
  console.log('ES_LOCATOR_DIAGNOSTIC EN', JSON.stringify(await page.evaluate(state, { label: 'en-mix', wanted: before.locator })));

  await switchTo(page, 'es-mix');
  await page.waitForFunction(() => document.querySelector('#readerContent')?.textContent?.includes('Sabemos que es importante'));
  await page.waitForTimeout(320);
  console.log('ES_LOCATOR_DIAGNOSTIC ES', JSON.stringify(await page.evaluate(state, { label: 'es-mix', wanted: before.locator })));

  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});