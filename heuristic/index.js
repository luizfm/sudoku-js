// The algorithm used as Heuristic to solve a sudoku Puzzle using JS will be Backtracking Algorithm.
// Reference https://medium.com/swlh/backtracking-algorithm-to-solve-sudoku-puzzle-in-javascript-732aedcf5e2

var board = [
  [0, 5, 1, 3, 6, 2, 7, 0, 0],
  [0, 4, 0, 0, 5, 8, 0, 0, 0],
  [0, 0, 0, 4, 0, 0, 0, 2, 5],
  [0, 8, 0, 0, 0, 0, 9, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 5, 0, 0, 0, 0, 8, 0],
  [1, 2, 0, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 2, 8, 0, 0, 6, 0],
  [0, 0, 8, 5, 3, 4, 2, 9, 0]
];


// Gets the next empty spot and returns its position.
// If there is no empty spot, returns [-1, -1]
function nextEmptySpot(board) {
  for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
          if (board[i][j] === 0)
              return [i, j];
      }
  }
  return [-1, -1];
}

// Check if the given value isn't repeated in that row
function checkRow(board, row, value){
  for(var i = 0; i < board[row].length; i++) {
      if(board[row][i] === value) {
          return false;
      }
  }

  return true;
}


// Check if the given value isn't repeated in that column
function checkColumn(board, column, value){
  for(var i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
          return false;
      }
  }

  return true;
};

// Gets the square of the given value and check if it isn't repeated there.
function checkSquare(board, row, column, value){
  boxRow = Math.floor(row / 3) * 3;
  boxCol = Math.floor(column / 3) * 3;

  for (var r = 0; r < 3; r++){
      for (var c = 0; c < 3; c++){
          if (board[boxRow + r][boxCol + c] === value)
              return false;
      }
  }

  return true;
};

// Put all together and check if we can use that number in that position
function checkValue(board, row, column, value) {
  if(checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, row, column, value)) {
      return true;
  }

  return false;
};


// Core function with everything to solve the sudoku puzzle
function solve(board) {
  let emptySpot = nextEmptySpot(board);
  let row = emptySpot[0];
  let col = emptySpot[1];

  // there is no more empty spots
  if (row === -1){
      return board;
  }

  for(let num = 1; num<=9; num++){
      if (checkValue(board, row, col, num)){
          board[row][col] = num;
          solve(board);
      }
  }

  if (nextEmptySpot(board)[0] !== -1)
      board[row][col] = 0;

  return board;
}

console.log(solve(board))