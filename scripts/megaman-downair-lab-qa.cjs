const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const base = process.env.BASE_URL || 'http://127.0.0.1:4173';
const id = 'megaman-down-air-lowest-height-hard-knuckle';
const folder = 'qa-artifacts/megaman-downair';
fs.mkdirSync(folder, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{name:'desktop',width:1280,height:900},{name:'mobile',width:390,height:844}]) {
      const page = await browser.newPage({viewport:{width:viewport.width,height:viewport.height},reducedMotion:'reduce'});
      const errors=[];
      page.on('pageerror',err=>errors.push(err.message));
      await page.goto(base+'/#/essay/'+id,{waitUntil:'networkidle',timeout:45000});
      await page.waitForSelector('#readerView:not([hidden])');
      await page.waitForSelector('.mm-lab',{timeout:20000});
      assert.equal(await page.locator('#readerContent > .mm-lab').count(),4,'exactly four article-only learning modules');
      assert.deepEqual(await page.evaluate(()=>document.querySelectorAll('.mm-lab').length),4);
      const API=await page.evaluate(()=>({
        early:window.MegaManDownAirLab.classifyHit(0,'air',false),
        grounded:window.MegaManDownAirLab.classifyHit(4,'ground',false),
        meteor:window.MegaManDownAirLab.classifyHit(4,'air',false),
        reflected:window.MegaManDownAirLab.classifyHit(4,'air',true),
        none:window.MegaManDownAirLab.classifyHit(20,'air',false)
      }));
      assert.deepEqual(API,{early:'early',grounded:'grounded-late',meteor:'meteor',reflected:'reflected-meteor',none:'none'});
      await page.locator('.mm-lab').first().locator('select').first().selectOption('19');
      assert.match(await page.locator('.mm-lab-output').textContent(),/4F/);
      await page.locator('.mm-lab').first().locator('select').nth(1).selectOption('ground');
      assert.match(await page.locator('.mm-lab-output').textContent(),/45度/);
      await page.locator('.mm-lab').first().locator('input[type=checkbox]').check();
      await page.locator('.mm-lab').first().locator('select').nth(1).selectOption('air');
      assert.match(await page.locator('.mm-lab-output').textContent(),/反射/);
      await page.locator('.mm-lab').nth(2).locator('.mm-lab-tabs button').nth(1).click();
      assert.match(await page.locator('.mm-lab-museum-detail').textContent(),/23〜25F/);
      const log=page.locator('.mm-lab-log-grid input[type=number]');
      await log.nth(0).fill('20'); await log.nth(0).press('Tab');
      await log.nth(1).fill('18'); await log.nth(1).press('Tab');
      await log.nth(2).fill('8'); await log.nth(2).press('Tab');
      assert.match(await page.locator('.mm-lab-log-summary').textContent(),/90%/);
      await page.locator('.mm-lab-quiz-choices button').nth(2).click();
      assert.match(await page.locator('.mm-lab-quiz-feedback').textContent(),/妥当/);
      await page.locator('.mm-lab-quiz-navigation button').first().click();
      assert.match(await page.locator('.mm-lab-quiz-progress').textContent(),/2/);
      const sizes=await page.evaluate(()=>({
        doc:document.documentElement.scrollWidth,
        viewport:window.innerWidth,
        wide:[...document.querySelectorAll('.mm-lab')].filter(x=>x.getBoundingClientRect().right>innerWidth+2).length
      }));
      assert.ok(sizes.doc<=sizes.viewport+2,'horizontal page overflow '+JSON.stringify(sizes));
      assert.equal(sizes.wide,0,'no overflow from lab cards');
      await page.locator('.mm-lab').first().screenshot({path:folder+'/'+viewport.name+'-timeline.png'});
      await page.locator('.mm-lab').nth(2).screenshot({path:folder+'/'+viewport.name+'-museum.png'});
      const enButton=page.locator('#readerModeShell [data-reading-mode-intent="en-mix"]');
      await enButton.waitFor({state:'visible'});
      await enButton.click();
      await page.waitForFunction(()=>window.MyEssaysReaderVersions?.currentVersion?.()==='en-mix' && document.querySelectorAll('#readerContent > .mm-lab').length===4,null,{timeout:12000});
      const modeDebug=await page.evaluate(()=>({mode:window.MyEssaysReaderVersions?.currentVersion?.(),essayVersion:window.MyEssaysReaderRuntime?.getContext?.()?.essay?.__readingVersion,headline:document.querySelector('.mm-lab .mm-lab-title')?.textContent,labCount:document.querySelectorAll('#readerContent > .mm-lab').length}));
      console.log('DOWN_AIR_MODE_DEBUG',JSON.stringify(modeDebug));
      await page.waitForSelector('.mm-lab');
      assert.equal(await page.locator('#readerContent > .mm-lab').count(),4,'modules survive English Mix switch');
      assert.match(await page.locator('.mm-lab').first().textContent(),/Three clocks/);
      assert.match(await page.locator('.mm-lab-log-summary').textContent(),/90%/);
      const readers=await page.evaluate(()=>({
        locator:document.querySelectorAll('#readerContent > .reader-locator-block').length,
        labs:document.querySelectorAll('#readerContent > .mm-lab').length
      }));
      assert.ok(readers.locator>40,'canonical reading locators should remain present');
      assert.equal(readers.labs,4);
      await page.locator('.mm-lab').first().screenshot({path:folder+'/'+viewport.name+'-en.png'});
      assert.deepEqual(errors,[],'uncaught page errors');
      await page.close();
    }
    console.log('Mega Man down-air lab browser QA passed');
  } finally {
    await browser.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});