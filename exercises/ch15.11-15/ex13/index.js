const chatBox = document.querySelector('#chatBox'); // idセレクタは # を使います
const userInput = document.querySelector('#userInput');
const sendButton = document.querySelector('#sendButton');

// チャットにメッセージを追加
function appendMessage(message, isUser = true) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// チャットをリクエスト
async function sendMessageToBot(message) {
  appendMessage(message, true);

  const botMessageDiv = document.createElement('div');
  botMessageDiv.className = 'message bot-message';
  // botMessageDiv.textContent = '';
  chatBox.appendChild(botMessageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [{ role: "user", content: message }],
            model: 'gemma:2b',
            stream: true,
        }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      console.log(buffer);

      // 改行でデータを分割して処理
      const lines = buffer.split('\n');
      buffer = lines.pop(); // 最後の行（未完成の場合）をバッファに保持

      for (const line of lines) {
        if (line.trim() === '') continue; // 空行をスキップ

        try {
          const parsed = JSON.parse(line);
          if (parsed.message && parsed.message.content) {
            // メッセージを少しずつHTMLに追加
            botMessageDiv.textContent += parsed.message.content;
            chatBox.scrollTop = chatBox.scrollHeight; // 自動スクロール
          }
        } catch (error) {
          console.error('JSON parse error:', error, line);
        }
      }
    }
  } catch (error) {
      botMessageDiv.textContent = 'An error occurred. Please try again.';
      console.error(error);
  }
}

// 送信ボタンをクリックした時
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        sendMessageToBot(message);
        userInput.value = '';
    }
});

// Enterキー押下時もチャットを送信する
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});