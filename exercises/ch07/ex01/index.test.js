import { addMatrices, multiplyMatrices } from "./index.js";

describe("accessor　property test", () => {
  it("行列の加算の正常テスト", () => {
    const matrix1 = [[1, 2],[1, -3]];
    const matrix2 = [[-2, 0],[1, 2]];

    const expected = [[-1, 2],[2, -1]];
    expect(JSON.stringify(addMatrices(matrix1, matrix2))).toBe(JSON.stringify(expected));
  });

  it("サイズが異なる行列をaddMatrices関数に渡した時、エラーが発生する", () => {
    expect(() => {
      const matrix1 = [[1, 2],[1, -3]];
      const matrix2 = [[-2, 0],[1, 2], [3, 4]];
      addMatrices(matrix1, matrix2);
    }).toThrow("It is not possible to add matrices of different shapes.");
  });

  it("行列の乗算の正常テスト", () => {
    const matrix1 = [[1, 3],[2, -1], [-1, 1]];
    const matrix2 = [[2, 1, 0],[-1, 4, 2]];

    const expected = [[-1, 13, 6],[5, -2, -2],[-3, 3, 2]];
    expect(JSON.stringify(multiplyMatrices(matrix1, matrix2))).toBe(JSON.stringify(expected));
  });

  it("matrix1の列数とmatrix2の行数が等しくない場合、multiplyMatrices関数を実行した時にエラーが発生する", () => {
    expect(() => {
      const matrix1 = [[1, 2, 3],[1, -3, 0]]; // 2行"3列"
      const matrix2 = [[-2, 0, 1],[1, 2, 4]]; // "2行"3列
      multiplyMatrices(matrix1, matrix2);
    }).toThrow("If the number of columns of matrix1 is not equal to the number of rows of matrix2, the matrices cannot be multiplied.");
  });
});
