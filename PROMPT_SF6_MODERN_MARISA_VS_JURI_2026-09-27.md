# PROMPT｜モダンマリーザ対ジュリを「接続の切れ目」から再検証する

Date: 2026-09-27
Use case: 『Street Fighter 6』のモダンマリーザ対ジュリについて、現行パッチのフレームデータ、風破ストック、中足キャンセルラッシュ、天穿輪、風水エンジンを再検証し、実戦用の対策記事を更新する。

## ①修正方針

主な課題：
- 「ジュリは速い」「中足が強い」だけでは、どこに弱点があるかが実戦行動へ落ちない。
- 生の通常技の硬直差と、キャンセルドライブラッシュや必殺技で接続された連係を混同すると、「-6だから押したのに負ける」という誤学習が起きる。
- ジュリの中足は低段であり、通常グラディウス／通常スクトゥムの上半身アーマーを標準回答にすると相性が悪い。
- 天穿輪を全バージョン「完全無敵昇龍」と扱うと、マリーザ側の地上重ねを必要以上に放棄する。
- 歳破衝など飛び道具のガード硬直差を、そのまま距離を無視した確定反撃へ変換すると誤情報になる。
- モダンマリーザはクラシック版の2中Kなど一部通常技を使えないため、一般的なマリーザ対策をそのまま持ち込めない。
- 「ジュリの弱点」をキャラクター評価へ短絡させず、強いゲームプランが成立する条件と、その接続が切れる地点として定義する必要がある。

修正方針：
- 事実 → 解釈 → 原則 → 実戦回答の順で書く。
- 弱点を先に四つへ分解する。
  1. 生の通常技の多くはガード時に不利。
  2. 中足ラッシュは強いがドライブゲージを使う。
  3. 風破ストックは強いが作る時間がある。
  4. 地上の完全無敵切り返しはOD／SAという資源を使う。
- その後、モダンマリーザ側の「通常アーマーを中足へ使わない」「歩きガードと2中で道路を狭める」「ラッシュは接触前に止める」「OD天穿輪を最大反撃する」へ翻訳する。
- Red / Yellow / Greenは維持するが、ジュリ戦では「連係が終わったか」を色判定より先に置く。
- 風水エンジン中は平時の硬直差ルールをそのまま適用せず、10秒の一時的な別ルールとして扱う。
- 結論は「速さに速さで勝つ」のではなく、「接続を高く買わせ、切れ目を取る」へ進める。

## ②修正版全文

Canonical:
essays/2026-09-27-sf6-modern-marisa-vs-juri-break-the-connection.md

English-Mix:
english-mix/sf6-modern-marisa-vs-juri-break-the-connection.md

Research:
research/2026-09-27-sf6-modern-marisa-vs-juri-break-the-connection.md

日本語Canonicalを唯一の正本とし、English-MixはH2順序とsemantic blockを1対1で保持する。

## Phase 1｜Research

必ず現在のバトルバージョンと参照日を確認する。

優先ソース：
1. Frame Data Searchの現行バージョン／更新履歴
2. CAPCOM公式フレームデータ準拠の現行データ
3. Ultimate Frame Dataの現行ヒットボックス／移動性能
4. CAPCOMのバトル調整
5. Year4対応日が明記された攻略資料
6. コミュニティ資料は仮説生成にのみ使う

必須確認対象：
- Juri:
  - st.MP / cr.MP / cr.MK / st.MK / st.HP / cr.HP / cr.HK
  - Fuhajin L/M/H/OD
  - Saihasho normal / enhanced / OD
  - Ankensatsu normal / enhanced / OD
  - Go Ohsatsu normal / enhanced / OD
  - Tensenrin L/M/H/OD
  - Shikusen
  - SA1 / SA2 Feng Shui Engine / SA3
  - walk speed / dash distance / health
- Modern Marisa:
  - current available normals
  - 2弱 / 2中 / 5強 / 6中 / 4強
  - Gladius armor coverage
  - Scutum / OD Scutum armor coverage
  - current Modern special-button mapping
  - punish routes available after very large minus

## Phase 2｜Structure

FACT:
- startup
- on-block advantage
- cancelability
- attack height
- armor / invincibility
- resource cost
- movement stats
- Modern move availability

INTERPRETATION:
- Juri’s strength comes from connection, not universal plus frames.
- cr.MK is both an entry point and a Drive Gauge spending decision.
- Fuha stock building trades present space for future power.
- OD Tensenrin is strong because it is fully invincible; this also makes it resource-gated.
- Marisa should narrow lanes instead of racing Juri’s mobility.

PROPOSAL:
- visual cue → action sheet
- five-minute training drill
- error taxonomy
- fixed max punish after blocked OD Tensenrin

COUNTEREVIDENCE:
- Juri can vary raw Drive Rush / cr.MK / jump / Fuha to overload attention.
- cr.MK being -6 does not guarantee a punish at all spacing.
- Fuha stock can be gained safely inside combos and okizeme, not only in neutral.
- Juri has strong defensive options; do not label her defense weak.
- Feng Shui Engine changes normal cancel rules and invalidates ordinary single-move assumptions.

LIMITATION:
- range and pushback decide whether a punish reaches.
- database one-frame discrepancies exist on some moves.
- strategy sources are not official frame-data sources.
- patch-sensitive numbers must be checked again after future balance updates.

## Phase 3｜Re-research

### A. 「-6＝確反」を監査する

cr.MK raw on block = -6.
But:
- tip spacing can leave Marisa’s 4F move out of range.
- cancel Drive Rush means the raw -6 is not the sequence endpoint.

