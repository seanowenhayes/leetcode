import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type HashMap = {
    [key: number]: number[] | null;
};

function howSum(
    targetSum: number,
    numbers: number[],
    memo: HashMap = { 0: [] },
): number[] | null {
    if (targetSum in memo) {
        return memo[targetSum];
    }
    for (const num of numbers) {
        const remainder = targetSum - num;
        if (remainder >= 0) {
            const answer = howSum(remainder, numbers, memo);
            if (answer !== null) {
                answer.push(num);
                memo[remainder] = answer;
                return answer;
            }
        }
    }
    memo[targetSum] = null;
    return null;
}

Deno.test("[5,4,3,7], 7 => [7] | [3,4]", () => {
    const target = 7;
    const nums = [5, 4, 3, 7];
    const output = howSum(target, nums);
    assertEquals(output, [3, 4]);
});
