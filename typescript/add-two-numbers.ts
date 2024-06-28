import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next: ListNode | null = null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1?: ListNode | null,
  l2?: ListNode | null,
): ListNode | null {
  if (!l1 && !l2) {
    return null;
  }
  const firstNumber = l1?.val || 0;
  const secondNumber = l2?.val || 0;

  let result = firstNumber + secondNumber;
  const thisNodeValue = result % 10;
  if (result > 9) {
    if (!l1?.next && !l2?.next) {
      l1!.next = new ListNode(1);
    } else {
      const aNextNode = l1?.next || l2?.next;
      aNextNode!.val++;
      console.log({ aNextNode });
    }
  }
  return new ListNode(thisNodeValue, addTwoNumbers(l1?.next, l2?.next));
}

Deno.test("1 + 1 = 2", () => {
  const node1 = new ListNode(1);
  const node2 = new ListNode(1);
  const ln = addTwoNumbers(node1, node2);
  assertEquals(ln?.val, 2);

  assertEquals(ln?.next, null);
});

Deno.test("23 + 4 = 27", () => {
  const node1 = new ListNode(3, new ListNode(2));
  const node2 = new ListNode(4);
  const ln = addTwoNumbers(node1, node2);
  assertEquals(ln?.val, 7);
  assertEquals(ln?.next?.val, 2);
});

Deno.test("9 + 9 = 18", () => {
  const node1 = new ListNode(9);
  const node2 = new ListNode(9);
  const ln = addTwoNumbers(node1, node2);
  assertEquals(8, ln?.val);
  assertEquals(1, ln?.next?.val);
});

Deno.test("999 + 1 = 1000", () => {
  const nineHundredAndNinetyNine = new ListNode(
    9,
    new ListNode(
      9,
      new ListNode(9),
    ),
  );
  const one = new ListNode(1);

  const aThousand = addTwoNumbers(nineHundredAndNinetyNine, one);
  assertEquals(0, aThousand?.val);
  assertEquals(0, aThousand?.next?.val);
  assertEquals(0, aThousand?.next?.next?.val);
  assertEquals(1, aThousand?.next?.next?.next?.val);
});
