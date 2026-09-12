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
abstract: 中銀カプセルタワーの140個の部屋は交換可能だった。しかも4本のボルトで外せた。それなのに50年間、想定された交換は起きなかった。この妙な事実から、モジュール化と「本当に変化し続けられる設計」の違いをUIとデザインシステムまでつなげて考える。
---

# 交換できるはずの部屋は、なぜ50年間一度も交換されなかったのか

「交換可能です」と言われたら、普通は交換されると思う。

電池なら交換する。替刃なら交換する。スマホケースも交換する。

では、**部屋そのものが交換可能だったら？**

東京・銀座に1972年から2022年まで建っていた中銀カプセルタワービルには、140個のカプセルが取り付けられていた。黒川紀章は、建物のコアを残しながらカプセルを25〜35年ごとに交換する構想を持っていた。

しかも各カプセルは、MoMAの説明によれば**わずか4本のボルト**でコアに固定されていた。

4本。

建築の話なのに、急に家具の組み立て説明書みたいな数字が出てくる。

ところが、想定された交換サイクルは実現しなかった。建物は約50年間使われ、2022年に解体された。

交換できるように作った。

交換方法も考えた。

それでも交換されなかった。

この建物、もしかすると「モジュール化すれば変更に強くなる」という現代のUI設計にも、かなり嫌な質問をしている。

## まず、見た目で分解してみる

中銀カプセルタワーの考え方を、ものすごく単純化するとこうなる。

```text
┌──────────────┐
│   CORE       │  ← 長く残す
│              │
│  ┌──────┐    │
│  │CAPSULE│    │  ← 交換する
│  └──────┘    │
│  ┌──────┐    │
│  │CAPSULE│    │
│  └──────┘    │
└──────────────┘
```

全部を同じ寿命にしない。

**Stable Core + Replaceable Parts.**

この発想自体はかなり合理的に見える。

建物全体を壊さなくても、古くなった部分だけ更新できるからだ。

そして、ここからがMetabolismの話になる。

## FACT｜Metabolismは「建築を完成品として固定しない」発想を持っていた

Metabolismは1960年代の日本で展開した建築運動で、都市や建築を、生物の成長や変化になぞらえながら時間とともに適応できるシステムとして構想した。

MoMAは中銀カプセルタワーを、その代表的な実現例として位置づけている。建物は2本のコンクリートと鉄骨のコアに、工場でプレファブされた140個の単身用カプセルを取り付ける構成だった。

黒川はコアを残し、カプセルを25〜35年ごとに交換する「metabolic cycles」を想定していた。しかしMoMAの2025年の展覧会資料は、その構想が実現しなかったことを明記している。

ここは重要なので、笑わずに整理する。

**FACT:** カプセルは交換可能な部品として設計された。

**FACT:** 想定された定期交換は実現しなかった。

**FACT:** 一方で、カプセルの用途そのものは変化した。住居だけでなく、オフィス、学生の部屋、茶室、図書室、ギャラリー、DJブースなどにも転用された。

つまり「物理部品としての新陳代謝」は起きなかったが、**使われ方の新陳代謝は起きていた**。

ここで話が少し面白くなる。

## もう一歩やりすぎる｜本当に「交換可能」だったのかを5段階に分解する

「4本のボルトで外せるなら交換できるやん」と思う。

でも交換という行為を、部品だけでなくシステム全体で考えてみる。

```text
LEVEL 1  DETACH
外せるか

LEVEL 2  REPLACE
代わりの部品を用意できるか

LEVEL 3  CONNECT
既存システムへ再接続できるか

LEVEL 4  OPERATE
交換作業を現実的に運用できるか

LEVEL 5  CONTINUE
それを何十年も繰り返せるか
```

すると、4本のボルトが解決しているのは主にLEVEL 1だと分かる。

部品を外せることと、交換システムが持続することの間には、とんでもなく長い距離がある。

交換部品の生産、設備、所有関係、費用、合意形成、建物全体の老朽化。実際の建築には多くの条件が絡むため、「交換されなかった理由」を4本のボルトだけで説明することはできない。

ここで最初の問いを修正した方がよさそうだ。

**なぜ交換されなかったのか？**

ではなく、

**交換可能性を成立させるには、部品以外に何が必要なのか？**

である。

## INTERPRETATION｜Modularityは構造、Maintenanceは運用

ここからUIへ戻る。

FigmaでButtonをComponent化する。

ReactでCardをComponent化する。

Design Tokenを作る。

よし、変更に強い。

……本当に？

```text
TECHNICALLY REPLACEABLE
        ≠
OPERATIONALLY REPLACEABLE
```

Componentを交換できても、

- 誰が更新するのか
- どこまで影響するのか
- 古いvariantはいつ廃止するのか
- breaking changeをどう伝えるのか
- 過去ページを誰が移行するのか
- 互換性をいつまで維持するのか

が決まっていなければ、古いComponentは残る。

そして数年後、FigmaのAssetsには、

```text
Button
Button_New
Button_v2
Button_v2_final
Button_2026
Button_OLD_DO_NOT_USE
```

が並ぶ。

建築より先に廃墟になっている。

**Modularity is architecture. Maintenance is governance.**

モジュール性は構造。

