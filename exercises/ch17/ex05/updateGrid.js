import { ROWS, COLS } from "./constants.js";

export function updateGrid(grid) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let liveNeighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const x = row + i;
          const y = col + j;
          if (x >= 0 && x < ROWS && y >= 0 && y < COLS && grid[x][y]) {
            liveNeighbors++;
          }
        }
      }

      if (grid[row][col] && (liveNeighbors < 2 || liveNeighbors > 3)) {
        nextGrid[row][col] = false;
      } else if (!grid[row][col] && liveNeighbors === 3) {
        nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid;
}