console.log("𠮷野家"[0]); // �。文字化けした
console.log("𠮷野家"[1]); // �。文字化けした
console.log("𠮷野家"[2]); // 野。
console.log("𠮷野家"[3]); // 家。

https://tanishiking24.hatenablog.com/entry/2017/05/29/100000 によると、array.lengthだとUnicode単位ではなく、UTF-16単位での分割になる。
そのため、文字列のindexを指定するとUTF-16で分割した時の要素が返る。

👨‍👨‍👧‍👧も同様。
console.log("👨‍👨‍👧‍👧"[0]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[1]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[2]); // 空文字
console.log("👨‍👨‍👧‍👧"[3]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[4]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[5]); // 空文字
console.log("👨‍👨‍👧‍👧"[6]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[7]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[8]); // 空文字
console.log("👨‍👨‍👧‍👧"[9]); // �。文字化けした
console.log("👨‍👨‍👧‍👧"[10]); // �。文字化けした