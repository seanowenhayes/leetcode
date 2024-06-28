import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function lengthOfLongestSubstring(s: string): number {
  if (s.length < 2) return s.length;
  let longest = 0;
  let lastLongest = "";
  for (const letter of s) {
    if (lastLongest.includes(letter)) {
      const lastIndexOfLetter = lastLongest.indexOf(letter) + 1;
      lastLongest = lastLongest.substring(lastIndexOfLetter) + letter;
    } else {
      lastLongest += letter;
    }
    longest = Math.max(longest, lastLongest.length);
  }
  return longest;
}

Deno.test("aabaab!", () => {
  // assertEquals(lengthOfLongestSubstring("aabaabcbb"), 3);
  assertEquals(lengthOfLongestSubstring("aabaabc"), 3);
});

Deno.test("abcabcbb", () => {
  assertEquals(lengthOfLongestSubstring("abcabcbb"), 3);
});

Deno.test("bbbbb", () => {
  assertEquals(lengthOfLongestSubstring("bbbbb"), 1);
});

Deno.test("pwwkew", () => {
  assertEquals(lengthOfLongestSubstring("pwwkew"), 3);
});

Deno.test(" ", () => {
  assertEquals(lengthOfLongestSubstring(" "), 1);
});

Deno.test("au", () => {
  assertEquals(lengthOfLongestSubstring("au"), 2);
});

Deno.test("dvdf", () => {
  assertEquals(lengthOfLongestSubstring("dvdf"), 3);
});

Deno.test("empty string", () => {
  assertEquals(lengthOfLongestSubstring(""), 0);
});
