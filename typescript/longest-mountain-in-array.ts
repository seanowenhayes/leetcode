// https://leetcode.com/problems/longest-mountain-in-array

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function longestMountain(arr: number[]): number {
    let longest = 0;
    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            let left = i - 1;
            let right = i + 1;
            while (left > 0 && arr[left] > arr[left - 1]) {
                left--;
            }
            while (right < arr.length - 1 && arr[right] > arr[right + 1]) {
                right++;
            }
            longest = Math.max(longest, right - left + 1);
        }
    }
    return longest;
};

Deno.test("longestMountain([2,1,4,7,3,2,5]) => 5", () => {
    assertEquals(
        longestMountain([2, 1, 4, 7, 3, 2, 5]),
        5,
    );
});

Deno.test("longestMountain([2,2,2]) => 0", () => {
    assertEquals(
        longestMountain([2, 2, 2]),
        0,
    );
});