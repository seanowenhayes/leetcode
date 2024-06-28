import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function bubbleSort<T>(array: number[]): number[] {
  if (array.length < 2) {
    return array;
  }

  let sorted = false;
  let endIndex = array.length - 1; // Give space for a window of two elements in the array

  while (!sorted) {
    let swapped = false;
    for (let i = 0; i < endIndex; i++) {
      let leftIndex = i;
      let rightIndex = i + 1;
      let left = array[leftIndex];
      let right = array[rightIndex];
      if (left > right) {
        array[leftIndex] = right;
        array[rightIndex] = left;

        // We swapped so maybe its not sorted...
        swapped = true;
      }
    }
    if (swapped) {
      swapped = false;
    } else {
      // we didn't swap anything last time so it must be sorted...
      sorted = true;
    }
    // The window shrinks by one each time as on the first pass the last index is sorted on the second the last two e.t.c. etc...
    endIndex--;
  }

  return array;
}

Deno.test("Should just give back an array given a sorted array", () => {
  const input = [1, 2, 3];
  const output = bubbleSort(input);
  assertEquals(output, [1, 2, 3]);
});

Deno.test("Should sort an array given an unsorted array", () => {
  const input = [3, 2, 1];
  const output = bubbleSort(input);
  assertEquals(output, [1, 2, 3]);
});

Deno.test("Should sort an array given a longer unsorted array", () => {
  const input = [23, 43, 67, 87, 99, 44, 7, 909987, 234, 374957, 0];
  const output = bubbleSort(input);
  assertEquals(output, [0, 7, 23, 43, 44, 67, 87, 99, 234, 374957, 909987]);
});

Deno.test("should not choke on an empty array", () => {
  const input: number[] = [];
  const output = bubbleSort(input);
  assertEquals(output, []);
});

Deno.test("should return same given an array with one element", () => {
  const input = [7];
  const output = bubbleSort(input);
  assertEquals(output, [7]);
});

Deno.test("should sort negative numbers", () => {
  const input = [-1, -99, -2, -300, -4];
  const output = bubbleSort(input);
  assertEquals(output, [-300, -99, -4, -2, -1]);
});