Final wording:
- “time-negative if uncancelled”
- “punish if reach allows; otherwise reclaim turn”
- never “always punish”

### B. Regular armor versus lowを監査する

Regular Gladius:
- upper-body armor.

Regular Scutum:
- upper-body armor.

Juri cr.MK:
- low.

Final wording:
- regular armor is not the default cr.MK answer.
- OD Scutum is a separate resource/read option, not a universal shield.

### C. Tensenrinの無敵をversion別に分ける

M/H:
- 5F startup.
- anti-air strike / air-projectile invincibility on frames 1-8.
- not full grounded-strike invincibility.

OD:
- 6F startup.
- full invincibility frames 1-9.
- -48 on block.

Final wording:
- grounded meaty remains meaningful against M/H.
- OD/SA must be baited sometimes.
- blocked OD gets max punish.

### D. Projectile minusを距離込みで監査する

Saihasho raw can be -8.
But:
- projectile spacing separates characters.
- frame disadvantage does not imply reachable punish.

Final wording:
- do not place it in guaranteed Green punish list without range qualifier.
- default response may be guard/parry + ground taking.

### E. Database discrepancies

Example:
- current UFD and official-derived databases can differ by one frame on selected moves such as st.LP block advantage.

Policy:
- prefer current official-derived sources when they agree.
- do not build thesis on disputed edge values.
- record discrepancy in research notes.

## ③主な変更点

修正前：
「ジュリは中足とラッシュが速く、攻めがずっと続く。マリーザはアーマーで対抗する。」

修正後：
「ジュリの強さは、中足・ドライブラッシュ・風破ストック・起き攻めを接続し、不利へ到着する前に次の行動へ移ることにある。生の通常技の多くはガード時に不利であり、接続が切れた瞬間はマリーザ側へターンが戻る。通常グラディウス／通常スクトゥムは上半身アーマーのため低段の中足を標準回答にせず、歩きガード、2中、ラッシュ停止、資源監視を軸にする。」

理由：
- “速い”を性能感想からゲーム構造へ変換できる。
- raw frame と connected sequence を分離できる。
- Marisaのarmor弱点をmatchup-specificに説明できる。
- Juriの防御を過小評価せず、resource-gated reversalという正確な弱点へ置き換えられる。
- Training Modeで再現可能な境界へ落とせる。

## ④注意点

- 現行基準日は2026-09-27。
- VersionはVer.2.0401.010を基準にする。
- Frame Data Search / SF6 Lab / Ultimate Frame Dataは更新タイミングや表記方法が異なり、一部で1F程度の差が出る。
- “Juri is always plus”と書かない。
- “cr.MK -6 = guaranteed punish”と書かない。
- “all Tensenrin are fully invincible”と書かない。
- “armor beats Juri”と書かない。
- “Juri has weak defense”と書かない。
- Modern MarisaにないClassic-only normalsを実戦提案へ入れない。
- community strategy interpretationをframe-data factとして書かない。
- 技名・用語は日本語を主体にし、英語を必要とする場合は日本語（英語）の順で初出定義する。
- 日本語正本には“turn”“block”“punish”“safe”など翻訳途中の英単語を残さない。

## Uneven U writing contract

各段落で、出発点より一段先の認識へ進む。

Typical movement:
4 → 3 → 2 → 1 → 2/3 → 4 → 5

Mechanical compliance is not the goal.
Every paragraph must answer:
- What concrete fact did the reader pass through?
- What can the reader now say that they could not say before?

Article-level movement:
1. “Juri feels permanently fast”
2. raw frame facts lower the abstraction
3. connection / resources explain the apparent speed
4. Marisa-specific low-vs-armor interaction turns analysis into action
5. final abstraction: do not race speed; tax and break connections

Do not end paragraphs by merely restating their first sentence.

## Style contract

- 現代的で読みやすい日本語を基調にする。
- 明治〜昭和前期の随筆・評論・書簡に見られる文章語のように、必要な箇所だけ語彙と構文へ少し古風な距離感を入れる。
- 難語は飾りとして置かない。
- 具体と抽象を往復する。
- ジョークは、技の構造・数字の逆説・Marisa/Juriの身体性の落差から作る。
- 読者を幼児扱いしない。
- “strong”“important”“efficient”に相当する曖昧語は、何がどう変わるかへ分解する。
- 事実・解釈・提案を混同しない。
- 見出しだけで論旨を追えるようにする。
- 1ブロック1役割を基本にする。

## English-Mix contract

Japanese Canonical first.

- H2 order 1:1
- p / ul / ol / blockquote / figure semantic blocks 1:1
- no merge / split / reorder
- transform inside each block only
- Japanese remains the comprehension base
- mix simple natural English at phrase / sentence level
- keep every number, limitation, caveat, and source
- do not make EN MIX more assertive than Canonical

## Quality gate

- current version/date visible.
- Juri raw st.MP +2 is distinguished from most raw minus normals.
- cr.MK is listed as 8F / low / -6 / cancellable.
- Drive Rush connection is distinguished from raw frame endpoint.
- Fuha stock gain is treated as a time/position trade, not free punish.
- regular Gladius / Scutum are not used as default cr.MK answers.
- M/H Tensenrin anti-air invincibility is separated from OD full invincibility.
- OD Tensenrin -48 is visible.
- Modern Marisa’s unavailable cr.MK is not recommended.
- Feng Shui Engine receives a separate temporary-ruleset section.
- Red / Yellow / Green includes spacing and cancel caveats.
- five-minute lab has observable success/failure categories.
- conclusion changes the reader’s view from “speed gap” to “connection management.”
