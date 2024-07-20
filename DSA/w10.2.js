function findAllPaths(matrix) {
    let N = matrix.length;
    let paths = [];
    let visited = Array.fill.map(() => Array(N).fill(false));
  
    function search(i, j, path) {
      if (i < 0 || i >= N || j < 0 || j >= N || visited[i][j] || matrix[i][j] === 0) return;
      if (i === N - 1 && j === N - 1) {
        paths.push(path);
        return;
      }
      visited[i][j] = true;
      search(i - 1, j, path + 'U'); // Up
      search(i, j - 1, path + 'L'); // Left
      search(i, j + 1, path + 'R'); // Right
      search(i + 1, j, path + 'D'); // Down
      visited[i][j] = false; // Backtrack
    }
  
    search(0, 0, '');
    return paths.sort();
  }
  
  // Please don't modify the below code
  (function () {
    console.log(JSON.stringify(findAllPaths(eval(process.argv[2]))));
  })();