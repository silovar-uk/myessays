# モダン・マリーザ「ワンボタン必殺技 vs OD必殺技」制作ノート

Date: 2026-09-15
Target essay id: `sf6-modern-marisa-one-button-vs-od-specials`

## 1. Research｜一次調査

### 最初の問い

「モダン・マリーザでは、なぜドライブゲージを2本払ったOD必殺技が、通常のワンボタン必殺技より単発ダメージで劣ることすらあるのか？」

この問いを起点にすると、単純な「通常技版／強化版」という整理では説明できない。調査では、①入力方式、②通常／ODという技バージョン、③ドライブ消費、④ダメージ、⑤フレーム・アーマー・壁やられ等の性能変化、を分離した。

### 主要資料と確認したこと

1. CAPCOM 2026年8月3日バトル変更リスト（マリーザ）
   - Modernの←+SP / Assist+←+SPがディマカイルスからファランクスへ変更。
   - 通常の←+SPは中ファランクス。
   - ↓+SP / Assist+↓+SPがファランクスからクアドリガへ変更。
   - 通常クアドリガは方向入力で強度を選べるようになった。
   - https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/marisa

2. SF6 Lab 現行フレームデータ
   - 弱グラディウス：17F、-5、1200。5-10F上半身アーマー1回。
   - ODグラディウス：19F、-2、1700。1-22Fアーマー2回、アーマーブレイク、SA2キャンセル。
   - 中ファランクス：28F、+3、1600。
   - ODファランクス：28F、+4、1400。アーマー強化、アーマーブレイク、画面端壁やられ。
   - 中クアドリガ：24F、-3、1500。強クアドリガ：29F、+1、1600。
   - ODクアドリガ：24F、-6、1500。壁やられ、アーマーブレイク、SA2キャンセル。
   - 通常スクトゥム：3Fからアーマー1回。ODスクトゥム：1Fからアーマー2回。
   - https://sf6-lab.net/fighters/marisa/frame
   - https://sf6-lab.net/fighters/marisa/moves

3. Modern simple inputの80％補正
   - SPボタンによる簡易入力で直接出した必殺技・SAは、原則として通常ダメージの80％になる。
   - 重要なのは「Modernなら常に80％」ではなく、同じModernでもコマンド入力で出した技はこの簡易入力補正を受けない、という点。
   - WIREDの開発者インタビューでもModernの簡易必殺技に80％ダメージという設計思想が説明されている。
   - https://www.wired.com/story/street-fighter-6-accessibility-takayuki-nakayama-interview/
   - https://note.com/tonpeidon/n/nbc92c680a5cf

4. 2026年Season 4のModern Marisa実戦整理
   - ワンボタングラディウス対空の使いやすさ。
   - 現行Modernでグラディウスは弱、ファランクスは中、クアドリガは強度選択可能という簡易入力側の構造。
   - 通常スクトゥムは下段に弱く、ODでは適用範囲が広がるという対策上の差。
   - https://note.com/emesirna/n/nb24053cdc1b1

5. 2026年8月調整の実戦的な意味
   - クアドリガの中版-3、強版+1への改善により、通常版そのものがpressure toolとして価値を持つ。
   - OD版は上位互換ではなく、壁やられ・アーマーブレイク・SA2接続などconversion側の価値を持つ。
   - https://note.com/tentamiko/n/nb3c8e9001d28

6. Eric Hayot “The Uneven U”
   - 段落を同一抽象度の情報列にせず、問題設定から具体へ降り、具体を通過したことで一段高い洞察へ上がる構造として使用。
   - 典型イメージは4→3→2→1→2/3→4→5だが、固定テンプレとしてではなく「段落末で認識を前進させる」ために使う。
   - Hayot自身の議論はparagraphだけでなくlarger structureへscaleできるため、各節の到達点を次節の問いへ接続した。
   - https://doi.org/10.7312/hayo16800-008

### 数字から出発した異常値

簡易入力時の代表例を80％で換算すると、次のようになる。

- 弱グラディウス：1200 → 960
- ODグラディウス：1700 → 1360
- 中ファランクス：1600 → 1280
- ODファランクス：1400 → 1120
- 中クアドリガ：1500 → 1200
- 強クアドリガ：1600 → 1280
- ODクアドリガ：1500 → 1200

特に中ファランクス1280に対してODファランクス1120となり、「2本払ったODの方が単発ダメージで160低い」という逆転が起きる。この異常値を、ODが何を買う仕組みなのかを考えるフックにした。

