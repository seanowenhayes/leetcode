// https://leetcode.com/problems/lru-cache

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

class LinkedListNode {
  previous: LinkedListNode | undefined;
  next: LinkedListNode | undefined;
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}
class LinkedList {
  head: LinkedListNode | undefined;
  tail: LinkedListNode | undefined;

  add(value: number) {
    const nodeToAdd = new LinkedListNode(value);
    if (this.head === undefined) {
      this.head = nodeToAdd;
      this.tail = nodeToAdd;
    } else {
      this.head.previous = nodeToAdd;
      nodeToAdd.next = this.head;
      this.head = nodeToAdd;
    }
  }

  remove(value: number) {
    let node: LinkedListNode | undefined = this.head;

    while (node !== undefined) {
      if (node.value === value) {
        // remove it
        if (node.previous !== undefined) {
          node.previous.next = node.next;
        }
        if (node.next !== undefined) {
          node.next.previous = node.previous;
        }
        if (node.value === this.head?.value) {
          this.head = node.next;
        }
        if (node.value === this.tail?.value) {
          this.tail = node.previous;
        }
        break;
      }
      node = node.next;
    }
  }

  shift(): LinkedListNode | undefined {
    const node = this.tail;
    if (this.tail === this.head) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      this.tail = this.tail?.previous;
    }
    return node;
  }
}

Deno.test("Linked list add and shift", () => {
  const ll = new LinkedList();
  ll.add(1);
  ll.add(2);
  ll.add(3);
  assertEquals(ll.shift()?.value, 1);
  assertEquals(ll.shift()?.value, 2);
  assertEquals(ll.shift()?.value, 3);
});

Deno.test("Linked list add and remove", () => {
  const ll = new LinkedList();
  ll.add(1);
  assertEquals(ll.head?.value, 1);
  assertEquals(ll.tail?.value, 1);
  ll.add(2);
  assertEquals(ll.head?.value, 2);
  assertEquals(ll.tail?.value, 1);
  ll.add(3);
  assertEquals(ll.head?.value, 3);
  assertEquals(ll.tail?.value, 1);
  ll.remove(5);
  assertEquals(ll.head?.value, 3);
  assertEquals(ll.tail?.value, 1);
  ll.remove(1);
  assertEquals(ll.head?.value, 3);
  assertEquals(ll.tail?.value, 2);
  ll.remove(3);
  assertEquals(ll.head?.value, 2);
  assertEquals(ll.tail?.value, 2);
  ll.remove(99);
  assertEquals(ll.head?.value, 2);
  assertEquals(ll.tail?.value, 2);
  assertEquals(ll.shift()?.value, 2);
  assertEquals(ll.head, undefined);
  assertEquals(ll.tail, undefined);
});

class LRUCache {
  capacity: number;
  cache: Map<number, number> = new Map();
  lruList = new LinkedList();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  #recordLastUsed(key: number) {
    if (this.cache.has(key)) {
      this.lruList.remove(key);
    }
    this.lruList.add(key);

    if (this.cache.size > this.capacity) {
      const removed = this.lruList.shift();
      // remove from the cache if not the key and list had something in it.
      if (removed !== undefined) {
        this.cache.delete(removed.value);
      }
    }
  }

  get(key: number): number {
    const result = this.cache.get(key) ?? -1;
    result !== -1 && this.#recordLastUsed(key);
    return result;
  }

  put(key: number, value: number): void {
    this.cache.set(key, value);
    this.#recordLastUsed(key);
  }
}

Deno.test("Amother test - [[2],[2,1],[1,1],[2],[4,1],[1],[2]]", () => {
  const cache = new LRUCache(2);
  cache.put(2, 1);
  cache.put(1, 1);
  assertEquals(cache.get(2), 1);
  cache.put(4, 1);
  assertEquals(cache.get(1), -1);
  assertEquals(cache.get(2), 1);
});

