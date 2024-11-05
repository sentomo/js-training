# Tailwind CSSとは
* オープンソースのCSSフレームワーク。
* 特徴は、Bootstrapなどの他のCSSフレームワークと異なり、ボタンやテーブルなどの要素に対する一連の定義済みクラスを提供しないことである。ユーティリティクラス(utility class)を自由に組み合わせて活用し、よりオリジナリティの高いデザインのWebサイト及びWebアプリケーションを作成可能である。

# Tailwind CSSの例
```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>

```
* 要素のclass名に、追加したいデザインのTailwindのユーティリティクラス名を定義している。

# メリット
* よりオリジナリティの高いデザインのWebサイト及びWebアプリケーションが作成可能。
* 新しい機能やコンポーネントを追加するたびにCSSファイルが増えて膨大な数になるのを防げる。
* HTMLファイルにTailwindの変更が閉じられるので、意図しないところに変更が影響するのを防げる。

# デメリット
* TailwindCSSのクラス名を覚える初期学習コストがかかる。
* ユーティリティクラスを組み合わせるため、コードが長くなり可読性が落ちやすい。

# 参考
* [TailwindCSS入門！メリットと使い方をやさしく解説 \| エンジニアBLOG](https://blog.cloudsmith.co.jp/2023/02/330/)
* [TailwindCSSって何？なんで流行ってるの？｜F Lab｜Fixel株式会社](https://fixel.co.jp/blog/tailwindcss/)