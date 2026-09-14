#!/usr/bin/env node

import fs from 'node:fs';

const file = 'reader-japanese-reference.js';
let source = fs.readFileSync(file, 'utf8');

function replaceOnce(before, after, label) {
  if (source.includes(after)) return;
  const first = source.indexOf(before);
  if (first < 0) throw new Error(`Patch target not found: ${label}`);
  if (source.indexOf(before, first + before.length) >= 0) throw new Error(`Patch target is not unique: ${label}`);
  source = source.slice(0, first) + after + source.slice(first + before.length);
}

const sectionsBefore = `  function sections(root) {
    const list = [{ heading: null, blocks: [] }];
    eligibleBlocks(root).forEach(el => {
      if (el.tagName === 'H2') list.push({ heading: el, blocks: [] });
      else list[list.length - 1].blocks.push(el);
    });
    return list;
  }
`;

const sectionsAfter = `${sectionsBefore}
  // Strict comparison uses the same direct-child block model as
  // reading-locators.js. Approximate pairing may still exist for navigation,
  // but it must not be presented as an exact paragraph comparison.
  function locatorSections(root) {
    const list = [{ heading: null, blocks: [] }];
    if (!root) return list;
    [...root.children].forEach(element => {
      if (element.matches('h2')) list.push({ heading: element, blocks: [] });
      else if (element.matches(LOCATOR_BLOCK_SELECTOR)) list[list.length - 1].blocks.push(element);
    });
    return list;
  }

  function markStructureStatus(root, canonicalRoot) {
    const sourceLocatorSections = locatorSections(root);
    const canonicalLocatorSections = locatorSections(canonicalRoot);
    const sourcePairSections = sections(root);

    sourcePairSections.forEach((section, sectionIndex) => {
      const sourceSection = sourceLocatorSections[sectionIndex];
      const canonicalSection = canonicalLocatorSections[sectionIndex];
      const sourceTypes = sourceSection?.blocks.map(block => block.tagName) || [];
      const canonicalTypes = canonicalSection?.blocks.map(block => block.tagName) || [];
      const structureMatch = Boolean(sourceSection && canonicalSection)
        && sourceTypes.length === canonicalTypes.length
        && sourceTypes.every((type, index) => type === canonicalTypes[index]);
      const sourceCount = sourceTypes.length;
      const canonicalCount = canonicalTypes.length;
      const targets = [section.heading, ...section.blocks].filter(Boolean);

      targets.forEach(block => {
        block.dataset.pairStructure = structureMatch ? 'match' : 'mismatch';
        block.dataset.pairSection = String(sectionIndex);
        block.dataset.pairSourceCount = String(sourceCount);
        block.dataset.pairCanonicalCount = String(canonicalCount);
      });
    });
    return root;
  }
`;
replaceOnce(sectionsBefore, sectionsAfter, 'section structure helpers');

const annotateBefore = `    const sourceSections = sections(root);
    const canonicalSections = sections(canonicalRoot);
    const count = Math.min(sourceSections.length, canonicalSections.length);
`;
const annotateAfter = `${annotateBefore}    markStructureStatus(root, canonicalRoot);\n`;
replaceOnce(annotateBefore, annotateAfter, 'annotate structure status');

const apiBefore = `    eligibleBlocks,
    sections,
    ensureCanonicalReadingLocators,`;
const apiAfter = `    eligibleBlocks,
    sections,
    locatorSections,
    markStructureStatus,
    ensureCanonicalReadingLocators,`;
replaceOnce(apiBefore, apiAfter, 'pair api exports');

const showBefore = `    el.dataset.pairId = selection?.pairId || reference?.pairId || '';
    if (!reference?.text) {
      status.textContent = 'この位置に対応する日本語段落がありません';
      body.textContent = '';
      originalBlock.hidden = true;
    } else {
      const positional = reference.confidence === 'pair-position';
      status.textContent = positional ? '同じ読書位置の日本語段落（段落位置で対応）' : '同じ読書位置の日本語段落';
      body.textContent = reference.text;
      originalBlock.hidden = false;
    }
`;
const showAfter = `    el.dataset.pairId = selection?.pairId || reference?.pairId || '';
    const structureMismatch = Boolean(reference?.structureMismatch);
    const positionalOnly = reference?.confidence === 'pair-position';
    el.dataset.compareState = structureMismatch ? 'mismatch' : positionalOnly ? 'approximate' : reference?.text ? 'matched' : 'unresolved';

    if (structureMismatch) {
      const section = reference.section || '?';
      const canonicalCount = Number.isFinite(reference.canonicalCount) ? reference.canonicalCount : '?';
      const sourceCount = Number.isFinite(reference.sourceCount) ? reference.sourceCount : '?';
      status.textContent = \`STRUCTURE MISMATCH — Section \${section}: JA \${canonicalCount} / \${version.toUpperCase()} \${sourceCount}。対応段落を推測表示しません\`;
      body.textContent = '';
      originalBlock.hidden = true;
    } else if (!reference?.text || positionalOnly) {
      status.textContent = positionalOnly
        ? 'この段落は位置推測でしか対応できないため、日本語原文を表示しません'
        : 'この位置に対応する日本語段落がありません';
      body.textContent = '';
      originalBlock.hidden = true;
    } else {
      status.textContent = '同じ読書位置の日本語段落';
      body.textContent = reference.text;
      originalBlock.hidden = false;
    }
`;
replaceOnce(showBefore, showAfter, 'strict compare panel');

const referencesBefore = `      eligibleBlocks(ctx.root).forEach(block => {
        const pairId = block.dataset.pairId;
        const canonicalBlock = findByPairId(canonicalRoot, pairId);
        if (!canonicalBlock) return;
        references.set(block, {
          text: textOf(canonicalBlock),
          confidence: block.dataset.pairConfidence || 'pair',
          pairId
        });
      });
`;
const referencesAfter = `      eligibleBlocks(ctx.root).forEach(block => {
        const pairId = block.dataset.pairId;
        const structureMismatch = block.dataset.pairStructure === 'mismatch';
        if (structureMismatch) {
          references.set(block, {
            text: '',
            confidence: 'structure-mismatch',
            pairId,
            structureMismatch: true,
            section: block.dataset.pairSection || '',
            sourceCount: Number(block.dataset.pairSourceCount),
            canonicalCount: Number(block.dataset.pairCanonicalCount)
          });
          return;
        }
        const canonicalBlock = findByPairId(canonicalRoot, pairId);
        if (!canonicalBlock) return;
        references.set(block, {
          text: textOf(canonicalBlock),
          confidence: block.dataset.pairConfidence || 'pair',
          pairId,
          structureMismatch: false
        });
      });
`;
replaceOnce(referencesBefore, referencesAfter, 'strict reference map');

fs.writeFileSync(file, source, 'utf8');
console.log('Applied strict structure guard to reader-japanese-reference.js');
