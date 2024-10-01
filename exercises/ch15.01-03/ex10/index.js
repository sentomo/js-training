const div = document.querySelector("#editor-front");
const input = document.querySelector("#editor-back");

div.addEventListener("click", () => {
  input.focus();
});

input.addEventListener("focus", () => {
  div.style.backgroundColor = "silver"; // div の背景色を灰色に変更
});

input.addEventListener('blur', () => {
  div.style.backgroundColor = 'white'; // div の背景色を白に戻す
});

input.addEventListener('input', () => {
  div.textContent = input.value; // div に入力されたテキストを表示
});
