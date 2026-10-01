---
id: thinkpad-migration-rebuild-working-environment
title: "シンクパッド（ThinkPad）への移行で、本当に移すべきものはファイルではない――赤いポッチから始める「作業環境」の再設計"
subtitle: "トラックポイント（TrackPoint）、Fn/Ctrlキー、レノボ・バンテージ（Lenovo Vantage）、ウィンドウズ・バックアップ（Windows Backup）、ウィンゲット（WinGet）まで。新しいPCを「前と同じ」にしない移行論"
created: "2026-10-01"
updated: "2026-10-01"
type: "リサーチエッセイ"
status: "完成"
tags: ["シンクパッド（ThinkPad）", "PC移行", "ウィンドウズ11（Windows 11）", "作業環境", "レノボ・バンテージ（Lenovo Vantage）", "トラックポイント（TrackPoint）"]
keywords: ["シンクパッド（ThinkPad）初期設定", "PC移行", "トラックポイント（TrackPoint）", "Fn/Ctrlキー入れ替え", "レノボ・バンテージ（Lenovo Vantage）", "ウィンドウズ・バックアップ（Windows Backup）", "ウィンゲット（WinGet）", "バッテリー充電しきい値"]
grow: 5
abstract: "新しいシンクパッド（ThinkPad）へ移るとき、必要なのは旧PCの完全コピーではない。シンクパッド固有の入力系とハードウェア管理を理解し、ファイル、認証、アプリ、ローカル環境、操作感を別々の層として再構築することだ。本稿はトラックポイント（TrackPoint）、Fn/Ctrlキーの入れ替え、レノボ・バンテージ（Lenovo Vantage）、充電しきい値、ウィンドウズ・バックアップ（Windows Backup）、ウィンゲット（WinGet）、パスキーまで一次情報で確認し、移行を「引っ越し」ではなく「再現可能な作業環境の設計」として捉え直す。"
---

# シンクパッド（ThinkPad）への移行で、本当に移すべきものはファイルではない
## 赤いポッチから始める「作業環境」の再設計

シンクパッドに初めて触った人が、たぶん最初に気にするのはキーボード中央の赤い突起である。トラックポイント（TrackPoint）。いかにも「シンクパッドらしいもの」なので、とりあえず触る。するとカーソルが動く。ここまでは分かる。

ところが、対応するシンクパッドでは中央ボタンを押したままトラックポイントへ力をかけると、上下左右へスクロールできる。さらにCtrlキーも同時に押すと、対応するアプリでは拡大・縮小までできる。機種によってはトラックポイントをダブルタップすると、カメラ、マイク、バッテリーなどへ素早く触るためのトラックポイント・クイック・メニュー（TrackPoint Quick Menu）が開く。小さな赤い棒に、思ったより仕事が詰め込まれている。

ここで「シンクパッドの便利技を覚えよう」と進むと、記事はすぐ設定集になる。しかし、他のPCから移ってきた人にとって本当の問題はそこではない。新しいPCへの移行では、ファイルは比較的見つけやすい。見失いやすいのは、手が覚えていた操作、勝手に通っていた認証、いつの間にか積み上がったアプリ、ローカルだけに残った設定、電源や周辺機器との付き合い方である。

**PC移行は、データの引っ越しより「仕事が成立していた条件」の再発見に近い。**

シンクパッドは、その条件を見つけるには妙に都合がいい。入力装置、キーボード、バッテリー、ファームウェアまで、触って調整できる層が表に出ているからだ。本稿ではシンクパッド固有のノウハウを入口にしながら、移行そのものを「旧PCの複製」ではなく「再現可能な作業環境の再設計」として考える。

> **情報基準日：2026年10月1日**
>
> シンクパッドは世代・シリーズ・構成による差が大きい。トラックポイント・クイック・メニュー、キーボードバックライト、Fn/Ctrl入れ替え、充電しきい値などは、すべての機種で同じように使えるとは限らない。本稿ではレノボ（Lenovo）公式の複数機種向け資料を基準に共通しやすい考え方を整理し、個別機能は使用中の機種のユーザー・ガイドとレノボ・バンテージ（Lenovo Vantage）で確認する前提とする。

## 1. 最初に移すべきはデータではなく「手の地図」である

