# SF6キャラ対策シリーズ設計
## 目的

『Street Fighter 6』のキャラクター対策を、相手の技表を網羅する百科事典ではなく、マリーザ使いが試合中に参照できる「回答表」としてシリーズ化する。初回はAlex、次回はElenaを対象とする。

## 想定読者

- マリーザを主に使うプレイヤー
- フレーム表は読めるが、試合中の判断へ変換しきれていない人
- モダン／クラシックの双方。操作差が重要な箇所だけ分ける
- 初心者向けに情報を薄めず、初見でも論旨を追える説明を求める人

## 守破離のUI原則

### 守 / Quick Read

記事冒頭に「10秒で見返す領域」を置く。

- 🔴 Red: 相手がplus。原則として最速mashを基本回答にしない
- 🟡 Yellow: こちらが先に動けるがpunishではない。turn reclaimとして扱う
- 🟢 Green: 相手が-4以下など、マリーザの最速技からpunishを狙える
- ±0は別枠。五分へ戻る境界として扱う
- 必ず「フレームだけでなく距離・姿勢・ヒット位置で届くか」を併記する

### 破 / Decision Read

技名の暗記を「visual cue → Marisa action」へ変換する。

例:
- 低く構えた → highの最速技を自動で押さない。lowの当たり方を確認
- armorが見えた → armor breakを候補にする。ただし万能回答にはしない
- slow plus move → guard後ではなく、完成前のinterrupt可能性を調べる
- unsafe moveをguard → 最大punishを固定する

### 離 / Lab Read

最後に5分のTraining Modeメニューを置く。

1. 速度ではなく「当たる高さ・距離」を測る
2. ±0 / -1〜-3 / -4以下の違いを連続で再生する
3. 相手のplus技後にmashして負けることも確認する
4. armor / armor break / throwの三すくみを検証する
5. 大きなminusは最大punishを一本固定する

## 情報設計

便利さを楽しさより優先する。記事の順番は毎回固定する。

1. 妙な一点をフックにする
2. 版管理を明示する
3. Quick Read
4. 相手固有のシステム／構え
5. Marisa Lens
6. minus技とpunish
7. plus技とinterrupt
8. armor・無敵・投げ
9. 相手の構造的weakness
10. visual cue → action
11. 5分Training Mode
12. 調べる前と後で認識がどう変わったか
13. Sources

## Visual Evidence

Markdownで外部画像アドレスを参照する。画像は装飾ではなく、フレーム表では落ちる情報を示す場合だけ使う。

優先順位:
1. 公式／一次資料
2. SuperCombo Wikiなどのヒットボックス画像
3. 現行バージョンを明示したフレームデータ
4. コミュニティ資料は仮説生成・実戦上の論点抽出に限定

各画像に「この画像で何を見るか」を1段落で説明し、出典ページへリンクする。

## Research → Structure → Re-research → Prompt

### 1. Research

- 現行バージョンと最新バランスパッチを確定
- 相手の全通常技・固有技・必殺技・SAを収集
- Marisaの最速技、low、armor、armor break、対空、SAを収集
- 公式一次資料を最優先し、Frame Data Search / SF6 Lab / Ultimate Frame Dataで相互確認
- コミュニティ情報は「この状況を検証すべき」という仮説として扱う

### 2. Structure

事実・解釈・提案を分離する。

- 事実: startup、on block、armor、姿勢、cancel可否
- 解釈: Marisaのどのbuttonが時間上／空間上噛み合うか
- 提案: Training Modeで試す回答、実戦での優先順位

### 3. Re-research

初稿を書いた後、危険な断定だけ再検索する。

- 「punish」と「turn reclaim」を混同していないか
- low profileに本当にhighが当たる／当たらないか
- armor hit数・発生F・armor break属性
- plus値が最新パッチ後の数字か
- 画像が対象技・対象バージョンと一致するか
- 「弱点」が単なる印象ではなく、仕様から説明できるか

### 4. Publish QA

- 見出しだけで論旨が追える
- 1ブロック1役割
- 数字にバージョン基準がある
- punishとinterruptを明確に分ける
- 「万能」「必ず」などの断定を、距離や例外がある箇所で使わない
- EN MIXはCanonical JAとH2順序・semantic block構造を1:1にする
- index / versions-index更新
- strict structure validation後にmainへ反映

## 再利用プロンプト

