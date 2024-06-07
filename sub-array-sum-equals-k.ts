// https://leetcode.com/problems/subarray-sum-equals-k

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function subarraySum(nums: number[], k: number): number {
  const numLength = nums.length;
  let subArrayCount = 0;
  for (let numsIndex = 0; numsIndex < numLength; numsIndex++) {
    const num = nums[numsIndex];
    if (num === k) {
      subArrayCount += 1;
    }
    let scanBackSum = num;
    for (
      let scanBackIndex = numsIndex - 1;
      scanBackIndex >= 0;
      scanBackIndex--
    ) {
      const seenNumber = nums[scanBackIndex];
      scanBackSum += seenNumber;
      if (scanBackSum === k) {
        subArrayCount++;
      }
    }
  }
  return subArrayCount;
}

Deno.test("[0,0,0,0,0,0,0,0,0,0]", () => {
  const input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const k = 0;
  const output = subarraySum(input, k);
  assertEquals(output, 55);
});

Deno.test("[1,-1,0]", () => {
  const input = [1, -1, 0];
  const k = 0;
  const output = subarraySum(input, k);
  assertEquals(output, 3);
});

Deno.test("[-1,-1,1]", () => {
  const input = [-1, -1, 1];
  const k = 0;
  const output = subarraySum(input, k);
  assertEquals(output, 1);
});

Deno.test("[1,1,1] 2", () => {
  const input = [1, 1, 1];
  const k = 2;
  const output = subarraySum(input, k);
  assertEquals(output, 2);
});

Deno.test("[1,2,3] => 2", () => {
  const input = [1, 2, 3];
  const k = 3;
  const output = subarraySum(input, k);
  assertEquals(output, 2);
});
