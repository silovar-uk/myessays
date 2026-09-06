---
id: design-literacy-progressive-disclosure-information-timing
title: "Progressive Disclosure――『全部見せる』でも『隠す』でもなく、必要なときに見せる"
subtitle: "Design Literacy #19｜情報量ではなく、情報のタイミングを設計する"
created: "2026-09-06"
updated: "2026-09-06"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Progressive Disclosure", "Information Architecture", "Cognitive Load", "Disclosure Control", "Recognition", "Discoverability", "Accessibility", "UI"]
keywords: ["progressive disclosure", "disclosure control", "information architecture", "cognitive load", "recognition", "discoverability", "advanced settings", "information timing", "Apple HIG", "W3C cognitive accessibility", "Nielsen Norman Group"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 19
abstract: "Progressive Disclosureを単なる『情報を隠して画面をすっきりさせる技術』ではなく、何を最初から見せ、何を後から開示し、その先に何があると予測させるかを決める情報の時間設計として捉える。Apple Human Interface Guidelines、Nielsen Norman Group、W3C WAIの認知アクセシビリティ資料を手掛かりに、Recognition、Discoverability、Simplicityとの緊張関係まで整理する。"
---

# Progressive Disclosure――「全部見せる」でも「隠す」でもなく、必要なときに見せる
## Design Literacy #19｜情報量ではなく、情報のタイミングを設計する

**Good interfaces do not merely decide what information exists. They decide when it becomes visible.**

直前のDesign Literacy #18では、Recognition over Recallを扱った。

「ユーザーに覚えさせるのではなく、見れば意味が分かる手掛かりを置く」という話だった。

ただ、ここにはすぐ矛盾が出てくる。

見れば分かるように、すべての機能、説明、選択肢を最初から表示したらどうなるか。

今度は、画面が情報で埋まる。

そこで必要になるのが**Progressive Disclosure（段階的開示）**だ。

Progressive Disclosureは、単に情報を隠して画面をきれいにする技術ではない。

**何を今見せ、何を後から見せ、ユーザーがどうやってその存在に気づくかを設計する方法**として理解すると、かなり使いやすくなる。

## 1. まず一言：「隠す」ではなく「順番をつくる」

設定画面を想像する。

```text
通知
テーマ
文字サイズ
言語
データ保存
同期頻度
バックアップ形式
ログ出力
API設定
開発者モード
```

すべてが同じ階層で並んでいる。

機能としては豊富だが、ユーザーは最初から十個の判断を要求される。

そこで、

```text
通知
テーマ
文字サイズ
言語

[ 詳細設定 ]
```

とし、必要なときだけ、

```text
同期頻度
バックアップ形式
ログ出力
API設定
開発者モード
```

を開く。

ここで起きているのは、情報の削除ではない。

**The information still exists. Its timing changed.**

情報は存在している。ただ、現れるタイミングが変わった。

AppleのHuman Interface GuidelinesはDisclosure Controlについて、詳細をrelevantになるまで隠し、よく使われるcontrolsを上位に置き、advanced functionalityを初期状態では隠すことを勧めている。

[Apple Human Interface Guidelines — Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)

つまりProgressive Disclosureの中心は、

```text
Hide?
```

ではなく、

```text
When is this needed?
```

という問いにある。

## 2. 仕組み：三つの判断に分ける

Progressive Disclosureを実務で使うなら、「詳細設定に入れるかどうか」だけで考えない方がいい。

最低でも、次の三つに分ける。

### 1. Initial Visibility

**最初から何を見せるか。**

```text
frequent
important
required for the current task
```

頻繁に使うもの、重要なもの、今のタスクに必要なものは、基本的に初期画面へ残す。

### 2. Disclosure Path

**隠れた情報へどう進むか。**

```text
[ 詳細設定 ]
[ 公開オプション ]
[ 高度な検索条件 ]
```

次の層へ進むcontrolが、見つけやすく操作しやすい必要がある。

### 3. Information Scent

**開く前に、その先に何があると予測できるか。**

```text
[ 詳細設定 ]
```

と、

```text
[ … ]
```

では、前者の方が「何か追加設定がある」と予測しやすい。

Nielsen Norman GroupのProgressive Disclosure解説でも、重要なのは、primaryとsecondary featuresを適切に分けること、そしてsecondary levelへの進み方を明確にし、そのlabelから先の内容を予測できるようにすることだと整理されている。

[Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)

つまり、

```text
WHAT stays visible?
HOW do I reveal more?
WHAT do I expect to find there?
```

の三つをセットで考える。

## 3. Before → After：機能一覧から、作業の順番へ

記事投稿画面を例にする。

### BEFORE

```text
タイトル
本文
カテゴリー
タグ
公開日時
OG画像
SEOタイトル
SEO説明
canonical URL
noindex
SNSカード
スラッグ
```

全部を最初から表示する。

ユーザーが「記事を書いて公開したい」だけでも、SEOやcanonical URLまで視界へ入ってくる。

これは機能としては正直だが、**task hierarchyがない**。

### AFTER

```text
タイトル
本文
カテゴリー

[ 公開設定 ]
[ SEO・詳細設定 ]
```

まず、記事を書く。

公開条件が必要になったら、

```text
公開日時
公開範囲
```

を開く。

SEOが必要な人だけ、

```text
SEOタイトル
SEO説明
canonical URL
noindex
```

へ進む。

ここで変わったのは、機能数ではない。

**The interface started following the task sequence.**

機能一覧だったUIが、作業の順番を持ち始めた。

## 4. そのまま使える制作・修正指示

「項目が多いので詳細設定にまとめてください」だけでは、何を隠すかの根拠が残らない。

制作指示なら、こう言える。

> **すべての機能を同じ階層に並べず、利用頻度・重要度・現在のタスクで必要になるタイミングを基準に、初期表示と後段表示を分けてください。初期画面には主要操作を残し、secondary / advancedな項目は、内容を予測できる明確なDisclosure Controlから展開できる構造にしてください。**

レビューなら、三問に分けると使いやすい。

> **「これは今、見えている必要がありますか？」**

> **「隠した場合、必要なときに存在へ気づけますか？」**

> **「開く前に、その先に何があると予測できますか？」**

この三問で、単なる「すっきりしたUI」からかなり離れられる。

## 5. Accessibilityとの接続：W3Cが求めているのはProgressive Disclosureそのものではない

ここはFACTとINTERPRETATIONを分けたい。

W3C WAIのCognitive Accessibility supplemental guidanceでは、ページをlogical sectionsへ整理すること、明確なstructureとhierarchyを持たせること、whitespaceなどでgroupingを示すことが推奨されている。

また、clear and understandable contentのObjectiveでは、short blocksやsmall chunks、良いvisual layoutが理解を助けると説明されている。

[W3C WAI — Use a Clear and Understandable Page Structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/)

[W3C WAI — Use Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/)

ここまでが資料から確認できるFACT。

**W3Cが「Progressive Disclosureを使え」とWCAGのSuccess Criterionとして要求しているわけではない。**

ここから現代UIへ引けるINTERPRETATIONは、こうなる。

情報をlogical chunksへ分け、主要なタスクと補助的な情報を区別する考え方は、Progressive Disclosureを設計するときの重要な土台になる。

ただし、隠せば自動的に認知負荷が下がるわけではない。

ユーザーが「どこに行ったか分からない」「機能の存在に気づかない」となれば、別の負荷を作る。

## 6. 別レイヤーとの接続：SimplicityはMinimalismではない

Progressive Disclosureを「画面から項目を減らす技術」とだけ理解すると、Minimalismへ寄りすぎる。

Appleの2026年のDesign Principlesでは、Simplicityについて、必要なものへ集中し、重要なものを近くに置く考え方を示しつつ、**Simplicity isn’t minimalism**と明示している。

[Apple Human Interface Guidelines — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)

ここから見えるのは、

```text
less information
=
simpler interface
```

ではないということ。

本当に必要なのは、

```text
priority
+
sequence
+
discoverability
```

だ。

つまりSimplicityは「減らす量」ではなく、**何を優先し、何を後回しにするかを明確にすること**として読む方が強い。

## 7. 誤解しやすい点：「低頻度なら隠せばいい」

これも危ない。

たとえば、ファイル操作のメニューが、

```text
⋮
```

の中に、

```text
共有
複製
書き出し
名前変更
削除
```

を全部持っているとする。

画面はきれいになる。

でも「共有できる」という機能自体を知らない人には、その機能が存在しないのと近くなる。

**Hidden content has a discoverability cost.**

だから「低頻度」は一つの判断材料でしかない。

次も見る必要がある。

```text
importance
frequency
risk
context
user expertise
discoverability
```

年に一度しか使わなくても、重大な操作なら見つけやすさが必要かもしれない。

頻繁に使わなくても、その機能の存在を知っていること自体が重要な場合もある。

## 8. 以前の学びとの接続：RecognitionとProgressive Disclosureは対立していない

Design Literacy #18では、Recognition over Recallとして、選択肢や意味を画面上の手掛かりから認識できるようにすることを見た。

一方、Progressive Disclosureは一部の情報を初期状態から隠す。

一見すると、

```text
Recognition
= 見せたい

Progressive Disclosure
= 隠したい
```

で矛盾している。

でも、問いが違う。

```text
Recognition
= 見えているものの意味が分かるか？

Progressive Disclosure
= 今、何を見せるべきか？
```

ここで前より解像度が上がる。

**Visibility and intelligibility are different design decisions.**

「見せるか」と「見せたものを理解できるか」は別々に設計する必要がある。

さらにPictogramまで戻すと、

```text
Pictogram
= HOW to compress meaning

Recognition
= HOW to identify meaning

Progressive Disclosure
= WHEN to reveal meaning
```

になる。

UIは、情報の内容や配置だけでなく、**情報が現れる時間まで設計している**。

## 9. 30秒でできる観察

普段使うアプリで、次のどれかを探す。

```text
詳細設定
もっと見る
…
∨
Advanced
```

見つけたら、三問。

**1. Why is this hidden?**

本当にsecondary / advancedだからか。

**2. Would I know it exists?**

初見でも、その先があると気づけるか。

**3. Can I predict what is behind it?**

labelから、開いた先の内容を予想できるか。

三つとも答えられれば、そのDisclosureはかなり筋がいい。

## 10. 次につながる概念：Information Scent

Progressive Disclosureでは、隠れた情報への入口が必要になる。

そこで次に効くのが**Information Scent**。

```text
[ 詳細設定 ]
```

を見たとき、「ここに追加設定がありそう」と予測できる。

```text
[ … ]
```

では、その予測が弱いかもしれない。

つまり次の問いは、

**「このラベルやリンクから、行き先に欲しい情報がありそうと感じられるか？」**

になる。

```text
Progressive Disclosure
= when to hide / reveal

Information Scent
= how to signal what lies beyond
```

ここからNavigation、Information Architecture、検索設計までつながっていく。

---

## 今日の中心命題

**Progressive disclosure is not about hiding complexity. It is about revealing complexity when it becomes useful.**

日本語なら、

**Progressive Disclosureは、複雑さを消すことではない。必要になったときに、必要な複雑さを渡すこと。**

そして実務では、もう一段具体的に、

```text
WHAT stays visible?
HOW do users reveal more?
WHAT do they expect to find there?
```

を見る。

「画面がすっきりした」で終わらず、**情報のタイミングと発見可能性まで設計できているか**を確認する。

そこまで見れば、Progressive Disclosureは単なる収納テクニックではなく、Information Architectureそのものとして見えてくる。

## 参考資料

- [Apple Human Interface Guidelines — Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)
- [Apple Human Interface Guidelines — Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Apple Human Interface Guidelines — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)
- [Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [W3C WAI — Use a Clear and Understandable Page Structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/)
- [W3C WAI — Use Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/)
