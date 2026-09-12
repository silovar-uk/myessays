---
id: design-literacy-metabolism-replaceable-capsules
title: 交換できるはずの部屋は、なぜ50年間一度も交換されなかったのか
subtitle: Design Literacy #38｜Metabolism / Modularity / Changeability / Governance
created: 2026-09-12
updated: 2026-09-12
type: Essay
status: published
tags: ["Design Literacy", "Metabolism", "Modularity", "Design Systems", "Architecture"]
keywords: ["Metabolism", "Nakagin Capsule Tower", "Kisho Kurokawa", "Modularity", "Changeability", "Design for Disassembly", "Stable Core", "Replaceable Parts", "Design System Governance"]
favorite: false
grow: true
series: Design Literacy｜細部から思想まで
seriesOrder: 38
abstract: 中銀カプセルタワーの140個の部屋はreplaceableだった。それなのに50年間、想定された交換は起きなかった。この妙な事実から、modularityと「本当にchangeし続けられるdesign」の違いを考える。
---

# 交換できるはずの部屋は、なぜ50年間一度も交換されなかったのか

「交換可能です」と言われたら、普通は交換されると思う。

電池ならreplaceする。替刃ならreplaceする。

では、**the room itself was replaceable**だったら？

東京・銀座に1972年から2022年まで建っていた中銀カプセルタワービルには、140個のcapsuleが取り付けられていた。黒川紀章は、building coreを残しながらcapsuleを25〜35年ごとに交換する構想を持っていた。

しかもMoMAによれば、each capsule was held by only four bolts.

**Four bolts.**

建築の話なのに、急に家具のassembly manualみたいな数字が出てくる。

ところが、the planned replacement cycle never happened.

約50年間、想定された交換は起きないまま、建物は2022年に解体された。

Designed to be replaceable.

Yet never replaced as planned.

この建物は、「modularにすればchangeに強くなる」という現代のUIにも、かなり嫌な質問をしている。

## まず、見た目で分解してみる

考え方はかなりvisualだ。

```text
┌──────────────┐
│ STABLE CORE  │
│              │
│ ┌────────┐   │
│ │CAPSULE │   │ ← replace
│ └────────┘   │
│ ┌────────┐   │
│ │CAPSULE │   │ ← replace
│ └────────┘   │
└──────────────┘
```

**Stable Core + Replaceable Parts.**

全部を同じlifespanにしない。

この発想は、今のDesign Systemにもかなり近い。

## FACT｜Metabolismはarchitectureをfixed objectとしてだけ考えなかった

Metabolismは1960年代の日本で展開した建築運動で、cities and buildingsを、生物のgrowthやchangeになぞらえながら時間とともにadaptできるsystemとして構想した。

MoMAはNakagin Capsule Towerを、そのdefining realizationの一つとして扱っている。

The building had two concrete-and-steel cores and 140 prefabricated capsules.

黒川はcoreを残し、capsulesを25〜35年ごとにreplaceする“metabolic cycles”を想定していた。しかし、そのvisionは実現しなかった。

ただし面白いことに、capsuleの**use**は変化した。

Second home, office, student room, tea room, library, gallery, DJ booth.

Physical replacement did not happen.

**Functional transformation did.**

ここで「交換されなかった＝何も変わらなかった」ではないことが分かる。

## もう一歩やりすぎる｜Replaceableを5段階にする

Four boltsで外せるならreplaceableに見える。

でもsystem全体で考える。

```text
LEVEL 1  DETACH
外せる？

LEVEL 2  REPLACE
代替部品がある？

LEVEL 3  CONNECT
再接続できる？

LEVEL 4  OPERATE
現実に運用できる？

LEVEL 5  CONTINUE
何十年も繰り返せる？
```

Four boltsが強く解いているのは主にLEVEL 1。

But replaceability is a whole lifecycle.

部品の生産、設備、費用、ownership、合意形成、maintenance。現実の建築では多くの条件が絡む。

だから問いを変える。

**Why wasn’t it replaced?**

だけではなく、

**What makes replacement sustainable in practice?**

へ。

## INTERPRETATION｜Modularity is architecture. Maintenance is governance.

FigmaでButtonをComponent化する。

ReactでCardをComponent化する。

Design Tokensを作る。

Technically modular.

でも、

```text
TECHNICALLY REPLACEABLE
        ≠
OPERATIONALLY REPLACEABLE
```

誰がupdateする？

Who owns the migration?

古いvariantはいつdeprecateする？

How long is backward compatibility supported?

これがないと数年後、

```text
Button
Button_New
Button_v2
Button_v2_final
Button_2026
Button_OLD_DO_NOT_USE
```

