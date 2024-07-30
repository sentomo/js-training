# 括弧の対応が正しい文字列かどうか判定する正規表現は書けるか？
* 書けない
* 括弧の対応が正しいかどうかを判定する問題は、基本的には文法解析やスタックを使ったアルゴリズムが必要。正規表現は有限オートマトンであり、ネストされた構造を無限に扱うことはできない。

# 参考
* [pythonで入れ子上になったテキストの階層構造を取り出す](https://teratail.com/questions/234191#reply-341047)
* [Can regular expressions be used to match nested patterns? [duplicate]\- Stack Overflow](https://stackoverflow.com/questions/133601/can-regular-expressions-be-used-to-match-nested-patterns)