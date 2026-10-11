const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const sample = 'chinese-theme-park-npc-from-background-to-fandom';
const next = 'new-venture-four-logics-theory-vs-test-2026';
const noMap = 'value-chain-competitive-advantage';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];

  async function open(page, id) {
    await page.goto(base + '/#/essay/' + id, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('#readerView:not([hidden])', { timeout: 60000 });
    await page.waitForSelector('.reader-v2-map-nav', { state: 'attached', timeout: 30000 });
  }

  for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 1280, height: 800 }]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await open(page, sample);
    const shortcut = page.locator('.reader-concept-shortcut');
    await shortcut.waitFor({ state: 'visible' });
    await shortcut.click();
    await page.locator('.reader-concept-node').first().waitFor({ state: 'visible', timeout: 20000 });
    assert.equal(await page.locator('.reader-concept-node').count(), 7, 'Seven nodes must appear');

    const display = await page.evaluate(() => {
      const stage = document.querySelector('.reader-concept-stage');
      const panel = document.querySelector('.reader-concept-panel');
      const nodes = [...document.querySelectorAll('.reader-concept-node')];
      const rect = stage.getBoundingClientRect();
      return {
        windowWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflowingPanel: panel.scrollWidth > panel.clientWidth + 1,
        nodesInStage: nodes.every(node => {
          const nodeRect = node.getBoundingClientRect();
          return nodeRect.left >= rect.left - 2 && nodeRect.right <= rect.right + 2 &&
            nodeRect.top >= rect.top - 2 && nodeRect.bottom <= rect.bottom + 2;
        }),
        buttonSizes: nodes.map(node => node.getBoundingClientRect().height),
        sheetHeight: document.querySelector('.reader-v2-map').getBoundingClientRect().height
      };
    });
    assert.equal(display.overflowingPanel, false, 'Concept map should not overflow horizontally');
    assert.equal(display.nodesInStage, true, 'All nodes should fit the diagram');
    assert.ok(display.buttonSizes.every(height => height >= 43.5), 'Nodes must have 44px touch height');
    assert.ok(display.sheetHeight <= viewport.height + 1, 'Sheet must fit viewport height');

    await page.locator('.reader-concept-node').nth(2).click();
    assert.ok((await page.locator('.reader-concept-description').textContent()).trim().length > 10);
    assert.ok(await page.locator('.reader-concept-relation').count() >= 1);
    await page.getByRole('button', { name: '流れで見る' }).click();
    assert.equal(await page.locator('.reader-concept-flow-item').count(), 7);
    await page.getByRole('button', { name: '関係図' }).click();
    assert.equal(await page.locator('.reader-concept-node').count(), 7);
    await page.locator('.reader-concept-go').click();
    if (viewport.width <= 820) {
      assert.equal(await page.locator('#readerAside').evaluate(node => node.classList.contains('is-open')), false);
    }
    await page.waitForTimeout(350);
    const scrollY = await page.evaluate(() => window.scrollY);
    assert.ok(scrollY > 50, 'Jump from node should move to its section: ' + scrollY);

    if (viewport.width <= 820) {
      await page.locator('.reader-v2-map-toggle').click();
    }
    await page.locator('.reader-concept-tabs button[data-view="contents"]').click();
    assert.equal(await page.locator('.reader-v2-map-nav').isVisible(), true);
    await page.locator('.reader-concept-tabs button[data-view="relations"]').click();
    await page.locator('.reader-concept-node').first().waitFor({ state: 'visible' });

    await open(page, next);
    await page.locator('.reader-concept-shortcut').click();
    await page.locator('.reader-concept-node').first().waitFor({ state: 'visible', timeout: 20000 });
    assert.equal(await page.locator('.reader-concept-node').count(), 7);

    await open(page, noMap);
    assert.equal(await page.locator('.reader-concept-tabs').count(), 0);
    assert.equal(await page.locator('.reader-concept-shortcut').count(), 0);
    await context.close();
    console.log('Concept map QA passed at ' + viewport.width + 'x' + viewport.height);
  }

  assert.deepEqual(errors, [], 'No uncaught browser errors');
  await browser.close();
})().catch(error => {
  console.error(error);
  process.exit(1);
});