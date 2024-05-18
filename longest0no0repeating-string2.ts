import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

class OneTry {
  repeated: boolean = false;

  seenSoFar: Array<string>;

  constructor(letter: string) {
    this.seenSoFar = [letter];
  }

  consume(letter: string) {
    if (this.repeated) return;
    if (this.seenSoFar.includes(letter)) {
      this.repeated = true;
    } else {
      this.seenSoFar.push(letter);
    }
  }

  longest(): number {
    return this.seenSoFar.length;
  }
}

class Model {
  #historical: Array<OneTry> = [];

  consumeLetter(letter: string) {
    this.#historical.forEach((history) => history.consume(letter));
    this.#historical.push(new OneTry(letter));
  }

  longestSubstring(): number {
    const lengths: Array<number> = this.#historical.map((history) =>
      history.longest()
    );
    return Math.max(...lengths);
  }
}

function lengthOfLongestSubstring(s: string): number {
  if (s.length < 2) return s.length;

  const model = new Model();
  Array.from(s).forEach((letter) => model.consumeLetter(letter));
  return model.longestSubstring();
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

Deno.test("empty string", () => {
  assertEquals(lengthOfLongestSubstring(""), 0);
});
