const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const toggle = document.createElement("input");
const destroy = document.createElement("button");

// ============追加ここから==========
let isFetching = false; // 通信状態の初期化

// 通信中の UI 無効化/有効化
function setUIEnabled(enabled) {
  form.disabled = !enabled;
  input.disabled = !enabled;
  toggle.disabled = !enabled;
  destroy.disabled = !enabled;

  list.forEach((item) => {
    const input = item.querySelector("input");
    if (input) input.disabled = !enabled;
  });
}

async function retryWithExponentialBackoff(fetchFunction, retries = 3, delay = 1000, timeout = 3000) {
  let attempt = 0;

  while (attempt <= retries) {
    const controller = new AbortController(); // AbortController を作成
    const signal = controller.signal; // signal を取得
    const timeoutId = setTimeout(() => controller.abort(), timeout); // タイムアウト後にリクエストをキャンセル

    try {
      const response = await fetchFunction(signal);
      clearTimeout(timeoutId); // 成功した場合はタイムアウトをクリア
      if (response.ok) {
          return response; // 正常なレスポンスの場合はそのまま返す
      }
      // ステータスコード500番台以外のエラーはリトライしない
      if (response.status < 500 || response.status >= 600) {
          throw new Error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
        clearTimeout(timeoutId); // エラーが発生してもタイムアウトをクリア
        if (error.name === "AbortError") {
          alert("Request timed out");
          throw new Error("Request timed out"); // タイムアウトエラーをスロー
        }

        if (attempt === retries) {
            throw error; // 最終試行でも失敗した場合はエラーをスロー
        }
    }

    // リトライ待機 (指数バックオフ)
    const waitTime = delay * 2 ** attempt;
    await new Promise(resolve => setTimeout(resolve, waitTime));

    attempt++;
  }
}

// fetchをラップする関数
async function fetchWithRetry(url, options, timeout = 3000) {
  try {
    isFetching = true; // 通信開始
    setUIEnabled(false); // UI を無効化

    const response = await retryWithExponentialBackoff(
      (signal) => fetch(url, { ...options, signal }), // signal を fetch に渡す
      3, // 最大リトライ回数
      1000, // 初回待機時間
      timeout // タイムアウト時間
    );

    return response;
  } finally {
    isFetching = false; // 通信終了
    setUIEnabled(true); // UI を有効化
  }
}
// ============追加ここまで==========

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  // ============追加ここから==========
  try{
    const response = await fetchWithRetry("/api/tasks", {
        method: "GET",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
    });
    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task));

    setUIEnabled(true); // 初期化後に UI を有効化
  } catch (error) {
    alert(`Error fetching tasks: ${error.message}`);
  }
  // ============追加ここまで==========
});

form.addEventListener("submit", async (e) => {
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

  if (isFetching) return; // 通信中なら無視
  try {
    const response = await fetchWithRetry("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(newTask)
    });

    const data = await response.json();
    appendToDoItem(data);
  } catch (error) {
      alert(`Error creating task: ${error.message}`);
  }
  // ============追加ここまで==========

});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

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

  toggle.addEventListener("change", async () => {
    try {
      await fetchWithRetry(`/api/tasks/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ id: task.id, status: toggle.checked ? "completed" : "active" })
      });
      label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    } catch (error) {
        alert(`Error updating task: ${error.message}`);
    }
  });
  // ============追加ここまで==========

  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  // ============追加ここから==========
  destroy.textContent = "❌";

  destroy.addEventListener("click", async () => {
    try {
      await fetchWithRetry(`/api/tasks/${task.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json; charset=UTF-8" }
      });
      elem.remove();
    } catch (error) {
        alert(`Error while fetching delete task: ${error.message}`);
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
