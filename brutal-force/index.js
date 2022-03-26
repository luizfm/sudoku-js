const solve = function(board, cell) { // 'board' is a 2D array (a sudoku board) and 'cell' is the cell [0,81) at which we start solving
  let box, good, guesses, prodSolution, val, x, y;

  if(cell === null) {
      cell = 0
  }

  if(cell === 81) {
      val = board
  } else {
      val = board[x = cell / 9 | 0][y = cell % 9] !== 0
          ? solve(board, cell + 1)
          : undefined;
  }  // Base case, where we're at a filled cell or all 81 cells filled

  if(val) {
      return val;
  }

  box = function(j) {
    return sudoku[x - (x % 3) + (j - (j % 3)) / 3][y - (y % 3) + (j % 3)];      // jth cell in sub 3x3 box containing x,y
  };

  good = function(g) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(function(i) {
      return g !== board[x][i] && g !== board[i][y] && g !== box(i); // returns true if and only if board[x][y] when set to g breaks sudoku rules due to collision
    });
  };

  guesses = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(good); // choose non-conflicting guesses for position (x, y)

  prodSolution = function(g) {  // returns true if and only if a guess actually produces a solution at (x, y)
    board[x][y] = g;
    return solve(board, cell + 1);
  };

  if ((guesses.some(prodSolution)) || (board[x][y] = 0)) {
      return board;
  } // return the solved board if a solution can be produced!
};

sudoku =  [[1,0,3,0,0,0,0,8,4],
[0,0,6,0,4,8,0,0,0],
[0,4,0,0,0,0,0,0,0],
[2,0,0,0,9,6,1,0,0],
[0,9,0,8,0,1,0,4,0],
[0,0,4,3,2,0,0,0,8],
[0,0,0,0,0,0,0,7,0],
[0,0,0,1,5,0,4,0,0],
[0,6,0,0,0,0,2,0,3]]

console.log(solve(sudoku, 0))