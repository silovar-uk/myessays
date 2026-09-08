---
id: design-literacy-icon-label-recognition
title: "アイコンだけにすると、なぜ急にクイズになるのか"
subtitle: "Design Literacy #25｜Icon + Labelで『探す速さ』と『意味の確定』を分担する"
created: "2026-09-08"
updated: "2026-09-08"
type: "Essay"
status: "完成"
tags: ["Design Literacy", "デザイン", "Icon", "Label", "Recognition", "Pictogram", "Accessibility", "Otl Aicher", "Information Scent", "UI"]
keywords: ["icon usability", "text label", "icon label", "recognition", "pictogram", "accessible name", "aria-label", "resemblance icon", "reference icon", "arbitrary icon", "Otl Aicher", "information scent"]
favorite: 5
grow: 5
series: "Design Literacy｜細部から思想まで"
seriesOrder: 25
abstract: "『アイコンだけにすると画面はすっきりする』という直感を疑い、Icon + Labelを視覚探索と意味確定の役割分担として捉え直す。Resemblance / Reference / Arbitraryというアイコン分類、accessible nameとvisible labelの違い、ミュンヘン1972のピクトグラムを手掛かりに、文字を消すことで増える推論コストを検討し、実務で使えるアイコン監査手順へ戻す。"
---

# アイコンだけにすると、なぜ急にクイズになるのか
## Design Literacy #25｜Icon + Labelで「探す速さ」と「意味の確定」を分担する

画面をすっきりさせたい。

それなら文字を減らせばよい。

ツールバーをこうする。

```text
⌕   ☆   ⋮   ↗   ⤓
```

かなりすっきりした。

問題は、`↗`を押す前に少し考えることである。

外部リンクだろうか。共有だろうか。別画面で開くのだろうか。

**文字を消した結果、UIが小さな図形当てクイズになった。**

今回は、この数秒にも満たない迷いを本気で調べる。

## ① 今日のテーマ：Icon + Label

Nielsen Norman Group（NN/g）は、ほとんどのアイコンには標準化された意味がなく、ユーザーの理解は過去の経験に左右されると説明している。そのため、意味の曖昧さを減らすにはテキストラベルが有効で、特にナビゲーションではhoverで初めて表示されるラベルへ依存しないよう勧めている。

ただし、ここから「すべてのアイコンに必ず文字を付ける」という万能則を作るのも危険である。

検索の虫眼鏡や閉じる操作など、十分に慣習化され、文脈でも意味を限定できる場合は、アイコン単体で成立することもある。

今日の問いはもっと限定する。

> **文字を消して得た省スペースより、意味を推論させるコストの方が大きくなっていないか。**

## ② まず一言

**An icon becomes a shortcut only after its meaning is known.**

アイコンは、意味を知っている人にとって初めてショートカットになる。

意味を知らない人にとっては、短縮ではなく問題文である。

だから、アイコンを評価するときは「小さい」「きれい」「統一されている」だけでは足りない。

**その図形と操作の対応を、ユーザーがどれだけ推論しなくてよいか**を見る必要がある。

## ③ アイコンには、意味との距離がある

NN/gはアイコンを、意味との関係から大きく3種類に整理している。

### Resemblance Icon

表す対象そのものに似ている。

```text
🔍 → 虫眼鏡
```

対象と図形の距離が比較的近い。

### Reference Icon

対象そのものではなく、関連や比喩を使う。

```text
🕘 → 履歴
```

時計そのものを表示するのではなく、「時間」から「履歴」へ意味を飛ばしている。

### Arbitrary Icon

慣習として覚えることで意味を持つ。

```text
♡ → お気に入り
```

この分類のおもしろい点は、同じ図形でも時代やユーザーによって分類が変わりうることである。

NN/gはフロッピーディスクのSaveアイコンを例に挙げる。実際にフロッピーへ保存していた時代にはResemblanceに近かったが、フロッピーを見たことがない世代にとっては、ほとんどArbitraryな記号になる。

**FACT:** アイコンと意味の対応は、図形だけで完結せず、慣習や経験によって変化する。

**INTERPRETATION:** 「このアイコンは普通だから分かる」という制作側の感覚は、利用者の経験を暗黙に仮定している可能性がある。

## ④ Before → After：文字を足すと、何が増えるのか

