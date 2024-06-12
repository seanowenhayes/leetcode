// https://leetcode.com/problems/longest-increasing-subsequence

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function lengthOfLIS(nums: number[]): number {
  const increasingSequences: Array<Array<number>> = [];
  increasingSequences.push([nums.shift()!]);
  const numsLength = nums.length;
  let maxLength = 1;
  for (let i = 0; i < numsLength; i++) {
    const num = nums[i];
    increasingSequences.forEach((increasingSequence) => {
      let lastNum: number | undefined =
        increasingSequence[increasingSequence.length - 1]!;
      if (num > lastNum) {
        increasingSequence.push(num);
        maxLength = Math.max(
          maxLength,
          increasingSequence.length,
        );
      } else {
        const newSequence = [...increasingSequence];
        while (
          newSequence.length &&
          newSequence[newSequence.length - 1]! >= num
        ) {
          newSequence.pop();
        }
        lastNum = num;
        newSequence.push(num);
        increasingSequences.push(newSequence);
      }
    });
  }
  return maxLength;
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
