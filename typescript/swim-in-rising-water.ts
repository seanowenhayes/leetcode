// https://leetcode.com/problems/swim-in-rising-water

import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";

class Position {
    x: number
    y: number

    path: Set<number>

    max: number

    constructor({ x, y, path, max }: Omit<Position, 'nextPaths'>) {
        this.x = x
        this.y = y
        this.path = path
        this.max = max
    }

    nextPaths(grid: number[][]): Position[] {
        const position = grid[this.y][this.x]
        this.path.add(position)
        const nextPaths: Position[] = []
        const up = this.y - 1
        if (up >= 0 && !this.path.has(grid[up][this.x])) {
            nextPaths.push(new Position({ ...this, y: up }))
        }
        const right = this.x + 1
        if (right < grid.length && !this.path.has(grid[this.y][right])) {
            nextPaths.push(new Position({ ...this, x: right }))
        }
        const down = this.y + 1
        if (down < grid.length && !this.path.has(grid[down][this.x])) {
            nextPaths.push(new Position({ ...this, y: down }))
        }
        const left = this.x - 1
        if (left >= 0) {
            nextPaths.push(new Position({ ...this, x: left }))
        }
        return nextPaths
    }
}

function getNextPositions() { }

function swimInWater(grid: number[][]): number {
    let x = 0
    let y = 0
    const firstElevation = grid[x][y]
    const startPosition = new Position({ x, y, path: new Set([firstElevation]), max: firstElevation })
    const positions = startPosition.nextPaths(grid)

};

Deno.test('first', () => {
    const grid = [[0, 2], [1, 3]]
    const output = 3

    assertEquals(swimInWater(grid), output)
})

Deno.test('second', () => {
    const grid = [[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]
    const output = 16

    assertEquals(swimInWater(grid), output)
})