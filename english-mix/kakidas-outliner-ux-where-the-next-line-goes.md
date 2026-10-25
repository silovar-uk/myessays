---
id: "kakidas-outliner-ux-where-the-next-line-goes"
title: "点を押すと枝が閉じる――Where Does the Next Thought Go?"
subtitle: "思考の次の一行を守る、outliner UXの守破離"
created: "2026-10-25"
updated: "2026-10-25"
type: "Essay"
mode: "english-mix"
status: "完成"
tags: ["kakidas", "アウトライナー", "UX", "UI設計", "守破離", "認知科学", "個人開発"]
keywords: ["outliner", "cognitive offloading", "information foraging", "WAI-ARIA", "Workflowy", "iPhone Safari", "undo", "focus management"]
grow: 5
abstract: "kakidasのUXを、競合の公式資料、W3C、Apple、認知科学とcode auditで再検討。The real issue is not feature count but predictability. 日本語を足場に、入力位置、Undo、mobile touch、下書きの保護、そして未分類のアイデアを受け止める逆提案を読む。"
---

# 点を押すと枝が閉じる――Where Does the Next Thought Go?

*Research and writing: October 25, 2026. 公開コード・公式ガイド・学術資料によるdesk research。iPhone Safariでの実機テスト、利用ログ分析、ユーザー調査は未実施。Confirmed implementation facts and untested UX hypotheses are distinguished.*

A tiny bullet can be a surprisingly complicated promise. kakidasでは「•」を押すと枝が閉じる。Workflowyでは同じbulletがzoomの入口になる。**Same mark, different action.** たった一文字に、ユーザーが次に何を見るかを決める責任が集中している。

これまでkakidasでは番号／ビュレット切替、戻すボタン、段落とアウトライナーの独立した書き口を実装した。改善は着実だ。だが、不便なところを一つずつ修理するだけでは、アウトライナーを本当に使いやすくしたことにはならない。**問うべきは「どんな機能を足すか」ではなく、「思考を止めずに次の一行へ進めるか」**である。

## 守｜そもそもアウトライナーとは、箇条書きではなく「関係を外に出す道具」である

An outliner is not merely a list with indentation. 親と子、兄弟同士、順序というrelationshipsを可視化する道具だ。たとえば「スポーツ事業」を親にして「市場規模」「参入障壁」を置き、参入障壁の下に「権利」「流通」「営業網」を置く。Without hierarchy, they are fragments. With hierarchy, they become a tentative model of a market.

Risko and Gilbert's review on **cognitive offloading** describes how people use the body and external environment to reduce internal processing demands. 紙に図を描くのも、アプリに階層を置くのも、この視点から理解できる。[Risko & Gilbert (2016)](https://pubmed.ncbi.nlm.nih.gov/27542527/) But the research does not prove that a particular outliner UI improves thinking. それは別途、ユーザー研究で確かめるべき仮説だ。

ところが外部化には皮肉がある。構造化のために「いま親は何か」「Enterは兄弟か子か」「書きかけはどの欄へ保存されるか」を毎回考えさせれば、軽くするはずの認知負担を画面が取り返してしまう。**よいアウトライナーは、階層を作る労力より、階層を見ることで減る労力の方が大きい。** その差が使いやすさの正体だと思う。

## 守｜Workflowyの「点」はズームする。kakidasの「点」は折りたたむ

