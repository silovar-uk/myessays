---
id: affordance-action-possibility-relation
title: "「座れる」は椅子の性質ではない――アフォーダンスは人と環境の間にある"
subtitle: "English Mix｜The same step can be a seat, a wall, or a route: affordance as a relation"
created: "2026-09-19"
updated: "2026-09-19"
type: "English Mix"
status: "完成"
mode: "english-mix"
english_ratio: 0.4
mix_unit: "sentence"
tags: ["Affordance", "Ecological Psychology", "Design", "UX", "Accessibility", "Sports", "Robotics", "James J. Gibson", "Don Norman"]
keywords: ["affordance", "Gibson", "Norman", "signifier", "action possibility", "ecological psychology", "representative learning design", "robotics", "stadium UX"]
favorite: 5
grow: 5
abstract: "アフォーダンスを「押せそうな見た目」の同義語として扱わず、行為者と環境の関係として捉え直す。Gibsonの原義、Normanによるデザイン領域での整理、Warrenの階段研究、GaverのHCI、スポーツ、ロボティクスを横断し、最後に実務で使えるAffordance AuditとAgent-Swap Testへ落とし込む。"
---

# 「座れる」は椅子の性質ではない――アフォーダンスは人と環境の間にある

## English Mix｜The same step can be a seat, a wall, or a route

There is one step in front of us.

One adult may sit on it. A child may climb it. For a wheelchair user, the same step can become a boundary that stops movement.

So what exactly is this step?

「座るための物」「登るための物」「邪魔な物」のどれか一つに決めると、すぐに破綻する。物体は同じでも、身体、技能、目的、周囲の状況が変われば、そこで可能な行為が変わるからだ。

この違和感を言葉にした概念が、affordanceである。James J. Gibsonは、環境が動物に何を「提供するか」を考えるためにこの語を導入し、環境と行為者の相補的な関係として扱った。

Source: https://doi.org/10.4324/9781315740218

Here is the conclusion first.

> **アフォーダンスは、物の中に貼られた機能ラベルではない。「この行為者が、この環境で、何をできるか」という関係である。**

Take that sentence seriously, and affordance stops being a UI-only word. The same lens can be used for architecture, accessibility, sports practice, event operations, and robotics.

## 1. FACT｜アフォーダンスは「物の特徴」ではなく「行為者との関係」だった

The crucial move in Gibson’s theory is that an affordance is not reduced to a single property such as color, shape, or hardness. A rigid, level, extended surface may afford support; a surface at a suitable height may afford sitting.

同じ面でも、小さすぎれば座れない。高すぎれば登れない。濡れていれば滑る。行為者側の身体寸法や能力が変われば、環境側の意味も変わる。

Don Normanも後年、Gibsonのaffordanceを「特定の行為者と特定の環境の間で可能になる行為の関係」と整理し直している。Norman自身、デザイン分野へ持ち込んだ際に「perceived affordance」と呼ぶべきだったと振り返った。

Source: https://jnd.org/affordances-and-design/

So nouns are not enough. “Button,” “chair,” and “gate” tell us what an object is called, not what action it enables for a particular actor.

**To think in affordances is to turn nouns into verbs.** Sit, pass, grasp, kick, press, recover. We stop classifying objects and start reading the environment through possibilities for action.

## 2. EXPERIMENT｜階段は、脚の長さとセットで初めて「登れる」になる

This relation is not only a neat metaphor. In 1984, Warren varied stair riser height relative to leg length and examined the boundary between “climbable” and “unclimbable.”

3つの実験で、階段の高さそのものではなく、身体との適合が重要だった。知覚された「登れる」境界は、生体力学的なモデルから予測される境界と対応した。

Source: https://pubmed.ncbi.nlm.nih.gov/6238127/

ここで面白いのは、被験者が定規を出して脚と階段を測ったわけではないことだ。私たちは普段、「蹴上げ32cmだから可能」と数値計算してから脚を上げない。それでも身体と環境の関係を、行為の可否としてかなり直接的に扱っている。

We do not perceive only “height.” We also perceive something closer to “a height I can climb.”

するとデザインの問いが変わる。「この階段は何cmか」だけでなく、**誰の身体に対して、どんな行為を可能にしているか**が設計条件になる。

## 3. CORRECTION｜UIで「押せそう」を全部affordanceと呼ぶと、話が半分ずれる

In design practice, affordance is often used to mean “looks clickable” or “a cue for interaction.” The shorthand may work in conversation, but it mixes different problems.

Normanは2008年、「signifiers, not affordances」と題した文章でこの混乱をかなり明確に整理した。affordanceは行為可能性そのもの、signifierはその可能性を人が発見するための手掛かりである。

Source: https://jnd.org/signifiers-not-affordances/

たとえば、画面の一領域にクリック処理が実装されているなら、技術的には「クリックできる」。しかし、枠もラベルもカーソル変化もなく、本文と同じ見た目なら、人はそこを操作対象として発見できない。

William GaverはHCIの文脈で、知覚できるaffordanceだけでなく、hidden affordanceやfalse affordanceを区別し、知覚と行為可能性のずれが誤操作を生むと論じた。

