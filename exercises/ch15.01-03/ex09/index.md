# ReactのXSS対策
* ユーザーからの入力や外部データを自動的にエスケープする。

# ReactのXSS脆弱性
* どうしてもHTMLとして認識させたい場合にdangerouslySetInnerHTMLを利用すると、XSS攻撃のリスクが生じる。
* 参考：[Reactで発生しうるXSS脆弱性 \#JavaScript \- Qiita](https://qiita.com/kazzzzzz/items/897f8ed89ca36a0734de)

# jQueryのXSS対策
* HTMLコンテンツを追加する際に、text()メソッドを使用することで自動的にエスケープされる。

# jQueryのXSS脆弱性
* html()メソッドを使用する時は、自動的にエスケープされないため、ユーザー入力を直接挿入するとXSS攻撃を受けるリスクが生じる。
* 参考：[フロントエンド開発のためのセキュリティ \| 第1回 XSSの傾向と対策](https://www.codegrid.net/articles/frontend-security-1/)





