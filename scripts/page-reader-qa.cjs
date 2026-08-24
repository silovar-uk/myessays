const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.join(__dirname, '..');
const reader = fs.readFileSync(path.join(root, 'tools/page-reader.js'));
const loaderSource = fs.readFileSync(path.join(root, 'tools/page-reader-loader.txt'), 'utf8').trim();
const requests = [];

const article = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>Page Reader QA</title></head><body>
  <header>サイトヘッダー</header>
  <main><article><h1>抽出テスト記事</h1>
    <p>${'本文として残る文章です。'.repeat(30)}</p>
    <h2>次の節</h2>
    <p>${'自動スクロール後も取得できる内容です。'.repeat(30)}</p>
  </article></main><footer>サイトフッター</footer>
</body></html>`;

const server = http.createServer((req, res) => {
  requests.push({ url: req.url, method: req.method, referer: req.headers.referer || '' });
  if (req.url.startsWith('/tools/page-reader.js')) {
    res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store' });
    res.end(reader);
    return;
  }
  if (req.url === '/blocked') {
    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy': "script-src 'none'"
    });
    res.end(article);
    return;
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(article);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;
  const loader = loaderSource.replace(
    'https://silovar-uk.github.io/myessays',
    origin
  ).slice('javascript:'.length);
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await page.goto(`${origin}/article`);
    await page.evaluate(code => window.eval(code), loader);
    await page.waitForSelector('#__page_reader_bookmarklet__');
    await page.waitForFunction(() => {
      const host = document.getElementById('__page_reader_bookmarklet__');
      return host?.shadowRoot?.getElementById('pr-badge')?.textContent === '完了';
    });

    const output = await page.evaluate(() => {
      const host = document.getElementById('__page_reader_bookmarklet__');
      return host.shadowRoot.getElementById('pr-text').value;
    });
    assert.match(output, /抽出テスト記事/);
    assert.match(output, /本文として残る文章です/);
    assert.match(output, /Mode: 本文優先/);

    const scriptRequest = requests.find(item => item.url.startsWith('/tools/page-reader.js'));
    assert.ok(scriptRequest, 'Loader should request the external reader');
    assert.equal(scriptRequest.method, 'GET');
    assert.equal(scriptRequest.referer, '', 'Loader must not disclose the current page URL');

    await page.evaluate(() => {
      const host = document.getElementById('__page_reader_bookmarklet__');
      host.shadowRoot.getElementById('pr-close').click();
    });
    await page.waitForFunction(() => !document.getElementById('__page_reader_bookmarklet__'));

    const blocked = await browser.newPage();
    let dialogMessage = '';
    blocked.on('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });
    await blocked.goto(`${origin}/blocked`);
    await blocked.evaluate(url => {
      const script = document.createElement('script');
      script.src = url;
      script.referrerPolicy = 'no-referrer';
      script.onload = () => script.remove();
      script.onerror = () => {
        script.remove();
        alert('Page Reader: 読み込み失敗（CSPまたは通信制限）');
      };
      (document.head || document.documentElement).appendChild(script);
    }, `${origin}/tools/page-reader.js?v=blocked`);
    await blocked.waitForFunction(() => !document.querySelector('script[src*="page-reader.js"]'));
    assert.match(dialogMessage, /読み込み失敗/);

    console.log('Page Reader browser QA passed');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
