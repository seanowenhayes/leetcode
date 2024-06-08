import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function rob(nums: number[]): number {
  if (nums.length < 3) {
    return Math.max(...nums);
  }
  let maxHaul = 0;
  let midPointer = 1;
  while (midPointer < nums.length + 1) {
    const leftPointer = midPointer - 1;
    const rightPointer = midPointer + 1;
    const numLeft = nums[leftPointer] ?? 0;
    const numMid = nums[midPointer] ?? 0;
    const numRight = nums[rightPointer] ?? 0;
    const middle = numMid >= numLeft + numRight;
    if (middle) {
      maxHaul += numMid;
      midPointer += 3;
    } else {
      maxHaul += numLeft;
      maxHaul += numRight;
      midPointer += 4;
    }
  }
  return maxHaul;
}

Deno.test("[1,1,1,2]", () => {
  const input = [1, 1, 1, 2];
  const output = rob(input);
  assertEquals(output, 1 + 2);
});

Deno.test("[1,2,1,1]", () => {
  const input = [1, 2, 1, 1];
  const output = rob(input);
  assertEquals(output, 2 + 1);
});

Deno.test("[2,3,2]", () => {
  const input = [2, 3, 2];
  const output = rob(input);
  assertEquals(output, 2 + 2);
});

Deno.test("[1, 2, 3, 1]", () => {
  const input = [1, 2, 3, 1];
  const output = rob(input);
  assertEquals(output, 1 + 3);
});

Deno.test("[2,7,9,3,1]", () => {
  const input = [2, 7, 9, 3, 1];
  const output = rob(input);
  assertEquals(output, 2 + 9 + 1);
});

Deno.test("[1, 99, 1, 1, 99, 7]", () => {
  const input = [1, 99, 1, 1, 99, 7];
  const output = rob(input);
  assertEquals(output, 99 + 99);
});
