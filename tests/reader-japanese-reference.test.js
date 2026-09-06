const test = require('node:test');
const assert = require('node:assert/strict');
const { similarity, align } = require('../reader-japanese-reference.js');

test('identical Japanese paragraphs are strong anchors', () => {
  assert.equal(similarity('必要性は理解している。', '必要性は理解している。'), 1);
});

test('English-only replacement is mapped between Japanese anchors', () => {
  const mix = [
    '「大事なのは分かっている。でも続かない。」',
    'We know this feeling in study, exercise, and work improvement.',
    '必要性は理解している。'
  ];
  const ja = [
    '「大事なのは分かっている。でも続かない。」',
    '勉強でも、運動でも、仕事の改善でも、よくある。',
    '必要性は理解している。'
  ];
  const mapping = align(mix, ja);
  assert.deepEqual(mapping.map(item => item?.ja), [0, 1, 2]);
  assert.equal(mapping[1].confidence, 'sequence');
});

test('small split/merge gaps use conservative positional interpolation', () => {
  const mix = ['Nothing was deleted.', 'The information still exists. Its timing changed.'];
  const ja = [
    'ここで起きているのは、情報の削除ではない。',
    'The information still exists. Its timing changed.',
    '情報は存在している。ただ、現れるタイミングが変わった。'
  ];
  const mapping = align(mix, ja);
  assert.equal(mapping[0]?.ja, 0);
  assert.equal(mapping[1]?.ja, 1);
});

test('large structurally ambiguous gaps remain unresolved', () => {
  const mix = ['alpha only', 'beta only', 'gamma only', 'delta only', 'epsilon only', 'zeta only'];
  const ja = ['一番', '二番', '三番', '四番', '五番', '六番', '七番', '八番', '九番'];
  assert.ok(align(mix, ja).every(item => item === null));
});
