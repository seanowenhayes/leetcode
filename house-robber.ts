import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function rob(nums: number[]): number {
  return 99;
}

Deno.test("[1, 2, 3, 1]", () => {
  const input = [1, 2, 3, 1];
  const output = rob(input);
  assertEquals(output, 4);
});

Deno.test("[2,7,9,3,1]", () => {
  const input = [2, 7, 9, 3, 1];
  const output = rob(input);
  assertEquals(output, 12);
});
