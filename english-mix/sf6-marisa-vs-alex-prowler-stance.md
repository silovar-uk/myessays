---
id: sf6-marisa-vs-alex-prowler-stance
title: "11 Options, But You Cannot Block."
subtitle: "Marisa vs AlexをRed / Yellow / Greenで読む――minus frames, interrupts, armor, Breaker Stance"
created: "2026-09-20"
updated: "2026-09-20"
type: "Matchup Field Guide / EN MIX"
status: "完成（EN MIX）"
tags: ["Street Fighter 6", "SF6", "Marisa", "Alex", "Matchup Strategy", "Frame Data", "Fighting Games"]
keywords: ["Marisa", "Alex", "Prowler Stance", "Breaker Stance", "frame data", "armor", "punish", "matchup"]
grow: 5
abstract: "2026年9月20日時点、Ver.2.0401.010対応。Alexの技を全部覚えるのではなく、Marisa目線で『guard後に我慢する赤』『turnを取り返す黄』『punishを取る緑』へ圧縮する。Breaker Stanceのlow profile、4F cr.LPがwhiffし得る理由、5F／9F lowの役割、+2〜+5の危険技、-4／-6／-11以下の回収、Heavy LariatのarmorとGladiusのarmor break、5分Training Modeまでを一つのdecision系にまとめる。"
---

# 11 Options, But You Cannot Block.
## Marisa vs Alexを「赤・黄・緑」にする――minus frames、割り込み、armor、Breaker Stance

### Abstract / 要旨

AlexのBreaker Stanceには、移動を含めて11種類の派生がある。打撃、low、空中攻撃、command throw、armor技まで出てくる。counterplayする側から見ると、move listが急に期末試験になる。

ところが、調べて最初に面白かったのは別の事実だった。**Breaker Stance中のAlexはguardできない。** しかも構えはlow profileで、Marisaの4F cr.LPのような「速いhigh」がwhiffし得る。つまり問題は11択を全部memorizationすることではない。「構えに入る前」「構えた瞬間」「派生をguardした後」の三つを分け、こちらのactionを変えることだった。

本稿は2026年9月20日時点、Frame Data Searchが掲げる**Ver.2.0401.010**を基準にする。8月3日のYear 4開始時には全キャラクターのバトル調整が入り、AlexではOblique Stompがguard時+1から+2へ変更されるなど、以前のcounterplay記事と数字がずれる箇所がある。数値はFrame Data SearchとSF6 Labを突き合わせ、counterplayの解釈は技のproperty・distance・姿勢を分けて考えた。

結論を先に置く。Marisa側がmatchへ持ち込むべきものは11択のmemorizationではなく、**赤＝押さない、黄＝punishではないがturnを取り返す、緑＝punishを取る**という三色と、構えそのものへは**highの速さよりlowの高さ**を見る癖である。

## 1. 守：まず覚えるのは11択ではなく「赤・黄・緑」

最初はこの三色だけでよい。数字は「相手の技をguardした直後、誰が先に動けるか」を示す。distanceで技が届かない場合はあるため、以下は時間上の基準であり、実戦では必ずリーチも一緒に見る。

- 🔴 **赤＝Alex有利。fastest mashを基本回答にしない。** Palm Jab+1、溜めst.HP／溜めst.HK+2、Oblique Stomp+2、Flash Chop+2、Air Stampede+2、Heavy Lariat+3、溜めHeavy Lariat+5。ここで4F cr.LPを反射的にpressすると、相手の4Fなどに先に触られる。
- 🟡 **黄＝こちらが先に動けるが、punishではない。** Slashing Elbow-1、cr.LP／弱K／中P／中K-2、st.HP／チョップ／Palm Strike-3など。Marisaの4F cr.LPで相手の4F暴れを潰しやすいが、「guardしたからダメージ確定」ではない。
- 🟢 **緑＝-4以下。Marisaの4F cr.LPからpunishを狙える。** st.MK／st.HK／弱Flash Axe／OD Flash Chop-4、st.LK-5、cr.HP／Shoulder Launcher／中Flash Axe-6、cr.HK-11、Twisted Drop-15、Sweep Combination1段目-17／2段目-20。distanceが近ければ、-6では6F st.LK、-11なら7F st.MPなど、より大きなpunishへ上げられる。

