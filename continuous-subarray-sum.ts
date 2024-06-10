// https://leetcode.com/problems/continuous-subarray-sum

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function checkSubarraySum(nums: number[], k: number): boolean {
  function numIsAMultipleOfK(num: number): boolean {
    return num === 0 || num % k === 0;
  }
  for (let i = 0; i < nums.length; i++) {
    let runningTotal = 0;
    let subArrayLength = 1;
    for (let j = i; j < nums.length; j++) {
      const num = nums[j];
      runningTotal += num;
      if (subArrayLength > 1 && numIsAMultipleOfK(runningTotal)) {
        return true;
      }
      subArrayLength++;
    }
  }
  return false;
}

Deno.test("[5,0,0,0] k: 3 => true", () => {
  const input = [5, 0, 0, 0];
  const k = 3;
  const output = checkSubarraySum(input, k);
  assertEquals(output, true);
});

Deno.test("[0,0] k:1 => true", () => {
  const input = [0, 0];
  const k = 1;
  const output = checkSubarraySum(input, k);
  assertEquals(output, true);
});

Deno.test("[1,0] k:2 => false", () => {
  const input = [1, 0];
  const k = 2;
  const output = checkSubarraySum(input, k);
  assertEquals(output, false);
});

Deno.test("[23,2,4,6,6] k = 7", () => {
  const input = [23, 2, 4, 6, 6];
  const k = 7;
  const output = checkSubarraySum(input, k);
  assertEquals(output, true);
});

Deno.test("[0]", () => {
  const input = [0];
  const k = 1;
  const output = checkSubarraySum(input, k);
  assertEquals(output, false);
});

Deno.test("[23,2,4,6,7]", () => {
  const input = [23, 2, 4, 6, 7];
  const k = 6;
  const output = checkSubarraySum(input, k);
  assertEquals(output, true);
});

Deno.test("[23,2,6,4,7]", () => {
  const input = [23, 2, 6, 4, 7];
  const k = 6;
  const output = checkSubarraySum(input, k);
  assertEquals(output, true);
});

Deno.test("[23,2,6,4,7]", () => {
  const input = [23, 2, 6, 4, 7];
  const k = 13;
  const output = checkSubarraySum(input, k);
  assertEquals(output, false);
});
