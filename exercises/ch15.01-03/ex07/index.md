# クリックジャギングとは
* ウェブページの利用者に対し悪意をもって使用される技術の一種で、リンクやボタンなどの要素を隠蔽・偽装してクリックを誘い、利用者の意図しない動作をさせようとする手法である。たとえば、別の機能を実行するボタンに見せかけるなどして、埋め込まれたコードを利用者に気づかれないように実行する。
* 参考
  * [安全なウェブサイトの作り方 \- 1\.9 クリックジャッキング \| 情報セキュリティ \| IPA 独立行政法人 情報処理推進機構](https://www.ipa.go.jp/security/vuln/websecurity/clickjacking.html)
  * [クリックジャッキング \- Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%82%B8%E3%83%A3%E3%83%83%E3%82%AD%E3%83%B3%E3%82%B0)

# クリックジャギングを防ぐために
* セキュリティ対策として多くのウェブサイトは、X-Frame-Optionsヘッダーで、他サイトがそのサイトを iframe内に読み込むことを禁止している。

# 同一オリジンポリシーがない場合
* 以下のような問題が発生する。
  * 個人情報の盗難
    * 悪意のあるサイトが、他のサイトの iframe を埋め込み、その中のフォームから個人情報（クレジットカード番号、ログイン情報など）を盗むことが可能になる。これによりユーザーのプライバシーが脅かされる。
  * サイト改ざん
    * 悪意のあるサイトが他のサイトの DOM にアクセスして、勝手に内容を変更することで、ユーザーを誤誘導したり、マルウェアをダウンロードさせるリンクを挿入することができる。