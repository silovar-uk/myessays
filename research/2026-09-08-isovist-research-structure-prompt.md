# アイソビスト記事 制作ノート

Date: 2026-09-08
Target essay id: `isovist-visible-world-around-corner`

## 1. Research｜一次調査

### 最初の妙な一点

「廊下の角を1m進むだけで、見える空間はどれくらい増えるのか？」

アイソビストを用語解説から始めず、日常の身体感覚で起きている小さな変化を幾何学として検証する。

### 原典・主要資料

1. C. R. V. Tandy (1967), *The isovist method of landscape survey*
   - 後続研究でisovistという語の初期資料として参照される。
   - 原典そのものを直接確認できていないため、「Tandyが1967年に用いたものとして後続研究で参照される」と限定して記述。
   - https://www.tandfonline.com/doi/full/10.1080/13658816.2025.2581833

2. Michael L. Benedikt (1979), *To Take Hold of Space: Isovists and Isovist Fields*
   - isovistを、あるvantage pointから環境内でvisibleな点の集合として定義。
   - shape / sizeの数値化とisovist fieldsを提示。
   - https://journals.sagepub.com/doi/10.1068/b060047

3. Alasdair Turner, Maria Doxa, David O’Sullivan, Alan Penn (2001), *From Isovists to Visibility Graphs*
   - 複数地点間のmutual visibilityをvisibility graphとして扱う。
   - https://discovery.ucl.ac.uk/id/eprint/160/

4. Jan M. Wiener & Gerald Franz, *Isovists as a Means to Predict Spatial Experience and Behavior*
   - 16のvirtual indoor scenesを使い、isovist-derived measuresとnavigation / experiential ratingsとの関係を検討。
   - 相関を「因果」へ拡張しない。
   - https://link.springer.com/book/10.1007/b106616

5. Jakub Krukar et al. (2021), *Embodied 3D isovists: A method to model the visual perception of space*
   - 典型的な2D / generic 3D isovistの限界を検討。
   - embodied 3D isovistを提案。
   - 人間のembodied experience全体をモデル化するとは主張していない。
   - https://journals.sagepub.com/doi/10.1177/2399808320974533

## 2. Structure｜構造化

記事は「用語→歴史→応用」ではなく、読者の認識が段階的に変わる順序にする。

1. L字廊下の1mという小さな実験
2. その現象にisovistという名前がある
3. Tandy / Benediktで概念の由来を確認
4. 面積・形状などを測ると、角の振る舞いが数値になる
5. 一点から多点へ広げるとvisibility graphになる
6. 「では心理まで分かるのか？」で自分の説明を疑う
7. 2D / 3D / embodied perceptionの限界を再調査
8. スタジアム・駅・店舗・オフィスへ応用仮説を移す
9. 最初の角へ戻り、「障害物」から「隠れた空間を放出する装置」へ見え方を変える

### リズム設計

- 短い反応：「名前が強い」「最後の10cmがやたら仕事をする」
- 直後に正確な説明・条件・出典を置く。
- 笑いは事実の落差から作り、専門用語の茶化しだけで引っ張らない。
- 科学的な限界に入ったらボケを止める。

## 3. Overkill experiment｜もう一歩やりすぎる検証

### モデル

- 横廊下: 8m × 2m
- 縦廊下: 2m × 8m
- 重なりを除いたL字床面積: 28㎡
- opaque walls
- 2D ray casting
- furniture / people / lighting / eye height / field of viewは除外

### 結果

```text
distance to corner   visible area
1.0m                 18.00㎡
0.9m                 18.22㎡
0.8m                 18.50㎡
0.7m                 18.86㎡
0.6m                 19.33㎡
0.5m                 20.00㎡
0.4m                 21.00㎡
0.3m                 22.60㎡
0.2m                 24.40㎡
0.1m                 26.20㎡
0.0m                 28.00㎡
```

1m手前→角: 18㎡ → 28㎡ = 約1.56倍（+55.6%）。

重要なのは「1m動けば一般に1.56倍」という法則ではないこと。この特定のL字形状に対するtoy modelの結果。

## 4. Re-research｜再リサーチと監査

### 監査した主張

- `isovist = perceived spaciousness` と同一視しない。
- `areaが大きい = 快適` と書かない。
- `visibility = accessibility` と同一視しない。見えていても移動できない場合がある。
- Tandy 1967について、直接原典確認がない状態で「発明した」と断定しない。
- compactness / occlusivityなどの定義は実装差があるため、単一の固定式として紹介しない。
- 2Dモデルをhuman visionの忠実な再現として扱わない。
- Wiener / Franzの結果を因果ではなく、選ばれた実験課題での相関・予測可能性として扱う。
- 3D化すれば問題が解決すると書かない。embodied 3D研究自身も経験全体のモデル化を主張していない。

### 採用した言い換え

NG: 「アイソビストで人がどこへ行くか分かる」
OK: 「可視性由来の特徴と空間行動の関係を検討するための記述方法になる」

NG: 「広いアイソビストは開放感を生む」
OK: 「可視面積などの指標はspaciousness等との関係を検討する材料になり得る」

NG: 「角を1m歩けば世界が1.56倍になる」
OK: 「今回の単純なL字廊下モデルでは、1m手前から角までで可視床面積が18㎡から28㎡へ増えた」

## 5. Prompt｜再現用プロンプト

以下を、日常の小さな違和感や専門概念を“本気で調べる記事”を制作するときの標準工程として使う。

---

あなたは、日常の小さな違和感を入口に、専門的な概念を正確に掘り下げるWebライター兼リサーチャーです。

題材について、次の4フェーズを順番に実行してください。

### Phase 1｜Research

1. 題材の中から、最も小さく、妙で、具体的な疑問を1つ選ぶ。
2. 用語解説から始めず、日常の場面・数字・字面の違和感をhook候補にする。
3. 一次資料または原典に近い資料を優先して、定義・起源・主要研究を確認する。
4. 「誰が最初か」「何年か」「因果か相関か」など、断定リスクの高い主張をclaim ledgerとして分離する。
5. 題材に合う“もう一歩やりすぎる方法”を1つ実行する。例：簡易実験、数値比較、分類、シミュレーション、極端条件での検討。

### Phase 2｜Structure

記事を「定義→歴史→応用」の教科書順にしない。

基本構造：

1. weird hook
2. short reaction
3. accurate explanation
4. deeper research
5. overkill experiment
6. interpretation changes
7. counterargument / limitation
8. application to ordinary life
9. return to opening question with a changed view

短い感想と長めの説明を交互に置き、速度差を作る。

### Phase 3｜Re-research

初稿を書く前に、自分の主張を敵対的に監査する。

- 原典で本当にそう定義されているか
- 後続研究が意味を拡張していないか
- 相関を因果に変えていないか
- toy modelを一般法則にしていないか
- software implementation固有の定義を概念全体に広げていないか
- 人間の心理・身体・文化を幾何学だけで説明していないか
- 反例・例外・測れない要素は何か

問題があれば、面白さより正確さを優先して書き直す。

### Phase 4｜Draft + English Mix

日本語版は、事実そのものの妙さ、説明との落差、書き手の困惑から面白さを作る。無理なボケを連発しない。

English Mix版は、日本語をcomprehension baseとして40〜50%程度を目安に英語を混ぜる。全文対訳にしない。難しい概念・数字・出典・論証順序は日本語版と一致させる。

最後は要約ではなく、冒頭の対象が以前と違って見える一文で閉じる。

出典URLを本文末尾に明示する。

---
