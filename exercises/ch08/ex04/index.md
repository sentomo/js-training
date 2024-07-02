# 予想
false, true
false, true

# 実行結果
false, true
true, false

# 結果の説明
アロー関数では、関数が定義された環境のthisキーワードの値を継承する。(p.204参照)
nmメソッドのconsole.logでは、nmメソッドを呼び出したオブジェクト即ちnestオブジェクトがthisになる。
arrowメソッドのconsole.logでは、arrowメソッドを呼び出した時点のthisはobjになり、arrowメソッドはアロー関数であるため、thisを継承してthis === objがtrueになる。