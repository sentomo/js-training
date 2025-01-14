> クロスオリジンリクエストに制約が無かった場合、どのような問題が発生するか

* 以下のセキュリティ上の問題が発生する
  * クロスサイトリクエストフォージェリ（CSRF）
    * 悪意のあるサイトが、ユーザーの認証済みセッションを悪用して別のオリジンでリクエストを送信する可能性がある。
  * 機密情報の漏洩
    * 悪意のあるサイトがユーザーのブラウザを使って別オリジンのAPIやデータにアクセスし、機密情報（例えば個人情報や認証トークン）を取得することができる。

> クロスオリジンリクエストで メソッド(POST/GET)やリクエストの内容によって Preflight リクエストの有無が異なるのは何故か
* Preflightリクエストとは
 *  CORS のリクエストの一つであり、サーバーが CORS プロトコルを理解していて準備がされていることを、特定のメソッドとヘッダーを使用してチェックする。
   * 参考：[Preflight request \(プリフライトリクエスト\) \- MDN Web Docs 用語集: ウェブ関連用語の定義 \| MDN](https://developer.mozilla.org/ja/docs/Glossary/Preflight_request)
* Preflightリクエストが発生するメソッド
  * POST, DELETE, PUT などはデータが変更されるような副作用が発生するメソッドについては、Preflightリクエストを送信してチェックしている。
  * GET、HEAD、POSTについては、CORSが登場する以前から異なるオリジンに対するリクエストが許容されており、単純リクエストと呼ばれている。
* Preflightリクエストが発生しないリクエスト
  * 単純リクエスト
  * CORS登場前から存在するリクエスト
    * サーバ側でのCORS対応が追いついていなければCORSエラーのためメインのリクエストが送信されず、互換性がなくなる。
* 参考：[【CORS】なぜ、Preflight Request が発生するときとしないときがあるのか](https://zenn.dev/tm35/articles/ad05d8605588bd)
