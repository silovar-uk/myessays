const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const PROXY = 'https://aozora-fetch.silovar-uk.workers.dev/v1/fetch';
const CARD_URL = 'https://www.aozora.gr.jp/cards/000001/card1.html';
const XHTML_URL = 'https://www.aozora.gr.jp/cards/000001/files/1_1.html';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const card = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!doctype html>',
    '<html><head><meta charset="UTF-8"><title>図書カード</title></head><body>',
    '<table><tr><td>XHTMLファイル</td><td><a href="./files/1_1.html">いますぐXHTML版で読む</a></td></tr></table>',
    '</body></html>'
  ].join('');

  const xhtml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!doctype html>',
    '<html><head>',
    '<meta charset="UTF-8">',
    '<meta name="DC.Title" content="URL取込テスト作品">',
    '<meta name="DC.Creator" content="青空テスト">',
    '<title>URL取込テスト作品</title>',
    '</head><body>',
    '<div class="main_text">',
    '<h3>第一章</h3>',
    '<p><ruby><rb>彷徨</rb><rp>（</rp><rt>ほうこう</rt><rp>）</rp></ruby>する。静かな夜だった。</p>',
    '<script>window.__aozoraXss = true;</script>',
    '<p>次の段落。</p>',
    '</div>',
    '<div class="bibliographical_information">底本：テスト</div>',
    '</body></html>'
  ].join('');

  await page.route(PROXY + '**', async route => {
    const requestUrl = new URL(route.request().url());
    const target = requestUrl.searchParams.get('url');
    if (target === CARD_URL) {
      await route.fulfill({ status: 200, contentType: 'application/octet-stream', body: Buffer.from(card), headers: { 'X-Aozora-Source': CARD_URL } });
      return;
    }
    if (target === XHTML_URL) {
      await route.fulfill({ status: 200, contentType: 'application/octet-stream', body: Buffer.from(xhtml), headers: { 'X-Aozora-Source': XHTML_URL } });
      return;
    }
    await route.fulfill({ status: 403, contentType: 'application/json', body: JSON.stringify({ error: 'UNSUPPORTED_URL' }) });
  });

  try {
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });

    await page.locator('#aozoraImportButton').click();
    await page.locator('#aozoraImportDialog[open]').waitFor();
    await page.locator('#aozoraUrlInput').fill(CARD_URL);
    await page.locator('#aozoraUrlSubmit').click();

    await page.waitForURL(/#\/book\//);
    const firstBookUrl = page.url();
    const bookId = decodeURIComponent(new URL(firstBookUrl).hash.match(/^#\/book\/(.+)$/)[1]);

    await page.locator('#readerView:not([hidden])').waitFor();
    await page.locator('#readerContent[data-reader-source="aozora"]').waitFor();

    assert.match(await page.title(), /URL取込テスト作品/);
    assert.equal((await page.locator('#readerContent ruby rt').first().textContent()).trim(), 'ほうこう');
    assert.equal(await page.evaluate(() => window.__aozoraXss), undefined);
    assert.equal(await page.locator('.reader-v2-info-source a', { hasText: '図書カード' }).getAttribute('href'), CARD_URL);
    assert.equal(await page.locator('.reader-v2-info-source a', { hasText: '原文' }).getAttribute('href'), XHTML_URL);

    await page.locator('.reader-rsvp-intro').waitFor();
    await page.locator('.reader-rsvp-intro').click();
    await page.locator('#rsvpStage[open]').waitFor();
    await page.waitForFunction(() => window.MyEssaysRsvp?.items?.().some(item => item.text?.includes('彷徨')));
    const rubyIndex = await page.evaluate(() => window.MyEssaysRsvp.items().findIndex(item => item.text?.includes('彷徨')));
    assert.ok(rubyIndex >= 0);
    await page.evaluate(index => window.MyEssaysRsvp.seek(index), rubyIndex);
    await page.waitForFunction(() => window.MyEssaysRsvp?.state?.().text?.includes('彷徨'));
    await page.keyboard.press('Space');
    await page.locator('.rsvp-chunk-reading').waitFor();
    assert.equal((await page.locator('.rsvp-chunk-reading').textContent()).trim(), 'ほうこう');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !window.MyEssaysRsvp?.state?.().open);

    await page.evaluate(id => {
      localStorage.setItem('myessays:reading-state:' + id, JSON.stringify({
        lastProgressRatio: 0.42,
        sentinel: 'keep-progress'
      }));
    }, bookId);

    await page.goto(BASE_URL + '/#/', { waitUntil: 'networkidle' });
    await page.locator('#aozoraImportButton').click();
    await page.locator('#aozoraUrlInput').fill(CARD_URL);
    await page.locator('#aozoraUrlSubmit').click();
    await page.waitForURL(/#\/book\//);

    assert.equal(page.url(), firstBookUrl);
    const preserved = await page.evaluate(id => JSON.parse(localStorage.getItem('myessays:reading-state:' + id) || '{}'), bookId);
    assert.equal(preserved.sentinel, 'keep-progress');
    assert.equal(preserved.lastProgressRatio, 0.42);

    await page.goto(BASE_URL + '/#/', { waitUntil: 'networkidle' });
    await page.locator('#aozoraBookList').getByText('URL取込テスト作品').waitFor();
    assert.equal(await page.locator('#aozoraBookList .books-row').count(), 1);

    console.log('Aozora URL reader QA passed.');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exit(1);
});