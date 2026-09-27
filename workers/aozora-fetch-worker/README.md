# Aozora Fetch Worker

My Essaysの青空文庫URL取込専用のbyte proxyです。

- 許可先は https://www.aozora.gr.jp/cards/... の図書カードとXHTMLのみ
- open proxyにはしません
- redirect先も同じallowlistで再検証します
- Shift_JISのdecodeやHTML解析は行いません
- 本文はKV/R2/D1/Cache APIへ保存しません
- production CORS originは https://silovar-uk.github.io のみです

GitHub Actionsから自動デプロイする場合は、Repository secretsへ以下を設定します。

- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID

Worker名は aozora-fetch です。My Essays側の既定endpointは
https://aozora-fetch.silovar-uk.workers.dev/v1/fetch
です。
