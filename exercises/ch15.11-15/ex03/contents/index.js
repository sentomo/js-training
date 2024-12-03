const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const url = "http://localhost:3001";

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // ============追加ここから==========
  fetch(url + "/api/tasks", { 
    method: 'GET',
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    mode: "cors", // CORS モードを指定
    credentials: "true" // クロスオリジンでの Cookie 送信を許可
    })
    .then(response => {
        if (response.ok &&    // 成功しているか、想定している種類のデータかを確認する。
            response.headers.get("Content-Type") === "application/json; charset=UTF-8") {
            return response.json();
        } else {
          const errorMsg = `Unexpected response status ${response.status} or content type`;
          alert(errorMsg);
            throw new Error(
                `Unexpected response status ${response.status} or content type`
            );
        }
    })
    .then(data => {
        data.items.forEach(task => { // 登録済みのタスクを追加する。
          appendToDoItem(task);
        });
    })
    .catch(error => { 
        alert("Error while fetching current task list:", error);
    });
    // ============追加ここまで==========
});

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
  const newTask = { name: todo };
  fetch(url + "/api/tasks", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(newTask),
    mode: "cors", // CORS モードを指定
    credentials: "true" // クロスオリジンでの Cookie 送信を許可 
    })
    .then (response => {
      return response.json();
    })
    .then (data => {
      appendToDoItem(data); // Taskオブジェクトが返ってくる
    })
    .catch(error => { 
        alert("Error while fetching current task:", error);
    });
  // ============追加ここまで==========

});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  // ============追加ここから==========
  toggle.type = "checkbox";

  switch (task.status) { // 登録済みのタスクのチェックボックス設定
    case "completed":
      toggle.checked = true;
      break;
    case "active":
      toggle.checked = false;
      break;
  }
  label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

  toggle.addEventListener("change", () => {
    fetch(url + `/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ id: task.id, status: toggle.checked ? "completed" : "active" }),
      mode: "cors", // CORS モードを指定
      credentials: "true" // クロスオリジンでの Cookie 送信を許可
     })
      .then (response => {
        if (response.ok) {
          label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
        }
      })
      .catch(error => { 
          alert("Error while fetching update task:", error);
      });
  });
  // ============追加ここまで==========

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  // ============追加ここから==========
  destroy.textContent = "❌";

  destroy.addEventListener("click", () => {
    fetch(url + `/api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      mode: "cors", // CORS モードを指定
      credentials: "true" // クロスオリジンでの Cookie 送信を許可
     })
      .then (response => {
        if (response.ok) {
          elem.remove();
        }
      })
      .catch(error => { 
          alert("Error while fetching delete task:", error);
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
