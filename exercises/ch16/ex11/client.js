import net from 'net';

const NUM_CLIENTS = parseInt(process.argv[2], 10); // 接続するクライアント数
const PORT = 8080;

const clients = [];

// 複数のクライアントを作成し接続
for (let i = 0; i < NUM_CLIENTS; i++) {
  const client = new net.Socket();

  client.connect(PORT, 'localhost', () => {
    console.log(`クライアント${i + 1}がサーバに接続しました`);
    clients.push(client);
  });

  client.on('data', (data) => {
    console.log(`クライアント${i + 1}が受信したデータ:`, data.toString());
  });

  client.on('end', () => {
    console.log(`クライアント${i + 1}が切断されました`);
  });

  client.on('error', (err) => {
    console.log(`クライアント${i + 1}でエラーが発生しました:`, err);
  });
}
