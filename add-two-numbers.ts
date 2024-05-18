import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function listNodeToNumber(listNode: ListNode | null): BigInt {
  let numberAsString = "";

  while (listNode) {
    numberAsString = listNode.val + numberAsString;
    listNode = listNode.next;
  }
  return BigInt(numberAsString);
}

function numberToListNode(num: BigInt): ListNode | null {
  const numberAsString = num.toString();
  let listNode: ListNode | null = null;
  for (const numChar of numberAsString) {
    listNode = new ListNode(+numChar, listNode);
  }
  return listNode;
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const firstNumber = listNodeToNumber(l1);
  const secondNumber = listNodeToNumber(l2);
  return numberToListNode(firstNumber.valueOf() + secondNumber.valueOf());
}

Deno.test("[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1] + [5,6,4]", () => {
  const n1 = BigInt(1000000000000000000000000000001);
  const n2 = BigInt(465);

  const ln1 = numberToListNode(n1);
  const ln2 = numberToListNode(n2);

  const answer = addTwoNumbers(ln1, ln2);
  const answerNumber = listNodeToNumber(answer);
  console.log({ answer, answerNumber });
  assertEquals(BigInt(1000000000000000000000000000466), answerNumber);
});
