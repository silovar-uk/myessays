(() => {
  'use strict';

  const MARKER_LINE = /^\s*<!--\s*(?:level\s*:\s*L?([1-5])(?:\s+role\s*:\s*([a-z-]+))?|structure\s*:\s*L?([1-5])(?:\s+([a-z-]+))?)\s*-->\s*$/i;

  function stripArgumentMetadata(markdown = '') {
    return String(markdown)
      .split(/\r?\n/)
      .filter(line => !MARKER_LINE.test(line))
      .join('\n');
  }

  window.MyEssaysArgumentMetadata = {
    markerPattern: MARKER_LINE,
    strip: stripArgumentMetadata
  };

  try {
    if (typeof readingMetrics === 'function') {
      const baseReadingMetrics = readingMetrics;
      readingMetrics = function argumentAwareReadingMetrics(markdown = '') {
        return baseReadingMetrics(stripArgumentMetadata(markdown));
      };
    }

    if (typeof normalizeEssay === 'function') {
      const baseNormalizeEssay = normalizeEssay;
      normalizeEssay = function argumentAwareNormalizeEssay(path, text) {
        const normalized = baseNormalizeEssay(path, text);
        try {
          const { meta, body } = parseFrontMatter(String(text || ''));
          const plain = stripArgumentMetadata(body)
            .replace(/[#>*_`\[\]()]/g, ' ')
            .replace(/https?:\/\/\S+/g, ' ');
          normalized.searchText = [
            meta.title,
            meta.subtitle,
            meta.abstract,
            ...(meta.tags || []),
            ...(meta.keywords || []),
            plain
          ].join(' ').toLowerCase();
        } catch {
          // Keep the base normalization if metadata cleanup cannot be applied.
        }
        return normalized;
      };
    }
  } catch (error) {
    console.warn('[ArgumentStructure] Metadata compatibility layer could not be installed.', error);
  }
})();