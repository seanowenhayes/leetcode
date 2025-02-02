use std::{cmp::min, collections::HashSet, i32};

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

    fn swim(&self, position: (usize, usize), mut visited: HashSet<i32>) -> Option<i32> {
        let (x, y) = position;
        let current = self.grid[x][y];
        visited.insert(current);
        if x == self.grid_size && y == self.grid_size {
            return Some(current);
        }

        // up
        let mut up_cost: Option<i32> = None;
        // no point going up if we are on the top or right
        if y > 0 && x < self.grid_size {
            let up_y = y - 1;
            let up = self.grid[x][up_y];
            if !visited.contains(&up) {
                up_cost = self.swim((x, up_y), visited.clone());
            }
        }
        // right
        let mut right_cost: Option<i32> = None;
        if x < self.grid_size {
            let right_x = x + 1;
            let right = self.grid[right_x][y];
            if !visited.contains(&right) {
                right_cost = self.swim((right_x, y), visited.clone());
            }
        }
        // down
        let mut down_cost: Option<i32> = None;
        if y < self.grid_size {
            let down_y = y + 1;
            let down = self.grid[x][down_y];
            if !visited.contains(&down) {
                down_cost = self.swim((x, down_y), visited.clone());
            }
        }
        // left
        let mut left_cost: Option<i32> = None;
        // no point going left if we are on the left or bottom
        if x > 0 && y < self.grid_size {
            let left_x = x - 1;
            let left = self.grid[left_x][y];
            if !visited.contains(&left) {
                left_cost = self.swim((left_x, y), visited.clone());
            }
        }
        let min_swim_costs = min(
            min(up_cost.unwrap_or(i32::MAX), right_cost.unwrap_or(i32::MAX)),
            min(down_cost.unwrap_or(i32::MAX), left_cost.unwrap_or(i32::MAX)),
        );
        if min_swim_costs == i32::MAX {
            return None;
        }
        if min_swim_costs > current {
            return Some(min_swim_costs);
        } else {
            return Some(current);
        }
    }
    pub fn swim_in_water(&mut self) -> i32 {
        return self.swim((0, 0), HashSet::new()).unwrap();
    }
}

#[cfg(test)]
mod tests {
    use crate::swim_in_rising_water::Swimmer;

    #[test]
    fn test_example() {
        let input = vec![vec![0, 2], vec![1, 3]];
        let mut swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 3);
    }

    #[test]
    fn test_single_grid_zero() {
        let input = vec![vec![0]];
        let mut swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 0);
    }

    #[test]
    fn test_single_grid_7() {
        let input = vec![vec![7]];
        let mut swimmer = Swimmer::new(input);
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
        let mut swimmer = Swimmer::new(input);
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
        let mut swimmer = Swimmer::new(input);
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
        let mut swimmer = Swimmer::new(input);
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
        let mut swimmer = Swimmer::new(input);
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
        let mut swimmer = Swimmer::new(input);
        let output = swimmer.swim_in_water();
        assert_eq!(output, 29);
    }
}
