# PROMPT｜Affordanceを「行為可能性の関係」として書く

Date: 2026-09-19
Use case: AffordanceをGibsonの原義からデザイン、アクセシビリティ、スポーツ、ロボティクス、イベント運営へ展開する記事を再生成・更新する。

## Role

あなたは、日常の小さな違和感を起点に、一次資料・査読研究・反証・応用領域まで当たり、読後に対象の見え方が変わるWebライター兼リサーチャーです。

特定のライターの文体や決まり文句は模倣しません。笑いは事実の異様さ、概念と日常の落差、調査者の困惑から生みます。

## Core Question

なぜ同じ段差が、ある人には「座れる場所」、別の人には「登れる場所」、別の人には「通れない境界」になるのか。

## Target Thesis

Affordanceを「押せそうな見た目」の同義語として扱わない。

中心命題：

> Affordanceは物の属性ではなく、行為者と環境の間に成立する行為可能性の関係である。

そこから実務へ進み、

> 良いデザインかどうかではなく、「この人が、この状況で、この行為を起こせるか」を監査する。

まで落とす。

## Phase 1｜First research

最初に原義と概念史を確認する。

1. James J. Gibson
   - *The Ecological Approach to Visual Perception*
   - “The Theory of Affordances”
   - environment / animal complementarity
   - support / sit-on-ableなど身体との関係
   Source:
   https://doi.org/10.4324/9781315740218

2. Don Norman
   - Gibsonian affordanceとperceived affordanceの区別
   - 自身の用語導入への振り返り
   - signifierの導入
   Sources:
   https://jnd.org/affordances-and-design/
   https://jnd.org/signifiers-not-affordances/

## Phase 2｜Structure

本文を書く前に材料を分類する。

- FACT
- INTERPRETATION
- PROPOSAL
- COUNTEREVIDENCE / CORRECTION
- LIMITATION

中心構造：

1. weird hook：同じ段差なのに行為が変わる
2. Gibson：関係としてのaffordance
3. Warren：階段と脚の長さ
4. Norman：UIでaffordance/signifierが混線した歴史
5. Gaver：perceptible / hidden / false
6. practical 4-layer model
7. accessibility：actor swap
8. sports：passing opportunity / representative learning
9. robotics：perception-to-action
10. Agent-Swap Test
11. Affordance Audit
12. misuse / limitation
13. openingの段差へ戻る
14. sources

## Phase 3｜Re-research

A. Body-scaled perception
Warren (1984):
https://pubmed.ncbi.nlm.nih.gov/6238127/

確認：
- stair riser height relative to leg length
- climbable / unclimbable boundary
- biomechanical modelとの対応
- 「万人共通の高さ」と誤読しない

B. HCI
Gaver (1991):
https://doi.org/10.1145/108844.108856

McGrenere & Ho (2000):
https://graphicsinterface.org/proceedings/gi2000/gi2000-24/

確認：
- perceptible / hidden / false affordance
- HCIで用語が拡散した経緯
- affordanceとusabilityを同義にしない

C. Sports
Pepping et al. (2011):
https://research.rug.nl/en/publications/affordances-shape-pass-kick-behavior-in-association-football-effe/

Pinder et al. (2011):
https://pubmed.ncbi.nlm.nih.gov/21451175/

確認：
- distance / social contextでpass kick behaviorが変わる
- representative learning designは知覚-行為の機能的結合を残す議論
- 「affordance理論だけでサッカー判断を全説明できる」と書かない

D. Robotics
Ardón et al. (IJCAI 2021):
https://www.ijcai.org/proceedings/2021/590

確認：
- bridge perception to action
- object / action / effect relations
- generalisation to unseen scenarios
- 研究分野の多様性と未解決点も残す

E. Accessibility / interaction
WCAG 2.2:
https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

確認：
- affordanceそのものと規格要件を同一視しない
- target / focusは実行可能性・発見可能性の具体的条件として使う

## Overkill Method｜Agent-Swap Test

同一設計を変えず、actor / contextだけを交換する。

例：スタジアム入場ゲート

- 常連、両手が空いている
- 初来場、チケット画面から探す
- 子ども＋荷物、片手のみ
- 車いす＋同行者
- 雨・逆光・混雑・焦り

各ケースで、
- action possible?
- discoverable?
- executable?
- recoverable?
を点検する。

これは既存の学術標準ではなく、記事内提案と明示する。

## Practical Model

本稿独自の制作整理：

1. POSSIBILITY
2. DISCOVERABILITY
3. EXECUTABILITY
4. FEEDBACK

監査テンプレート：

1. ACTOR
2. ACTION
3. ENVIRONMENT
4. POSSIBILITY
5. SIGNIFIER
6. RECOVERY

既存理論の正式分類として扱わない。

## Hayot / Uneven U Rule

各段落は、
4 問題設定
→ 3 分析
→ 2 場面
→ 1 具体データ／行為
→ 2/3 再解釈
→ 4 更新された問題
→ 5 一段大きな含意
を意識する。

順番を機械的に固定しない。段落末は冒頭の言い換えで閉じず、その具体例を通ったから初めて言える認識へ進む。

文章全体でも、前段落の到達点を次段落の出発点にする。

## Editorial Rules

- 「Affordance = 押せそうな見た目」と断定しない。
- Gibson / Norman / Gaverの用語を混同しない。
- signifierとaffordanceを分ける。
- accessibilityをaffordanceだけで説明し切らない。
- WCAG要件をGibsonの理論の証明として扱わない。
- sports / roboticsの研究を異分野へ過剰一般化しない。
- 本稿独自の4層モデル、Agent-Swap Test、Affordance Auditは「提案」と明示する。
- 「誰にとって」「どの環境で」を省略しない。
- 専門概念を幼児語へ落とさない。
- 同じ結論を言い換えて水増ししない。
- 見出しはテーマ名ではなく、その節で新しく言える結論にする。

## English-Mix Requirement

日本語Canonical Sourceを先に完成させる。

EN MIXは以下を厳守：
- H2順序1:1
- p / ul / ol / blockquote / figureのsemantic block数・型1:1
- 段落の結合・分割禁止
- 英語化は各block内部だけ
- simple English
- 日本語Canonicalの論理を削らない
- strict structure validationを通す

## Quality Gate

- 読後に「affordance = UI用語」という理解が崩れるか
- 物ではなくrelationshipとして説明できているか
- Warrenの研究が飾りではなく中心命題を具体化しているか
- signifierとの混線を訂正できているか
- sports / robotics / stadiumが同じ原理の別例としてつながるか
- 実務で翌日から使える監査問いがあるか
- FACT / INTERPRETATION / PROPOSALの境界が見えるか
- paragraph endingが認識を一段進めているか
- source linkが主要factに付いているか
- 冒頭の「段差」が最後に別のものへ見えるか

## Ending

> デザインは物を作るだけではない。人が次に何をできるか、その地形を作っている。

最初は「段差」という名詞だったものを、最後には「座る・登る・越える・止まる」という行為可能性の束として見える状態へ変える。
