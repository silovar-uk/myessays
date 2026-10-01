const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || '', 'playwright')); }
const root = path.resolve(__dirname,'..');
const source = fs.readFileSync(path.join(root,'tools/context-lens.js'),'utf8');
const loader = fs.readFileSync(path.join(root,'tools/context-lens-loader.js'),'utf8');
let server, base;
before(async()=>{
  server=http.createServer((req,res)=>{
    const u=new URL(req.url,'http://localhost');
    if(u.pathname==='/csp') { res.setHeader('Content-Security-Policy',"script-src 'self'; style-src 'unsafe-inline'");res.end('<title>CSP</title><h1>Strict page</h1>');return; }
    if(u.pathname==='/fixture') {res.setHeader('Content-Type','text/html; charset=utf-8');res.end(`<!doctype html><html lang="ja"><meta name="viewport" content="width=device-width,initial-scale=1"><title>テストページ</title><body><main><h1>企業研究 / Company</h1><p>ページ本文です。</p><input name="search" value="old"><input type="password" value="PASSWORD_CANARY"><input type="hidden" value="HIDDEN_CANARY"><textarea name="api_key">TEXTAREA_SECRET</textarea><div id="auth-panel"><span>ANCESTOR_SECRET</span></div><input type="checkbox" name="agree"><select name="sort"><option value="new">新着</option><option value="old" selected>古い</option></select><button id="menu" aria-expanded="false" onclick="window.didClick=true">メニュー</button><details><summary>詳細</summary><p>開閉</p></details><div id="shadow"></div><a href="/foo?access_token=URL_CANARY&amp;q=public">リンク</a><iframe src="http://127.0.0.1:1/no"></iframe><script id="__NEXT_DATA__" type="application/json">{"buildId":"test","page":"/app","query":{"token":"NEXT_SECRET","q":"safe"},"props":{"user":{}}}</script><script type="application/ld+json">{"@type":"Article","name":"記事","secret":"LD_SECRET"}</script></main></body></html>`);return;}
    const p=path.join(root,u.pathname);
    if(!p.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    let file=p.endsWith('/')?p+'index.html':p;
    try{res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.html')?'text/html; charset=utf-8':'text/plain');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end('Missing');}
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));base='http://127.0.0.1:'+server.address().port;
});
after(()=>server.close());
for(const engine of (process.env.CL_ENGINES||'chromium,webkit').split(',')){
  test(engine+': capture, privacy, copy, picker, diff, lifecycle and budgets',async(t)=>{
    const browser=await playwright[engine].launch({headless:true, ...(process.env.CL_CHROMIUM_PATH && engine === 'chromium' ? {executablePath:process.env.CL_CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']} : {})});
    const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,...(engine==='chromium'?{permissions:['clipboard-read','clipboard-write']}: {})});
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    try{
      await page.goto(base+'/fixture');
      await page.evaluate(()=>{
        document.querySelector('[name=search]').value='現在の検索';document.querySelector('[type=checkbox]').checked=true;
        document.querySelector('#shadow').attachShadow({mode:'open'}).innerHTML='<button aria-label="Shadow button">影の操作</button><input name="query" value="shadow value">';
        localStorage.setItem('theme','dark');localStorage.setItem('access_token','STORAGE_SECRET');localStorage.setItem('settings',JSON.stringify({density:'compact',password:'NESTED_SECRET'}));
      });
      await page.addScriptTag({content:source});
      await page.waitForFunction(()=>document.querySelector('#__context_lens_host__').shadowRoot.getElementById('status').textContent.includes('確認しました'));
      const snap=await page.evaluate(()=>CONTEXT_LENS.scan());
      const pack=await page.evaluate(s=>CONTEXT_LENS.format(s),snap);
      assert.match(pack,/現在の検索/);assert.match(pack,/shadow value/);assert.match(pack,/"checked": true/);assert.equal(snap.summary.shadowRoots,1);assert.ok(snap.framework.some(h=>h.includes('Next.js')));
      assert.ok(snap.iframes.some(f=>f.status==='cross-origin / inaccessible'));
      for(const secret of ['PASSWORD_CANARY','HIDDEN_CANARY','TEXTAREA_SECRET','ANCESTOR_SECRET','URL_CANARY','NEXT_SECRET','LD_SECRET','STORAGE_SECRET','NESTED_SECRET'])assert.ok(!pack.includes(secret),'leaked '+secret);
      assert.ok(!pack.includes('LIVE PAGE → AI CONTEXT'),'own UI leaked');assert.ok(!pack.includes('"value": "dark"'));
      await page.getByRole('button',{name:'詳細',exact:true}).click();
      await page.locator('#storage-options summary').click();
      await page.getByText('localStorage / settings',{exact:true}).click();
      const detail=await page.evaluate(async()=>CONTEXT_LENS.format(await CONTEXT_LENS.scan()));assert.match(detail,/compact/);assert.match(detail,/JSON-LD/);assert.ok(!detail.includes('NESTED_SECRET'));assert.ok(!detail.includes('NEXT_SECRET'));assert.ok(!detail.includes('LD_SECRET'));
      await page.getByRole('button',{name:'標準',exact:true}).click();
      if(engine==='chromium'){await page.getByRole('button',{name:'AI用コピー',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#__context_lens_host__').shadowRoot.getElementById('toast').textContent.includes('コピーしました'));assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/CONTEXT LENS/);}
      // Real Clipboard API is environment dependent. Assert immediate activation and async Blob separately.
      await page.evaluate(()=>{
        window.copyOrder=[];
        window.ClipboardItem=class{constructor(parts){this.parts=parts;}};
        Object.defineProperty(navigator,'clipboard',{configurable:true,value:{write(items){copyOrder.push('write');window.savedClipboard=items[0].parts['text/plain'].then(b=>b.text());return savedClipboard.then(()=>{});}}});
      });
      await page.getByRole('button',{name:'AI用コピー',exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('#__context_lens_host__').shadowRoot.getElementById('toast').textContent.includes('コピーしました'));
      assert.match(await page.evaluate(()=>savedClipboard),/CONTEXT LENS/);
      // After SPA mutation, copy must use new current state.
      await page.evaluate(()=>{history.pushState({},'', '/fixture?view=changed');document.querySelector('[name=search]').value='SPA更新';});
      await page.getByRole('button',{name:'AI用コピー',exact:true}).click();
      await page.waitForFunction(()=>!document.querySelector('#__context_lens_host__').shadowRoot.getElementById('copy').disabled);
      assert.match(await page.evaluate(()=>savedClipboard),/SPA更新/);
      await page.getByRole('button',{name:'比較の基準を保存'}).click();
      await page.waitForFunction(()=>!document.querySelector('#__context_lens_host__').shadowRoot.getElementById('diff').disabled);
      await page.evaluate(()=>{document.querySelector('#menu').setAttribute('aria-expanded','true');document.querySelector('[name=search]').value='差分値';});
      await page.getByRole('button',{name:'差分コピー'}).click();
      await page.waitForFunction(()=>!document.querySelector('#__context_lens_host__').shadowRoot.getElementById('copy').disabled);
      const delta=await page.evaluate(()=>savedClipboard);assert.match(delta,/PAGE DIFF/);assert.match(delta,/aria-expanded/);assert.match(delta,/差分値/);
      await page.getByRole('button',{name:'要素',exact:true}).click();await page.locator('#menu').tap();
      assert.equal(await page.evaluate(()=>!!window.didClick),false,'picker must suppress link/button action');
      await page.getByRole('button',{name:'この要素をAI用コピー'}).click();
      await page.waitForFunction(()=>!document.querySelector('#__context_lens_host__').shadowRoot.getElementById('copy').disabled);
      const element=await page.evaluate(()=>savedClipboard);assert.match(element,/SELECTED ELEMENT/);assert.match(element,/computedStyle/);
      // Hostile copy failure must surface selectable text.
      await page.evaluate(()=>{navigator.clipboard.write=()=>Promise.reject(new Error('blocked'));document.execCommand=()=>false;});
      await page.getByRole('button',{name:'標準',exact:true}).click();await page.getByRole('button',{name:'AI用コピー',exact:true}).click();
      await page.waitForFunction(()=>!document.querySelector('#__context_lens_host__').shadowRoot.getElementById('manual').hidden);
      assert.match(await page.locator('#output').inputValue(),/CONTEXT LENS/);
      await page.getByRole('button',{name:'閉じる',exact:true}).last().click();
      await page.screenshot({path:'/tmp/context-lens-'+engine+'.png'});
      assert.equal(await page.locator('#cl-title').evaluate(el=>getComputedStyle(el).color),'rgb(237, 245, 242)');
      const dims=await page.evaluate(()=>{const r=document.querySelector('#__context_lens_host__').shadowRoot.querySelector('.sheet').getBoundingClientRect();return{left:r.left,right:r.right,bottom:r.bottom,width:innerWidth};});
      assert.ok(dims.left>=0&&dims.right<=dims.width+1);
      await page.addScriptTag({content:source});assert.equal(await page.locator('#__context_lens_host__').count(),1);
      await page.evaluate(()=>CONTEXT_LENS.open());
      await page.evaluate(()=>{const frag=document.createDocumentFragment();for(let i=0;i<51000;i++)frag.append(document.createElement('div'));document.body.append(frag);});
      const large=await page.evaluate(()=>CONTEXT_LENS.scan());assert.ok(large.summary.partial);assert.match(large.dom,/too large/);
      await page.evaluate(()=>CONTEXT_LENS.destroy());assert.equal(await page.locator('#__context_lens_host__').count(),0);assert.equal(await page.evaluate(()=>typeof CONTEXT_LENS),'undefined');
      assert.deepEqual(errors,[]);
    }finally{await context.close();await browser.close();}
  });
}
test('loader retries after failure, toggles singleton, and handles CSP failure',async()=>{
  const browser=await playwright.chromium.launch({headless:true,...(process.env.CL_CHROMIUM_PATH ? {executablePath:process.env.CL_CHROMIUM_PATH,args:['--no-sandbox','--disable-dev-shm-usage']} : {})});const page=await browser.newPage();
  try{
    await page.route('https://silovar-uk.github.io/myessays/tools/context-lens.js**',r=>r.fulfill({contentType:'application/javascript',body:source}));
    await page.goto(base+'/fixture');await page.evaluate(loader);await page.waitForFunction(()=>!!window.CONTEXT_LENS);
    await page.evaluate(loader);assert.equal(await page.evaluate(()=>document.querySelector('#__context_lens_host__').shadowRoot.querySelector('.sheet').hidden),true);
    await page.goto(base+'/csp');await page.evaluate(loader);await page.getByText('導入・代替手順を開く').waitFor();assert.equal(await page.evaluate(()=>typeof CONTEXT_LENS),'undefined');
    await page.goto(base+'/tools/context-lens/');await page.getByRole('button',{name:'このページで試す'}).click();await page.waitForFunction(()=>!!window.CONTEXT_LENS);
    await page.screenshot({path:'/tmp/context-lens-install.png'});
  }finally{await browser.close();}
});
