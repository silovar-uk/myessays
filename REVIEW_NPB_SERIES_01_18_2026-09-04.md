# NPB学習シリーズ Review — Episodes 1–18

Updated: 2026-09-04
Series: `野球という産業を読む`
Scope: Episode 1–18

## 1. Overall assessment

**PASS — Episode 19（ポスティング制度、Mobility Mechanism Auditの応用）へ進んでよい。**

Episode 18でシリーズ全体のtoolkitが読者へ引き渡され、シリーズは「制度を作る・統合する」段階から「toolkitを個別の未着手制度へ適用する」段階へ移行した。

## 2. Episode 18 role

### Episode 18 — INSTITUTIONAL CHANGE / HOW TO KEEP READING

Question:

現在議論されている、あるいは近い将来変わる可能性がある制度は何か。読者は、これまで学んだ問いの立て方を使って、その変化をどう追い続ければよいのか？

Function:

**consolidating 18 episodes' worth of tools → handing them to the reader**

Key:

- Rule Lifecycle Auditの再確認と、2026年7〜8月の3実例（FA人的補償撤廃/PROPOSED、ピッチクロック/AGREED詳細未定、暑さ対策基準/PROPOSED）への適用
- シリーズ全体のtoolkit一覧表
- toolkitの適用範囲外（競技運営・安全面の制度）を正直に明示
- 作業中の日付誤りとその修正プロセス

Episode 1〜17の役割は[REVIEW_NPB_SERIES_01_17_2026-09-01.md](REVIEW_NPB_SERIES_01_17_2026-09-01.md)を参照。

## 3. Connection audit

### 17 → 18

外部比較によるNPBの相対化 → 制度の動態を読者自身が追い続けるための引き渡し。

**Strong, and marks the series' second phase transition.**

Episode 9以降続いてきた「記事内の問いが次回のCore Questionに直結する」パターンが、10回連続（9→10〜17→18）で維持された。Episode 17（内側から外側への転換）に続き、Episode 18は「著者が読む」から「読者が読む」への**役割の転換点**である。

## 4. Production-quality audit（拡張、重要インシデント）

Episode 18の制作中、セッション内の日付認識が実日時から3日ずれていることが判明した（思い込みで2026-09-01としていたが、実際は2026-09-04だった）。`date`コマンドと`git log`のコミット日時で実日時を確認し、ファイル名・frontmatter・本文中の日付表記をすべて修正してから公開した。

**この経験から、長時間セッションでは日付を推測せず、Episode作成前に必ず`date`コマンド等で実日時を確認するプロセスを標準化した。** これは、Episode 10〜11で確立したPre-Deploy Renderer Checkと同種の、**公開前の機械的検証項目**として今後定着させる。

## 5. Reusable conceptual toolkit after Episode 18

Episode 18は新しいAuditを追加する回ではなく、既存18回分のtoolkitを一覧化・整理する回だった。全toolkitは本編（Episode 18）内の一覧表を参照。

### 新規の気づき：Third Domain（未命名）

ピッチクロック・暑さ対策のような競技運営・安全面の制度変更は、PLAYER SYSTEM・BUSINESS SYSTEMのどちらのtoolkitでも完全に説明しきれないことが分かった。これは名前を付けずに「今後の課題」として記録するに留める。

## 6. Why Episode 19 should apply the toolkit to posting

Episode 18の`NEXT QUESTION`は既に、

**How does the posting system compare to FA and trade as a mobility mechanism — what's the same, and what's different?**

へ到達している。これは、シリーズ発足時の候補リストに残っていた「ポスティング / INTERNATIONAL MOBILITY」という未着手テーマを、Episode 8〜9のMobility Mechanism Auditを使って消化する、toolkit引き渡し後の最初の実践例になる。

## 7. Episode 19 selection

### Title candidate

**「ポスティング制度は、何を国境の外へ広げる制度なのか」**

Role:

`INTERNATIONAL MOBILITY / POSTING SYSTEM`

Core Question:

**選手が海外リーグへ移籍する際のポスティング制度は、これまで読んできたFA・トレードと、どこが同じで、どこが違う移動mechanismなのか？**

詳細は[RETROSPECTIVE_NPB_SERIES_18_2026-09-04.md](RETROSPECTIVE_NPB_SERIES_18_2026-09-04.md)のEpisode 19 Briefを参照。

## 8. Series success after Episode 18

Before the series:

「野球で何が起きた？」

After Episodes 1–18:

読者は、PLAYER SYSTEM・BUSINESS SYSTEM・両者の相互作用・外部比較という内容に加え、

- **制度の動きを、自分でどの段階（CURRENT/PROPOSED/AGREED/EFFECTIVE）にあるか判定し、シリーズのどのtoolで読み解けばよいか**

という、シリーズを離れても使える方法を獲得した。次は、その方法を新しい個別制度（ポスティング）へ実際に適用する。

## 9. Final decision

- Episodes 1–18 overall: **PASS**
- Episode 18 toolkit-handoff quality: **PASS**（限界の明示を含む）
- Production quality: **PASS**（日付確認プロセスを新規標準化）
- Phase UI: **実装しない（Episode 14での最終判断を維持）**
- Episode 19: **INTERNATIONAL MOBILITY / POSTING SYSTEM — toolkit引き渡し後の最初の実践適用**

## 10. Better Question after Episode 18

Before:

「今度、野球のルールは何か変わるの？」

After:

**「この変化は今どの段階にあり、一次情報はどこで確認でき、シリーズのどのtoolで読み解けるのか。そして、そのtoolを使って、まだ扱っていない制度（ポスティングなど）を自分で読めるか？」**
