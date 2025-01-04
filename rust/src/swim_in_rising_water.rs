use std::collections::HashSet;

struct Route {
    visited: HashSet<i32>,
    finished: bool,
    position: (i32, i32),
}

impl Route {
    fn visit(&mut self, square: &i32) -> Option<&Self> {
        if self.visited.contains(square) {
            return None;
        }
        self.visited.insert(*square);
        return Some(self);
    }

    fn cost(&self) -> &i32 {
        self.visited.iter().max().unwrap()
    }
}

struct Swimmer {
    grid: Vec<Vec<i32>>,
    routes: Vec<Route>,
}

impl Swimmer {
    fn new(grid: Vec<Vec<i32>>) -> Self {
        let route = Route {
            visited: {
                let mut set = HashSet::new();
                set.insert((0, 0));
                set
            },
            finished: false,
            position: (0, 0),
        };
        Swimmer {
            grid,
            routes: vec![route],
        }
    }

    fn position_is_valid(&self, position: &(i32, i32)) -> bool {
        let (x, y) = position;
        let grid_size = self.grid.len() as i32;
        return *x >= 0 && *x < grid_size && *y >= 0 && *y < grid_size;
    }

    fn swim(&self) -> &i32 {
        if self.grid.len() == 1 {
            return &self.grid[0][0];
        }
        if self.routes.iter().all(|route| route.finished) {
            return self.minimal_route_cost();
        }
        self.routes
            .iter_mut()
            .filter(|route| !route.finished)
            .for_each(|route| {
                let (x, y) = route.position;
                [(x, y - 1), (x, y + 1), (x - 1, y), (x + 1, y)]
                    .iter()
                    .filter(|position| self.position_is_valid(&position))
                    .for_each(|position: &(i32, i32)| {
                        if let Some(a_route) =
                            route.visit(&self.grid[position.0 as usize][position.1 as usize])
                        {
                            let finish_position =
                                (self.grid.len() as i32 - 1, self.grid.len() as i32 - 1);
                            let new_route = Route {
                                visited: route.visited.clone(),
                                finished: position == &finish_position,
                                position: *position,
                            };
                            self.routes.push(new_route);
                        }
                    });
            });
        return &999;
    }

    fn minimal_route_cost(&self) -> &i32 {
        return self.routes.iter().map(|route| route.cost()).min().unwrap();
    }
}

fn swim_in_rising_water(input: Vec<Vec<i32>>) -> i32 {
    let swimmer = Swimmer::new(input);

    return *swimmer.swim();
}

#[cfg(test)]
mod tests {
    use crate::swim_in_rising_water::swim_in_rising_water;

    #[test]
    fn test_example() {
        let input = vec![vec![0, 2], vec![1, 3]];
        let output = swim_in_rising_water(input);
        assert_eq!(output, 3);
    }
}
