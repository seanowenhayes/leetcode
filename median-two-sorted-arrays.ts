import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const totalLength = nums1.length + nums2.length;
  const middle = Math.floor((totalLength - 1) / 2);

  let middleNumber = 0;
  for (let i = 0; i <= middle; i++) {
    const first1 = nums1[0];
    const first2 = nums2[0];
    if (first1 > first2) {
      middleNumber = nums2.shift() ?? nums1.shift()!;
    } else {
      middleNumber = nums1.shift() ?? nums2.shift()!;
    }
  }

  const isEven = totalLength % 2 === 0;
  if (isEven) {
    if (nums1.length && nums2.length) {
      const afterMiddle = nums1[0] > nums2[0] ? nums2[0] : nums1[0];
      return (middleNumber + afterMiddle) / 2;
    }
    return nums1.length
      ? (middleNumber + nums1[0]) / 2
      : (middleNumber + nums2[0]) / 2;
  }
  return middleNumber;
}

Deno.test("[] + [1]", () => {
  const nums1: number[] = [];
  const nums2 = [1];
  const median = findMedianSortedArrays(nums1, nums2);
  assertEquals(median, 1);
});

Deno.test("[2] + [] => 2", () => {
  const nums1 = [2];
  const nums2: number[] = [];
  const median = findMedianSortedArrays(nums1, nums2);
  assertEquals(median, 2);
});

Deno.test("[1,3] + [2] -> 2", () => {
  const nums1 = [1, 3];
  const nums2 = [2];
  const median = findMedianSortedArrays(nums1, nums2);
  assertEquals(median, 2);
});

Deno.test("[1,2] + [3,4] => 2.5", () => {
  const nums1 = [1, 2];
  const nums2 = [3, 4];
  const median = findMedianSortedArrays(nums1, nums2);
  assertEquals(median, 2.5);
});

Deno.test("[0,0] + [0,0] => 0", () => {
  const nums1 = [0, 0];
  const nums2 = [0, 0];
  const median = findMedianSortedArrays(nums1, nums2);
  assertEquals(median, 0);
});
