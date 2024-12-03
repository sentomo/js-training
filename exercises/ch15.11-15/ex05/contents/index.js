const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// IndexedDB の設定
const DB_NAME = "todoAppDB";
const STORE_NAME = "tasks";

// IndexedDB の初期化関数
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

// タスクを IndexedDB に保存する関数
function saveTaskToDB(task) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(task);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

// IndexedDB からタスクを取得する関数
function getTasksFromDB() {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

// タスクを削除する関数
function deleteTaskFromDB(taskId) {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(taskId);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  });
}

// タスクを更新する関数 (状態を変更するなど)
function updateTaskInDB(task) {
  return saveTaskToDB(task);
}

// タスクのリストを更新する関数
function updateTodoList(tasks) {
  list.innerHTML = ""; // 現在のリストをクリア
  tasks.forEach((task) => appendToDoItem(task));
}

// 他のタブの変更を検知
window.addEventListener("storage", (event) => {
  if (event.key === "todo-app-tasks") {
    getTasksFromDB().then((tasks) => {
      updateTodoList(tasks);
    });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // ============追加ここから==========
  // IndexedDB からタスクを読み込み
  getTasksFromDB().then((tasks) => {
    updateTodoList(tasks);
  });
});

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
  appendToDoItem(newTask);

  saveTaskToDB(newTask).then(() => {
    // 変更を他のタブに通知
    window.localStorage.setItem("todo-app-tasks", Date.now().toString());
  });
  // ============追加ここまで==========

});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
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
    updateTaskInDB(task).then(() => {
      window.localStorage.setItem("todo-app-tasks", Date.now().toString());
    });
  });
  // ============追加ここまで==========

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  // ============追加ここから==========
  destroy.textContent = "❌";

  destroy.addEventListener("click", () => {
    deleteTaskFromDB(task.id).then(() => {
      elem.remove();
      window.localStorage.setItem("todo-app-tasks", Date.now().toString());
    });
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
