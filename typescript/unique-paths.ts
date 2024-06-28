// https://leetcode.com/problems/unique-paths/

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type HashMap = {
    [key: string]: number;
};

function uniquePaths(m: number, n: number, memo: HashMap = {}): number {
    // not really a grid is it. Maybe if you believe in string theory but not here...
    if (m === 0 || n === 0) {
        return 0;
    }
    // We arrived
    if (m === 1 && n == 1) {
        return 1;
    }
    const key1 = `${m}:${n}`;
    const key2 = `${n}:${m}`;
    if (key1 in memo) {
        return memo[key1];
    }
    if (key2 in memo) {
        return memo[key2];
    }

    const result = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
    memo[key1] = result;
    return result;
}

Deno.test("3 x 2 => 3", () => {
    const m = 3;
    const n = 2;
    const output = uniquePaths(m, n);
    assertEquals(output, 3);
});

Deno.test("3 x 7 => 28", () => {
    const m = 3;
    const n = 7;
    const output = uniquePaths(m, n);
    assertEquals(output, 28);
});
