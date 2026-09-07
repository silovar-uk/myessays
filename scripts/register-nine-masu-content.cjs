const fs = require('node:fs');

const essayPath = 'essays/2026-09-07-consulting-nine-masu-storyboard.md';
const essayId = 'consulting-nine-masu-storyboard';
const englishMixPath = 'english-mix/consulting-nine-masu-storyboard.md';

const indexPath = 'data/index.json';
const versionsPath = 'data/versions-index.json';

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
if (!Array.isArray(index.essays)) throw new Error('data/index.json: essays must be an array');
index.essays = index.essays.filter(path => path !== essayPath);
index.essays.unshift(essayPath);
fs.writeFileSync(indexPath, `${JSON.stringify(index)}\n`);

const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
if (!versions.articles || typeof versions.articles !== 'object') {
  throw new Error('data/versions-index.json: articles must be an object');
}
versions.articles[essayId] = {
  ...(versions.articles[essayId] || {}),
  'en-mix': englishMixPath
};
fs.writeFileSync(versionsPath, `${JSON.stringify(versions)}\n`);

console.log(`Registered ${essayId}`);
