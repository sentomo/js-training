>実際のサービスの通信をデベロッパーツールなどで眺めて CORS の設定を確認しなさい。(金融系の認証ページなどで CORS の設定がされていることが多い)

* 確認したサイト
  * みずほ銀行 https://www.mizuhobank.co.jp/index.html
* 開発者ツールでのCORS設定の確認方法
  * [Google Chrome でHTTPヘッダー情報を確認する方法 \| スマコマ](https://smakoma.com/http-header-chrome.html)
* index.htmlのレスポンスヘッダーで、以下の設定があった。
  * Access-Control-Allow-Methods:
GET, HEAD, POST
  * Access-Control-Allow-Origin:
https://search.www.mizuhobank.co.jp

