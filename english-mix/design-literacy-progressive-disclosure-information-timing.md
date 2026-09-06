---
id: design-literacy-progressive-disclosure-information-timing
title: "Progressive Disclosure――『全部見せる』でも『隠す』でもなく、必要なときに見せる"
subtitle: "English Mix｜Design Literacy #19｜Designing the Timing of Information"
created: "2026-09-06"
updated: "2026-09-06"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 19
abstract: "Progressive Disclosureを単なる『hide information to clean up the screen』ではなく、what stays visible, how people reveal more, and what they expect to find thereを設計するinformation timingとして捉える。Apple Human Interface Guidelines、Nielsen Norman Group、W3C WAIのcognitive accessibility guidanceを手掛かりに、Recognition、Discoverability、Simplicityとの緊張関係まで整理する。"
---

# Progressive Disclosure――「全部見せる」でも「隠す」でもなく、必要なときに見せる
## Design Literacy #19｜Designing the Timing of Information

**Good interfaces do not merely decide what information exists. They decide when it becomes visible.**

直前のDesign Literacy #18では、**Recognition over Recall**を扱った。

The idea was simple: ユーザーに意味を覚えさせるのではなく、visible cuesから「これや」と認識できるようにする。

But that creates an obvious tension.

見れば分かるように、every feature, explanation, and optionを最初から表示したらどうなるか。

今度はscreenがinformationで埋まる。

そこで必要になるのが**Progressive Disclosure（段階的開示）**だ。

Progressive Disclosure is not just a technique for hiding information and making a screen look cleaner.

**何を今見せ、何を後から見せ、how users discover what is hidden**まで設計する方法として理解すると、かなり使いやすくなる。

## 1. まず一言：Don’t just hide—create a sequence

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

Everything appears at the same level.

機能としては豊富。でもユーザーは最初からten decisionsを要求される。

そこで、

```text
通知
テーマ
文字サイズ
言語

[ 詳細設定 ]
```

として、必要になったときだけ、

```text
同期頻度
バックアップ形式
ログ出力
API設定
開発者モード
```

を開く。

Nothing was deleted.

**The information still exists. Its timing changed.**

AppleのHuman Interface GuidelinesはDisclosure Controlについて、detailsをrelevantになるまで隠し、frequently used controlsを上位に置き、advanced functionalityをdefaultでは隠すことを勧めている。

[Apple Human Interface Guidelines — Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)

So the main question is not:

```text
Can we hide this?
```

ではなく、

```text
When is this needed?
```

や。

## 2. 仕組み：Three decisions, not one

実務でProgressive Disclosureを使うなら、「詳細設定に入れる？」だけで考えない方がいい。

最低でもthree layersに分ける。

### 1. Initial Visibility

**What stays visible from the start?**

```text
frequent
important
required for the current task
```

頻繁に使う、重要、current taskに必要。このあたりはinitial viewへ残す。

### 2. Disclosure Path

**How do people reveal more?**

```text
[ 詳細設定 ]
[ 公開オプション ]
[ 高度な検索条件 ]
```

次のlayerへ進むcontrolがfindable and easy to operateである必要がある。

### 3. Information Scent

**Can people predict what is behind the control?**

```text
[ 詳細設定 ]
```

と、

```text
[ … ]
```

では、前者の方が「追加設定がありそう」とpredictionしやすい。

Nielsen Norman GroupのProgressive Disclosure解説でも、重要なのはthe right split between primary and secondary features、そしてsecondary levelへの進み方を明確にし、labelから先の内容を予測できるようにすることだと整理されている。

[Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)

つまり、

```text
WHAT stays visible?
HOW do I reveal more?
WHAT do I expect to find there?
```

をone setで考える。

## 3. Before → After：From feature list to task sequence

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

全部を最初からdisplayする。

ユーザーが「記事を書いて公開したい」だけでも、SEOやcanonical URLまで視界へ入る。

The interface is feature-complete, but the task hierarchy is flat.

### AFTER

```text
タイトル
本文
カテゴリー

[ 公開設定 ]
[ SEO・詳細設定 ]
```

まずwrite the article。

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

The number of features did not change.

**The interface started following the task sequence.**

機能一覧だったUIが、作業の順番を持ち始めた。

## 4. そのまま使える制作・修正指示

「項目が多いので詳細設定にまとめてください」だけでは、why those items are hiddenが残らない。

制作指示なら、こう言える。

> **すべての機能を同じ階層に並べず、利用頻度・重要度・現在のタスクで必要になるタイミングを基準に、初期表示と後段表示を分けてください。初期画面には主要操作を残し、secondary / advancedな項目は、内容を予測できる明確なDisclosure Controlから展開できる構造にしてください。**

For review, use three questions.

> **“Does this need to be visible now?”**

> **“If we hide it, will people know it exists when they need it?”**

> **“Before opening it, can they predict what they’ll find?”**

この三問で、単なるclean-looking UIからかなり離れられる。

## 5. Accessibilityとの接続：W3C does not require Progressive Disclosure itself

ここはFACTとINTERPRETATIONを分ける。

