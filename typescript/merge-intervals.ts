import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

// https://leetcode.com/problems/merge-intervals

function sortIntervals(a: number[], b: number[]): number {
  return a[0] - b[0];
}

function merge(intervals: number[][]): number[][] {
  const sortedIntervals = intervals.sort(sortIntervals);
  const mergedOutput: Array<Array<number>> = [];
  let [lastInterval, ...rest] = sortedIntervals;
  rest.forEach(([currentStart, currentFinish]: number[]) => {
    const [lastStart, lastFinish] = lastInterval;
    // Do they overlap
    if (lastFinish >= currentStart) {
      lastInterval = [lastStart, Math.max(currentFinish, lastFinish)];
    } else {
      mergedOutput.push(lastInterval);
      lastInterval = [currentStart, currentFinish];
    }
  });
  return [...mergedOutput, lastInterval];
}

Deno.test("Should simply return the Intervals given only one input interval", () => {
  const inputInterval = [[1, 3]];
  const expectedOutputInterval = [[1, 3]];
  assertEquals(merge(inputInterval), expectedOutputInterval);
});

Deno.test("Should return a single interval given two overlapping intervals", () => {
  const inputIntervals = [[1, 3], [2, 6]];
  const expectedOutputInterval = [[1, 6]];
  assertEquals(merge(inputIntervals), expectedOutputInterval);
});