Source: https://doi.org/10.1145/108844.108856

This is where “can do” separates from “can tell that I can do.” Fix only the first and the function may stay undiscovered; fix only the second and you get something that looks clickable but does nothing.

このサイトの別稿では、SignifierをForm / Language / Position / State / Conventionへ分解し、手掛かりを一つずつ消すCue Removal Testを扱った。

Related: https://silovar-uk.github.io/myessays/#/essay/design-literacy-signifier-cue-removal-test?lang=ja

This article goes one layer deeper. Before asking how an action should look, ask **what action the design actually makes possible**.

## 4. PRACTICAL MODEL｜実務では「可能」「発見」「実行」「結果」を分ける

A concept becomes useful at work only when it changes diagnosis. The four layers below are a practical model proposed in this article, not a formal taxonomy by Gibson or Norman.

1. **POSSIBILITY** — その行為は本当に可能か
2. **DISCOVERABILITY** — 可能だと本人が気づけるか
3. **EXECUTABILITY** — その身体・端末・状況で実行しやすいか
4. **FEEDBACK** — 実行後、何が起きたか確認できるか

たとえば「チケット購入」ボタンなら、リンクが生きていることはPOSSIBILITY、押せる見た目やラベルはDISCOVERABILITY、十分なタップ領域やキーボード操作はEXECUTABILITY、完了画面や状態変化はFEEDBACKに近い。

W3CのWCAG 2.2がTarget SizeやFocus Visibleを別々の要件として扱うのも、「操作可能である」の一言では人間の実行条件を十分に扱えないことを示している。

Source: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum

Source: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html

When someone says “make the button bigger” or “use a stronger color,” ask which layer is failing. That small question turns aesthetic preference into diagnosis of action failure.

## 5. ACCESSIBILITY｜「平均的なユーザー」を一人置くと、affordanceを見失う

If affordance is relational, the singular word “the user” is dangerous.

同じ自動ドアでも、歩行速度、身長、視覚、聴覚、手の自由度、補助具、認知負荷が違えば、行為の条件は変わる。さらに雨、逆光、混雑、騒音、手袋、荷物といった一時的な条件でも変わる。

This is not only about adding a special version for special users. **Swap the actor, and the hidden assumptions about body and context become visible.**

ここでアフォーダンスは、アクセシビリティを「後から配慮する項目」ではなく、設計の前提条件を暴くテストとして使える。

物を変えていないのに、行為者を変えただけで「できること」が変わる。その事実は、障害が個人側だけにあるのではなく、環境との不適合として現れる場合があることも見せる。

## 6. SPORTS｜パスコースは「空いている場所」ではなく、瞬間的に生まれる行為可能性になる

On a football pitch, affordances start to look almost alive.

A passing lane is not painted on the grass. As teammates, opponents, speed, body orientation, skill, and time change, the possibility “I can play it now” appears and disappears.

2011年のPeppingらの研究では、静止したゴールへ蹴る条件と、味方へパスする条件を距離を変えて比較したところ、距離や社会的文脈に応じてキック技術、準備時間、高さなどが変化した。

Source: https://research.rug.nl/en/publications/affordances-shape-pass-kick-behavior-in-association-football-effe/

またRepresentative Learning Designの議論では、競技で必要な知覚と行為の結びつきを練習環境でも保つことが重視される。動かないコーンへ正確に蹴る能力と、相手が閉じてくる中で「今ここに通せる」を知覚して実行する能力は、同じではない。

Source: https://pubmed.ncbi.nlm.nih.gov/21451175/

The practical implication is that a drill should not be judged only by how many repetitions succeeded.

**本番で出会う行為可能性を、練習環境がちゃんと発生させているか。** そう問うと、コーンの置き方、人数、スペース、制限時間、守備者の有無が、単なる難易度調整ではなく情報設計になる。

## 7. ROBOTICS｜ロボットも「これはコップです」から「これはつかめます」へ進む

Robotics uses affordances for the same reason: naming an object is not enough to choose an action.

「コップ」と認識できても、取っ手をつかめるのか、押せるのか、注げるのか、そのロボットアームの形状と現在位置で実行可能なのかが分からなければ、次の行動へつながらない。

2021年のIJCAIのレビューは、affordanceをAIエージェントが知覚から行為へ橋をかける仕組みとして整理し、対象物・行為・効果の関係や、未知状況への一般化という観点から研究を俯瞰している。

Source: https://www.ijcai.org/proceedings/2021/590

The useful shift is from object recognition to action-oriented representation: **not only what is there, but what can be done with it.**

人間にとって当たり前すぎる「持てそう」「通れそう」「届きそう」を機械へ教えようとすると、affordanceの関係性が逆に見えやすくなる。

## 8. OVERKILL TEST｜スタジアムの入場ゲートを、5人の別人に使わせたつもりで壊す

Now for an intentionally excessive practical test proposed here: **Agent-Swap Test**.

同じ入場ゲートを、そのまま5つの状況に置く。

