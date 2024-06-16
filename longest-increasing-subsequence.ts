// https://leetcode.com/problems/longest-increasing-subsequence

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function lengthOfLIS(nums: number[]): number {
  const longestSequence = [];

  longestSequence.push(nums[0]);

  const numsLength = nums.length;

  for (let i = 1; i < numsLength; i++) {
    const num = nums[i];
    if (num > longestSequence[longestSequence.length - 1]) {
      longestSequence.push(num);
    } else {
      const low = longestSequence.findIndex((el) => el >= num);
      longestSequence[low] = num;
    }
  }

  return longestSequence.length;
}

Deno.test("[4,10,4,3,8,9] => 3", () => {
  const input = [4, 10, 4, 3, 8, 9];
  const output = lengthOfLIS(input);
  assertEquals(output, 3);
});

Deno.test("[10,9,2,5,3,4] => 3", () => {
  const input = [10, 9, 2, 5, 3, 4];
  const output = lengthOfLIS(input);
  assertEquals(output, 3);
});

Deno.test("[1,3,6,7,9,4,10,5,6] => 6", () => {
  const input = [1, 3, 6, 7, 9, 4, 10, 5, 6];
  const output = lengthOfLIS(input);
  assertEquals(output, 6);
});

Deno.test("[10,9,2,5,3,7,101,18] => 4", () => {
  const input = [10, 9, 2, 5, 3, 7, 101, 18];
  const output = lengthOfLIS(input);
  // Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
  assertEquals(output, 4);
});

Deno.test("[0,1,0,3,2,3] => 4", () => {
  const input = [0, 1, 0, 3, 2, 3];
  const output = lengthOfLIS(input);
  assertEquals(output, 4);
});

Deno.test("[7,7,7,7,7,7] => 1", () => {
  const input = [7, 7, 7, 7, 7, 7];
  const output = lengthOfLIS(input);
  assertEquals(output, 1);
});
