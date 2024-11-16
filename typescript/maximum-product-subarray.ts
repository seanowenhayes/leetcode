import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function maxProduct(nums: number[]): number {
  function productOfArray(nums: number[]): number {
    return nums.reduce((total, current) => total * current, 1);
  }
  if (nums.length < 2) {
    return nums[0];
  }
  let negativeCount = 0;
  let firstNegativeIndex = -1;
  let lastNegativeIndex = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      negativeCount++;
      if (firstNegativeIndex === -1) {
        firstNegativeIndex = i;
      }
      lastNegativeIndex = i;
    }
  }
  if (negativeCount % 2 === 0) {
    return productOfArray(nums);
  }
  const subArrayBeforeFirstNegative = nums.slice(0, firstNegativeIndex);
  const subArrayAfterFirstNegative = nums.slice(firstNegativeIndex + 1);
  const subarrayBeforeLastNegative = nums.slice(0, lastNegativeIndex);
  const subarrayAfterLastNegative = nums.slice(lastNegativeIndex + 1);
  return Math.max(
    productOfArray(subArrayBeforeFirstNegative),
    productOfArray(subArrayAfterFirstNegative),
    productOfArray(subarrayBeforeLastNegative),
    productOfArray(subarrayAfterLastNegative),
  );
}

Deno.test("[2,3,-2,4] => 6", () => {
  const input = [2, 3, -2, 4];
  const output = maxProduct(input);
  assertEquals(output, 6);
});

Deno.test("[-2,0,-1] => 0", () => {
  const input = [-2, 0, -1];
  const output = maxProduct(input);
  assertEquals(output, 0);
});

Deno.test("[-2] => -2", () => {
  const input = [-2];
  const output = maxProduct(input);
  assertEquals(output, -2);
});

Deno.test("[-2,3,-4] => 24", () => {
  const input = [-2, 3, -4];
  const output = maxProduct(input);
  assertEquals(output, 24);
});

Deno.test("[0,2] => 2", () => {
  const input = [0, 2];
  const output = maxProduct(input);
  assertEquals(output, 2);
});