<!-- level:4 role:claim -->
他のPCからシンクパッドへ移ると、違和感は性能表ではなく指先から始まる。Ctrlキーへ伸ばした小指、F1〜F12を押すつもりで音量を変えてしまう指、トラックパッドへ移動する右手。こうした失敗は小さいが、毎日何十回も起きると「新しいPCは使いにくい」という大きな評価へ育つ。つまり移行初期に調整すべき対象は、CPUやストレージより先に、身体と入力装置の対応関係である。

シンクパッドでは、その対応関係を比較的細かく変えられる。対応機種ではFnキーとCtrlキーの機能をUEFI/BIOS、レノボ・キーボード・マネージャー、またはレノボ・バンテージから入れ替えられる。FnLockはファンクション・キーの「特殊機能」とF1〜F12本来の機能を切り替える。バックライト搭載機ではFn+Spaceで明るさを変えられる例がある。ここで大事なのは「シンクパッドの標準へ自分を矯正する」ことではない。旧PCで身についた操作と、シンクパッド側で変えられる設定を見比べ、どちらを残すかを意識的に決めることだ。

一方で、何でも旧PCへ寄せればよいわけでもない。たとえばFn/Ctrlを即座に入れ替えると、短期的には楽になるが、シンクパッドを複数台使う環境では標準配置とのずれが新しい摩擦になることもある。逆に、一台を長く自分専用で使うなら、身体の記憶を優先したほうが合理的な場合もある。設定は「正解」を探す作業ではなく、自分がどの環境を基準にするかを決める作業になる。

この時点で、PC移行の意味が少し変わる。**移行とは旧PCを新PCへ近づけることではなく、自分の標準環境を言語化することでもある。**

