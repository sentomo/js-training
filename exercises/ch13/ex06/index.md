# jQuery Deferred とは
* jQueryのバージョン1.5から導入された、複数の連続する非同期処理を単純で分かり易く記述できるようにする標準モジュール。使いこなすことで、以下のような効果が見込めます。
  * 非同期処理を連結する際、コールバック地獄から解放される（直列処理、並列処理が可能）
  * エラー処理をうまく記述できる
  * 一連の非同期処理を関数化して再利用しやすくできる
* 

# 起源と背景
## jQuery.Deferred
* jQuery の Deferred は、jQuery 1.5 で導入され、非同期処理の結果を管理するための特定の実装です。
* Deferred は、jQuery 内部で非同期操作の結果を扱うために設計されており、done, fail, always メソッドを使用してコールバックを管理します。

## Promise
* ECMAScript 6 (ES6) から標準化された Promise は、JavaScript における非同期処理の標準的な実装です。
* Promise は、then, catch, finally メソッドを使用して、非同期操作の結果やエラーを処理します。

# 主な違い
## APIとメソッド
* jQuery.Deferred は、resolve, reject メソッドを使って結果を設定し、done, fail, always メソッドでコールバックを登録します。
* Promise は、resolve, reject メソッドを使って結果を設定し、then, catch, finally メソッドでコールバックを登録します。Promise では、then メソッドが成功と失敗の両方のコールバックを受け取るのに対し、jQuery.Deferred では done と fail メソッドでそれぞれ処理します。

## 非同期チェーン
* jQuery.Deferred では、done や fail を使ったチェーンが可能ですが、Promise では then を使ったチェーンが標準です。Promise のチェーンは、非同期操作の結果が次の then に引き継がれることを保証します。

## 標準化
* Promise は ECMAScript 標準として広く採用されており、すべてのモダンな JavaScript 環境でサポートされています。
jQuery.Deferred は jQuery 固有の実装であり、jQuery が導入されていない環境では使用できません。

# 参考
* [jQueryのPromiseとDeferredとは - ハッカーを目指す白Tのブログ](https://beck23.hatenablog.com/entry/2014/11/08/022842)
* [爆速でわかるjQuery.Deferred超入門 - Yahoo! JAPAN Tech Blog](https://techblog.yahoo.co.jp/programming/jquery-deferred/)