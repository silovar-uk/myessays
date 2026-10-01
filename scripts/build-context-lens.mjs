import fs from 'node:fs';
const loader = fs.readFileSync('tools/context-lens-loader.js','utf8').replace(/^\/\*[^]*?\*\/\s*/, '').trim();
// Encode rather than minify: keep the small loader independent of build dependencies.
const bookmarklet = 'javascript:' + encodeURIComponent(loader);
fs.writeFileSync('tools/context-lens-loader.txt', bookmarklet+'\n');
const page = fs.readFileSync('tools/context-lens/index.template.html','utf8');
fs.writeFileSync('tools/context-lens/index.html',page.replaceAll('{{BOOKMARKLET}}',bookmarklet.replaceAll('&','&amp;').replaceAll('"','&quot;')));
