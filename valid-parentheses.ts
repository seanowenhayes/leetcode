// https://leetcode.com/problems/valid-parentheses

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function isValid(s: string): boolean {
  const openeningParen = "(";
  const openingSquareBracket = "[";
  const openingCurlyBracket = "{";

  const closingParen = ")";
  const closingSquareBracket = "]";
  const closingCurlyBracket = "}";

  let parenScore = 0;
  let squareScore = 0;
  let curlyScore = 0;
  for (let i = 0; i < s.length; i++) {
    const character = s[i];
    switch (character) {
      case openeningParen: {
        parenScore += 1;
        break;
      }
      case openingSquareBracket: {
        squareScore += 1;
        break;
      }
      case openingCurlyBracket: {
        curlyScore += 1;
        break;
      }
      case closingParen: {
        if (parenScore === 0) {
          // more closing than proceediung parens can't be valid
          return false;
        }
        parenScore -= 1;
        break;
      }
      case closingSquareBracket: {
        if (squareScore === 0) {
          // more closing than opening
          return false;
        }
        squareScore -= 1;
        break;
      }
      case closingCurlyBracket: {
        if (curlyScore === 0) {
          // more closing than opening can't be valid
          return false;
        }
        curlyScore -= 1;
        break;
      }
      default:
        throw new Error(
          `Found a ${character} that is not in the valid alphabet`,
        );
    }
  }
  return parenScore === 0 && squareScore === 0 && curlyScore === 0;
}

Deno.test("() => true", () => {
  assertEquals(
    isValid("()"),
    true,
  );
});

Deno.test("()[]{} => true", () => {
  assertEquals(
    isValid("()[]{}"),
    true,
  );
});
Deno.test("()", () => {
  assertEquals(
    isValid("()"),
    true,
  );
});

Deno.test("(] => false", () => {
  assertEquals(isValid("(]"), false);
});
