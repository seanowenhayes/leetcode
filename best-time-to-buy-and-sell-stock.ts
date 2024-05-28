import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let lowestPrice = Number.MAX_VALUE;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    const profit = price - lowestPrice;
    maxProfit = Math.max(profit, maxProfit);
    lowestPrice = Math.min(lowestPrice, price);
  }
  return maxProfit;
}

Deno.test("[7,1,5,3,6,4]", () => {
  const profit = maxProfit([7, 1, 5, 3, 6, 4]);
  assertEquals(profit, 5);
});

Deno.test("[7,6,4,3,1]", () => {
  const profit = maxProfit([7, 6, 4, 3, 1]);
  assertEquals(profit, 0);
});
