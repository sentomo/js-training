export const printAndReturnArray = (n, c) => {
  if(!(typeof n === "number") || n < 1) return;
  const regex = /^[a-zA-Z0-9]+$/;
  if(!regex.test(c)) return;

  let array = [];
  
  for (let i = 0; i < n; i++) {
    console.log(c);
    array.push(c);
  }

  return array;
};

export const square = x => x * x; // 引数1つの時は丸括弧を省略できる。関数本体がreturn文だけの場合はreturnキーワードとセミコロン、中括弧を省略できる

export const getCurrentTimeObject = () => ({ now: new Date() }); // 引数なしの時は丸括弧を省略しない。オブジェクトリテラルが戻り値のときはオブジェクトリテラルを丸括弧で囲む。