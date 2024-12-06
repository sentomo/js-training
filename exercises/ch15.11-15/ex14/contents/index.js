"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  button.disabled = true; // 追記：通信中はボタンを非活性化
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  const eventSource = new EventSource("http://localhost:3000/message");

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = data.value;
    messageContainer.appendChild(messageElement);

    if (data.done) {
      eventSource.close(); // 接続を閉じる
      button.disabled = false; // ボタンを再び有効化
    }
  };

  eventSource.onerror = () => {
    const errorElement = document.createElement("div");
    errorElement.className = "message";
    errorElement.textContent = "エラーが発生しました。";
    messageContainer.appendChild(errorElement);

    eventSource.close(); // エラー時にも接続を閉じる
    button.disabled = false; // ボタンを再び有効化
  };
}
