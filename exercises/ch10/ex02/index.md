# CommonJS と ES Module 以外の JavaScript のモジュール方式名
## AMD(Asynchronous Module Definition)
* define関数で、モジュール名、依存関係を定義する。
* 非同期的に読み込む。
* モジュール管理ライブラリのRequireJSはAMDに対応している。

## UMD(Universal Module Definition)
* AMDとCommonJSの両方で機能するモジュール形式。
* ブラウザとサーバ環境の両方で互換性を持つように設計されている。

## 参考
* [JSエコシステムぶらり探訪\(6\): AMDとモジュールローダー \#JavaScript \- Qiita](https://qiita.com/qnighy/items/0c3fd208e0356fa19cda)
* [JavaScript のモジュールを理解する](https://www.pr1v4t3.io/javascript-modules)
* [JavaScriptのモジュールについてまとめてく: モジュールローダ/JavaScript実行環境など編](https://zenn.dev/ebi_yu/scraps/6837b857117dec)