import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

class LRUCache {
  capacity: number;
  cache: Map<number, number> = new Map();
  lruList: Array<number> = [];

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    console.log({ key, msg: "before get: ", list: this.lruList });
    const result = this.cache.get(key) ?? -1;
    this.lruList.push(key);
    if (this.lruList.length > this.capacity) {
      const removed = this.lruList.shift();
      this.cache.delete(removed ?? -1);
    }
    console.log("after get", this.lruList);
    return result;
  }

  put(key: number, value: number): void {
    this.cache.set(key, value);
    this.lruList.push(key);
    if (this.lruList.length > this.capacity) {
      const removedElement = this.lruList.shift();
      if (removedElement !== undefined) {
        this.cache.delete(removedElement);
      }
    }
  }
}

Deno.test("1st test run", () => {
  const cache = new LRUCache(2);
  cache.put(1, 1);
  cache.put(2, 2);
  assertEquals(cache.get(1), 1);
  cache.put(3, 3);
  assertEquals(cache.get(2), -1);
  cache.put(4, 4);
  assertEquals(cache.get(1), -1);
  assertEquals(cache.get(3), 3);
  assertEquals(cache.get(4), 4);
});
