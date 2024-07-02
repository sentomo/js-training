import { instanceOf } from './index.js';

// クラス定義
class A {}
class B extends A {}
class C extends B {}
class D {}

// テストケース
it('多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース', () => {
  const cInstance = new C();
  expect(instanceOf(cInstance, A)).toBe(true); // CはAを継承している
  expect(instanceOf(cInstance, B)).toBe(true); // CはBを継承している
  expect(instanceOf(cInstance, C)).toBe(true); // CはCを継承している
});

it('継承関係にないインスタンスとクラスのコンストラクタを入力するケース', () => {
  const cInstance = new C();
  const dInstance = new D();
  expect(instanceOf(cInstance, D)).toBe(false); // CはDを継承していない
  expect(instanceOf(dInstance, A)).toBe(false); // DはAを継承していない
  expect(instanceOf(dInstance, B)).toBe(false); // DはBを継承していない
});

it('nullとundefinedの場合', () => {
  expect(instanceOf(null, A)).toBe(false);
  expect(instanceOf(undefined, A)).toBe(false);
});
