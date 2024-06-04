// 行列の演算について：https://www.momoyama-usagi.com/entry/math-linear-algebra00

export function addMatrices(matrix1, matrix2) {
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
    throw new Error("It is not possible to add matrices of different shapes.");
  }

  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      result[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }
  return result;
}

export function multiplyMatrices(matrix1, matrix2) {
  if (matrix1[0].length !== matrix2.length) { // 行列1の列数と行列2の行数が等しくない場合
    throw new Error("If the number of columns of matrix1 is not equal to the number of rows of matrix2, the matrices cannot be multiplied.");
  }

  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}