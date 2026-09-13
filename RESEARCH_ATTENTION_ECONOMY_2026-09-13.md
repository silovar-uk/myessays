# Research Notes — Attention Economy

Date: 2026-09-13
Article ID: `attention-economy-one-minute-190-years`

## 0. 研究の狙い

アテンションエコノミーを「SNSは時間泥棒」「無料ならあなたが商品」という定型句だけで説明しない。

中心の問いは次の二つ。

- 無料サービスの代金を「円」ではなく「分」で請求したら、見え方はどう変わるか。
- attention economyで実際に希少・計測・取引されているものは何か。

記事としては、日常的な「1分」という小ささから入り、経済・広告・プライバシー・割り込み研究へ拡張し、最後は「誰の目的に注意が配分されているか」という問いへ戻す。

---

## 1. フック候補の検討

### 採用

**1億人から1分ずつ集めると、1億分。1人が連続して使う時間に換算すると約190年。**

計算：

- 100,000,000分 ÷ 60 = 約1,666,667時間
- ÷ 24 = 約69,444日
- ÷ 365 = 約190.3年

注意：これは特定サービスの実測利用時間ではない。規模の効果を可視化する思考実験。

### 不採用

- 「あなたは商品だ」から始める：キャッチーだが記事の結論を先取りし、しかも厳密には雑。
- 「スマホは麻薬だ」：科学的・倫理的に過剰。依存症の診断概念と混同しやすい。
- 「通知後は23分集中できない」：広く流通する数字だが、今回確認した一次研究から記事の文脈でそのまま一般化するのは避けた。

---

## 2. 一次資料・主要資料

### Herbert A. Simon — 1971

Source:
https://digitalcollections.library.cmu.edu/node/45427

Paper:
“Designing Organizations for an Information-Rich World”

確認したこと：

- 情報が豊富になると、情報が消費する資源＝受け手のattentionが相対的に希少になるという構図。
- 原文は「rabbit-rich world / lettuce-poor world」の比喩からscarcityへ入る。
- attentionの消費量を受け手が費やす時間で見る考え方がある。
- 情報の生産・伝達コストだけでなく、受け取る側のscarce attentionのコストを見る必要があるという発想。
- 情報処理システムは、情報を増やすだけではなくattention conserver / information condenserとして設計されるべき、という方向がある。

記事への意味：

「アテンションエコノミー＝SNSの発明」ではない。情報過多とattention scarcityの構造はSNS以前から議論されている。

### Michael H. Goldhaber — 1997

Source:
https://doi.org/10.5210/fm.v2i4.519

Paper:
“The Attention Economy and the Net”

確認したこと：

- ネット上では情報は豊富でコピー可能であり、scarce resourceとしてattentionを見る。
- 情報とattentionが逆方向に流れる、という理解につながる。
- Goldhaberのattention economyは単なる「広告ビジネスの別名」より広い議論。

Related source:
https://firstmonday.org/ojs/index.php/fm/article/download/537/458

“What’s the Right Economics for Cyberspace?”

重要な修正点：

- Goldhaberは、広告主が買うのはattentionそのものではなく、attentionを得るchanceだと区別している。
- よって「広告会社があなたの注意をそのまま売買している」は比喩としては分かりやすいが、事実描写としては強すぎる。

### Meta Platforms — 2025 Form 10-K

Source:
https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm

確認したこと：

- 広告収益はFacebook、Instagram、Messenger等で広告商品を表示することで生まれる。
- marketerの支払いはimpressions deliveredやclick等のactionsに基づく。
- impression-based adsは表示された期間、action-based adsは契約された行動が起きた期間に収益認識。
- Metaはadvertising inventoryをcontrolしていると説明している。

記事への意味：

attentionを直接の計量単位として販売しているわけではない。広告在庫、表示機会、表示、行動が会計・取引の単位になっている。

### Alphabet — 2025 Form 10-K

Source:
https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm

確認したこと：

- advertising monetizationの指標としてpaid clicks / cost-per-click、impressions / cost-per-impressionを説明。
- paid clickはuser engagementを示す。
- impressionはGoogle Network上でユーザーへ表示された広告の表示回数。

