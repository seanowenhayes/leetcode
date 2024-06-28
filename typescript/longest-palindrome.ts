import {
  assertEquals,
  assertLess,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

function grow(wholeWord: string, [start, end]: [number, number]): string {
  let firstChar = wholeWord[start];
  let lastChar = wholeWord[end];
  while (firstChar === lastChar && start > 0 && end < wholeWord.length) {
    if (wholeWord[start - 1] === wholeWord[end + 1]) {
      start -= 1;
      end += 1;
    } else {
      break;
    }
  }
  return wholeWord.substring(start, end + 1);
}
function longestPalindrome(s: string): string {
  if (s.length < 2) {
    return s;
  }
  // worst case the longest palindrome is a single letter
  let longestPalindrome = s[0];
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === s[i + 1]) {
      const palindrome = grow(s, [i, i + 1]);
      if (palindrome.length > longestPalindrome.length) {
        longestPalindrome = palindrome;
      }
    }

    if (s[i] === s[i + 2]) {
      const palindrome = grow(s, [i, i + 2]);
      if (palindrome.length > longestPalindrome.length) {
        longestPalindrome = palindrome;
      }
    }
  }

  return longestPalindrome;
}

Deno.test("babad", () => {
  const input = "babad";
  const output = longestPalindrome(input);
  assertEquals(output, "bab");
});

Deno.test("cbbd", () => {
  const input = "cbbd";
  const output = longestPalindrome(input);
  assertEquals(output, "bb");
});

Deno.test("bb", () => {
  const input = "bb";
  const output = longestPalindrome("bb");
  assertEquals(output, "bb");
});

Deno.test("aaaa", () => {
  const input = "aaaa";
  const output = longestPalindrome(input);
  assertEquals(output, "aaaa");
});

Deno.test("aaa", () => {
  const input = "aaa";
  const output = longestPalindrome(input);
  assertEquals(output, "aaa");
});

Deno.test("aaaaa", () => {
  const input = "aaaaa";
  const output = longestPalindrome(input);
  assertEquals(output, "aaaaa");
});

Deno.test("aaaaaa", () => {
  const input = "aaaaaa";
  const output = longestPalindrome(input);
  assertEquals(output, "aaaaaa");
});
