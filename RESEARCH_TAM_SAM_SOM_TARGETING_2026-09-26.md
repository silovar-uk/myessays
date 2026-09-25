# RESEARCH｜TAM・SAM・SOMをターゲット論として読み直す

Date: 2026-09-26
Target article: tam-sam-som-target-is-not-the-center

## 0. Research Question

TAM・SAM・SOMは、しばしば三重の円として説明される。その見た目から「外側の広い市場を、内側のターゲットへ絞っていく道具」と理解しやすい。しかしマーケティングの標的設定（Targeting）と、市場規模推計としてのTAM・SAM・SOMは本当に同じものなのか。

中心仮説：

> TAM・SAM・SOMは「誰を狙うか」を自動的に決める枠組みではない。市場の上限、現在の提供可能範囲、現実的な獲得可能範囲を区別する市場規模の枠組みであり、標的市場の選択はその間に置かれる別の戦略判断である。

## 1. First Research｜定義の足場

### TAM

アマゾン広告（Amazon Ads）はTAMを、製品・サービスが市場の100%を獲得した場合の総売上機会として説明している。基本形は「潜在顧客数×顧客当たり平均売上」。

Source:
https://advertising.amazon.com/library/guides/tam-sam-som

### SAM

同資料はSAMを、TAMのうち自社にとって到達可能かつ関連性のある部分として説明し、地域や人口属性などで絞るとしている。

ただし略語の展開には表記揺れがある。

- Amazon Ads: Serviceable Addressable Market
- Salesforce US: Serviceable Addressable Market
- Salesforce Japan: Serviceable Available Market
- Antler: 見出し・本文でServiceable Addressable / Availableの両表記が混在

したがって本文では「SAM（提供可能市場）」を編集上の日本語ラベルとして用い、英語の展開は資料間で揺れることを明示する。

Sources:
https://advertising.amazon.com/library/guides/tam-sam-som
https://www.salesforce.com/blog/total-addressable-market/
https://www.salesforce.com/jp/blog/tam-sam-som/
https://www.antler.co/blog/tam-sam-som

### SOM

Amazon AdsとSalesforceは、SAMのうち競争環境、ブランド認知、予算、供給能力、事業モデルなどを踏まえて現実的に獲得可能な部分として説明する。

一方、Antlerは「実際にサービスしている市場」という現在実績寄りの説明も行う。その後、将来の仮想SOM推計も可能としている。

したがって本文では「SOM（獲得可能市場）」を基本とし、「実績値として使う資料と、将来の現実的な獲得見込みとして使う資料がある。期間と定義を明記する」とする。

Sources:
https://advertising.amazon.com/library/guides/tam-sam-som
https://www.salesforce.com/blog/total-addressable-market/
https://www.antler.co/blog/tam-sam-som

## 2. Targeting｜ターゲットは何を決めるのか

フィリップ・コトラー（Philip Kotler）はアメリカン・マーケティング協会（American Marketing Association）の記事で、現代マーケティングの主要な考え方としてSTPを挙げ、「標的顧客を選ぶ」ために市場細分化・標的設定・位置づけ（Segmentation, Targeting, Positioning）を使うと説明している。

ここでの動詞は「選ぶ」。SAMの動詞は「提供できる」、SOMの動詞は「獲得できる」。同じ「小さくする」でも意味が違う。

Source:
https://www.ama.org/2024/03/12/a-lifetime-in-marketing-lessons-learned-and-the-way-ahead-by-philip-kotler/

補強：
AMAのフレームワーク解説も、Targetingを複数セグメントから価値の高い顧客セグメントを選ぶ段階として説明している。

Source:
https://www.ama.org/marketing-news/ultimate-guide-to-marketing-frameworks-models-examples-and-step-by-step-applications/

## 3. Market Size｜大きい数字を出すことと、説明可能な数字を出すことは違う

セコイア・キャピタル（Sequoia Capital）は投資家向け説明で、市場規模について「利用者・顧客が何人いるか」「その数がどう増えるか」「一人当たりの価値はいくらか」を説明するよう勧め、市場調査の巨大な数字だけを詳細なしで掲げることを戒めている。

短い原文引用：
“One thing not to do is to put up huge numbers from some market study without any details behind them.”

