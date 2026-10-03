# REDLife Video Navigator

既存ページ上のHTML `<video>` をそのまま利用し、iPhone Safari向けの「動画内移動」UIだけを追加するブックマークレットです。

現在のバージョン: **0.3.0**

## ファイル
- `../redlife-video-navigator.js`: 実装本体
- `../redlife-video-navigator-loader.txt`: Safariブックマークレット
- `index.html`: 導入ページ

## v0.3の中心設計
### One Surface, Three Heights
Video Navigatorを「起動ボタン + 別パネル」ではなく、1つのSurfaceとして扱います。

- **Collapsed**: 58px前後のDock。「開く ⌃」と動画進捗だけ残す。
- **Compact**: 日常操作。↩ / −10 / 再生 / ＋30 / 現在時間。
- **Expanded**: MOVE / RETURN / REMEMBER / PLAYBACK / TOOLSを目的別に表示。

閉じるとは消すことではなく、小さく畳むことです。

## 開閉
- Collapsed → 「開く ⌃」
- Compact → 「閉じる ⌄」
- Expanded → 「× 閉じる」
- Compact / Expanded間は「詳しく ↑」「たたむ ↓」
- grabberは実際に上下ドラッグ可能
- dragの距離または速度に応じてdetentへsnap
- grabber tapでもCompact / Expandedを切り替え

## 主な機能
- 左側ダブルタップ: 10秒戻る
- 右側ダブルタップ: 30秒進む
- Jump Back
- 直近5件のJump History
- ±5 / ±10 / ±30秒
- 90、12:30、1:02:30形式の時間指定
- 全体シークと現在位置±2分の精密シーク
- 0.75x / 1x / 1.25x / 1.5x / 2x
- ページ単位のMARK（即保存）
- A–B LOOP
- Collapsed時のProgress Rail
- iPhone LandscapeではExpandedを右側Floating Panelへ寄せる

## アクセシビリティ
- Open / Close controlに状態別の`aria-label`
- `aria-expanded` / `aria-controls`
- 主要操作は44px以上のhit target
- `prefers-reduced-motion`時はtransitionを停止

## 設計原則
- 動画URLを別プレーヤーへコピーしない。
- HLS URL、署名、Cookie、認証情報を保存・送信しない。
- 既存Video.jsをdisposeしない。
- HTMLMediaElement APIを中心に操作する。
- Turbo遷移や後挿入videoはMutationObserverで再検出する。

## 操作文法
- 戻る操作は細かく: **−10秒**
- 進む操作は大きく: **＋30秒**
- 「さっき見ていた場所」は **Jump Back**
- 高度な機能はExpandedへ退避
- 閉じる = **Collapsedへ畳む**
