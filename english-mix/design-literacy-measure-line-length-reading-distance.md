---
id: design-literacy-measure-line-length-reading-distance
title: "Measure / Line Length――本文幅は「箱の幅」ではなく「読む距離」"
subtitle: "English Mix｜Design Literacy #10｜Designing Horizontal Reading Rhythm"
created: "2026-09-03"
updated: "2026-09-03"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.45
mix_unit: "sentence"
series: "Design Literacy｜細部から思想まで"
seriesOrder: 10
---

# Measure / Line Length――本文幅は「箱の幅」ではなく「読む距離」
## Design Literacy #10｜Designing Horizontal Reading Rhythm

**A text column is a reading distance, not just a box.**

前回のLine Heightでは、vertical directionで「次の行へ戻りやすい距離」を見た。

This time we move horizontally. テーマは**Measure / Line Length**。

A wide viewport does not mean the text itself should stretch across the entire screen.

## 1. まず一言：Design the eye movement, not only the box width

長文を読むとき、目はおおまかにこう動く。

```text
START → → → → → → → END
                    ↓
NEXT  ← ← ← ← ← ←
```

The longer the line becomes, the farther the eye has to travel before returning to the beginning of the next line.

逆に短すぎると、line breaksとreturn movementが頻発する。

つまりMeasureは、

```text
Long Travel
    ↕
Frequent Return
```

のbalance。

**Before asking “How many pixels wide?”, ask “How much reading movement are we asking for?”**

## 2. 仕組み：USWDSの66 charactersはa starting point, not a law

The U.S. Web Design System（USWDS）recommends roughly **45–90 characters** for many lines of text, with about **66 characters** as a useful target for long-form reading.

It also notes that greater line height can sometimes support a somewhat longer measure.

[U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)  
[U.S. Web Design System — Measure](https://designsystem.digital.gov/design-tokens/typesetting/measure/)

ここまではpractical guidanceとしての事実。

But “66 characters = correct body width” would be an overgeneralization.

USWDSのcharacter countはLatin-alphabet-centered guidanceとして読み、日本語へ数字だけcopyしない。

## 3. Before → After：Separate viewport width from reading width

### BEFORE

```text
Desktop 1440px

|--------------------------------------------------------------|
| 試合は序盤から激しい展開となり、両チームが中盤でボールを奪い合いながら浦和は徐々に… |
|--------------------------------------------------------------|
```

The problem is not that the screen is wide.

**The problem is that reading distance keeps expanding just because the viewport expands.**

### AFTER

```text
Desktop 1440px

             |--------------------------|
             | 試合は序盤から激しい展開 |
             | となり、両チームが中盤で |
             | ボールを奪い合いながら… |
             |--------------------------|
```

左右にはmore whitespaceが生まれる。

But this is not “decorative whitespace for a premium look.”

It is **whitespace produced by constraining text to a readable distance**.

## 4. そのまま使える制作・修正指示

「本文をもう少し狭くしてください」だけでは、design intentが残らない。

Use an instruction like this:

> **PCのviewport幅に本文を追従させすぎず、長文を継続して読めるline lengthを基準に本文カラムへmax-widthを設定してください。font size・line height・使用書体とセットで実機確認してください。**

For review:

> **「この本文幅はレイアウト都合ですか、それともreading distanceから決めていますか？」**

CSSでは、たとえば、

```css
.article-body {
  max-width: 65ch;
}
```

というstarting pointが考えられる。

But `65ch` does not literally mean 65 characters.

CSS Values and Units Level 4 defines `ch` from the **advance measure of the “0” glyph** in the selected font. It also defines `ic` using the advance measure of the CJK ideograph **“水”** as a representative full-width glyph.

[W3C — CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)

So `ch` is a typographic approximation, not a character counter.

## 5. 歴史との接続：Swiss Style is about structure, not a “narrow text” recipe

The International Typographic Style, often called Swiss Style, became strongly associated with typographic grids, sans-serif type, and rationally organized compositions.

The Swiss National Library describes the movement as using a **typographic grid** to create ordered and unified structures.

[Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)

ここで歴史を単純化しない。

**Swiss Style does not mean “make the body text narrow.”**

Historical fact: grids and typography were used to structure information.

A useful contemporary interpretation is that **having available space does not mean every element should consume it**. Applying `max-width` can be understood as a rule that gives the page structure, not merely as a CSS trick.

## 6. Accessibility：WCAG’s “80 / 40” is about achievable presentation

WCAG 2.2 Success Criterion 1.4.8 **Visual Presentation（Level AAA）** says that a mechanism should be available for blocks of text to achieve a width of **no more than 80 characters or glyphs, or 40 if CJK**.

[W3C — Understanding SC 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation)

Important distinction:

**WCAG does not require the authored default view to always use those widths.**

Technique C20 explains that the purpose is to avoid layouts that make it impossible for users to reach shorter line lengths, for example when they resize the browser.

[W3C — Technique C20](https://www.w3.org/WAI/WCAG22/Techniques/css/C20)

```text
USWDS
→ practical guidance for authored typography

WCAG 1.4.8
→ accessibility requirement for adjustable presentation
```

Same topic, different purpose.

## 7. 誤解しやすい点：Do not turn 66 or 40 into magic numbers

Measure depends on a relationship:

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

日本語はLatin alphabetと文字幅、word spacing、line breakingの仕組みが違う。

So instead of memorizing one number, test two questions:

**Is the line so long that returning becomes difficult?  
Is it so short that returns happen too frequently?**

## 8. 前回との接続：Line Height × Measure = Reading Rhythm

前回はLine Heightを、

**行を分けながらparagraphをつなぐ距離**

として見た。

This time, Measure is **the horizontal distance the eye travels from line start to line end**.

Together:

```text
Measure
horizontal travel
      ×
Line Height
vertical return separation
      ↓
Reading Rhythm
```

ここで一段解像度が上がる。

**Typography is not about finding one correct font-size. It is about designing relationships among multiple distances.**

## 9. 30秒でできる観察

Open a long-form article on desktop.

ブラウザ幅を、

```text
800px
↓
1200px
↓
1600px
```

と広げる。

Watch one thing:

**Does the text column keep growing forever, or does it stop?**

If it stops, inspect `max-width` in DevTools.

Then disable that constraint once. Don’t only observe “less whitespace.” Observe **how far the eye now has to travel**.

## 10. 次につながる概念：Responsive Typography

On mobile, the viewport itself becomes narrow, so Measure naturally becomes shorter.

That means typography parameters may need to change together.

```text
Desktop
longer Measure
↓
tune Line Height / Font Size

Mobile
shorter Measure
↓
re-tune Reading Rhythm
```

次は**Responsive Typography**。

Responsive Designを単なる“shrinking boxes”ではなく、**redesigning reading conditions as the viewport changes**として捉える。

Today’s claim:

**A text column is not just a box. It defines how far the eye must travel before it can return.**

日本語なら、

**本文幅は「箱の幅」ではなく、「読む距離」。**

## 参考資料

- [U.S. Web Design System — Typography](https://designsystem.digital.gov/components/typography/)
- [U.S. Web Design System — Measure](https://designsystem.digital.gov/design-tokens/typesetting/measure/)
- [W3C — WCAG 2.2 Success Criterion 1.4.8 Visual Presentation](https://www.w3.org/TR/WCAG22/#visual-presentation)
- [W3C — Understanding SC 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation)
- [W3C — Technique C20](https://www.w3.org/WAI/WCAG22/Techniques/css/C20)
- [W3C — CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)
- [Swiss National Library — The International style 1950–1970](https://www.nb.admin.ch/en/the-international-style-1950-1970)
