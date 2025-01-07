# AES
* Advanced Encryption Standardの略。
* アメリカが2001年に標準暗号として定めた共通鍵暗号アルゴリズムである。
* AES以前の標準暗号はDES(Data Encryption Standard)だったが、以下の2点が問題になっていた。そこで、新しい標準暗号がアメリカ国立標準技術研究所（NIST）の主導によって公募され、AESが選出された。2001年3月に FIPS PUB 197 として公表された。
  * コンピュータの能力とネットワーク技術の上昇による相対的な強度の低下
  * NSAの関与がある設計の不透明性（詳細はDESの記事を参照）
* AESの暗号化は共通鍵暗号方式である。
* 無線LANのWPA2規格では、AESが採用されている。

* 参考
  * [Advanced Encryption Standard \- Wikipedia](https://ja.wikipedia.org/wiki/Advanced_Encryption_Standard)
  * [Data Encryption Standard](https://wa3.i-3-i.info/word15121.html)

# Base64
* データを64種類の印字可能な英数字のみを用いて、それ以外の文字を扱うことの出来ない通信環境にてマルチバイト文字やバイナリデータを扱うためのエンコード方式である。
* すべてのデータを「a～z」「A～Z」「0～9」「+」「/」の64文字と「=」の組み合わせに変換する方式。
* 7ビットのデータしか扱うことの出来ない電子メールにて広く利用されている。

* 参考
  * [Base64 \- Wikipedia](https://ja.wikipedia.org/wiki/Base64)
  * [Base64とは｜「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word11338.html)