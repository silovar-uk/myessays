const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4173';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });

    const xhtml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<!doctype html>',
      '<html><head>',
      '<meta charset="UTF-8">',
      '<meta name="DC.Title" content="RSVPテスト作品">',
      '<meta name="DC.Creator" content="青空テスト">',
      '<title>RSVPテスト作品</title>',
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

    await page.setInputFiles('#aozoraFileInput', {
      name: 'aozora-test.xhtml',
      mimeType: 'application/xhtml+xml',
      buffer: Buffer.from(xhtml, 'utf8')
    });

    await page.waitForURL(/#\/book\//);
    await page.locator('#readerView:not([hidden])').waitFor();
    await page.locator('#readerContent[data-reader-source="aozora"]').waitFor();

    assert.match(await page.title(), /RSVPテスト作品/);
    assert.equal((await page.locator('#readerContent ruby rt').first().textContent()).trim(), 'ほうこう');
    assert.equal(await page.evaluate(() => window.__aozoraXss), undefined);

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

    await page.goto(BASE_URL + '/#/', { waitUntil: 'networkidle' });
    await page.locator('#aozoraBookList').getByText('RSVPテスト作品').waitFor();

    console.log('Aozora reader QA passed.');
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exit(1);
});