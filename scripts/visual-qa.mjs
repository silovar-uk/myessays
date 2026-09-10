import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = process.env.ESSAY_ID || 'utsunomiya-takasaki-shonan-shinjuku-ueno-tokyo';
const TITLE = '湘南新宿ラインと上野東京ラインが混ざる理由';
const MIX_SENTINEL = 'These four names are easy to mix up.';
const OUTPUT_DIR = 'qa-artifacts';
const CONTROL = '#readerLanguageInstantDirect';
const modeSelector = version => `${CONTROL} [data-reading-mode-intent="${version}"]`;

await mkdir(OUTPUT_DIR, { recursive: true });

const report = {
  baseUrl: BASE_URL,
  essayId: ESSAY_ID,
  title: TITLE,
  startedAt: new Date().toISOString(),
  viewports: [],
  errors: []
};

const configs = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

const browser = await chromium.launch({ headless: true });

try {
  for (const config of configs) {
    const page = await browser.newPage({
      viewport: { width: config.width, height: config.height },
      deviceScaleFactor: 1
    });

    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', error => pageErrors.push(error.message));

    const url = `${BASE_URL}/#/essay/${encodeURIComponent(ESSAY_ID)}`;
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });

    if (!response || !response.ok()) {
      throw new Error(`${config.name}: page load failed (${response?.status() ?? 'no response'})`);
    }

    await page.waitForSelector('#readerView:not([hidden])', { timeout: 15_000 });
    await page.waitForFunction(
      expected => document.querySelector('#readerContent')?.textContent?.includes(expected),
      TITLE,
      { timeout: 15_000 }
    );
    await page.waitForSelector(CONTROL, { state: 'visible', timeout: 15_000 });

    const jaState = await page.evaluate(() => {
      const reader = document.querySelector('#readerContent');
      const control = document.querySelector('#readerLanguageInstantDirect');
      const legacy = document.querySelector('#readerLanguageSwitch');
      const jaButton = control?.querySelector('[data-reading-mode-intent="ja"]');
      const mixButton = control?.querySelector('[data-reading-mode-intent="en-mix"]');
      return {
        title: document.title,
        readerVisible: Boolean(reader && reader.textContent.trim().length > 0),
        controlCount: document.querySelectorAll('#readerLanguageInstantDirect').length,
        controlVisible: Boolean(control && !control.hidden && getComputedStyle(control).display !== 'none'),
        legacyVisible: Boolean(legacy && !legacy.hidden && getComputedStyle(legacy).display !== 'none'),
        jaSelected: jaButton?.getAttribute('aria-checked') === 'true',
        mixAvailable: Boolean(mixButton && !mixButton.disabled),
        currentVersion: window.MyEssaysReaderVersions?.currentVersion?.() || '',
        desiredVersion: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      };
    });

    if (!jaState.readerVisible) throw new Error(`${config.name}: reader content is empty`);
    if (jaState.controlCount !== 1 || !jaState.controlVisible) throw new Error(`${config.name}: persistent Reading Mode control is not uniquely visible`);
    if (jaState.legacyVisible) throw new Error(`${config.name}: legacy language disclosure should remain hidden`);
    if (!jaState.jaSelected || jaState.currentVersion !== 'ja' || jaState.desiredVersion !== 'ja') {
      throw new Error(`${config.name}: Japanese Reading Mode did not start settled`);
    }
    if (!jaState.mixAvailable) throw new Error(`${config.name}: English Mix option is unavailable`);
    if (jaState.horizontalOverflow) {
      throw new Error(`${config.name}: horizontal overflow (${jaState.scrollWidth}px > ${jaState.innerWidth}px)`);
    }

    await page.screenshot({
      path: `${OUTPUT_DIR}/${config.name}-ja.png`,
      fullPage: true
    });

    const mixButton = page.locator(modeSelector('en-mix'));
    if (await mixButton.count() !== 1) throw new Error(`${config.name}: persistent English Mix option should exist exactly once`);
    await mixButton.click();
    await page.waitForFunction(expected => {
      const option = document.querySelector('#readerLanguageInstantDirect [data-reading-mode-intent="en-mix"]');
      return window.MyEssaysReaderVersions?.currentVersion?.() === 'en-mix'
        && window.MyEssaysInstantReadingModes?.desiredVersion?.() === 'en-mix'
        && !window.MyEssaysInstantReadingModes?.isTransitioning?.()
        && option?.getAttribute('aria-checked') === 'true'
        && document.querySelector('#readerContent')?.textContent?.includes(expected);
    }, MIX_SENTINEL, { timeout: 15_000 });

    const mixState = await page.evaluate(() => {
      const control = document.querySelector('#readerLanguageInstantDirect');
      const mixButton = control?.querySelector('[data-reading-mode-intent="en-mix"]');
      const legacy = document.querySelector('#readerLanguageSwitch');
      return {
        mixSelected: mixButton?.getAttribute('aria-checked') === 'true',
        currentVersion: window.MyEssaysReaderVersions?.currentVersion?.() || '',
        desiredVersion: window.MyEssaysInstantReadingModes?.desiredVersion?.() || '',
        transitioning: Boolean(window.MyEssaysInstantReadingModes?.isTransitioning?.()),
        legacyVisible: Boolean(legacy && !legacy.hidden && getComputedStyle(legacy).display !== 'none'),
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      };
    });

    if (!mixState.mixSelected || mixState.currentVersion !== 'en-mix' || mixState.desiredVersion !== 'en-mix' || mixState.transitioning) {
      throw new Error(`${config.name}: English Mix did not settle through the persistent control`);
    }
    if (mixState.legacyVisible) throw new Error(`${config.name}: legacy language disclosure became visible after selection`);
    if (mixState.horizontalOverflow) {
      throw new Error(`${config.name} mix: horizontal overflow (${mixState.scrollWidth}px > ${mixState.innerWidth}px)`);
    }

    await page.screenshot({
      path: `${OUTPUT_DIR}/${config.name}-mix.png`,
      fullPage: true
    });

    const filteredConsoleErrors = consoleErrors.filter(message =>
      !/favicon|Failed to load resource.*404/i.test(message)
    );

    if (pageErrors.length) {
      throw new Error(`${config.name}: page errors: ${pageErrors.join(' | ')}`);
    }
    if (filteredConsoleErrors.length) {
      throw new Error(`${config.name}: console errors: ${filteredConsoleErrors.join(' | ')}`);
    }

    report.viewports.push({
      ...config,
      url,
      japanese: jaState,
      englishMix: mixState,
      consoleErrors: filteredConsoleErrors,
      pageErrors,
      status: 'passed'
    });

    await page.close();
  }
} catch (error) {
  report.errors.push(error instanceof Error ? error.message : String(error));
  console.error(error);
} finally {
  report.finishedAt = new Date().toISOString();
  report.status = report.errors.length ? 'failed' : 'passed';
  await writeFile(`${OUTPUT_DIR}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}

if (report.errors.length) process.exit(1);
console.log(JSON.stringify(report, null, 2));