Workflowy separates two actions in its official interaction model: a bullet opens a focused view, while a neighboring arrow expands or collapses children. Breadcrumbs return you to a parent; multiple panes preserve separate navigation histories.[Workflowy navigation](https://workflowy.com/help/navigate-around) / [Panes](https://workflowy.com/help/panes)

![Workflowy公式に掲載された階層とミラーの例。画面はkakidasではない](https://cdn.prod.website-files.com/608aecd1e643ecaa961a7a67/662c4d8c2e2074187d8744f5_6525bdb42d96ab0a0f13ed13_image1.gif)

*参考画面：Workflowy公式の[ミラー機能の解説](https://workflowy.com/learn/mirrors/)から画像アドレスを参照。製品の現在の見た目や操作をこの画像だけで検証したわけではない。*

一方、2026年10月25日時点のkakidasコード（`src/components/OutlineList.tsx`）では、子を持つ行の番号またはビュレットそのものを押すと、展開状態が切り替わる。集中表示は別の「⌕」操作として存在し、モバイルでは行の「⋯」に収められている。これは行頭をコンパクトにする意図と整合的だが、**小さな点の役割を初見で予測しにくい**という仮説も生む。なお、Workflowyの設計をそのまま正解とみなす必要はない。重要なのは、同じ記号に異なる行為を割り当てたとき、それを学習させる費用が発生することだ。

## 守｜「小さな見た目」と「大きな押しやすさ」は別物である

Apple recommends a touch hit area of at least **44 × 44 points** for buttons. 一方、kakidasはビュレットと本文の見える距離を詰めるため、行頭の幅を文字に合わせている。Mobile CSS provides a 44px-tall marker, but it does not establish a comparably wide target.[Apple HIG: Buttons](https://developer.apple.com/jp/design/human-interface-guidelines/buttons)

This is a genuine design tension. 見える余白は4px程度にしたい。でも指で押す場所は広く取りたい。Making an invisible tap target larger may steal taps from the text itself. だから「CSS上の幅を変えれば解決」とは言えない。

## 守｜コード監査：便利な機能は揃いつつあるが、意味の継ぎ目に負債がある

A source-code audit produces facts about implementation, not measured behavior. 次の表はその区別を保った整理だ。

| 観点 | コードで確認できた事実 | UX上の懸念・再検証点 |
|---|---|---|
| 行の選択 | PCでは行を選びEnterで編集、スマホでは選択した行を再タップすると編集 | 編集に至るまでの操作が端末で異なり、二度押しの理由が伝わりにくい |
| 折りたたみ | 子がある行の番号／点が開閉ボタン。子のない行は記号のみ | 親と末端の違いを視覚的に判別しにくい可能性 |
| 集中表示 | `zoomTo`とパンくずは実装済み。スマホの直接表示は「⋯」側 | 優れた機能が見つかりにくい可能性 |
| 次の入力位置 | `parentId`と`index`で書き口の挿入位置を管理。選択や折りたたみの状態と関係する | 今いる場所・次に置く場所が利用者の予測とずれる可能性 |
| 戻す | アウトラインのUndo履歴には保存済み本文編集と移動を記録 | 新規追加や他の操作まで一律に戻せるとは限らない |
| 下書き | 種類ごとに別の下書きIDを生成 | 次段落の`kind`値との整合確認が必要 |

最後の行は特に重要だ。`EntryComposer.tsx`では保存IDが`buildEntryDraftId(memoId, kind, ...)`になっている一方、同じ場所で`useDraftPersistence`へ渡す`kind`は`isDesk ? "sentence" : kind`となっている。**段落・参考URL用の下書きIDで保存するレコードに、種類としてsentenceが記録されうる。** IDでの個別復元は動いても、種類による集計・移行・保守で食い違う危険がある。これはUX実験以前に、整合性テストを追加して直したい実装上の不一致である。公開コードからは保存先の不整合を指摘できるが、ユーザーの下書きが現実に消失したと断定する根拠はない。[kakidas：EntryComposer](https://github.com/silovar-uk/kakidas/blob/main/src/components/EntryComposer.tsx)／[下書き保存処理](https://github.com/silovar-uk/kakidas/blob/main/src/repositories/draftRepository.ts)

## 破｜不満が集中する場所を見直す。「次の一行がどこへ行くか」が核心ではないか

Now for abductive reasoning: what single explanation could connect complaints about spacing, overlapping symbols, undo, and drafts jumping between panels?

Perhaps the true problem is **uncertainty about the next action's destination**. 番号かビュレットか、段落かアウトラインか、開閉かズームか。どれも「見ていた場所と、実際に変更される場所が一致するか」という問題を含んでいる。

- **情報の位置**：この項目はどの親の下に、どの順番で保存されるか。
- **画面の位置**：いま全体のどの枝を、どの深さで見ているか。
- **編集の位置**：次の一文字はどこへ入り、どの下書きに残るか。

従来のkakidasには一つの書き口を欄の間で動かす仕組みがあった。現在はそれぞれの欄に独立した書き口を持たせる改修がなされている。しかしアウトライナー内では、表示上の選択位置と新規行の挿入位置が結び付いており、集中表示や開閉によってユーザーの空間認識が変わる。ここにまだ設計余地がある。

**仮説：操作を速くするより、「押したら何が起こるか」を予測できるようにした方が、総作業時間は短くなる。** これは未測定の仮説だ。実際には、行移動の成功率、誤入力後の復旧時間、フォーカスの迷子率で検証すべきである。

## 破｜改修の主語を「行」から「次の操作」に変える

A conventional feature checklist asks what we can add to each row: zoom, collapse, detail, link, complete. でも実際の行動は「一行書く→並べる→眺める→戻す→続きを書く」と流れている。We should design the transitions, not only the object.

Consider a **next-line preview**: 選択中の行の近くに、次の一行が入る場所を一瞬だけ示す。Enter means add a sibling; Tab changes the nesting destination. 現行のkakidasには、次の挿入先を読み上げるdescriptionの計算がすでにある。This is not a proposal to add more persistent labels, but to make that existing information visible at exactly the moment of uncertainty.

```text
市場の魅力度
  市場規模
  参入障壁
    権利・許諾
    ─── 次の一行はここ ───
  成長性

Enter：この位置へ追加
Tab：子として入れる
Esc：変更せず離れる
```

上の図は仕様提案であり、現行画面ではない。特にスマホでは常設の説明を増やすと本文領域が縮む。目印はキーボード操作時、書き口へのフォーカス時、移動時の数秒だけ出すなど、視界を奪わない仕組みに絞る。

## 破｜競合製品をまねるなら、機能ではなく「予測の規則」をまねる

Workflowy's fundamentals are strikingly compact: Enter creates another bullet; Tab indents; Shift+Enter opens a note associated with the bullet.[Workflowy help](https://workflowy.com/help/add-edit-format) The product has extensive shortcuts, but everyday actions follow a learnable grammar.

kakidas does not need to become a smaller Workflowy. Its distinctive idea is the separation of short structural thinking, longer paragraphs, and supporting URLs. **An outline, an explanation, and the evidence for it can remain different things.** それを一つの巨大ツリーに押し込む必要はない。

ただし、その独自性を活かすには操作の意味を一本化すべきだ。段落を開くのは移動であり、段落に変えるのは変換。Undoはデータの変更を戻すのであって、前に見ていた場所へ戻る操作ではない。「戻る」という語も、**編集を戻す／集中表示から戻る／メモ一覧へ戻る**で混同しやすい。別の行為を同じ名前にしないことが、ボタンを一つ増やすより効く場合がある。

## 破｜優先順位を決める。「見栄え」より「誤操作の回復」を先に直す

Here is a hypothesis-driven implementation order. この順位は実測結果ではなく、コード監査と設計文献から立てた案だ。

| 優先 | 提案 | 利用者に返す価値 | 判定条件 |
|---|---|---|---|
| P0 | 下書きIDと`kind`の整合、旧下書き保護の自動テスト | 書きかけが消えない安心 | 復元・切替・再読込・失敗注入を通過 |
| P0 | 「次の一行」の挿入先を一瞬だけ可視化 | 意図しない親子化を予防 | 挿入先予測の正答率 |
| P0 | 戻す範囲を明示。新規追加・削除の履歴設計も検討 | 失敗しても試せる | 回復不能な誤操作ゼロを目標に検証 |
| P1 | 親項目の開閉状態を静かに示す | 点の意味が分かる | 開閉を初回で成功できる割合 |
| P1 | iPhoneで44ポイント相当の押しやすさを実測し、本文タップとの競合を検査 | 誤タップを減らす | 記号・本文それぞれの誤タップ率 |
| P1 | 選択／編集／移動を一つの規則に統一 | 二度押し・長押しの迷いを削減 | 初回編集成功率と所要時間 |
| P2 | 枝への集中表示を見つけやすくし、戻り先を保持 | 階層が深くても迷わない | 復帰時間、階層迷子率 |
| P2 | 現在の枝の中だけ検索し、そのまま修正 | 思い出した情報へ戻れる | 再訪時間 |
| 保留 | ドラッグ＆ドロップ、AI自動分類、装飾テーマの追加 | 見た目の進歩はあり得る | 基本操作の問題が解消するまで実装しない |

戻す処理についてはNielsen Norman Groupの**利用者の制御と自由（user control and freedom）**がよい基準になる。取り消しややり直しは、ミスを修復するだけでなく、試しに操作する勇気も支える。一方、追加した機能をすべて画面に常駐させると、今度は覚える対象が増える。**段階的な開示（progressive disclosure）**の考え方を使い、日常操作だけを表に出し、それ以外は必要なときに見せたい。[NN/g：利用者の制御と自由](https://www.nngroup.com/articles/user-control-and-freedom/)／[段階的な開示](https://www.nngroup.com/articles/progressive-disclosure/)

## 離｜アウトライナーは本来、思考を木構造に閉じ込める道具ではない

Here is the counterproposal: **What if an outliner is the wrong starting screen?**

When researching a market, ideas rarely arrive in hierarchical order. 「この数字はおかしい」「顧客の課題が違う」「競合はむしろ安い」。These arrive as fragments, not as a prearranged tree. Asking for parent and depth too early may encourage premature classification. That is a design hypothesis, not a proven kakidas-specific psychological harm.

ならば、最初に使うべき画面は完全なアウトライナーではなく、**ただ書ける受け皿（インボックス）**かもしれない。そこへ雑多な一行を置き、あとで二つを並べ、三つを束ね、必要になったときに階層を作る。「先に分類してから書く」の逆だ。

```text
受け皿（まだ決めない）
  ・市場の観測
  ・顧客から聞いた違和感
  ・出典が怪しい数字
       ↓ まとまりが見えてきたら
構造化（親子・兄弟へ）
       ↓ 説明したくなったら
段落化（論証を書く）
       ↓ 読み手へ渡すなら
清書（一本の文章へ）
```

これは「ビューを4つ増やす」という話ではない。**同じ情報を、思考の段階に応じて違う面で見る**という発想だ。むしろ最初は受け皿とアウトライナーの往復だけでよい。既存の段落・参考URL・清書との接続はその次に考える。

## 離｜一番大事なのは「情報を置いた場所」ではなく「戻って来られる道」ではないか

Pirolli and Card's **information foraging theory** examines the trade-off between the value of information and the cost of finding it.[Original CHI paper, 1995](https://chi1995.acm.org/proceedings/papers/ppp_bdy.htm) Hierarchy helps us file information. But our actual work unfolds over time.

You wrote a hypothesis yesterday. Today you want its evidence. 明日は反論を付け足したい。The best feature may be neither automatic tagging nor a fancier hierarchy; it may be **a reliable path back to the thinking context**.

Workflowyの複数表示枠には、それぞれ独立した戻る・進む履歴やスクロール位置があると公式が説明する。これは見た目の便利機能ではなく、文脈を失わない工夫と読める。kakidasであれば、PCでは参照用の枝を横へ固定し、iPhoneでは「直前の枝へ戻る」一本から始められるだろう。[Workflowy公式：複数表示枠](https://workflowy.com/help/panes)

しかしここでも慎重になりたい。履歴が増えると「戻す」と「戻る」の区別がさらに重要になる。どのボタンがデータを変更し、どれが画面だけを戻すか。利用者が見分けられなければ、新機能はかえって不安になる。

## 検証｜再リサーチで提案をどう削ったか

The second pass removed three tempting ideas. First, "make the dot zoom like Workflowy" was too simplistic; kakidas has valid reasons to use it for collapse. Second, "make the left gutter 44px wide" risked sacrificing text density without proving tap accuracy. Third, AI-driven restructuring was postponed because it might reproduce the very feeling we want to eliminate: **my thought moved without my permission**.

W3C's Tree View guidance separates keyboard focus from selection and describes left/right expansion and parent navigation, up/down movement, and expected accessibility semantics.[W3C Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) kakidasにも矢印操作はある。しかし、IME変換中の入力、iPhone Safariの選択範囲、スクロール復帰、ブラウザ再読込についてはテストが不可欠だ。

具体的な検証は、既存データを複製した試験用メモで行う。親・子・孫が各3行ずつある状態で、①兄弟へ一行追加、②子へ字下げ、③親を閉じて再び開く、④集中表示して元の場所へ復帰、⑤誤移動して戻す、⑥アウトライナーと段落を往復して下書きを復元、⑦ブラウザ再読込、⑧ネットワーク遮断を順に実施する。測るのは操作数だけでなく、**事前に予想した保存先との一致率、誤タップ、失われた文字、復帰までの時間**である。現段階で数値目標を「達成済み」と呼ぶことはできない。

## 結論｜最高のアウトライナーは、思考の途中で存在を忘れられる

The best outliner may be the one that disappears during thinking. 次の一行がどこへ入るかを予想でき、間違えたら戻せ、まだ関係が見えていない思考には分類を迫らない。

Start by fixing data integrity, insertion predictability, reversible actions, and mobile tap reliability. Then improve focused navigation and history. And finally consider the deeper inversion: **the moment before structure exists may be exactly the moment worth protecting.**

## 調査資料・参照リンク

- [kakidas：アウトライナー実装](https://github.com/silovar-uk/kakidas/blob/main/src/components/OutlineList.tsx)
- [kakidas：入力欄・下書き実装](https://github.com/silovar-uk/kakidas/blob/main/src/components/EntryComposer.tsx)
- [kakidas：下書き保存リポジトリ](https://github.com/silovar-uk/kakidas/blob/main/src/repositories/draftRepository.ts)
- [Workflowy公式：基本操作](https://workflowy.com/help/get-started)
- [Workflowy公式：移動とズーム](https://workflowy.com/help/navigate-around)
- [Workflowy公式：入力・編集とショートカット](https://workflowy.com/help/add-edit-format)
- [Workflowy公式：検索](https://workflowy.com/help/search-your-notes)
- [W3C：Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
- [Apple公式：ボタン](https://developer.apple.com/jp/design/human-interface-guidelines/buttons)
- [Nielsen Norman Group：利用者の制御と自由](https://www.nngroup.com/articles/user-control-and-freedom/)
- [Risko & Gilbert（2016）：認知の外部化](https://pubmed.ncbi.nlm.nih.gov/27542527/)
- [Pirolli & Card（1995）：情報採餌理論](https://chi1995.acm.org/proceedings/papers/ppp_bdy.htm)