W3C WAIのCognitive Accessibility supplemental guidanceでは、page contentをlogical sectionsへ整理すること、clear structure and hierarchyを持たせること、whitespaceなどでgroupingを示すことが推奨されている。

また、clear and understandable contentのObjectiveでは、short blocksやsmall chunks、good visual layoutが理解を助けると説明されている。

[W3C WAI — Use a Clear and Understandable Page Structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/)

[W3C WAI — Use Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/)

That is the FACT from the source.

**W3C does not make “use Progressive Disclosure” a WCAG Success Criterion.**

ここからmodern UIへ引けるINTERPRETATIONはこうなる。

Logical chunkingとprimary / secondary informationの区別は、Progressive Disclosureを設計するときのstrong foundationになる。

But hiding does not automatically reduce cognitive load.

ユーザーが「where did it go?」「I didn’t know this feature existed」となれば、別の負荷を作る。

## 6. 別レイヤーとの接続：Simplicity is not Minimalism

Progressive Disclosureを「screenからitemsを減らす技術」とだけ理解すると、Minimalismへ寄りすぎる。

Appleの2026年Design Principlesでは、Simplicityについて、必要なものへfocusし、重要なものをclose byに置く考え方を示しつつ、**Simplicity isn’t minimalism**と明示している。

[Apple Human Interface Guidelines — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)

So this equation is weak:

```text
less information
=
simpler interface
```

What matters more is:

```text
priority
+
sequence
+
discoverability
```

つまりSimplicityは「どれだけ削ったか」ではなく、**what gets priority and what can wait**を明確にすることとして読む方が強い。

## 7. 誤解しやすい点：Low frequency does not automatically mean hidden

たとえばfile menuの、

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

を全部入れる。

The screen becomes clean.

でも「共有できる」というfeature自体を知らない人には、その機能はほぼ存在しない。

**Hidden content has a discoverability cost.**

だからfrequencyはone variableでしかない。

次も見る。

```text
importance
frequency
risk
context
user expertise
discoverability
```

年に一度でもcriticalな操作なら、findabilityが必要かもしれない。

頻繁に使わなくても、knowing that the feature exists自体が重要な場合もある。

## 8. 以前の学びとの接続：Recognition and Progressive Disclosure are not opposites

Design Literacy #18では、Recognition over Recallとして、選択肢や意味をvisible cuesから認識できるようにすることを見た。

Progressive Disclosure, meanwhile, hides some information at first.

一見すると、

```text
Recognition
= show it

Progressive Disclosure
= hide it
```

で矛盾している。

But they answer different questions.

```text
Recognition
= Can I understand what is visible?

Progressive Disclosure
= What should be visible now?
```

ここで前より解像度が上がる。

**Visibility and intelligibility are different design decisions.**

「見せるか」と「見せたものを理解できるか」はseparate design decisionsや。

Pictogramまで戻すと、

```text
Pictogram
= HOW to compress meaning

Recognition
= HOW to identify meaning

Progressive Disclosure
= WHEN to reveal meaning
```

になる。

UIは情報のcontentやpositionだけでなく、**the timing of information**まで設計している。

## 9. 30秒でできる観察

普段使うappで、次のどれかを探す。

```text
詳細設定
もっと見る
…
∨
Advanced
```

見つけたらthree questions。

**1. Why is this hidden?**

本当にsecondary / advancedだからか。

**2. Would I know it exists?**

初見でも、その先があると気づけるか。

**3. Can I predict what is behind it?**

labelから、開いた先を予想できるか。

If all three have good answers, the disclosure is probably doing useful work.

## 10. 次につながる概念：Information Scent

Progressive Disclosureには、hidden informationへの入口が必要になる。

そこで次に効くのが**Information Scent**。

```text
[ 詳細設定 ]
```

を見れば、「ここに追加設定がありそう」とpredictできる。

```text
[ … ]
```

では、そのpredictionが弱いかもしれない。

The next question becomes:

**“Does this label make people expect the information they want is behind it?”**

```text
Progressive Disclosure
= when to hide / reveal

Information Scent
= how to signal what lies beyond
```

ここからNavigation、Information Architecture、search designへつながる。

---

## 今日の中心命題

**Progressive disclosure is not about hiding complexity. It is about revealing complexity when it becomes useful.**

日本語なら、

**Progressive Disclosureは、複雑さを消すことではない。必要になったときに、必要な複雑さを渡すこと。**

実務では、

```text
WHAT stays visible?
HOW do users reveal more?
WHAT do they expect to find there?
```

を見る。

「screenがcleanになった」で終わらず、**information timing and discoverability**まで設計できているかを確認する。

そこまで見ると、Progressive Disclosureは収納テクニックではなく、Information Architectureそのものとして見えてくる。

## 参考資料

- [Apple Human Interface Guidelines — Disclosure controls](https://developer.apple.com/design/human-interface-guidelines/disclosure-controls)
- [Apple Human Interface Guidelines — Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Apple Human Interface Guidelines — Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles)
- [Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- [W3C WAI — Use a Clear and Understandable Page Structure](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o2p03-page-structure/)
- [W3C WAI — Use Clear and Understandable Content](https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/)
