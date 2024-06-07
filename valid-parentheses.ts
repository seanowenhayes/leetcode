// https://leetcode.com/problems/valid-parentheses

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type Opening = "(" | "[" | "{";
const openeningParen: Opening = "(";
const openingSquareBracket: Opening = "[";
const openingCurlyBracket: Opening = "{";

type Closing = ")" | "]" | "}";
const closingParen: Closing = ")";
const closingSquareBracket: Closing = "]";
const closingCurlyBracket: Closing = "}";

function isValid(s: string): boolean {
  const lastOpenedTag: Array<Opening> = [];

  const compliments: Map<Opening, Closing> = new Map(
    [
      [openeningParen, closingParen],
      [openingSquareBracket, closingSquareBracket],
      [openingCurlyBracket, closingCurlyBracket],
    ],
  );

  for (let i = 0; i < s.length; i++) {
    const character = s[i];
    switch (character) {
      case openeningParen:
      case openingSquareBracket:
      case openingCurlyBracket: {
        lastOpenedTag.push(character);
        break;
      }
      case closingParen:
      case closingSquareBracket:
      case closingCurlyBracket: {
        const openedTag = lastOpenedTag.pop();
        if (openedTag === undefined) {
          return false;
        }
        const lastOpenedCompliment = compliments.get(openedTag);
        if (lastOpenedCompliment !== character) {
          return false;
        }
        break;
      }
      default:
        throw new Error(
          `Found a ${character} that is not in the valid alphabet`,
        );
    }
  }
  return lastOpenedTag.length === 0;
}

Deno.test("[ => false", () => {
  const input = "[";
  assertEquals(
    isValid("["),
    false,
  );
});

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

Deno.test("([)]", () => {
});