### BEFORE

```text
☆    ↗    ⋮
```

作った本人には分かる。

しかし初見では、別解を作れる。

```text
☆ → お気に入り？ 評価？
↗ → 外部リンク？ 共有？ 開く？
⋮ → その他
```

### AFTER

```text
☆ お気に入り
↗ 公式を見る
⋮ その他
```

当然、横幅は増えた。

しかし同時に、ユーザーが操作前に作らなければならない仮説は減った。

ここでIcon + Labelの役割を分けて考えると分かりやすい。

```text
Icon  → 視覚的に素早く探す
Label → 意味を確定する
```

**The icon helps scanning. The label settles meaning.**

ラベルはアイコンの説明書ではなく、異なる認知上の仕事を担当している。

## ⑤ そのまま使える制作・修正指示

> 主要操作のアイコンを監査し、初見で意味が一意に推測しにくいもの、誤操作コストが高いもの、利用頻度が低く学習されにくいものには短いvisible labelを併記してください。アイコンは視覚探索、ラベルは意味の確定を担当させます。重要操作の意味をhover時のtooltipだけに依存させないでください。

レビューでは、次の順で見る。

```text
1. このアイコンは何を表す？
↓
2. 別の動詞でも説明できる？
↓
3. 間違えた場合のコストは高い？
↓
4. 何度も使えば学習される操作？
↓
5. 文字を消す利益は本当に大きい？
↓
6. 必要なら短いlabelを足す
```

「別の動詞でも説明できる？」はかなり使いやすい。

`↗`を見て「開く」「共有」「外部へ移動」の3つが出るなら、少なくとも意味が一意ではない。

## ⑥ 歴史へ行く：ミュンヘン1972のピクトグラム

文字を減らして図形で伝える試みは、スマートフォンよりはるかに古い。

1972年ミュンヘン五輪では、Otl Aicherが率いたVisual Design Groupが、スポーツや施設を示すピクトグラムを体系化した。Olympic Studies Centreの資料では、45度・90度の角度、一定の線幅、限られた身体要素などを使い、セット全体を一貫した視覚文法として標準化したことが説明されている。

重要なのは、「誰でも自然に理解できる完璧な絵文字を発見した」という話ではない。

むしろ、**複数の記号を一つのsystemとして読めるよう、形の文法を徹底して設計した**点に価値がある。

さらにOlympic Studies Centreは、ミュンヘン1972のピクトグラムを東京1964で発展したピクトグラフィックな言語をさらにsystematizeしたものとして位置づけている。

**FACT:** ミュンヘン1972では、幾何学的ルールによる標準化されたピクトグラムsystemが用いられた。

**INTERPRETATION:** 現代UIでも、個々のアイコンの美しさより「同じ体系の記号として予測可能か」を見る視点につながる。

## ⑦ 誤解しやすい点：Pictogram = Universal Languageではない

ピクトグラムを見ると、「絵なら言葉を越えられる」と考えたくなる。

しかし、図形と意味の対応には経験や文化が入り込む。

NN/gが示すResemblance / Reference / Arbitraryの区別も、まさにその問題である。対象に似ているほど理解しやすい傾向はあっても、比喩や慣習へ依存するほど学習が必要になる。

さらに現代UIが扱う行為は、物理世界より抽象的なことが多い。

```text
競泳
電話
トイレ
```

を図にすることと、

```text
同期
アーカイブ
共有範囲
複製
ワークスペースへ移動
```

を図だけで伝えることは、同じ難易度ではない。

**The more abstract the action, the more carefully its signifier must be tested.**

抽象的な操作ほど、「それっぽいアイコンを置く」だけでは意味が確定しにくい。

## ⑧ Accessible NameとVisible Labelは別の問題

ここでもう一段分ける。

アイコンだけのボタンでも、支援技術へ意味を伝えるためのaccessible nameは必要になる。

例えば、

```html
<button aria-label="検索">
  🔍
</button>
```

W3Cは、visible textがない場合に`aria-label`などでaccessible nameを提供する方法を示している。またARIA Authoring Practicesでは、buttonは内容だけで十分な名前を持たない場合、accessible nameが必要になる。

ただし、

```text
accessible nameがある
↓
visible labelはいらない
```

とはならない。

**Accessible name solves access for assistive technology. Visible label solves visible discoverability and ambiguity.**