```text
あなたは『Street Fighter 6』のキャラクター対策を、マリーザ使い向けの実戦フィールドガイドへ変換するリサーチャー兼編集者です。

【対象】
Opponent: {{opponent}}
Player character: {{player_character=Marisa}}
Controls: {{control_type=Modern primarily, Classic also}}
Current version: {{version}}
Research date: {{date}}

【目的】
相手の技を網羅するのではなく、「試合中にMarisaが何をするか」へ翻訳する。
便利さ > 楽しさ。ただし読み物としては、妙な一点から入り、調査前後で見え方が変わる構造にする。

【必須工程】
1. Research
   - 現行バージョンと最新パッチを一次情報で確定
   - opponent / Marisa双方のframe data、armor、invincibility、low/high、cancel、stance特性を収集
   - 2つ以上の現行データソースで重要数値を再確認
2. Structure
   - 守: Red / Yellow / Greenの10秒Quick Read
   - 破: visual cue → Marisa action
   - 離: 5分Training Mode
3. Re-research
   - punishとinterruptの境界
   - low profile / hitbox / spacing
   - armor / armor break
   - 最新patch差分
   を再検証
4. Writing
   - 見出しはテーマ名でなく結論
   - 事実→解釈→原則→必要なら実戦提案
   - 「なぜそのbuttonか」をframeだけでなく高さ・距離でも説明
   - community opinionは事実扱いしない
5. Visual
   - ヒットボックス等、意味のある画像アドレスをMarkdownで埋め込み
   - 各画像に「何を見る画像か」とsource linkを付ける
6. Publish
   - JA Canonical
   - EN MIX（H2順序とsemantic blocksを1:1）
   - index / versions-index
   - strict validator

【シリーズ固定UI】
Red = do not mash by default
Yellow = reclaim turn, not guaranteed punish
Green = guaranteed punish if range reaches
Neutral = ±0 boundary

【最後】
冒頭の妙な疑問へ戻り、調査前と後で{{opponent}}の見え方がどう変わったかを書く。
次回記事へ流用できる「このキャラ固有で差し替える変数」も整理する。
```

## 次回: Elena

Alex編で固定したUIを変えず、Elena固有の以下だけを差し替える。

- Red / Yellow / Greenに入る技
- Marisaのどの通常技・armor・anti-airが刺さるか
- Elena固有の移動・回復・stance／specialの見え方
- 5分Training Modeの検証5本
- Visual Evidence 2〜4枚

シリーズの一貫性はデザインの統一ではなく、「相手が変わっても読む順番を学び直さなくてよいこと」で評価する。


## Elena 実装記録（2026-09-21）

Alex編の固定UIを継承し、Elena編では「安全な前進を無理に咎めない／本当のpunishだけ最大回収する」ことを中心命題にした。

### Researchで固定した事実

- 現行基準: Ver.2.0401.010（Frame Data Searchが2026-09-08に全技再取得）
- st.MK: 6F / on block +1
- st.HK: on block ±0
- cr.LP / cr.LK: -1
- cr.MK / f+MK / b+HK: -3
- Rhino Horn: 各版おおむね-9
- Scratch Wheel: Light -24 / Medium -30 / Heavy -33 / OD -46
- OD Scratch Wheel: 1-8F full invincibility
- Lynx Song派生:
  - Leopard Snap: -5 → Whirl経由+1
  - Harvest Circle: -9 → Whirl経由-4
  - Mallet Smash: -3 → Whirl経由+3
- Moon Glider: -3 / -2 / -2 / -3、follow-up完遂時はNormal -13 / OD -19
- Revival Dance Healing: 1950 damage + 1600 heal + Drive recovery、通常SA2は2800 damage

### Re-researchで修正した点

- Moon Gliderを「-3だから4F確反」としない。単体はpunishではなく、follow-upを含む連係としてTraining Modeで確認する。
- Lynx Songは派生名だけで分類しない。Whirl経由でblock advantageが反転するため、「Whirlを通ったか」を最初の観察項目にする。
- MarisaのarmorはElenaのmulti-hitに対する万能回答としない。Normal Gladius / Phalanxの1-hit armorはRhino HornやSpinning Scythe等の後続hitを残す。
- Healingは「1600回復＝1600得」と書かない。通常SA2との比較ではdamageを850落とすため、単純なlife differential追加分は750。実戦価値は回復上限とDrive recoveryで変わる。

### Elena編の再利用プロンプト差し替え変数

```text
Opponent: Elena
Hook: 正しくguardしているのに得した感じがしない
Opponent system axis: safe entry / Lynx Song branches / Lynx Whirl enhancement / Moon Glider / Healing
Red examples: st.MK +1, Whirl→Leopard +1, Whirl→Mallet +3
Yellow examples: cr.LP -1, cr.MK -3, Moon Glider -3~-2, normal Mallet -3
Green examples: cr.HP -7, Rhino Horn -9, cr.HK -12, Scratch Wheel -24~-46
Marisa-specific caution: one-hit armor vs Elena multi-hit
Overkill research: SA2 normal 2800 vs Healing 1950 + 1600 heal + Drive recovery
Training focus: redを押さない / yellowを欲張らない / greenを最大回収
```

Elena編では、シリーズUIの一貫性を維持しつつ「色が変わる原因」をAlex編のpostureからbranch historyへ変更した。シリーズの固定部分とキャラ固有部分を分離できている。
