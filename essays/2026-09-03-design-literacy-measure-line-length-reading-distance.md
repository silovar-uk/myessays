---
id: design-literacy-measure-line-length-reading-distance
title: "Measure / Line Length――本文幅は「箱の幅」ではなく「読む距離」"
subtitle: "Design Literacy #10｜横方向のReading Rhythmを設計する"
created: "2026-09-03"
updated: "2026-09-03"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Typography", "Measure", "Line Length", "Readability", "Accessibility", "Swiss Style", "Responsive Design", "UI"]
keywords: ["measure", "line length", "text measure", "reading distance", "typography", "max-width", "ch unit", "ic unit", "WCAG 1.4.8", "Visual Presentation", "Swiss Style", "International Typographic Style", "responsive typography"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 10
abstract: "Measure / Line Lengthを、単なる本文コンテナの幅ではなく、読者の目が行頭から行末まで移動し、次の行頭へ戻る距離として捉える。USWDSの45〜90 characters・長文66 charactersという実務ガイド、WCAG 1.4.8の80 glyphs／CJK 40 glyphsという調整可能性の要件、CSSのch/ic単位、Swiss Styleのグリッド思想を混同せず接続し、現在のWeb制作指示へ戻す。"
---

# Measure / Line Length――本文幅は「箱の幅」ではなく「読む距離」
## Design Literacy #10｜横方向のReading Rhythmを設計する

**A text column is a reading distance, not just a box.**

今朝のLine Heightでは、縦方向に「次の行へ戻りやすい距離」を見た。

今回は横方向。テーマは**Measure / Line Length（1行の長さ）**。

画面が広いからといって、本文まで横いっぱいに伸ばす必要はない。

## 1. まず一言：本文幅ではなく、目が移動する距離を設計する

長文を読むとき、目はおおまかにこう動く。

```text
行頭 → → → → → → → 行末
                    ↓
次の行頭 ← ← ← ← ←
```

1行が長くなるほど、行末から次の行頭へ戻る距離も大きくなる。

逆に短すぎると、改行と復帰が頻発する。

つまりMeasureは、

```text
Long Travel
    ↕
Frequent Return
```

の間を調整する設計。

**「本文を何pxにするか」より先に、「どれくらいのreading movementを要求するか」を見る。**

## 2. 仕組み：USWDSの「66文字」は便利な起点であって、法則ではない

U.S. Web Design System（USWDS）は、一般的な本文について**45〜90 characters**を読みやすいline lengthの目安とし、長文では**66 characters前後**を一つのtargetとしている。

また、line heightが大きい本文では、やや長いmeasureを許容できる場合があるとしている。

[U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)  
[U.S. Web Design System — Measure](https://designsystem.digital.gov/design-tokens/typesetting/measure/)

ここまでは**事実としてのガイド**。

ただし、ここから「本文は66文字にすれば正解」と結論づけるのは飛躍になる。

USWDSのcharacter countは、英語・Latin alphabetを中心とする実務ガイドとして読むべきで、日本語へ数字だけをそのまま移植するものではない。

## 3. Before → After：viewportと本文幅を切り離す

### BEFORE

```text
Desktop 1440px

|--------------------------------------------------------------|
| 試合は序盤から激しい展開となり、両チームが中盤でボールを奪い合いながら浦和は徐々に… |
|--------------------------------------------------------------|
```

問題は「画面が広いこと」ではない。

**viewportが広がるほどreading distanceまで無制限に伸びていること**。

### AFTER

```text
Desktop 1440px

             |--------------------------|
             | 試合は序盤から激しい展開 |
             | となり、両チームが中盤で |
             | ボールを奪い合いながら… |
             |--------------------------|
```

結果として左右に余白が生まれる。

でもこの余白は、「高級感を出すためのwhite space」ではない。

**読みやすい距離へ本文を制約した結果として生まれた余白**や。

## 4. そのまま使える制作・修正指示

「本文をもう少し狭くしてください」だけだと、次の案件で再現しにくい。

制作指示なら、こう言える。

> **PCのviewport幅に本文を追従させすぎず、長文を継続して読めるline lengthを基準に本文カラムへmax-widthを設定してください。font size・line height・使用書体とセットで実機確認してください。**

レビューなら、さらに短くできる。

> **「この本文幅はレイアウト都合ですか、それともreading distanceから決めていますか？」**

CSSでは、たとえば次のような発想になる。

```css
.article-body {
  max-width: 65ch;
}
```

ただし、`65ch = 65文字`ではない。

CSS Values and Units Level 4では、`ch`はそのfontにおける**「0」のadvance measure**を基準にする単位と定義されている。さらにCJK向けには、全角文字の代表として「水」のadvance measureを基準にする`ic`も定義されている。

[W3C — CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)

つまり`ch`は便利な近似であって、文字数カウンターではない。

## 5. 歴史との接続：Swiss Styleは「狭い本文」のルールではなく、情報を構造化する態度

1950年代以降のInternational Typographic Style、いわゆるSwiss Styleでは、typographic grid、sans-serif、合理的な構成などが大きな特徴になった。

Swiss National Libraryも、この流れを**typographic gridを使い、情報を秩序立てて構成するデザイン**として紹介している。

[Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)

ここで注意したい。

**Swiss Styleだから本文を狭くする、という直接ルールではない。**

歴史的事実は「gridやtypographyを使って構造を作った」こと。

そこから現在へ引ける解釈は、

**画面いっぱいを使えることと、使うべきことは同じではない。情報の役割に応じて幅を制約すること自体が、構造を作る設計判断になる**

ということや。

`max-width`は単なるCSSテクニックではなく、ページにルールを与える操作として見られる。

## 6. Accessibility：WCAGの「80 / 40」をデフォルト幅の命令にしない

WCAG 2.2 Success Criterion 1.4.8 **Visual Presentation（Level AAA）**では、text blockについて、ユーザーが必要に応じて**80 characters or glyphs以下、CJKでは40 glyphs以下**の幅にできる仕組みを求めている。

[W3C — Understanding SC 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation)

ただし、WCAG本文には重要な注記がある。

**コンテンツが最初からその値を使う必要はない。ユーザーがその表示状態を実現できることが要件。**

Technique C20も、デフォルト表示を常に80文字以下へ固定せよという意味ではなく、ブラウザ幅を狭めるなどしてユーザーが短いline lengthを実現できないような固定設計を避ける趣旨を説明している。

[W3C — Technique C20](https://www.w3.org/WAI/WCAG22/Techniques/css/C20)

```text
USWDS
→ authored typographyの実務的なstarting point

WCAG 1.4.8
→ userが読みやすい表示へ調整できるaccessibility requirement
```

同じ「行の長さ」の話でも、目的が違う。

## 7. 誤解しやすい点：「66文字」「40文字」をmagic numberにしない

Measureは単独では決まらない。

少なくとも、

```text
Typeface
× Font Size
× Language / Script
× Line Height
× Reading Purpose
× Screen Size
↓
Measure
```

を見る必要がある。

特に日本語ではLatin alphabetと文字幅・分かち書き・改行の仕組みが違う。

だから制作では数字を暗記するより、

**長すぎて行を見失わないか。短すぎて復帰が頻発しないか。**

を実際の本文で確認する。

## 8. 前回との接続：Line HeightとMeasureは、縦横のReading Rhythm

前回はLine Heightを、

**行を分けながらparagraphをつなぐ距離**

として見た。

今回はMeasureを、

**行頭から行末まで目を運ぶ距離**

として見る。

合わせるとこうなる。

```text
Measure
横方向の移動距離
      ×
Line Height
縦方向の復帰を識別する距離
      ↓
Reading Rhythm
```

ここで解像度が一段上がる。

**Typographyは「正しいfont-sizeを一つ選ぶ作業」ではなく、複数の距離の関係を設計する作業。**

## 9. 30秒でできる観察

PCでニュースサイトや長文記事を一つ開く。

ブラウザ幅を、

```text
800px
↓
1200px
↓
1600px
```

と広げる。

見るのは一つだけ。

**本文もずっと広がり続けるか。途中で止まるか。**

止まるならDevToolsで`max-width`を探す。

一度その制約をOFFにして、単に「余白が減った」と見るのではなく、**reading distanceがどう変わったか**を見る。

## 10. 次につながる概念：Responsive Typography

スマホではviewport自体が狭いので、Measureは自然に短くなる。

するとDesktopとMobileで、同じtypography parameterをそのまま維持すればよいとは限らない。

```text
Desktop
長めのMeasure
↓
Line Height / Font Sizeを調整

Mobile
短いMeasure
↓
別のReading Rhythmを再調整
```

次に見るべきは**Responsive Typography**。

Responsive Designを「箱を縮める技術」ではなく、**viewportの変化に合わせてreading conditionsそのものを再設計すること**として見る。

今日の中心命題はこれ。

**A text column is not just a box. It defines how far the eye must travel before it can return.**

日本語なら、

**本文幅は「箱の幅」ではなく、「読む距離」。**

これを覚えると、「なんとなく本文が横に長い」を、制作指示へ変換できるようになる。

## 参考資料

- [U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)
- [U.S. Web Design System — Measure](https://designsystem.digital.gov/design-tokens/typesetting/measure/)
- [W3C — WCAG 2.2 Success Criterion 1.4.8 Visual Presentation](https://www.w3.org/TR/WCAG22/#visual-presentation)
- [W3C — Understanding SC 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation)
- [W3C — Technique C20](https://www.w3.org/WAI/WCAG22/Techniques/css/C20)
- [W3C — CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)
- [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)
