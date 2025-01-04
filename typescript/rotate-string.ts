// https://leetcode.com/problems/rotate-string/

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function rotateString(s: string, goal: string): boolean {
    const rotations = s.length;
    for (let i = 0; i < rotations; i++) {
        const rotated = s.slice(i) + s.slice(0, i);
        if (rotated === goal) {
            return true;
        }
    }
    return false;
};

Deno.test("rotateString('abcde', 'cdeab') => true", () => {
    assertEquals(
        rotateString("abcde", "cdeab"),
        true,
    );
});