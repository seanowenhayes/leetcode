// https://leetcode.com/problems/subarray-sum-equals-k

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function subarraySum(nums: number[], k: number): number {
  return 99;
}

Deno.test("[1,1,1] 2", () => {
  const input = [1, 1, 1];
  const k = 2;
  const output = subarraySum(input, k);
  assertEquals(output, 2);
});

Deno.test("[1,2,3] => 2", () => {
  const input = [1, 2, 3];
  const k = 2;
  const output = subarraySum(input, k);
  assertEquals(output, 2);
});
