# 動作確認方法
* VSCodeの「Live Server」という拡張機能を使用してローカルサーバを立てて動作確認。
  * 参考：[VScodeを使って簡単にローカルサーバーを立てる \#JavaScript \- Qiita](https://qiita.com/Kasuyan/items/4783308c8acfe1336874)
* cross-siteの動作確認
  1. GitHubにmodule.jsとCORS設定のためのnetlify.tomlを持つリポジトリを作成。(参考： [NetlifyのCORSエラーを無くす方法\-MYNT Blog](https://blog.myntinc.com/2022/11/netlifycors.html) )
  1. Netlifyから1.で作成したリポジトリをhttps://test-site-sentomo.netlify.app としてデプロイ
  1. index.htmlのawait import()の引数に、https://test-site-sentomo.netlify.app/module.js を渡して、Live Serverで実行し、「スクリプトをロード」ボタンをクリックする。
  1. module.jsが実行されて、「hello!」というalertが表示される。
