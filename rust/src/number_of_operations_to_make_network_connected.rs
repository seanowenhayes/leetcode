// https://leetcode.com/problems/number-of-operations-to-make-network-connected
use std::collections::HashSet;

struct Solution;

impl Solution {
    pub fn make_connected(computerCount: i32, connections: Vec<Vec<i32>>) -> i32 {
        if computerCount - 1 > connections.len() as i32 {
            return -1;
        }
        let mut computerIndexes: HashSet<&i32> = HashSet::new();
        for connection in connections.iter() {
            connection.iter().for_each(|c| {
                computerIndexes.insert(c);
            });
        }
        computerCount - computerIndexes.len() as i32
    }
}

#[cfg(test)]
mod tests {
    use crate::number_of_operations_to_make_network_connected::Solution;

    // Example 1:
    // Input: n = 4, connections = [[0,1],[0,2],[1,2]]
    // Inter = [[0,1], [0,2], [1,3]]
    // Output: 1
    // Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.
    #[test]
    fn test_1() {
        let n = 4;
        let connections = vec![vec![0, 1], vec![0, 2], vec![1, 2]];
        let result = 1;
        assert_eq!(Solution::make_connected(n, connections), result);
    }

    //      Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
    //      Inter = [[0,1], [0,2], [0,3], [1,4], [1,5]]
    //      Output: 2
    #[test]
    fn test_2() {
        let n = 6;
        let connections = vec![vec![0, 1], vec![0, 2], vec![0, 3], vec![1, 2], vec![1, 3]];
        let result = 2;
        assert_eq!(Solution::make_connected(n, connections), result);
    }

    //     Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
    // Output: -1
    // Explanation: There are not enough cables.
    #[test]
    fn test_3() {
        let n = 6;
        let connections = vec![vec![0, 1], vec![0, 2], vec![0, 3], vec![1, 2]];
        let result = -1;
        assert_eq!(Solution::make_connected(n, connections), result);
    }
}
