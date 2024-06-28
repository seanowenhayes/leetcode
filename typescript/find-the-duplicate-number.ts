// https://leetcode.com/problems/find-the-duplicate-number

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function findDuplicate(nums: number[]): number {
  const found: Set<number> = new Set();
  const numLength = nums.length;
  for (let i = 0; i < numLength; i++) {
    const num = nums[i];
    if (found.has(num)) {
      return num;
    }
    found.add(num);
  }
  return NaN;
}

Deno.test("[1,3,4,2,2] => 2", () => {
  const input = [1, 3, 4, 2, 2];
  const output = findDuplicate(input);
  assertEquals(output, 2);
});
