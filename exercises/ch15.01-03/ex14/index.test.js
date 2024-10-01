import { expect, test } from "@playwright/test";

test.describe('Product List Filter', () => {
  test('should display all products when "すべて" is selected', async ({ page }) => {
    await page.goto('http://localhost:5500/exercises/ch15.01-03/ex14/index.html'); // 実行中のサーバーのURLに変更

    await page.selectOption('#category-select', 'all');
    const productItems = await page.locator('#productList li');
    
    // すべての商品が表示されていることを確認
    expect(await productItems.count()).toBe(3);
    expect(await productItems.nth(0).textContent()).toContain('お菓子');
    expect(await productItems.nth(1).textContent()).toContain('消しゴム');
    expect(await productItems.nth(2).textContent()).toContain('ものさし');
  });

  test('should display only food products when "食品" is selected', async ({ page }) => {
    await page.goto('http://localhost:5500/exercises/ch15.01-03/ex14/index.html'); // 実行中のサーバーのURLに変更

    await page.selectOption('#category-select', 'food');
    const productItems = await page.locator('#productList li');

    // 食品の商品が表示されていることを確認
    expect(await productItems.count()).toBe(1);
    expect(await productItems.nth(0).textContent()).toContain('お菓子');
  });

  test('should display only stationery products when "文房具" is selected', async ({ page }) => {
    await page.goto('http://localhost:5500/exercises/ch15.01-03/ex14/index.html'); // 実行中のサーバーのURLに変更

    await page.selectOption('#category-select', 'stationery');
    const productItems = await page.locator('#productList li');

    // 文房具の商品が表示されていることを確認
    expect(await productItems.count()).toBe(2);
    expect(await productItems.nth(0).textContent()).toContain('消しゴム');
    expect(await productItems.nth(1).textContent()).toContain('ものさし');
  });
});