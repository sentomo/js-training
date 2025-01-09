# 複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか
* client.jsを作成し、その中で10000接続をしたところ、以下のエラーが発生した。
```
クライアント5000でエラーが発生しました: Error: connect EAGAIN ::1:8080 - Local (:::0)
    at internalConnect (node:net:1100:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:462:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1381:9)
    at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:109:8) {
  errno: -35,
  code: 'EAGAIN',
  syscall: 'connect',
  address: '::1',
  port: 8080
}
```

# 接続を確立できなかった理由
* エラーコードが'EAGAIN'になっている。プロセスの過多や一時的なメモリ不足が原因と見られる。