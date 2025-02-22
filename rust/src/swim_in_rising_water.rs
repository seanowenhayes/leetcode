use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::{collections::HashSet, i32};

// https://leetcode.com/problems/swim-in-rising-water/description/

pub struct Swimmer {
    grid: Vec<Vec<i32>>,
    grid_size: usize,
}

impl Swimmer {
    fn new(grid: Vec<Vec<i32>>) -> Self {
        let grid_size = grid.len() - 1;
        Self { grid, grid_size }
    }

    pub fn swim_in_water(&self) -> i32 {
        let mut heap = BinaryHeap::new();
        let mut visited = HashSet::new();
        heap.push(Reverse((self.grid[0][0], 0, 0)));

        let directions = [(0, 1), (1, 0), (0, -1), (-1, 0)];

        while let Some(Reverse((cost, x, y))) = heap.pop() {
            if x == self.grid_size && y == self.grid_size {
                return cost;
            }

            if !visited.insert((x, y)) {
                continue;
            }

            for &(dx, dy) in &directions {
                let nx = x as isize + dx;
                let ny = y as isize + dy;

                if nx >= 0
                    && nx <= self.grid_size as isize
                    && ny >= 0
                    && ny <= self.grid_size as isize
                {
                    let nx = nx as usize;
                    let ny = ny as usize;
                    if !visited.contains(&(nx, ny)) {
                        heap.push(Reverse((cost.max(self.grid[nx][ny]), nx, ny)));
                    }
                }
            }
        }

        unreachable!()
    }
}

#[cfg(test)]
mod tests {
    use crate::swim_in_rising_water::Swimmer;

    #[test]
    fn test_example() {
        let input = vec![vec![0, 2], vec![1, 3]];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 3);
    }

    #[test]
    fn test_single_grid_zero() {
        let input = vec![vec![0]];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 0);
    }

    #[test]
    fn test_single_grid_7() {
        let input = vec![vec![7]];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 7);
    }

    #[test]
    fn test_example_2() {
        let input = vec![
            vec![0, 1, 2, 3, 4],
            vec![24, 23, 22, 21, 5],
            vec![12, 13, 14, 15, 16],
            vec![11, 17, 18, 19, 20],
            vec![10, 9, 8, 7, 6],
        ];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 16);
    }

    #[test]
    fn test_example_3() {
        let input = vec![
            vec![10, 12, 4, 6],
            vec![9, 11, 3, 5],
            vec![1, 7, 13, 8],
            vec![2, 0, 15, 14],
        ];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 14);
    }

    #[test]
    fn test_example_4() {
        let input = vec![
            vec![0, 1, 2, 3, 4],
            vec![24, 23, 22, 21, 5],
            vec![12, 13, 14, 15, 16],
            vec![11, 17, 18, 19, 20],
            vec![10, 9, 8, 7, 6],
        ];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 16);
    }

    #[test]
    fn test_example_5() {
        let input = vec![
            vec![10, 12, 4, 6],
            vec![9, 11, 3, 5],
            vec![1, 7, 13, 8],
            vec![2, 0, 15, 14],
        ];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 14);
    }

    #[test]
    fn test_performance() {
        let input = vec![
            vec![29, 28, 12, 2, 24, 11],
            vec![17, 30, 25, 9, 13, 33],
            vec![1, 0, 34, 35, 23, 19],
            vec![31, 22, 4, 26, 6, 3],
            vec![21, 14, 15, 8, 32, 20],
            vec![5, 18, 7, 27, 16, 10],
        ];
        let swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 29);
    }
}
