import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function maxArea(height: number[]): number {
  let maxArea = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      const leftHeight = height[left];
      const rightHeight = height[right];
      const distance = right - left;
      const minHeight = Math.min(leftHeight, rightHeight);
      const area = minHeight * distance;
      maxArea = Math.max(area, maxArea);
    }
  }
  return maxArea;
}

Deno.test("[1,8,6,2,5,4,8,3,7] => 49", () => {
  const input = [1, 8, 6, 2, 5, 4, 8, 3, 7];
  const output = maxArea(input);
  assertEquals(output, 49);
});

Deno.test("[1,1]", () => {
  const input = [1, 1];
  const output = maxArea([1, 1]);
  assertEquals(output, 1);
});
