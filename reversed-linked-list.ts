// https://leetcode.com/problems/reverse-linked-list

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

/**
 * Definition for singly-linked list.
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let trailingPointer: ListNode | null = null;

  while (head != null) {
    const leadingPointer: ListNode | null = head.next;
    head.next = trailingPointer;
    trailingPointer = head;
    head = leadingPointer;
  }

  return trailingPointer;
}

Deno.test("[1,2,3,4,5]", () => {
  const nodeList = new ListNode(
    1,
    new ListNode(
      2,
      new ListNode(
        3,
        new ListNode(
          4,
          new ListNode(
            5,
          ),
        ),
      ),
    ),
  );
  let output = reverseList(nodeList);
  assertEquals(output?.val, 5);
  output = output!.next;
  assertEquals(output?.val, 4);
  output = output!.next;
  assertEquals(output?.val, 3);
  output = output!.next;
  assertEquals(output?.val, 2);
  output = output!.next;
  assertEquals(output?.val, 1);
  output = output!.next;
  assertEquals(output, null);
});
