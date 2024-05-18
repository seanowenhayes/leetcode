import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function merge(left: number[], right: number[]): number[] {
  const sorted: number[] = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      sorted.push(left.shift() as number);
    } else {
      sorted.push(right.shift() as number);
    }
  }
  return [...sorted, ...left, ...right];
}

function mergeSort<T>(array: number[]): number[] {
  // bottom out
  if (array.length < 2) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

Deno.test("Should just give back an array given a sorted array", () => {
  const input = [1, 2, 3];
  const output = mergeSort(input);
  assertEquals(output, [1, 2, 3]);
});

Deno.test("Should sort an array given an unsorted array", () => {
  const input = [3, 2, 1];
  const output = mergeSort(input);
  assertEquals(output, [1, 2, 3]);
});

Deno.test("Should sort an array given a longer unsorted array", () => {
  const input = [23, 43, 67, 87, 99, 44, 7, 909987, 234, 374957, 0];
  const output = mergeSort(input);
  assertEquals(output, [0, 7, 23, 43, 44, 67, 87, 99, 234, 374957, 909987]);
});

Deno.test("should not choke on an empty array", () => {
  const input: number[] = [];
  const output = mergeSort(input);
  assertEquals(output, []);
});

Deno.test("should return same given an array with one element", () => {
  const input = [7];
  const output = mergeSort(input);
  assertEquals(output, [7]);
});

Deno.test("should sort negative numbers", () => {
  const input = [-1, -99, -2, -300, -4];
  const output = mergeSort(input);
  assertEquals(output, [-300, -99, -4, -2, -1]);
});
