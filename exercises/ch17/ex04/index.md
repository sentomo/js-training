# package-lock.jsonの役割
* package-lock.json は npm install 実行時に作成・更新されるファイル。
* node_modules に実際にインストールされたパッケージのバージョン情報が package-lock.json に記述される。
* package.jsonはインストールすべきパッケージのバージョンの"範囲"、package-lock.jsonはnpm installによって実際にインストールしたパッケージのバージョン"のみ"が記述される。
* pm install の代わりに npm ci というコマンドを実行すると package-lock.json を元にパッケージをインストールして node_modules を作成してくれる。

# package-lock.jsonをリポジトリにコミットすべきか
*  npm ci コマンドを使用して、パッケージをインストールする用途があるので、package-lock.json は Git で管理すべき。

# 参考
* [package\-lock\.json ってなに？ \#npm \- Qiita](https://qiita.com/sugurutakahashi12345/items/1f6bb7a372b8263500e5)
* [package\.jsonとpackage\-lock\.jsonの違いについて \#JavaScript \- Qiita](https://qiita.com/phoby20/items/ca17d96bbf0da0b9989e)
