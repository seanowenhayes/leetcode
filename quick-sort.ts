import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function quickSort(
  array: number[],
): number[] {
  if (array.length < 2) {
    return array;
  }
  const [pivot, ...rest] = array;
  const left: number[] = [];
  const right: number[] = [];
  rest.forEach((num) => num > pivot ? right.push(num) : left.push(num));
  return [...quickSort(left), pivot, ...quickSort(right)];
}

Deno.test("Should just give back an array given a sorted array", () => {
  const input = [1, 2, 3];
  const output = quickSort(input);
  assertEquals(output, [1, 2, 3]);
});

Deno.test("Should sort an array given an unsorted array", () => {
  const input = [3, 2, 1];
  const output = quickSort(input);
  assertEquals(output, [1, 2, 3]);
});

Deno.test("Should sort an array given a longer unsorted array", () => {
  const input = [23, 43, 67, 87, 99, 44, 7, 909987, 234, 374957, 0];
  const output = quickSort(input);
  assertEquals(output, [0, 7, 23, 43, 44, 67, 87, 99, 234, 374957, 909987]);
});

Deno.test("should not choke on an empty array", () => {
  const input: number[] = [];
  const output = quickSort(input);
  assertEquals(output, []);
});

Deno.test("should return same given an array with one element", () => {
  const input = [7];
  const output = quickSort(input);
  assertEquals(output, [7]);
});

Deno.test("should sort negative numbers", () => {
  const input = [-1, -99, -2, -300, -4];
  const output = quickSort(input);
  assertEquals(output, [-300, -99, -4, -2, -1]);
});
