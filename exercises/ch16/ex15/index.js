const { Worker, isMainThread, parentPort } = require("worker_threads");

let num = 0;  // sharedArray を number 型の変数 num に変更

if (isMainThread) {
  // メインスレッドの処理
  const worker = new Worker(__filename);

  worker.on("online", () => {
    // メインスレッドでのインクリメント処理
    for (let i = 0; i < 10_000_000; i++) {
      num++;  // Atomic.add の代わりに num をインクリメント
    }
    console.log(`メインスレッドのインクリメント完了: num = ${num}`);
  });

  // サブスレッドからのメッセージを受信して num をインクリメント
  worker.on("message", (message) => {
    if (message === "num をインクリメントせよ") {
      num++;  // サブスレッドからのメッセージを受信したら num をインクリメント
      console.log(`サブスレッドからのメッセージを受信: num = ${num}`);
    }
  });
} else {
  // サブスレッドの処理
  for (let i = 0; i < 10_000_000; i++) {
    parentPort.postMessage("num をインクリメントせよ");  // メインスレッドに「num をインクリメントせよ」というメッセージを送る
  }

  // サブスレッド終了後にメッセージを送信して完了を通知する
  parentPort.postMessage("done");
}
