const gridElement = document.getElementById('grid');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');

// WebSocket 接続を初期化
const ws = new WebSocket('ws://localhost:3003');

ws.onopen = () => {
  console.log('Connected to server');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'update') {
    updateGrid(data.grid);
  } else if (data.type === 'pause') {
    alert('Game Paused');
  } else if (data.type === 'start') {
    alert('Game Started');
  }
};

ws.onerror = (error) => {
  console.error('WebSocket Error:', error);
};

ws.onclose = () => {
  console.log('Connection closed');
};

function updateGrid(grid) {
  gridElement.innerHTML = ''; // 既存のセルをクリア
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (grid[row][col]) {
        cell.classList.add('alive');
      } else {
        cell.classList.add('dead');
      }

      // セルをクリックした時の処理
      cell.addEventListener('click', () => {
        const message = JSON.stringify({
          type: 'toggle',
          row: row,
          col: col
        });
        ws.send(message);
      });

      gridElement.appendChild(cell);
    }
  }
}

// 開始ボタンのクリックイベント
startButton.addEventListener('click', () => {
  const message = JSON.stringify({ type: 'start' });
  ws.send(message);
});

// 停止ボタンのクリックイベント
pauseButton.addEventListener('click', () => {
  const message = JSON.stringify({ type: 'pause' });
  ws.send(message);
});