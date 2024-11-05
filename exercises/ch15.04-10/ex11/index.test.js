import { test, expect } from '@playwright/test';

test.describe("ToDoアプリのテスト", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto("https://127.0.0.1:5500/exercises/ch15.04-10/ex11/index.html");
  });

  test("ToDoの追加", async ({ page }) => {
    await page.fill('#new-todo', 'テスト用のToDo');
    await page.click('button:has-text("Add")');
    const todoText = await page.textContent('#todo-list li:last-child .content');
    expect(todoText).toBe('テスト用のToDo');
  });

  test("ToDoの完了/未完了切り替え", async ({ page }) => {
    await page.fill('#new-todo', '完了テスト用のToDo');
    await page.click('button:has-text("Add")');
    const lastTodoCheckbox = await page.waitForSelector('#todo-list li:last-child .toggle');
    await lastTodoCheckbox.check();
    expect(await lastTodoCheckbox.isChecked()).toBe(true);

    // 未完了に戻すテスト
    lastTodoCheckbox = await page.waitForSelector('#todo-list li:last-child .toggle'); // 再取得
    await lastTodoCheckbox.uncheck();
    expect(await lastTodoCheckbox.isChecked()).toBe(false);
  });

  test("ToDoの削除", async ({ page }) => {
    await page.fill('#new-todo', '削除テスト用のToDo');
    await page.click('button:has-text("Add")');
    const deleteButton = await page.$('#todo-list li:last-child .destroy');
    await deleteButton.click();

    const todoListItems = await page.$$('#todo-list li');
    expect(todoListItems.length).toBe(0); // ToDoが削除されたことを確認
  });

  test("フィルタ機能のテスト", async ({ page }) => {
    // 複数のToDoを追加
    await page.fill('#new-todo', '未完了ToDo 1');
    await page.click('button:has-text("Add")');
    await page.fill('#new-todo', '完了ToDo');
    await page.click('button:has-text("Add")');

    // 完了ToDoをチェック済みに設定
    const lastTodoCheckbox = await page.$('#todo-list li:last-child .toggle');
    await lastTodoCheckbox.check();

    // Active (未完了)のフィルタテスト
    await page.click('a[href="#/active"]');
    const activeTodos = await page.$$('#todo-list li');
    expect(activeTodos.length).toBe(1);
    expect(await activeTodos[0].textContent('.content')).toBe('未完了ToDo 1');

    // Completed (完了済み)のフィルタテスト
    await page.click('a[href="#/completed"]');
    const completedTodos = await page.$$('#todo-list li');
    expect(completedTodos.length).toBe(1);
    expect(await completedTodos[0].textContent('.content')).toBe('完了ToDo');

    // All (すべて)のフィルタテスト
    await page.click('a[href="#/"]');
    const allTodos = await page.$$('#todo-list li');
    expect(allTodos.length).toBe(2);
  });
});
