# 動作確認
* integrity属性の使い方は下記を参照。
* [サブリソース完全性の使い方](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity#%E3%82%B5%E3%83%96%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E5%AE%8C%E5%85%A8%E6%80%A7%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)

## integrity値が適切な時
* index.jsのスクリプトが実行される。

## integrity値が適切でない時
* 以下のエラーがコンソールに表示され、index.jsのスクリプトは実行されない。
```
index.html:1 Failed to find a valid digest in the 'integrity' attribute for resource 'https://127.0.0.1:5500/exercises/ch15.01-03/ex03/index.js' with computed SHA-384 integrity 'vqFuf/esBPe0OUJPmwVhgTSHCGrlhL3BpwZkKfZBqImWk1ThM5epLKOiCuS/z6EX'. The resource has been blocked.
```


# 防御できるセキュリティ攻撃
## リソース改ざん
* リソースを変更すると、integrity値による照合に失敗して、リソースにアクセスできなくなる。
* 正しいハッシュ値を使うことで、意図しない悪意あるコードが実行されるのを防ぐ。
* CDNなどの外部リソース読み込み元にセキュリティ侵害があった場合に、改竄された不正なリソースを読み込んでしまうことを防ぐ。
* 参考：[サブリソース完全性によるCDN改竄対策 \| 脆弱性診断の標準化企業 SHIFT SECURITY](https://www.shiftsecurity.jp/blog/20231012-1)