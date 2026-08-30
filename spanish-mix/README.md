# Español Mix publishing contract

Español Mix is a companion Reading Mode for My Essays. The Japanese essay remains the canonical source.

## Files

- Canonical Japanese: `essays/YYYY-MM-DD-slug.md`
- Español Mix companion: `spanish-mix/<essay-id>.md`
- Derived-version map: `data/versions-index.json`

Both versions must use the same essay `id`. Reading status, After Reading entries, Series state, favorites, and browser-local notes are shared by that id.

## Mixing rules

- Keep Japanese as the comprehension base.
- A rough editorial guide is Japanese 50–70% and Spanish 30–50%, but natural semantic units matter more than a mechanical ratio.
- Mix Spanish at sentence or phrase level in context.
- Do not publish a full-Spanish translation as Español Mix.
- Do not repeat every Japanese sentence with a full Spanish translation.
- Avoid long uninterrupted Spanish blocks when they make the Japanese source difficult to follow.
- Preserve the original claims, numbers, examples, links, quotations, sources and broad argument order.
- Do not add facts or interpretations that are absent from the Japanese canonical article.
- Spanish should be natural and broadly understandable rather than mechanically literal.
- Keep H2-level section structure broadly aligned with the Japanese canonical article where practical so Reading Mode switching can preserve position.

## Publishing rule

When a new essay is published with an Español Mix version:

1. Publish the Japanese canonical essay and register it in `data/index.json`.
2. Create `spanish-mix/<essay-id>.md` using the same `id`.
3. Add the path under the same article ID in `data/versions-index.json` as `es-mix`.
4. Do not add the Español Mix file to `data/index.json` as a separate essay.

Example:

```json
{
  "article-id": {
    "es-mix": "spanish-mix/article-id.md"
  }
}
```

If an English Mix version also exists, keep both Reading Mode paths under the same canonical article entry.

The repository-wide current contract is defined in [`../CURRENT_SPEC.md`](../CURRENT_SPEC.md).
