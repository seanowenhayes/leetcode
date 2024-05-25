import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

/**
 * Checks if a given number is present in the sorted array.
 *
 * @param {number[]} array - The sorted array to search in.
 * @param {number} num - The number to search for.
 * @return {boolean} Returns true if the number is found in the array, false otherwise.
 */
function arrayContainsNumber(array: number[], num: number): boolean {
  // TODO: Maybe do this later as an optimisation using binary search
  return array.includes(num);
}

function threeSum(nums: number[]): number[][] {
  const sortedArray = nums.sort((a, b) => a - b);
  // This pointer will start at the smalles numbers and move toward the positive larger end
  let basePointer = 0;
  // This pointer runs up in front of the base pointer finding numbers to compare
  let runningPointer = 1;
  // We only run until the penultimate element.
  let runningPointerEnd = sortedArray.length - 1;

  const threeSumsMap: Map<string, Array<number>> = new Map();

  while (sortedArray[basePointer] < 1) {
    const baseNumber = sortedArray[basePointer];
    for (runningPointer; runningPointer < runningPointerEnd; runningPointer++) {
      const searchArray = sortedArray.slice(runningPointer + 1);
      const runningNumber = sortedArray[runningPointer];

      const numberToFind = 0 - (baseNumber + runningNumber);
      if (arrayContainsNumber(searchArray, numberToFind)) {
        const toAdd = [baseNumber, runningNumber, numberToFind].sort((a, b) =>
          a - b
        );
        threeSumsMap.set(toAdd.join(), toAdd);
      }
    }
    basePointer++;
    runningPointer = basePointer + 1;
  }
  return Array.from(threeSumsMap.values());
}

Deno.test("[-1,0,1,2,-1,-4]", () => {
  const result = threeSum([-1, 0, 1, 2, -1, -4]);
  assertEquals(result.length, 2);
  assertArrayIncludes(result, [[-1, -1, 2]]);
  assertArrayIncludes(result, [[-1, 0, 1]]);
});

Deno.test("[0,0,0]", () => {
  const result = threeSum([0, 0, 0]);
  assertEquals(result, [[0, 0, 0]]);
});
Deno.test("[0,0,1]", () => {
  const result = threeSum([0, 0, 1]);
  assertEquals(result, []);
});
