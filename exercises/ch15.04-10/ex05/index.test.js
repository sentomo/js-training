import { expect, test } from "@playwright/test";

test.describe('Inline Circle', () => {
  
  // Load the page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://127.0.0.1:5500/exercises/ch15.04-10/ex05/index.html');
  });

  test('inline-circleが3つ存在することを確認', async ({ page }) => {
    const inlineCircles = await page.locator('inline-circle');
    await expect(inlineCircles).toHaveCount(3);
  });
  
  test('inline-circleに正しい属性が設定されている', async ({ page }) => {
    await page.waitForSelector('inline-circle'); // 要素が表示されるのを待つ
    const inlineCircles = await page.locator('inline-circle');
    console.log(`inlineCircles: ${inlineCircles.first()}`);

    // デフォルトのinline-circleの属性確認
    await expect(circles.nth(0)).toHaveAttribute('diameter', '1em');
    await expect(circles.nth(0)).not.toHaveAttribute('color', 'blue');

    // 2番目のinline-circleの属性確認
    await expect(circles.nth(1)).toHaveAttribute('diameter', '1.2em');
    await expect(circles.nth(1)).toHaveAttribute('color', 'blue');

    // 3番目のinline-circleの属性確認
    await expect(circles.nth(2)).toHaveAttribute('diameter', '.6em');
    await expect(circles.nth(2)).toHaveAttribute('color', 'gold');
  });
});