## 2. Structure｜Uneven Uでの構造化

### 導入

4: 「2本払ったのに弱い」はなぜ起きるのか
→ 1: ODファランクスの単発ダメージ逆転
→ 2: simple input 80％とOD 2本消費
→ 3: 二つは別種のコスト
→ 5: 必殺技選択は小さな資源配分問題である

### 1. 比較軸そのものを疑う

4: one-button vs ODは本当に対立軸か
→ 2: one-button=input method、OD=move version
→ 1: simple normal / simple OD / command ODの具体例
→ 3: 少なくとも三層のchoiceが重なる
→ 5: Modern Marisaは「簡単操作」よりmultiple pricingとして読む方がよい

### 2. One-buttonの価値

4: 20％を失って何を買っているのか
→ 1: 弱グラディウス17F、N+SP、960
→ 2: startupそのものではなくhuman input sequenceが短い
→ 3: 「0か960か」と「960か1200か」は別問題
→ 5: one-buttonはdecision latencyを後ろへずらす権利を買う

### 3. ODグラディウス

4: ODは何を買うのか
→ 1: 1Fから2hit armor、-2、armor break、SA2 cancel
→ 2: 400damage増だけでは説明不足
→ 3: moveが負ける条件そのものが減る
→ 5: ODは数値強化ではなくlose conditionを書き換える契約変更

### 4. ODファランクス

4: 2本払ってdamageが減るのは矛盾か
→ 1: 1280 vs 1120
→ 2: +3→+4、wall splat、armor break
→ 3: immediate damageよりnext-state valueが増える
→ 5: ODは拳を重くするより「こちらのゲームを続ける」ための支払い

### 5. クアドリガ

4: 通常版がODより攻め継続に向くことはあるか
→ 1: 中-3、強+1、OD-6
→ 2: Burnoutでは中+1、強+5相当
→ 3: ODはwall splat / conversionを買う
→ 5: hierarchyではなくpressure vs conversionの選択になる

### 6. スクトゥム

4: damageのないOD化をどう評価するか
→ 1: 3F 1hit armor vs 1F 2hit armor
→ 2: lower-body coverageも改善
→ 3: 読みが多少ずれても成立する範囲が広がる
→ 5: Driveはprediction accuracyを補うresourceでもある

### 7. 実戦ルール

4: 技ごとの暗記をどうdecision ruleへ変えるか
→ 1: reaction / lose condition / confirmed hit / remaining gaugeの四問
→ 3: simple / command / ODを局面ごとに使い分ける
→ 5: 熟達とはone-button卒業ではなく複数価格を使い分けること

### 8. Frame tableの読み方

4: Damage列だけでODを評価できるか
→ 1: Gladius +400、Phalanx -160、Quadriga 0という異様な料金表
→ 2: Armor / On Block / Wall Splat / Cancelを並置
→ 3: 共通項はstate transitionの強化
→ 5: ODは別の未来へ進むためのbranching fee

### 9. 結論

4: 2026 Modern Marisaは何が面白いのか
→ 1: Phalanx/Quadriga再配置、Quadriga strength selection
→ 3: Modern自体が単純化一辺倒ではなくchoiceを増やしている
→ 4: なぜOD Phalanxが低damageでも成立するのか
→ 5: time・damage・Drive・certaintyを交換するtiny economyとして理解できる

## 3. Re-research｜反証・修正

### 修正1：「ワンボタン必殺技 vs OD必殺技」をそのまま二分しない

NG: ワンボタン必殺技は通常版、OD必殺技は強化版。

OK: 「ワンボタン」は入力方法、「OD」は技バージョン。Modernにはsimple ODもcommand ODもある。比較軸をinput costとresource costへ分離する。

### 修正2：「Modernは必殺技の強度を選べない」は2026年時点で一般化できない

旧来の一般説明ではsimple specialは強度固定とされることが多い。しかし2026年8月以降のMarisaではQuadrigaが方向入力で強度選択できる。古いModern解説だけで現行仕様を断定しない。

### 修正3：「ODは火力強化版」は誤り

中ファランクス1600に対しODファランクス1400であり、simple input換算でも1280対1120になる。ODの価値はwall splat、armor、on-block advantage等を含めて評価する。

### 修正4：「ワンボタンだから技自体の発生が速い」と書かない

簡易入力によって短くなるのは主にplayer側のinput sequenceであり、技のstartup frame自体が短縮されるわけではない。記事では「反応速度を買う」を、人間側のdecision-to-input latencyの短縮として限定した。

