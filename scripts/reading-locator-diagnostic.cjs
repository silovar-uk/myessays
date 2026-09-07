const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

function snapshot(label) {
  const location = window.MyEssaysReadingLocation?.current?.();
  const readingY = Math.max(
    window.innerHeight * 0.28,
    (document.querySelector('.reader-v2-header')?.getBoundingClientRect().height || 0) + 24
  );
  const content = document.getElementById('readerContent');
  const exact = [...(content?.querySelectorAll('[data-reading-locator="5-1"]') || [])].map((el, index) => {
    const r = el.getBoundingClientRect();
    return { index, top: Math.round(r.top), bottom: Math.round(r.bottom), text: el.textContent.trim().slice(0, 60) };
  });
  const actualLocator = location?.locator || '';
  const actual = [...(content?.querySelectorAll(`[data-reading-locator="${actualLocator}"]`) || [])].map((el, index) => {
    const r = el.getBoundingClientRect();
    return { index, top: Math.round(r.top), bottom: Math.round(r.bottom), text: el.textContent.trim().slice(0, 60) };
  });
  const sectionFive = [...(content?.querySelectorAll(':scope > [data-reading-locator^="5-"]') || [])].map(el => {
    const r = el.getBoundingClientRect();
    return { locator: el.dataset.readingLocator, top: Math.round(r.top), bottom: Math.round(r.bottom), text: el.textContent.trim().slice(0, 32) };
  });
  return {
    label,
    version: window.MyEssaysReaderVersions?.currentVersion?.() || '',
    locator: actualLocator,
    scrollY: Math.round(window.scrollY),
    readingY: Math.round(readingY),
    headerHeight: Math.round(document.querySelector('.reader-v2-header')?.getBoundingClientRect().height || 0),
    exact,
    actual,
    sectionFive: sectionFive.slice(0, 30)
  };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.reader-mode-bar');
  await page.evaluate(() => window.scrollTo({ top: Math.max(500, document.documentElement.scrollHeight * 0.42), behavior: 'auto' }));
  await page.waitForTimeout(120);

  console.log('READING_LOCATOR_DIAGNOSTIC before', JSON.stringify(await page.evaluate(snapshot, 'before')));

  await page.locator('[data-reader-mode-version="en-mix"]').click();
  await page.waitForFunction(() => document.querySelector('[data-reader-mode-version="en-mix"]')?.getAttribute('aria-pressed') === 'true');

  console.log('READING_LOCATOR_DIAGNOSTIC immediate', JSON.stringify(await page.evaluate(snapshot, 'immediate')));
  await page.waitForTimeout(80);
  console.log('READING_LOCATOR_DIAGNOSTIC 80ms', JSON.stringify(await page.evaluate(snapshot, '80ms')));
  await page.waitForTimeout(100);
  console.log('READING_LOCATOR_DIAGNOSTIC 180ms', JSON.stringify(await page.evaluate(snapshot, '180ms')));

  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});
