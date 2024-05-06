let arr = ["r", "i", "c", "o", "h"];
delete arr[3]; // "o" の要素を削除
console.log(arr); // [ 'r', 'i', 'c', <1 empty item>, 'h' ]
console.log(arr.length); // 5