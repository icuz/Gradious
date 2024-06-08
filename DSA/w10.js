function solveNQueens(n) {
  const results = [];

  function isSafe(board, row, col) {
    for (let i = 0; i < col; i++) {
      if (board[row][i] === 'Q') return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  }

  function solve(board, col) {
    if (col >= n) {
      results.push(board.map(row => row.join('')));
      return true;
    }

    let res = false;
    for (let i = 0; i < n; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = 'Q';
        res = solve(board, col + 1) || res;
        board[i][col] = '.'; // Backtrack: Remove queen if no solution found
      }
    }
    return res;
  }

  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  solve(board, 0);
  results
  return results;
}

const n = 4;
const solutions = solveNQueens(n);
solutions.forEach(solution => {
  solution.forEach(row => console.log(row));
  console.log();
});
