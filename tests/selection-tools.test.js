const assert = require('node:assert/strict');
const { analyzeSelection, buildProviderUrl } = require('../selection-tools.js');

const japanese = analyzeSelection('エアリーディスク');
assert.equal(japanese.hasJapanese, true);
assert.equal(japanese.hasEnglish, false);
assert.equal(japanese.translationSource, 'ja');
assert.equal(japanese.translationTarget, 'en');
assert.equal(japanese.translationLabel, '英訳');
assert.equal(japanese.wikipediaLanguage, 'ja');

const english = analyzeSelection('Airy disk');
assert.equal(english.hasJapanese, false);
assert.equal(english.hasEnglish, true);
assert.equal(english.translationSource, 'en');
assert.equal(english.translationTarget, 'ja');
assert.equal(english.translationLabel, '和訳');
assert.equal(english.wikipediaLanguage, 'en');

const mixed = analyzeSelection('Airyディスク');
assert.equal(mixed.hasJapanese, true);
assert.equal(mixed.hasEnglish, true);
assert.equal(mixed.translationSource, 'ja');
assert.equal(mixed.translationTarget, 'en');
assert.equal(mixed.wikipediaLanguage, 'ja');

const neutral = analyzeSelection('123');
assert.equal(neutral.hasJapanese, false);
assert.equal(neutral.hasEnglish, false);
assert.equal(neutral.translationSource, 'en');
assert.equal(neutral.translationTarget, 'ja');
assert.equal(neutral.wikipediaLanguage, 'en');

assert.equal(
  buildProviderUrl('google', 'エアリー ディスク'),
  'https://www.google.com/search?q=%E3%82%A8%E3%82%A2%E3%83%AA%E3%83%BC%20%E3%83%87%E3%82%A3%E3%82%B9%E3%82%AF'
);
assert.equal(
  buildProviderUrl('wikipedia', 'Airy disk'),
  'https://en.wikipedia.org/w/index.php?search=Airy%20disk'
);
assert.equal(
  buildProviderUrl('wikipedia', 'エアリーディスク'),
  'https://ja.wikipedia.org/w/index.php?search=%E3%82%A8%E3%82%A2%E3%83%AA%E3%83%BC%E3%83%87%E3%82%A3%E3%82%B9%E3%82%AF'
);
assert.match(
  buildProviderUrl('translate', 'Airy disk'),
  /^https:\/\/translate\.google\.com\/\?sl=en&tl=ja&text=Airy%20disk&op=translate$/
);
assert.match(
  buildProviderUrl('translate', 'エアリーディスク'),
  /^https:\/\/translate\.google\.com\/\?sl=ja&tl=en&text=/
);
assert.equal(buildProviderUrl('unknown', 'text'), '');

console.log('selection-tools tests passed');
