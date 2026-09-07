const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = 'confucius-knowing-liking-enjoying';

function snapshot(label) {
  const readingLocation = window.MyEssaysReadingLocation?.current?.();
  const pivot = window.MyEssaysReadingPivot?.current?.();
  const content = document.getElementById('readerContent');
  const header = document.querySelector('.reader-v2-header');
  const modeBar = document.querySelector('.reader-mode-bar');
  const intro = content?.querySelector(':scope > .reader-v2-intro');
  const h1 = content?.querySelector(':scope > h1');
  const firstH2 = content?.querySelector(':scope > h2');
  const rect = element => {
    const r = element?.getBoundingClientRect?.();
    return r ? {
      top: Number(r.top.toFixed(3)),
      bottom: Number(r.bottom.toFixed(3)),
      height: Number(r.height.toFixed(3))
    } : null;
  };
  const pivotRect = pivot?.getBoundingClientRect?.();
  const contentRect = content?.getBoundingClientRect?.();
  const headerRect = header?.getBoundingClientRect?.();
  const readingY = Math.max(
    window.innerHeight * 0.28,
    (headerRect?.height || 0) + 24
  );

  return {
    label,
    version: window.MyEssaysReaderVersions?.currentVersion?.() || '',
    scrollY: Number(window.scrollY.toFixed(3)),
    documentHeight: document.documentElement.scrollHeight,
    readingY: Number(readingY.toFixed(3)),
    readingLocationLocator: readingLocation?.locator || '',
    pivotLocator: window.MyEssaysReadingPivot?.locator?.() || pivot?.dataset?.readingLocator || '',
    pivotTop: pivotRect ? Number(pivotRect.top.toFixed(3)) : null,
    pivotPageY: pivotRect ? Number((pivotRect.top + window.scrollY).toFixed(3)) : null,
    contentTop: contentRect ? Number(contentRect.top.toFixed(3)) : null,
    contentPageY: contentRect ? Number((contentRect.top + window.scrollY).toFixed(3)) : null,
    header: rect(header),
    modeBar: rect(modeBar),
    h1: rect(h1),
    intro: rect(intro),
    firstH2: {
      ...rect(firstH2),
      subtitleClass: Boolean(firstH2?.classList?.contains('reader-v2-subtitle')),
      text: firstH2?.textContent?.trim()?.slice(0, 60) || ''
    }
  };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto(`${BASE_URL}/#/essay/${ESSAY_ID}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.reader-language-cycle');
  await page.waitForSelector('#readerContent > .reader-locator-block.is-reading-pivot');

  await page.evaluate(() => {
    window.__pivotGeometryEvents = [];
    const record = type => event => {
      const pivot = window.MyEssaysReadingPivot?.current?.();
      const r = pivot?.getBoundingClientRect?.();
      window.__pivotGeometryEvents.push({
        type,
        at: Number(performance.now().toFixed(1)),
        version: window.MyEssaysReaderVersions?.currentVersion?.() || '',
        scrollY: Number(window.scrollY.toFixed(3)),
        locator: window.MyEssaysReadingPivot?.locator?.() || '',
        pivotTop: r ? Number(r.top.toFixed(3)) : null,
        owner: event?.detail?.positionOwner || '',
        reason: event?.detail?.reason || ''
      });
    };
    window.addEventListener('scroll', record('scroll'), { passive: true });
    document.addEventListener('myessays:reader-version-changed', record('version-changed'));
    document.addEventListener('myessays:reader-language-changed', record('language-changed'));
    document.addEventListener('myessays:reading-pivot-changed', record('pivot-changed'));
    document.addEventListener('myessays:reading-location-changed', record('location-changed'));
  });

  // Match reading-versions-qa.cjs rather than using an arbitrary diagnostic position.
  const scrollDelta = await page.evaluate(() => Math.max(700, document.documentElement.scrollHeight * 0.35));
  await page.mouse.move(640, 400);
  await page.mouse.wheel(0, scrollDelta);
  await page.waitForTimeout(420);

  console.log('PIVOT_GEOMETRY before', JSON.stringify(await page.evaluate(snapshot, 'before')));

  await page.locator('.reader-language-cycle').click();
  await page.waitForFunction(() => window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix');

  for (const [label, wait] of [['immediate', 0], ['40ms', 40], ['80ms', 40], ['120ms', 40], ['180ms', 60], ['300ms', 120], ['450ms', 150], ['700ms', 250]]) {
    if (wait) await page.waitForTimeout(wait);
    console.log(`PIVOT_GEOMETRY ${label}`, JSON.stringify(await page.evaluate(snapshot, label)));
  }

  console.log('PIVOT_GEOMETRY events', JSON.stringify(await page.evaluate(() => window.__pivotGeometryEvents || [])));

  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});
