# English Mix publishing contract

English Mix is a companion Reading Mode for My Essays. The Japanese essay remains the canonical source.

## Files

- Canonical Japanese: `essays/YYYY-MM-DD-slug.md`
- English Mix companion: `english-mix/<essay-id>.md`
- Derived-version map: `data/versions-index.json`

Both versions must use the same essay `id`. Reading status, After Reading entries, Series state, favorites, and browser-local notes are shared by that id.

## Mixing rules

- Target English ratio: roughly 40–50% as an editorial guide, not a mechanical quota.
- Keep Japanese as the comprehension base.
- Mix at sentence or phrase level rather than translating whole sections by default.
- Avoid long uninterrupted English blocks when they make comparison with the canonical Japanese difficult.
- Do not repeat every Japanese sentence with a full English translation.
- Preserve the original structure, claims, numbers, links, examples, quotations and argument order unless there is a specific editorial reason not to.
- Do not add facts or interpretations that are absent from the Japanese source.
- English should be natural and understandable from context, not mechanically literal.
- Keep difficult proper nouns or concepts in the language that preserves meaning most safely.
- Keep H2-level section structure broadly aligned with the Japanese canonical article where practical so Reading Mode switching can preserve position.

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

If an Español Mix version also exists, keep it under the same article entry as `es-mix` and store it under `spanish-mix/<essay-id>.md`. The Library remains Japanese-canonical and only indicates which companion Reading Modes are available.

The repository-wide current contract is defined in [`../CURRENT_SPEC.md`](../CURRENT_SPEC.md).
