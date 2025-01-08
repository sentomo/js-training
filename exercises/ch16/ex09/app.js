import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// __dirname を再現
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ミラーエンドポイント
app.all("/test/mirror", (req, res) => {
  // レスポンスのヘッダーを設定
  res.set("Content-Type", "text/plain; charset=UTF-8");

  // レスポンスのステータスコードを設定
  res.status(200);

  // リクエストメソッド、URL、HTTPバージョンを個別に書き込む
  res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);

  // リクエストヘッダーを個別に書き込む
  for (const [key, value] of Object.entries(req.headers)) {
    res.write(`${key}: ${value}\r\n`);
  }
  // ヘッダーの末尾に空行を追加
  res.write("\r\n");

  // リクエストボディをレスポンスボディにコピー
  req.pipe(res);
});

// 静的ファイル提供エンドポイント
app.use(express.static(path.resolve(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    let type;
    switch (path.extname(filePath)) {
      case ".html":
      case ".htm":
        type = "text/html";
        break;
      case ".js":
        type = "text/javascript";
        break;
      case ".css":
        type = "text/css";
        break;
      case ".png":
        type = "image/png";
        break;
      case ".txt":
        type = "text/plain";
        break;
      default:
        type = "application/octet-stream";
        break;
    }
    res.set("Content-Type", type);
  },
}));

// ファイルが存在しない場合のエラー処理
app.use((req, res) => {
  res.status(404).type("text/plain").send("File not found");
});

// メインモジュールとして実行された場合のみサーバーを起動
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.argv[3] || 8000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

// ESモジュールのエクスポート
export default app;