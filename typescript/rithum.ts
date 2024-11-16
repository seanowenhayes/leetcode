import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function numberToUniqueStringArray(num: number): string[] {
    return Array.from(
        new Set(`${num}`.split("")),
    );
}

function calcualate(nums: number[]): number {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const iUnique = numberToUniqueStringArray(num);

        if (iUnique.length > 2) {
            continue;
        }
        const [iFirst, iSecond] = iUnique;
        let count = 0;

        for (let j = 0; j < nums.length; j++) {
            const num2 = nums[j];
            const jUnique = numberToUniqueStringArray(num2);
            if (jUnique.length > 2) {
                continue;
            }

            if (iSecond !== undefined) {
                if (jUnique.includes(iFirst) && jUnique.includes(iSecond)) {
                    count += 1;
                }
            } else {
                if (jUnique.includes(iFirst) && jUnique.length === 1) {
                    count += 1;
                }
            }
        }
        max = Math.max(max, count);
    }
    return max;
}

Deno.test("should be four", () => {
    const input = [23, 333, 33, 30, 0, 505];
    const output = calcualate(input);
    assertEquals(output, 4);
});