記事への意味：

Metaと合わせ、広告経済の具体的な測定単位を示す根拠として使用。

### Federal Trade Commission — 2024

Source:
https://www.ftc.gov/reports/look-behind-screens-examining-data-practices-social-media-video-streaming-services

Report:
“A Look Behind the Screens: Examining the Data Practices of Social Media and Video Streaming Services”

確認したこと：

- 大手ソーシャルメディア・動画配信企業の大規模なデータ収集・保持を調査。
- 多くの企業で、特にtargeted advertisingを通じた収益化が大量データ収集の事業上のincentiveになるとFTC staffが指摘。
- privacy riskとの緊張関係を指摘。

記事への意味：

「データを売っている」と一括りにせず、「広告モデルがデータ収集を促すincentiveを持ちうる」と限定して書く。

### Gloria Mark, Daniela Gudith, Ulrich Klocke — CHI 2008

Source:
https://doi.org/10.1145/1357054.1357072

Paper:
“The Cost of Interrupted Work: More Speed and Stress”

確認したこと：

- 実験では、割り込みを受けた参加者はタスクをより短い時間で完了し、qualityに有意な差は見られなかった。
- 一方で、より速く働いて割り込みを補償した可能性が示され、stress、frustration、time pressure、effortの増加が報告された。

記事への意味：

「割り込み＝必ず作業時間が伸びる」とは書かない。コストがpsychological strainやpaceの増加として出る可能性を扱う。

---

## 3. 再リサーチで修正した主張

### 修正1：「あなたの注意が売られている」

初期仮説：
広告主がユーザーのattentionを買う。

修正後：
広告主が具体的に買う／課金されるのは広告在庫、impressions、clicks、actions等。attentionはそれらの価値を成立させる希少条件と捉えるほうが正確。

理由：Goldhaber自身の区別、Meta/Alphabetの開示。

### 修正2：「無料ならあなたが商品」

初期仮説：
無料サービスではユーザー自身が商品。

修正後：
比喩としては有用だが、事業モデルの実態を説明するには粗い。ユーザー、広告在庫、データ、ターゲティング、表示・反応機会の関係へ分解する。

### 修正3：「通知は仕事を遅くする」

初期仮説：
interruptionはtask completion timeを必ず増やす。

修正後：
Mark et al. (2008)ではむしろ短時間で終了し、質に差がなく、stress等が増えた。『コストは時間だけに出る』という前提を捨てる。

### 修正4：「企業は個人データを売っている」

初期仮説：
広告モデル＝個人データそのものの販売。

修正後：
企業・サービスごとの実態を無視した一般化は避ける。FTCが示すのは、targeted advertising等のbusiness modelがmass data collectionを促すincentiveとprivacy riskを持つという点。

### 修正5：「アルゴリズム＝attentionを奪う装置」

初期仮説：
recommendation / filteringは滞在を延ばすための仕組み。

修正後：
良い検索・フィルタ・推薦はユーザーが使うattentionを節約しうる。問題はalgorithmの存在ではなくoptimization targetとincentive alignment。

---

## 4. 事実と解釈の境界

### 事実として扱う

- Simonの1971年論考の存在とattention scarcityの議論。
- Goldhaberの1997年論文とattention economy論。
- Meta/AlphabetのForm 10-Kに記載された広告課金・収益認識・指標。
- FTC staff reportの調査結果。
- Mark et al. 2008の実験結果。

### 解釈・比喩として明示する

- 「注意は広告在庫の価値を成立させる前提条件」：上記資料を統合した説明。
- 「1分×1億人＝190年」：toy model。
- 「10サービス×5分＝12.7日/年」：toy model。
- 「請求書を分で見る」：記事の思考フレーム。
- 「attentionはtimeだけでなくdirection」：筆者の結論・解釈。

---

## 5. “もう一歩やりすぎる”調査方法

今回実行したもの：

1. **極端な規模変換**
   - 1分という微小量を1億人へ拡張。
   - 個人側では5分×10サービス×365日へ拡張。
   - 数字は実測値と混同しない。

