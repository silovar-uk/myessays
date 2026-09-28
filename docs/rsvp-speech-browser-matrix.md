# RSVP Speech Browser Matrix

作成日: 2026-09-28

`docs/rsvp-speech-probe.html`を使った実機検証結果の台帳。実装時点では実機音声出力を確認できないため、未計測欄は推測で埋めない。

| 項目 | Windows Chrome | Android Chrome | iPhone Safari |
| --- | --- | --- | --- |
| SpeechSynthesis | 未計測 | 未計測 | 未計測 |
| 日本語voice数 | 未計測 | 未計測 | 未計測 |
| voiceschanged | 未計測 | 未計測 | 未計測 |
| start/end | 未計測 | 未計測 | 未計測 |
| boundary | 未計測 | 未計測 | 未計測 |
| charIndex単調増加 | 未計測 | 未計測 | 未計測 |
| pause/resume | 未計測 | 未計測 | 未計測 |
| cancel後の再生 | 未計測 | 未計測 | 未計測 |
| rate 0.8 | 未計測 | 未計測 | 未計測 |
| rate 1.0 | 未計測 | 未計測 | 未計測 |
| rate 1.5 | 未計測 | 未計測 | 未計測 |
| rate 2.0 | 未計測 | 未計測 | 未計測 |
| タブ非表示時 | 未計測 | 未計測 | 未計測 |
| 日英混在 | 未計測 | 未計測 | 未計測 |

## 判定ルール

- boundaryは必須機能にしない。
- 3発話以上、5イベント以上、charIndexが単調増加する場合のみ高精度同期へ利用する。
- 音声エラー時はRSVPだけへ自動復帰する。
- 音声OFF時の既存RSVP挙動を回帰させない。
