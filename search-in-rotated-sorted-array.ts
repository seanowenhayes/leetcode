import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function search(nums: number[], target: number): number {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;

  function searchLeftOf(middle: number) {
    rightPointer = middle - 1;
  }
  function searchRightOf(middle: number) {
    leftPointer = middle + 1;
  }

  while (leftPointer <= rightPointer) {
    const middle = Math.floor((rightPointer - leftPointer) / 2) + leftPointer;
    const searchValue = nums[middle];
    if (target === searchValue) {
      return middle;
    }
    const leftValue = nums[leftPointer];
    const rightValue = nums[rightPointer];
    const sortedLeft = leftValue <= searchValue;
    if (sortedLeft) {
      if (leftValue <= target && target < searchValue) {
        searchLeftOf(middle);
      } else {
        // It must be down the right...
        searchRightOf(middle);
      }
    } else {
      // It must be sorted right now
      if (rightValue >= target && target > searchValue) {
        searchRightOf(middle);
      } else {
        // Must be down the left if it's here at all
        searchLeftOf(middle);
      }
    }
  }
  return -1;
}

Deno.test("[3,1] target = 1 => 1", () => {
  const rotatedArray = [3, 1];
  const target = 1;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 1);
});

Deno.test("[5,1,2,3,4] target 1 => 1", () => {
  const rotatedArray = [5, 1, 2, 3, 4];
  const target = 1;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 1);
});

Deno.test("[4,5,6,7,0,1,2] target 5 => 1", () => {
  // left 4, right 2, search 7, target 5
  const rotatedArray = [4, 5, 6, 7, 0, 1, 2];
  const target = 5;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 1);
});

Deno.test("[4,5,6,7,8,1,2,3] target => 4", () => {
  const rotatedArray = [4, 5, 6, 7, 8, 1, 2, 3];
  const target = 8;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 4);
});

Deno.test("[8,1,2,3] target 8 => 0", () => {
  const rotatedArray = [8, 1, 2, 3];
  const target = 8;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 0);
});

Deno.test("[0,1,2] target 0 => 0", () => {
  const rotatedArray = [0, 1, 2];
  const target = 0;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 0);
});

Deno.test("[4,5,6,7,0,1,2] target 0 => 4", () => {
  const rotatedArray = [4, 5, 6, 7, 0, 1, 2];
  const target = 0;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 4);
});

Deno.test("[1,3]", () => {
  const rotatedArray = [1, 3];
  const target = 3;
  const foundIndex = search(rotatedArray, target);
  assertEquals(foundIndex, 1);
});
