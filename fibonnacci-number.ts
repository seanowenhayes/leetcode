// https://leetcode.com/problems/fibonacci-number/description/

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type HashMap = {
    [key: number]: number;
};

function fib(num: number, memo: HashMap = {}): number {
    if (num < 1) {
        return 0;
    }
    if (num <= 2) {
        return 1;
    }
    if (num in memo) {
        return memo[num];
    }
    return fib(num - 1, memo) + fib(num - 2, memo);
}

Deno.test("fib 2 => 1", () => {
    const input = 2;
    const output = fib(input);
    assertEquals(output, 1);
});

Deno.test("fib 3 => 2", () => {
    const input = 3;
    const output = fib(input);
    assertEquals(output, 2);
});

Deno.test("fib 4 => 3", () => {
    const input = 4;
    const output = fib(input);
    assertEquals(output, 3);
});
