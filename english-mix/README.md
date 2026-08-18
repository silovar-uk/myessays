# English Mix publishing contract

English Mix is a companion reading mode for My Essays. The Japanese essay remains the canonical source.

## Files

- Canonical Japanese: `essays/YYYY-MM-DD-slug.md`
- English Mix companion: `english-mix/<essay-id>.md`
- Availability map: `data/mix-index.json`

Both versions must use the same essay `id`. Reading status, After Reading entries, and browser-local notes are shared by that id.

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

When a new essay is published with an English Mix version, commit the Japanese essay and its companion together, then add the companion path to `data/mix-index.json`. The Library lists the essay only once; the reader exposes `日本語 / English Mix` when a companion exists.
