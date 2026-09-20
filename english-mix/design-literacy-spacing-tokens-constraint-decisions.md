---
id: design-literacy-spacing-tokens-constraint-decisions
title: "8pxを守ることより、「選択肢を減らす」ほうが本質だった"
subtitle: "English Mix｜Design Literacy #61｜Spacing Scales as Decision Infrastructure"
created: "2026-09-19"
updated: "2026-09-20"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
tags: ["Design Literacy", "Design System", "Design Token", "Spacing", "Constraint", "UI"]
keywords: ["design token", "spacing scale", "semantic token", "constraint", "design system", "decision infrastructure", "DTCG"]
series: "Design Literacy｜細部から思想まで"
seriesOrder: 61
abstract: "なぜ13pxではなく8pxや16pxを使うのか。8の倍数だから美しい、ではなく、無限の選択肢から意味のない判断を減らし、チームで再利用できる語彙をつくるという観点からSpacing ScaleとDesign Tokenを捉え直す。"
---

# 8pxを守ることより、「選択肢を減らす」ほうが本質だった
## Design Literacy #61｜Spacing ScaleからDesign Tokenを「判断のインフラ」として読む

CSS does not get angry at 13px. 17px or 23px will work just fine. The browser does not care.

なのにDesign Systemは、わざわざ4、8、16、24、32のような限られた値を用意する。人間が使える数字を、自分から減らしている。

Why would designers voluntarily remove choices?

> **Design Tokenは数字に名前を付ける仕組みではなく、何を毎回考え直さなくていいかを決める仕組みとして読める。**

![無限の値から限定された語彙へ](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-spacing-tokens/continuum-to-vocabulary.svg)

## 1. FACT｜Tokenは、広すぎる選択肢を限定された語彙へ変える

U.S. Web Design Systemは、色、spacing、typographyなどが非常に広い値を取り得るため、選択肢の多さが制作を遅くし、designerとdeveloperの会話を不必要に細粒度にし得ると説明している。そこで連続的な候補から限定されたdiscrete paletteを切り出し、Design Tokenとして使う。

Source: https://designsystem.digital.gov/design-tokens/

ここから本稿では、Tokenを次の変換として読む。

~~~text
many possible values
        ↓
limited vocabulary
        ↓
repeatable decisions
~~~

これはUSWDSの文言そのものではなく、一次資料から導いた実務上の解釈だ。

## 2. FACT｜8pxは自然法則ではない

USWDSのspacing unitは8pxの倍数を基礎にしつつ、4px、2px、1pxなども持つ。

Source: https://designsystem.digital.gov/design-tokens/spacing-units/

一方、GOV.UK Design Systemは5pxを基礎とするscaleを採用し、大きなresponsive spacingはsmall screenで縮む。

Source: https://design-system.service.gov.uk/styles/spacing/

つまり「8pxだから正しい」とは言えない。

![USWDSとGOV.UKのspacing比較](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-spacing-tokens/two-scales.svg)

The shared idea is not a sacred number. It is **a limited, meaningful scale that a team can reuse**.

## 3. EXPERIMENT｜13pxを禁止する前に、13pxの理由を聞く

画面からspacingを5個拾う。

~~~text
12 / 16 / 17 / 24 / 31
~~~

16と17は1px違う。では、その1pxは意味の差なのか。

光学補正など説明可能な理由があるなら残るかもしれない。「ドラッグしたらそうなった」だけなら、16へ寄せることで意味をほぼ失わずruleを一つ減らせる。

逆にlabelとinput、field group同士の距離を全部同じ値へ統一すると、ProximityやMappingを壊す場合がある。

**Token化は数字を減らすゲームではなく、意味のない差を減らすゲームだ。**

## 4. BEFORE → AFTER｜減らすのは余白ではなく、判断の種類

BEFORE:

~~~text
Card A padding = 15px
Card B padding = 16px
Card C padding = 18px
Card D padding = 14px
~~~

AFTER:

~~~text
space-1 = 4px
space-2 = 8px
space-3 = 16px
space-4 = 24px
space-5 = 32px

card-padding = space-3
section-gap  = space-5
~~~

A tiny difference may look harmless on one screen. Across a hundred screens, it becomes decision drift.

