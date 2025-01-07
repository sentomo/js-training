import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// 再起動ロジックを実装
async function monitorChild() {
  try{
    while (true) {
      const [code, signal] = await startChild();

      if (signal) {
        console.log(`Child process exited due to signal: ${signal}`);
        break; // シグナルを受けて終了した場合、ループを抜ける
      }

      if (code !== 0) {
        console.log(`Child process exited with code: ${code}. Restarting...`); // 異常コードの時はループを抜けずに次のループでstartChild()を実行
      } else {
        console.log("Child process exited normally.");
        break; // 正常終了の場合、ループを抜ける
      }
    }
  } catch (error) {
    console.log("Error in monitoring child process:", error);
  }
}

// シグナルハンドラーの登録
// SIGINT: プロセスへの割り込み命令を送る。Ctrl + Cを押下すると送信される。
// SIGTERM: プロセスに停止命令を送る時に使う。
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => {
    console.log(`Received ${signal}. Forwarding to child process.`);
    if (child) {
      child.kill(signal); // 子プロセスにシグナルを送信
    }

    // 子プロセスの終了を待ってから自身も終了
    child.on("close", () => {
      console.log(`Child process terminated with ${signal}. Exiting.`);
      process.exit(0);
    });
  });
});

// モニタリングを開始
monitorChild();