交換を続けられるかは運用の問題だ。

## Before → After｜毎回建て替えるイベントLP

### BEFORE

```text
12月イベント
┌──────────────┐
│ 専用Header   │
│ 専用Grid     │
│ 専用Card     │
│ 専用Button   │
│ 専用Footer   │
└──────────────┘

1月イベント
┌──────────────┐
│ また全部作る │
└──────────────┘
```

変更はできる。

でも毎回、建て替えている。

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

これなら企画が変わっても、Cだけを交換できる。

ただし、今日の話を知ったあとでは、これだけでも安心できない。

**「誰が、いつ、どう交換するか」まで設計されているか？**

を確認する必要がある。

## そのまま使える制作・修正指示

> 今回固有の表現と、今後も継続利用する構造を分離してください。レイアウト・操作・アクセシビリティなど長期維持する要素をCore、KV・コピー・テーマ・企画固有コンテンツなど更新頻度の高い要素をReplaceable Moduleとして整理してください。さらに、交換担当・互換性・廃止条件まで確認し、「交換できる」だけでなく「交換し続けられる」構造にしてください。

レビューなら、もっと短くていい。

> **この変更、部品交換で済みますか。それとも毎回建て替えていますか？**

## #29との接続｜ルールには「理由」だけでなく「寿命」がある

#29 Tschicholdでは、デザインルールを固定的な正解として集めるのではなく、

> WHY does this rule exist?

まで見る話をした。

今日はそこへ時間軸を足す。

```text
WHY does this rule exist?
          ↓
HOW LONG should it live?
```

Color Tokenは比較的長く残る。

Button Componentも残る。

Campaign KVは短い。

今日のコピーはもっと短い。

全部に同じ寿命を期待すると、どこかで無理が出る。

つまりDesign Systemには、画面上のVisual Hierarchyだけでなく、**Time Hierarchy**もある。

何が長く残り、何が頻繁に入れ替わるのか。

ここまで見えて初めて「変更に強い」が具体的になる。

## 誤解しやすい点｜中銀は「失敗したモジュール建築」で終わらない

交換されなかった。

だからMetabolismは失敗。

と片づけるのも雑だ。

MoMAの現在の展示はむしろ、設計者が想定した交換とは違う形で、カプセルが多様な用途へ変化したことに注目している。さらに解体後には23個のカプセルが救出され、異なる場所で保存・再利用されている。

設計者が想定したchangeと、利用者が実際に起こしたchangeは一致しなかった。

**INTERPRETATION:** これは「未来を正確に予測する設計」より、**予測外の使われ方を受け止められる設計**という別の価値を考える入口になる。

変更可能性とは、未来を当てる能力ではないのかもしれない。

未来に外れても、まだ使える余地を残すことなのかもしれない。

## 30秒でできる観察｜画面を寿命で色分けする

最近作ったページを一つ開く。

要素を頭の中で3色にする。

```text
■ LONG
1年以上残したい

■ MEDIUM
数か月で変わる

■ SHORT
今回だけ
```

GridはLONG。

ButtonもLONG。

ThemeはMEDIUM。

KVやCopyはSHORT。

そして一つだけ見る。

> **SHORTを交換するために、LONGまで壊していないか？**

壊していたら、そこが構造を切り直す候補になる。

## 次につながる概念｜Design for Disassembly

次は「作れるか」ではなく、**外せるか**を見る。

Design for Disassembly。

MoMAも現在、中銀カプセルタワーをこのテーマへ接続し、解体時にカプセルが建物から取り外され、別の場所へ運ばれた事実から、建築の部品が建物の寿命を超えて生きる可能性を考えている。

UIなら、

```text
追加できる
```

だけでなく、

```text
削除できる
置換できる
廃止できる
戻せる
```

まで設計する。

---

### 今日の中心命題

**A system is not adaptable just because its parts are modular.**

部品をモジュール化しただけでは、システムは変化に強くならない。

交換できる構造。

交換するための運用。

交換し続けられる時間設計。

その三つがつながって、初めてchangeabilityになる。

中銀カプセルタワーを見る前は、丸い窓のついた変な箱が大量に刺さった未来建築に見えていた。

調べたあとでは少し違う。

**「交換できるように作ること」と「交換される未来を作ること」の間にある巨大な距離を、50年かけて見せた建物**に見える。

そしてFigmaを開く。

そこにも、交換できるはずなのに誰も交換しなくなったカプセルが、けっこうある。

### 専門語 / Search terms

`Metabolism` / `Metabolist Architecture` / `Nakagin Capsule Tower` / `Kisho Kurokawa` / `Modularity` / `Changeability` / `Design for Disassembly` / `Stable Core` / `Replaceable Parts` / `Design System Governance` / `Time Hierarchy`

### Sources

- The Museum of Modern Art, “The Many Lives of the Nakagin Capsule Tower,” 2025–2026.
- The Museum of Modern Art, “Learning from Nakagin: Design for Disassembly.”
- The Museum of Modern Art, press release, “The Many Lives of the Nakagin Capsule Tower,” updated July 8, 2025.
- The Museum of Modern Art, extended exhibition labels, including Kurokawa’s 1969 Capsule Declaration and its principles for replaceable parts.