What disappears is not whitespace. It is **the number of spacing decisions the team has to remake**.

## 5. FACT｜Design Tokenはtool間でdecisionを運ぶ形式にもなった

Design Tokens Community Groupは2025年10月、Design Tokens Format Module 2025.10をstable versionとして公開した。これはW3C RecommendationではなくCommunity Group Reportだが、異なるtoolやplatform間でdesign decisionを共有するvendor-neutral formatを目指す。

Source: https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/

仕様ではAliasも定義されている。

~~~text
palette.black
      ↓
text.primary
~~~

同じ値でも、text.primaryなら「何のための値か」を保持できる。

## 6. PRODUCTION｜そのまま使える制作・修正指示

> **画面ごとに個別のspacing値を追加するのではなく、使用するspacing scaleとsemantic roleを確認してください。同じ意味の余白には同じtokenを使い、scale外の値を追加する場合は既存tokenでは表現できない理由を明示してください。数値を揃えること自体を目的にせず、ProximityやMappingなど意味上必要な差は保持してください。**

レビューなら、

> **「この13px、何の判断から出てきた数字ですか？」**

13px is not the enemy. Unexplained 13px values multiplying across the system are.

## 7. MACRO｜美しい比率より、標準化と共同制作の問題として見る

Swiss StyleやUlm School of Designには、grid、systematic method、communication、industrial productionなど現代のDesign Systemと響き合う論点がある。

ただし「UlmがDesign Tokenを生んだ」「ModernismからDesign Systemへ直線的に進化した」とは言わない。歴史的影響関係と、現代から見た問題設定の類似は分ける必要がある。

ここで接続できるのは、個人が一枚を美しく仕上げるだけでなく、複数人・複数媒体・複数工程でdesignを再現するには共有可能なruleが必要になる、という問いだ。

## 8. MISUNDERSTANDING｜Constraintは全部同じにすることではない

~~~text
同じ意味 → 同じtokenを再利用
違う意味 → 必要な差をつくる
例外     → 理由を説明できる
~~~

The goal of constraint is not to eliminate difference.

**意味のない差を減らして、意味のある差を見えやすくすること。**

## 9. CONNECTION｜Userには学習を、Makerには判断を再利用させる

前回#60では、Consistencyを「一度覚えた意味をuserが再利用できること」と見た。

今回は制作側へ反転する。

~~~text
USER SIDE
learn once → reuse learning

MAKER SIDE
decide once → reuse decisions
~~~

![UserとMakerの二重の再利用](https://raw.githubusercontent.com/silovar-uk/myessays/main/assets/design-literacy-spacing-tokens/double-reuse.svg)

Design Systemは、userにはlearningを再利用させ、makerにはdecisionを再利用させる。

これが今回の「前より解像度が上がる接続」。

## 10. PRACTICE｜30秒のSpacing Archaeology

自分の画面からspacingを5つ拾い、それぞれに理由を付ける。

~~~text
8px  = labelとfield
16px = card内部
24px = field group間
17px = ?
31px = ?
~~~

「？」になった値は即削除ではない。ただし、説明できない差は監査候補になる。

## 11. NEXT｜Constraintは創造性を殺すのか

色も限定。spacingも限定。typographyも限定。componentも限定。

では、全部同じdesignにならないのか。

次はConstraint / System / Creativityへ進む。Swiss StyleやUlmも参照するが、歴史を一直線の進化物語にはしない。

> **選択肢を減らすことは、創造性を減らすのか。それとも、考えるべき場所を選び直すのか。**

## 今日の中心命題

> **A design system does not only standardize appearance. It makes design decisions reusable.**

Before this investigation, 8px looked like a number to obey.

Afterward, it looks different. 8px is not inherently virtuous; a coherent system can also be built around 5px.

大事なのは、無限に選べる世界から「ここはもう毎回悩まなくていい」という領域を作ること。

Tokenは小さな数字の話に見えて、実は**有限な注意力をどこへ使うか**の設計なのかもしれない。

## Sources

- https://designsystem.digital.gov/design-tokens/
- https://designsystem.digital.gov/design-tokens/spacing-units/
- https://design-system.service.gov.uk/styles/spacing/
- https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/
- https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
