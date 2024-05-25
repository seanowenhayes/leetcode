import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

function combos(arrayLength: number): number[][] {
  const results: number[][] = [];
  const used: boolean[] = new Array(arrayLength).fill(false);

  function permute(current: number[], startIndex: number) {
    if (current.length === 3) {
      results.push([...current]); // Copy current array to avoid mutation
      return;
    }

    for (let i = startIndex; i < arrayLength; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(i);
        permute(current, i + 1); // Start from next index to avoid duplicates
        current.pop();
        used[i] = false;
      }
    }
  }

  permute([], 0);
  return results;
}

function threeSum(nums: number[]): number[][] {
  const combinations = combos(nums.length);
  const resultMap: Map<string, number[]> = new Map();
  combinations.forEach(([first, second, third]) => {
    const firstNumber = nums[first];
    const secondNumber = nums[second];
    const thirdNumber = nums[third];
    if (firstNumber + secondNumber + thirdNumber === 0) {
      const entry = [firstNumber, secondNumber, thirdNumber].sort();
      resultMap.set(entry.join(), entry);
    }
  });
  return Array.from(resultMap.values());
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