関連はあるが、同じ問題ではない。

そしてvisible labelがある場合、W3CのLabel in Nameの考え方では、音声入力との整合のため、accessible nameにもそのvisible textを含めることが重要になる。

## ⑨ 前より解像度が上がる接続

#24ではInformation Architectureを扱った。

```text
Information Architecture
↓
情報をどこに置く？
```

今回はその入口を見る。

```text
Information Architecture
何をどこに置く？

        ↓

Navigation
そこへどう移動する？

        ↓

Icon / Label
その入口は何をするものに見える？
```

構造が正しくても、入口の意味が読めなければ迷子になる。

ここでVisual Hierarchyまで戻すと、さらに分かる。

```text
Visual Hierarchy → 見る順番
IA               → 情報の住所
Icon / Label     → 入口の意味
```

「分かりやすいUI」は一つの原理ではなく、別の問題が連鎖して成立している。

## ⑩ 30秒でできる観察

普段使うアプリを一つ開く。

文字のないアイコンを3つ探す。

そして一つずつ、こう聞く。

> **この図形を、別の動詞でも説明できるか？**

2つ以上の意味が思いついたら、ambiguous icon候補である。

次に、4〜6文字程度のlabelを付けるなら何かを考える。

最後に、もう一問。

> **その文字を消すことで、本当に何を得ているか？**

答えが「すっきりする」だけなら、もう一度疑ってよい。

## 次に覚えるとつながる概念：Information Scent

アイコンの意味が分かっただけでは、まだ足りない。

ユーザーは入口を見て、

> これを押したら、自分が欲しいものへ近づきそうか？

まで推測している。

次につながるのが**Information Scent**である。

```text
Icon
↓
これは何？

Label
↓
何をする？

Information Scent
↓
その先に何がありそう？
```

#24で「住所」を設計し、#25で「入口の意味」を確認した。

次は、**入口から目的地の気配がするか**を見る。

---

## 今日の中心命題

**An icon is a shortcut only after its meaning is known.**

アイコンは、意味が共有されて初めてショートカットになる。

文字を消せば、画面上の情報量は減る。

しかしその代わりに、ユーザーの頭の中で推論が増えているかもしれない。

だから「シンプルなUI」を、要素数だけで判定しない。

**削った文字より、増えた推論を見る。**

それが今日から使える新しいチェックポイントである。

## FACT / INTERPRETATION

**FACT**

- NN/gは、多くのアイコンの理解が過去の経験に依存し、曖昧さを減らすためvisible text labelが有効だと説明している。
- NN/gはアイコンをResemblance / Reference / Arbitraryに分類し、意味との対応が強いものほど理解されやすい傾向を整理している。
- W3Cは、visible labelがないコントロールでもaccessible nameを提供する方法を示している。
- Olympic Studies Centreは、ミュンヘン1972のスポーツピクトグラムが幾何学的ルールと標準化されたvisual grammarによって構成されたことを記録している。

**INTERPRETATION**

- Icon + Labelは単なる冗長表現ではなく、「視覚探索」と「意味の確定」を分担する設計として考えられる。
- visible labelを付けるべきかは、アイコンの慣習化度、意味の曖昧さ、操作の重要度、誤操作コスト、利用頻度などを合わせて判断した方が実務的である。

## Sources

- Nielsen Norman Group, “Icon Usability”  
  https://www.nngroup.com/articles/icon-usability/
- Nielsen Norman Group, “Icon Classification: Resemblance, Reference, and Arbitrary Icons”  
  https://www.nngroup.com/articles/classifying-icons/
- W3C WAI, “Providing Accessible Names and Descriptions”  
  https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/
- W3C WAI, “ARIA14: Using aria-label to provide an accessible name where a visible label cannot be used”  
  https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14
- The Olympic Studies Centre, “Design and identity of the Olympic Games”  
  https://library.olympics.com/digitalCollection/DigitalCollectionAttachmentDownloadHandler.ashx?documentId=3156694&parentDocumentId=3156692&skipCopyright=true&skipWatermark=true

## 検索用専門語

`Icon Usability / Text Label / Recognition / Pictogram / Resemblance Icon / Reference Icon / Arbitrary Icon / Accessible Name / Visible Label / aria-label / Signifier / Information Scent`
