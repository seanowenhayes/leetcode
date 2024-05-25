import {
  assertEquals,
  assertLess,
} from "https://deno.land/std@0.224.0/assert/mod.ts";

function isAPalindrome(maybeAPalindrome: string): boolean {
  let left = 0;
  let right = maybeAPalindrome.length - 1;
  while (left <= right) {
    const leftChar = maybeAPalindrome[left];
    const rightChar = maybeAPalindrome[right];
    if (leftChar !== rightChar) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function longestPalindrome(s: string): string {
  if (s.length < 2) {
    return s;
  }
  if (isAPalindrome(s)) {
    return s;
  }
  const right = s.substring(1);
  const left = s.substring(0, s.length - 1);
  const longestLeft = longestPalindrome(left);
  const longestRight = longestPalindrome(right);
  return longestLeft.length > longestRight.length ? longestLeft : longestRight;
}

Deno.test("Should return true given a palindrome", () => {
  const palidromes = ["otto", "bob", "racecar"];
  palidromes.forEach((palindrome) => {
    const output = isAPalindrome(palindrome);
    assertEquals(output, true);
  });
});

Deno.test("Should return false given a non palindrome", () => {
  const palidromes = [
    "seanowenhayes",
    "borichardgeatb",
    "jennypowell",
    "babad",
  ];
  palidromes.forEach((palindrome) => {
    const output = isAPalindrome(palindrome);
    assertEquals(output, false);
  });
});

Deno.test("babad", () => {
  const input = "babad";
  const output = longestPalindrome(input);
  assertEquals(output, "aba");
});

Deno.test("cbbd", () => {
  const input = "cbbd";
  const output = longestPalindrome(input);
  assertEquals(output, "bb");
});

Deno.test("Is a palindrome should be faster", () => {
  const beforePalindromeMakrer = "before palindrome test mark";
  const afterPalindromeMarker = "after palindrome test mark";
  performance.mark(beforePalindromeMakrer);
  isAPalindrome("abbcccbbbcaaccbababcbcabca");
  performance.mark(afterPalindromeMarker);
  const measure = performance.measure(
    "palindrome teset performance",
    beforePalindromeMakrer,
    afterPalindromeMarker,
  );
  console.log(`It took ${measure.duration} ms's to do the palindrome test`);
  assertLess(measure.duration, 0.2);
});