になる。

Architectureより先にruinになっている。

**Modularity is architecture. Maintenance is governance.**

モジュール性はstructure。

交換を続けられるかはoperationの問題だ。

## Before → After｜毎回建て替えるEvent LP

### BEFORE

```text
DECEMBER EVENT
┌─────────────┐
│ custom all  │
└─────────────┘

JANUARY EVENT
┌─────────────┐
│ rebuild all │
└─────────────┘
```

Changeable, but not efficiently replaceable.

### AFTER

```text
┌────────────────────┐
│ STABLE CORE        │
│ Header             │
│ Grid               │
│ Card Structure     │
│ Button             │
│ Accessibility Rule │
├────────────────────┤
│ REPLACEABLE        │
│ KV                 │
│ Copy               │
│ Theme              │
│ Event Blocks       │
└────────────────────┘
```

これならSHORT-lived contentだけ交換できる。

But today’s lesson adds one more question:

**Who replaces it, when, and under what rule?**

## そのまま使える制作・修正指示

> 今回固有のexpressionと、継続利用するstructureを分離してください。Layout・interaction・accessibilityなど長期維持する要素をCore、KV・copy・theme・企画固有contentなど更新頻度の高い要素をReplaceable Moduleとして整理してください。さらにowner・compatibility・deprecation ruleまで確認し、“replaceable”ではなく“replaceable in practice”を目指してください。

短くするなら、

> **Can this change be a part replacement, or are we rebuilding the whole building?**

## #29との接続｜RuleにはReasonだけでなくLifespanがある

#29 Tschicholdでは、

**WHY does this rule exist?**

を考えた。

今日はそこへtimeを足す。

```text
WHY does this rule exist?
          ↓
HOW LONG should it live?
```

Color Token → LONG.

Button Component → LONG.

Campaign Theme → MEDIUM.

Today’s Copy → SHORT.

Design SystemにはVisual Hierarchyだけでなく、**Time Hierarchy**もある。

## 誤解しやすい点｜Nakagin = failed modular architecture、ではない

The capsules were not replaced as planned.

だからMetabolism failed、と終えるのは雑だ。

MoMAの現在の展示は、設計者の想定とは違う形でcapsulesが多様な用途へadaptしたことにも注目している。解体後には23 capsulesがrescuedされ、保存・再利用された。

The planned change and the actual change were different.

**INTERPRETATION:** Good design may not predict the future. It may leave room for an unexpected future.

未来を当てることと、未来を受け止めることは違う。

## 30秒でできる観察｜Color by Lifespan

最近作ったpageを一つ見る。

```text
LONG
1年以上残したい

MEDIUM
数か月で変わる

SHORT
今回だけ
```

Grid → LONG.

Button → LONG.

Theme → MEDIUM.

KV / Copy → SHORT.

そして聞く。

**Are you breaking LONG just to replace SHORT?**

もしそうなら、module boundaryを疑う。

## 次につながる概念｜Design for Disassembly

次は「作れる？」ではなく、**Can we take it apart later?**を見る。

Design for Disassembly.

MoMAもNakaginをこのテーマへ接続している。

UIなら、

```text
ADD
```

だけでなく、

```text
REMOVE
REPLACE
DEPRECATE
ROLL BACK
```

までdesignする。

---

### 今日の中心命題

**A system is not adaptable just because its parts are modular.**

部品をmodularにしただけでは、systemはchangeに強くならない。

Structure for replacement.

Governance for replacement.

Time design for continued replacement.

この三つがつながって、初めてchangeabilityになる。

Nakaginを見る前は、丸いwindowの変な箱が大量に刺さったfuture buildingに見える。

調べたあとでは、

**“replaceable”と“actually replaced”の間にある巨大な距離を50年かけて見せたbuilding**に見えてくる。

そしてFigmaを開く。

そこにも、replaceableなはずなのに誰もreplaceしなくなったcapsuleが、けっこうある。

### Search terms

`Metabolism` / `Metabolist Architecture` / `Nakagin Capsule Tower` / `Kisho Kurokawa` / `Modularity` / `Changeability` / `Design for Disassembly` / `Stable Core` / `Replaceable Parts` / `Design System Governance` / `Time Hierarchy`

### Sources

- The Museum of Modern Art, “The Many Lives of the Nakagin Capsule Tower,” 2025–2026.
- The Museum of Modern Art, “Learning from Nakagin: Design for Disassembly.”
- The Museum of Modern Art, press release, “The Many Lives of the Nakagin Capsule Tower,” updated July 8, 2025.
- The Museum of Modern Art, extended exhibition labels on Kurokawa’s Capsule Declaration.
