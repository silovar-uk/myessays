#!/usr/bin/env node
// Run: node tools/test-rsvp-section-entry.mjs
// Targeted, dependency-free regression tests for the actual timing functions in reader-rsvp.js.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = fs.readFileSync(path.resolve(here, '..', 'reader-rsvp.js'), 'utf8');

function declaration(name) {
  const prefix = '  const ' + name + ' =';
  const start = source.indexOf(prefix);
  assert.ok(start >= 0, 'Missing ' + name);
  const end = source.indexOf(';\n', start);
  assert.ok(end > start, 'Unterminated ' + name);
  return source.slice(start, end + 1);
}

const start = source.indexOf('  // 見出しの直後だけ本文の表示時間を延ばす。');
const end = source.indexOf('  // ---------- 本文から流す単位を集める ----------');
assert.ok(start >= 0 && end > start, 'Could not locate the RSVP timing functions');
const functions = source.slice(start, end);
const scope = {};
vm.runInNewContext(
  ['PAUSE_SCALE', 'BEATS', 'CARD_MS', 'MIN_SHOW_MS', 'SECTION_ENTRY_TEMPO']
    .map(declaration).join('\n') +
    '\n' + functions + '\nthis.timing = { easeSectionEntry, retime };',
  scope
);
const { retime } = scope.timing;

const card = kind => ({ type: 'card', kind, text: kind });
const chunk = (text = '本文', width = 2, morae = 2) =>
  ({ type: 'chunk', text, width, morae, pause: null });
const run = (items, speed = 4000, pause = 2) => {
  retime(items, { speed, pause });
  return items;
};

const a = run([
  card('title'), chunk('pre'),
  card('h2'), chunk('intro1'), chunk('intro2'), chunk('regular'),
  card('h3'), chunk('h3-entry'),
  card('figure'), chunk('after-figure'),
  card('h2'), card('h3'), chunk('consecutive'),
  card('end')
]);
assert.equal(a[1].sectionEntry, 0, 'Title is handled by original initial ramp, not heading brake');
assert.equal(a[3].sectionEntry, 1);
assert.equal(a[4].sectionEntry, 2);
assert.equal(a[5].sectionEntry, 0, 'Normal pace returns after two chunks');
assert.equal(a[7].sectionEntry, 1, 'H3 also receives easing');
assert.equal(a[9].sectionEntry, 0, 'Figures disarm the chapter easing');
assert.equal(a[12].sectionEntry, 1, 'Consecutive headings should not use up the easing');
assert.ok(a[3].ms >= 650);
assert.ok(a[4].ms >= 500);
assert.equal(a[5].ms, 100, 'A normal high-speed chunk keeps the existing minimum');
assert.ok(a[3].remain > a[4].remain, 'Remaining time accounts for easing');

const snap = a.map(x => [x.ms, x.rest, x.sectionEntry, x.remain]);
run(a);
assert.deepEqual(a.map(x => [x.ms, x.rest, x.sectionEntry, x.remain]), snap,
  'Retiming must be idempotent, including after a speed-slider change');
run(a, 600, 0);
assert.ok(a[3].ms > a[5].ms, 'Heading brake remains separate from punctuation pause controls');
assert.equal(a[5].sectionEntry, 0);
assert.equal(a[a.length - 1].sectionEntry, 0);
assert.ok(source.includes('stage.dataset.sectionEntry'), 'Ensure UI ties breadcrumb visibility to the tempo');
assert.ok(source.includes("items[j].kind === 'h2' || items[j].kind === 'h3'"),
  'Ensure H3 labels remain visible as breadcrumbs');
console.log('PASS: section-entry pacing, H2/H3, figure reset, idempotence, existing navigation compatibility');
