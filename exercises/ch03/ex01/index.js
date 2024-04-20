// 正負の  Infinity と NaN で +, -, \*, / の計算を全ての組み合わせでして結果を見なさい。
console.log("1: " + JSON.stringify(Infinity + NaN));
console.log("2: " + JSON.stringify(Infinity - NaN));
console.log("3: " + JSON.stringify(Infinity * NaN));
console.log("4: " + JSON.stringify(Infinity / NaN));
console.log("5: " + JSON.stringify(-Infinity + NaN));
console.log("6: " + JSON.stringify(-Infinity - NaN));
console.log("7: " + JSON.stringify(-Infinity * NaN));
console.log("8: " + JSON.stringify(-Infinity / NaN));