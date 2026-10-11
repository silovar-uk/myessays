#!/usr/bin/env node
/**
 * Leaf Shield interactive article: static integrity checks.
 * Run from repository root: node scripts/check-leaf-lab.mjs
 * Browser interaction is verified separately on desktop/mobile.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const read = path => readFileSync(path,'utf8');
const id='ssbu-megaman-leaf-shield-four-leaves-commitment';
const japanese=read('essays/2026-10-11-'+id+'.md');
const english=read('english-mix/'+id+'.md');
const html=read('index.html');
const js=read('reader-leaf-lab.js');
const css=read('reader-leaf-lab.css');
const mechanics=JSON.parse(read('assets/leaf-shield/mechanics.json'));
const cases=JSON.parse(read('assets/leaf-shield/scenarios.json'));

new Script(js,{filename:'reader-leaf-lab.js'});
assert(html.includes('reader-leaf-lab.css?v='),'stylesheet not loaded');
assert(html.includes('reader-leaf-lab.js?v='),'plugin not loaded');
assert(js.includes("MyEssaysReaderRuntime.register('leaf-shield-lab'"),'plugin missing runtime registration');
assert(js.includes('if(essayId!==ID)return'),'plugin must remain article-scoped');

const checkMarker=(article,lang)=>{
  assert.match(article,new RegExp('^id: '+id+'$','m'),'wrong canonical article id');
  assert.equal((article.match(/data-leaf-lab=/g)||[]).length,1,'one lab marker required');
  assert(article.includes('data-leaf-lab="'+lang+'"'),'wrong lab language');
  assert.equal((article.match(/^## \d+\./gm)||[]).length,10,'expected ten article chapters');
  assert.match(article,/^## 参考資料/m,'missing references');
};
checkMarker(japanese,'ja');
checkMarker(english,'en-mix');

assert(mechanics.version===1 && cases.version===1,'unknown data version');
assert.equal(mechanics.fps,60);
assert(mechanics.sources.every(source=>/^https:\/\//.test(source.url)),'invalid source URL');
const sources=new Set(mechanics.sources.map(source=>source.id));
assert.equal(sources.size,mechanics.sources.length,'duplicate source ids');
for(const fact of mechanics.facts) {
  assert(sources.has(fact.source),'fact needs a source: '+fact.id);
  assert(fact.value && fact.ja && fact.en,'incomplete fact');
}
const factMap=Object.fromEntries(mechanics.facts.map(item=>[item.id,item.value]));
assert.equal(factMap.startup,'9F');
assert.equal(factMap.rehit,'11F');
assert.equal(factMap.starttotal,'35F');
assert.equal(factMap.throwtotal,'55F');
assert(mechanics.phases.find(x=>x.id==='hold').mark===null,'rehit interval must not be portrayed as a fixed hold-frame impact');
assert.equal(mechanics.eras.length,4,'expected original, predecessor, launch and patched game eras');
assert.equal(cases.items.length,6,'expected six tactical scenes');

const ids=new Set();
for(const item of cases.items) {
  assert(!ids.has(item.id),'duplicate scenario id: '+item.id); ids.add(item.id);
  assert(item.title.ja && item.title.en && item.prompt.ja && item.prompt.en,'missing bilingual title/prompt');
  assert(item.insight.ja && item.insight.en && item.condition.ja && item.condition.en,'missing bilingual explanation');
  assert(item.question.ja && item.question.en,'missing testable question');
  assert(item.options.length>=3,'at least three choices required');
  assert.equal(item.options.filter(option=>option.value==='best').length,1,'one recommended option required');
  for(const option of item.options)assert(option.ja && option.en,'missing bilingual option');
}
assert(css.includes('@media(max-width:600px)'),'mobile styles required');
assert(css.includes('@media(prefers-reduced-motion:reduce)'),'reduced motion required');
assert(js.includes('localStorage') && js.includes('csvText(entries)'),'local match-log and export are required');
assert(js.includes('function demoHtml('),'interactive first impression must be present');
assert(js.includes("host.addEventListener('pointerdown'"),'hold demo must support pointer input');
assert(js.includes("host.addEventListener('keyup'"),'hold demo must support keyboard release');
assert(js.includes("st.toolsOpen?"),'advanced analysis must be progressively disclosed');
assert(japanese.indexOf('data-leaf-lab="ja"') < japanese.indexOf('何を言っているのかと思う。'),'interactive lab should appear before the long lead');
assert(english.indexOf('data-leaf-lab="en-mix"') < english.indexOf('That sounds like a joke'),'English lab should appear before the long lead');
assert(js.includes('escape(st.draft.note)'),'saved note must be escaped before HTML insertion');

console.log('PASS: Leaf Lab JS syntax, article markers, bilingual scenarios, provenance, visual constraints and local log wiring');
