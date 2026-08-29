# My Essays 保全型内部監査 Baseline

> Status: audit in progress
> Date: 2026-08-29

このファイルは、機能・UI・URL・保存データ仕様を変えずに内部品質を点検するためのBaseline記録です。

## 固定する契約

- HTML + CSS + Vanilla JavaScript + Markdown + GitHub Pages を維持する。
- 日本語Markdownを記事の正本とする。
- English Mix / Español は同一記事IDの派生版とする。
- URL / hash route / article id を変更しない。
- localStorage / sessionStorage の既存キーを変更しない。
- Library / Reader / 検索 / フィルター / ランダム / 未読了ランダム / Series / 読了 / 読書位置 / After Reading / メモ / 選択引用 / 言語切替 / Page Reader の挙動を変更しない。
- UIデザイン・文言・操作手順を意図的に変更しない。

## 監査方針

1. 現行実装・CI・データ整合性を調査する。
2. 発見事項を P0 / P1 / P2 / P3 に分類する。
3. P3（好み・理想論）は原則変更しない。
4. P0〜P2でも、回帰リスクより改善価値が明確に高いものだけ最小変更する。
5. 変更後は既存Node tests、Reading Versions QA、Page Reader QA、Visual QAをすべて通す。
6. 最後に旧参照・孤立ファイル・ドキュメント不整合を再監査する。

## 変更前に確認する項目

- [ ] 最新main SHA
- [ ] 最新CI結果
- [ ] GitHub Pages deploy結果
- [ ] `data/index.json` と日本語記事ファイルの整合性
- [ ] `data/versions-index.json` と派生版ファイルの整合性
- [ ] duplicate article id
- [ ] orphan derived files
- [ ] Reader lifecycle / CustomEvent依存
- [ ] MutationObserver / scroll / resize の重複
- [ ] fetch / cache 方針
- [ ] localStorage / sessionStorage 例外処理
- [ ] Markdown parser / sanitizer境界
- [ ] 未使用・旧仕様参照
- [ ] CSS / JS load順の暗黙依存
- [ ] CI dependency reproducibility
- [ ] README / guide と実装の一致

## 監査結果

調査完了後に追記する。
