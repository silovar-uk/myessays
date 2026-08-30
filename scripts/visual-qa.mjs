import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const ESSAY_ID = process.env.ESSAY_ID || 'utsunomiya-takasaki-shonan-shinjuku-ueno-tokyo';
const TITLE = '湘南新宿ラインと上野東京ラインが混ざる理由';
const MIX_SENTINEL = 'These four names are easy to mix up.';
const OUTPUT_DIR = 'qa-artifacts';

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
    await page.waitForSelector('#readerLanguageSwitch:not([hidden])', { timeout: 15_000 });

    const trigger = page.locator('.reader-language-trigger');
    const menu = page.locator('#readerLanguageMenu');

    const jaState = await page.evaluate(() => {
      const reader = document.querySelector('#readerContent');
      const switcher = document.querySelector('#readerLanguageSwitch');
      const trigger = document.querySelector('.reader-language-trigger');
      const mixButton = document.querySelector('[data-reader-version="en-mix"]');
      return {
        title: document.title,
        readerVisible: Boolean(reader && reader.textContent.trim().length > 0),
        switchVisible: Boolean(switcher && !switcher.hidden),
        disclosureExpanded: trigger?.getAttribute('aria-expanded') === 'true',
        mixAvailable: Boolean(mixButton && !mixButton.disabled),
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      };
    });

    if (!jaState.readerVisible) throw new Error(`${config.name}: reader content is empty`);
    if (!jaState.switchVisible) throw new Error(`${config.name}: reading version switch is not visible`);
    if (jaState.disclosureExpanded) throw new Error(`${config.name}: language disclosure should start collapsed`);
    if (!jaState.mixAvailable) throw new Error(`${config.name}: English Mix option is unavailable`);
    if (jaState.horizontalOverflow) {
      throw new Error(`${config.name}: horizontal overflow (${jaState.scrollWidth}px > ${jaState.innerWidth}px)`);
    }

    await page.screenshot({
      path: `${OUTPUT_DIR}/${config.name}-ja.png`,
      fullPage: true
    });

    await trigger.click();
    await page.waitForSelector('#readerLanguageMenu:not([hidden])', { timeout: 5_000 });
    await page.locator('[data-reader-version="en-mix"]').click();
    await page.waitForFunction(
      expected => document.querySelector('#readerContent')?.textContent?.includes(expected),
      MIX_SENTINEL,
      { timeout: 15_000 }
    );
    await page.waitForFunction(() => document.querySelector('.reader-language-trigger')?.getAttribute('aria-expanded') === 'false');

    const mixState = await page.evaluate(() => {
      const mixButton = document.querySelector('[data-reader-version="en-mix"]');
      const current = document.querySelector('.reader-language-current')?.textContent?.trim();
      return {
        mixSelected: mixButton?.getAttribute('aria-checked') === 'true',
        currentBadge: current,
        horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      };
    });

    if (!mixState.mixSelected) throw new Error(`${config.name}: English Mix did not become active`);
    if (mixState.currentBadge !== 'EN MIX') throw new Error(`${config.name}: language chip did not update to EN MIX`);
    if (mixState.horizontalOverflow) {
      throw new Error(`${config.name} mix: horizontal overflow (${mixState.scrollWidth}px > ${mixState.innerWidth}px)`);
    }

    if (!await menu.isHidden()) throw new Error(`${config.name}: language disclosure stayed open after selection`);

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