const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname,'..','reader-reflections.js'),'utf8');
const css = fs.readFileSync(path.join(__dirname,'..','reader-reflections.css'),'utf8');
const index = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

test('keeps existing entry storage and adds per-essay drafts',()=>{
  assert.match(source,/myessays:reader-reflections:v1:/);
  assert.match(source,/myessays:reader-reflections:draft:v1:/);
  assert.match(source,/JSON\.stringify\(entries\)/);
  assert.match(source,/JSON\.stringify\(\{text,updatedAt\}\)/);
  assert.match(source,/DRAFT_MS = 420/);
  assert.match(source,/pagehide/);
});

test('composer autosaves, autosizes, and keeps keyboard flow',()=>{
  assert.match(source,/reflection-composer-input/);
  assert.match(source,/autosize\(input\)/);
  assert.match(source,/e\.metaKey\|\|e\.ctrlKey/);
  assert.match(source,/input\.focus\(\{preventScroll:true\}\)/);
  assert.match(css,/max-height: 320px/);
  assert.match(css,/font-size: 16px/);
});

test('editing is direct and only changes updatedAt',()=>{
  assert.match(source,/dataset\.editTarget/);
  assert.match(source,/focusout/);
  assert.match(source,/text===old/);
  assert.match(source,/x\.updatedAt=new Date\(\)\.toISOString\(\)/);
  assert.doesNotMatch(source,/x\.createdAt=/);
});

test('delete uses undo instead of confirm',()=>{
  assert.match(source,/UNDO_MS = 10000/);
  assert.match(source,/data-undo/);
  assert.match(source,/undoDelete/);
  assert.doesNotMatch(source,/window\.confirm/);
});

test('copy feedback, relative time, and long-note folding exist',()=>{
  assert.match(source,/✓ コピー済み/);
  assert.match(source,/relativeTime/);
  assert.match(source,/続きを読む/);
  assert.match(source,/MAX_CHARS = 300/);
  assert.match(source,/i>0/);
});

test('section stays before navigation and reflection assets are cache-busted',()=>{
  assert.match(source,/insertBefore\(root,nav\)/);
  assert.match(index,/reader-reflections\.css\?v=[0-9-]+/);
  assert.match(index,/reader-reflections\.js\?v=[0-9-]+/);
});

test('mobile and accessibility details are covered',()=>{
  assert.match(css,/min-height: 44px/);
  assert.match(css,/focus-visible/);
  assert.match(css,/prefers-reduced-motion: reduce/);
});
