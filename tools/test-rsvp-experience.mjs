#!/usr/bin/env node
// Run: node tools/test-rsvp-experience.mjs
// Regressions for flow reader scenes + source-linked discoveries.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const source = fs.readFileSync(path.join(root, 'reader-rsvp.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'reader-rsvp.css'), 'utf8');
const page = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
new vm.Script(source); // Entire browser script compiles.

function sourceFunction(name) {
  const start = source.indexOf('  function ' + name + '(');
  assert.ok(start >= 0, 'Missing ' + name);
  const end = source.indexOf('\n  }\n', start);
  assert.ok(end >= start, 'Unclosed ' + name);
  return source.slice(start, end + 5);
}

function evaluate(parts, extra = '', bindings = {}) {
  const sandbox = { ...bindings };
  vm.runInNewContext(parts.map(sourceFunction).join('\n') + '\n' + extra, sandbox);
  return sandbox;
}

const unit = { text: '最初の事実がある。 続きの事実がある。', locator: '2-1', el: { dataset: { pairId: 'p2-1' } } };
const chunk = (start, end, sentence) => ({
  type: 'chunk', unit, start, end, sentence, width: end - start,
  morae: end - start, pause: null
});
const items = [
  { type: 'card', kind: 'h2' },
  chunk(0, 2, 0), chunk(2, 4, 0), chunk(4, 9, 0), chunk(10, 12, 0),
  chunk(13, 15, 1),
  { type: 'card', kind: 'h3' },
  chunk(16, 18, 2),
  { type: 'card', kind: 'figure' },
  chunk(18, 20, 3),
  { type: 'card', kind: 'end' }
];
const runner = evaluate(['sceneRange', 'sentenceParts', 'selectedDiscovery', 'storedDiscoveryKey'],
  'const SCENE_SIZE=3; const items = this.items; let index=2; const currentVersion=()=>\'ja\'; this.scene = sceneRange; this.sentenceParts=sentenceParts; this.selected = selectedDiscovery; this.key = storedDiscoveryKey;',
  { items }
);
assert.deepEqual(JSON.parse(JSON.stringify(runner.scene(items, 2))), { start: 1, end: 4 });
assert.deepEqual(JSON.parse(JSON.stringify(runner.scene(items, 4))), { start: 4, end: 5 });
assert.deepEqual(JSON.parse(JSON.stringify(runner.scene(items, 5))), { start: 5, end: 6 });
assert.deepEqual(JSON.parse(JSON.stringify(runner.scene(items, 7))), { start: 7, end: 8 });
const quote = runner.selected();
assert.equal(quote.version, 'ja');
assert.equal(quote.locator, '2-1');
assert.equal(quote.pairId, 'p2-1');
assert.equal(quote.start, 0);
assert.equal(quote.quote, unit.text.slice(0, 12).trim());
assert.equal(runner.key(quote), 'ja|2-1|0');

assert.match(source, /KEY_DISCOVERIES = 'myessays:rsvp-discoveries:v1'/);
assert.match(source, /MAX_DISCOVERIES = 24/);
assert.match(source, /presentat(?:ion)?: 'chunk'/);
assert.match(source, /segButtons\('流し方'/);
assert.match(source, /els\.tools\.append\(els\.discover, els\.tune, els\.helpButton\)/);
assert.match(source, /if \(panel\?\.dataset\.discoverySignature === signature\) return/);
assert.match(source, /rsvp-discovery-recap/);
assert.match(source, /rsvp-card-kicker/);
assert.match(styles, /\.rsvp-word\.is-scene/);
assert.match(styles, /\.rsvp-discoveries-link/);
assert.match(page, /reader-rsvp\.js\?v=20261024-discovery-2/);
assert.match(page, /reader-rsvp\.css\?v=20261024-discovery-2/);
console.log('PASS RSVP experience: source compiles; scene boundaries, precise quote, cross-language locator, local storage hooks, layout hooks');
