const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

test('Aozora parser keeps XHTML structure and ruby as data', () => {
  const js = read('aozora-parser.js');
  assert.match(js, /main_text/);
  assert.match(js, /TextDecoder/);
  assert.match(js, /shift_jis/);
  assert.match(js, /tagName === 'RUBY'/);
  assert.match(js, /type: 'paragraph'/);
  assert.doesNotMatch(js, /\.innerHTML\s*=/);
});

test('Books use IndexedDB and the shared reader surface', () => {
  const js = read('aozora-books.js');
  assert.match(js, /indexedDB\.open/);
  assert.match(js, /__aozoraBook/);
  assert.match(js, /dataset\.rsvpReadingMap/);
  assert.match(js, /MyEssaysRoute\?\.navigateBook/);
});

test('Route and page load Aozora integration', () => {
  const route = read('route-state.js');
  const html = read('index.html');
  assert.match(route, /bookMatch\s*\?\s*'book'\s*:\s*'essay'/);
  assert.match(route, /navigateBook/);
  assert.match(html, /aozora-books\.css/);
  assert.match(html, /aozora-parser\.js/);
  assert.match(html, /aozora-books\.js/);
  assert.match(html, /id="aozoraImportButton"/);
});

test('Aozora bookshelf is a quiet header utility, not a Library section', () => {
  const html = read('index.html');
  const books = read('aozora-books.js');

  const libraryStart = html.indexOf('<section id="libraryView"');
  const readerStart = html.indexOf('<article id="readerView"');
  const libraryMarkup = html.slice(libraryStart, readerStart);

  assert.match(html, /id="bookshelfTrigger"/);
  assert.match(html, /id="booksShelfDialog"/);
  assert.doesNotMatch(libraryMarkup, /id="booksShelf"/);
  assert.match(books, /openShelfFromTrigger/);
  assert.match(books, /if \(!rows\.length\) \{\s*openImportDialog\(\)/);
  assert.match(books, /lastBookOpenedAt/);
  assert.match(books, /aozoraResumeSection/);
});

test('RSVP recognizes ruby reading metadata', () => {
  const js = read('reader-rsvp.js');
  const css = read('reader-rsvp.css');
  assert.match(js, /rsvpReadingMap/);
  assert.match(js, /rubyReadings/);
  assert.match(css, /rsvp-chunk-reading/);
});

test('URL imports preserve source identity and reuse existing books', () => {
  const books = read('aozora-books.js');
  const readerV2 = read('reader-v2.js');
  assert.match(books, /resolveAozoraSource/);
  assert.match(books, /existingBySourceKey/);
  assert.match(books, /sourceKeys*=s*resolved.cardUrls*||s*resolved.xhtmlUrl/);
  assert.match(readerV2, /図書カード ↗/);
  assert.match(readerV2, /原文 ↗/);
});
