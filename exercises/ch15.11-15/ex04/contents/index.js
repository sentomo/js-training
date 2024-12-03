const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// Local storage のキー
const STORAGE_KEY = "todo-app-tasks";

// LocalStorage の利用可否を確認する関数
function isLocalStorageAvailable() {
  try {
    localStorage.setItem("__test__", "__test__");
    localStorage.removeItem("__test__");
    return true;
  } catch (e) {
    return false;
  }
}

const localStorageAvailable = isLocalStorageAvailable();
let tasks = []; // タスクのリストを管理

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // ============追加ここから==========
  if (localStorageAvailable) {
    // ローカルストレージからデータを読み込む
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }
  }

  // タスクを表示
  tasks.forEach((task) => appendToDoItem(task));

  // 他のタブの変更を検知
  if (localStorageAvailable) {
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) {
        tasks = JSON.parse(event.newValue || "[]");
        updateTodoList();
      }
    });
  }
});

// タスクの保存
function saveTasksToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ToDoリストを更新する
function updateTodoList() {
  list.innerHTML = ""; // 現在のリストをクリア
  tasks.forEach((task) => appendToDoItem(task));
}
// ============追加ここまで==========

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // ============追加ここから==========
  e.preventDefault();
  // ============追加ここまで==========

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // ============追加ここから==========
  const newTask = { id: Date.now(), name: todo, status: "active" };
  tasks.push(newTask);
  appendToDoItem(newTask);

  if (localStorageAvailable) {
    saveTasksToLocalStorage();
  }
  // ============追加ここまで==========

});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  // label.style.textDecorationLine = "none";
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  // ============追加ここから==========
  toggle.type = "checkbox";

  toggle.checked = task.status === "completed"; // 登録済みのタスクのチェックボックス設定

  toggle.addEventListener("change", () => {
    task.status = toggle.checked ? "completed" : "active";
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    if (localStorageAvailable) {
      saveTasksToLocalStorage();
    }
  });
  // ============追加ここまで==========

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  // ============追加ここから==========
  destroy.textContent = "❌";

  destroy.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    elem.remove();
    if (localStorageAvailable) {
      saveTasksToLocalStorage();
    }
  });  
  // ============追加ここまで==========
  
  // TODO: elem 内に toggle, label, destroy を追加しなさい
  // ============追加ここから==========
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  // ============追加ここまで==========
  
  list.prepend(elem);
}
