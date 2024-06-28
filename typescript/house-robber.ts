import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function rob(nums: number[]): number {
  let robEven = 0;
  let robOdd = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i % 2 == 0) {
      robEven = Math.max(robEven + nums[i], robOdd);
    } else {
      robOdd = Math.max(robOdd + nums[i], robEven);
    }
  }

  return Math.max(robEven, robOdd);
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
