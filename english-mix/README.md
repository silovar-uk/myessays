# English Mix publishing contract

English Mix is a companion reading version for My Essays. The Japanese essay remains the canonical source.

## Files

- Canonical Japanese: `essays/YYYY-MM-DD-slug.md`
- English Mix companion: `english-mix/<essay-id>.md`
- Derived-version map: `data/versions-index.json`

Both versions must use the same essay `id`. Reading status, After Reading entries, Series state, favorites, and browser-local notes are shared by that id.

## Mixing rules

- Target English ratio: roughly 40–50%.
- Mix at sentence level rather than translating whole sections.
- Prefer an alternating rhythm of Japanese and English; avoid long uninterrupted English blocks.
- Preserve the original structure, claims, numbers, links, examples, and argument order.
- Do not add facts or interpretations that are absent from the Japanese source.
- English should be natural and understandable from context, not mechanically literal.
- Keep difficult proper nouns or concepts in the language that preserves meaning most safely.
- Headings may remain Japanese when that keeps navigation and comparison with the canonical version clear.

## Publishing rule

When a new essay is published with an English Mix version:

1. Publish the Japanese canonical essay and register it in `data/index.json`.
2. Create `english-mix/<essay-id>.md` using the same `id`.
3. Add the English Mix path under the same article ID in `data/versions-index.json` as `en-mix`.
4. Do not add the English Mix file to `data/index.json` as a separate essay.

Example:

```json
{
  "article-id": {
    "en-mix": "english-mix/article-id.md"
  }
}
```

If an Español version also exists, add `es` to the same article entry. The Library lists the essay only once; the reader exposes the available versions for that article.
