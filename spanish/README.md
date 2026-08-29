# Español publishing contract

Español is a full Spanish reading version of a Japanese canonical essay in My Essays.

## Files

- Canonical Japanese: `essays/YYYY-MM-DD-slug.md`
- Español companion: `spanish/<essay-id>.md`
- Derived-version map: `data/versions-index.json`

The Spanish version must use the same essay `id` as the Japanese canonical article. Reading status, After Reading entries, Series state, favorites, and browser-local notes remain shared by that article ID.

## Translation rules

- Translate the full article into natural, broadly understandable Spanish.
- Prioritize the meaning, logic, and nuance of the Japanese source over word-for-word order.
- Avoid strongly regional expressions unless the original context requires them.
- Preserve claims, numbers, examples, Markdown structure, links, images, quotations, and sources.
- Do not add facts or interpretations that are absent from the Japanese source.
- Keep proper nouns, product names, service names, and titles unchanged unless a standard Spanish form is clearly appropriate.
- `title`, `subtitle`, and `abstract` may be translated in the Spanish file.
- Article-management metadata such as `id`, dates, Series information, favorites, and reading state remains canonical on the Japanese article.

## Publishing rule

When a new essay gets an Español version:

1. Publish the Japanese canonical essay and register it in `data/index.json`.
2. Create `spanish/<essay-id>.md` using the same `id`.
3. Add the Spanish path under the same article ID in `data/versions-index.json` as `es`.
4. Do not add the Spanish file to `data/index.json` as a separate essay.

Example:

```json
{
  "article-id": {
    "es": "spanish/article-id.md"
  }
}
```

If an English Mix version also exists, keep both paths under the same article entry. The Library remains Japanese-canonical and only indicates which companion versions are available.
