const template = document.createElement("template");
template.innerHTML = `\
<style>
  .completed {
    text-decoration: line-through;
  }
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.todoList = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTodo();
    });
  }

  addTodo() {
    const todoText = this.input.value.trim();
    if (!todoText) return; // 空のタスクを追加しない

    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;

    // 完了チェックボックスを追加
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", () => {
      todoItem.classList.toggle("completed");
    });

    // 削除ボタンを追加
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      this.todoList.removeChild(todoItem);
    });

    todoItem.appendChild(completeButton);
    todoItem.appendChild(deleteButton);
    this.todoList.appendChild(todoItem);
    this.input.value = ""; // 入力フィールドをクリア
  }
}

customElements.define("todo-app", TodoApp);
