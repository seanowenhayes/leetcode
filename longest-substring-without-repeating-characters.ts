import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function lengthOfLongestSubstring(s: string): number {
  if (s.length < 2) return s.length;
  let longestSubstring = 1;

  while (s.length) {
    const letter = s.substring(0, 1);
    s = s.substring(1);
    const seenLetters = new Set();
    seenLetters.add(letter);
    for (let i = 0; i < s.length; i++) {
      if (seenLetters.has(s[i])) {
        break;
      }
      seenLetters.add(s[i]);
      longestSubstring = Math.max(longestSubstring, seenLetters.size);
    }
  }
  return longestSubstring;
}

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