Deno.test("[[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]]", () => {
  const cache = new LRUCache(10);
  const input = [
    [10, 13],
    [3, 17],
    [6, 11],
    [10, 5],
    [9, 10],
    [13],
    [2, 19],
    [2],
    [3],
    [5, 25],
    [8],
    [9, 22],
    [5, 5],
    [1, 30],
    [11],
    [9, 12],
    [7],
    [5],
    [8],
    [9],
    [4, 30],
    [9, 3],
    [9],
    [10],
    [10],
    [6, 14],
    [3, 1],
    [3],
    [10, 11],
    [8],
    [2, 14],
    [1],
    [5],
    [4],
    [11, 4],
    [12, 24],
    [5, 18],
    [13],
    [7, 23],
    [8],
    [12],
    [3, 27],
    [2, 12],
    [5],
    [2, 9],
    [13, 4],
    [8, 18],
    [1, 7],
    [6],
    [9, 29],
    [8, 21],
    [5],
    [6, 30],
    [1, 12],
    [10],
    [4, 15],
    [7, 22],
    [11, 26],
    [8, 17],
    [9, 29],
    [5],
    [3, 4],
    [11, 30],
    [12],
    [4, 29],
    [3],
    [9],
    [6],
    [3, 4],
    [1],
    [10],
    [3, 29],
    [10, 28],
    [1, 20],
    [11, 13],
    [3],
    [3, 12],
    [3, 8],
    [10, 9],
    [3, 26],
    [8],
    [7],
    [5],
    [13, 17],
    [2, 27],
    [11, 15],
    [12],
    [9, 19],
    [2, 15],
    [3, 16],
    [1],
    [12, 17],
    [9, 1],
    [6, 19],
    [4],
    [5],
    [5],
    [8, 1],
    [11, 7],
    [5, 2],
    [9, 28],
    [1],
    [2, 2],
    [7, 4],
    [4, 22],
    [7, 24],
    [9, 26],
    [13, 28],
    [11, 26],
  ];
  const output = [
    -1,
    19,
    17,
    -1,
    -1,
    -1,
    5,
    -1,
    12,
    3,
    5,
    5,
    1,
    -1,
    30,
    5,
    30,
    -1,
    -1,
    24,
    18,
    -1,
    18,
    -1,
    18,
    -1,
    4,
    29,
    30,
    12,
    -1,
    29,
    17,
    22,
    18,
    -1,
    20,
    -1,
    18,
    18,
    20,
  ];
  input.forEach((inputItem) => {
    if (inputItem.length === 2) {
      const [key, value] = inputItem;
      cache.put(key, value);
    } else {
      const [key] = inputItem;
      const actual = cache.get(key);
      const expected = output.shift();
      console.log({ key, expected, actual });
      assertEquals(actual, expected);
    }
  });
  if (cache.lruList.length > 10) {
    console.log("Not good matey!");
  }
});

Deno.test("[[2],[2],[2,6],[1],[1,5],[1,2],[1],[2]]", () => {
  const cache = new LRUCache(2);
  assertEquals(cache.get(2), -1);
  cache.put(2, 6);
  assertEquals(cache.get(1), -1);
  cache.put(1, 5);
  cache.put(1, 2);
  assertEquals(cache.get(1), 2);
  assertEquals(cache.get(2), 6);
});

Deno.test("1st test run", () => {
  const cache = new LRUCache(2);
  // put 1 to 1 - simple just adds to cache
  cache.put(1, 1);
  //   put 2 to 2 - simple same as above, now we are at 2 capacity
  cache.put(2, 2);
  // get 1 - return the value 1. the lru list should now be [2,1]
  assertEquals(cache.get(1), 1);
  //   put 3 to 3 - as at capacity remove 2. the lru list should now be [1, 3]
  cache.put(3, 3);
  // get 2 as not in the lru should not be in cache so -1 - lru stays the same = [1,3]
  assertEquals(cache.get(2), -1);
  // put 4 to 4, add to cache - lru = [3,4]
  cache.put(4, 4);
  // get 1 not in cache so return -1, lru remains unchanged - [3,4]
  assertEquals(cache.get(1), -1);
  // return the 3 and update lru - [4,3]
  assertEquals(cache.get(3), 3);
  // return the 4 and update lru - [3,4]
  assertEquals(cache.get(4), 4);
});
