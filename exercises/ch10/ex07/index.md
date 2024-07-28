# date-fns
* 機能ごとに関数が定義されていて、モジュールが分割されている。src/format や src/add といったディレクトリに具体的な機能別のファイルが配置されている。

# Luxon
* DateTime、Duration、Interval、Settings といった主要なクラスごとにモジュールが分割されている。

# Day.js
* プラグインごとにモジュールが分割されている。
* コア部分のindex.jsには基本的な日付操作機能が実装され、extend関数を使って、必要に応じてプラグインをimportして利用できるようになっている。