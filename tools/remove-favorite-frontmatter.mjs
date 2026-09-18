#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGETS = ['essays', 'english-mix', 'spanish-mix'];
const WRITE = process.argv.includes('--write');
const CHECK = process.argv.includes('--check') || !WRITE;

function markdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return markdownFiles(full);
    return entry.isFile() && entry.name.endsWith('.md') ? [full] : [];
  });
}

function stripFavoriteFrontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { changed: false, content: source };

  const lines = match[1].split(/\r?\n/);
  const next = lines.filter(line => !/^favorite\s*:/i.test(line.trim()));
  if (next.length === lines.length) return { changed: false, content: source };

  const opening = '---\n';
  const closing = '\n---\n';
  const replacement = opening + next.join('\n') + closing;
  return {
    changed: true,
    content: replacement + source.slice(match[0].length)
  };
}

const files = TARGETS.flatMap(dir => markdownFiles(path.join(ROOT, dir)));
const changed = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const result = stripFavoriteFrontMatter(source);
  if (!result.changed) continue;
  changed.push(path.relative(ROOT, file).replaceAll('\\', '/'));
  if (WRITE) fs.writeFileSync(file, result.content, 'utf8');
}

if (changed.length) {
  console.log(`${WRITE ? 'Removed' : 'Found'} favorite front matter in ${changed.length} files:`);
  changed.forEach(file => console.log(file));
} else {
  console.log('No favorite front matter found.');
}

if (CHECK && changed.length) process.exitCode = 1;