### 修正5：「ODスクトゥム=無敵技」と扱わない

ODスクトゥムは1Fから強いarmorを持つが、invincibilityではない。投げなど明確な対抗手段が残る。したがって「事故らない」「万能」とせず、「打撃読みが成立する許容幅を広げる」と表現する。

### 修正6：古いコマンド表を現行仕様の根拠にしない

2026年8月以前のデータベースや記事には、↓+SP=ファランクス、←+SP=ディマカイルスという旧配置が残っている場合がある。Damage scalingの実例には参照できても、現行Modern mappingは公式2026年8月変更リストとSeason 4資料を優先した。

### 修正7：クアドリガの旧フレームを混ぜない

2026年8月調整で中クアドリガはガード時-3、強クアドリガは+1へ変更された。旧シーズンの-4/-3等を現行値として使わない。

### 最終的に残した中心命題

**Modern Marisaのspecial-move choiceは、「easy inputかstrong moveか」ではない。Simple inputはdamageの一部と引き換えにtimeとreliabilityを買い、ODはDrive 2 stocksと引き換えにmove propertiesとnext-state valueを買い、command inputはtimeとeffortを払って20％を取り戻す。熟達とは一つの入力へ収束することではなく、局面ごとにどのcurrencyを払うかを選べるようになることである。**

## 4. Prompt｜再現用プロンプト

あなたは、対戦ゲームの技性能を「数値の大小」だけでなく、入力コスト・資源コスト・状態遷移・意思決定の観点から分析するリサーチャー兼Webライターです。

### Phase 1｜Research

対象となる技・システムについて、次の軸を必ず分離して調べる。

1. input method：簡易入力／コマンド入力
2. move version：通常／OD等
3. resource cost：Drive、SA、位置、charge等
4. immediate output：damage、startup、reach
5. state change：armor、frame advantage、wall splat、cancel、oki、corner carry
6. failure condition：何に負けるか、OD化で何が負けなくなるか

現行patch dateを確認し、公式変更リストと最新フレームデータを優先する。旧シーズン資料は、現行値の根拠ではなく変化の確認にのみ使う。

### Phase 2｜Find the weird number

最初に「料金とリターンが直感に反する数字」を探す。

例：
- resourceを払ったのにdamageが下がる
- ODなのにon blockが悪くなる
- normal versionの方がpressure向き
- simple inputの方が期待値上有利になる局面

その異常値を単なるtriviaにせず、「自分が暗黙に置いていた分類が間違っていないか」を疑う入口にする。

### Phase 3｜Uneven U structure

各段落を4→3→2→1→2/3→4→5のように、abstract question→analysis→concrete data→new abstractionへ動かす。

ただし順番は固定しない。最重要基準は次の一文である。

「この具体例を読む前には言えず、読んだ後なら言えることは何か」

各節の最後で得た認識を、次節の新しいproblem settingにする。全文の終点は冒頭の問いへの回答だけでなく、冒頭ではまだ立てられなかった上位の問いへ進める。

### Phase 4｜Re-research

初稿後、必ず次を反証する。

- input methodとmove versionを混同していないか
- startup frameとhuman input latencyを混同していないか
- ODをdamage upgradeと決めつけていないか
- armorをinvincibilityと表現していないか
- old patchのframe / command mappingを混ぜていないか
- one-button penaltyの適用条件を過剰一般化していないか
- resource costを単発damageだけで評価していないか

反証で二分法が壊れたら、より上位の軸へ上げる。

### Phase 5｜Practical rule extraction

技ごとの説明を終えたら、プレイヤーがmatch中に使える3〜5個のdecision questionsへ変換する。

例：
- 今必要なのはreaction speedか
- moveのlose conditionを変えたいか
- hitが確定していてmanual inputする時間があるか
- resourceを次の局面へ残す価値は高いか

「この技は強い」で終わらず、「どの条件ならどの価格を払うか」まで落とす。

### Phase 6｜Output audit

全文を次の基準で監査する。

- 最初の妙な事実が最後に別の意味へ見え直しているか
- numerical comparisonが新しい概念のために働いているか
- paragraph endingが冒頭の言い換えで終わっていないか
- readerが読後に新しいdecision ruleを持てるか
- current patchへのsource linkがあるか

English Mix版はCanonical日本語版とH2順・semantic blockを1対1で維持し、段落の結合・分割をしない。
