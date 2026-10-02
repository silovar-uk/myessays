# REDLife Video Navigator

既存ページ上のHTML `<video>` をそのまま利用し、iPhone Safari向けの「動画内移動」UIだけを追加するブックマークレットです。

現在のバージョン: **0.2.1**

## ファイル
- `../redlife-video-navigator.js`: 実装本体
- `../redlife-video-navigator-loader.txt`: Safariブックマークレット
- `index.html`: 導入ページ

## 設計原則
- 動画URLを別プレーヤーへコピーしない。
- HLS URL、署名、Cookie、認証情報を保存・送信しない。
- 既存Video.jsをdisposeしない。
- HTMLMediaElement APIを中心に操作する。
- Turbo遷移や後挿入videoはMutationObserverで再検出する。

## 主な機能
- 左側ダブルタップ: 10秒戻る
- 右側ダブルタップ: 30秒進む
- Compact / 詳細モード
- 直前の動画位置へ戻る Jump Back
- 直近5件のJump History
- ±5 / ±10 / ±30秒
- 90、12:30、1:02:30形式の時間指定
- 全体シークと現在位置±2分の精密シーク
- 0.75x / 1x / 1.25x / 1.5x / 2x
- ページ単位のMARK（即保存）
- A–B LOOP

## v0.2の操作文法
- 戻る操作は細かく: **−10秒**
- 進む操作は大きく: **＋30秒**
- 「さっき見ていた場所」は **Jump Back**
- 高度な機能は詳細モードへ退避

## セキュリティ境界
- 動画URLを別プレーヤーへコピーしない。
- HLS URL、署名、Cookie、認証情報を保存・送信しない。
- 既存Video.jsをdisposeしない。
- HTMLMediaElement APIを中心に操作する。
