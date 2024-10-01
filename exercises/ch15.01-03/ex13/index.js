// nav 要素内のリンク (<a>)
const navLinks = document.querySelectorAll("nav a");
console.log("nav要素内のリンク:", navLinks);

// 商品リスト (.product-list) 内の最初の商品 (.product-item)
const firstProductItem = document.querySelector(".product-list .product-item");
console.log("最初の商品:", firstProductItem);

// カートアイコンの画像 (<img>)
const cartIconImg = document.querySelector(".cart img");
console.log("カートアイコンの画像:", cartIconImg);

// 商品リスト (.product-list) 内の価格 (.price) を表示する要素
const priceElements = document.querySelectorAll(".product-list .price");
console.log("価格を表示する要素:", priceElements);

// 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
const allProductImages = document.querySelectorAll(".product-list .product-item img");
console.log("全ての商品画像:", allProductImages);

// 検索バー (.search-bar) 内の検索ボタン (<button>)
const searchButton = document.querySelector(".search-bar button");
console.log("検索バー内の検索ボタン:", searchButton);

// フッター (footer) 内のパラグラフ (<p>) 要素
const footerParagraph = document.querySelector("footer p");
console.log("フッター内のパラグラフ:", footerParagraph);

// 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
const evenProductItems = document.querySelectorAll(".product-list .product-item:nth-child(even)");
console.log("偶数番目の商品:", evenProductItems);

// ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
const accountIconImg = document.querySelector(".account img");
console.log("アカウントリンクの画像:", accountIconImg);

// ナビゲーションリンクのうち、"会社情報" のリンク
const companyInfoLink = document.querySelector('nav a[href="#about"]');
console.log("会社情報のリンク:", companyInfoLink);