1. スマートフォンを開いた状態で、両手が空いている常連
2. 初来場で、チケット画面の場所から探している人
3. 子どもと荷物を抱え、片手しか空いていない人
4. 車いすで移動し、同行者と一緒に通過したい人
5. 雨・逆光・混雑の中で、後ろに列が伸びて焦っている人

ゲートの機械は同じでも、発生する問題は変わる。QRコードは表示できるか。読取位置まで届くか。どちらを先に通すか分かるか。エラー後に戻れるか。スタッフへ助けを求める経路が見えるか。

The point is not to perform a ritual of writing five detailed personas.

**Deliberately swap only the actor and situation, then expose which conditions the design silently treated as fixed.** That is the purpose.

ここまで来ると、入場ゲートの設計対象は機械ではなくなる。チケット画面、列、サイン、照明、スタッフ配置、エラー回復まで含む「入場できる環境」全体が対象になる。

## 9. PROPOSAL｜Affordance Auditは「誰が・何を・どこで・どう知るか」を先に書く

When reviewing a plan, UI, or event route, put these six questions first.

1. **ACTOR** — 誰にとっての設計か
2. **ACTION** — 何を可能にしたいか
3. **ENVIRONMENT** — どんな状況で行うか
4. **POSSIBILITY** — 実際にその行為は成立するか
5. **SIGNIFIER** — 成立すると、どうやって気づくか
6. **RECOVERY** — 失敗したとき、別の行為へ移れるか

This is not an academic standard. It is a production and operations audit template derived from the argument above.

たとえば「ファミリー向けイベントを分かりやすくする」では抽象的すぎる。「ベビーカーを押し、片手が塞がった初来場者が、入場後3分以内にイベント場所を発見し、迷った場合もスタッフか案内へ戻れる」と書くと、初めて行為可能性として検証できる。

The value of “affordance” is not that it gives meetings a more academic vocabulary.

**「良いデザインか？」を、「この人は、この状況で、この行為を起こせるか？」へ変換できること**にある。

## 10. LIMITATION｜何でもaffordanceと呼ぶと、逆に何も説明しなくなる

Useful concepts have a failure mode: they can become useful for describing everything.

HCIではaffordanceの意味が拡散してきたこと自体が研究対象になっている。McGrenereとHoは2000年、GibsonとNormanの用法を整理し、HCI文献で概念が多様に使われてきたことを指摘した。

Source: https://graphicsinterface.org/proceedings/gi2000/gi2000-24/

「この色はaffordance」「このコピーもaffordance」「この導線もaffordance」と全部を一語で呼べば、分析はむしろ粗くなる。

本稿では、行為可能性をaffordance、その発見の手掛かりをsignifier、実行のしやすさを操作条件、行為後の理解をfeedbackとして、できるだけ分けて扱った。

The purpose of precision is not academic policing. It is to make different failure causes separately repairable.

## 11. DISCOVERY｜デザインは物を作るだけでなく、「できることの地形」を作っている

Return to the step from the beginning.

調べる前、段差は段差だった。高さ、幅、素材を持つ物体だった。

After the research, the same step looks different. Sitting, climbing, failing to cross, placing a bag, or pausing are layered there as possibilities that depend on the actor.

UIも同じだ。スタジアムも同じだ。サッカーのピッチも、ロボットが見る机の上も同じだ。

Designers do not create only screens, floors, and buttons.

> **人が次に何をできるか、その地形をつくっている。**

だから、アフォーダンスという言葉を知ったあとに一番変わるべきなのは、ボタンの見方ではない。

**世界を名詞の集まりとして見るか、行為可能性の集まりとして見るか。**

The concept becomes practical at the moment you stop seeing a step as only “a step.”

## 12. Sources

- James J. Gibson, *The Ecological Approach to Visual Perception*, “The Theory of Affordances”  
  https://doi.org/10.4324/9781315740218
- W. H. Warren Jr., “Perceiving affordances: visual guidance of stair climbing” (1984)  
  https://pubmed.ncbi.nlm.nih.gov/6238127/
- Don Norman, “Affordances and Design”  
  https://jnd.org/affordances-and-design/
- Don Norman, “Signifiers, not affordances”  
  https://jnd.org/signifiers-not-affordances/
- William W. Gaver, “Technology affordances” (CHI 1991)  
  https://doi.org/10.1145/108844.108856
- Joanna McGrenere & Wayne Ho, “Affordances: Clarifying and Evolving a Concept” (2000)  
  https://graphicsinterface.org/proceedings/gi2000/gi2000-24/
- Gert-Jan Pepping, Johan Heijmerikx & Harjo J. de Poel, “Affordances shape pass kick behavior in association football” (2011)  
  https://research.rug.nl/en/publications/affordances-shape-pass-kick-behavior-in-association-football-effe/
- Ross A. Pinder et al., “Representative learning design and functionality of research and practice in sport” (2011)  
  https://pubmed.ncbi.nlm.nih.gov/21451175/
- Paola Ardón et al., “Building Affordance Relations for Robotic Agents - A Review” (IJCAI 2021)  
  https://www.ijcai.org/proceedings/2021/590
- W3C, “Understanding SC 2.5.8: Target Size (Minimum)”  
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- W3C, “Understanding SC 2.4.7: Focus Visible”  
  https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
