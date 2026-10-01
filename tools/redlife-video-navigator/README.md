# REDLife Video Navigator

既存ページ上のHTML `<video>` をそのまま利用し、iPhone Safari向けの操作UIだけを追加するブックマークレットです。

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
- ±5 / ±10 / ±30秒
- 90、12:30、1:02:30形式の時間指定
- 全体シークと現在位置±2分の精密シーク
- 0.75x / 1x / 1.25x / 1.5x / 2x
- ページ単位のMARK
- A–B LOOP
