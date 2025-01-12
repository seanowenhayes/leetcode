use std::collections::HashSet;

// https://leetcode.com/problems/swim-in-rising-water/description/

pub struct Swimmer {
    grid: Vec<Vec<i32>>,
    grid_size: usize,
    visited: HashSet<i32>,
}

impl Swimmer {
    fn new(grid: Vec<Vec<i32>>) -> Self {
        let grid_size = grid.len() - 1;
        let visited: HashSet<i32> = HashSet::new();
        Self {
            grid,
            grid_size,
            visited,
        }
    }

    fn swim(&mut self, position: (usize, usize)) -> i32 {
        let (x, y) = position;
        let current = self.grid[x][y];
        if x == self.grid_size && y == self.grid_size {
            return current;
        }
        self.visited.insert(current);
        // up
        let mut up_cost: Option<i32> = None;
        if y > 0 {
            let up_y = y - 1;
            let up = self.grid[x][up_y];
            if !self.visited.contains(&up) {
                up_cost = Some(self.swim((x, up_y)));
            }
        }
        // right
        let mut right_cost: Option<i32> = None;
        if x < self.grid_size {
            let right_x = x + 1;
            let right = self.grid[right_x][y];
            if !self.visited.contains(&right) {
                right_cost = Some(self.swim((right_x, y)));
            }
        }
        // down
        let mut down_cost: Option<i32> = None;
        if y < self.grid_size {
            let down_y = y + 1;
            let down = self.grid[x][down_y];
            if !self.visited.contains(&down) {
                down_cost = Some(self.swim((x, down_y)));
            }
        }
        // left
        let mut left_cost: Option<i32> = None;
        if x > 0 {
            let left_x = x - 1;
            let left = self.grid[left_x][y];
            if !self.visited.contains(&left) {
                left_cost = Some(self.swim((left_x, y)));
            }
        }
        let max_swim_costs = vec![up_cost, right_cost, down_cost, left_cost]
            .iter()
            .filter(|x| x.is_some())
            .map(|x| x.unwrap())
            .max();
        if let Some(max_swim_cost) = max_swim_costs {
            if max_swim_cost > current {
                return max_swim_cost;
            } else {
                return current;
            }
        } else {
            return current;
        }
    }
    pub fn swim_in_water(&mut self) -> i32 {
        return self.swim((0, 0));
    }
}

#[cfg(test)]
mod tests {
    use crate::swim_in_rising_water::Swimmer;

    #[test]
    fn test_example() {
        let input = vec![vec![0, 2], vec![1, 3]];
        let mut solution = Swimmer::new(input);
        let output = solution.swim_in_water();
        assert_eq!(output, 3);
    }

    #[test]
    fn test_single_grid_zero() {
        let input = vec![vec![0]];
        let mut solution = Swimmer::new(input);
        let output = solution.swim_in_water();
        assert_eq!(output, 0);
    }

    #[test]
    fn test_single_grid_7() {
        let input = vec![vec![7]];
        let mut solution = Swimmer::new(input);
        let output = solution.swim_in_water();
        assert_eq!(output, 7);
    }
}
