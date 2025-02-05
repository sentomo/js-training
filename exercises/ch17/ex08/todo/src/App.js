import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // todosはToDoリストを配列として管理、setTodosはtodosを更新する関数
  const [input, setInput] = useState(''); // inputは入力値を文字列として管理、setInputはinputを更新する関数

  const addTodo = (event) => {
    event.preventDefault(); // フォーム送信のリロードを防ぐ
    if (input.trim() === '') return;
    setTodos([{ text: input.trim(), completed: false }, ...todos]); // 既存のリストに新しいToDoオブジェクトを追加
    setInput(''); // テキストボックスを空白にする
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index)); // array.filterの第一引数は配列のelementが来るが、使用しないので_を使う
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form onSubmit={addTodo}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
            />
            <button type="submit">Add</button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <label
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.text}
                </label>
                <button onClick={() => deleteTodo(index)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
