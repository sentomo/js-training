# 問題1
* index.js参照

# 問題2
* type="module"属性をつけたスクリプトは、defer属性をつけたスクリプトと同じように読み込まれ実行される。そのため、type="module"を削除した場合は、HTMLドキュメントが完全に読み込まれて解析された時に発生する「DOMContentLoaded」イベント後にスクリプトが実行されるように、「DOMContentLoaded」イベントにスクリプトをイベントハンドラを登録しておく。