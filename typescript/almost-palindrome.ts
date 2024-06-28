import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

// from Meta interview is word a palindrome or close off by one letter.

function isAlmostPalindrome(word: string): boolean {
  if (word.length < 2) {
    return true;
  }
  let left = 0;
  let right = word.length - 1;
  let skips = 0;
  const step = () => {
    left++;
    right--;
  };
  while (left < right) {
    if (word[left] === word[right]) {
      step();
      continue;
    }
    if (word[left] === word[right - 1]) {
      if (skips) {
        return false;
      }
      skips++;
      step();
      right--;
      continue;
    }
    if (word[left + 1] === word[right]) {
      if (skips) {
        return false;
      }
      skips++;
      step();
      left++;
      continue;
    }
    return false;
  }
  return true;
}

Deno.test("otto is a palindrome", () => {
  const result = isAlmostPalindrome("otto");
  assertEquals(true, result);
});

Deno.test("sean is not a palindrome", () => {
  const result = isAlmostPalindrome("sean");
  assertEquals(false, result);
});

Deno.test("racecar is a palindrome", () => {
  const result = isAlmostPalindrome("racecar");
  assertEquals(true, result);
});

Deno.test("racecars is almost a palindrome", () => {
  const result = isAlmostPalindrome("racecars");
  assertEquals(true, result);
});

Deno.test("racecarss is almost a palindrome but off by two so is not almost", () => {
  const result = isAlmostPalindrome("racecarss");
  assertEquals(false, result);
});
