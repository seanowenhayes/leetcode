// https://leetcode.com/problems/product-of-array-except-self

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function productExceptSelf(nums: number[]): number[] {
  let currentProduct = 1;
  const output: number[] = [];
  const numLength = nums.length;

  //   left to right scan
  for (let i = 0; i < numLength; i++) {
    currentProduct *= nums[i];
    output.push(currentProduct);
  }

  // right to left scan
  const lastIndex = numLength - 1;
  for (let i = lastIndex; i >= 0; i--) {
    if (i === lastIndex) {
      // special case last element - product left
      output[lastIndex] = output[lastIndex - 1];
      currentProduct = nums[lastIndex];
    } else if (i === 0) {
      // special case first element - product right
      output[0] = currentProduct;
    } else {
      // normal case product - product left * product right
      output[i] = output[i - 1] * currentProduct;
      currentProduct = currentProduct * nums[i]; // wrong
    }
  }

  return output;
}

Deno.test("[1,2,3,4]", () => {
  const input = [1, 2, 3, 4];
  const output = productExceptSelf(input);
  assertEquals(output, [24, 12, 8, 6]);
});

Deno.test("[-1,1,0,-3,3]", () => {
  const input = [-1, 1, 0, -3, 3];
  const output = productExceptSelf(input);
  assertEquals(output, [0, 0, 9, 0, 0]);
});