2. **一次資料に戻ってキャッチコピーを壊す**
   - 「あなたが商品」「attentionが売られる」をForm 10-KとGoldhaber原文で検査。

3. **反証を探す**
   - interruption研究を「集中力低下の証拠」だけ探さず、逆の結果がないか確認。
   - その結果、作業時間はむしろ短縮、stress増というnuanced findingを採用。

4. **反対側の効用を探す**
   - algorithm / recommendationがattentionをsaveする場合も入れる。
   - 批判対象をtechnologyからincentive designへずらす。

---

## 6. 記事構造

1. 1分×1億人＝約190年という違和感。
2. 「無料の請求書を分で出す」問い。
3. Simonのウサギとレタス → scarcity of attention。
4. Goldhaber → informationではなくattentionを見る。
5. 再調査 → attentionそのものは売買単位ではない。
6. FTC → data collection / targeted advertising / privacy。
7. interruption研究 → 時間以外のコスト。
8. toy modelを拡張 → scaleの異様さ。
9. counterpoint → algorithmはattentionをsaveできる。
10. 「誰の何を最適化しているか」へ問いを更新。
11. 最初の1分に戻り、「まあいいかサイズの時間」として再解釈。

---

## 7. Voice / VOICE LOSS チェック

残すべき筆者の動き：

- 最初は「SNSが時間を奪う話」程度に考えていた。
- 「あなたが商品」という分かりやすい説明に一度納得する。
- 調べ直して、それが雑だと分かる。
- interruption研究の逆説的結果で困る。
- 自分の実感（仕事は終わるが夕方に疲れている）へ戻る。
- 最後は『全部取り返す』という禁欲論には行かない。
- 好きな動画や友人のどうでもいいメッセージにもattentionを渡したいという欲求を明示する。

VOICE LOSS判定：

- 「注意は有限なので適切に管理しましょう」で終わる → LOSS
- 「SNS企業は悪い」で単純化する → LOSS + FACTUAL LOSS
- 研究の例外を消して主張をきれいにする → LOSS
- 感情語を全部削り、教科書調にする → LOSS

---

## 8. English-mix設計

- 日本語を主言語に維持。
- English ratio目安40%。
- 英文は学習しやすい短文中心。
- 逐語訳ではなく、論旨のpivotになる文をEnglishへ置く。
- Key chunks:
  - `One minute feels tiny.`
  - `Free is not always zero-cost.`
  - `The weird part is scale.`
  - `Attention is not only time. It is direction.`
  - `What is this system optimizing for, and whose outcome gets better?`
- 技術語はEnglishのままでも意味が推測できる位置に置く。

---

## 9. 最終ファクトチェック

- 190年：100,000,000 minutesを365日/年換算すると約190.3年。四捨五入して「約190年」。
- 12.7日：50 minutes/day × 365 = 18,250 minutes = 約304.2 hours = 約12.7 days。
- どちらもtoy modelであり、実利用統計として提示しない。
- Simonを「attention economyという語の命名者」とは書かない。
- Goldhaberの1997論文を単なる広告論として扱わない。
- Meta/Alphabetについて「個人データを販売している」と断定しない。
- interruptionについて「必ず生産性が下がる」と一般化しない。

---

## 10. Sources

- Herbert A. Simon archive record: https://digitalcollections.library.cmu.edu/node/45427
- Michael H. Goldhaber, 1997: https://doi.org/10.5210/fm.v2i4.519
- Michael H. Goldhaber, 1997 rejoinder: https://firstmonday.org/ojs/index.php/fm/article/download/537/458
- Meta 2025 Form 10-K: https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm
- Alphabet 2025 Form 10-K: https://www.sec.gov/Archives/edgar/data/1652044/000165204426000018/goog-20251231.htm
- FTC staff report, 2024: https://www.ftc.gov/reports/look-behind-screens-examining-data-practices-social-media-video-streaming-services
- Mark, Gudith & Klocke, CHI 2008: https://doi.org/10.1145/1357054.1357072
