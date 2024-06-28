import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type HashMap = {
    [key: number]: boolean;
};

function canSum(
    targetSum: number,
    numbers: number[],
    memo: HashMap = {},
): boolean {
    if (targetSum === 0) {
        return true;
    }
    if (targetSum in memo) {
        return memo[targetSum];
    }
    for (const num of numbers) {
        const remainder = targetSum - num;
        if (remainder >= 0 && canSum(remainder, numbers, memo)) {
            memo[targetSum] = true;
            return true;
        }
    }
    memo[targetSum] = false;
    return false;
}

Deno.test("[2,3], 4 => true", () => {
    const numbers = [2, 2];
    const target = 4;
    const output = canSum(target, numbers);
    assertEquals(output, true);
});
