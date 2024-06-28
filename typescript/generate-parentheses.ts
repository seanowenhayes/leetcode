// https://leetcode.com/problems/generate-parentheses/

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

type Value = "(" | ")";

type NodeInfo = {
  level: number;
  maxLevel: number;
  score: number;
  value: Value;
};

class Node {
  value: Value;
  opening: Node | undefined;
  closing: Node | undefined;

  constructor(
    { value, level, maxLevel, score }: NodeInfo,
  ) {
    this.value = value;
    const canContinue = level < maxLevel;
    const canContinueOpening = score < (maxLevel - level);
    const canContinueClosing = score > 0;
    if (canContinue && canContinueClosing) {
      this.closing = new Node({
        level: level + 1,
        maxLevel,
        score: score - 1,
        value: ")",
      });
    }
    if (canContinue && canContinueOpening) {
      this.opening = new Node({
        level: level + 1,
        maxLevel,
        score: score + 1,
        value: "(",
      });
    }
  }
  getValidParentheses(): string[] {
    let validParentheses: string[] = [];
    if (this.opening !== undefined) {
      validParentheses = validParentheses.concat(
        this.opening.getValidParentheses().map((val) => this.value + val),
      );
    }
    if (this.closing !== undefined) {
      validParentheses = validParentheses.concat(
        this.closing.getValidParentheses().map((val) => this.value + val),
      );
    }
    const isALeaf = this.closing === undefined && this.opening === undefined;
    if (isALeaf) {
      validParentheses = validParentheses.concat([this.value]);
    }
    return validParentheses;
  }
}

function generateParenthesis(n: number): string[] {
  return new Node({ value: "(", level: 1, maxLevel: n * 2, score: 1 })
    .getValidParentheses();
}

Deno.test("1", () => {
  const input = 1;
  const output = generateParenthesis(input);
  assertEquals(output, ["()"]);
});

Deno.test("2", () => {
  const input = 2;
  const output = generateParenthesis(input);
  assertEquals(output, ["(())", "()()"]);
});

Deno.test("3", () => {
  const input = 3;
  const output = generateParenthesis(3);
  assertEquals(output, ["((()))", "(()())", "(())()", "()(())", "()()()"]);
});