ひとつだけ別枠がある。st.MPはguard時±0。Alexのst.LPもMarisaのcr.LPも4Fなので、時間だけ見れば同時startupになり得る。**0は「こちらのturn」ではなく、再び五分から始まる境界線**として覚える方が安全である。

## 2. 変な事実：Breaker Stanceは11択あるのに、guardがない

Breaker Stanceは、英語版でProwler Stanceと呼ばれる低い構えである。そこからSlashing Elbow、Palm Jab、Shoulder Launcher、Heavy Lariat、Tactical Hop、Air Stampede、Sweep Combination、Hyper Takedown、Dangerous Armbarなどへ分岐する。さらに前後移動もある。数えるほど嫌になるのは正常である。

ただし、構え中はguardできない。ここが構造上の代償になる。しかも構えはlow profileなので、「相手が守れないならfastest技を押せばよい」でも終わらない。high判定の技は、startupが速くても姿勢の低さに負けて空を殴る場合がある。Alex counterplayは**速度×高さ×distance**の問題になる。

![Alexの構え派生・Dangerous Armbarの判定例](https://wiki.supercombo.gg/w/Special:Redirect/file/SF6_Alex_2pp_lplk_hitbox.png)

画像はSuperCombo Wikiのヒットボックス資料。赤が攻撃／投げ判定、緑・青系がキャラクター側の判定を示す。画像そのものは一つの派生例だが、重要なのは「構えを見たら技名を当てる」より、**今のAlexはguardできる状態か、low profileでこちらの技を潜る状態か**を見ることにある。[画像出典：SuperCombo Wiki](https://wiki.supercombo.gg/w/File:SF6_Alex_2pp_lplk_hitbox.png)

## 3. Marisaの4Fは速い。でも構えには「高さ」で負ける

現行版のMarisaは、cr.LPが4Fでhigh、cr.LKが5Fでlow、cr.MKが9Fでlowである。通常のguard後なら4F cr.LPは最重要ボタンだが、low profileのBreaker Stance相手では「fastest」という長所だけで採用するとwhiffが起こり得る。

そこで構えそのものを止める場面では、**5F cr.LKを第一の低リスクlow、9F cr.MKを少し遠いdistanceのlow**としてTraining Modeで当たり方を確認する価値がある。どちらも通常の必殺技キャンセル技ではないため、当てた瞬間に大火力へ変換するボタンではない。目的は「構えを見て最大を取る」ではなく、まず「構えっぱなしを無料にしない」ことである。

![Marisaのcr.MK。低い位置に攻撃判定が伸びる](https://wiki.supercombo.gg/w/Special:Redirect/file/SF6_Marisa_2mk_hitbox.png)

この画像を見ると、frame表だけでは落ちる情報が分かりやすい。同じ9Fでも「どこを殴る9Fか」が違う。Marisa対Alexでは、この空間情報が4F／5Fという速度差と同じくらい重要になる。[画像出典：SuperCombo Wiki](https://wiki.supercombo.gg/w/File:SF6_Marisa_2mk_hitbox.png)

## 4. punishは-4から。-1〜-3は「割り込める」であって「確定」ではない

Marisaのfastestは4Fなので、時間上のpunishは原則として相手が**-4以下**から始まる。ここを曖昧にすると、「-1だから押せる」と「-4だから確定する」が同じ言葉になり、counterplayが崩れる。

- **-1：Slashing Elbow。** Marisaが1F先に動ける。4F cr.LPは、相手が直後に4Fをpressなら先に当たりやすい。ただし相手がguardすれば防がれる。これはturn奪取であってpunishではない。
- **-2：Alexのcr.LP／弱K／中P／中K。** 4F cr.LPを置けば、相手のfastest4Fより時間上2F先行する。distanceが近いなら「触り直す」場面。
- **-3：st.HP、チョップ、Palm Strike。** 4F cr.LPだけでなく6F st.LKまで、相手の4F暴れより先に当てられる計算になる。ただしpunishではない。
- **-4：st.MK、st.HK、弱Flash Axe、OD Flash Chop。** 4F cr.LPが届けばpunish。
- **-6：cr.HP、Shoulder Launcher、中Flash Axe。** 4F cr.LPに加え、6F st.LKもdistance内なら確定候補。モダンならここから扱いやすい必殺技やアシスト側へつなぐ練習をしておくと回収率が上がる。
- **-11以下：cr.HK、Twisted Drop、Sweep Combination。** 「とりあえず弱」ではなく、7F st.MPなどから始める大きなpunishを用意する領域。特にスイープは-17／-20なので、guardしたのに弱Pだけで終えるのはもったいない。

フライングクロスチョップだけは、guard位置によって-12〜-1と幅がある。これは数字を一つ覚えるより、Training Modeで「高く当たったとき／低く当たったとき」のpunishを記録した方がよい。**punish表には、distanceだけでなく当たり方も入る。**

## 5. プラス技は、guardしてから暴れるより「完成する前」を殴る

Alexの怖さは、guardさせて有利な技が複数あることにある。しかし、その全てに「guardしてから4Fで勝つ」必要はない。むしろプラスを完成させるまでのstartupを見ると、別のcounterplayが現れる。

- **チョップは22Fでguard-3。** 中段。見てから立つ／早い打撃で触る練習対象になる。
- **Flash Chopは26Fでguard+2。** guardした後はAlex有利なので、その前の26Fをどう見るかが重要。無条件の暴れではなく、通常技・パリィ・DIをdistance別にTraining Modeで比較する価値がある。
- **溜めst.HPは23Fで+2、溜めst.HKは25Fで+2。** ただしAlexは早くボタンを離せば通常版の12F／16Fへ変えられる。つまり「溜めを見たら必ず割り込む」は、早出しとのread gameになる。
- **Air Stampedeは30Fで+2。** Breaker Stanceから空中へ行くので、guardして+2を渡す前に対空する発想を持てる。軌道調整があるため、cr.HPだけに固定せず空対空も含めて確認する。
- **Heavy Lariatは12Fで+3、溜め版は21Fで+5。** ここだけは「遅いから殴る」が危険で、frame 6以降にtwo-hit armorがある。次節のarmor readへ分ける。

要するに、**plus framesは「guard後の問題」ではなく、startup前から始まっている。** 26F技を毎回guardしてから困るより、26Fという時間を使えるdistanceを自分の中で測る方がcounterplayになる。

## 6. Armor counterplay：ラリアットを力で殴り返すなら、Gladiusは「万能回答」ではない

AlexのHeavy Lariatは、通常版が12F・guard+3、溜め版が21F・+5。現行データでは6Fからtwo-hit armorを持つ。軽い打撃を二発置けば止まる、という発想が調整後は特に危険である。

Marisa側には明確な対抗propertyがある。**OD Gladiusはarmor-break property**を持ち、frame 1から上半身armorが始まる。通常Gladiusも最大溜めならarmor breakになる。したがって「相手が構えたからGladius」ではなく、**Heavy Lariatを読むならarmor breakを当てる**という用途に絞ると筋がよい。

![Marisaの溜めOD Gladius。armorと前方判定が視覚化される](https://wiki.supercombo.gg/w/Special:Redirect/file/SF6_Marisa_236pp_hold_hitbox.png)

ただし、ここにこの組み合わせの嫌なところがある。Breaker Stance自体はlow profileで、high系のGladiusが噛み合わない間合いがある。さらにAlexにはShoulder Launcherやcommand throwもある。**armorはinvincibilityではなく、armor breakも構え全体への正解ではない。** 画像の紫・緑・赤の重なりを見ると、「property / hitbox」だけでなく「どこに判定があるか」を一緒に見る必要がある。[画像出典：SuperCombo Wiki](https://wiki.supercombo.gg/w/File:SF6_Marisa_236pp_hold_hitbox.png)

もう一つ重要なのが投げである。Alexの強／OD Power Bombは5F startupで、command throwなので通常の投げ抜けでは外せない。打撃を読むarmoractionは、投げに対する回答にはならない。特にOblique Stomp+2、Flash Chop+2、ラリアット+3／+5の後に「armorで全部返す」と決めると、相手に投げの理由を与える。

## 7. Alexのweaknessは「optionsが少ない」ことではなく、強いoptionsが先払いを要求すること

Alexにはoptionsが多い。だからweaknessを「技が足りない」と見るのは違う。むしろ強い展開へ入るために、**構える、溜める、飛ぶ、gaugeを使う**といった先払いが見えることがweaknessになる。

第一に、Breaker Stance中はguardできない。low profileでhighを潜れる代わりに、lowやタイミングの合った打撃へ無制限に安全ではない。第二に、cr.LKは5F、cr.MKは8Fのlowだが、どちらも通常の必殺技キャンセル技ではない。低い攻撃は存在するが、他キャラクターの「キャンセル可能なcr.MK」ほど一発から共通システムへ伸ばしやすい構造ではない。

第三に、完全invincibilityのメーターレス切り返しを持たない。現行データではSA1が1〜8Fの打撃・投げinvincibility、SA2／SA3が完全invincibilityを持つため、スーパーgaugeがあるときは当然尊重する必要がある。それでもノーgaugeの起き上がりでは、Marisa側が「毎回怖がって離れる」必要はない。投げ、遅らせ打撃、様子見を混ぜ、SAとDrive Reversalを使う癖まで読む価値がある。

weaknessとは「これを押せば勝てる穴」ではない。**相手が強い未来へ行くために、どの予告を画面へ出さなければならないか**である。Alexはその予告が、構え・溜め・空中移行・gaugeに比較的はっきり出る。

## 8. 破：Alexを「技名」ではなく「見た目→action」で読む

match中に技名を検索している時間はない。そこで11択を、見た目からこちらの一手へ直接つなぐ。

- **低く構えた。** 4F cr.LPを自動で押さない。近ければ5F cr.LK、少し遠ければ9F cr.MKをまず検証済みの回答にする。何も出さず相手の派生を見る選択も残す。
- **構えから肩で上へ突っ込んだ。** Shoulder Launcherはguard-6。guardできたら4F cr.LP、届けば6F st.LKまで確定候補。
- **構えから低いスイープが来た。** 1段目-17、2段目-20。しゃがみguardできたら大きく返す。ここは「暴れる」より「待って回収」が強い。
- **構えからarmor付きの大振り。** Heavy Lariat。guard後は+3／+5なので押さない。先readするならarmor break、確信がなければguardして次の打撃／コマ投げを読む。
- **構えから飛んだ。** Tactical Hop／Air Stampedeの領域。guardして+2を与える前に、対空を選べる位置かを見る。
- **4MKの踏み込みをguardした。** Oblique Stompは+2。ここはMarisaの4F cr.LPが「fastestだから正しい」場面ではない。相手の4Fに時間上負ける。
- **st.MPをguardした。** ±0。お互い4Fを押せばtradeライン。ここを黄色や赤へ勝手に分類せず、「五分へ戻った」と扱う。

この変換をすると、Alexは11択のクイズではなくなる。画面で認識するイベントは、**low profile・肩・low・armor・空中・踏み込み・五分**の七つ程度まで減る。memorizationではなく、知覚とinputを直結させる。

## 9. 離：5分Training Modeで「正解」ではなく境界線を測る

ここまでの情報は、そのまま信じて終わるより自分のモダン／クラシック設定、distance感、反応速度で再測定した方が強い。やることは五つだけでよい。

1. **生Breaker Stance vs 2LP／2LK／2MK。** 同じdistanceから三つを振り、2LPが空振る位置と2LK／2MKが当たる位置をスクリーンショットかメモで残す。「速い技」ではなく「当たる技」を決める。
2. **st.MP±0 → 4F、Slashing Elbow-1 → 4F、Shoulder Launcher-6 → punish。** 五分・turn奪取・punishの三種類を連続で体に入れる。
3. **Oblique Stomp+2後にAlex4F。** Marisa側で4F cr.LPを押し、負けることを確認する。知識を「押さない反射」にする。
4. **Heavy Lariat vs OD Gladius。** ラリアットを出させ、どのタイミング・distanceならarmor breakが成立するかを確認する。その直後に「構えだけ」を再生し、Gladiusが万能回答でないことも確認する。
5. **スイープ-17／-20とcommand throw。** スイープは最大punish、Power Bombはジャンプ／後退などで逃げた後のpunishを一本だけ固定する。守りの成功を必ずダメージへ変える。

この5分で作りたいのは「全派生への正解表」ではない。**どこまで見てから押せるか、どこからはreadになるか、どのdistanceなら届くか**という自分の境界線である。攻略情報を自分の反応速度へ変換して初めて、counterplayがmatch中に使える。

## 10. 次回エレナへ：シリーズは「相手のmove list」ではなく「Marisaの回答表」で揃える

このcounterplayはシリーズ化しやすい。毎回キャラクター固有の技を全部説明するのではなく、読者側の操作を固定フォーマットにする。ページ上部の**守**では10秒で見返せる赤・黄・緑、中央の**破**では相手の見た目からactionへつなぐdecision、下部の**離**ではTraining Mode検証を置く。便利さを先、read物としての発見を後にする。

- **守／Quick Read**：押さない技、turnを取り返す技、punish技を三色で表示する。
- **破／Decision Read**：技名ではなく「見た目→Marisaの回答」に変換する。
- **離／Lab Read**：frame表だけでは決まらないdistance、姿勢、当たり方を5分で実測する。
- **Marisa Lens**：4F、低い通常技、armor、armor break、SA、モダンのinput速度など、Marisa固有の資産と欠点を必ず一節にする。
- **Version Gate**：記事冒頭に現行バージョンと確認日を置き、旧数字を混ぜない。
- **Visual Evidence**：ヒットボックス画像やframe資料へ直接飛べる画像・出典リンクを置き、「なぜその回答なのか」を目で追えるようにする。

次回のエレナ編でも、この骨格は変えない。変えるのは「何を赤・黄・緑に入れるか」と「Marisaのどの資産が刺さるか」だけである。シリーズのUIを揃える目的は見た目の統一ではなく、**相手キャラが変わっても読む順番を学び直さなくてよいこと**にある。

## 11. 調べる前と後：Alexは「11択のキャラ」ではなく、11択を始める前に見るキャラだった

調べる前、Alex counterplayはBreaker Stance11派生のmemorization問題に見えていた。何が中段で、何がlowで、何が投げで、どこがarmorか。全部覚えてからmatchへ行くしかないように見える。

ところがMarisa目線へ絞ると、中心は別の場所にあった。構え中はguardできない。しかしlow profileなので4Fhighが万能ではない。5F／9Fのlowには役割がある。guard後は-1と-4を分ける。+2以上をguardした後に無理をしない。ラリアットのarmorにはarmor breakという対抗propertyがあるが、構え全体へ雑に振ると潜られる。

つまりcounterplayの単位は技名ではなく、**「いつ相手が守れないか」「いつこちらが先か」「いつpunishが確定するか」**だった。11択は消えない。でも、11個全部に同じ深さで付き合う必要もない。

次にAlexが地面すれすれまで姿勢を落としたら、「うわ、11択」と考える前に一つだけ確認したい。**今、この人はguardできるのか。** そこからcounterplayを始めると、move listは少しだけ短く見える。

## 参考資料

- [Frame Data Search — Alex / Ver.2.0401.010](https://frame-search.com/?character_name=Alex&lang=ja-jp)
- [Frame Data Search — Marisa / Ver.2.0401.010](https://frame-search.com/?character_name=Marisa&lang=ja-jp)
- [Frame Data Search — Version Diff Ver.2.0301.001 → Ver.2.0401.010](https://frame-search.com/changelog?lang=ja-jp)
- [CAPCOM — 2026.08.03 Alex Battle Change List](https://www.streetfighter.com/6/buckler/ja-jp/battle_change/20260803/alex)
- [SF6 Lab — Alex frame data](https://sf6-lab.net/fighters/alex/frame)
- [SF6 Lab — Alex 技一覧](https://sf6-lab.net/fighters/alex/moves)
- [Ultimate Frame Data — Alex](https://ultimateframedata.com/sf6/alex)
- [Ultimate Frame Data — Marisa](https://ultimateframedata.com/sf6/marisa)
- [Street Fighter Wiki — Prowler Stance](https://streetfighter.fandom.com/wiki/Prowler_Stance)
- [支乃家ユキ「Alex攻略・counterplayその2『ぼったくりラリアット』」](https://note.com/go_alex/n/n96ea38dde4d2)
- [SuperCombo Wiki — Alex hitbox files](https://wiki.supercombo.gg/w/Street_Fighter_6/Alex)
- [SuperCombo Wiki — Marisa hitbox files](https://wiki.supercombo.gg/w/Street_Fighter_6/Marisa)

※frame dataはアップデートで変化する。本文は2026年9月20日時点、Frame Data Search表記のVer.2.0401.010を基準にした。画像は外部サイトの公開ヒットボックス資料をリモート参照しており、リンク先の変更・削除により表示されなくなる場合がある。
