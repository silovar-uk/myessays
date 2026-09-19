#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildContentGraph,
  buildGeneratedIndexes,
  formatIssue,
  readCurrentIndexes
} from './content-contract.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, '..');

function parseArgs(argv) {
  const args = {
    check: false,
    write: false,
    output: '',
    root: defaultRoot
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--check') args.check = true;
    else if (arg === '--write') args.write = true;
    else if (arg === '--output') args.output = argv[++i] || '';
    else if (arg === '--root') args.root = path.resolve(argv[++i] || defaultRoot);
    else if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function semanticEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function diffPaths(current = [], generated = []) {
  const currentSet = new Set(current);
  const generatedSet = new Set(generated);
  return {
    missingFromIndex: generated.filter(item => !currentSet.has(item)),
    staleInIndex: current.filter(item => !generatedSet.has(item))
  };
}

function printDrift(currentIndex, currentVersions, generated) {
  const canonical = diffPaths(currentIndex?.essays || [], generated.index.essays || []);
  const messages = ['CONTENT INDEX DRIFT'];

  if (canonical.missingFromIndex.length) {
    messages.push('', 'Canonical Markdown not registered:');
    canonical.missingFromIndex.forEach(file => messages.push(`  + ${file}`));
  }

  if (canonical.staleInIndex.length) {
    messages.push('', 'Stale canonical references:');
    canonical.staleInIndex.forEach(file => messages.push(`  - ${file}`));
  }

  if (!semanticEqual(currentVersions, generated.versionsIndex)) {
    messages.push('', 'Reading Mode index differs from Markdown source.');
  }

  messages.push('', 'Fix:', '  node scripts/build-content-index.mjs --write');
  process.stderr.write(`${messages.join('\n')}\n`);
}

function writeGenerated(outputDirectory, generated) {
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, 'index.json'), stableJson(generated.index));
  fs.writeFileSync(path.join(outputDirectory, 'versions-index.json'), stableJson(generated.versionsIndex));
}

function usage() {
  return [
    'Usage:',
    '  node scripts/build-content-index.mjs --check',
    '  node scripts/build-content-index.mjs --write',
    '  node scripts/build-content-index.mjs --output <directory>',
    '',
    'Markdown files are the membership source of truth.',
    'Existing canonical index order is preserved only as a presentation hint.'
  ].join('\n');
}

export function run(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return 0;
  }

  const graph = buildContentGraph(args.root);

  if (graph.errors.length) {
    process.stderr.write('CONTENT CONTRACT ERROR\n');
    graph.errors.forEach(issue => process.stderr.write(`  - ${formatIssue(issue)}\n`));
    return 1;
  }

  if (graph.warnings.length) {
    process.stderr.write('CONTENT CONTRACT WARNINGS\n');
    graph.warnings.forEach(issue => process.stderr.write(`  - ${formatIssue(issue)}\n`));
  }

  const { currentIndex, currentVersions } = readCurrentIndexes(args.root);
  const generated = buildGeneratedIndexes(graph, { currentIndex, currentVersions });

  if (args.check) {
    const indexMatches = semanticEqual(currentIndex, generated.index);
    const versionsMatch = semanticEqual(currentVersions, generated.versionsIndex);

    if (!indexMatches || !versionsMatch) {
      printDrift(currentIndex, currentVersions, generated);
      return 1;
    }

    process.stdout.write(
      `CONTENT INDEX OK — ${generated.index.essays.length} canonical, ${Object.keys(generated.versionsIndex.articles).length} versioned articles\n`
    );
  }

  if (args.write) {
    writeGenerated(path.join(args.root, 'data'), generated);
    process.stdout.write('Wrote data/index.json and data/versions-index.json\n');
  }

  if (args.output) {
    const outputDirectory = path.resolve(args.root, args.output);
    writeGenerated(outputDirectory, generated);
    process.stdout.write(`Wrote generated indexes to ${path.relative(args.root, outputDirectory) || '.'}\n`);
  }

  if (!args.check && !args.write && !args.output) {
    process.stdout.write(stableJson(generated));
  }

  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = run();
  } catch (error) {
    process.stderr.write(`CONTENT INDEX ERROR — ${error?.message || error}\n`);
    process.exitCode = 1;
  }
}