参照：[レノボ（Lenovo）「FnキーとCtrlキーの機能を入れ替える」](https://support.lenovo.com/by/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios) ／ [シンクパッド X1 Carbon Gen 13 ユーザー・ガイド（ThinkPad X1 Carbon Gen 13 User Guide）「キーボード・ショートカット」](https://download.lenovo.com/manual/thinkpad_x1_carbon_gen13/user_guide/en/Use_the_keyboard_shortcuts.html)

## 2. トラックポイントは「小さいマウス」ではなく、手の移動距離を変える装置である

<!-- level:4 role:claim -->
トラックポイントを、タッチパッドの代用品と考えると魅力が分かりにくい。ポインターを動かすだけなら、タッチパッドもマウスもある。トラックポイントの違いは、ホームポジション付近から手を大きく動かさずに、ポインター操作とスクロールへ移れることにある。効率の差は一回の速さより、キーボードとポインティング装置の往復回数に現れる。

レノボのユーザー・ガイドでは、トラックポイントへ加える力が大きいほどポインターが速く動くと説明されている。中央ボタンを押しながらスティックを上下左右へ動かすとスクロールし、Ctrlキーを加えると拡大・縮小に使える構成もある。対応機種のトラックポイント・クイック・メニューでは、赤いスティックのダブルタップからカメラ、マイク、音声入力、バッテリー、音声再生などへ触れられる。これは「カーソルを動かす部品」が、入力の中継点へ拡張されているということだ。

ただし、初日にトラックポイントだけで全部やろうとすると、たいてい遅い。そこで本稿から一つ、**10分だけトラックパッドへ手を移さない実験**を提案したい。文章を読み、リンクを開き、長いページをスクロールし、少し拡大する。その10分で「速いか」ではなく、「どの操作で手の移動が減るか」だけを見る。向いていなければ戻せばよい。便利さを信じるのではなく、自分の作業で検証する。

この小さな実験が教えるのは、シンクパッドの象徴が赤い色だから価値があるわけではないということだ。**道具の価値は、機能の数ではなく、行動の切り替えコストをどれだけ減らすかで決まる。**

参照：[シンクパッド P1 Gen 8 / T1g Gen 8 ユーザー・ガイド「トラックポイント・ポインティング・デバイス（TrackPoint pointing device）」](https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html) ／ [シンクパッド E14 Gen 7 / E16 Gen 3 ユーザー・ガイド「トラックポイント・クイック・メニュー（TrackPoint Quick Menu）」](https://support.lenovo.com/jp/ja/documentation/SG10064/TrackPoint_Quick_Menu?language=en)

## 3. シンクパッドらしさは、レノボ・バンテージを開くと急に見えてくる

<!-- level:4 role:claim -->
新しいPCでは、ウィンドウズ・アップデート（Windows Update）だけを終えて「設定完了」と考えたくなる。しかしシンクパッドには、OSとは別に、レノボ側が管理しているハードウェア設定と更新の層がある。ここを見ないまま使うと、シンクパッドへ移ったのにシンクパッド固有の調整面をほぼ使わないことになる。

レノボ・コマーシャル・バンテージ（Lenovo Commercial Vantage）などのバンテージ系アプリは、対応機種でUEFI/BIOS、ファームウェア、ドライバーの更新、ハードウェア設定、状態確認、診断、保証情報の確認などをまとめる。機種によってはバッテリー充電のしきい値も設定でき、100%まで常時充電しない運用を選べる。レノボは、短い再充電を避けたり充電上限を調整したりする機能を、バッテリー寿命を意識した仕組みとして案内している。

ここで重要なのは「全部オンにする」ことではない。たとえば持ち歩きが多く毎日バッテリーを使い切る人と、机上でAC電源につなぎっぱなしの人では、充電設定の合理性が違う。カメラやマイクの補助機能も、会議中心の人と使わない人では価値が違う。バンテージは便利機能の売り場ではなく、**自分の使い方をハードウェアへ伝える設定面**として見るほうがよい。

また、UEFI/BIOS更新中は画面が一時的に消える場合があり、レノボの資料は処理を中断しないよう注意している。更新は「何となく押す」より、電源接続、作業保存、更新内容の確認までを一つの手順として扱うべきだ。ハードウェアに近い更新ほど、便利さと慎重さが同居する。

シンクパッドへの移行で最初にバンテージを見る意味は、ドライバーを最新にすることだけではない。**OSの設定だけでは見えなかった「このPCをどう使うか」という第二の設定層を発見することにある。**

参照：[レノボ・コマーシャル・バンテージ（Lenovo Commercial Vantage）](https://download.lenovo.com/manual/thinkpad_l14g5_l16g1/ug/html_en/en/The_Vantage_app.html) ／ [レノボ（Lenovo）「バッテリー充電しきい値（Battery Charge Threshold）」](https://support.lenovo.com/ax/en/videos/nvid500286) ／ [レノボ（Lenovo）「バッテリーのQ&A」](https://support.lenovo.com/jp/ja/solutions/ht509084-battery-qa) ／ [レノボ（Lenovo）「UEFI BIOSの更新（Update UEFI BIOS）」](https://download.lenovo.com/pccbbs/pubs/ts_p5/ug/html_en/en/Update_UEFI_BIOS.html)

## 4. 「PCを移す」を一つの作業にすると、必ず何かを落とす

<!-- level:4 role:claim -->
旧PCから新PCへ何を移したか、と聞かれると、多くの場合「ファイル」「アプリ」「設定」くらいの言葉で答える。しかし実際の作業環境は、性質の違うものが重なってできている。それらを一括で「移行」と呼ぶと、移せたものと移せていないものの境界が見えなくなる。

本稿では、移行対象を五つの層へ分ける。

- **データ層**：文書、画像、動画、ダウンロード、ローカル保存ファイル
- **認証層**：マイクロソフト（Microsoft）アカウント、ブラウザー、パスワード管理、パスキー、ウィンドウズ・ハロー（Windows Hello）、仮想プライベート・ネットワーク（VPN）、業務アカウント
- **アプリ層**：インストール済みソフト、ライセンス、プラグイン、拡張機能
- **環境層**：ギット（Git）、セキュア・シェル（SSH）鍵、Linux用Windowsサブシステム（WSL）、開発環境、辞書、テンプレート、細かなアプリ設定
- **身体・ハードウェア層**：キーボード配置、Fnロック（FnLock）、トラックポイント、タッチパッド感度、充電、外部ディスプレイ、ドック

ウィンドウズの標準機能だけでも、この五層は同じようには移らない。マイクロソフトが案内するウィンドウズ11（Windows 11）のPC間転送は、ファイルと一部の設定・個人設定をコピーできる一方、インストール済みアプリ、保存済みパスワードやサインイン情報、システム領域などは転送対象外である。ウィンドウズ・バックアップ（Windows Backup）はアプリ一覧や一部設定を記憶して新PCの復元を助けるが、「旧PCの実行環境そのもの」を丸ごと運ぶ仕組みではない。

さらに認証は、見た目以上に端末依存である。ウィンドウズ・ハロー（Windows Hello）のPINはその端末にひもづく。パスキーも、端末保存型なら新PCで新しく作る必要があり、同期型の資格情報管理サービスへ保存している場合はアカウント経由で利用できる。ビットロッカー（BitLocker）の回復キーも、移行前に所在を確認しておかないと「データはあるのに開けない」という最悪の種類の取りこぼしになる。

五層へ分けると、「移行完了」の意味も変わる。**ファイルが見えることは移行の一部にすぎず、仕事が再開できることが移行の完了条件になる。**

参照：[マイクロソフト（Microsoft）「新しいWindows PCへのファイルと設定の転送（Transfer your files and settings to a new Windows PC）」](https://support.microsoft.com/en-us/windows/experience/backup-recovery/transfer-your-files-and-settings-to-a-new-windows-pc) ／ [マイクロソフト（Microsoft）「Windows Backupによるバックアップと復元（Back up and restore with Windows Backup）」](https://support.microsoft.com/en-us/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup) ／ [マイクロソフト（Microsoft）「Windows Helloの構成（Configure Windows Hello）」](https://support.microsoft.com/en-us/windows/security/configure-windows-hello) ／ [マイクロソフト（Microsoft）「保存済みパスキーの管理（Manage your saved passkeys）」](https://support.microsoft.com/en-us/accounts-billing/security/manage-your-saved-passkeys) ／ [マイクロソフト（Microsoft）「BitLocker回復キーのバックアップ（Back Up Your BitLocker Recovery Key）」](https://support.microsoft.com/en-us/windows/security/encryption/back-up-your-bitlocker-recovery-key)

## 5. 旧PCの完全コピーより、「何を再構築できるか」を残す

<!-- level:4 role:claim -->
移行で安心感が高いのは、旧PCと同じ画面、同じアプリ、同じ配置が再現されたときである。しかし完全なコピーには弱点がある。使っていないアプリ、古い設定、理由の分からない常駐ソフトまで一緒に持ち込みやすい。新PCを買ったのに、旧PCの歴史的なゴミまで保存してしまう。

そこで使えるのが「複製」ではなく「再構築」という考え方である。たとえばウィンドウズ・パッケージ・マネージャーのウィンゲット（WinGet）は、認識できるインストール済みアプリをJSON形式へ書き出し、その一覧を別PCでまとめてインストールできる。完全ではない。マイクロソフトも、利用可能なパッケージ情報と一致しないアプリは警告されると説明している。しかし、その不完全さがむしろよい。自動復元できないものが、手作業で管理すべき例外として見えるからだ。さらに2026年時点のウィンゲットには、パッケージだけでなく一部のシステム設定も含めて「望ましい状態」を構成ファイルへ記述するウィンゲット・コンフィギュレーション（WinGet Configuration）がある。アプリ一覧の復元から、環境そのものの再現へ一段進む選択肢である。

```powershell
winget export -o apps.json
winget import -i apps.json --ignore-unavailable
```

ここでのおすすめは、書き出した`apps.json`をそのまま復元命令にしないことだ。一度開き、「これはまだ使うか」を見る。半年使っていないもの、用途が重複するもの、ブラウザーだけで代替できるものは戻さない。移行を、アプリ棚卸しの強制イベントとして使う。

開発や自作ツールを触る人なら、さらに一段深い。Linux用Windowsサブシステム（WSL）は`wsl --export`と`wsl --import`でディストリビューションを移せる。ギットハブ（GitHub）へセキュア・シェル（SSH）接続するなら、新PC側で鍵の所在と登録を確認する必要がある。ここまで来ると、価値があるのは「旧PCと同じ状態」より、**壊れてももう一度組み直せる状態**である。

PCが変わるたびに一から思い出す環境は、使い慣れていても脆い。**移行を一度経験した環境が、次回は手順から再現できるなら、その環境は初めて自分のものになったと言える。**

参照：[マイクロソフト・ラーン（Microsoft Learn）「winget export」](https://learn.microsoft.com/en-us/windows/package-manager/winget/export) ／ [マイクロソフト・ラーン（Microsoft Learn）「winget import」](https://learn.microsoft.com/en-us/windows/package-manager/winget/import) ／ [マイクロソフト・ラーン（Microsoft Learn）「winget configure」](https://learn.microsoft.com/en-us/windows/package-manager/winget/configure) ／ [マイクロソフト・ラーン（Microsoft Learn）「WSLの基本的なコマンド」](https://learn.microsoft.com/en-us/windows/wsl/basic-commands) ／ [ギットハブ・ドキュメント（GitHub Docs）「GitHubアカウントへの新しいSSH鍵の追加（Adding a new SSH key to your GitHub account）」](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=windows)

## 6. いちばん危険なのは、「同期されていると思っていたもの」である

<!-- level:4 role:claim -->
移行で失うものは、ローカルにあると分かっているファイルより、「たぶんクラウドにある」と思っている情報のほうが厄介である。存在場所を意識していないから、旧PCを消したあとで初めて欠落に気づく。

ブラウザーは典型例だ。マイクロソフト・エッジ（Microsoft Edge）は、サインインと同期を有効にすれば、お気に入り、パスワード、履歴、拡張機能、設定、タブなどを同期できる。グーグル・クローム（Google Chrome）も、グーグル（Google）アカウントへ保存する対象としてブックマーク、パスワード、拡張機能、ウェブアプリ、設定などを案内している。しかし「ブラウザーを使っていた」ことと「同期されていた」ことは同じではない。プロファイルが複数ある、仕事用だけ同期が無効、ローカル保存のパスワードが残っている、といった例外がある。

だから移行前には、データを「場所」ではなく「復元経路」で確認するほうが強い。「このファイルはワンドライブ（OneDrive）にある」ではなく「新しいPCで同じアカウントへ入り、実際に開ける」。「パスワード管理を使っている」ではなく「新PCで保管庫を解錠できる」。「二要素認証がある」ではなく「旧PCなしでも承認できる」。バックアップが存在することと、復元できることは別問題である。

この発想を極端にすると、良い移行テストができる。**旧PCが今この瞬間に起動しなくなったと仮定し、新PCだけで今日の仕事を始められるか。** そこで止まった箇所が、まだ移行していない依存関係である。

同期とは「どこかに保存されている」ことではない。**別の端末から同じ仕事へ戻れることまで確認して、初めて移行可能な状態になる。**

参照：[マイクロソフト・エッジ（Microsoft Edge）「Change and customize sync settings」](https://support.microsoft.com/en-us/edge/change-and-customize-sync-settings-in-microsoft-edge) ／ [グーグル・クローム（Google Chrome）「すべてのデバイスで同じブックマーク、パスワード、その他の設定を利用する」](https://support.google.com/chrome/answer/165139?hl=ja)

## 7. 提案：移行を72時間の「段階切り替え」にする

<!-- level:4 role:claim -->
新PCが届いた日に旧PCを片づけると、移行は記憶力の試験になる。思い出した順に設定し、足りないものが出るたび旧PCを引っ張り出す。これは移行というより、依存関係の発掘を本番環境でやっている状態である。そこで、旧PCをすぐ捨てず、役割を段階的に減らす方式を提案したい。

- **0〜3時間：基盤** — ウィンドウズ・アップデート（Windows Update）、レノボ・バンテージ、UEFI/BIOS・ファームウェア・ドライバー、ウィンドウズ・ハロー（Windows Hello）、ブラウザー、パスワード管理、クラウド同期
- **3〜12時間：身体** — Fn/Ctrlキー、Fnロック（FnLock）、トラックポイント、タッチパッド、キーボードバックライト、画面拡大率、外部ディスプレイ
- **1日目：仕事** — 日常で使うアプリ、仮想プライベート・ネットワーク（VPN）、オンライン会議、プリンター、フォント、辞書、テンプレート
- **2日目：例外** — ギット（Git）、セキュア・シェル（SSH）、Linux用Windowsサブシステム（WSL）、ローカルデータ、特殊なライセンス、古い周辺機器、業務固有ツール
- **3日目：切り離し試験** — 旧PCの電源を入れず一日過ごし、止まった箇所だけを移行台帳へ追加する

72時間という数字に科学的な必然性はない。ここでの狙いは、設定を時間で分けることではなく、**基盤→身体→仕事→例外→切り離し**の順に依存関係を露出させることにある。いきなり全コピーすると何が必要だったか分からないが、段階的に旧PCを遠ざけると、自分の仕事が何に支えられていたかが見える。

そして、この手順はシンクパッドに限らない。シンクパッド固有の操作系を調整する工程があるからこそ、移行全体も層で考えやすくなる。赤いポッチは、実はPC移行の本質からかなり遠いところにあるようで、入口としては正しい。

**新しいPCへ慣れるとは、機械の癖を我慢して覚えることではない。自分と機械の境界を、もう一度引き直すことだ。**

## 8. 提案：移行台帳は「コピーしたか」ではなく五つの動詞で書く

<!-- level:4 role:claim -->
チェックリストを作るなら、「クローム（Chrome）」「エクセル（Excel）」「写真」のような名詞だけを並べるより、各項目をどう扱うかまで動詞で決めるほうが役に立つ。名詞の一覧は存在確認で終わるが、動詞は復元方法を残す。

本稿では、移行台帳の動詞を五つに絞る。

- **同期する**：ワンドライブ（OneDrive）、ブラウザーデータ、クラウドメモなど
- **再インストールする**：ウィンゲット（WinGet）や公式配布元から戻せるアプリ
- **再発行する**：ウィンドウズ・ハロー（Windows Hello）、端末保存型パスキー、仮想プライベート・ネットワーク（VPN）証明書、セキュア・シェル（SSH）鍵など
- **再構築する**：Linux用Windowsサブシステム（WSL）、開発環境、辞書、テンプレート、複雑な設定
- **捨てる**：使っていないアプリ、古い設定、重複データ、意味不明な常駐物

この分類のよいところは、「移さない」が失敗ではなくなる点にある。旧PCにあったものを一つ減らせたなら、それは欠落ではなく設計判断になりうる。逆に、再発行が必要な認証を「同期されるはず」と扱っているなら、早めに危険が見える。

さらに各項目へ「確認方法」を一行足すと、台帳はそのまま受け入れ試験になる。たとえば「仮想プライベート・ネットワーク（VPN）：再発行する／社内ページへ接続できれば完了」「グーグル・クローム（Chrome）：同期する／ブックマークと拡張機能を確認」「トラックポイント：再設定する／中央ボタンで長文をスクロールできれば完了」。移行が、記憶ではなく検証へ変わる。

**良い移行台帳は、持ち物リストではない。次のPCでも自分の環境を再生するための小さな設計書である。**

## 9. 旧PCを消す前に、スペックではなく「一日の仕事」を通す

<!-- level:4 role:claim -->
最後の確認で「ファイル数が同じ」「アプリが全部ある」を見るだけでは足りない。仕事はファイルやアプリの集合ではなく、それらを順番につないだ行為だからだ。移行の最後には、部品ではなく一連の流れを通す必要がある。

たとえば、朝にPCを開く。顔や指紋で入る。ブラウザーを開く。クラウド上の資料を編集する。オンライン会議でカメラとマイクを使う。外部ディスプレイへつなぐ。PDFを書き出す。チャットへ添付する。必要なら仮想プライベート・ネットワーク（VPN）へ入る。ギット（Git）で変更を送る。帰宅して電源を抜く。こうした「一日の筋書き」を一回通すと、単体チェックでは見えなかった穴が出る。

シンクパッド固有の確認も、ここでようやく意味を持つ。トラックポイントは本当に使うのか。Fn/Ctrlはこの配置でよいか。充電しきい値は持ち歩き方に合っているか。レノボ・バンテージの更新は終わっているか。外部ディスプレイやドックは期待どおり復帰するか。便利機能は、生活へ入った瞬間に初めて便利かどうかが分かる。

旧PCを初期化するのは、この受け入れ試験を何日か通してからでよい。ビットロッカー（BitLocker）回復キー、クラウド同期、ローカル専用データ、ライセンス解除などを確認し、「旧PCを起動しないとできない仕事」が残っていない状態を作る。

ここまで来ると、新PCへの移行は終わりではない。**自分の仕事を構成していた見えない前提を、一度分解して組み直した記録が残る。次の故障、次の買い替え、次の端末追加が、少しだけ怖くなくなる。**

## 10. シンクパッドへ移ることは、「シンクパッドらしく使う」ことではない

<!-- level:5 role:implication -->
最初の赤いポッチへ戻る。

トラックポイントはシンクパッドの象徴だが、使わなくてもシンクパッドは使える。Fn/Ctrlを入れ替えてもいい。入れ替えなくてもいい。充電を100%まで使う日があってもいい。大事なのは「せっかくシンクパッドだから全部使う」ことではない。

調べる前、シンクパッドへの移行は「シンクパッド特有の便利設定を覚える話」に見えた。調べたあとでは、少し違って見える。シンクパッドには、入力、電源、ファームウェア、ポインティング装置といった、普段は意識しにくい層を自分で調整する入口が多い。そのため、PCをただ受け取るのではなく、「自分の作業環境は何でできているのか」を問い直しやすい。

ウィンドウズ・バックアップ（Windows Backup）で何が戻るのか。何が戻らないのか。端末に閉じた認証はどれか。自動で再インストールできるアプリはどれか。指が覚えている操作はどれか。バッテリーをどう使うのか。ここまで分けると、移行の目的は旧PCの再現ではなくなる。

**本当に移すべきものは、旧PCの状態ではない。旧PCがなくても仕事を再現できる方法である。**

赤いポッチは、そのことに気づくには妙に良い入口だった。新しいPCの真ん中に、前のPCにはなかった操作が一個だけ突き出している。そこで一度、手を止めて考える。

この機械へ、自分は何を持ち込むのか。何を捨てるのか。何を新しく覚えるのか。

その三つを決めたとき、PCの「移行」はようやく、自分の環境の「設計」になる。

### 主な参照先

- [レノボ・サポート（Lenovo Support）「FnキーとCtrlキーの機能を入れ替える」](https://support.lenovo.com/by/en/solutions/ht074187-how-to-swap-the-fn-function-and-ctrl-control-keyboard-keys-in-bios)
- [レノボ・シンクパッド・ユーザーガイド（Lenovo ThinkPad User Guide）「トラックポイント・ポインティング・デバイス（TrackPoint pointing device）」](https://download.lenovo.com/manual/thinkpad_p1_gen8_t1g_gen8/user_guide/en/Use_the_TrackPoint_pointing_device.html)
- [レノボ・シンクパッド・ユーザーガイド（Lenovo ThinkPad User Guide）「トラックポイント・クイック・メニュー（TrackPoint Quick Menu）」](https://support.lenovo.com/jp/ja/documentation/SG10064/TrackPoint_Quick_Menu?language=en)
- [レノボ・コマーシャル・バンテージ（Lenovo Commercial Vantage）](https://download.lenovo.com/manual/thinkpad_l14g5_l16g1/ug/html_en/en/The_Vantage_app.html)
- [レノボ（Lenovo）「バッテリーのQ&A」](https://support.lenovo.com/jp/ja/solutions/ht509084-battery-qa)
- [マイクロソフト（Microsoft）「新しいWindows PCへのファイルと設定の転送（Transfer your files and settings to a new Windows PC）」](https://support.microsoft.com/en-us/windows/experience/backup-recovery/transfer-your-files-and-settings-to-a-new-windows-pc)
- [マイクロソフト（Microsoft）「Windows Backupによるバックアップと復元（Back up and restore with Windows Backup）」](https://support.microsoft.com/en-us/windows/experience/backup-recovery/back-up-and-restore-with-windows-backup)
- [マイクロソフト（Microsoft）「保存済みパスキーの管理（Manage your saved passkeys）」](https://support.microsoft.com/en-us/accounts-billing/security/manage-your-saved-passkeys)
- [マイクロソフト・ラーン（Microsoft Learn）「winget export」](https://learn.microsoft.com/en-us/windows/package-manager/winget/export)
- [マイクロソフト・ラーン（Microsoft Learn）「winget import」](https://learn.microsoft.com/en-us/windows/package-manager/winget/import)
- [マイクロソフト・ラーン（Microsoft Learn）「winget configure」](https://learn.microsoft.com/en-us/windows/package-manager/winget/configure)
- [マイクロソフト・ラーン（Microsoft Learn）「WSLの基本的なコマンド」](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
