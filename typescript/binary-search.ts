import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

/// From an array return the index of the target in the array. If the target does not exist in the array then return -1
type BinarySearch = (
  args: { array: number[]; target: number; middleOffset?: number },
) => number;

const binarySearch: BinarySearch = ({ array, target, middleOffset = 0 }) => {
  const middle = Math.floor(array.length / 2);
  const middleValue = array[middle];
  if (middleValue === target) {
    return middle + middleOffset;
  }
  /// It's not here I am afraid
  if (array.length < 2) {
    return -1;
  }
  if (middleValue > target) {
    // do left
    const leftPartOfArray = array.slice(0, middle);
    return binarySearch({ array: leftPartOfArray, target, middleOffset });
  }
  // do right
  const newStart = middle + 1;
  const rightPartOfArray = array.slice(newStart);
  return binarySearch({
    array: rightPartOfArray,
    target,
    middleOffset: newStart + middleOffset,
  });
};

Deno.test("Should return -1 given a target not in the array", () => {
  const inputArray = [1, 2, 3, 4, 5, 6, 8, 9, 10];
  const target = 7;
  const output = binarySearch({ array: inputArray, target });
  assertEquals(output, -1);
});

Deno.test("Should return 0 when given a single element array where that single element is the target value", () => {
  const inputArray = [7];
  const target = 7;
  const output = binarySearch({ array: inputArray, target });
  assertEquals(output, 0);
});

Deno.test("should return the last index given the target is at the end given an odd array containing the target", () => {
  const inputArray = [-7, 0, 9, 11, 17];
  const target = 17;
  const output = binarySearch({ array: inputArray, target });
  assertEquals(output, 4);
});

Deno.test("should return the last index given the target is at the end given an even array containing the target", () => {
  const inputArray = [-7, 0, 9, 11, 13, 17];
  const target = 17;
  const output = binarySearch({ array: inputArray, target });
  assertEquals(output, 5);
});

Deno.test("should return the penultimate index given the target is one from the end given an even array containing the target", () => {
  const inputArray = [-7, 0, 9, 11, 13, 17];
  const target = 13;
  const output = binarySearch({ array: inputArray, target });
  assertEquals(output, 4);
});
