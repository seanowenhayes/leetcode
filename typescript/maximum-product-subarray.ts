import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

const cache = new Map<string, number>();
function productOfArray(nums: number[]): number {
  const key = nums.join();
  if (cache.has(key)) {
    return cache.get(key)!;
  }
  const result = nums.reduce((total, current) => total * current, 1);
  cache.set(key, result);
  return result;
}

function maxProduct(nums: number[]): number {
  let max = nums[0];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      const subArray = nums.slice(i, j + 1);
      const product = productOfArray(subArray);
      if (product > max) {
        max = product;
      }
    }
  }
  return max;
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
