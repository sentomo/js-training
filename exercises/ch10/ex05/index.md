# Nodeのモジュール方式
* インポート先で関数の名前変更が適用されなかった。(エクスポート側だけ)

# ES6のモジュール方式
* mathUtils.jsのadd関数をadd2に変更すると、インポート先のindex.jsでadd関数の名前変更が適用された。
* index.jsの名前変更を伴うデフォルトエクスポートの再エクスポートの名前変更(例：calcをcalc2に変更)は、インポート先のapp.jsでも適用された。
* index.jsの名前変更を伴う再エクスポートの名前変更(例：addNumberをaddNumber2に変更)は、インポート先のapp.jsでも適用された。

# VSCodeのRename Symbol
* [入門F2 〜VS CodeのRename Symbolで楽々リファクタリング〜 \- nikkie\-ftnextの日記](https://nikkie-ftnext.hatenablog.com/entry/vscode-f2-easy-refactoring)