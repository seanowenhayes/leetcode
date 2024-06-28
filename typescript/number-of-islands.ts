// https://leetcode.com/problems/number-of-islands/

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type Cell = {
  row: number;
  column: number;
};

const islandMarker = "1";
const discoveredLandMarker = "X";

function numIslands(grid: string[][]): number {
  let islandCount = 0;
  function spreadIsland({ row, column }: Cell) {
    if (grid[row][column] !== islandMarker) {
      throw new Error(
        `Spread island alled on "${
          grid[row][column]
        } which is not an "${islandMarker} as row: ${row}, column: ${column}"`,
      );
    }
    grid[row][column] = discoveredLandMarker;
    // Above
    if (grid[row - 1]?.[column] === islandMarker) {
      spreadIsland({ row: row - 1, column });
    }
    // Below
    if (grid[row + 1]?.[column] === islandMarker) {
      spreadIsland({ row: row + 1, column });
    }
    // left
    if (grid[row][column - 1] === islandMarker) {
      spreadIsland({ row, column: column - 1 });
    }
    //right
    if (grid[row][column + 1] === islandMarker) {
      spreadIsland({ row, column: column + 1 });
    }
  }
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      if (cell === islandMarker) {
        islandCount += 1;
        spreadIsland({ row: rowIndex, column: columnIndex });
      }
    }
  }
  return islandCount;
}

Deno.test('[["1","1"]]', () => {
  const islandMap = [["1", "1"]];
  const numberOfIslands = numIslands(islandMap);
  assertEquals(numberOfIslands, 1);
});

Deno.test("A single large island", () => {
  const islandMap = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ];
  const numberOfIslands = numIslands(islandMap);
  assertEquals(numberOfIslands, 1);
});

Deno.test("A number of smaller islands", () => {
  const islandMap = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ];
  const numberOfIslands = numIslands(islandMap);
  assertEquals(numberOfIslands, 3);
});