Source:
https://articles.sequoiacap.com/how-to-present-to-investors

ベッセマー・ベンチャー・パートナーズ（Bessemer Venture Partners）は米国医療の例で、産業全体が巨大でも一社のTAMが産業全体と同じにはならないとし、「Market definition matters」と強調する。

Source:
https://staging.bvp.com/atlas/roadmap-10-laws-of-healthcare

Salesforceは積み上げ推計（bottom-up）について、実際の顧客数・単価などから計算するため推計を分解しやすいと説明する。

Source:
https://www.salesforce.com/blog/total-addressable-market/

## 4. Target ≠ SOM｜混同を壊す三つの問い

実務上、次の三つの問いを分ける。

1. 提供できるか → SAM
2. その中で優先して狙うか → Target
3. 期間内にどこまで獲得できるか → SOM

標的市場は、提供可能な市場の中から戦略的に選ぶ。SOMは、その選択を含む戦略・競合・資源・供給能力などを通過した獲得可能性の見積もりになる。

この順序は「Targetが常にSAMとSOMの数学的な中間集合でなければならない」という意味ではない。概念上の役割を分けるための実務整理。

## 5. Stress Tests｜極端な条件で枠組みを壊してみる

### A. 固定席数のイベント

思考実験。需要が巨大でも、一試合・一公演の供給上限は座席数で止まる。SOMは広告で無限に広がらない。開催日、移動時間、価格、残席などが提供可能性と獲得可能性の両方へ入る。

示唆：
「市場にいる人」と「この商品をこの条件で買える人」は違う。

### B. 意図的に狭く売る高価格商品

思考実験。技術的には広い顧客に提供できても、ブランドや採算のため特定セグメントだけを優先することがある。

示唆：
SAMが広くてもTargetを狭く選べる。Targetは提供能力ではなく意思決定。

### C. 新しいカテゴリ

思考実験。製品機能、価格、流通、規制、市場定義が変わればTAMそのものが動く。

示唆：
三つの円は自然界に埋まっている固定値ではなく、定義と仮定の産物。

## 6. Sports Promotion Translation｜試合プロモーションへ翻訳する

スタートアップ用語をそのまま持ち込むより、次の四段階に翻訳する。

- 市場全体：何の需要を市場と定義するか
- 来場可能母集団：日程、距離、価格、販売地域、座席などを踏まえて提供・到達できる範囲
- 戦略ターゲット：その中で今回、資源を集中する層
- 獲得見込み：媒体、予算、認知、転換率、残席などから期間内に追加で獲得できる範囲

注意：
既存購入者と新規獲得見込みを二重計上しない。人口そのものをTAMと置かず、商品カテゴリ、単位、期間を定義する。

## 7. Japanese Terminology Audit｜日本語版の表記方針

固定訳として断定せず、本稿の実務用ラベルと明記する。

- Total Addressable Market → TAM（総潜在市場）
- Serviceable Addressable / Available Market → SAM（提供可能市場）
- Serviceable Obtainable Market → SOM（獲得可能市場）
- Segmentation, Targeting, Positioning → 市場細分化・標的設定・位置づけ（STP）
- Target Market → 標的市場
- top-down → 全体から絞る推計
- bottom-up → 積み上げ推計
- market share → 市場占有率
- annualized revenue → 年換算売上

日本語版では英語を説明なしで裸にしない。固有名詞は日本語名の後に原語を括弧で置く。

## 8. Overclaim Audit｜書かないこと

- 「TAM・SAM・SOMには世界で唯一の公式定義がある」
- 「SAMは必ずServiceable Addressable Marketで、Availableは誤り」
- 「SOMは必ず将来予測」「SOMは必ず現在実績」と一方だけに固定する
- 「ターゲット市場=SOM」と同一視する
- 「大きいTAMほど良い事業」とする
- 「積み上げ推計なら必ず正しい」とする
- 思考実験を実証研究の結論として書く
- スポーツの例に未調査の実数を置く

## 9. Final Thesis

> TAMは「どれだけあるか」、SAMは「どこまで提供できるか」、Targetは「誰に集中するか」、SOMは「どこまで獲得できるか」。

調べる前は三重の円に見える。調べた後は、三つの市場規模と、その間に置かれる一つの戦略判断に見える。
